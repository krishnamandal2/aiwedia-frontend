import { clientApiUrl } from "./clientApi";

export type SaveItemType = "prompt" | "news";

const STORAGE_KEYS: Record<SaveItemType, string> = {
  prompt: "aiwedia_saved_prompts",
  news: "aiwedia_saved_news",
};

export function getLocalSaved(type: SaveItemType): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS[type]);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map(String).filter(Boolean)
      : [];
  } catch {
    return [];
  }
}

export function setLocalSaved(type: SaveItemType, slugs: string[]) {
  localStorage.setItem(STORAGE_KEYS[type], JSON.stringify(slugs));
}

export function isLocallySaved(type: SaveItemType, slug: string): boolean {
  return getLocalSaved(type).includes(slug);
}

export function toggleLocalSaved(type: SaveItemType, slug: string): boolean {
  const list = getLocalSaved(type);
  const idx = list.indexOf(slug);
  const saved = idx < 0;
  if (saved) list.push(slug);
  else list.splice(idx, 1);
  setLocalSaved(type, list);
  return saved;
}

export async function getSavedRemote(token: string) {
  const res = await fetch(clientApiUrl("/api/saved"), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return { prompts: [] as string[], news: [] as string[] };
  return res.json() as Promise<{ prompts: string[]; news: string[] }>;
}

export async function syncSavedRemote(
  token: string,
  payload: { prompts?: string[]; news?: string[] }
) {
  const res = await fetch(clientApiUrl("/api/saved"), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return null;
  return res.json() as Promise<{ prompts: string[]; news: string[] }>;
}

export async function toggleSavedRemote(
  token: string,
  type: SaveItemType,
  slug: string
) {
  const res = await fetch(clientApiUrl("/api/saved/toggle"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ type, slug }),
  });
  if (!res.ok) return null;
  return res.json() as Promise<{
    saved: boolean;
    prompts: string[];
    news: string[];
  }>;
}

export function formatSavedLabel(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
