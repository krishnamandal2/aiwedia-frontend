"use client";

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { LayoutGrid, ChevronDown } from "lucide-react";
import type { MenuCategory } from "@/lib/megaMenuUtils";
import MegaMenuPanel from "./MegaMenuPanel";

interface MegaExploreClientProps {
  categories: MenuCategory[];
}

export default function MegaExploreClient({
  categories,
}: MegaExploreClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;
    const updateTop = () => {
      const el = document.querySelector("[data-site-header]");
      const bottom = el
        ? el.getBoundingClientRect().bottom
        : 64;
      document.documentElement.style.setProperty(
        "--mega-menu-top",
        `${Math.round(bottom + 8)}px`
      );
    };
    updateTop();
    window.addEventListener("resize", updateTop);
    return () => window.removeEventListener("resize", updateTop);
  }, [isOpen]);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onOutside = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        containerRef.current?.contains(t) ||
        panelRef.current?.contains(t)
      ) {
        return;
      }
      close();
    };
    window.addEventListener("keydown", onEsc);
    document.addEventListener("mousedown", onOutside);
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.removeEventListener("mousedown", onOutside);
    };
  }, [isOpen, close]);

  const dropdownPortal =
    isOpen &&
    mounted &&
    createPortal(
      <>
        <div
          className="fixed inset-0 z-[998] bg-black/25"
          aria-hidden
          onClick={close}
        />
        <div
          ref={panelRef}
          id="mega-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Browse categories"
          className="fixed left-1/2 z-[999] w-[min(calc(100vw-1.5rem),780px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-900/10"
          style={{ top: "var(--mega-menu-top, 72px)" }}
        >
          <MegaMenuPanel
            categories={categories}
            variant="dropdown"
            onClose={close}
          />
        </div>
      </>,
      document.body
    );

  return (
    <div ref={containerRef} className="relative flex">
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-semibold transition ${
          isOpen
            ? "border-violet-400 bg-violet-50 text-violet-800 shadow-sm"
            : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50/50"
        }`}
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
        aria-controls="mega-menu-panel"
        aria-haspopup="dialog"
      >
        <LayoutGrid size={16} className="text-violet-600" />
        <span className="hidden sm:inline">Categories</span>
        <span className="sm:hidden">Browse</span>
        <ChevronDown
          size={14}
          className={`opacity-60 transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {dropdownPortal}
    </div>
  );
}
