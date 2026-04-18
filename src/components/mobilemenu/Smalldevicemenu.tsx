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

  const inputRef = useRef<HTMLInputElement>(null);

  /* lock scroll */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  /* auto focus search */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  /* esc close */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const filtered = useMemo(() => {
    if (!query) return categories;

    return categories.filter((c) =>
      c.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [categories, query]);

  const handleNavigation = (path: string) => {
    setOpen(false);
    closeMenu?.();

    setTimeout(() => {
      router.push(path);
      setQuery("");
      window.scrollTo({ top: 0 });
    }, 350);
  };

  return (
    <>
      {/* Trigger */}
     <button
  onClick={() => setOpen(true)}
  className="mt-5 lg:hidden flex items-center gap-2 px-5 py-2.5 rounded-full
  bg-indigo-600 text-white font-bold text-sm shadow-lg
  active:scale-95 transition-all"
>
  <LayoutGrid size={18} />
  Click To Explore websites
</button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition ${
          open ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Bottom Sheet */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white
          rounded-t-[2rem] flex flex-col shadow-2xl
          transition-transform duration-500 ease-out
          ${open ? "translate-y-0" : "translate-y-full"}`}
          style={{ height: "85vh" }}
        >
          {/* Drag handle */}
          <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-4 mb-3" />

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3 border-b">
            <h2 className="text-md font-black text-slate-800">
              Explore Categories
            </h2>

            <button
              onClick={() => setOpen(false)}
              className="p-2 bg-slate-100 rounded-full text-slate-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="px-6 py-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                ref={inputRef}
                type="text"
                placeholder="Search categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-100 rounded-xl py-3 pl-11 pr-4
                text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">

            {filtered.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-sm">
                No categories found
              </div>
            )}

            {filtered.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleNavigation(`/category/${cat.slug}`)}
                className="w-full flex items-center justify-between
                px-4 py-3 rounded-xl bg-slate-50
                hover:bg-indigo-50 active:scale-[0.98]
                transition-all"
              >
                <span className="text-sm font-semibold text-slate-700">
                  {cat.title}
                </span>

                <ChevronRight
                  size={16}
                  className="text-slate-300"
                />
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-5 border-t bg-white">
            <button
              onClick={() => handleNavigation("/")}
              className="w-full py-3 rounded-xl
              bg-indigo-600 text-white font-bold
              active:scale-95 transition-transform"
            >
              Browse Full Directory
            </button>
          </div>
        </div>
      </div>
    </>
  );
}