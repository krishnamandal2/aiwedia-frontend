"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Briefcase,
  Calendar,
  ChevronRight,
  ExternalLink,
  Globe,
  LayoutGrid,
  List,
  Newspaper,
  Play,
  Search,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { trendingData, type Website } from "@/data/trendingsitedata/Trendingdata";
import {
  TREND_CATEGORIES,
  TRENDING_YEARS,
  domainFromUrl,
  faviconUrl,
  inferTrendCategory,
  type TrendCategory,
} from "@/lib/trendingUtils";
import { trackOutboundLink } from "@/lib/analytics";

const CATEGORY_ICONS = {
  globe: Globe,
  search: Search,
  users: Users,
  bot: Bot,
  play: Play,
  bag: ShoppingBag,
  newspaper: Newspaper,
  trophy: Trophy,
  briefcase: Briefcase,
} as const;

const EXPLORE_LINKS = [
  {
    href: "/ai-directory",
    title: "AI tools directory",
    desc: "Compare ChatGPT, Claude, Gemini & more",
    accent: "from-violet-600 to-indigo-600",
  },
  {
    href: "/compare",
    title: "AI comparisons",
    desc: "Side-by-side pricing & API limits",
    accent: "from-cyan-600 to-blue-600",
  },
  {
    href: "/ai-news",
    title: "AI news",
    desc: "Daily headlines on models & launches",
    accent: "from-fuchsia-600 to-pink-600",
  },
  {
    href: "/web-directory",
    title: "Web utilities",
    desc: "Games, PDF tools & free downloads",
    accent: "from-emerald-600 to-teal-600",
  },
];

const FAQ = [
  {
    q: "How is this list ranked?",
    a: "Rankings reflect global traffic estimates, search interest, and cultural momentum for each year — not AIWedia's opinion alone.",
  },
  {
    q: "Why do AI sites rank higher in recent years?",
    a: "ChatGPT, Gemini, Claude, and Perplexity surged in search and daily active use from 2023 onward, reshaping the top-traffic landscape.",
  },
  {
    q: "Can I compare these tools on AIWedia?",
    a: "Yes — use our AI directory and Compare hub for detailed reviews, pricing, and alternatives to trending AI products.",
  },
];

type EnrichedSite = Website & {
  rank: number;
  category: Exclude<TrendCategory, "all">;
  domain: string;
};

function enrichSites(sites: Website[]): EnrichedSite[] {
  return sites.map((site, index) => ({
    ...site,
    rank: index + 1,
    category: inferTrendCategory(site),
    domain: domainFromUrl(site.url),
  }));
}

function CategoryBadge({ category }: { category: Exclude<TrendCategory, "all"> }) {
  const meta = TREND_CATEGORIES[category];
  const Icon = CATEGORY_ICONS[meta.icon];
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600">
      <Icon size={10} />
      {meta.label}
    </span>
  );
}

function SiteFavicon({ url, name }: { url: string; name: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={faviconUrl(url)}
      alt=""
      width={40}
      height={40}
      className="h-full w-full object-contain"
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = "";
        e.currentTarget.className = "hidden";
      }}
    />
  );
}

