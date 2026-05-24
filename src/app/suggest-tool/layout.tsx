import { buildPageMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildPageMetadata({
  title: "Suggest an AI Tool",
  description:
    "Submit a new AI tool to AIWedia. Our team reviews community suggestions before publishing.",
  path: "/suggest-tool",
});

export default function SuggestToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
