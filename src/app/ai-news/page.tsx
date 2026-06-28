import Link from "next/link";
import { getAiNews } from "@/lib/aiNewsApi";
import AiNewsCard from "@/components/ainews/AiNewsCard";
import AiNewsCategoryTools from "@/components/ainews/AiNewsCategoryTools";
import AiNewsFeatured, { pickFeaturedItem } from "@/components/ainews/AiNewsFeatured";
import AiNewsHeadlineTicker from "@/components/ainews/AiNewsHeadlineTicker";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { Newspaper, ArrowRight, Rss, Mail } from "lucide-react";
import { theme } from "@/lib/siteTheme";

export const metadata = buildPageMetadata({
  title: "AI News Live — RSS Feed Updated Every 3 Hours",
  description:
    "Latest AI news from 42+ RSS feeds: LLMs, coding AI, image & video AI, funding, robotics, cybersecurity, cloud AI, SEO AI.",
  path: "/ai-news",
  keywords: [
    "AI news",
    "AI RSS feed",
    "LLM news",
    "AI startups",
    "technology news",
  ],
});

export const revalidate = 1800;

const ALL_CATEGORIES = [
  { id: "", label: "All" },
  { id: "ai-models", label: "AI Models" },
  { id: "ai-tools", label: "AI Tools" },
  { id: "llms", label: "LLMs" },
  { id: "coding-ai", label: "Coding AI" },
  { id: "image-ai", label: "Image AI" },
  { id: "video-ai", label: "Video AI" },
  { id: "research", label: "Research" },
  { id: "startups", label: "Startups" },
  { id: "funding", label: "Funding" },
  { id: "robotics", label: "Robotics" },
  { id: "open-source-ai", label: "Open Source" },
  { id: "prompt-engineering", label: "Prompts" },
  { id: "developer-tools", label: "Dev Tools" },
  { id: "cybersecurity", label: "Security" },
  { id: "cloud-ai", label: "Cloud AI" },
  { id: "seo-ai", label: "SEO AI" },
];

export default async function AiNewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "";
  const page = Math.max(1, parseInt(params.page || "1", 10) || 1);

  const { items, pagination } = await getAiNews(page, 24, category || undefined);

  const showFeatured = page === 1 && !category && items.length > 0;
  const featured = showFeatured ? pickFeaturedItem(items) : null;
  const featuredSlug = featured?.slug;
  const tickerItems = showFeatured
    ? items.filter((i) => i.slug !== featuredSlug).slice(0, 10)
    : [];
  const secondaryStories = showFeatured
    ? items.filter((i) => i.slug !== featuredSlug).slice(0, 3)
    : [];
  const gridItems = showFeatured
    ? items.filter((i) => !secondaryStories.some((s) => s.slug === i.slug) && i.slug !== featuredSlug)
    : items;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <div className="border-b border-slate-200 bg-gradient-to-b from-violet-50/80 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-red-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                Live RSS
              </span>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                AI News
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Technology, AI models, startups, and research — aggregated from
                OpenAI, Anthropic, TechCrunch, arXiv, AWS, and 40+ more sources.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/newsletter" className={theme.btnPrimary + " inline-flex items-center gap-2 px-5 py-3"}>
                <Mail size={16} />
                Newsletter
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:border-violet-200 hover:bg-violet-50"
              >
                Guides
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            <Rss size={18} className="shrink-0 text-violet-600" />
            <span>
              <strong className="font-semibold text-slate-900">{pagination.total}</strong>{" "}
              articles · auto-refresh every 3 hours
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        {/* Category filters */}
        <div className="mb-8 -mx-1 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-2 px-1">
            {ALL_CATEGORIES.map((cat) => (
              <Link
                key={cat.id || "all"}
                href={cat.id ? `/ai-news?category=${cat.id}` : "/ai-news"}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  category === cat.id
                    ? theme.chipActive
                    : theme.chipIdle
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {category && <AiNewsCategoryTools category={category} />}

        {featured && (
          <div className="mb-10">
            <AiNewsFeatured item={featured} layout="hero" />
          </div>
        )}

        {tickerItems.length > 0 && (
          <div className="mb-10">
            <AiNewsHeadlineTicker items={tickerItems} label="Latest" />
          </div>
        )}

        {secondaryStories.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-5 border-b border-slate-200 pb-3 text-lg font-bold text-slate-900">
              Editor&apos;s picks
            </h2>
            <div className="grid items-stretch gap-5 lg:grid-cols-3">
              {secondaryStories.map((item) => (
                <AiNewsFeatured key={item.slug} item={item} layout="compact" />
              ))}
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
            <Newspaper className="mx-auto text-slate-300" size={48} />
            <p className="mt-4 text-lg font-bold text-slate-900">No articles yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              Run <code className="rounded bg-white px-1.5 py-0.5 text-violet-700">npm run fetch:ai-news</code> on
              the backend, or wait for the automatic RSS cron.
            </p>
          </div>
        ) : (
          <>
            {category && (
              <p className="mb-6 text-sm font-medium text-slate-500">
                Showing {items.length} of {pagination.total} in{" "}
                <span className="text-slate-900">
                  {ALL_CATEGORIES.find((c) => c.id === category)?.label}
                </span>
              </p>
            )}

            {gridItems.length > 0 && (
              <>
                {showFeatured && (
                  <h2 className="mb-6 border-b border-slate-200 pb-3 text-lg font-bold text-slate-900">
                    All stories
                  </h2>
                )}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {gridItems.map((item) => (
                    <AiNewsCard key={item.slug} item={item} size="large" />
                  ))}
                </div>
              </>
            )}

            {(pagination.hasPrev || pagination.hasNext) && (
              <div className="mt-12 flex justify-center gap-3">
                {pagination.hasPrev && (
                  <Link
                    href={`/ai-news?page=${page - 1}${category ? `&category=${category}` : ""}`}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:border-violet-200 hover:bg-violet-50"
                  >
                    ← Previous
                  </Link>
                )}
                <span className="flex items-center px-4 text-sm text-slate-500">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                {pagination.hasNext && (
                  <Link
                    href={`/ai-news?page=${page + 1}${category ? `&category=${category}` : ""}`}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:border-violet-200 hover:bg-violet-50"
                  >
                    Next →
                  </Link>
                )}
              </div>
            )}
          </>
        )}

        <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <h2 className="text-lg font-bold text-slate-900">Explore AIWedia</h2>
          <p className="mt-1 text-sm text-slate-600">
            Tools, prompts, and guides to go with the news.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/ai-directory" className="text-violet-700 hover:underline">
              AI Tool Directory
            </Link>
            <Link href="/prompts" className="text-violet-700 hover:underline">
              Prompt Library
            </Link>
            <Link href="/category/ai-seo-tools" className="text-violet-700 hover:underline">
              SEO AI Tools
            </Link>
            <Link href="/category/ai-code-generators" className="text-violet-700 hover:underline">
              Coding AI
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
