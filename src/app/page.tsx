export const revalidate = 3600;

import HeroSection from "@/hero/HeroSection";
import { getCategories } from "@/lib/api";
import CategoryGrid from "@/components/CategoryGrid";

export default async function Home() {

  const LIMIT = 12;

  const data = await getCategories(1, LIMIT);
  const categories = data.categories;

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100">

      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* HERO */}
      
      <HeroSection />

      {/* ================= CATEGORIES ================= */}
      <section className="pb-6">
        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-12 border-b border-slate-100 pb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Browse Categories
                </h2>
                <p className="text-slate-500 mt-2">
                  Explore our hand-picked collection of tools and resources.
                </p>
              </div>

              <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-lg border border-slate-100 min-w-[96px] justify-center">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-sm font-semibold text-slate-700 tabular-nums">
                  40+ Total
                </span>
              </div>

            </div>
          </div>

          <CategoryGrid initialCategories={categories} total={data.total} />

        </div>
      </section>

    </main>
  );
}