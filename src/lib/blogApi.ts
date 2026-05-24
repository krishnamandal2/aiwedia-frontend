export type BlogListItem = {
  title: string;
  slug: string;
  summary: string;
  image?: string;
  date: string;
};

export type BlogPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

const BASE = process.env.NEXT_PUBLIC_API_URL;

function apiHeaders(): HeadersInit {
  const key = process.env.INTERNAL_API_KEY;
  return key ? { "x-internal-api-key": key } : {};
}

const emptyPagination = (limit: number): BlogPagination => ({
  page: 1,
  limit,
  total: 0,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
});

/** Backend may return { blogs, pagination } or a plain Blog[] */
function normalizePublicBlogsResponse(
  data: unknown,
  page: number,
  limit: number
): { blogs: BlogListItem[]; pagination: BlogPagination } {
  if (Array.isArray(data)) {
    const total = data.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const skip = (page - 1) * limit;
    return {
      blogs: data.slice(skip, skip + limit) as BlogListItem[],
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  if (data && typeof data === "object" && Array.isArray((data as { blogs?: unknown }).blogs)) {
    const payload = data as { blogs: BlogListItem[]; pagination?: BlogPagination };
    return {
      blogs: payload.blogs,
      pagination: payload.pagination ?? emptyPagination(limit),
    };
  }

  return { blogs: [], pagination: emptyPagination(limit) };
}

export async function getPublicBlogs(
  page = 1,
  limit = 12
): Promise<{ blogs: BlogListItem[]; pagination: BlogPagination }> {
  if (!BASE) {
    console.error("getPublicBlogs: NEXT_PUBLIC_API_URL is not set");
    return { blogs: [], pagination: emptyPagination(limit) };
  }

  try {
    const res = await fetch(
      `${BASE}/api/blogs/public?page=${page}&limit=${limit}`,
      { cache: "no-store", headers: apiHeaders() }
    );

    if (!res.ok) {
      console.error(`getPublicBlogs: HTTP ${res.status}`);
      return { blogs: [], pagination: emptyPagination(limit) };
    }

    const data = await res.json();
    return normalizePublicBlogsResponse(data, page, limit);
  } catch (e) {
    console.error("getPublicBlogs failed:", e);
    return { blogs: [], pagination: emptyPagination(limit) };
  }
}

export async function getAllPublicBlogsForSitemap(): Promise<BlogListItem[]> {
  if (!BASE) return [];
  const res = await fetch(`${BASE}/api/blogs/public?page=1&limit=500`, {
    next: { revalidate: 3600 },
    headers: apiHeaders(),
  });
  if (!res.ok) return [];
  const data = await res.json();
  const { blogs } = normalizePublicBlogsResponse(data, 1, 500);
  return blogs;
}
