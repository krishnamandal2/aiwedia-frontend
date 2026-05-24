import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ToolDirectoryCard, {
  type DirectoryTool,
} from "@/components/tools/ToolDirectoryCard";
import { fetchCollection } from "@/lib/toolsApi";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchCollection(slug);
  if (!data?.collection) return { title: "Collection not found" };

  return buildPageMetadata({
    title: data.collection.title,
    description: data.collection.description,
    path: `/collections/${slug}`,
  });
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchCollection(slug);
  if (!data?.collection) notFound();

  const { collection, tools } = data;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/collections"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-violet-700"
        >
          <ArrowLeft size={16} />
          All collections
        </Link>

        <h1 className="text-3xl font-black text-slate-900">{collection.title}</h1>
        <p className="mt-3 max-w-2xl text-slate-600">{collection.description}</p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(tools as DirectoryTool[]).map((t) => (
            <ToolDirectoryCard key={`${t.categorySlug}-${t.slug}`} tool={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
