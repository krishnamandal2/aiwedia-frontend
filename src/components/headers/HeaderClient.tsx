"use client";

import DesktopHeader from "@/HeaderSection/DesktopHeader";
import MobileHeader from "@/HeaderSection/MobileHeader";



export default function HeaderClient({
  megaMenu,
  mobileMenu,
}: {
  megaMenu: React.ReactNode;
  mobileMenu: React.ReactNode;
}) {
  return (
    <div className="sticky top-0 z-[999]">
      
      {/* Desktop */}
      <div className="hidden lg:block">
        <DesktopHeader megaMenu={megaMenu} />
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <MobileHeader mobileMenu={mobileMenu} />
      </div>
 
   
    </div>
  );
}