function PodiumCard({
  site,
  place,
  className = "",
}: {
  site: EnrichedSite;
  place: 1 | 2 | 3;
  className?: string;
}) {
  const styles = {
    1: "border-amber-300/60 bg-gradient-to-b from-amber-50 to-white shadow-xl shadow-amber-500/10 lg:scale-[1.03]",
    2: "border-slate-200 bg-white",
    3: "border-slate-200 bg-white",
  };
  const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };

  return (
    <article
      className={`relative flex flex-col rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:shadow-lg ${styles[place]} ${className}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-2xl" aria-hidden>
          {medals[place]}
        </span>
        <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[10px] font-bold text-white">
          #{site.rank}
        </span>
      </div>
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200">
        <SiteFavicon url={site.url} name={site.name} />
      </div>
      <h3 className="text-center text-lg font-black text-slate-900">{site.name}</h3>
      <p className="mt-1 text-center text-xs text-slate-500">{site.domain}</p>
      <div className="mt-2 flex justify-center">
        <CategoryBadge category={site.category} />
      </div>
      <p className="mt-3 line-clamp-2 flex-1 text-center text-sm leading-relaxed text-slate-600">
        {site.description}
      </p>
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundLink(site.url, site.name)}
        className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700"
      >
        Visit site
        <ExternalLink size={14} />
      </a>
    </article>
  );
}

function SiteRow({ site, compact }: { site: EnrichedSite; compact?: boolean }) {
  return (
    <article
      className={`group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition hover:border-violet-200 hover:shadow-md sm:gap-4 sm:p-4 ${
        compact ? "" : "sm:flex-row"
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-black text-slate-700 sm:h-11 sm:w-11">
        {site.rank}
      </div>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2 ring-1 ring-slate-100">
        <SiteFavicon url={site.url} name={site.name} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate text-sm font-bold text-slate-900 sm:text-base">
            {site.name}
          </h3>
          <CategoryBadge category={site.category} />
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
          {site.description}
        </p>
        <p className="mt-1 hidden text-xs text-slate-400 sm:block">{site.domain}</p>
      </div>
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundLink(site.url, site.name)}
        className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-1.5 rounded-xl bg-violet-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-violet-500 sm:px-4 sm:text-sm"
      >
        <span className="hidden sm:inline">Visit</span>
        <ArrowUpRight size={16} />
      </a>
    </article>
  );
}

function SiteGridCard({ site }: { site: EnrichedSite }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-black text-slate-800 ring-1 ring-slate-200">
          {site.rank}
        </span>
        <CategoryBadge category={site.category} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 p-2 ring-1 ring-slate-100">
            <SiteFavicon url={site.url} name={site.name} />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-slate-900 group-hover:text-violet-700">
              {site.name}
            </h3>
            <p className="truncate text-xs text-slate-400">{site.domain}</p>
          </div>
        </div>
        <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
          {site.description}
        </p>
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackOutboundLink(site.url, site.name)}
          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition group-hover:border-violet-300 group-hover:bg-violet-50 group-hover:text-violet-800"
        >
          Visit website
          <ExternalLink size={15} />
        </a>
      </div>
    </article>
  );
}

