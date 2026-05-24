"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  ChevronRight,
  GitCompare,
  Grid3X3,
  LayoutList,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import type { Tool } from "@/lib/types";
import {
  AI_TYPE_FILTERS,
  PRICING_FILTERS,
  enrichAiTools,
  filterAndSortTools,
  getTypeCounts,
  type EnrichedAiTool,
  type AiToolType,
  type PricingTier,
  type SortOption,
} from "@/lib/aiToolsUtils";
import AiToolCard from "./AiToolCard";
import AiToolPreviewModal from "./AiToolPreviewModal";
import WebCategoryHelpers from "@/components/category/WebCategoryHelpers";
import { theme, isAiCategorySlug } from "@/lib/siteTheme";

const MAX_COMPARE = 3;

function favoritesKey(slug: string) {
  return `aiwedia_favorites_${slug}`;
}

interface AiToolsPlatformProps {
  tools: Tool[];
  title?: string;
  categorySlug?: string;
  /** Category description from API — visible copy helps SEO */
  seoDescription?: string;
}

export default function AiToolsPlatform({
  tools,
  title = "Tools Directory",
  categorySlug = "default",
  seoDescription,
}: AiToolsPlatformProps) {
  const storageKey = favoritesKey(categorySlug);
  const isAiCategory = isAiCategorySlug(categorySlug);
  const enriched = useMemo(() => enrichAiTools(tools), [tools]);
  const typeCounts = useMemo(() => getTypeCounts(enriched), [enriched]);

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<AiToolType | "all">("all");
  const [pricingFilter, setPricingFilter] = useState<PricingTier | "all">("all");
  const [sort, setSort] = useState<SortOption>("rank");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [previewTool, setPreviewTool] = useState<EnrichedAiTool | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showComparePanel, setShowComparePanel] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setFavorites(new Set(JSON.parse(raw) as string[]));
      else setFavorites(new Set());
    } catch {
      setFavorites(new Set());
    }
  }, [storageKey]);

  const persistFavorites = useCallback(
    (next: Set<string>) => {
      setFavorites(next);
      localStorage.setItem(storageKey, JSON.stringify([...next]));
    },
    [storageKey]
  );

  const toggleFavorite = useCallback(
    (slug: string) => {
      const next = new Set(favorites);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      persistFavorites(next);
    },
    [favorites, persistFavorites]
  );

  const toggleCompare = useCallback((slug: string) => {
    setCompareSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, slug];
    });
  }, []);

  const filtered = useMemo(
    () =>
      filterAndSortTools(enriched, {
        query,
        type: typeFilter,
        pricing: pricingFilter,
        sort,
        favoritesOnly,
        favoriteSlugs: favorites,
      }),
    [enriched, query, typeFilter, pricingFilter, sort, favoritesOnly, favorites]
  );

  const featured = useMemo(
    () => enriched.filter((t) => t.rank > 0 && t.rank <= 3).sort((a, b) => a.rank - b.rank),
    [enriched]
  );

  const compareTools = useMemo(
    () => enriched.filter((t) => compareSlugs.includes(t.slug)),
    [enriched, compareSlugs]
  );

  const freeCount = enriched.filter((t) => t.pricing === "free").length;

  const clearFilters = () => {
    setQuery("");
    setTypeFilter("all");
    setPricingFilter("all");
    setFavoritesOnly(false);
    setSort("rank");
  };

  const hasActiveFilters =
    query ||
    typeFilter !== "all" ||
    pricingFilter !== "all" ||
    favoritesOnly ||
    sort !== "rank";

  return (
    <div className={`${theme.page} relative isolate overflow-x-hidden`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-40 top-0 h-[320px] w-[320px] rounded-full bg-violet-50 blur-[80px]" />
        <div className="absolute -right-40 top-1/4 h-[280px] w-[280px] rounded-full bg-slate-50 blur-[70px]" />
      </div>

      <header className={theme.headerBar}>
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link
              href="/"
              className="flex items-center gap-1 transition hover:text-violet-600"
            >
              <ArrowLeft size={14} className="sm:hidden" />
              Home
            </Link>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="truncate text-slate-900">{title}</span>
          </nav>
          <span className={`hidden sm:inline ${theme.badge}`}>
            {isAiCategory ? "AI directory" : "Curated"}
          </span>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pt-12 sm:pb-10">
        <div className={theme.badge}>
          <Sparkles size={12} className="inline mr-1 text-violet-600" />
          {isAiCategory ? "Curated AI tools" : "Curated directory"}
        </div>

        <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className={`mt-4 max-w-2xl text-base sm:text-lg ${theme.muted}`}>
          {seoDescription ??
            `Search, filter by type and pricing, save favorites, and compare tools — all in one place.`}
        </p>
        <p className="mt-3 text-sm">
          <Link
            href="/ai-directory"
            className="font-semibold text-violet-600 hover:text-violet-700 hover:underline"
          >
            Browse all directories →
          </Link>
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total tools", value: enriched.length, icon: Zap },
            { label: "Filter types", value: AI_TYPE_FILTERS.length - 1, icon: Grid3X3 },
            { label: "Free tools", value: freeCount, icon: Star },
            { label: "Your saves", value: favorites.size, icon: Bookmark },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className={`${theme.card} p-4`}>
              <Icon size={18} className="text-violet-600" />
              <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
              <p className={`text-xs ${theme.subtle}`}>{label}</p>
            </div>
          ))}
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <div className="mt-10">
            <h2 className={`mb-4 text-xs font-bold uppercase tracking-widest ${theme.subtle}`}>
              Featured picks
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {featured.map((tool) => (
                <a
                  key={tool.slug}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 p-4 ${theme.card} ${theme.cardHover}`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-lg font-black text-white">
                    #{tool.rank}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-bold text-slate-900 group-hover:text-violet-700">
                      {tool.title}
                    </p>
                    <p className="line-clamp-1 text-xs text-slate-600">
                      {tool.description}
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="ml-auto shrink-0 text-slate-400 group-hover:text-violet-600"
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Toolbar */}
      <div className={`${theme.stickyBar} top-14`}>
        <div className="mx-auto max-w-7xl space-y-3 px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${title.toLowerCase()}, features, use cases...`}
                className={`min-h-[48px] w-full touch-manipulation py-3 pl-10 pr-10 text-base sm:text-sm ${theme.input}`}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className={`px-3 py-2.5 text-xs font-semibold ${theme.input}`}
                aria-label="Sort tools"
              >
                <option value="rank">Top ranked</option>
                <option value="name-asc">A → Z</option>
                <option value="name-desc">Z → A</option>
              </select>

              <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-0.5">
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  className={`rounded-lg p-2 ${view === "grid" ? "bg-violet-600 text-white" : "text-slate-500"}`}
                  aria-label="Grid view"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className={`rounded-lg p-2 ${view === "list" ? "bg-violet-600 text-white" : "text-slate-500"}`}
                  aria-label="List view"
                >
                  <LayoutList size={16} />
                </button>
              </div>

              {isAiCategory && (
                <button
                  type="button"
                  onClick={() => setFiltersOpen((o) => !o)}
                  className="flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 lg:hidden"
                >
                  <SlidersHorizontal size={16} />
                  Filters
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setCompareMode((m) => !m);
                  if (compareMode) setCompareSlugs([]);
                }}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                  compareMode
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                <GitCompare size={16} />
                Compare
              </button>

              <button
                type="button"
                onClick={() => setFavoritesOnly((f) => !f)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                  favoritesOnly
                    ? "border-amber-300 bg-amber-50 text-amber-800"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                <Bookmark size={16} />
                Saved
              </button>
            </div>
          </div>

          {isAiCategory ? (
            <>
              <div
                className={`flex gap-2 overflow-x-auto pb-1 scrollbar-none ${filtersOpen ? "block" : "hidden lg:flex"}`}
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {AI_TYPE_FILTERS.map((f) => {
                  const count =
                    f.id === "all" ? typeCounts.all : typeCounts[f.id] ?? 0;
                  const active = typeFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setTypeFilter(f.id)}
                      className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                        active ? theme.chipActive : theme.chipIdle
                      }`}
                    >
                      <span className="mr-1">{f.icon}</span>
                      {f.label}
                      <span className="ml-1.5 opacity-60">({count})</span>
                    </button>
                  );
                })}
              </div>

              <div
                className={`flex flex-wrap gap-2 ${filtersOpen ? "flex" : "hidden lg:flex"}`}
              >
                {PRICING_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setPricingFilter(f.id)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      pricingFilter === f.id
                        ? "border-violet-500 bg-violet-100 text-violet-800"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </>
          ) : (
            <WebCategoryHelpers
              categorySlug={categorySlug}
              toolCount={enriched.length}
            />
          )}
        </div>
      </div>

      {/* Main grid */}
      <main className="relative mx-auto max-w-7xl px-4 py-8 pb-32 sm:px-6 sm:py-10">
        <div className="mb-6 flex items-center justify-between">
          <p className={`text-sm ${theme.subtle}`}>
            Showing{" "}
            <span className="font-bold text-slate-900">{filtered.length}</span> of{" "}
            {enriched.length} resources
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-8 py-16 text-center">
            <Search className="mx-auto text-slate-400" size={40} />
            <h3 className="mt-4 text-lg font-bold text-slate-900">No tools found</h3>
            <p className={`mt-2 text-sm ${theme.subtle}`}>
              Try adjusting filters or search terms.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className={`mt-6 ${theme.btnPrimary}`}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
                : "flex flex-col gap-4"
            }
          >
            {filtered.map((tool) => (
              <AiToolCard
                key={tool.slug}
                tool={tool}
                view={view}
                isFavorite={favorites.has(tool.slug)}
                isSelected={compareSlugs.includes(tool.slug)}
                compareMode={compareMode}
                onToggleFavorite={toggleFavorite}
                onToggleCompare={toggleCompare}
                onPreview={setPreviewTool}
              />
            ))}
          </div>
        )}
      </main>

      {/* Compare floating bar */}
      {compareMode && compareSlugs.length > 0 && (
        <div className="fixed bottom-20 left-4 right-4 z-40 mx-auto max-w-lg sm:bottom-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-violet-200 bg-white px-4 py-3 shadow-lg">
            <span className="text-sm font-semibold text-slate-700">
              {compareSlugs.length}/{MAX_COMPARE} selected
            </span>
            <button
              type="button"
              onClick={() => setShowComparePanel(true)}
              className={theme.btnPrimary}
            >
              View compare
            </button>
            <button
              type="button"
              onClick={() => setCompareSlugs([])}
              className="text-slate-500 hover:text-slate-800"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Compare panel */}
      {showComparePanel && compareTools.length > 0 && (
        <div className="fixed inset-0 z-[1200] flex items-end sm:items-center sm:justify-center sm:p-6">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setShowComparePanel(false)}
          />
          <div className="relative z-10 max-h-[85vh] w-full overflow-hidden rounded-t-2xl border border-slate-200 bg-white sm:max-w-4xl sm:rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h3 className="font-bold text-slate-900">Compare tools</h3>
              <button type="button" onClick={() => setShowComparePanel(false)}>
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <div className="overflow-x-auto p-4">
              <div className="grid min-w-[600px] grid-cols-3 gap-4">
                {compareTools.map((tool) => (
                  <div
                    key={tool.slug}
                    className={`${theme.card} p-4`}
                  >
                    <h4 className="font-bold text-slate-900">{tool.title}</h4>
                    <p className="mt-1 text-xs capitalize font-semibold text-violet-700">
                      {tool.pricing}
                    </p>
                    <p className="mt-2 line-clamp-4 text-xs text-slate-600">
                      {tool.description}
                    </p>
                    <ul className="mt-3 space-y-1">
                      {tool.benefits?.slice(0, 3).map((b, i) => (
                        <li key={i} className="text-[11px] text-slate-500">
                          • {b}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-4 block py-2 text-center text-xs font-bold text-white ${theme.btnPrimary}`}
                    >
                      Open
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <AiToolPreviewModal
        tool={previewTool}
        isFavorite={previewTool ? favorites.has(previewTool.slug) : false}
        onClose={() => setPreviewTool(null)}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
