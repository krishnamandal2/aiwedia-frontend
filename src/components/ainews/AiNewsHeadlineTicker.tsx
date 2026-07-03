import Link from "next/link";
import { formatAiNewsTitle } from "@/lib/aiNewsFormat";
import type { AiNewsItem } from "@/lib/aiNewsApi";

export default function AiNewsHeadlineTicker({
  items,
  label = "Breaking",
  variant = "light",
}: {
  items: AiNewsItem[];
  label?: string;
  variant?: "light" | "dark";
}) {
  if (!items.length) return null;

  const headlines = items.map((item) => ({
    slug: item.slug,
    title: formatAiNewsTitle(item.title),
    source: item.sourceName,
  }));

  const isDark = variant === "dark";

  return (
    <div
      className={`overflow-hidden ${
        isDark ? "bg-transparent" : "rounded-xl border border-slate-200 bg-white shadow-sm"
      }`}
    >
      <div className="flex items-stretch">
        <div
          className={`flex shrink-0 items-center px-4 py-3 text-[11px] font-bold uppercase tracking-widest ${
            isDark
              ? "bg-violet-600 text-white"
              : "bg-slate-900 text-white"
          }`}
        >
          {label}
        </div>
        <div className="relative flex-1 overflow-hidden py-3">
          <div className="animate-ticker flex w-max gap-8 px-4">
            {[...headlines, ...headlines].map((h, i) => (
              <Link
                key={`${h.slug}-${i}`}
                href={`/ai-news/${h.slug}`}
                className={`inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold ${
                  isDark
                    ? "text-slate-200 hover:text-violet-300"
                    : "text-slate-800 hover:text-violet-700"
                }`}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                <span className="line-clamp-1">{h.title}</span>
                <span
                  className={`text-xs font-normal ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  — {h.source}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
