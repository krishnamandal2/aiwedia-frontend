"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Search,
  X,
  ArrowUpRight,
  Zap,
  SlidersHorizontal,
} from "lucide-react";
import {
  MEGA_FILTERS,
  QUICK_LINKS,
  WEB_SPOTLIGHT,
  FILTER_LOOKUP,
  enrichMenuCategories,
  filterMenuCategories,
  getFilterCounts,
  type MenuCategory,
  type MegaFilterId,
  type MegaSortId,
} from "@/lib/megaMenuUtils";

const DISPLAY_LIMIT = 28;

interface MegaMenuPanelProps {
  categories: MenuCategory[];
  variant: "dropdown" | "sheet";
  onClose: () => void;
}

export default function MegaMenuPanel({
  categories,
  variant,
  onClose,
}: MegaMenuPanelProps) {
  const isCompact = variant === "dropdown";
  const isMobileSheet = variant === "sheet";

  const enriched = useMemo(
    () => enrichMenuCategories(categories),
    [categories]
  );
  const counts = useMemo(() => getFilterCounts(enriched), [enriched]);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<MegaFilterId>("all");
  const [sort, setSort] = useState<MegaSortId>("rank");

  const activeFilter = isMobileSheet ? "all" : filter;
  const activeSort = isMobileSheet ? "rank" : sort;

  const filtered = useMemo(
    () =>
      filterMenuCategories(enriched, {
        query,
        filter: activeFilter,
        sort: activeSort,
      }),
    [enriched, query, activeFilter, activeSort]
  );

  const visible = filtered.slice(0, DISPLAY_LIMIT);
  const hasMore = filtered.length > DISPLAY_LIMIT;

  const clearAll = () => {
    setQuery("");
    setFilter("all");
    setSort("rank");
  };

  const hasActive =
    Boolean(query.trim()) ||
    (!isMobileSheet && (filter !== "all" || sort !== "rank"));

  const closeAndReset = () => {
    onClose();
    setQuery("");
    setFilter("all");
    setSort("rank");
  };

  return (
    <div
      className={`flex flex-col ${
        isCompact ? "max-h-[min(70vh,520px)]" : "max-h-full min-h-0 flex-1"
      }`}
    >
      {/* Header */}
      <div className="shrink-0 border-b border-slate-100 px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-2">
          <p className="min-w-0 flex-1 text-sm font-bold text-slate-900">
            Categories
            <span className="ml-1.5 text-xs font-normal text-slate-500">
              ({filtered.length})
            </span>
          </p>
          {variant === "sheet" && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          )}
          {hasActive && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-medium text-violet-600 hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        <div className="relative mt-2">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-8 pr-8 text-base text-slate-900 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 sm:py-2 sm:text-sm"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {isCompact && (
          <>
            <div className="mt-2 flex gap-1 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {MEGA_FILTERS.map((f) => {
                const count = counts[f.id] ?? 0;
                if (f.id !== "all" && count === 0) return null;
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                      active
                        ? "bg-violet-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <span className="mr-0.5">{f.icon}</span>
                    {f.label}
                    <span
                      className={`ml-1 ${active ? "text-white/80" : "text-slate-400"}`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <SlidersHorizontal size={12} className="text-slate-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as MegaSortId)}
                className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-violet-400"
                aria-label="Sort categories"
              >
                <option value="rank">Top ranked</option>
                <option value="name-asc">A → Z</option>
                <option value="name-desc">Z → A</option>
              </select>
            </div>
          </>
        )}

        {isCompact && (
          <div className="mt-2 flex flex-wrap gap-1">
            {QUICK_LINKS.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeAndReset}
                className="inline-flex min-h-[36px] items-center gap-0.5 rounded-md bg-violet-50 px-2 py-1 text-[11px] font-semibold text-violet-700 hover:bg-violet-100"
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Mobile sheet: spotlight instead of filter chips */}
      {isMobileSheet && !query.trim() && (
        <div className="shrink-0 border-b border-slate-100 px-3 py-3 sm:px-4">
          <p className="mb-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
            <Zap size={11} aria-hidden />
            Trending picks
          </p>
          <div className="grid grid-cols-2 gap-2">
            {WEB_SPOTLIGHT.map((pick) => (
              <Link
                key={pick.href}
                href={pick.href}
                onClick={closeAndReset}
                className="flex min-h-[68px] flex-col justify-between rounded-xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-2.5 active:scale-[0.98]"
              >
                <span className="text-xl" aria-hidden>
                  {pick.emoji}
                </span>
                <span className="text-xs font-bold text-slate-800">{pick.label}</span>
              </Link>
            ))}
          </div>
          <div
            className="mt-2 flex gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeAndReset}
                className="inline-flex min-h-[40px] shrink-0 items-center gap-1 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-[11px] font-semibold text-violet-800 active:bg-violet-100"
              >
                <span aria-hidden>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Desktop dropdown quick links */}
      {!isMobileSheet && (
        <div className="shrink-0 flex flex-wrap gap-1 border-b border-slate-50 px-3 py-2 sm:px-4">
          {QUICK_LINKS.slice(4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeAndReset}
              className="inline-flex items-center gap-0.5 rounded-md bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700 hover:bg-violet-100"
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-2 sm:px-4">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">
            No categories match.{" "}
            <button
              type="button"
              onClick={clearAll}
              className="font-semibold text-violet-600 hover:underline"
            >
              Reset
            </button>
          </p>
        ) : (
          <>
            <ul
              className={`grid gap-1 ${
                isCompact
                  ? "grid-cols-2 sm:grid-cols-3"
                  : "grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {visible.map((cat) => {
                const meta = FILTER_LOOKUP[cat.group];
                return (
                  <li key={cat.slug}>
                    <Link
                      href={`/category/${cat.slug}`}
                      prefetch={false}
                      onClick={closeAndReset}
                      className="group flex min-h-[44px] items-center gap-2 rounded-lg border border-transparent px-2 py-2.5 text-left transition active:bg-violet-50/80 hover:border-violet-200 hover:bg-violet-50/80"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-sm group-hover:bg-violet-100">
                        {meta?.icon ?? "✦"}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-slate-800 group-hover:text-violet-900">
                          {cat.title}
                        </span>
                        <span className="block truncate text-[10px] text-slate-500">
                          {meta?.label ?? "Directory"}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={12}
                        className="shrink-0 text-slate-300 opacity-0 transition group-hover:opacity-100 group-hover:text-violet-500"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            {hasMore && (
              <Link
                href="/#categories"
                onClick={closeAndReset}
                className="mt-2 block text-center text-xs font-bold text-violet-600 hover:underline"
              >
                View all {filtered.length} categories →
              </Link>
            )}
          </>
        )}
      </div>

      {!isCompact && (
        <div className="shrink-0 border-t border-slate-100 px-4 py-2 text-center">
          <Link
            href="/#categories"
            onClick={closeAndReset}
            className="text-xs font-semibold text-violet-600 hover:underline"
          >
            Browse full directory
          </Link>
        </div>
      )}
    </div>
  );
}
