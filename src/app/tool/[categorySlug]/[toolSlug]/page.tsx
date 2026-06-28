import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Star } from "lucide-react";
import ToolDirectoryCard, {
  type DirectoryTool,
} from "@/components/tools/ToolDirectoryCard";
import ToolRatingSection from "@/components/tools/ToolRatingSection";
import ToolRelatedContent from "@/components/linking/ToolRelatedContent";
import CommentSection from "@/components/comments/CommentSection";
import { resolveToolDetail } from "@/lib/api";
import { getToolRelated } from "@/lib/linkingApi";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { SITE_URL } from "@/lib/seo/site";
import { theme } from "@/lib/siteTheme";
import { redirect } from "next/navigation";

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    description: tool.description,
    url: `${SITE_URL}/tool/${categorySlug}/${toolSlug}`,
    applicationCategory: category.title,
  };

  return (
    <div className={theme.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-violet-50/80 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href={`/category/${category.slug}`}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-violet-700"
        >
          <ArrowLeft size={16} />
          Back to {category.title}
        </Link>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:p-8">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-violet-50 sm:h-28 sm:w-28">
              {tool.image ? (
                <Image
                  src={tool.image}
                  alt={tool.title}
                  fill
                  className="object-cover"
                  sizes="112px"
                  priority
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-xl font-bold text-violet-600">
                  {tool.title.charAt(0)}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={theme.badge}>{category.title}</span>
                {tool.editorsPick && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                    Editor&apos;s pick
                  </span>
                )}
                {tool.editorScore != null && tool.editorScore > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700">
                    <Star size={12} className="fill-amber-400 text-amber-500" />
                    {tool.editorScore}/10
                  </span>
                )}
              </div>
              <h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                {tool.title}
              </h1>
              <p className="mt-3 text-slate-600 leading-relaxed">{tool.description}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={launchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-500"
                >
                  Visit {tool.title}
                  <ExternalLink size={16} />
                </a>
                <Link
                  href={`/category/${category.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Browse category
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {tool.benefits && tool.benefits.length > 0 && (
            <div className="border-t border-slate-100 px-6 py-6 sm:px-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Key benefits
              </h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {tool.benefits.map((b: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ToolRatingSection categorySlug={categorySlug} toolSlug={toolSlug} />
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <CommentSection contentSlug={commentSlug} contentType="tool" />
        </div>

        <ToolRelatedContent
          news={related.news || []}
          prompts={related.prompts || []}
          similarTools={related.similarTools || []}
        />

        {similar && similar.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-slate-900">Similar tools</h2>
            <p className="mt-1 text-sm text-slate-500">
              More from {category.title}
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((t: DirectoryTool) => (
                <ToolDirectoryCard key={t.slug} tool={t} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
