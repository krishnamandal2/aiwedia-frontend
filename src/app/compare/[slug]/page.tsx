import { notFound } from "next/navigation";
import CompareDetailView from "@/components/compare/CompareDetailView";
import { fetchComparison } from "@/lib/toolsApi";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { SITE_URL } from "@/lib/seo/site";
import type { ComparisonDoc, ComparisonToolRef } from "@/lib/compareTypes";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchComparison(slug);
  const cmp = data?.comparison as ComparisonDoc | undefined;
  if (!cmp) return { title: "Comparison not found" };

  return buildPageMetadata({
    title: cmp.title || "Comparison",
    description: cmp.metaDescription || cmp.summary || "",
    path: `/compare/${slug}`,
  });
}

export default async function CompareDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchComparison(slug);
  if (!data?.comparison) notFound();

  const cmp = data.comparison as ComparisonDoc;
  const toolA = data.toolA as ComparisonToolRef;
  const toolB = data.toolB as ComparisonToolRef;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cmp.title,
    description: cmp.summary,
    url: `${SITE_URL}/compare/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CompareDetailView
        comparison={cmp}
        toolA={toolA}
        toolB={toolB}
      />
    </>
  );
}
