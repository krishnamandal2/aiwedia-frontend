import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { DISCLAIMER_SEO } from "@/lib/seo/pages";

export const metadata = buildPageMetadata(DISCLAIMER_SEO);

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