export default function TrendingWebsites() {
  const [year, setYear] = useState("2026");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TrendCategory>("all");
  const [view, setView] = useState<"grid" | "list">("list");

  const rawData = trendingData[year];
  const isComingSoon = rawData === "coming-soon";

  const enriched = useMemo(
    () => (isComingSoon ? [] : enrichSites(rawData)),
    [rawData, isComingSoon]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return enriched.filter((site) => {
      const matchesQuery =
        !q ||
        site.name.toLowerCase().includes(q) ||
        site.description.toLowerCase().includes(q) ||
        site.domain.toLowerCase().includes(q);
      const matchesCategory = category === "all" || site.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [enriched, query, category]);

  const topThree = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  const categoryCounts = useMemo(() => {
    const counts = { all: enriched.length } as Record<TrendCategory, number>;
    for (const site of enriched) {
      counts[site.category] = (counts[site.category] ?? 0) + 1;
    }
    return counts;
  }, [enriched]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-orange-50/20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-orange-200/40 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(251,146,60,0.25),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
            </span>
            Live rankings
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Top trending &amp; traffic websites
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            See what the world searched, visited, and talked about — year by year from
            2010 to 2026. Filter by category, search any site, and jump to related AI
            tools on AIWedia.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-slate-200 ring-1 ring-white/10">
              <Calendar size={15} />
              {TRENDING_YEARS.length} years of data
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-slate-200 ring-1 ring-white/10">
              <TrendingUp size={15} />
              Updated monthly
            </span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-slate-200 ring-1 ring-white/10">
              <Bot size={15} />
              AI surge from 2023+
            </span>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="sticky top-[var(--header-offset,0px)] z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sites, domains, descriptions…"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none ring-violet-500/0 transition focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                    view === "list"
                      ? "bg-white text-violet-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  aria-label="List view"
                >
                  <List size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                    view === "grid"
                      ? "bg-white text-violet-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
            {(Object.keys(TREND_CATEGORIES) as TrendCategory[]).map((key) => {
              const count =
                key === "all" ? enriched.length : (categoryCounts[key] ?? 0);
              if (key !== "all" && count === 0) return null;
              const meta = TREND_CATEGORIES[key];
              const Icon = CATEGORY_ICONS[meta.icon];
              const active = category === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategory(key)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    active
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Icon size={12} />
                  {meta.label}
                  <span className={active ? "text-slate-300" : "text-slate-400"}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            {TRENDING_YEARS.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => {
                  setYear(y);
                  setQuery("");
                  setCategory("all");
                }}
                aria-pressed={year === y}
                className={`shrink-0 rounded-xl px-4 py-2 text-sm font-bold transition ${
                  year === y
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {isComingSoon ? (
          <div className="rounded-3xl border-2 border-dashed border-orange-200 bg-orange-50/50 px-6 py-16 text-center">
            <p className="text-4xl">🚀</p>
            <h2 className="mt-4 text-2xl font-black text-slate-900">
              {year} collection coming soon
            </h2>
            <p className="mx-auto mt-2 max-w-md text-slate-600">
              We&apos;re compiling traffic and search data for {year}. Try another year
              from the timeline above.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center">
            <Search size={32} className="mx-auto text-slate-300" />
            <h2 className="mt-4 text-xl font-bold text-slate-900">No matches</h2>
            <p className="mt-2 text-slate-500">
              Try a different search or category for {year}.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="mt-4 rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
                  {year} rankings
                </p>
                <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                  {filtered.length} trending site{filtered.length !== 1 ? "s" : ""}
                  {category !== "all" && (
                    <span className="text-violet-600">
                      {" "}
                      · {TREND_CATEGORIES[category].label}
                    </span>
                  )}
                </h2>
              </div>
              <p className="text-sm text-slate-500">
                Showing ranks {filtered[0]?.rank}–{filtered[filtered.length - 1]?.rank}
              </p>
            </div>

            {topThree.length >= 3 && !query && category === "all" && (
              <div className="mb-8">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
                  <Sparkles size={14} className="text-amber-500" />
                  Top 3 podium
                </h3>
                <div className="grid gap-4 lg:grid-cols-3 lg:items-end">
                  <PodiumCard site={topThree[0]} place={1} />
                  <PodiumCard site={topThree[1]} place={2} className="lg:-mt-2" />
                  <PodiumCard site={topThree[2]} place={3} />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                {topThree.length >= 3 && !query && category === "all"
                  ? "Full rankings"
                  : "Results"}
              </h3>

              {view === "list" ? (
                <div className="space-y-2">
                  {(topThree.length >= 3 && !query && category === "all"
                    ? rest
                    : filtered
                  ).map((site) => (
                    <SiteRow key={`${site.rank}-${site.url}`} site={site} />
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {(topThree.length >= 3 && !query && category === "all"
                    ? rest
                    : filtered
                  ).map((site) => (
                    <SiteGridCard key={`${site.rank}-${site.url}`} site={site} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Explore AIWedia */}
        <section className="mt-14 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
                Go deeper on AIWedia
              </p>
              <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                Useful next steps
              </h2>
            </div>
            <Link
              href="/category/ai-tools"
              className="inline-flex items-center gap-1 text-sm font-bold text-violet-600 hover:underline"
            >
              Browse all AI tools
              <ChevronRight size={16} />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {EXPLORE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-violet-200 hover:shadow-md"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-white shadow-lg`}
                >
                  <ArrowRight size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 group-hover:text-violet-700">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-500">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-900">Common questions</h2>
          <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {FAQ.map((item) => (
              <details key={item.q} className="group px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {item.q}
                    <ChevronRight
                      size={16}
                      className="shrink-0 text-slate-400 transition group-open:rotate-90"
                    />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="mt-8 text-center text-xs text-slate-400">
          Rankings are editorial estimates based on public traffic and search trends — not
          official statements from listed companies.
        </p>
      </div>
    </div>
  );
}
