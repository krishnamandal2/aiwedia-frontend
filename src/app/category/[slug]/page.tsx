import { notFound } from "next/navigation";

import CategoryPage from "@/components/routepageui/CategoryPage";

import CategoryStructuredData from "@/components/seo/CategoryStructuredData";

import { loadCategoryPage, getAllCategorySlugs } from "@/lib/api";

import { buildCategoryMetadata } from "@/lib/seo/categorySeo";

import type { CategoryResponse } from "@/lib/types";

export const dynamic = "force-dynamic";

export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllCategorySlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = await loadCategoryPage(slug);
  if (!data) return { title: "Category Not Found" };

  return buildCategoryMetadata(slug, data);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) notFound();

  const data: CategoryResponse | null = await loadCategoryPage(slug);

  if (!data) notFound();

  return (
    <>
      <CategoryStructuredData slug={slug} data={data} />
      <CategoryPage data={data} slug={slug} />
    </>
  );
}
