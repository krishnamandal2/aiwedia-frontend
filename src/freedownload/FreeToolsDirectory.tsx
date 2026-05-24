"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Search,
  Download,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Zap,
  BookOpen,
} from "lucide-react";
import type { FreeToolListItem } from "@/lib/freeToolsApi";
import {
  FREE_DOWNLOAD_TRENDING,
  FREE_TOOL_CATEGORIES,
  getToolCategoryTag,
  isTrendingSlug,
  type FreeToolCategoryId,
} from "@/lib/freeDownloadSpotlight";

const FALLBACK_IMAGE =
  "https://res.cloudinary.com/dj3vrogpl/image/upload/v1768645475/aitools_wn5tnv.jpg";

export default function FreeToolsDirectory({
  tools,
}: {
  tools: FreeToolListItem[];
}) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<FreeToolCategoryId>("all");

  const sorted = useMemo(() => {
    return [...tools].sort(
      (a, b) => (a.priority ?? 999) - (b.priority ?? 999)
    );
  }, [tools]);

  const filtered = useMemo(() => {
    let list = sorted;

    if (tag === "trending") {
      list = list.filter((item) => isTrendingSlug(item.slug));
    } else if (tag !== "all") {
      list = list.filter(
        (item) =>
          getToolCategoryTag(
            item.slug,
            item.title || item.categoryTitle || "",
            item.tags
          ) === tag
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (item) =>
          (item.title || item.categoryTitle || "").toLowerCase().includes(q) ||
          (item.intro || "").toLowerCase().includes(q) ||
          item.slug.toLowerCase().includes(q)
      );
    }

    return list;
  }, [sorted, query, tag]);

  return (
    <section className="relative min-h-screen bg-[#06060c] text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-600/10 blur-[120px]" />
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-violet-600/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <header className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-300">
            <Download size={12} aria-hidden />
            Free download hub
          </div>
          <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            Free tools people{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              search on Google
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-lg">
            Instagram, TikTok, YouTube, PDF, images — curated pages with trusted
            links. No signup on AIWedia.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/web-directory"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Web utilities hub
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/blog/best-free-download-tools-social-video-2026"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200"
            >
              <BookOpen size={16} />
              Download guide
            </Link>
          </div>
        </header>

        {/* Trending searches — helpful, not filters */}
        <div className="mb-8 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent p-4 sm:p-5">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
            <TrendingUp size={14} aria-hidden />
            Most searched on Google
          </p>
          <div
            className="flex gap-2 overflow-x-auto pb-1 overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {FREE_DOWNLOAD_TRENDING.map((item) => (
              <Link
                key={item.slug}
                href={`/tools/${item.slug}`}
                className="flex min-h-[72px] min-w-[9.5rem] max-w-[11rem] shrink-0 flex-col justify-between rounded-xl border border-white/10 bg-[#0a0a12]/80 p-3 transition active:scale-[0.98] hover:border-emerald-500/40"
              >
                <span className="text-xl" aria-hidden>
                  {item.emoji}
                </span>
                <div>
                  <span className="block text-xs font-bold leading-tight text-white">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-amber-400/90">
                    {item.searches}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="sticky top-[4rem] z-20 mb-8 space-y-3 rounded-2xl border border-white/10 bg-[#0a0a12]/95 p-3 backdrop-blur-xl sm:top-[4.5rem] sm:p-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools (e.g. TikTok, PDF merge)…"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-base text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none sm:text-sm"
            />
          </div>
          <div
            className="flex gap-2 overflow-x-auto pb-0.5 overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {FREE_TOOL_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setTag(c.id)}
                className={`flex min-h-[40px] shrink-0 items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold transition touch-manipulation ${
                  tag === c.id
                    ? "bg-emerald-600 text-white"
                    : "border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <span aria-hidden>{c.emoji}</span>
                {c.label}
              </button>
            ))}
          </div>
          <p className="flex items-center gap-1 text-xs text-slate-500">
            <Zap size={12} className="text-emerald-400" />
            <strong className="text-slate-300">{filtered.length}</strong> of{" "}
            {tools.length} tool pages
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 px-6 py-16 text-center">
            <p className="text-slate-400">No tools match. Try &quot;All&quot; or clear search.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTag("all");
              }}
              className="mt-4 min-h-[44px] rounded-xl bg-emerald-600 px-5 py-2 text-sm font-bold text-white"
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item) => (
              <Link
                key={item.slug}
                href={`/tools/${item.slug}`}
                className="group flex h-full min-h-[200px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent transition hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-900/10 active:scale-[0.99]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <Image
                    src={item.image?.trim() ? item.image : FALLBACK_IMAGE}
                    alt={item.title || item.categoryTitle || "Tool"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06060c] to-transparent" />
                  {isTrendingSlug(item.slug) && (
                    <span className="absolute right-3 top-3 rounded-full bg-amber-500/90 px-2 py-0.5 text-[10px] font-bold text-slate-900">
                      Trending
                    </span>
                  )}
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-200 backdrop-blur">
                    <Sparkles size={10} aria-hidden />
                    Free
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h2 className="line-clamp-2 text-sm font-bold text-white group-hover:text-emerald-300 sm:text-base">
                    {item.title || item.categoryTitle || "Tool"}
                  </h2>
                  <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-500">
                    {item.intro}
                  </p>
                  <span className="mt-3 inline-flex min-h-[40px] items-center gap-1 text-xs font-semibold text-emerald-400">
                    Open tools list
                    <ArrowUpRight
                      size={14}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <section className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center sm:p-8">
          <h2 className="text-lg font-bold text-white sm:text-xl">
            Need AI tools too?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-400">
            Jump to coding, SEO, and automation directories — built for the same
            high-intent traffic.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/ai-directory"
              className="inline-flex min-h-[48px] items-center rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-500"
            >
              AI tools directory
            </Link>
            <Link
              href="/best"
              className="inline-flex min-h-[48px] items-center rounded-xl border border-white/15 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/5"
            >
              Best-of guides
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
