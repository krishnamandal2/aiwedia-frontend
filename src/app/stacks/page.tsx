import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { AI_STACKS } from "@/lib/aiStacks";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { theme } from "@/lib/siteTheme";

export const metadata = buildPageMetadata({
  title: "AI Stacks — Curated Tool Workflows for SEO, Coding & Startups",
  description:
    "Pre-built AI stacks for SEO, vibe coding, startups, and content creation. Tools, prompts, and news in one place on AIWedia.",
  path: "/stacks",
  keywords: ["AI stack", "AI tools workflow", "SEO AI stack", "coding AI stack"],
});

export default function StacksIndexPage() {
  return (
    <main className={theme.page}>
      <div className="border-b border-slate-200 bg-gradient-to-b from-violet-50/80 to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <span className={theme.badge}>
            <Layers size={14} className="inline mr-1" />
            AI Stacks
          </span>
          <h1 className="mt-4 text-4xl font-black text-slate-900 sm:text-5xl">
            Curated AI workflows
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Pick a stack — we link the best categories, tools, prompts, and live news
            for each use case.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {AI_STACKS.map((stack) => (
            <Link
              key={stack.slug}
              href={`/stacks/${stack.slug}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-violet-200 hover:shadow-lg"
            >
              <div className={`h-2 bg-gradient-to-r ${stack.accent}`} />
              <div className="p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {stack.tagline}
                </p>
                <h2 className="mt-2 text-xl font-black text-slate-900 group-hover:text-violet-700">
                  {stack.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {stack.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-violet-700">
                  Open stack
                  <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
