import { FREE_DOWNLOAD_TRENDING } from "./freeDownloadSpotlight";
import {
  getFreeToolPageFallback,
  type FreeToolPageDetail,
} from "@/data/freeToolPageFallback";

export interface FreeToolListItem {
  slug: string;
  image?: string;
  title?: string;
  categoryTitle?: string;
  intro?: string;
  priority?: number;
  tags?: string[];
}

function staticFallbackList(): FreeToolListItem[] {
  return FREE_DOWNLOAD_TRENDING.map((t, i) => ({
    slug: t.slug,
    title: t.label,
    intro: `Popular free ${t.label.toLowerCase()} tools — high Google search volume.`,
    priority: i + 1,
    tags: ["social"],
  }));
}

export async function fetchFreeToolsList(): Promise<FreeToolListItem[]> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) return staticFallbackList();

  try {
    const res = await fetch(`${base}/api/free-tools`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return staticFallbackList();
    const data = await res.json();
    const list = data.data ?? [];
    return list.length > 0 ? list : staticFallbackList();
  } catch {
    return staticFallbackList();
  }
}

export type { FreeToolPageDetail };

/** Load free tool page — always fresh; uses static fallback if DB not seeded */
export async function getFreeToolBySlug(
  slug: string
): Promise<FreeToolPageDetail | null> {
  const base = process.env.NEXT_PUBLIC_API_URL;

  if (base) {
    try {
      const res = await fetch(
        `${base}/api/free-tools/${encodeURIComponent(slug)}`,
        { cache: "no-store" }
      );

      if (res.ok) {
        const json = await res.json();
        const data = json?.data;
        if (data?.slug) {
          return {
            slug: data.slug,
            title: data.title || data.h1 || slug,
            h1: data.h1 || data.title || slug,
            intro: data.intro || data.description || "",
            description: data.description || data.intro || "",
            about: data.about,
            faq: data.faq,
            tools: Array.isArray(data.tools) ? data.tools : [],
          };
        }
      }
    } catch {
      /* use fallback below */
    }
  }

  const fallback = getFreeToolPageFallback(slug);
  if (fallback) return fallback;

  const fromList = (await fetchFreeToolsList()).find((t) => t.slug === slug);
  if (fromList) {
    return {
      slug,
      title: fromList.title || fromList.categoryTitle || slug,
      h1: fromList.categoryTitle || fromList.title || slug,
      intro: fromList.intro || "",
      description: fromList.intro || "",
      tools: [],
    };
  }

  return null;
}
