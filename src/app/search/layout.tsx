import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Search",
  description: "Search AIWedia categories and tools.",
  path: "/search",
  noIndex: true,
});

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
