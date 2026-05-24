"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");

      if (footer) {
        const rect = footer.getBoundingClientRect();
        setVisible(rect.top < window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="
        fixed z-[997] flex min-h-[44px] items-center gap-2
        rounded-full border border-gray-200 bg-white px-4 py-2.5 text-black shadow-xl
        transition-all duration-300 hover:scale-105 hover:shadow-2xl
        bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] left-4
        sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:px-5
        lg:bottom-6
      "
    >
      <ArrowUp size={16} />

      <span className="text-xs font-semibold tracking-wide">
        Back to top
      </span>
    </button>
  );
}