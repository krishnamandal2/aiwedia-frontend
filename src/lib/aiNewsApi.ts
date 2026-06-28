export type AiNewsCategory = {
  id: string;
  label: string;
  relatedCategorySlug?: string;
};

export const AI_NEWS_CATEGORY_TOOL_LINKS: Record<
  string,
  { slug: string; label: string }
> = {
  "ai-models": { slug: "ai-tools", label: "Browse AI Models & Tools" },
  "ai-tools": { slug: "ai-tools", label: "Browse AI Tools Directory" },
  llms: { slug: "ai-tools", label: "Browse LLM Tools" },
  "coding-ai": { slug: "ai-code-generators", label: "Browse Coding AI Tools" },
  "image-ai": { slug: "ai-image-generators", label: "Browse Image AI Tools" },
  "video-ai": { slug: "ai-video-generators", label: "Browse Video AI Tools" },
  research: { slug: "ai-tools", label: "Explore AI Research Tools" },
  startups: { slug: "ai-tools", label: "Discover AI Startups & Tools" },
  funding: { slug: "ai-tools", label: "Explore Funded AI Tools" },
  robotics: { slug: "ai-agents-automation", label: "Browse Robotics & Automation AI" },
  "open-source-ai": { slug: "ai-tools", label: "Browse Open Source AI Tools" },
  "prompt-engineering": { slug: "ai-tools", label: "AI Tools + Prompt Library" },
  "developer-tools": { slug: "ai-code-generators", label: "Browse Developer AI Tools" },
  cybersecurity: { slug: "ai-tools", label: "Explore AI Security Tools" },
  "cloud-ai": { slug: "ai-office-workplace-tools", label: "Browse Cloud & Workplace AI" },
  "seo-ai": { slug: "ai-seo-tools", label: "Browse AI SEO Tools" },
};

export type AiNewsItem = {
  slug: string;
  title: string;
  summary: string;
  sourceUrl: string;
  sourceName: string;
  imageUrl?: string;
  category: string;
  publishedAt: string;
  keyTakeaways?: string[];
  whyItMatters?: string;
  aiwediaScore?: number;
  aiwediaScoreLabel?: string;
};

export type AiNewsPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

const BASE = process.env.NEXT_PUBLIC_API_URL;

export const AI_NEWS_CATEGORY_LABELS: Record<string, string> = {
  "ai-models": "AI Models",
  "ai-tools": "AI Tools",
  llms: "LLMs",
  "coding-ai": "Coding AI",
  "image-ai": "Image AI",
  "video-ai": "Video AI",
  research: "Research",
  startups: "Startups",
  funding: "Funding",
  robotics: "Robotics",
  "open-source-ai": "Open Source AI",
  "prompt-engineering": "Prompt Engineering",
  "developer-tools": "Developer Tools",
  cybersecurity: "Cybersecurity",
  "cloud-ai": "Cloud AI",
  "seo-ai": "SEO AI",
};

export async function getAiNews(
  page = 1,
  limit = 24,
  category?: string
): Promise<{
  items: AiNewsItem[];
  categories: AiNewsCategory[];
  pagination: AiNewsPagination;
}> {
  const empty = {
    items: [],
    categories: [],
    pagination: {
      page: 1,
      limit,
      total: 0,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    },
  };

  if (!BASE) return empty;

  const catQ = category ? `&category=${encodeURIComponent(category)}` : "";

  try {
    const res = await fetch(
      `${BASE}/api/ai-news?page=${page}&limit=${limit}${catQ}`,
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) return empty;
    return res.json();
  } catch {
    return empty;
  }
}

export async function getAiNewsItem(slug: string) {
  if (!BASE) return null;
  try {
    const res = await fetch(`${BASE}/api/ai-news/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getAiNewsSlugsForSitemap(): Promise<string[]> {
  if (!BASE) return [];
  try {
    const res = await fetch(`${BASE}/api/ai-news?page=1&limit=500`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map((i: { slug: string }) => i.slug);
  } catch {
    return [];
  }
}
