import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://aiwedia.com",
      lastModified: new Date(),
    },
    {
      url: "https://aiwedia.com/about",
      lastModified: new Date(),
    },
  ];
}