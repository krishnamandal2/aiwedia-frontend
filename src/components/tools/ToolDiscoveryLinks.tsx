import Link from "next/link";
import {
  GitCompare,
  Layers,
  RefreshCw,
  Tag,
  ArrowUpRight,
} from "lucide-react";

export type DiscoveryLinks = {
  alternativePage?: {
    slug: string;
    title: string;
    summary?: string;
    href: string;
  } | null;
  comparisons?: { title: string; href: string }[];
  collections?: { title: string; href: string }[];
  deals?: { title: string; discountText?: string; href: string }[];
};

export default function ToolDiscoveryLinks({
  toolTitle,
  links,
}: {
  toolTitle: string;
  links: DiscoveryLinks;
}) {
  const { alternativePage, comparisons = [], collections = [], deals = [] } = links;
  const hasContent =
    alternativePage || comparisons.length || collections.length || deals.length;
  if (!hasContent) return null;

  return (
    <section className="mb-10 scroll-mt-28">
      <div className="overflow-hidden rounded-3xl border border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-indigo-50/50 shadow-sm">
        <div className="border-b border-violet-100/80 px-6 py-5 sm:px-8">
          <h2 className="text-lg font-black text-slate-900">
            Explore {toolTitle} on AIWedia
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Alternatives, comparisons, collections & deals
          </p>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
          {alternativePage && (
            <Link
              href={alternativePage.href}
              className="group flex gap-4 rounded-2xl border border-white bg-white/80 p-4 shadow-sm transition hover:border-indigo-200 hover:shadow-md sm:col-span-2"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <RefreshCw size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase text-indigo-600">
                  Alternatives
                </p>
                <p className="font-bold text-slate-900 group-hover:text-indigo-700">
                  {alternativePage.title}
                </p>
                {alternativePage.summary && (
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                    {alternativePage.summary}
                  </p>
                )}
              </div>
              <ArrowUpRight
                size={18}
                className="shrink-0 text-slate-300 group-hover:text-indigo-500"
              />
            </Link>
          )}

          {comparisons.length > 0 && (
            <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-violet-600">
                <GitCompare size={14} />
                Comparisons
              </p>
              <ul className="space-y-2">
                {comparisons.slice(0, 3).map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className="text-sm font-semibold text-slate-800 hover:text-violet-700"
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/compare"
                className="mt-3 inline-block text-xs font-semibold text-violet-600 hover:underline"
              >
                All comparisons
              </Link>
            </div>
          )}

          {collections.length > 0 && (
            <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-fuchsia-600">
                <Layers size={14} />
                Collections
              </p>
              <ul className="space-y-2">
                {collections.map((c) => (
                  <li key={c.href}>
                    <Link
                      href={c.href}
                      className="text-sm font-semibold text-slate-800 hover:text-fuchsia-700"
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {deals.length > 0 && (
            <div className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm sm:col-span-2">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase text-amber-700">
                <Tag size={14} />
                Active deals
              </p>
              <ul className="flex flex-wrap gap-2">
                {deals.map((d) => (
                  <li key={d.href + d.title}>
                    <Link
                      href={d.href}
                      className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-900 hover:bg-amber-100"
                    >
                      {d.title}
                      {d.discountText && (
                        <span className="text-xs font-normal text-amber-700">
                          · {d.discountText}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/deals"
                className="mt-3 inline-block text-xs font-semibold text-amber-800 hover:underline"
              >
                Browse all deals
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
