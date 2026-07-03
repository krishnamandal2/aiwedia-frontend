import Link from "next/link";
import {
  ArrowUpRight,
  GitCompare,
  Sparkles,
  Zap,
  DollarSign,
  Server,
} from "lucide-react";
import type { ComparisonListItem } from "@/lib/compareTypes";

type Props = {
  comparisons: ComparisonListItem[];
};

function toolLabel(c: ComparisonListItem) {
  const a = c.toolA?.title;
  const b = c.toolB?.title;
  if (a && b) return `${a} vs ${b}`;
  const fromTitle = c.title.split("—")[0]?.trim();
  return fromTitle || c.title;
}

export default function CompareHub({ comparisons }: Props) {
  const featured = comparisons[0];
  const rest = comparisons.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/60 via-white to-slate-50">
      <section className="relative overflow-hidden border-b border-violet-100/80">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(139,92,246,0.18),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-700">
            <GitCompare size={14} />
            Tool comparison
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Compare AI tools — pricing, API limits & more
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            Side-by-side breakdowns with separate pricing and API sections so you
            can pick the right stack faster.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-800 shadow-sm">
              <DollarSign size={16} className="text-violet-500" />
              Pricing plans
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white/80 px-4 py-2 text-sm font-semibold text-sky-800 shadow-sm">
              <Server size={16} className="text-sky-500" />
              API limits
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-white/80 px-4 py-2 text-sm font-semibold text-amber-900 shadow-sm">
              <Zap size={16} className="text-amber-500" />
              Feature winners
            </span>
          </div>
        </div>
      </section>

      {featured && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Link
            href={`/compare/${featured.slug}`}
            className="group relative block overflow-hidden rounded-3xl border border-violet-200/80 bg-gradient-to-br from-violet-600 via-indigo-600 to-fuchsia-600 p-8 text-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl sm:p-10"
          >
            <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/4 -translate-y-1/4 rounded-full bg-white/10 blur-2xl" />
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={12} />
              Featured
            </span>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl">
              {toolLabel(featured)}
            </h2>
            {featured.summary && (
              <p className="mt-3 max-w-2xl text-violet-100/90 leading-relaxed">
                {featured.summary}
              </p>
            )}
            <span className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-violet-700 shadow-lg transition group-hover:bg-violet-50">
              Open comparison
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="mb-6 text-lg font-bold text-slate-900">
          All comparisons
          <span className="ml-2 text-sm font-medium text-slate-400">
            ({comparisons.length})
          </span>
        </h2>

        {comparisons.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">
            No comparisons yet. Run{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
              npm run seed:comparisons
            </code>{" "}
            on the backend.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                    <GitCompare size={20} />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-300 transition group-hover:text-violet-500"
                  />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-violet-700">
                  {toolLabel(c)}
                </h3>
                {c.summary && (
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500">
                    {c.summary}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                    Pricing
                  </span>
                  <span className="rounded-lg bg-sky-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-sky-700">
                    API
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
