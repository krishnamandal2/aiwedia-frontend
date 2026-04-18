import "server-only";

/* =========================
   TYPES
========================= */

export interface Tool {
  slug: string;
  title: string;
  description: string;
  image: string;
  url: string;
  rank: number;
  benefits: string[];
  categorySlug: string;
}

export interface CategoryResponse {
  title?: string;
  description?: string;
  tools: Tool[];
  total: number;
}

/* =========================
   CONFIG
========================= */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("❌ NEXT_PUBLIC_API_URL is not set");
}

/* =========================
   SAFE FETCH (WITH ISR)
========================= */

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // ✅ cache for 1 hour (SEO friendly)
    });

    if (!res.ok) {
      console.error(`❌ API Error: ${res.status} → ${url}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Fetch Failed:", url, error);
    return null;
  }
}

/* =========================
   API FUNCTIONS
========================= */

// 🔹 Get tools by category (SEO page)
export async function getToolsByCategory(
  slug: string
): Promise<CategoryResponse | null> {
  const data = await safeFetch<any>(
    `${BASE_URL}/api/categories/${slug}`
  );

  if (!data || !Array.isArray(data.tools)) return null;

  return {
    title: data.title,
    description: data.description,
    tools: data.tools,
    total: data.total ?? data.tools.length,
  };
}

// 🔹 Get all categories (Home Page)
export async function getCategories(page = 1, limit = 12) {
  const data = await safeFetch<any>(
    `${BASE_URL}/api/categories?page=${page}&limit=${limit}`
  );

  return (
    data || {
      categories: [],
      total: 0,
    }
  );
}

// 🔹 Get menu categories (Navbar)
export async function getMenuCategories() {
  const data = await safeFetch<any>(
    `${BASE_URL}/api/categories/menu`
  );

  return data || [];
}


//for free tools data



// ✅ Get all categories
export async function getAllTools() {
  const res = await fetch(`${BASE_URL}/api/free-tools`, {
    next: { revalidate: 60 }, // ISR (SEO boost)
  });

  const data = await res.json();
  return data.data;
}

// ✅ Get single page
export async function getToolBySlug(slug: string) {
  const res = await fetch(`${BASE_URL}/api/free-tools/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.data;
}