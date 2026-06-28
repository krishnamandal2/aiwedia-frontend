const BASE = process.env.NEXT_PUBLIC_API_URL;

export type LinkedTool = {
  title: string;
  slug: string;
  image?: string;
  description?: string;
  categorySlug: string;
  href: string;
  editorScore?: number;
};

export type LinkedPrompt = {
  title: string;
  slug: string;
  useCase?: string;
  href: string;
};

export type LinkedNews = {
  title: string;
  slug: string;
  sourceName?: string;
  aiwediaScore?: number;
  href: string;
};

export async function getNewsRelated(category: string, excludeSlug?: string) {
  const empty = { tools: [], prompts: [], news: [] };
  if (!BASE || !category) return empty;

  try {
    const q = new URLSearchParams({ category });
    if (excludeSlug) q.set("exclude", excludeSlug);
    const res = await fetch(`${BASE}/api/linking/news?${q}`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) return empty;
    return res.json();
  } catch {
    return empty;
  }
}

export async function getToolRelated(categorySlug: string, toolSlug: string) {
  const empty = { news: [], prompts: [], similarTools: [] };
  if (!BASE) return empty;

  try {
    const res = await fetch(
      `${BASE}/api/linking/tool/${encodeURIComponent(categorySlug)}/${encodeURIComponent(toolSlug)}`,
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) return empty;
    return res.json();
  } catch {
    return empty;
  }
}
