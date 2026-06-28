import Link from "next/link";
import { formatAiNewsTitle } from "@/lib/aiNewsFormat";
import type { AiNewsItem } from "@/lib/aiNewsApi";

export default function AiNewsHeadlineTicker({
  items,
  label = "Breaking",
}: {
  items: AiNewsItem[];
  label?: string;
}) {
  if (!items.length) return null;

  const headlines = items.map((item) => ({
    slug: item.slug,
    title: formatAiNewsTitle(item.title),
    source: item.sourceName,
  }));

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-stretch">
        <div className="flex shrink-0 items-center bg-slate-900 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-white">
          {label}
        </div>
        <div className="relative flex-1 overflow-hidden py-3">
          <div className="animate-ticker flex w-max gap-8 px-4">
            {[...headlines, ...headlines].map((h, i) => (
              <Link
                key={`${h.slug}-${i}`}
                href={`/ai-news/${h.slug}`}
                className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-slate-800 hover:text-violet-700"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                <span className="line-clamp-1">{h.title}</span>
                <span className="text-xs font-normal text-slate-400">— {h.source}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
