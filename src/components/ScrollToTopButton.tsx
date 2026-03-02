"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="
        fixed bottom-5 right-5 z-50
        flex items-center justify-center
        bg-slate-900 hover:bg-[#eb442c]
        text-white border border-slate-800
        shadow-lg transition-all duration-300

        /* Mobile */
        w-11 h-11 rounded-full

        /* Desktop */
        md:w-auto md:h-auto md:px-4 md:py-2 md:rounded-full md:gap-2
      "
    >
      <ArrowUp size={16} />

      {/* Text hidden on mobile */}
      <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest">
        Back to top
      </span>
    </button>
  );
}
