import FreeToolsGrid from "@/freedownload/FreeToolsGrid";

import { buildPageMetadata } from "@/lib/seo/buildMetadata";

import { TOOLS_INDEX_SEO } from "@/lib/seo/pages";



export const metadata = buildPageMetadata(TOOLS_INDEX_SEO);



export default function ToolsPage() {

  return <FreeToolsGrid />;

}

