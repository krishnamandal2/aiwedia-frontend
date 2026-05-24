export interface SearchResultItem {
  type: "tool" | "category";
  slug: string;
  title: string;
  categorySlug?: string;
  categoryTitle?: string;
  subtitle?: string;
  image?: string;
}

export const POPULAR_SEARCHES = [
  { label: "AI Tools", query: "ai tools" },
  { label: "AI SEO tools", query: "seo" },
  { label: "Vibe coding", query: "code" },
  { label: "Cursor AI", query: "cursor" },
  { label: "Image editor", query: "image" },
  { label: "Background remover", query: "background" },
  { label: "PDF tools", query: "pdf" },
  { label: "AI agents", query: "agent" },
  { label: "Free download", query: "download" },
  { label: "Online games", query: "games" },
  { label: "Video AI", query: "video" },
];

export function getSearchHref(item: SearchResultItem): string {
  if (item.type === "category") return `/category/${item.slug}`;
  if (item.categorySlug) return `/category/${item.categorySlug}`;
  return `/category/${item.slug}`;
}
