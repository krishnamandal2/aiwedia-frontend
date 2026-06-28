import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { FALLBACK_MENU_CATEGORIES } from "./fallbackMenuCategories";
import type { CategoryResponse, Tool } from "./types";

export type { Tool, CategoryResponse } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("❌ NEXT_PUBLIC_API_URL is not set");
}

const DEFAULT_SITE_CONFIG: Record<string, unknown> = {
  home_quick_links: [
    { href: "/category/ai-tools", label: "AI Tools", desc: "ChatGPT, image AI, coding assistants", icon: "ai" },
    { href: "/category/ai-code-generators", label: "AI Coding", desc: "Cursor, Copilot, vibe coding", icon: "code" },
    { href: "/category/ai-seo-tools", label: "AI SEO", desc: "Rank on Google with AI SEO suites", icon: "seo" },
    { href: "/ai-directory", label: "AI Directory Hub", desc: "All high-traffic AI categories", icon: "ai" },
    { href: "/web-directory", label: "Web & Utilities Hub", desc: "Games, PDF, free downloads", icon: "download" },
    { href: "/category/ai-office-workplace-tools", label: "Office AI", desc: "Microsoft 365, Slack, meetings", icon: "ai" },
    { href: "/tools", label: "Free Downloads", desc: "Social, video, PDF utilities", icon: "download" },
    { href: "/best", label: "Best Guides", desc: "Ranked best-of lists", icon: "best" },
    { href: "/compare", label: "Compare Tools", desc: "Side-by-side comparisons", icon: "compare" },
    { href: "/prompts", label: "Prompt Library", desc: "Copy-ready AI prompts", icon: "ai" },
    { href: "/ai-news", label: "AI News", desc: "Latest AI tools & trends", icon: "ai" },
    { href: "/newsletter", label: "Newsletter", desc: "Weekly AI digest", icon: "ai" },
  ],
  footer_categories: [
    { name: "AI Tools", href: "/category/ai-tools" },
    { name: "AI SEO Tools", href: "/category/ai-seo-tools" },
    { name: "Office & Workplace AI", href: "/category/ai-office-workplace-tools" },
    { name: "HR & Recruiting AI", href: "/category/ai-hr-recruiting-tools" },
    { name: "AI Directory Hub", href: "/ai-directory" },
    { name: "Web Directory Hub", href: "/web-directory" },
  ],
};

async function safeFetchInner<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const silent =
        url.includes("/api/site") ||
        url.includes("/api/guides/") ||
        url.includes("/api/comparisons") ||
        url.includes("/api/prompts");
      if (process.env.NODE_ENV === "development" && !silent) {
        console.error(`❌ API Error: ${res.status} → ${url}`);
      }
      return null;
    }

    return await res.json();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Fetch Failed:", url, error);
    }
    return null;
  }
}

/** Dedupe identical fetches within one server render */
const safeFetch = cache(safeFetchInner);

export async function getToolsByCategory(
  slug: string,
  options?: { noStore?: boolean }
): Promise<CategoryResponse | null> {
  const url = `${BASE_URL}/api/categories/${encodeURIComponent(slug)}`;
  const data = options?.noStore
    ? await safeFetchInner<CategoryResponse>(url)
    : await safeFetch<CategoryResponse>(url);

  if (!data) return null;
  if (!Array.isArray(data.tools)) {
    return {
      ...data,
      slug: data.slug ?? slug,
      tools: [],
      total: 0,
    };
  }

  return {
    ...data,
    slug: data.slug ?? slug,
    total: data.total ?? data.tools.length,
  };
}

/** Fresh fetch — avoids stale cached 404/empty from build time */
export async function loadCategoryPage(slug: string) {
  let data = await getToolsByCategory(slug, { noStore: true });
  if (data) return data;
  data = await getToolsByCategory(slug);
  return data;
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore && page <= 20) {
    const data = await safeFetchInner<{
      categories: { slug: string }[];
      hasMore?: boolean;
    }>(`${BASE_URL}/api/categories?page=${page}&limit=100`);

    if (!data?.categories?.length) break;
    slugs.push(...data.categories.map((c) => c.slug));
    hasMore = Boolean(data.hasMore);
    page += 1;
  }

  return [...new Set(slugs)];
}

export async function getComparisons() {
  const data = await safeFetch<{ comparisons: unknown[] }>(
    `${BASE_URL}/api/comparisons`
  );
  return data ?? { comparisons: [] };
}

export const getComparisonsCached = unstable_cache(getComparisons, ["comparisons-list"], {
  revalidate: 3600,
});

