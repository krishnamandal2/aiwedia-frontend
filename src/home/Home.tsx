import { Suspense } from "react";
import HeroSection from "@/hero/HeroSection";
import CategorySection from "@/components/homeuicard/CategorySection";
import HomeQuickLinks from "@/components/home/HomeQuickLinks";
import HomeRecentlyAdded from "@/components/home/HomeRecentlyAdded";
import HomeDiscover from "@/components/home/HomeDiscover";
import HomeGrowthHub from "@/components/home/HomeGrowthHub";
import HomeLiveNews from "@/components/home/HomeLiveNews";
import HomeSeoContent from "@/components/seo/HomeSeoContent";
import { getCategoriesCached } from "@/lib/api";

type HomeCategory = {
  slug: string;
  title: string;
  desc: string;
  image: string;
  typeui?: string;
};

function SectionSkeleton({ className = "h-64" }: { className?: string }) {
  return (
    <div className={`mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6 ${className}`}>
      <div className="mb-4 h-6 w-48 rounded bg-slate-200" />
      <div className="h-40 rounded-2xl bg-slate-100" />
    </div>
  );
}

async function HomeAiCategories() {
  const data = await getCategoriesCached(1, 50);
  const categories = data.categories as HomeCategory[];
  const aiCategories = categories.filter((cat) => cat.typeui === "ai");

  return (
    <CategorySection
      id="categories"
      variant="ai"
      title="AI Categories"
      description="Explore AI tools, chatbots, image generators, and automation platforms"
      categories={aiCategories}
      viewAllLink="/category/ai-tools"
    />
  );
}

export default function HomeComponent() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<SectionSkeleton className="h-80" />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton className="h-48" />}>
        <HomeQuickLinks />
      </Suspense>

      <Suspense fallback={<SectionSkeleton className="h-96" />}>
        <HomeRecentlyAdded />
      </Suspense>

      <Suspense fallback={<SectionSkeleton className="h-72" />}>
        <HomeAiCategories />
      </Suspense>

      <HomeDiscover />
      <HomeGrowthHub />

      <Suspense fallback={<SectionSkeleton className="h-72" />}>
        <HomeLiveNews />
      </Suspense>

      <HomeSeoContent />
    </div>
  );
}
