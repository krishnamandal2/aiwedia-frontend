import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, GitCompare, Sparkles } from "lucide-react";
import type { ResolvedAlternative } from "@/lib/alternativesApi";

type ComparisonLink = { title: string; slug: string; href: string };

type Props = {
  alternative: {
    title: string;
    summary: string;
    verdict?: string;
    slug: string;
  };
  focalTool: ResolvedAlternative & { found?: boolean };
  alternatives: ResolvedAlternative[];
  comparisons: ComparisonLink[];
};

function ToolHero({ tool, label }: { tool: ResolvedAlternative; label?: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-violet-200 bg-white p-6 shadow-lg ring-2 ring-violet-100">
      <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-violet-50">
        {tool.image ? (
          <Image src={tool.image} alt="" fill className="object-cover" sizes="80px" />
        ) : (
          <span className="flex h-full items-center justify-center text-2xl font-black text-violet-500">
            {tool.title?.charAt(0)}
          </span>
        )}
      </div>
      {label && (
        <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>
      )}
      <h2 className="mt-1 text-xl font-black text-slate-900">{tool.title}</h2>
      {tool.description && (
        <p className="mt-2 line-clamp-3 text-center text-sm text-slate-500">
          {tool.description}
        </p>
      )}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {tool.categorySlug && tool.slug && (
          <Link
            href={`/tool/${tool.categorySlug}/${tool.slug}`}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50"
          >
            Full review
          </Link>
        )}
        {tool.url && (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white"
          >
            Visit
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function AlternativesDetailView({
  alternative: alt,
  focalTool,
  alternatives,
  comparisons,
}: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-violet-50/20">
      <div className="border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <Link
            href="/alternatives"
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:underline"
          >
            <ArrowLeft size={16} />
            All alternatives
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-violet-100">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(139,92,246,0.1),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase text-violet-800">
            <Sparkles size={12} />
            Alternatives
          </span>
          <h1 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
            {alt.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">{alt.summary}</p>

          <div className="mt-10 max-w-sm mx-auto sm:mx-0">
            <ToolHero tool={focalTool} label="You're replacing" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
        <section>
          <h2 className="mb-6 text-xl font-bold text-slate-900">
            Top alternatives to {focalTool.title}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {alternatives.map((item) => (
              <article
                key={`${item.categorySlug}-${item.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-violet-200 hover:shadow-md"
              >
                <div className="flex gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-violet-50">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center font-bold text-violet-500">
                        {item.title?.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-900 group-hover:text-violet-700">
                        {item.title}
                      </h3>
                      {item.highlight && (
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
                          {item.highlight}
                        </span>
                      )}
                    </div>
                    {item.reason && (
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {item.reason}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/tool/${item.categorySlug}/${item.slug}`}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50"
                  >
                    View on AIWedia
                  </Link>
                  <Link
                    href={`/alternatives/${item.slug}`}
                    className="rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 hover:bg-violet-100"
                  >
                    Its alternatives →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {comparisons.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <GitCompare size={20} className="text-violet-600" />
              Side-by-side comparisons
            </h2>
            <ul className="divide-y divide-slate-100">
              {comparisons.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={c.href}
                    className="flex items-center justify-between py-3 text-sm font-semibold text-slate-800 hover:text-violet-700"
                  >
                    {c.title}
                    <ArrowUpRight size={16} />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/compare"
              className="mt-4 inline-block text-sm font-semibold text-violet-600 hover:underline"
            >
              Browse all comparisons
            </Link>
          </section>
        )}

        {alt.verdict && (
          <section className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-violet-900">Our pick</h2>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">{alt.verdict}</p>
          </section>
        )}
      </div>
    </div>
  );
}
