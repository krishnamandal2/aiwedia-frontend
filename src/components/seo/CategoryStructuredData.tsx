import type { CategoryResponse } from "@/lib/types";
import { buildCategoryJsonLd } from "@/lib/seo/categorySeo";

export default function CategoryStructuredData({
  slug,
  data,
}: {
  slug: string;
  data: CategoryResponse;
}) {
  const graphs = buildCategoryJsonLd(slug, data);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graphs) }}
    />
  );
}
