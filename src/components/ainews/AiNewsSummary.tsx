"use client";

import { useMemo, useState } from "react";
import { BookOpen, ChevronDown, Clock, Newspaper } from "lucide-react";
import {
  estimateReadingMinutes,
  summaryToParagraphs,
} from "@/lib/aiNewsFormat";

const COLLAPSE_AFTER = 2;

export default function AiNewsSummary({ summary }: { summary: string }) {
  const paragraphs = useMemo(() => summaryToParagraphs(summary, 1200), [summary]);
  const [expanded, setExpanded] = useState(false);

  if (!paragraphs.length) return null;

  const fullText = paragraphs.join(" ");
  const readingMin = estimateReadingMinutes(fullText);
  const canCollapse = paragraphs.length > COLLAPSE_AFTER;
  const visible = expanded || !canCollapse
    ? paragraphs
    : paragraphs.slice(0, COLLAPSE_AFTER);
  const hiddenCount = paragraphs.length - COLLAPSE_AFTER;

  return (
    <div className="mt-10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
          <Newspaper size={14} />
          Article summary
        </p>
        <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1">
            <Clock size={12} />
            {readingMin} min read
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-violet-700">
            <BookOpen size={12} />
            {paragraphs.length} {paragraphs.length === 1 ? "section" : "sections"}
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-gradient-to-r from-violet-50/60 to-white px-6 py-4 sm:px-8">
          <p className="text-sm font-semibold text-slate-700">
            Quick briefing — cleaned from the original RSS feed
          </p>
        </div>

        <div className="space-y-0 divide-y divide-slate-100 px-6 sm:px-8">
          {visible.map((para, i) => (
            <div
              key={i}
              className={`py-5 transition-colors hover:bg-slate-50/80 ${
                i === 0 ? "pt-6" : ""
              }`}
            >
              {i === 0 ? (
                <p className="text-lg font-medium leading-[1.8] text-slate-800 sm:text-xl">
                  {para}
                </p>
              ) : (
                <p className="text-base leading-[1.75] text-slate-700">{para}</p>
              )}
            </div>
          ))}
        </div>

        {canCollapse && (
          <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-4 sm:px-8">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-800"
              aria-expanded={expanded}
            >
              {expanded
                ? "Show less"
                : `Read ${hiddenCount} more ${hiddenCount === 1 ? "section" : "sections"}`}
              <ChevronDown
                size={16}
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
