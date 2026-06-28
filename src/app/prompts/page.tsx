import Link from "next/link";
import { ArrowUpRight, Copy, Sparkles } from "lucide-react";
import { getPromptsCached } from "@/lib/api";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { theme } from "@/lib/siteTheme";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "coding", label: "Coding" },
  { id: "seo", label: "SEO" },
  { id: "writing", label: "Writing" },
  { id: "image", label: "Image" },
  { id: "marketing", label: "Marketing" },
  { id: "productivity", label: "Productivity" },
];

export const metadata = buildPageMetadata({
  title: "AI Prompt Library — Copy-Ready Prompts for ChatGPT, Claude & More",
  description:
    "Browse 20+ copy-ready AI prompts for SEO, coding, marketing, image generation, and productivity. Free prompt library on AIWedia.",
  path: "/prompts",
  keywords: [
    "AI prompt library",
    "ChatGPT prompts",
    "Claude prompts",
    "best AI prompts",
    "SEO prompts",
  ],
});

export default async function PromptsIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const activeCat = params.category || "all";
  const { prompts: allPrompts } = await getPromptsCached();

  const prompts =
    activeCat === "all"
      ? allPrompts
      : allPrompts.filter((p) => p.category === activeCat);

  return (
    <div className={theme.page}>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10">
          <span className={theme.badge}>
            <Sparkles size={14} className="inline mr-1" />
            Prompt Library
          </span>
          <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
            AI Prompt Library
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Copy-ready prompts for ChatGPT, Claude, Midjourney, and more —
            organized by use case. Click any prompt to copy and customize.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.id === "all" ? "/prompts" : `/prompts?category=${cat.id}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeCat === cat.id
                  ? "bg-violet-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-violet-50"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {(prompts as { slug: string; title: string; useCase?: string; category: string }[]).map(
            (p) => (
              <Link
                key={p.slug}
                href={`/prompts/${p.slug}`}
                className={`block p-6 ${theme.card} ${theme.cardHover}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <Copy size={20} className="shrink-0 text-violet-600" />
                  <span className="rounded-full bg-violet-50 px-2 py-0.5 text-xs font-semibold text-violet-700 capitalize">
                    {p.category}
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-bold text-slate-900">{p.title}</h2>
                {p.useCase && (
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{p.useCase}</p>
                )}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-600">
                  View & copy prompt
                  <ArrowUpRight size={16} />
                </span>
              </Link>
            )
          )}
        </div>

        {prompts.length === 0 && (
          <p className="text-slate-500">
            No prompts yet. Run{" "}
            <code className="rounded bg-slate-100 px-1">npm run seed:prompts</code> on the
            backend.
          </p>
        )}

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm text-slate-600">
            Pair prompts with tools from our{" "}
            <Link href="/ai-directory" className="font-semibold text-violet-600 hover:underline">
              AI Tool Directory
            </Link>{" "}
            or explore{" "}
            <Link href="/compare" className="font-semibold text-violet-600 hover:underline">
              tool comparisons
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
