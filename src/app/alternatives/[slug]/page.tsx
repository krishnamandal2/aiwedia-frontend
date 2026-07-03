import { notFound } from "next/navigation";
import AlternativesDetailView from "@/components/alternatives/AlternativesDetailView";
import { fetchAlternative } from "@/lib/alternativesApi";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { SITE_URL } from "@/lib/seo/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchAlternative(slug);
  const alt = data?.alternative as { title?: string; metaDescription?: string; summary?: string } | undefined;
  if (!alt) return { title: "Not found" };

  return buildPageMetadata({
    title: alt.title || "Alternatives",
    description: alt.metaDescription || alt.summary || "",
    path: `/alternatives/${slug}`,
  });
}

export default async function AlternativeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchAlternative(slug);
  if (!data?.alternative) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.alternative.title,
    description: data.alternative.summary,
    url: `${SITE_URL}/alternatives/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AlternativesDetailView
        alternative={data.alternative}
        focalTool={data.focalTool}
        alternatives={data.alternatives}
        comparisons={data.comparisons}
      />
    </>
  );
}
