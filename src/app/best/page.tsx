import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { getBestGuidesCached } from "@/lib/api";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { theme } from "@/lib/siteTheme";

export const metadata = buildPageMetadata({
  title: "Best AI Tool Guides (2026)",
  description:
    "Curated best-of lists for AI SEO, coding, agents, and free utilities — ranked on AIWedia.",
  path: "/best",
  keywords: ["best AI tools", "AI SEO tools", "AI coding tools"],
});

export default async function BestGuidesPage() {
  const { guides } = await getBestGuidesCached();

  return (
    <div className={theme.page}>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10 text-center">
          <span className={theme.badge}>Guides</span>
          <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
            Best AI tool guides
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            SEO-optimized roundups to help you pick the right stack — updated for
            2026.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/best/${g.slug}`}
                className={`group block p-6 ${theme.card} ${theme.cardHover}`}
              >
                <div className="mb-4 inline-flex rounded-xl bg-violet-100 p-2.5 text-violet-700">
                  <BookOpen size={22} />
                </div>
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-violet-700">
                  {g.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600">{g.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-600">
                  Read guide
                  <ArrowUpRight size={16} />
                </span>
              </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
