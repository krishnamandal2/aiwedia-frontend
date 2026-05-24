import { SITE_NAME, SITE_URL } from "@/lib/seo/site";

const TOP_CATEGORIES = [
  { name: "AI Tools", url: `${SITE_URL}/category/ai-tools` },
  { name: "AI Coding Tools", url: `${SITE_URL}/category/ai-code-generators` },
  { name: "AI SEO Tools", url: `${SITE_URL}/category/ai-seo-tools` },
  { name: "Free Download Tools", url: `${SITE_URL}/tools` },
  { name: "Trending Websites", url: `${SITE_URL}/top-trending-websites` },
  { name: "AI Directory Hub", url: `${SITE_URL}/ai-directory` },
];

export default function HomeStructuredData() {
  const graphs = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: `${SITE_NAME} — Best AI Tools Directory`,
      description:
        "Curated AI tools for coding, SEO, images, agents, and free downloads.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Popular AIWedia categories",
      itemListElement: TOP_CATEGORIES.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: item.url,
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graphs) }}
    />
  );
}
