import type { MenuCategory } from "./megaMenuUtils";

/** Used when /api/categories/menu fails (e.g. 429) so mobile menu still works */
export const FALLBACK_MENU_CATEGORIES: MenuCategory[] = [
  { title: "AI Tools", slug: "ai-tools", typeui: "ai", rank: 1 },
  { title: "Vibe Coding", slug: "ai-code-generators", typeui: "ai", rank: 2 },
  { title: "AI SEO Tools", slug: "ai-seo-tools", typeui: "ai", rank: 3 },
  { title: "AI Background Remover", slug: "ai-background-remover", typeui: "ai", rank: 4 },
  { title: "AI Video Tools", slug: "ai-video-generators", typeui: "ai", rank: 5 },
  { title: "AI Writing", slug: "ai-writing-tools", typeui: "ai", rank: 6 },
  { title: "PDF & Documents", slug: "pdf-and-document-tools", typeui: "web", rank: 7 },
  { title: "Online Games", slug: "online-games", typeui: "web", rank: 8 },
  { title: "Image Filters", slug: "ai-image-filters", typeui: "web", rank: 9 },
  { title: "AI Marketing", slug: "ai-marketing-tools", typeui: "ai", rank: 10 },
  { title: "AI Agents", slug: "ai-agents-automation", typeui: "ai", rank: 11 },
  { title: "Office AI", slug: "ai-office-workplace-tools", typeui: "ai", rank: 12 },
];

export function withMenuFallback(categories: MenuCategory[]): MenuCategory[] {
  return categories.length > 0 ? categories : FALLBACK_MENU_CATEGORIES;
}
