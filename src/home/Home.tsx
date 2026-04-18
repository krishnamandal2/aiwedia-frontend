import HeroSection from "@/hero/HeroSection";
import { getCategories } from "@/lib/api";
import CategorySection from "@/components/homeuicard/CategorySection";

export default async function HomeComponent() {

  const LIMIT = 50; // load enough

  // ✅ Fetch ALL categories
  const data = await getCategories(1, LIMIT);

  const categories = data.categories;

  // ✅ FILTER HERE
  const aiCategories =
    categories.filter(
      (cat: any) => cat.typeui === "ai"
    );

  const webCategories =
    categories.filter(
      (cat: any) => cat.typeui === "web"
    );

  return (

    <main className="min-h-screen bg-white">

      <HeroSection />

      {/* 🤖 AI SECTION */}

      <CategorySection
        title="AI Categories"
        description="Explore AI tools and platforms"
        categories={aiCategories}
      />

      {/* 🌐 WEB SECTION */}

      <CategorySection
        title="Web Categories"
        description="Explore Web tools and resources"
        categories={webCategories}
      />

    </main>

  );
}