import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "AIWedia",
    description:
      "Best AI tools directory — coding, SEO, free downloads, and trending sites.",
    start_url: SITE_URL,
    display: "standalone",
    background_color: "#06060c",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/favicon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
