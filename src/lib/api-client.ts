/**
 * Browser / admin client API — all data from backend.
 * Use lib/api.ts in Server Components only.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL;

function getBase() {
  if (!BASE) throw new Error("NEXT_PUBLIC_API_URL is not set");
  return BASE;
}

export async function clientFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${getBase()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || `Request failed: ${path}`);
  }
  return data as T;
}

export function adminFetch<T>(path: string, init?: RequestInit) {
  return clientFetch<T>(`/api/admin/manage${path}`, {
    credentials: "include",
    ...init,
  });
}

export const clientApi = {
  search: (q: string) =>
    clientFetch<unknown[]>(`/api/search?q=${encodeURIComponent(q)}`),

  chat: (message: string) =>
    clientFetch<{ reply: string; links?: unknown[] }>("/api/chatllm", {
      method: "POST",
      body: JSON.stringify({ message }),
    }),

  subscribe: (email: string) =>
    clientFetch<{ message?: string }>("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  auth: {
    login: (body: { email: string; password: string }) =>
      clientFetch<{ token: string; user: unknown }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    register: (body: Record<string, string>) =>
      clientFetch<unknown>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
      }),
  },

  admin: {
    verify: () =>
      fetch(`${getBase()}/api/admin/verify`, { credentials: "include" }),
    guides: {
      list: () => adminFetch<{ guides: unknown[] }>("/guides"),
      create: (body: unknown) =>
        adminFetch("/guides", { method: "POST", body: JSON.stringify(body) }),
      update: (id: string, body: unknown) =>
        adminFetch(`/guides/${id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        }),
      remove: (id: string) =>
        adminFetch(`/guides/${id}`, { method: "DELETE" }),
    },
    comparisons: {
      list: () => adminFetch<{ comparisons: unknown[] }>("/comparisons"),
      create: (body: unknown) =>
        adminFetch("/comparisons", {
          method: "POST",
          body: JSON.stringify(body),
        }),
      update: (id: string, body: unknown) =>
        adminFetch(`/comparisons/${id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        }),
      remove: (id: string) =>
        adminFetch(`/comparisons/${id}`, { method: "DELETE" }),
      resolveSpecs: (toolASlug: string, toolBSlug: string) =>
        adminFetch<{ specsA: Record<string, string>; specsB: Record<string, string> }>(
          "/comparisons/resolve-specs",
          {
            method: "POST",
            body: JSON.stringify({ toolASlug, toolBSlug }),
          }
        ),
    },
    prompts: {
      list: () => adminFetch<{ prompts: unknown[] }>("/prompts"),
      create: (body: unknown) =>
        adminFetch("/prompts", { method: "POST", body: JSON.stringify(body) }),
      remove: (id: string) =>
        adminFetch(`/prompts/${id}`, { method: "DELETE" }),
    },
    comments: {
      list: (status?: string) =>
        adminFetch<{ comments: unknown[] }>(
          `/comments${status ? `?status=${status}` : ""}`
        ),
      updateStatus: (id: string, status: string) =>
        adminFetch(`/comments/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ status }),
        }),
      remove: (id: string) =>
        adminFetch(`/comments/${id}`, { method: "DELETE" }),
    },
    newsletter: {
      stats: () =>
        adminFetch<{ total: number; active: number; recent: unknown[] }>(
          "/newsletter"
        ),
      sendWeekly: () =>
        adminFetch<{ success: boolean; sent: number; total: number }>(
          "/newsletter/send",
          { method: "POST" }
        ),
    },
    categories: {
      list: () => adminFetch<{ categories: unknown[] }>("/categories"),
      update: (id: string, body: unknown) =>
        adminFetch(`/categories/${id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        }),
    },
    tools: {
      list: (categorySlug?: string) =>
        adminFetch<{ tools: unknown[] }>(
          `/tools${categorySlug ? `?categorySlug=${categorySlug}` : ""}`
        ),
      create: (body: unknown) =>
        adminFetch("/tools", { method: "POST", body: JSON.stringify(body) }),
      update: (id: string, body: unknown) =>
        adminFetch(`/tools/${id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        }),
    },
    siteConfig: {
      list: () => adminFetch<{ configs: unknown[] }>("/site-config"),
      upsert: (body: { key: string; label?: string; value: unknown }) =>
        adminFetch("/site-config", {
          method: "PUT",
          body: JSON.stringify(body),
        }),
    },
  },
};