export async function getComparison(slug: string) {
  return safeFetch<{
    comparison: Record<string, unknown>;
    toolA: Record<string, unknown>;
    toolB: Record<string, unknown>;
  }>(`${BASE_URL}/api/comparisons/${slug}`);
}

export type PromptSummary = {
  slug: string;
  title: string;
  category: string;
  useCase?: string;
  tags?: string[];
  metaDescription?: string;
};

export async function getPrompts(category?: string) {
  const q = category ? `?category=${encodeURIComponent(category)}` : "";
  const data = await safeFetch<{ prompts: PromptSummary[] }>(
    `${BASE_URL}/api/prompts${q}`
  );
  return data ?? { prompts: [] };
}

export const getPromptsCached = unstable_cache(
  () => getPrompts(),
  ["prompts-list"],
  { revalidate: 3600 }
);

export async function getPrompt(slug: string) {
  return safeFetch<{ prompt: Record<string, unknown> }>(
    `${BASE_URL}/api/prompts/${slug}`
  );
}

export type GuideSummary = {
  slug: string;
  title: string;
  description: string;
  keywords?: string[];
};

export async function getBestGuides(): Promise<{ guides: GuideSummary[] }> {
  const data = await safeFetch<{ guides: GuideSummary[] }>(
    `${BASE_URL}/api/guides`
  );
  if (data?.guides?.length) return data;
  const fallback = await safeFetch<{ guides: GuideSummary[] }>(
    `${BASE_URL}/api/tools/best-guides`
  );
  return fallback ?? { guides: [] };
}

export const getBestGuidesCached = unstable_cache(getBestGuides, ["best-guides"], {
  revalidate: 3600,
});

export type BestGuideDetail = {
  guide: {
    slug: string;
    title: string;
    description: string;
    keywords?: string[];
    body?: string;
    faq?: { question: string; answer: string }[];
  };
  category: { title: string; slug: string; desc?: string };
  tools: import("./types").Tool[];
};

export async function getBestGuide(slug: string) {
  const data = await safeFetch<BestGuideDetail>(
    `${BASE_URL}/api/guides/${slug}`
  );
  if (data) return data;
  return safeFetch<BestGuideDetail>(
    `${BASE_URL}/api/tools/best-guides/${slug}`
  );
}

async function fetchSiteConfig(): Promise<Record<string, unknown>> {
  const data = await safeFetchInner<Record<string, unknown>>(
    `${BASE_URL}/api/site`
  );
  return data ?? DEFAULT_SITE_CONFIG;
}

export const getSiteConfig = unstable_cache(
  fetchSiteConfig,
  ["site-config"],
  { revalidate: 3600 }
);

function fallbackCategoryList(limit: number) {
  return FALLBACK_MENU_CATEGORIES.slice(0, limit).map((c) => ({
    title: c.title,
    slug: c.slug,
    typeui: c.typeui,
    desc: "",
    image: "",
  }));
}

export async function getCategories(page = 1, limit = 12) {
  const data = await safeFetch<{
    categories: unknown[];
    total: number;
  }>(`${BASE_URL}/api/categories?page=${page}&limit=${limit}`);

  if (data?.categories?.length) return data;

  const fallback = fallbackCategoryList(limit);
  return {
    categories: fallback,
    total: FALLBACK_MENU_CATEGORIES.length,
  };
}

export async function getCategoriesCached(page: number, limit: number) {
  return unstable_cache(
    () => getCategories(page, limit),
    ["categories-list", String(page), String(limit)],
    { revalidate: 3600 }
  )();
}

export async function getMenuCategories() {
  const data = await safeFetch<{ categories?: unknown[] } | unknown[]>(
    `${BASE_URL}/api/categories/menu`
  );

  if (!data) return { categories: [] };
  if (Array.isArray(data)) return { categories: data };
  return {
    categories: Array.isArray(data.categories) ? data.categories : [],
  };
}

export async function getAllTools() {
  try {
    const res = await fetch(`${BASE_URL}/api/free-tools`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.data) ? data.data : [];
  } catch {
    return [];
  }
}

export async function getToolBySlug(slug: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/free-tools/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.data ?? null;
  } catch {
    return null;
  }
}

export type ToolDetailPayload = {
  tool: Tool & {
    launchUrl?: string;
    faq?: { question: string; answer: string }[];
    benefits?: string[];
  };
  category: { title: string; slug: string; desc?: string };
  similar?: Tool[];
  canonicalPath?: string;
};

