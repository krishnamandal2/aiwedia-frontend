import Link from "next/link";
import { ArrowRight, ChevronRight, Newspaper, Rss } from "lucide-react";
import { getAiNews, type AiNewsItem } from "@/lib/aiNewsApi";
import {
  formatAiNewsExcerpt,
  formatAiNewsTitle,
} from "@/lib/aiNewsFormat";
import { AI_NEWS_CATEGORY_LABELS } from "@/lib/aiNewsApi";
import AiNewsFeatured, { pickFeaturedItem } from "@/components/ainews/AiNewsFeatured";
import AiNewsHeadlineTicker from "@/components/ainews/AiNewsHeadlineTicker";

const AI_CATEGORIES = new Set([
  "llms",
  "ai-models",
  "ai-tools",
  "image-ai",
  "video-ai",
  "prompt-engineering",
  "open-source-ai",
]);

const TECH_CATEGORIES = new Set([
  "coding-ai",
  "developer-tools",
  "cloud-ai",
  "cybersecurity",
  "robotics",
  "seo-ai",
]);

const OTHER_CATEGORIES = new Set(["startups", "funding", "research"]);

function pickByCategories(
  items: AiNewsItem[],
  cats: Set<string>,
  limit = 6
): AiNewsItem[] {
  return items.filter((i) => cats.has(i.category)).slice(0, limit);
}

function backfill(
  primary: AiNewsItem[],
  pool: AiNewsItem[],
  limit = 6,
  excludeSlug?: string
): AiNewsItem[] {
  const filteredPool = excludeSlug
    ? pool.filter((i) => i.slug !== excludeSlug)
    : pool;
  const filteredPrimary = excludeSlug
    ? primary.filter((i) => i.slug !== excludeSlug)
    : primary;

  if (filteredPrimary.length >= limit) return filteredPrimary.slice(0, limit);
  const seen = new Set(filteredPrimary.map((i) => i.slug));
  const extra = filteredPool.filter((i) => !seen.has(i.slug));
  return [...filteredPrimary, ...extra].slice(0, limit);
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-red-700">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
      </span>
      Live
      <Rss size={12} className="opacity-70" />
    </span>
  );
}

function NewsColumn({
  title,
  subtitle,
  items,
  accentBar,
  accentText,
}: {
  title: string;
  subtitle: string;
  items: AiNewsItem[];
  accentBar: string;
  accentText: string;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className={`h-1 ${accentBar}`} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-5">
          <h3 className={`text-xl font-bold ${accentText}`}>{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-slate-500">
            No articles yet. Run{" "}
            <code className="rounded bg-slate-100 px-1 text-violet-700">
              npm run fetch:ai-news
            </code>
          </p>
        ) : (
          <ul className="flex flex-1 flex-col divide-y divide-slate-100">
            {items.map((item) => (
              <li key={item.slug} className="group py-4 first:pt-0 last:pb-0">
                <Link href={`/ai-news/${item.slug}`} className="flex gap-3">
                  {item.imageUrl ? (
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-600">
                        {AI_NEWS_CATEGORY_LABELS[item.category] || item.category}
                      </span>
                      <span className="text-slate-400">{item.sourceName}</span>
                    </div>
                    <p className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 group-hover:text-violet-700">
                      {formatAiNewsTitle(item.title)}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600">
                      {formatAiNewsExcerpt(item.summary, 90)}
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="mt-1 shrink-0 text-slate-300 transition group-hover:text-violet-600"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default async function HomeLiveNews() {
  const { items } = await getAiNews(1, 48);

  const featured = pickFeaturedItem(items);
  const featuredSlug = featured?.slug;

  const tickerItems = items
    .filter((i) => i.slug !== featuredSlug)
    .slice(0, 10);

  const secondaryStories = items
    .filter((i) => i.slug !== featuredSlug)
    .slice(0, 3);

  const aiNews = backfill(
    pickByCategories(items, AI_CATEGORIES),
    items,
    6,
    featuredSlug
  );
  const techNews = backfill(
    pickByCategories(items, TECH_CATEGORIES),
    items,
    6,
    featuredSlug
  );
  const otherNews = backfill(
    pickByCategories(items, OTHER_CATEGORIES),
    items,
    6,
    featuredSlug
  );

  return (
    <section className="border-y border-slate-200 bg-[#FAFAFB] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <LiveBadge />
            <h2 className="mt-4 flex items-center gap-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <Newspaper size={24} />
              </span>
              AI News Live
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Fresh headlines from 42+ RSS sources — AI, technology, startups,
              and research. Updated every 3 hours.
            </p>
          </div>
          <Link
            href="/ai-news"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-slate-800"
          >
            View all news
            <ArrowRight size={16} />
          </Link>
        </div>

        {featured && (
          <div className="mb-8">
            <AiNewsFeatured item={featured} layout="hero" />
          </div>
        )}

        {tickerItems.length > 0 && (
          <div className="mb-10">
            <AiNewsHeadlineTicker items={tickerItems} />
          </div>
        )}

        {secondaryStories.length > 0 && (
          <div className="mb-12">
            <div className="mb-5 flex items-end justify-between border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-slate-900">More top stories</h3>
              <Link
                href="/ai-news"
                className="text-sm font-semibold text-violet-700 hover:underline"
              >
                See all
              </Link>
            </div>
            <div className="grid items-stretch gap-5 md:grid-cols-3">
              {secondaryStories.map((item) => (
                <AiNewsFeatured key={item.slug} item={item} layout="compact" />
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <NewsColumn
            title="AI"
            subtitle="LLMs, models, tools, image & video"
            items={aiNews}
            accentBar="bg-violet-600"
            accentText="text-violet-700"
          />
          <NewsColumn
            title="Technology"
            subtitle="Coding, cloud, security & robotics"
            items={techNews}
            accentBar="bg-cyan-600"
            accentText="text-cyan-700"
          />
          <NewsColumn
            title="Other news"
            subtitle="Startups, funding & research"
            items={otherNews}
            accentBar="bg-amber-500"
            accentText="text-amber-700"
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-500">
          <Link href="/newsletter" className="hover:text-violet-700">
            Weekly newsletter
          </Link>
          <Link href="/blog" className="hover:text-violet-700">
            AIWedia guides
          </Link>
          <Link href="/ai-directory" className="hover:text-violet-700">
            AI tool directory
          </Link>
        </div>
      </div>
    </section>
  );
}
