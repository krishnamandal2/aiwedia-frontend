import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Newspaper, Sparkles, Wrench, Star } from "lucide-react";
import type { LinkedNews, LinkedPrompt, LinkedTool } from "@/lib/linkingApi";
import { formatAiNewsTitle } from "@/lib/aiNewsFormat";

export default function NewsRelatedContent({
  tools,
  prompts,
  news,
  toolCategorySlug,
}: {
  tools: LinkedTool[];
  prompts: LinkedPrompt[];
  news: LinkedNews[];
  toolCategorySlug?: string;
}) {
  const hasContent =
    tools.length > 0 || prompts.length > 0 || news.length > 1;

  if (!hasContent) return null;

  return (
    <section className="mt-12 space-y-8">
      <div className="flex items-end justify-between border-b border-slate-200 pb-3">
        <h2 className="text-xl font-bold text-slate-900">Explore related</h2>
        {toolCategorySlug && (
          <Link
            href={`/category/${toolCategorySlug}`}
            className="text-sm font-semibold text-violet-700 hover:underline"
          >
            Browse tools
          </Link>
        )}
      </div>

      {tools.length > 0 && (
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
            <Wrench size={16} />
            Related tools
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-violet-200 hover:shadow-md"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-violet-50">
                  {t.image ? (
                    <Image src={t.image} alt="" fill className="object-cover" sizes="56px" />
                  ) : (
                    <span className="flex h-full items-center justify-center text-lg font-bold text-violet-400">
                      {t.title.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 group-hover:text-violet-700">
                    {t.title}
                  </p>
                  {t.description && (
                    <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                      {t.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {prompts.length > 0 && (
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
            <Sparkles size={16} />
            Related prompts
          </h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {prompts.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="rounded-xl border border-slate-200 bg-gradient-to-br from-violet-50/50 to-white p-4 transition hover:border-violet-200"
              >
                <p className="font-semibold text-slate-900">{p.title}</p>
                {p.useCase && (
                  <p className="mt-1 line-clamp-2 text-xs text-slate-500">{p.useCase}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {news.length > 1 && (
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
            <Newspaper size={16} />
            More in this topic
          </h3>
          <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
            {news.slice(0, 4).map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="flex items-center justify-between gap-3 px-4 py-3.5 transition hover:bg-slate-50"
                >
                  <span className="line-clamp-1 text-sm font-semibold text-slate-800">
                    {formatAiNewsTitle(n.title)}
                  </span>
                  {n.aiwediaScore != null && n.aiwediaScore > 0 && (
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-amber-700">
                      <Star size={12} className="fill-amber-400 text-amber-500" />
                      {n.aiwediaScore}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href="/ai-directory"
        className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:underline"
      >
        AI Directory hub
        <ArrowRight size={14} />
      </Link>
    </section>
  );
}
