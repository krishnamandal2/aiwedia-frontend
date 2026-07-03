"use client";

import { useScrolled } from "@/hooks/useScrollDirection";
import Link from "next/link";
import ProfileMenu from "@/userprofile/ProfileMenu";
import SubmitToolNavButton from "@/components/tools/SubmitToolNavButton";
import MegaExploreClient from "@/megamenu/MegaExploreClient";
import NavMainLinks from "@/components/nav/NavMainLinks";
import type { MenuCategory } from "@/lib/megaMenuUtils";

export default function DesktopHeader({
  categories,
}: {
  categories: MenuCategory[];
}) {
  const isScrolled = useScrolled(10);

  return (
    <header
      className={`sticky top-0 z-[999] overflow-visible transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="shrink-0 font-extrabold text-xl tracking-tight sm:text-2xl"
            aria-label="AIWedia Home"
          >
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
              AIWedia
            </span>
          </Link>

          <MegaExploreClient categories={categories} />
        </div>

        <NavMainLinks className="hidden md:flex max-w-[50%] overflow-x-auto scrollbar-none" />

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <SubmitToolNavButton compact className="hidden sm:inline-flex" />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
