import Link from "next/link";
import {
  Sparkles,
  Search,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { CategoryResponse } from "@/lib/api";
import ToolsGrid from "./ToolsGrid";
import { formatCategoryTitle } from "@/lib/formatTitle";

export default function CategoryPage({
  data,
  slug,
}: {
  data: CategoryResponse;
  slug: string;
}) {
  const tools = data.tools ?? [];
  const displayName = formatCategoryTitle(
    data.title ?? slug.replace(/-/g, " ")
  );

  return (
    <div className="min-h-screen bg-[#FAFAFB] text-slate-900 font-sans">
      {/* ================= NAV ================= */}
      <header className="w-full border-b border-slate-200/60 bg-white">
  <div className="container mx-auto px-4 sm:px-6">
    <div className="flex h-14 items-center">
      <nav className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 overflow-hidden">
        <Link
          href="/"
          className="hover:text-indigo-600 transition-colors shrink-0 flex items-center gap-1"
        >
          <ArrowLeft size={14} className="sm:hidden" /> {/* Added icon for mobile clarity */}
          Home
        </Link>
        
        <ChevronRight size={12} className="text-slate-300 shrink-0" />
        
        <span className="text-slate-900 truncate font-black">
          {displayName}
        </span>
      </nav>
    </div>
  </div>
</header>
      

      {/* ================= HERO ================= */}
      <section className="relative pt-16 sm:pt-20 pb-24 sm:pb-32 overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-indigo-100/40 blur-[120px]" />
          <div className="absolute bottom-0 -right-32 w-[360px] h-[360px] rounded-full bg-blue-50/50 blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl text-center sm:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold uppercase tracking-widest mb-5 border border-indigo-100">
              <Sparkles size={13} />
              Curated Category
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-5">
              {displayName}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto sm:mx-0">
              Explore our hand-picked collection of the best{" "}
              <span className="text-indigo-600 font-semibold">
                {displayName}
              </span>{" "}
              websites, curated for quality, reliability, and performance.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <main className="container mx-auto px-4 sm:px-6 -mt-10 pb-32">
        {tools.length === 0 ? (
          /* Empty State */
          <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-slate-200 bg-white/70 p-10 sm:p-16 text-center backdrop-blur-sm">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-xl shadow-slate-200/50">
              <Search className="text-indigo-500" size={32} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Content in progress
            </h2>

            <p className="mt-4 text-slate-500 leading-relaxed">
              We’re currently reviewing and adding the best{" "}
              <strong>{displayName}</strong> websites.
              Please check back soon.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-bold text-white hover:bg-indigo-600 transition-all shadow-lg"
            >
              <ArrowLeft size={16} className="mr-2" />
              Browse Categories
            </Link>
          </div>
        ) : (
          /* Tools Grid */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h3 className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest">
                Showing {tools.length} Resources
              </h3>
              <div className="hidden sm:block h-px flex-1 bg-slate-200 ml-6" />
            </div>

            <ToolsGrid tools={tools} />
          </div>
        )}
      </main>
    </div>
  );
}
