import ToolDetailView from "@/components/tools/ToolDetailView";
import type { DirectoryTool } from "@/components/tools/ToolDirectoryCard";
import { resolveToolDetail } from "@/lib/api";
import { getToolRelated } from "@/lib/linkingApi";
import { fetchBatchToolRatings } from "@/lib/toolRatingsApi";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { SITE_URL } from "@/lib/seo/site";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ categorySlug: string; toolSlug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { categorySlug, toolSlug } = await params;
  const data = await resolveToolDetail(categorySlug, toolSlug);
  if (!data?.tool) return { title: "Tool not found" };

  return buildPageMetadata({
    title: `${data.tool.title} — ${data.category.title}`,
    description:
      data.tool.description?.slice(0, 155) ||
      `Review ${data.tool.title} on AIWedia.`,
    path: `/tool/${categorySlug}/${toolSlug}`,
    keywords: [data.tool.title, data.category.title, "AI tools"],
  });
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { categorySlug, toolSlug } = await params;
  const data = await resolveToolDetail(categorySlug, toolSlug);
  if (!data?.tool) notFound();

  const canonicalPath = data.canonicalPath as string | undefined;
  if (
    canonicalPath &&
    canonicalPath !== `/tool/${categorySlug}/${toolSlug}`
  ) {
    redirect(canonicalPath);
  }

  const { tool, category, similar } = data;
  const launchUrl = tool.launchUrl || tool.url;
  const commentSlug = `${categorySlug}/${toolSlug}`;
  const related = await getToolRelated(categorySlug, toolSlug);
  const similarRatings =
    similar && similar.length > 0
      ? await fetchBatchToolRatings(
          similar.map((t: DirectoryTool) => ({
            categorySlug: t.categorySlug,
            toolSlug: t.slug,
          }))
        )
      : {};
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    description: tool.description,
    url: `${SITE_URL}/tool/${categorySlug}/${toolSlug}`,
    applicationCategory: category.title,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolDetailView
        tool={tool}
        category={category}
        categorySlug={categorySlug}
        toolSlug={toolSlug}
        launchUrl={launchUrl}
        commentSlug={commentSlug}
        similar={similar}
        similarRatings={similarRatings}
        related={related}
      />
    </>
  );
}
