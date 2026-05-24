"use client";

import { useState, useEffect, useCallback } from "react";
import { LayoutGrid, X } from "lucide-react";
import type { MenuCategory } from "@/lib/megaMenuUtils";
import MegaMenuPanel from "@/megamenu/MegaMenuPanel";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

export default function Smalldevicemenu({
  categories,
  closeMenu,
}: {
  categories: MenuCategory[];
  closeMenu?: () => void;
}) {
  const [open, setOpen] = useState(false);
  useBodyScrollLock(open);

  const handleClose = useCallback(() => {
    setOpen(false);
    closeMenu?.();
  }, [closeMenu]);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, handleClose]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-bold text-violet-800 active:scale-[0.98] lg:hidden"
      >
        <LayoutGrid size={18} />
        Browse categories
      </button>

      {open && (
        <div className="fixed inset-0 z-[1100] lg:hidden">
          <div
            onClick={handleClose}
            className="absolute inset-0 bg-black/50"
            aria-hidden
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Browse categories"
            className="absolute bottom-0 left-0 right-0 flex max-h-[min(92dvh,100dvh)] flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl pt-[env(safe-area-inset-top,0px)]"
            style={{
              paddingBottom: "max(12px, env(safe-area-inset-bottom, 0px))",
            }}
          >
            <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-slate-200" />
            <div className="flex shrink-0 items-center justify-between px-4 py-2">
              <span className="text-xs font-bold uppercase tracking-wide text-violet-600">
                Categories
              </span>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <MegaMenuPanel
              categories={categories}
              variant="sheet"
              onClose={handleClose}
            />
          </div>
        </div>
      )}
    </>
  );
}
