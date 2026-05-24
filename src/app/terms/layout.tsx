import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { TERMS_SEO } from "@/lib/seo/pages";

export const metadata = buildPageMetadata(TERMS_SEO);

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
