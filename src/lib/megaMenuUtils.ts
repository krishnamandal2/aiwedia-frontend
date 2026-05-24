export interface MenuCategory {
  title: string;
  slug: string;
  type?: string;
  typeui?: string;
  rank?: number;
}

export type MegaFilterId =
  | "all"
  | "ai"
  | "tools"
  | "games"
  | "creative"
  | "business"
  | "lifestyle"
  | "other";

export type MegaSortId = "rank" | "name-asc" | "name-desc";

export const MEGA_FILTERS: {
  id: MegaFilterId;
  label: string;
  icon: string;
}[] = [
  { id: "all", label: "All", icon: "✦" },
  { id: "ai", label: "AI & ML", icon: "🤖" },
  { id: "tools", label: "Tools", icon: "🛠" },
  { id: "games", label: "Games", icon: "🎮" },
  { id: "creative", label: "Creative", icon: "🎨" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "lifestyle", label: "Lifestyle", icon: "✨" },
  { id: "other", label: "More", icon: "📁" },
];

const QUICK_LINKS = [
  { label: "AI Tools", href: "/category/ai-tools", icon: "🤖" },
  { label: "AI SEO", href: "/category/ai-seo-tools", icon: "📈" },
  { label: "Vibe Coding", href: "/category/ai-code-generators", icon: "⌨️" },
  { label: "AI Hub", href: "/ai-directory", icon: "✦" },
  { label: "Web Hub", href: "/web-directory", icon: "🌐" },
  { label: "Free Downloads", href: "/tools", icon: "⬇️" },
  { label: "Blog", href: "/blog", icon: "📝" },
];

export { QUICK_LINKS };

/** Featured web picks — shown instead of filter chips on mobile */
export const WEB_SPOTLIGHT = [
  {
    href: "/category/online-games",
    label: "Online Games",
    emoji: "🎮",
    tag: "Play in browser",
  },
  {
    href: "/tools",
    label: "Free Downloads",
    emoji: "⬇️",
    tag: "Social & video",
  },
  {
    href: "/top-trending-websites",
    label: "Trending Sites",
    emoji: "🔥",
    tag: "Google-style charts",
  },
  {
    href: "/category/pdf-and-document-tools",
    label: "PDF & Docs",
    emoji: "📄",
    tag: "Merge & convert",
  },
] as const;

const WEB_SLUG_EMOJI: Record<string, string> = {
  "online-games": "🎮",
  "play-browser-games": "🕹️",
  "pdf-and-document-tools": "📄",
  "ai-background-remover": "✂️",
  "ai-image-filters": "🖼️",
  "ai-video-generators": "🎬",
};

export function webCategoryEmoji(slug: string): string {
  if (WEB_SLUG_EMOJI[slug]) return WEB_SLUG_EMOJI[slug];
  const s = slug.toLowerCase();
  if (s.includes("game")) return "🎮";
  if (s.includes("pdf") || s.includes("document")) return "📄";
  if (s.includes("image") || s.includes("photo")) return "🖼️";
  if (s.includes("video")) return "🎬";
  if (s.includes("music") || s.includes("audio")) return "🎵";
  if (s.includes("design") || s.includes("logo")) return "🎨";
  if (s.includes("email")) return "✉️";
  if (s.includes("shopping")) return "🛒";
  if (s.includes("travel")) return "✈️";
  return "🌐";
}

export const FILTER_LOOKUP = Object.fromEntries(
  MEGA_FILTERS.map((f) => [f.id, { icon: f.icon, label: f.label }])
) as Record<MegaFilterId, { icon: string; label: string }>;

function inferGroup(cat: MenuCategory): MegaFilterId {
  const slug = cat.slug.toLowerCase();
  const title = cat.title.toLowerCase();
  const type = (cat.type || "").toLowerCase();

  const blob = `${slug} ${title} ${type}`;

  if (
    slug.startsWith("ai-") ||
    slug.includes("ai-tools") ||
    /^(ai|aivibe|aicontents|aidata|aiseo|aivideo|aivoice)/i.test(type) ||
    blob.includes("artificial intelligence") ||
    blob.includes("machine learning") ||
    (blob.includes(" ai ") && !blob.includes("email"))
  ) {
    return "ai";
  }

  if (
    type === "tools" ||
    type.includes("tool") ||
    slug.includes("tool") ||
    slug.includes("generator") ||
    slug.includes("converter") ||
    slug.includes("pdf") ||
    slug.includes("document")
  ) {
    return "tools";
  }

  if (
    type === "gaming" ||
    type === "entertainment" ||
    slug.includes("game") ||
    slug.includes("online-games") ||
    blob.includes("gaming")
  ) {
    return "games";
  }

  if (
    type.includes("image") ||
    type.includes("video") ||
    type.includes("design") ||
    type.includes("logo") ||
    slug.includes("design") ||
    slug.includes("image") ||
    slug.includes("video") ||
    slug.includes("photo")
  ) {
    return "creative";
  }

  if (
    type === "finance" ||
    type === "services" ||
    type === "realestate" ||
    type === "shopping" ||
    type === "technology" ||
    slug.includes("business") ||
    slug.includes("finance") ||
    slug.includes("marketing") ||
    slug.includes("seo")
  ) {
    return "business";
  }

  if (
    type === "lifestyle" ||
    type === "travel" ||
    type === "social" ||
    type === "news" ||
    type === "sports" ||
    type === "education" ||
    type === "health"
  ) {
    return "lifestyle";
  }

  return "other";
}

export interface EnrichedMenuCategory extends MenuCategory {
  group: MegaFilterId;
}

export function enrichMenuCategories(
  categories: MenuCategory[]
): EnrichedMenuCategory[] {
  return categories.map((c) => ({
    ...c,
    group: inferGroup(c),
  }));
}

export function getFilterCounts(
  categories: EnrichedMenuCategory[]
): Record<MegaFilterId, number> {
  const counts: Record<string, number> = { all: categories.length };
  for (const c of categories) {
    counts[c.group] = (counts[c.group] ?? 0) + 1;
  }
  return counts as Record<MegaFilterId, number>;
}

export function filterMenuCategories(
  categories: EnrichedMenuCategory[],
  opts: {
    query: string;
    filter: MegaFilterId;
    sort: MegaSortId;
  }
): EnrichedMenuCategory[] {
  let result = [...categories];

  if (opts.query.trim()) {
    const q = opts.query.trim().toLowerCase();
    result = result.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q)
    );
  }

  if (opts.filter !== "all") {
    result = result.filter((c) => c.group === opts.filter);
  }

  switch (opts.sort) {
    case "name-asc":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "name-desc":
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      result.sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999));
  }

  return result;
}
