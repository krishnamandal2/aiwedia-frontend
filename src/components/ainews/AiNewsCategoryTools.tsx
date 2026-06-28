import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import {
  AI_NEWS_CATEGORY_LABELS,
  AI_NEWS_CATEGORY_TOOL_LINKS,
} from "@/lib/aiNewsApi";

export default function AiNewsCategoryTools({
  category,
  variant = "banner",
}: {
  category: string;
  variant?: "banner" | "inline";
}) {
  const toolLink = AI_NEWS_CATEGORY_TOOL_LINKS[category];
  const label = AI_NEWS_CATEGORY_LABELS[category] || category;

  if (!toolLink) return null;

  if (variant === "inline") {
    return (
      <Link
        href={`/category/${toolLink.slug}`}
        className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-800"
      >
        <Wrench size={12} />
        {toolLink.label}
      </Link>
    );
  }

  return (
    <div className="mb-8 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-white p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
          {label} news
        </p>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">
          Explore curated {label.toLowerCase()} tools on AIWedia — compare, rank,
          and launch from our directory.
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 sm:mt-0">
        <Link
          href={`/category/${toolLink.slug}`}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-violet-700"
        >
          {toolLink.label}
          <ArrowRight size={16} />
        </Link>
        {category === "prompt-engineering" && (
          <Link
            href="/prompts"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-violet-200 hover:bg-violet-50"
          >
            Prompt Library
          </Link>
        )}
        {category === "seo-ai" && (
          <Link
            href="/best/ai-seo-tools"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:border-violet-200 hover:bg-violet-50"
          >
            Best SEO AI Guide
          </Link>
        )}
      </div>
    </div>
  );
}
