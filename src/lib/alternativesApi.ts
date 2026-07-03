const BASE = process.env.NEXT_PUBLIC_API_URL;

export type AlternativeListItem = {
  slug: string;
  title: string;
  summary?: string;
  altCount?: number;
  focalTool?: { title?: string; toolSlug?: string };
};

export type ResolvedAlternative = {
  title: string;
  slug: string;
  categorySlug: string;
  description?: string;
  image?: string;
  url?: string;
  detailUrl?: string;
  reason?: string;
  highlight?: string;
  editorScore?: number;
  editorsPick?: boolean;
  found?: boolean;
};

export async function fetchAlternatives() {
  const res = await fetch(`${BASE}/api/alternatives`, { next: { revalidate: 600 } });
  if (!res.ok) return { alternatives: [] as AlternativeListItem[] };
  return res.json() as Promise<{ alternatives: AlternativeListItem[] }>;
}

export async function fetchAlternative(slug: string) {
  const res = await fetch(`${BASE}/api/alternatives/${slug}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) return null;
  return res.json();
}
