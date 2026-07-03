import DealsHub from "@/components/deals/DealsHub";
import { fetchDeals } from "@/lib/dealsApi";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildPageMetadata({
  title: "AI Deals & Discounts — Lifetime, Student & Startup",
  description:
    "Curated AI deals: lifetime SaaS offers, student discounts, and startup cloud/API credits on AIWedia.",
  path: "/deals",
  keywords: [
    "AI deals",
    "AI lifetime deals",
    "student AI discount",
    "startup AI credits",
  ],
});

export default async function DealsPage() {
  const { deals } = await fetchDeals();

  return <DealsHub deals={deals} />;
}
