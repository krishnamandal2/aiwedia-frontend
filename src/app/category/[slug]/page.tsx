import { notFound } from "next/navigation";
import CategoryPage from "@/components/CategoryPage";
import { getToolsByCategory, CategoryResponse } from "@/lib/api";

// export const revalidate = 3600; // ISR

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) notFound();

  const data: CategoryResponse | null = await getToolsByCategory(slug);
  


  if (!data) notFound();

  return <CategoryPage data={data} slug={slug} />;
}
