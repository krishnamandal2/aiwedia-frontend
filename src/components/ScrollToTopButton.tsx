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
        fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000]
        flex items-center gap-2
        px-5 py-2
        bg-white text-black
        rounded-full
        shadow-xl border border-gray-200
        hover:scale-105 hover:shadow-2xl
        transition-all duration-300
      "
    >
      <ArrowUp size={16} />

      <span className="text-xs font-semibold tracking-wide">
        Back to top
      </span>
    </button>
  );
}