function findToolInCategory(
  data: CategoryResponse | null,
  toolSlug: string
): Tool | undefined {
  if (!data?.tools?.length) return undefined;
  const needle = toolSlug.trim().toLowerCase();
  return data.tools.find((t) => t.slug?.trim().toLowerCase() === needle);
}

function detailFromCategory(
  data: CategoryResponse,
  tool: Tool
): ToolDetailPayload {
  const slug = data.slug ?? tool.categorySlug;
  return {
    tool: {
      ...tool,
      categorySlug: tool.categorySlug || slug,
      launchUrl: tool.launchUrl || tool.url,
      benefits: tool.benefits ?? [],
      faq: [],
    },
    category: {
      title: data.title ?? "AI Tools",
      slug,
      desc: data.description,
    },
    canonicalPath: `/tool/${tool.categorySlug || slug}/${tool.slug}`,
    similar: data.tools
      .filter((t) => t.slug !== tool.slug)
      .slice(0, 6),
  };
}

/** Resolves tool detail — works even if /api/tools/:cat/:slug is missing on backend */
export async function resolveToolDetail(
  categorySlug: string,
  toolSlug: string
): Promise<ToolDetailPayload | null> {
  const cat = categorySlug.trim();
  const slug = toolSlug.trim();
  if (!cat || !slug) return null;

  try {
    const res = await fetch(
      `${BASE_URL}/api/tools/${encodeURIComponent(cat)}/${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const data = (await res.json()) as ToolDetailPayload;
      if (data?.tool?.slug) return data;
    }
  } catch {
    /* fall through */
  }

  try {
    const bySlug = await fetch(
      `${BASE_URL}/api/tools/by-slug/${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );
    if (bySlug.ok) {
      const data = (await bySlug.json()) as ToolDetailPayload;
      if (data?.tool?.slug) return data;
    }
  } catch {
    /* fall through */
  }

  const categoryData = await getToolsByCategory(cat);
  const tool = findToolInCategory(categoryData, slug);
  if (tool && categoryData) return detailFromCategory(categoryData, tool);

  return null;
}

export type RecentToolCard = {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  categorySlug: string;
  categoryTitle?: string;
  href: string;
};

/** Only returns tools whose detail page can be resolved (no 404 links) */
export async function getVerifiedRecentTools(
  days = 30,
  limit = 12
): Promise<{ tools: RecentToolCard[]; subtitle: string }> {
  let candidates: RecentToolCard[] = [];

  try {
    const res = await fetch(
      `${BASE_URL}/api/tools/recent?days=${days}&limit=${limit}`,
      { next: { revalidate: 120 } }
    );
    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data?.tools) ? data.tools : [];
      candidates = list
        .filter(
          (t: { slug?: string; categorySlug?: string; title?: string }) =>
            t?.slug && t?.categorySlug && t?.title
        )
        .map(
          (t: {
            slug: string;
            title: string;
            description?: string;
            image?: string;
            categorySlug: string;
            categoryTitle?: string;
            detailPath?: string;
          }) => ({
            slug: t.slug,
            title: t.title,
            description: t.description,
            image: t.image,
            categorySlug: t.categorySlug,
            categoryTitle: t.categoryTitle,
            href: t.detailPath || `/tool/${t.categorySlug}/${t.slug}`,
          })
        );
    }
  } catch {
    /* use fallback below */
  }

  if (candidates.length < 4) {
    const categoryData = await getToolsByCategory("ai-tools");
    candidates = (categoryData?.tools ?? []).slice(0, limit).map((t) => ({
      slug: t.slug,
      title: t.title,
      description: t.description,
      image: t.image,
      categorySlug: t.categorySlug || categoryData?.slug || "ai-tools",
      categoryTitle: categoryData?.title ?? "AI Tools",
      href: `/tool/${t.categorySlug || categoryData?.slug || "ai-tools"}/${t.slug}`,
    }));
  }

  const verified: RecentToolCard[] = [];
  for (const t of candidates) {
    const detail = await resolveToolDetail(t.categorySlug, t.slug);
    if (!detail?.tool) continue;
    verified.push({
      slug: detail.tool.slug,
      title: detail.tool.title,
      description: detail.tool.description || t.description,
      image: detail.tool.image || t.image,
      categorySlug: detail.category.slug,
      categoryTitle: detail.category.title,
      href:
        detail.canonicalPath ||
        `/tool/${detail.category.slug}/${detail.tool.slug}`,
    });
    if (verified.length >= 8) break;
  }

  const subtitle =
    verified.length > 0
      ? "Hand-picked AI tools — click for full details"
      : "";

  return { tools: verified, subtitle };
}
