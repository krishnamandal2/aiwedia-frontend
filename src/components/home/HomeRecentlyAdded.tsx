import { getVerifiedRecentTools } from "@/lib/api";
import { fetchBatchToolRatings } from "@/lib/toolRatingsApi";
import HomeRecentlyAddedInteractive from "@/components/home/HomeRecentlyAddedInteractive";
import HomeSubmitToolBanner from "@/components/home/HomeSubmitToolBanner";

export default async function HomeRecentlyAdded() {
  const { tools, subtitle } = await getVerifiedRecentTools(30, 12);

  if (!tools.length) {
    return (
      <section className="border-y border-slate-200 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <HomeSubmitToolBanner />
        </div>
      </section>
    );
  }

  const ratings = await fetchBatchToolRatings(
    tools.map((t) => ({ categorySlug: t.categorySlug, toolSlug: t.slug }))
  );

  return (
    <HomeRecentlyAddedInteractive
      tools={tools}
      subtitle={subtitle}
      ratings={ratings}
    />
  );
}
