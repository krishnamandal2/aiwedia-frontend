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
  // safeFetch already unwraps `data.blogs` to an array
  return asArray<{ slug: string; updatedAt?: string; createdAt?: string }>(
    await safeFetch(`${API_URL}/api/blogs/public?page=1&limit=500`)
  );
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

async function fetchAlternativeSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/alternatives`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.alternatives || []).map((a: { slug: string }) => a.slug);
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

async function fetchPromptSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/prompts`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.prompts || []).map((p: { slug: string }) => p.slug);
  } catch {
    return [];
  }
}

async function fetchAiNewsSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/ai-news?page=1&limit=500`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map((i: { slug: string }) => i.slug);
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
  const now = new Date();

  const [
    blogsRaw,
    categories,
    tools,
    collectionSlugs,
    comparisonSlugs,
    alternativeSlugs,
    promptSlugs,
    aiNewsSlugs,
    toolDetailUrls,
  ] = await Promise.all([
    fetchBlogs(),
    fetchCategories().then((d) =>
      asArray<{ slug: string; updatedAt?: string }>(d)
    ),
    fetchTools().then((d) =>
      asArray<{ slug: string; updatedAt?: string }>(d)
    ),
    fetchCollectionSlugs(),
    fetchComparisonSlugs(),
    fetchAlternativeSlugs(),
    fetchPromptSlugs(),
    fetchAiNewsSlugs(),
    fetchAiToolDetailUrls(),
  ]);

  const blogs = asArray<{
    slug: string;
    updatedAt?: string;
    createdAt?: string;
  }>(blogsRaw);

  /* =========================
     STATIC PAGES
  ========================= */

  const staticPages: MetadataRoute.Sitemap = [

    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/top-trending-websites`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/ai-directory`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: `${BASE_URL}/web-directory`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: `${BASE_URL}/best`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/collections`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },

    {
      url: `${BASE_URL}/deals`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.86,
    },
    {
      url: `${BASE_URL}/deals/lifetime-deals`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.82,
    },
    {
      url: `${BASE_URL}/deals/student-discounts`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.82,
    },
    {
      url: `${BASE_URL}/deals/startup-credits`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.82,
    },

    {
      url: `${BASE_URL}/suggest-tool`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    {
      url: `${BASE_URL}/for-ai`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.88,
    },

    {
      url: `${BASE_URL}/compare`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.88,
    },

    {
      url: `${BASE_URL}/alternatives`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.87,
    },

    {
      url: `${BASE_URL}/prompts`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${BASE_URL}/stacks`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: `${BASE_URL}/stacks/seo`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/stacks/vibe-coding`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/stacks/startup`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/stacks/content-creator`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "weekly",
      priority: 0.85,
    },

    {
      url: `${BASE_URL}/ai-news`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "daily",
      priority: 0.88,
    },

    {
      url: `${BASE_URL}/newsletter`,
      lastModified: new Date("2026-05-22"),
      changeFrequency: "monthly",
      priority: 0.7,
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

  const alternativeUrls = alternativeSlugs.map((slug) => ({
    url: `${BASE_URL}/alternatives/${slug}`,
    lastModified: new Date("2026-05-22"),
    changeFrequency: "weekly" as const,
    priority: 0.86,
  }));

  const promptUrls = promptSlugs.map((slug) => ({
    url: `${BASE_URL}/prompts/${slug}`,
    lastModified: new Date("2026-05-22"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const aiNewsUrls = aiNewsSlugs.map((slug) => ({
    url: `${BASE_URL}/ai-news/${slug}`,
    lastModified: new Date("2026-05-22"),
    changeFrequency: "daily" as const,
    priority: 0.75,
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
    ...alternativeUrls,
    ...promptUrls,
    ...aiNewsUrls,
    ...toolDetailUrls,
  ];
}