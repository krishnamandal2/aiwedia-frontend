import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { COOKIES_SEO } from "@/lib/seo/pages";

export const metadata = buildPageMetadata(COOKIES_SEO);

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
