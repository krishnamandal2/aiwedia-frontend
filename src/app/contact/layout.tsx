import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { CONTACT_SEO } from "@/lib/seo/pages";

export const metadata = buildPageMetadata(CONTACT_SEO);

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
