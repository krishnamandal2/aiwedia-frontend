"use client";

import { useState, useMemo } from "react";
import {
  trendingData,
  Website,
  TRENDING_YEARS,
} from "@/data/trendingsitedata/Trendingdata";
import {
  Search,
  TrendingUp,
  Globe,
  ExternalLink,
  BarChart3,
  ChevronRight,
} from "lucide-react";

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function mockSearchInterest(rank: number): string {
  return `${Math.max(12, 92 - rank * 8)}`;
}

type TrendingYear = (typeof TRENDING_YEARS)[number];

export default function TrendingWebsites() {
  const [year, setYear] = useState<TrendingYear>(
    TRENDING_YEARS.find((y) => y !== "2026") ?? "2025"
  );
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"leaderboard" | "cards">("leaderboard");

  const rawData = trendingData[year];
  const isComingSoon = rawData === "coming-soon";

  const sites = useMemo(() => {
    if (isComingSoon || !Array.isArray(rawData)) return [];
    if (!query.trim()) return rawData;
    const q = query.toLowerCase();
    return rawData.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }, [rawData, query, isComingSoon]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#06060c] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-[480px] w-[480px] rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet-600/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Header */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-blue-300">
            <BarChart3 size={12} />
            Google Search Trends Archive
          </div>
          <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Most searched{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              websites
            </span>
          </h1>
          <p className="mt-4 max-w-3xl text-base text-slate-400 sm:text-lg">
            Year-by-year snapshot of the sites people searched for most on
            Google — like a simplified trends dashboard. Pick a year to explore
            the leaderboard.
          </p>
        </header>

        {/* Controls */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {TRENDING_YEARS.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                  year === y
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg"
                    : "border border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                }`}
              >
                {y}
                {y === "2026" && (
                  <span className="ml-1 text-[10px] opacity-70">soon</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[200px] flex-1 lg:max-w-xs">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter sites…"
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:outline-none"
              />
            </div>
            <div className="flex rounded-xl border border-white/10 p-0.5">
              <button
                type="button"
                onClick={() => setView("leaderboard")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  view === "leaderboard"
                    ? "bg-blue-600 text-white"
                    : "text-slate-400"
                }`}
              >
                Leaderboard
              </button>
              <button
                type="button"
                onClick={() => setView("cards")}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  view === "cards" ? "bg-blue-600 text-white" : "text-slate-400"
                }`}
              >
                Cards
              </button>
            </div>
          </div>
        </div>

        {isComingSoon ? (
          <div className="rounded-3xl border border-dashed border-blue-500/30 bg-blue-500/5 px-8 py-20 text-center">
            <TrendingUp className="mx-auto text-blue-400" size={48} />
            <h2 className="mt-4 text-2xl font-bold text-white">
              {year} data coming soon
            </h2>
            <p className="mx-auto mt-2 max-w-md text-slate-400">
              We&apos;re compiling search trend signals for {year}. Select an
              earlier year to browse historical rankings.
            </p>
          </div>
        ) : view === "leaderboard" ? (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 border-b border-white/10 bg-white/[0.04] px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:px-6">
              <span>Rank</span>
              <span>Website</span>
              <span className="hidden sm:block">Interest</span>
              <span className="text-right">Action</span>
            </div>
            <ul>
              {sites.map((site: Website, index: number) => (
                <li
                  key={`${site.name}-${index}`}
                  className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 border-b border-white/5 px-4 py-4 transition hover:bg-white/[0.04] sm:px-6"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black ${
                      index === 0
                        ? "bg-amber-500/20 text-amber-300"
                        : index < 3
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-white/5 text-slate-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-white">{site.name}</p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
                      {getDomain(site.url)} · {site.description}
                    </p>
                  </div>
                  <div className="hidden items-center gap-2 sm:flex">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        style={{
                          width: `${100 - index * 9}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-cyan-400/90">
                      {mockSearchInterest(index)}
                    </span>
                  </div>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-blue-600 hover:text-white"
                  >
                    Visit
                    <ExternalLink size={12} />
                  </a>
                </li>
              ))}
            </ul>
            {sites.length === 0 && (
              <p className="py-12 text-center text-slate-500">No matches</p>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((site: Website, index: number) => (
              <article
                key={`${site.name}-${index}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-blue-500/40 hover:bg-white/[0.06]"
              >
                <div className="mb-4 flex items-start justify-between">
                  <span className="rounded-lg bg-blue-600/20 px-2.5 py-1 text-sm font-black text-blue-300">
                    #{index + 1}
                  </span>
                  <Globe size={18} className="text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300">
                  {site.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                  {site.description}
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  {getDomain(site.url)}
                </p>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                >
                  Open site
                  <ChevronRight size={16} />
                </a>
              </article>
            ))}
          </div>
        )}

        {!isComingSoon && (
          <p className="mt-8 text-center text-xs text-slate-500">
            Rankings are editorial snapshots inspired by global search interest
            patterns · Not official Google data
          </p>
        )}
      </div>
    </section>
  );
}
