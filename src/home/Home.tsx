import HeroSection from "@/hero/HeroSection";
import { getCategories } from "@/lib/api";

type HomeCategory = {
  slug: string;
  title: string;
  desc: string;
  image: string;
  typeui?: string;
};
import CategorySection from "@/components/homeuicard/CategorySection";
import HomeQuickLinks from "@/components/home/HomeQuickLinks";
import HomeRecentlyAdded from "@/components/home/HomeRecentlyAdded";
import HomeDiscover from "@/components/home/HomeDiscover";
import HomeGrowthHub from "@/components/home/HomeGrowthHub";
import HomeLiveNews from "@/components/home/HomeLiveNews";
import HomeSeoContent from "@/components/seo/HomeSeoContent";

export default async function HomeComponent() {
  const LIMIT = 50;
  const data = await getCategories(1, LIMIT);
  const categories = data.categories as HomeCategory[];

  const aiCategories = categories.filter((cat) => cat.typeui === "ai");

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <HomeQuickLinks />
      <HomeRecentlyAdded />

      <CategorySection
        id="categories"
        variant="ai"
        title="AI Categories"
        description="Explore AI tools, chatbots, image generators, and automation platforms"
        categories={aiCategories}
        viewAllLink="/category/ai-tools"
      />

      <HomeDiscover />

      <HomeGrowthHub />

      <HomeLiveNews />

      <HomeSeoContent />
    </main>
  );
}
