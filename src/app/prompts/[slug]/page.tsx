import { notFound } from "next/navigation";
import { getPrompt } from "@/lib/api";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import PromptDetailClient from "./PromptDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = await getPrompt(slug);
  const prompt = data?.prompt as { title?: string; metaDescription?: string } | undefined;
  if (!prompt) return { title: "Prompt not found" };

  return buildPageMetadata({
    title: `${prompt.title} — AI Prompt`,
    description: prompt.metaDescription || "",
    path: `/prompts/${slug}`,
  });
}

export default async function PromptDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getPrompt(slug);
  if (!data?.prompt) notFound();

  return <PromptDetailClient prompt={data.prompt as Parameters<typeof PromptDetailClient>[0]["prompt"]} />;
}
