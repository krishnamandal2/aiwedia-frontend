import { notFound } from "next/navigation";
import FreeLinkSection from "@/freedownload/FreeLinkSection";
import ToolPageJsonLd from "@/components/seo/ToolPageJsonLd";
import { getFreeToolBySlug } from "@/lib/freeToolsApi";
import { fetchFreeToolsList } from "@/lib/freeToolsApi";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const data = await fetchFreeToolsList();
  return data.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = await getFreeToolBySlug(slug);

  if (!data) return { title: "Tool Not Found" };

  const title = data.title || data.h1 || slug;
  const description =
    data.description ||
    data.intro?.slice(0, 160) ||
    `Free ${title} tools and links curated on AIWedia.`;

  return buildPageMetadata({
    title: `${title} — Free Online Tools`,
    description,
    path: `/tools/${slug}`,
    keywords: [title, "free online tool", "aiwedia", slug.replace(/-/g, " ")],
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await getFreeToolBySlug(slug);

  if (!data) return notFound();

  const pageTitle = data.title || data.h1 || slug;
  const pageDesc =
    data.description ||
    data.intro?.slice(0, 200) ||
    `Free ${pageTitle} on AIWedia.`;

  return (
    <>
      <ToolPageJsonLd
        slug={slug}
        title={pageTitle}
        description={pageDesc}
        tools={data.tools}
      />
      <FreeLinkSection
        title={data.h1}
        description={data.intro}
        tools={data.tools}
        about={data.about}
        faq={data.faq}
      />
    </>
  );
}
