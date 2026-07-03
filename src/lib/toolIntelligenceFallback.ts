import type { ToolIntelligence } from "@/lib/types";

type Input = {
  title: string;
  description?: string;
  benefits?: string[];
  rank?: number;
  editorScore?: number | null;
  editorsPick?: boolean;
};

export function buildFallbackIntelligence(tool: Input): ToolIntelligence {
  let popularityScore = 55;
  if (tool.rank != null && tool.rank > 0) {
    popularityScore = Math.max(40, Math.min(98, 100 - (tool.rank - 1) * 4));
  }
  if (tool.editorsPick) popularityScore += 5;
  if (tool.editorScore != null) {
    popularityScore += (tool.editorScore <= 5 ? tool.editorScore * 4 : tool.editorScore * 2);
  }
  popularityScore = Math.min(100, Math.round(popularityScore));

  const trafficTrend =
    tool.rank != null && tool.rank <= 5
      ? "rising"
      : tool.rank != null && tool.rank <= 15
        ? "stable"
        : "stable";

  const description = tool.description?.trim() || `${tool.title} on AIWedia.`;

  return {
    popularityScore,
    trafficTrend,
    trafficTrendLabel: "Estimated from directory signals",
    aiSummary: description.length > 320 ? `${description.slice(0, 317)}…` : description,
    features: tool.benefits?.length ? tool.benefits : [],
    pros: tool.benefits?.length
      ? tool.benefits.map((b) => `Strong at ${b.toLowerCase()}`)
      : ["Listed in AIWedia directory"],
    cons: ["Verify pricing and limits on the official website"],
    useCases: ["Productivity", "Team workflows", "Learning"],
    pricingSnapshot: "See official website",
    pricingHistory: [],
    source: "generated",
  };
}
