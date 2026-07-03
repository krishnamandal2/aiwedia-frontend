"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrolled } from "@/hooks/useScrollDirection";
import MobileProfileMenu from "@/userprofile/MobileProfileMenu";
import SubmitToolNavButton from "@/components/tools/SubmitToolNavButton";
import NavMainLinks from "@/components/nav/NavMainLinks";
import MobileCategoryHubs from "@/components/mobilemenu/MobileCategoryHubs";
import type { MenuCategory } from "@/lib/megaMenuUtils";

export default function MobileHeader({
  categories,
}: {
  categories: MenuCategory[];
}) {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const isMenuOpen = menuPath === pathname;
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const isScrolled = useScrolled(10);

  const openMenu = useCallback(() => setMenuPath(pathname), [pathname]);
  const closeMenu = useCallback(() => setMenuPath(null), []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl"
            : "border-b border-slate-100 bg-white"
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-2 px-3">
          <button
            ref={menuButtonRef}
            onClick={openMenu}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <Menu size={22} />
          </button>

          <Link
            href="/"
            className="truncate font-extrabold text-lg bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"
          >
            AIWedia
          </Link>

          <div className="flex items-center gap-1.5">
            <MobileProfileMenu />
          </div>
        </div>
      </header>

      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm transition ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden
      />

      <aside
        ref={drawerRef}
        role="dialog"
        aria-label="Menu"
        aria-modal="true"
        className={`fixed left-0 top-0 z-[999] flex h-[100dvh] w-[min(100vw,20rem)] flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <span className="font-bold text-slate-900">Menu</span>
          <button
            type="button"
            onClick={closeMenu}
            className="rounded-lg p-2 hover:bg-slate-100"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <SubmitToolNavButton className="mb-4 w-full" onClick={closeMenu} />

          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Discover
          </p>
          <div className="mb-6">
            <NavMainLinks onNavigate={closeMenu} stacked />
          </div>

          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Browse categories
          </p>
          <div className="mb-6">
            <MobileCategoryHubs categories={categories} onNavigate={closeMenu} />
          </div>
        </div>
      </aside>
    </>
  );
}
