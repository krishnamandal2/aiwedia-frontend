import AlternativesHub from "@/components/alternatives/AlternativesHub";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildPageMetadata({
  title: "AI Tool Alternatives — ChatGPT, Midjourney, Copilot & More",
  description:
    "Find the best alternatives to popular AI tools. Curated lists with reasons, comparisons, and reviews on AIWedia.",
  path: "/alternatives",
  keywords: [
    "ChatGPT alternatives",
    "Midjourney alternatives",
    "Copilot alternatives",
    "AI tool alternatives",
  ],
});

export default function AlternativesIndexPage() {
  return <AlternativesHub />;
}
