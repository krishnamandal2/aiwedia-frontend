"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  ChevronDown,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Globe,
} from "lucide-react";

interface Category {
  title: string;
  slug: string;
}

interface MegaExploreClientProps {
  categories: Category[];
}

const MegaExploreClient = ({ categories }: MegaExploreClientProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  const handleTriggerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const getCategoryCount = () => {
    if (!categories || categories.length === 0) return "50+";
    return `${categories.length}+`;
  };

  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div
      className="hidden lg:flex relative h-20 items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-bold text-sm ${
          isOpen
            ? "bg-indigo-50 text-indigo-700"
            : "hover:bg-slate-50 text-slate-700"
        }`}
        onClick={handleTriggerClick}
        aria-expanded={isOpen}
        aria-label="Explore Categories"
      >
        <LayoutGrid
          size={18}
          className={isOpen ? "text-indigo-600" : "text-slate-400"}
        />
        Explore Categories
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 opacity-40 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Mega Menu Dropdown */}
     <div
  className={`absolute top-[80%] left-0 w-[1000px] bg-white/95 backdrop-blur-xl
  border border-slate-200/60 shadow-[0_30px_100px_rgba(0,0,0,0.12)]
  rounded-[2rem] overflow-hidden z-50 transition-all duration-300 ease-out
  transform-gpu
  ${isOpen
    ? "opacity-100 visible translate-y-2"
    : "opacity-0 invisible translate-y-6 pointer-events-none"
  }`}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  inert={!isOpen}
  role="menu"
>

        <div className="flex">
          {/* Left Sidebar */}
          <div className="w-[22%] bg-slate-50/50 p-8 border-r border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <Globe size={16} />
              </div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Find Best
              </h3>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Access {getCategoryCount()} categories curated for 2026.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[12px] font-bold text-slate-700">
                <ShieldCheck size={14} className="text-emerald-500" />
                Verified Links
              </div>
              <div className="flex items-center gap-2 text-[12px] font-bold text-slate-700">
                <Sparkles size={14} className="text-amber-500" />
                Daily Updates
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="w-[78%] p-8 max-h-[420px] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-[0.2em]">
                Browse by Category
              </span>
              <Link
                href="/#categories"
                className="group/link text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-full transition-all"
                onClick={() => setIsOpen(false)}
              >
                Full Directory
                <ArrowRight
                  size={12}
                  className="group-hover/link:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            {safeCategories.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">
                No categories available
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-x-4 gap-y-1">
                {safeCategories.map((cat: Category) => (
                  <Link
                   prefetch={false}
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="group/item flex items-center gap-2 p-2 rounded-xl hover:bg-indigo-50 transition-all"
                    onClick={() => setIsOpen(false)}
                    title={cat.title}
                    role="menuitem"

                  >
                    <div className="w-1 h-1 rounded-full bg-slate-300 group-hover/item:bg-indigo-400 group-hover/item:scale-150 transition-all flex-shrink-0" />
                    <span className="text-[12.5px] font-medium text-slate-600 group-hover/item:text-indigo-700 transition-colors line-clamp-2">
                  {cat.title}
                   </span>

                  </Link>
                ))}
              </div>
            )}

            {safeCategories.length > 100 && (
              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400 text-center">
                  Showing 101 of {safeCategories.length} categories
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-indigo-600 py-2.5 px-3 text-center">
          <p className="text-white/90 text-[11px] font-medium flex items-center justify-center gap-2">
            <Sparkles size={10} />
            Can't find what you're looking for?
            <Link
              href="/"
              className="underline font-bold hover:text-white ml-1"
              onClick={() => setIsOpen(false)}
            >
              View all categories
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MegaExploreClient;
