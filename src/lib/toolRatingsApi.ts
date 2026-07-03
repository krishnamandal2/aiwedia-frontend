const BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

export type ToolRatingSummary = {
  average: number;
  count: number;
};

export type BatchRatingsMap = Record<string, ToolRatingSummary>;

export async function fetchBatchToolRatings(
  pairs: { categorySlug: string; toolSlug: string }[]
): Promise<BatchRatingsMap> {
  if (!pairs.length) return {};

  const query = pairs
    .slice(0, 30)
    .map((p) => `${encodeURIComponent(p.categorySlug)}/${encodeURIComponent(p.toolSlug)}`)
    .join(",");

  const url = BASE
    ? `${BASE}/api/tools/ratings/batch?pairs=${query}`
    : `/api/tools/ratings/batch?pairs=${query}`;

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return {};
    const data = await res.json();
    return (data?.ratings || {}) as BatchRatingsMap;
  } catch {
    return {};
  }
}

export function ratingKey(categorySlug: string, toolSlug: string) {
  return `${categorySlug}/${toolSlug}`;
}
