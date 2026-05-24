import type { Tool } from "@/lib/types";

export type AiToolType =
  | "chat"
  | "image"
  | "video"
  | "code"
  | "writing"
  | "research"
  | "design"
  | "productivity";

export type PricingTier = "free" | "freemium" | "paid";

export interface EnrichedAiTool extends Tool {
  types: AiToolType[];
  pricing: PricingTier;
  searchText: string;
}

export const AI_TYPE_FILTERS: {
  id: AiToolType | "all";
  label: string;
  icon: string;
}[] = [
  { id: "all", label: "All Tools", icon: "✦" },
  { id: "chat", label: "Chat & Assistants", icon: "💬" },
  { id: "image", label: "Image Gen", icon: "🎨" },
  { id: "video", label: "Video & Media", icon: "🎬" },
  { id: "code", label: "Code & Dev", icon: "⌨️" },
  { id: "writing", label: "Writing", icon: "✍️" },
  { id: "research", label: "Research", icon: "🔬" },
  { id: "design", label: "Design", icon: "🖌️" },
  { id: "productivity", label: "Productivity", icon: "⚡" },
];

export const PRICING_FILTERS: { id: PricingTier | "all"; label: string }[] = [
  { id: "all", label: "All pricing" },
  { id: "free", label: "Free" },
  { id: "freemium", label: "Freemium" },
  { id: "paid", label: "Paid" },
];

const TYPE_KEYWORDS: Record<AiToolType, string[]> = {
  chat: [
    "chat",
    "chatbot",
    "assistant",
    "conversation",
    "gpt",
    "claude",
    "gemini",
    "bard",
    "mistral",
    "deepseek",
    "qwen",
    "poe",
    "pi ai",
    "huggingchat",
    "groq",
  ],
  image: [
    "image",
    "art",
    "visual",
    "midjourney",
    "dall",
    "diffusion",
    "leonardo",
    "nightcafe",
    "illustration",
    "photo",
  ],
  video: ["video", "runway", "film", "editing", "media creation"],
  code: [
    "code",
    "copilot",
    "developer",
    "programming",
    "replit",
    "codeium",
    "phind",
    "debug",
    "ide",
  ],
  writing: [
    "writing",
    "grammar",
    "content",
    "notion",
    "grammarly",
    "text generation",
    "copy",
  ],
  research: [
    "research",
    "paper",
    "arxiv",
    "search",
    "perplexity",
    "citation",
    "scientific",
    "papers",
  ],
  design: ["design", "canva", "graphic", "template", "presentation"],
  productivity: [
    "productivity",
    "task",
    "workflow",
    "notes",
    "summarization",
    "enterprise",
  ],
};

const FREE_SLUGS = new Set([
  "hugging-face",
  "arxiv-ai",
  "papers-with-code",
  "openassistant",
  "eleutherai",
  "huggingchat",
]);

const PAID_SLUGS = new Set(["midjourney"]);

function inferTypes(tool: Tool): AiToolType[] {
  const blob = [
    tool.title,
    tool.description,
    ...(tool.benefits ?? []),
  ]
    .join(" ")
    .toLowerCase();

  const matched = (Object.keys(TYPE_KEYWORDS) as AiToolType[]).filter((type) =>
    TYPE_KEYWORDS[type].some((kw) => blob.includes(kw))
  );

  return matched.length > 0 ? matched : ["productivity"];
}

function inferPricing(tool: Tool): PricingTier {
  if (FREE_SLUGS.has(tool.slug)) return "free";
  if (PAID_SLUGS.has(tool.slug)) return "paid";

  const blob = `${tool.description} ${(tool.benefits ?? []).join(" ")}`.toLowerCase();
  if (blob.includes("open-source") || blob.includes("free access")) return "free";
  if (blob.includes("subscription") || blob.includes("premium only")) return "paid";
  return "freemium";
}

export function enrichAiTools(tools: Tool[]): EnrichedAiTool[] {
  return tools.map((tool) => {
    const types = inferTypes(tool);
    const pricing = inferPricing(tool);
    const launchUrl =
      (tool.affiliateUrl || "").trim() || tool.url || "";
    return {
      ...tool,
      launchUrl,
      types,
      pricing,
      searchText: [tool.title, tool.description, ...(tool.benefits ?? [])]
        .join(" ")
        .toLowerCase(),
    };
  });
}

export type SortOption = "rank" | "name-asc" | "name-desc";

export function filterAndSortTools(
  tools: EnrichedAiTool[],
  opts: {
    query: string;
    type: AiToolType | "all";
    pricing: PricingTier | "all";
    sort: SortOption;
    favoritesOnly: boolean;
    favoriteSlugs: Set<string>;
  }
): EnrichedAiTool[] {
  let result = [...tools];

  if (opts.query.trim()) {
    const q = opts.query.trim().toLowerCase();
    result = result.filter((t) => t.searchText.includes(q));
  }

  if (opts.type !== "all") {
    result = result.filter((t) => t.types.includes(opts.type as AiToolType));
  }

  if (opts.pricing !== "all") {
    result = result.filter((t) => t.pricing === opts.pricing);
  }

  if (opts.favoritesOnly) {
    result = result.filter((t) => opts.favoriteSlugs.has(t.slug));
  }

  switch (opts.sort) {
    case "name-asc":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "name-desc":
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      result.sort((a, b) => (a.rank || 999) - (b.rank || 999));
  }

  return result;
}

export function getTypeCounts(tools: EnrichedAiTool[]): Record<string, number> {
  const counts: Record<string, number> = { all: tools.length };
  for (const t of tools) {
    for (const type of t.types) {
      counts[type] = (counts[type] ?? 0) + 1;
    }
  }
  return counts;
}
