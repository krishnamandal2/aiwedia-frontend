import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://aiwedia.com";

  let blogs: any[] = [];

  try {
    const res = await fetch(`${baseUrl}/api/blog`, {
      cache: "no-store", // or simply remove fetch options
    });

    blogs = await res.json();
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error);
  }

  const blogUrls =
    blogs?.map((blog: any) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt || blog.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...blogUrls,
  ];
}