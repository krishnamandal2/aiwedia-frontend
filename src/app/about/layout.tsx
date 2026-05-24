import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { ABOUT_SEO } from "@/lib/seo/pages";

export const metadata = buildPageMetadata(ABOUT_SEO);

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
