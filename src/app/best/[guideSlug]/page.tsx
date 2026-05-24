import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ToolDirectoryCard, {
  type DirectoryTool,
} from "@/components/tools/ToolDirectoryCard";
import { getBestGuide } from "@/lib/api";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";

interface PageProps {
  params: Promise<{ guideSlug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { guideSlug } = await params;
  const data = await getBestGuide(guideSlug);
  if (!data?.guide) return { title: "Guide not found" };

  return buildPageMetadata({
    title: data.guide.title,
    description: data.guide.description,
    path: `/best/${guideSlug}`,
    keywords: data.guide.keywords,
  });
}

export default async function BestGuidePage({ params }: PageProps) {
  const { guideSlug } = await params;
  const data = await getBestGuide(guideSlug);
  if (!data?.guide) notFound();

  const { guide, category, tools } = data;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/best"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-violet-700"
        >
          <ArrowLeft size={16} />
          All guides
        </Link>

        <header className="max-w-3xl">
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-4 text-lg text-slate-600">{guide.description}</p>
          <Link
            href={`/category/${category.slug}`}
            className="mt-4 inline-block text-sm font-semibold text-violet-600 hover:underline"
          >
            View full {category.title} directory →
          </Link>
        </header>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(tools as DirectoryTool[]).map((t) => (
            <ToolDirectoryCard key={t.slug} tool={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
