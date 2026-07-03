import Link from "next/link";

import { getAiNews } from "@/lib/aiNewsApi";

import AiNewsCard from "@/components/ainews/AiNewsCard";

import AiNewsCategoryTools from "@/components/ainews/AiNewsCategoryTools";

import AiNewsFeatured, { pickFeaturedItem } from "@/components/ainews/AiNewsFeatured";

import AiNewsHeadlineTicker from "@/components/ainews/AiNewsHeadlineTicker";

import { buildPageMetadata } from "@/lib/seo/buildMetadata";

import { Newspaper, ArrowRight, Rss, Mail, Sparkles } from "lucide-react";



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

    <main className="min-h-screen bg-slate-100 text-slate-900">

      {/* Dark hero */}

      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-white">

        <div

          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(139,92,246,0.35),transparent)]"

          aria-hidden

        />

        <div

          className="pointer-events-none absolute inset-0 opacity-[0.04]"

          style={{

            backgroundImage:

              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",

            backgroundSize: "48px 48px",

          }}

          aria-hidden

        />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:py-20">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div className="max-w-2xl">

              <span className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-red-300">

                <span className="relative flex h-2 w-2">

                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />

                </span>

                Live RSS

              </span>

              <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">

                AI News

              </h1>

              <p className="mt-4 text-lg leading-relaxed text-slate-300">

                Technology, models, startups, and research — aggregated from

                OpenAI, Anthropic, TechCrunch, arXiv, AWS, and 40+ sources.

              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <Link

                href="/newsletter"

                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-violet-50"

              >

                <Mail size={16} />

                Newsletter

              </Link>

              <Link

                href="/blog"

                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"

              >

                Guides

                <ArrowRight size={16} />

              </Link>

            </div>

          </div>



          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300 backdrop-blur-md">

            <Rss size={18} className="shrink-0 text-violet-400" />

            <span>

              <strong className="font-semibold text-white">{pagination.total}</strong>{" "}

              articles · refreshed every 3 hours

            </span>

            <span className="hidden h-4 w-px bg-white/20 sm:block" />

            <span className="inline-flex items-center gap-1.5 text-violet-300">

              <Sparkles size={14} />

              Curated on AIWedia

            </span>

          </div>

        </div>

      </section>



      {tickerItems.length > 0 && (

        <div className="border-b border-slate-800 bg-slate-900">

          <div className="mx-auto max-w-7xl px-4 sm:px-6">

            <AiNewsHeadlineTicker items={tickerItems} label="Latest" variant="dark" />

          </div>

        </div>

      )}



      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">

        <div className="mb-8 -mx-1 overflow-x-auto pb-2">

          <div className="flex min-w-max gap-2 px-1">

            {ALL_CATEGORIES.map((cat) => (

              <Link

                key={cat.id || "all"}

                href={cat.id ? `/ai-news?category=${cat.id}` : "/ai-news"}

                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${

                  category === cat.id

                    ? "border-violet-600 bg-violet-600 text-white shadow-md shadow-violet-200"

                    : "border-slate-200 bg-white text-slate-700 hover:border-violet-200 hover:text-violet-700"

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



        {secondaryStories.length > 0 && (

          <div className="mb-10">

            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">

              <span className="h-5 w-1 rounded-full bg-violet-600" />

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

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">

            <Newspaper className="mx-auto text-slate-300" size={48} />

            <p className="mt-4 text-lg font-bold text-slate-900">No articles yet</p>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">

              Run <code className="rounded bg-slate-100 px-1.5 py-0.5 text-violet-700">npm run fetch:ai-news</code> on

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

                  <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">

                    <span className="h-5 w-1 rounded-full bg-slate-800" />

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

      </div>



      <section className="border-t border-slate-800 bg-slate-950 px-4 py-14 text-white sm:px-6">

        <div className="mx-auto max-w-7xl">

          <h2 className="text-xl font-bold">Explore AIWedia</h2>

          <p className="mt-2 max-w-lg text-sm text-slate-400">

            Tools, prompts, and guides to go with the news.

          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            {[

              { href: "/ai-directory", label: "AI Tool Directory" },

              { href: "/prompts", label: "Prompt Library" },

              { href: "/compare", label: "Compare Tools" },

              { href: "/category/ai-code-generators", label: "Coding AI" },

            ].map((link) => (

              <Link

                key={link.href}

                href={link.href}

                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-violet-500/50 hover:bg-violet-500/10"

              >

                {link.label}

              </Link>

            ))}

          </div>

        </div>

      </section>

    </main>

  );

}


