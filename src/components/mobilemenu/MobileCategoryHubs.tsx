"use client";

import Link from "next/link";
import { Sparkles, Globe, ChevronRight, Zap } from "lucide-react";
import type { MenuCategory } from "@/lib/megaMenuUtils";
import { WEB_SPOTLIGHT, webCategoryEmoji } from "@/lib/megaMenuUtils";

const AI_PREVIEW = 5;
const WEB_CHIP_COUNT = 10;

function splitByTypeui(categories: MenuCategory[]) {
  const ai: MenuCategory[] = [];
  const web: MenuCategory[] = [];

  for (const cat of categories) {
    if (cat.typeui === "web") web.push(cat);
    else if (cat.typeui === "ai") ai.push(cat);
    else if (cat.slug.startsWith("ai-")) ai.push(cat);
    else web.push(cat);
  }

  const byRank = (a: MenuCategory, b: MenuCategory) =>
    (a.rank ?? 999) - (b.rank ?? 999);

  return {
    ai: ai.sort(byRank),
    web: web.sort(byRank),
  };
}

function AiHubBlock({
  categories,
  onNavigate,
}: {
  categories: MenuCategory[];
  onNavigate?: () => void;
}) {
  const preview = categories.slice(0, AI_PREVIEW);

  return (
    <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-3.5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-700">
            <Sparkles size={12} aria-hidden />
            AI Categories
          </div>
          <p className="text-xs text-slate-500">Coding, SEO, agents & more</p>
        </div>
        <Link
          href="/ai-directory"
          onClick={onNavigate}
          className="shrink-0 min-h-[44px] inline-flex items-center text-xs font-bold text-violet-600"
        >
          View all
        </Link>
      </div>

      <ul className="space-y-0.5">
        {preview.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/category/${cat.slug}`}
              onClick={onNavigate}
              className="flex min-h-[44px] items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-sm font-medium text-slate-800 active:bg-violet-100/80"
            >
              <span className="truncate">🤖 {cat.title}</span>
              <ChevronRight size={16} className="shrink-0 text-violet-400" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WebHubBlock({
  categories,
  onNavigate,
}: {
  categories: MenuCategory[];
  onNavigate?: () => void;
}) {
  const chips = categories.slice(0, WEB_CHIP_COUNT);

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-cyan-50/50 via-white to-amber-50/30 p-3.5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-700">
            <Globe size={12} aria-hidden />
            Web Categories
          </div>
          <p className="text-xs text-slate-500">Games, PDF, downloads & utilities</p>
        </div>
        <Link
          href="/#web-categories"
          onClick={onNavigate}
          className="shrink-0 min-h-[44px] inline-flex items-center text-xs font-bold text-slate-700"
        >
          View all
        </Link>
      </div>

      {/* Spotlight — no filter chips */}
      <p className="mb-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
        <Zap size={11} aria-hidden />
        Popular right now
      </p>
      <div className="mb-3 grid grid-cols-2 gap-2">
        {WEB_SPOTLIGHT.map((pick) => (
          <Link
            key={pick.href}
            href={pick.href}
            onClick={onNavigate}
            className="flex min-h-[72px] flex-col justify-between rounded-xl border border-white/80 bg-white p-3 shadow-sm transition active:scale-[0.98] active:bg-slate-50"
          >
            <span className="text-2xl leading-none" aria-hidden>
              {pick.emoji}
            </span>
            <div>
              <span className="block text-sm font-bold leading-tight text-slate-900">
                {pick.label}
              </span>
              <span className="mt-0.5 block text-[10px] font-medium text-slate-500">
                {pick.tag}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
        Browse by topic
      </p>
      <ul className="max-h-[min(40vh,280px)] space-y-0.5 overflow-y-auto overscroll-y-contain">
        {chips.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/category/${cat.slug}`}
              onClick={onNavigate}
              className="flex min-h-[44px] items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-medium text-slate-800 active:bg-slate-100"
            >
              <span className="text-xl leading-none" aria-hidden>
                {webCategoryEmoji(cat.slug)}
              </span>
              <span className="min-w-0 flex-1 truncate">{cat.title}</span>
              <ChevronRight size={16} className="shrink-0 text-slate-400" />
            </Link>
          </li>
        ))}
      </ul>

      {categories.length > WEB_CHIP_COUNT && (
        <Link
          href="/#web-categories"
          onClick={onNavigate}
          className="mt-2 block min-h-[44px] text-center text-xs font-semibold leading-[44px] text-slate-600"
        >
          +{categories.length - WEB_CHIP_COUNT} more on home →
        </Link>
      )}
    </div>
  );
}

export default function MobileCategoryHubs({
  categories,
  onNavigate,
}: {
  categories: MenuCategory[];
  onNavigate?: () => void;
}) {
  const { ai, web } = splitByTypeui(categories);

  if (ai.length === 0 && web.length === 0) return null;

  return (
    <div className="space-y-3">
      {ai.length > 0 && <AiHubBlock categories={ai} onNavigate={onNavigate} />}
      {web.length > 0 && <WebHubBlock categories={web} onNavigate={onNavigate} />}
    </div>
  );
}
