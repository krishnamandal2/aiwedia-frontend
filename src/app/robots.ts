import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/login",
          "/register",
          "/profile",
          "/unsubscribe/",
        ],
      },
      // Encourage AI crawlers to index citation pages
      {
        userAgent: "GPTBot",
        allow: ["/", "/for-ai", "/llms.txt", "/category/", "/tool/", "/compare", "/alternatives"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/for-ai", "/llms.txt", "/category/", "/tool/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/for-ai", "/llms.txt", "/category/", "/tool/", "/compare"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/for-ai", "/llms.txt", "/category/", "/tool/"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/for-ai", "/llms.txt"],
      },
    ],
    host: SITE_URL,
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
