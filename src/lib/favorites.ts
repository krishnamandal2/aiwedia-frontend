export type FavoriteItem = {
  categorySlug: string;
  toolSlug: string;
  title?: string;
};

/** Coerce API/localStorage favorites into a safe shape for UI links */
export function normalizeFavorite(raw: unknown): FavoriteItem | null {
  if (!raw || typeof raw !== "object") return null;

  const o = raw as Record<string, unknown>;
  let categorySlug = o.categorySlug;
  let toolSlug = o.toolSlug;
  let title = o.title;

  if (toolSlug && typeof toolSlug === "object") {
    const t = toolSlug as Record<string, unknown>;
    toolSlug = t.slug ?? t.toolSlug ?? t.name ?? "";
    if (!title && typeof t.title === "string") title = t.title;
  }

  if (categorySlug && typeof categorySlug === "object") {
    const c = categorySlug as Record<string, unknown>;
    categorySlug = c.slug ?? c.categorySlug ?? "";
  }

  const cat = String(categorySlug ?? "").trim();
  const slug = String(toolSlug ?? "").trim();

  if (!cat || !slug || slug === "[object Object]") return null;

  return {
    categorySlug: cat,
    toolSlug: slug,
    title: typeof title === "string" && title.trim() ? title.trim() : undefined,
  };
}

export function normalizeFavoritesList(list: unknown): FavoriteItem[] {
  if (!Array.isArray(list)) return [];
  const out: FavoriteItem[] = [];
  const seen = new Set<string>();

  for (const item of list) {
    const f = normalizeFavorite(item);
    if (!f) continue;
    const key = `${f.categorySlug}:${f.toolSlug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(f);
  }
  return out;
}

export function favoriteDisplayTitle(f: FavoriteItem): string {
  if (f.title) return f.title;
  return f.toolSlug.replace(/-/g, " ");
}

/** Parse legacy localStorage value: string[] or mixed objects */
export function slugFromFavoriteEntry(entry: unknown): string | null {
  if (typeof entry === "string") {
    const s = entry.trim();
    return s || null;
  }
  if (entry && typeof entry === "object") {
    const o = entry as Record<string, unknown>;
    const s = String(o.slug ?? o.toolSlug ?? "").trim();
    return s && s !== "[object Object]" ? s : null;
  }
  return null;
}
