"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, X, Search, ChevronRight } from "lucide-react";

interface Category {
  title: string;
  slug: string;
}

export default function Smalldevicemenu({
  categories,
    closeMenu,
}: {
  categories: Category[];
    closeMenu?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const filtered = useMemo(() => {
    return categories.filter((c) =>
      c.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [categories, query]);

 const handleNavigation = (path: string) => {
  setOpen(false);   // close bottom sheet
  closeMenu?.();    // close header drawer safely

  setTimeout(() => {
    router.push(path);
    setQuery("");
    window.scrollTo({ top: 0 });
    setQuery(""); // reset search
  }, 500);
};


  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-2 px-5 py-2.5 rounded-full
        bg-indigo-600 text-white font-bold text-sm shadow-lg active:scale-95 transition-all"
      >
        <LayoutGrid size={18} />
        Click to explore all websites
      </button>

      {/* Overlay */}
      <div className={`fixed inset-0 z-[100] lg:hidden ${open ? "visible" : "invisible"}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Bottom Sheet */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem]
          flex flex-col transition-transform duration-500 ease-in-out
          ${open ? "translate-y-0" : "translate-y-full"}`}
          style={{ height: "85vh" }}
        >
          <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-4 mb-2" />

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-md font-black text-slate-800">All Websites</h2>
            <button
              onClick={() => setOpen(false)}
              className="p-2 bg-slate-100 rounded-full text-slate-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="px-6 py-2">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-50 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none"
              />
            </div>
          </div>

          {/* Category List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
            {filtered.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleNavigation(`/category/${cat.slug}`)}
                className="w-full flex items-center justify-between px-5 py-4
                rounded-2xl bg-slate-50 active:bg-indigo-50 text-left"
              >
                <span className="text-sm font-bold text-slate-700">
                  {cat.title}
                </span>
                <ChevronRight size={16} className="text-slate-300" />
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-50 bg-white">
            <button
              onClick={() => handleNavigation("/")}
              className="w-full py-4 rounded-2xl bg-indigo-600
              text-white font-black text-sm active:scale-95 transition-transform"
            >
              Full Directory
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
