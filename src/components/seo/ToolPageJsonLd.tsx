import { SITE_NAME, SITE_URL } from "@/lib/seo/site";

type ToolLink = { name: string; title?: string; url?: string };

export default function ToolPageJsonLd({
  slug,
  title,
  description,
  tools,
}: {
  slug: string;
  title: string;
  description: string;
  tools?: ToolLink[];
}) {
  const pageUrl = `${SITE_URL}/tools/${slug}`;

  const graphs: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Free Tools", item: `${SITE_URL}/tools` },
        { "@type": "ListItem", position: 3, name: title, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: pageUrl,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    },
  ];

  if (tools?.length) {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: title,
      numberOfItems: tools.length,
      itemListElement: tools.slice(0, 15).map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.title ?? t.name,
        item: t.url || pageUrl,
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graphs) }}
    />
  );
}
