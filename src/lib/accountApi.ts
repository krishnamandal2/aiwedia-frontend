import { clientApiUrl } from "./clientApi";

export type AccountReview = {
  categorySlug: string;
  toolSlug: string;
  rating: number;
  updatedAt: string;
};

export type RecommendedTool = {
  title: string;
  slug: string;
  description?: string;
  image?: string;
  categorySlug: string;
  categoryTitle?: string;
  href: string;
  editorScore?: number;
};

export async function getAccount(token: string) {
  const res = await fetch(clientApiUrl("/api/account"), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getRecommendations(token: string) {
  const res = await fetch(clientApiUrl("/api/account/recommendations"), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return { tools: [] as RecommendedTool[] };
  return res.json() as Promise<{ tools: RecommendedTool[] }>;
}

export async function toggleFollowCategory(token: string, categorySlug: string) {
  const res = await fetch(clientApiUrl("/api/account/follow-category"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ categorySlug }),
  });
  if (!res.ok) return null;
  return res.json() as Promise<{ following: boolean; followedCategories: string[] }>;
}

export async function submitContactForm(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const res = await fetch(clientApiUrl("/api/contact"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Could not send message");
  return data;
}
