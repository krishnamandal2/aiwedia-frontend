/**
 * Client-side fallback when API has not yet enriched an article.
 * Mirrors backend services/aiNewsInsights.js logic.
 */

const CATEGORY_WHY: Record<string, string> = {
  llms: "LLM news directly affects chatbots, copilots, and APIs that millions of products rely on.",
  "ai-models": "New model releases change what is possible for builders, researchers, and everyday AI users.",
  "ai-tools": "Tool launches and updates shape which workflows teams adopt and which vendors gain traction.",
  "coding-ai": "Coding AI shifts how fast software ships and how much human review each change needs.",
  "image-ai": "Image AI moves creative production, marketing assets, and design pipelines at lower cost.",
  "video-ai": "Video AI is reshaping ads, social content, and entertainment with faster generation pipelines.",
  research: "Research breakthroughs often arrive in products months later—early signals matter for strategy.",
  startups: "Startup moves reveal where founders see whitespace and where competition will heat up next.",
  funding: "Funding rounds show which AI bets investors back—and which categories may scale quickly.",
  robotics: "Robotics news connects AI models to the physical world, from warehouses to humanoids.",
  "open-source-ai": "Open-source releases can democratize capabilities and pressure proprietary pricing.",
  "prompt-engineering": "Prompt and agent patterns spread fast; staying current saves time and token cost.",
  "developer-tools": "Developer tooling news affects CI/CD, observability, and how AI ships in production.",
  cybersecurity: "Security headlines highlight new attack surfaces as AI gets embedded in more systems.",
  "cloud-ai": "Cloud AI updates influence enterprise budgets, latency, and which stack teams standardize on.",
  "seo-ai": "SEO AI changes how content ranks, gets discovered, and competes in search results.",
};

function splitSentences(text = "") {
  return String(text)
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 35 && s.length < 320);
}

function hashJitter(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return (h % 100) / 100;
}

export function buildAiNewsInsights(
  item: {
    slug: string;
    title: string;
    summary: string;
    sourceName?: string;
    category: string;
    publishedAt: string;
    keyTakeaways?: string[];
    whyItMatters?: string;
    aiwediaScore?: number | null;
    aiwediaScoreLabel?: string;
  },
  categoryLabel: string
) {
  if (
    item.keyTakeaways?.length &&
    item.whyItMatters &&
    typeof item.aiwediaScore === "number"
  ) {
    return {
      keyTakeaways: item.keyTakeaways,
      whyItMatters: item.whyItMatters,
      aiwediaScore: item.aiwediaScore,
      aiwediaScoreLabel: item.aiwediaScoreLabel,
    };
  }

  const sentences = splitSentences(item.summary);
  const keyTakeaways =
    item.keyTakeaways?.length && item.keyTakeaways.length > 0
      ? item.keyTakeaways
      : sentences.length >= 2
        ? sentences.slice(0, 4).map((s) =>
            s.endsWith(".") || s.endsWith("!") || s.endsWith("?") ? s : `${s}.`
          )
        : [
            `Headline: ${item.title}`,
            `Category focus: ${categoryLabel} — relevant for AI builders and decision-makers.`,
            "Read the full source article for complete reporting and quotes.",
          ];

  const intro = CATEGORY_WHY[item.category] || CATEGORY_WHY["ai-tools"];
  const first = sentences[0] || item.title;
  const source = item.sourceName ? ` ${item.sourceName} reports` : " This story";
  const whyItMatters =
    item.whyItMatters ||
    `${intro} ${source} that ${first.replace(/^[A-Z]/, (c) => c.toLowerCase())}`.replace(
      /\s+/g,
      " "
    );

  let score = 6;
  if (/openai|anthropic|google|microsoft|meta|nvidia|techcrunch|verge|mit|arxiv/i.test(item.sourceName || "")) {
    score += 1.2;
  }
  if (item.summary.length > 180) score += 0.6;
  const ageHours =
    (Date.now() - new Date(item.publishedAt).getTime()) / (1000 * 60 * 60);
  if (ageHours < 24) score += 1;
  else if (ageHours < 72) score += 0.5;
  if (["funding", "ai-models", "llms", "startups", "research"].includes(item.category)) {
    score += 0.5;
  }
  score += hashJitter(item.slug) * 0.7;
  const aiwediaScore =
    typeof item.aiwediaScore === "number" && item.aiwediaScore > 0
      ? item.aiwediaScore
      : Math.min(10, Math.max(5, Math.round(score * 10) / 10));

  const aiwediaScoreLabel =
    item.aiwediaScoreLabel ||
    (aiwediaScore >= 9
      ? "Must-read — high impact for AI builders"
      : aiwediaScore >= 8
        ? "High relevance — worth your attention today"
        : aiwediaScore >= 7
          ? "Solid update — useful context for the AI space"
          : aiwediaScore >= 6
            ? "Good to know — moderate industry significance"
            : "Quick read — lighter signal, still worth scanning");

  return { keyTakeaways, whyItMatters, aiwediaScore, aiwediaScoreLabel };
}
