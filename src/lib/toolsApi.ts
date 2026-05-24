/** Server/client safe fetch helpers — prefer `@/lib/api` in Server Components. */

const BASE = process.env.NEXT_PUBLIC_API_URL;

function apiHeaders(): HeadersInit {
  const key = process.env.INTERNAL_API_KEY;
  return key ? { "x-internal-api-key": key } : {};
}

export type RecentToolItem = {
  slug: string;
  title: string;
  description?: string;
  image?: string;
  categorySlug: string;
  categoryTitle?: string;
};

export async function fetchRecentTools(days = 30, limit = 12) {
  if (!BASE) return { tools: [] as RecentToolItem[], mode: "empty" };

  try {
    const res = await fetch(
      `${BASE}/api/tools/recent?days=${days}&limit=${limit}`,
      {
        next: { revalidate: 120 },
        headers: apiHeaders(),
      }
    );
    if (!res.ok) {
      console.error(`fetchRecentTools: ${res.status}`);
      return { tools: [] as RecentToolItem[], mode: "error" };
    }
    const data = await res.json();
    const tools = Array.isArray(data?.tools) ? data.tools : [];
    return {
      tools: tools.filter(
        (t: RecentToolItem) => t?.slug && t?.categorySlug && t?.title
      ),
      mode: data?.mode || "recent",
    };
  } catch (e) {
    console.error("fetchRecentTools failed:", e);
    return { tools: [] as RecentToolItem[], mode: "error" };
  }
}

export async function fetchToolDetail(categorySlug: string, toolSlug: string) {
  if (!BASE) return null;
  try {
    const res = await fetch(
      `${BASE}/api/tools/${encodeURIComponent(categorySlug)}/${encodeURIComponent(toolSlug)}`,
      { cache: "no-store", headers: apiHeaders() }
    );
    if (res.ok) return res.json();
    const fallback = await fetch(
      `${BASE}/api/tools/by-slug/${encodeURIComponent(toolSlug)}`,
      { cache: "no-store", headers: apiHeaders() }
    );
    if (!fallback.ok) return null;
    return fallback.json();
  } catch {
    return null;
  }
}

export async function fetchBestGuides() {
  const res = await fetch(`${BASE}/api/guides`, { next: { revalidate: 3600 } });
  if (res.ok) return res.json();
  const fallback = await fetch(`${BASE}/api/tools/best-guides`, {
    next: { revalidate: 3600 },
  });
  if (!fallback.ok) return { guides: [] };
  return fallback.json();
}

export async function fetchBestGuide(slug: string) {
  const res = await fetch(`${BASE}/api/guides/${slug}`, {
    next: { revalidate: 3600 },
  });
  if (res.ok) return res.json();
  const fallback = await fetch(`${BASE}/api/tools/best-guides/${slug}`, {
    next: { revalidate: 3600 },
  });
  if (!fallback.ok) return null;
  return fallback.json();
}

export async function fetchCollections() {
  const res = await fetch(`${BASE}/api/collections`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) return { collections: [] };
  return res.json();
}

export async function fetchCollection(slug: string) {
  const res = await fetch(`${BASE}/api/collections/${slug}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function submitTool(payload: {
  toolName: string;
  toolUrl: string;
  categorySlug: string;
  description?: string;
  submitterName?: string;
  submitterEmail: string;
}) {
  const res = await fetch(`${BASE}/api/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Submission failed");
  return data;
}

export async function syncFavorites(
  token: string,
  favorites: { categorySlug: string; toolSlug: string }[]
) {
  const res = await fetch(`${BASE}/api/favorites`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ favorites }),
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getFavorites(token: string) {
  const res = await fetch(`${BASE}/api/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return { favorites: [] };
  return res.json();
}

export async function fetchComparisons() {
  const res = await fetch(`${BASE}/api/comparisons`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) return { comparisons: [] };
  return res.json();
}

export async function fetchComparison(slug: string) {
  const res = await fetch(`${BASE}/api/comparisons/${slug}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) return null;
  return res.json();
}
