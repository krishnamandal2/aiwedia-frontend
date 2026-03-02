import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "",
      priority: 0.8,
    },
  ];
}
