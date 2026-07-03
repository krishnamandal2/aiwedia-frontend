"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Bookmark,
  Check,
  ExternalLink,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import type { EnrichedAiTool } from "@/lib/aiToolsUtils";
import { trackOutboundLink } from "@/lib/analytics";
import type { ToolRatingSummary } from "@/lib/toolRatingsApi";

const PRICING_STYLES = {
  free: "bg-emerald-50 text-emerald-700 border-emerald-200",
  freemium: "bg-violet-50 text-violet-700 border-violet-200",
  paid: "bg-amber-50 text-amber-700 border-amber-200",
};

const TYPE_LABELS: Record<string, string> = {
  chat: "Chat",
  image: "Image",
  video: "Video",
  code: "Code",
  writing: "Writing",
  research: "Research",
  design: "Design",
  productivity: "Product",
};

interface AiToolCardProps {
  tool: EnrichedAiTool;
  isFavorite: boolean;
  isSelected: boolean;
  compareMode: boolean;
  onToggleFavorite: (slug: string) => void;
  onToggleCompare: (slug: string) => void;
  onPreview: (tool: EnrichedAiTool) => void;
  view: "grid" | "list";
  communityRating?: ToolRatingSummary | null;
}

export default function AiToolCard({
  tool,
  isFavorite,
  isSelected,
  compareMode,
  onToggleFavorite,
  onToggleCompare,
  onPreview,
  view,
  communityRating,
}: AiToolCardProps) {
  const initials = tool.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const hasImage = Boolean(tool.image?.trim());

  if (view === "list") {
    return (
      <article className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-violet-300 hover:shadow-md sm:flex-row sm:items-center">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-violet-50 sm:h-16 sm:w-16">
          {hasImage ? (
            <Image
              src={tool.image}
              alt={tool.title}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-sm font-bold text-violet-600">
              {initials}
            </span>
          )}
          {tool.rank > 0 && tool.rank <= 10 && (
            <span className="absolute -right-1 -top-1 rounded-full bg-violet-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
              #{tool.rank}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/tool/${tool.categorySlug}/${tool.slug}`}
              className="truncate text-sm font-bold text-slate-900 hover:text-violet-700 sm:text-base"
            >
              {tool.title}
            </Link>
            {tool.editorsPick && (
              <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800">
                Pick
              </span>
            )}
            {tool.editorScore != null && tool.editorScore > 0 && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-700">
                <Star size={8} className="fill-amber-400 text-amber-500" />
                {tool.editorScore}
              </span>
            )}
            {communityRating && communityRating.count > 0 && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-slate-900 px-1.5 py-0.5 text-[9px] font-bold text-white">
                <Star size={8} className="fill-amber-400 text-amber-400" />
                {communityRating.average}
                <Users size={8} className="opacity-70" />
                {communityRating.count}
              </span>
            )}
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${PRICING_STYLES[tool.pricing]}`}
            >
              {tool.pricing}
            </span>
            {tool.types.slice(0, 2).map((t) => (
              <span
                key={t}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
              >
                {TYPE_LABELS[t]}
              </span>
            ))}
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-slate-600 sm:text-sm">
            {tool.description}
          </p>
        </div>

        <CardActions
          tool={tool}
          isFavorite={isFavorite}
          isSelected={isSelected}
          compareMode={compareMode}
          onToggleFavorite={onToggleFavorite}
          onToggleCompare={onToggleCompare}
          onPreview={onPreview}
          compact
        />
      </article>
    );
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-100 bg-slate-100">
        {hasImage ? (
          <Image
            src={tool.image}
            alt={tool.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-100 to-slate-100">
            <span className="text-3xl font-black text-violet-200">{initials}</span>
          </div>
        )}

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {tool.rank > 0 && tool.rank <= 5 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              <Sparkles size={10} />
              Top {tool.rank}
            </span>
          )}
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${PRICING_STYLES[tool.pricing]}`}
          >
            {tool.pricing}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onToggleFavorite(tool.slug)}
          className="absolute right-3 top-3 rounded-full border border-slate-200/80 bg-white/90 p-2 text-slate-500 shadow-sm transition hover:text-amber-500"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Bookmark
            size={16}
            className={isFavorite ? "fill-amber-400 text-amber-500" : ""}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-2 flex flex-wrap gap-1">
          {tool.types.slice(0, 2).map((t) => (
            <span
              key={t}
              className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
            >
              {TYPE_LABELS[t]}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/tool/${tool.categorySlug}/${tool.slug}`}
            className="line-clamp-1 text-base font-bold text-slate-900 group-hover:text-violet-700"
          >
            {tool.title}
          </Link>
          {tool.editorsPick && (
            <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800">
              Editor&apos;s pick
            </span>
          )}
          {tool.editorScore != null && tool.editorScore > 0 && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-slate-600">
              <Star size={10} className="fill-amber-400 text-amber-500" />
              {tool.editorScore}/10
            </span>
          )}
          {communityRating && communityRating.count > 0 && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-slate-600">
              <Star size={10} className="fill-amber-400 text-amber-500" />
              {communityRating.average}
              <span className="font-normal text-slate-400">
                ({communityRating.count})
              </span>
            </span>
          )}
        </div>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">
          {tool.description}
        </p>

        {tool.benefits && tool.benefits.length > 0 && (
          <ul className="mt-3 space-y-1 border-t border-slate-100 pt-3">
            {tool.benefits.slice(0, 2).map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-xs text-slate-500"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-500" />
                <span className="line-clamp-1">{b}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onPreview(tool)}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-semibold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
          >
            Quick view
          </button>
          <a
            href={tool.launchUrl || tool.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundLink(tool.url, tool.title)}
            className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-violet-600 py-2 text-xs font-semibold text-white transition hover:bg-violet-500"
          >
            Launch
            <ArrowUpRight size={14} />
          </a>
        </div>

        {compareMode && (
          <button
            type="button"
            onClick={() => onToggleCompare(tool.slug)}
            className={`mt-2 flex w-full items-center justify-center gap-2 rounded-lg border py-2 text-xs font-semibold transition ${
              isSelected
                ? "border-violet-500 bg-violet-50 text-violet-700"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {isSelected ? (
              <>
                <Check size={14} /> Selected
              </>
            ) : (
              "Add to compare"
            )}
          </button>
        )}
      </div>
    </article>
  );
}

function CardActions({
  tool,
  isFavorite,
  isSelected,
  compareMode,
  onToggleFavorite,
  onToggleCompare,
  onPreview,
  compact,
}: Omit<AiToolCardProps, "view"> & { compact?: boolean }) {
  return (
    <div
      className={`flex shrink-0 items-center gap-2 ${compact ? "flex-row" : "flex-col"}`}
    >
      <button
        type="button"
        onClick={() => onPreview(tool)}
        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
      >
        Preview
      </button>
      {compareMode && (
        <button
          type="button"
          onClick={() => onToggleCompare(tool.slug)}
          className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
            isSelected
              ? "border-violet-500 bg-violet-50 text-violet-700"
              : "border-slate-200 text-slate-600"
          }`}
        >
          {isSelected ? "✓" : "Compare"}
        </button>
      )}
      <a
        href={tool.launchUrl || tool.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundLink(tool.launchUrl || tool.url, tool.title)}
        className="inline-flex items-center gap-1 rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-500"
      >
        <ExternalLink size={14} />
        {!compact && "Open"}
      </a>
      {!compact && (
        <button
          type="button"
          onClick={() => onToggleFavorite(tool.slug)}
          className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:text-amber-500"
          aria-label="Toggle favorite"
        >
          <Bookmark
            size={16}
            className={isFavorite ? "fill-amber-400 text-amber-500" : ""}
          />
        </button>
      )}
    </div>
  );
}
