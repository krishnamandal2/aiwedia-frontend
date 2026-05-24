import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { PRIVACY_SEO } from "@/lib/seo/pages";

export const metadata = buildPageMetadata(PRIVACY_SEO);

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
