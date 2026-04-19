import { MetadataRoute } from "next";

const BASE_URL = "https://aiwedia.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  return await safeFetch(
    `${API_URL}/api/blogs/public`
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

/* =========================
   MAIN SITEMAP
========================= */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const blogs = await fetchBlogs();
  const categories = await fetchCategories();
  const tools = await fetchTools();

  console.log("Blogs:", blogs.length);
  console.log("Categories:", categories.length);
  console.log("Tools:", tools.length);

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

  const categoryUrls = categories.map((cat: any) => ({
    url: `${BASE_URL}/category/${cat.slug}`,

    lastModified: safeDate(
      cat.updatedAt
    ),

    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  /* =========================
     TOOL URLS
  ========================= */

  const toolUrls = tools.map((tool: any) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,

    lastModified: safeDate(
      tool.updatedAt
    ),

    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  /* =========================
     FINAL RETURN
  ========================= */

  return [
    ...staticPages,
    ...categoryUrls,
    ...blogUrls,
    ...toolUrls,
  ];
}