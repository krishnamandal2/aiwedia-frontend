import Link from "next/link";
import { ExternalLink, Clock, ChevronRight, Star } from "lucide-react";
import {
  AI_NEWS_CATEGORY_LABELS,
  type AiNewsItem,
} from "@/lib/aiNewsApi";
import {
  formatAiNewsExcerpt,
  formatAiNewsTitle,
} from "@/lib/aiNewsFormat";

type CardSize = "default" | "large";

export default function AiNewsCard({
  item,
  size = "default",
}: {
  item: AiNewsItem;
  size?: CardSize;
}) {
  const categoryLabel =
    AI_NEWS_CATEGORY_LABELS[item.category] || item.category;
  const title = formatAiNewsTitle(item.title);
  const excerpt = formatAiNewsExcerpt(item.summary, size === "large" ? 200 : 160);
  const imageAspect =
    size === "large" ? "aspect-[16/9] min-h-[200px]" : "aspect-[16/9]";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/50">
      <Link href={`/ai-news/${item.slug}`} className="block">
        {item.imageUrl ? (
          <div className={`relative overflow-hidden bg-slate-100 ${imageAspect}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt=""
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
          </div>
        ) : (
          <div
            className={`flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-slate-50 ${imageAspect}`}
          >
            <span
              className={`font-black text-violet-200 ${size === "large" ? "text-5xl" : "text-4xl"}`}
            >
              AI
            </span>
          </div>
        )}
      </Link>

      <div className={`flex flex-1 flex-col ${size === "large" ? "p-6 sm:p-7" : "p-5 sm:p-6"}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Link
            href={`/ai-news?category=${item.category}`}
            className="rounded-full bg-violet-50 px-2.5 py-1 font-semibold text-violet-700 hover:bg-violet-100"
          >
            {categoryLabel}
          </Link>
          {item.aiwediaScore != null && item.aiwediaScore > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 font-bold text-amber-800">
              <Star size={11} className="fill-amber-400 text-amber-500" />
              {item.aiwediaScore}
            </span>
          )}
          {item.aiwediaScore != null && item.aiwediaScore >= 8.5 && (
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase text-red-700">
              Hot
            </span>
          )}
          <span className="font-medium text-slate-400">{item.sourceName}</span>
        </div>

        <h2
          className={`mt-3 line-clamp-3 font-bold leading-snug text-slate-900 group-hover:text-violet-700 ${
            size === "large" ? "text-xl sm:text-2xl" : "text-lg"
          }`}
        >
          <Link href={`/ai-news/${item.slug}`}>{title}</Link>
        </h2>

        {excerpt && (
          <p
            className={`mt-2 line-clamp-3 flex-1 leading-relaxed text-slate-600 ${
              size === "large" ? "text-base" : "text-sm"
            }`}
          >
            {excerpt}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-4 text-xs">
          <span className="inline-flex items-center gap-1.5 font-medium text-slate-500">
            <Clock size={13} />
            {new Date(item.publishedAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1 font-semibold text-violet-600 hover:text-violet-800"
          >
            Source
            <ExternalLink size={12} />
          </a>
        </div>

        <Link
          href={`/ai-news/${item.slug}`}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-slate-900 group-hover:text-violet-700"
        >
          Read summary
          <ChevronRight size={16} className="transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
