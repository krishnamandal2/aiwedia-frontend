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
import WebUtilitySection from "@/components/home/WebUtilitySection";
import HomeQuickLinks from "@/components/home/HomeQuickLinks";
import HomeWhatsNew from "@/components/home/HomeWhatsNew";
import HomeDiscover from "@/components/home/HomeDiscover";
import HomeGrowthHub from "@/components/home/HomeGrowthHub";
import HomeLiveNews from "@/components/home/HomeLiveNews";
import HomeSeoContent from "@/components/seo/HomeSeoContent";

export default async function HomeComponent() {
  const LIMIT = 50;
  const data = await getCategories(1, LIMIT);
  const categories = data.categories as HomeCategory[];

  const aiCategories = categories.filter((cat) => cat.typeui === "ai");

  const webCategories = categories.filter((cat) => cat.typeui === "web");

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <HomeQuickLinks />
      <HomeWhatsNew />

      <CategorySection
        id="categories"
        variant="ai"
        title="AI Categories"
        description="Explore AI tools, chatbots, image generators, and automation platforms"
        categories={aiCategories}
        viewAllLink="/category/ai-tools"
      />

      <HomeDiscover />

      <WebUtilitySection categories={webCategories} />

      <HomeGrowthHub />

      <HomeLiveNews />

      <HomeSeoContent />
    </main>
  );
}
