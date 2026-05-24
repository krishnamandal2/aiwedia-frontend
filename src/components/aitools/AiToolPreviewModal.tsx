"use client";

import Image from "next/image";
import { X, ExternalLink, Bookmark, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { EnrichedAiTool } from "@/lib/aiToolsUtils";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

interface AiToolPreviewModalProps {
  tool: EnrichedAiTool | null;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: (slug: string) => void;
}

export default function AiToolPreviewModal({
  tool,
  isFavorite,
  onClose,
  onToggleFavorite,
}: AiToolPreviewModalProps) {
  const [mounted, setMounted] = useState(false);

  useBodyScrollLock(Boolean(tool));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!tool) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tool, onClose]);

  if (!tool || !mounted) return null;

  const hasImage = Boolean(tool.image?.trim());
  const launchUrl = tool.launchUrl || tool.url;

  const modal = (
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tool-preview-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close preview"
      />

      <div className="relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl max-h-[min(90dvh,calc(100vh-2rem))]">
        {/* Always-visible header — close never hidden under site nav */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 bg-white px-4 py-3 sm:px-5">
          <p className="truncate text-sm font-bold text-slate-900 sm:text-base">
            Quick view
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            aria-label="Close preview"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative h-36 shrink-0 overflow-hidden bg-slate-100 sm:h-44">
          {hasImage ? (
            <Image
              src={tool.image}
              alt={tool.title}
              fill
              className="object-cover"
              sizes="512px"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-100 to-slate-100">
              <span className="text-4xl font-black text-violet-200">
                {tool.title.slice(0, 2)}
              </span>
            </div>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            {tool.rank > 0 && (
              <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-700">
                Rank #{tool.rank}
              </span>
            )}
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs capitalize text-slate-600">
              {tool.pricing}
            </span>
            {tool.types.map((t) => (
              <span
                key={t}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize text-slate-600"
              >
                {t}
              </span>
            ))}
          </div>

          <h2
            id="tool-preview-title"
            className="mt-3 text-lg font-bold text-slate-900 sm:text-xl"
          >
            {tool.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {tool.description}
          </p>

          {tool.benefits && tool.benefits.length > 0 && (
            <ul className="mt-4 space-y-2">
              {tool.benefits.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-slate-700"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-violet-600"
                  />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex shrink-0 gap-2 border-t border-slate-200 bg-white p-4 sm:p-5">
          <button
            type="button"
            onClick={() => onToggleFavorite(tool.slug)}
            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
              isFavorite
                ? "border-amber-300 bg-amber-50 text-amber-700"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Bookmark
              size={16}
              className={isFavorite ? "fill-amber-400 text-amber-500" : ""}
            />
            {isFavorite ? "Saved" : "Save"}
          </button>
          <a
            href={launchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-sm font-bold text-white hover:bg-violet-500"
          >
            Visit platform
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
