import TrendingWebsites from "@/trendingsection/TrendingWebsites";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { TRENDING_SEO } from "@/lib/seo/pages";
import { trendingData } from "@/data/trendingsitedata/Trendingdata";

export const metadata = buildPageMetadata(TRENDING_SEO);

export default function TrendingPage() {
  const sites2026 = trendingData["2026"];
  const itemList =
    sites2026 !== "coming-soon"
      ? sites2026.slice(0, 20).map((site, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: site.name,
          url: site.url,
          description: site.description,
        }))
      : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top Trending Websites 2026",
    description: TRENDING_SEO.description,
    numberOfItems: itemList.length,
    itemListElement: itemList,
  };

  return (
    <main className="min-h-screen bg-white">
      {itemList.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <TrendingWebsites />
    </main>
  );
}
