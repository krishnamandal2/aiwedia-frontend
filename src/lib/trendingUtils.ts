import { trendingData } from "@/data/trendingsitedata/Trendingdata";
import type { Website } from "@/data/trendingsitedata/Trendingdata";

export const TREND_CATEGORIES = {
  all: { label: "All sites", icon: "globe" as const },
  search: { label: "Search", icon: "search" as const },
  social: { label: "Social", icon: "users" as const },
  ai: { label: "AI", icon: "bot" as const },
  streaming: { label: "Streaming", icon: "play" as const },
  shopping: { label: "Shopping", icon: "bag" as const },
  news: { label: "News & info", icon: "newspaper" as const },
  sports: { label: "Sports", icon: "trophy" as const },
  productivity: { label: "Productivity", icon: "briefcase" as const },
} as const;

export type TrendCategory = keyof typeof TREND_CATEGORIES;

export function inferTrendCategory(site: Website): Exclude<TrendCategory, "all"> {
  if (site.category && site.category !== "all") return site.category;

  const text = `${site.name} ${site.url} ${site.description}`.toLowerCase();

  if (/chatgpt|claude|gemini|perplexity|copilot|anthropic|openai/.test(text)) {
    return "ai";
  }
  if (/youtube|netflix|spotify|stream|video platform|music/.test(text)) {
    return "streaming";
  }
  if (
    /facebook|instagram|twitter|x\.com|tiktok|whatsapp|reddit|linkedin|social|reels/.test(
      text
    )
  ) {
    return "social";
  }
  if (/amazon|ebay|shop|commerce|retail|auction/.test(text)) {
    return "shopping";
  }
  if (/fifa|world cup|tournament|sport/.test(text)) {
    return "sports";
  }
  if (/zoom|canva|design platform|meetings/.test(text)) {
    return "productivity";
  }
  if (/google|bing|baidu|yahoo|search|wikipedia|encyclopedia/.test(text)) {
    return "search";
  }
  return "news";
}

export function domainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").split("/")[0] ?? url;
  }
}

export function faviconUrl(url: string): string {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domainFromUrl(url))}&sz=64`;
}

export const TRENDING_YEARS = Object.keys(trendingData).sort(
  (a, b) => Number(b) - Number(a)
);
