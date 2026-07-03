import CompareHub from "@/components/compare/CompareHub";
import { getComparisonsCached } from "@/lib/api";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import type { ComparisonListItem } from "@/lib/compareTypes";

export const metadata = buildPageMetadata({
  title: "AI Tool Comparisons — Pricing, API Limits & Features",
  description:
    "Compare top AI tools side by side: pricing plans, API limits, rate limits, and feature winners — ChatGPT vs Claude, Cursor vs Copilot, and more.",
  path: "/compare",
  keywords: [
    "AI tool comparison",
    "ChatGPT vs Claude",
    "AI API limits",
    "AI tool pricing",
  ],
});

export default async function CompareIndexPage() {
  const { comparisons } = await getComparisonsCached();

  return (
    <CompareHub comparisons={comparisons as ComparisonListItem[]} />
  );
}
