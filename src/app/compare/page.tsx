import Link from "next/link";
import { GitCompare, ArrowUpRight } from "lucide-react";
import { getComparisonsCached } from "@/lib/api";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { theme } from "@/lib/siteTheme";

export const metadata = buildPageMetadata({
  title: "AI Tool Comparisons — Side by Side",
  description:
    "Compare top AI tools head-to-head: ChatGPT vs Claude, Cursor vs Copilot, and more on AIWedia.",
  path: "/compare",
  keywords: ["AI tool comparison", "ChatGPT vs Claude", "best AI tools"],
});

export default async function CompareIndexPage() {
  const { comparisons } = await getComparisonsCached();

  return (
    <div className={theme.page}>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10">
          <span className={theme.badge}>Compare</span>
          <h1 className="mt-3 text-3xl font-black text-slate-900">
            AI tool comparisons
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Side-by-side breakdowns to help you pick the right AI stack — updated
            from our database.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {(comparisons as { slug: string; title: string; summary?: string }[]).map(
            (c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className={`block p-6 ${theme.card} ${theme.cardHover}`}
              >
                <GitCompare size={22} className="text-violet-600" />
                <h2 className="mt-3 text-lg font-bold text-slate-900">
                  {c.title}
                </h2>
                {c.summary && (
                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                    {c.summary}
                  </p>
                )}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-600">
                  Read comparison
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            )
          )}
        </div>

        {comparisons.length === 0 && (
          <p className="text-slate-500">
            No comparisons yet. Run{" "}
            <code className="rounded bg-slate-100 px-1">npm run seed:comparisons</code>{" "}
            on the backend.
          </p>
        )}
      </div>
    </div>
  );
}
