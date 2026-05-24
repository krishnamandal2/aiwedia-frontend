import TrendingWebsites from "@/trendingsection/TrendingWebsites";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { TRENDING_SEO } from "@/lib/seo/pages";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";

export const metadata = buildPageMetadata(TRENDING_SEO);

export default function TrendingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TRENDING_SEO.title,
    description: TRENDING_SEO.description,
    url: `${SITE_URL}/top-trending-websites`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrendingWebsites />
    </main>
  );
}
