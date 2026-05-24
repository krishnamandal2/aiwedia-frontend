"use client";

import DesktopHeader from "@/HeaderSection/DesktopHeader";
import MobileHeader from "@/HeaderSection/MobileHeader";
import MegaExploreClient from "@/megamenu/MegaExploreClient";
import type { MenuCategory } from "@/lib/megaMenuUtils";

export default function HeaderClient({
  categories,
}: {
  categories: MenuCategory[];
}) {
  return (
    <div
      data-site-header
      className="sticky top-0 z-[999] w-full overflow-visible"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="hidden lg:block">
        <DesktopHeader
          megaMenu={<MegaExploreClient categories={categories} />}
        />
      </div>
      <div className="lg:hidden">
        <MobileHeader categories={categories} />
      </div>
    </div>
  );
}
