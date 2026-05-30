import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

const BASE_URL = SITE_URL;

/** Higher priority in sitemap for money/traffic pages */
const HIGH_PRIORITY_SLUGS = new Set([
  "ai-tools",
  "ai-code-generators",
  "ai-seo-tools",
  "ai-marketing-tools",
  "ai-agents-automation",
  "ai-image-generators",
  "ai-writing-tools",
]);
const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:7300";

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? value : [];
}

/* =========================
   SAFE DATE HANDLER
========================= */

function safeDate(date?: string) {
  if (!date) return new Date("2026-01-01");

  const parsed = new Date(date);

  return isNaN(parsed.getTime())
    ? new Date("2026-01-01")
    : parsed;
}

/* =========================
   SAFE FETCH (ARRAY SAFE)
========================= */

async function safeFetch(url: string) {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // ISR 1 hour
    });

    if (!res.ok) {
      console.error("Fetch failed:", url);
      return [];
    }

    const data = await res.json();

    // ✅ If API returns array
    if (Array.isArray(data)) return data;

    // ✅ If API returns object
    return (
      data.data ||
      data.blogs ||
      data.categories ||
      data.items ||
      []
    );

  } catch (error) {

    console.error("Fetch error:", url);

    return [];
  }
}

/* =========================
   FETCH FUNCTIONS
========================= */

async function fetchBlogs() {
  const data = (await safeFetch(
    `${API_URL}/api/blogs/public?page=1&limit=500`
  )) as { blogs?: { slug: string }[] } | null;
  return data?.blogs ?? [];
}

async function fetchCategories() {
  return await safeFetch(
    `${API_URL}/api/categories?page=1&limit=1000`
  );
}

async function fetchTools() {
  return await safeFetch(
    `${API_URL}/api/free-tools`
  );
}

const BEST_GUIDE_SLUGS = [
  "ai-seo-tools",
  "ai-coding-tools",
  "free-download-tools",
  "ai-agents",
  "ai-content-creator-tools",
  "ai-video-description-tools",
  "ai-thumbnail-design-tools",
  "ai-podcast-tools",
  "ai-presentation-tools",
];

async function fetchComparisonSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/comparisons`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.comparisons || []).map((c: { slug: string }) => c.slug);
  } catch {
    return [];
  }
}

async function fetchCollectionSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/collections`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.collections || []).map((c: { slug: string }) => c.slug);
  } catch {
    return [];
  }
}

async function fetchAiToolDetailUrls() {
  const urls: MetadataRoute.Sitemap = [];
  const slugs = Array.from(HIGH_PRIORITY_SLUGS);

  await Promise.all(
    slugs.map(async (catSlug) => {
      try {
        const res = await fetch(`${API_URL}/api/categories/${catSlug}`, {
          next: { revalidate: 86400 },
        });
        if (!res.ok) return;
        const data = await res.json();
        const tools = data.tools || [];
        for (const t of tools) {
          if (!t.slug) continue;
          urls.push({
            url: `${BASE_URL}/tool/${catSlug}/${t.slug}`,
            lastModified: new Date("2026-05-22"),
            changeFrequency: "weekly" as const,
            priority: 0.78,
          });
        }
      } catch {
        /* skip category */
      }
    })
  );

  return urls;
}

/* =========================
   MAIN SITEMAP
========================= */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const blogs = asArray<{ slug: string; updatedAt?: string; createdAt?: string }>(
    await fetchBlogs()
  );
  const categories = asArray<{ slug: string; updatedAt?: string }>(
    await fetchCategories()
  );
  const tools = asArray<{ slug: string; updatedAt?: string }>(
    await fetchTools()
  );
  const collectionSlugs = await fetchCollectionSlugs();
  const comparisonSlugs = await fetchComparisonSlugs();
  const toolDetailUrls = await fetchAiToolDetailUrls();

  /* =========================
     STATIC PAGES
  ========================= */

  const staticPages: MetadataRoute.Sitemap = [

    {
      url: BASE_URL,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/top-trending-websites`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/ai-directory`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: `${BASE_URL}/web-directory`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: `${BASE_URL}/best`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/collections`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "weekly",
      priority: 0.85,
    },

    {
      url: `${BASE_URL}/suggest-tool`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "monthly",
      priority: 0.6,
    },

    {
      url: `${BASE_URL}/compare`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "weekly",
      priority: 0.88,
    },

    {
      url: `${BASE_URL}/category/ai-seo-tools`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "weekly",
      priority: 0.92,
    },

    {
      url: `${BASE_URL}/category/ai-code-generators`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "weekly",
      priority: 0.92,
    },

    {
      url: `${BASE_URL}/about`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.6,
    },

    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.4,
    },

    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.4,
    },

  ];

  /* =========================
     BLOG URLS
  ========================= */

  const blogUrls = blogs.map((blog: any) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,

    lastModified: safeDate(
      blog.updatedAt || blog.createdAt
    ),

    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  /* =========================
     CATEGORY URLS
  ========================= */

  const categoryUrls = categories.map((cat: { slug: string; updatedAt?: string }) => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: safeDate(cat.updatedAt),
    changeFrequency: "weekly" as const,
    priority: HIGH_PRIORITY_SLUGS.has(cat.slug)
      ? 0.88
      : cat.slug?.startsWith("ai-")
        ? 0.82
        : 0.7,
  }));

  /* =========================
     TOOL URLS
  ========================= */

  const toolUrls = tools.map((tool: { slug: string; updatedAt?: string }) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: safeDate(tool.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const bestGuideUrls = BEST_GUIDE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/best/${slug}`,
    lastModified: new Date("2026-05-22"),
    changeFrequency: "weekly" as const,
    priority: 0.88,
  }));

  const collectionUrls = collectionSlugs.map((slug) => ({
    url: `${BASE_URL}/collections/${slug}`,
    lastModified: new Date("2026-05-22"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const comparisonUrls = comparisonSlugs.map((slug) => ({
    url: `${BASE_URL}/compare/${slug}`,
    lastModified: new Date("2026-05-22"),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  /* =========================
     FINAL RETURN
  ========================= */

  return [
    ...staticPages,
    ...categoryUrls,
    ...blogUrls,
    ...toolUrls,
    ...bestGuideUrls,
    ...collectionUrls,
    ...comparisonUrls,
    ...toolDetailUrls,
  ];
}