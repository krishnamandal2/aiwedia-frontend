// export const revalidate = 3600;

import { Sparkles } from "lucide-react";
import Searchbar from "@/components/Searchbar";
import { getCategories } from "@/lib/api";
import CategoryGrid from "@/components/CategoryGrid";

export default async function Home() {


  const LIMIT = 12;
const data = await getCategories(1, LIMIT);
const categories = data.categories;
// console.log(categories.length)

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100">
      {/* Subtle Grid Background for texture */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium mb-10 animate-fade-in">
            <Sparkles size={12} className="text-indigo-500" />
            <span>The Web, Categorized.</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-8">
            Every website you need. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400">
              One digital home.
            </span>
          </h1>

         <p className="mx-auto mb-10 max-w-2xl text-center text-base leading-relaxed tracking-tight text-slate-500 sm:text-lg md:text-xl md:leading-extra-relaxed lg:text-[22px]">
  <span className="block font-semibold text-slate-900 md:inline">
    Access the web, simplified.
  </span>{" "}
  Onewebsolution helps you quickly access and navigate any website from a single place.
</p>

          <div className="max-w-2xl mx-auto">
            <Searchbar />
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= 32*/}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header with improved layout */}
          {/* <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Browse Categories
              </h2>
              <p className="text-slate-500 mt-2">Explore our hand-picked collection of tools and resources.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-sm font-semibold text-slate-700">
                {40}+ Total
              </span>
            </div>
          </div> */}

         <div className="mb-12 border-b border-slate-100 pb-8">
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
    
    {/* Left content */}
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">
        Browse Categories
      </h2>
      <p className="text-slate-500 mt-2">
        Explore our hand-picked collection of tools and resources.
      </p>
    </div>

    {/* Badge — CLS safe */}
    <div
      className="
        flex items-center gap-2
        px-4 py-1.5
        bg-slate-50 rounded-lg
        border border-slate-100
        min-w-[96px]
        justify-center
      "
    >
      <span className="w-2 h-2 rounded-full bg-indigo-500" />
      <span className="text-sm font-semibold text-slate-700 tabular-nums">
        40+ Total
      </span>
    </div>
  </div>
</div>

         <CategoryGrid initialCategories={data.categories} total={data.total} />

        </div>
      </section>
    </main>
  );
}