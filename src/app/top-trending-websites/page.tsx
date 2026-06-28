import TrendingWebsites from "@/trendingsection/TrendingWebsites";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { TRENDING_SEO } from "@/lib/seo/pages";

export const metadata = buildPageMetadata(TRENDING_SEO);

export default function TrendingPage() {
  return (
    <main className="min-h-screen bg-black">
      <TrendingWebsites />
    </main>
  );
}
