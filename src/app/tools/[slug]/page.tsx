import { notFound } from "next/navigation";
import FreeLinkSection from "@/freedownload/FreeLinkSection";
import { getToolBySlug, getAllTools } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string }>;
};

// ✅ Static params from API
export async function generateStaticParams() {
  const data = await getAllTools();

  return data.map((item: any) => ({
    slug: item.slug,
  }));
}

// ✅ Metadata
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const data = await getToolBySlug(slug);

  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
  };
}

// ✅ Page
export default async function Page({ params }: Props) {
  const { slug } = await params;

  const data = await getToolBySlug(slug);

  if (!data) return notFound();

  return (
    <FreeLinkSection
        title={data.h1}
        description={data.intro}
         tools={data.tools}
        about={data.about}   
        faq={data.faq}  
    />
  );
}