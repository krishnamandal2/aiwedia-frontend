import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import {
  AI_NEWS_CATEGORY_LABELS,
  type AiNewsItem,
} from "@/lib/aiNewsApi";
import {
  formatAiNewsExcerpt,
  formatAiNewsTitle,
} from "@/lib/aiNewsFormat";

export function pickFeaturedItem(items: AiNewsItem[]): AiNewsItem | null {
  if (!items.length) return null;
  return items.find((i) => i.imageUrl) ?? items[0];
}

export default function AiNewsFeatured({
  item,
  layout = "hero",
}: {
  item: AiNewsItem;
  layout?: "hero" | "compact";
}) {
  const categoryLabel =
    AI_NEWS_CATEGORY_LABELS[item.category] || item.category;
  const title = formatAiNewsTitle(item.title);
  const excerpt = formatAiNewsExcerpt(item.summary, layout === "hero" ? 220 : 200);

  if (layout === "compact") {
    return (
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-violet-200 hover:shadow-md">
        <Link href={`/ai-news/${item.slug}`} className="flex h-full flex-col">
          <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100">
            {item.imageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={item.imageUrl}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-50 to-slate-50">
                <span className="text-3xl font-black text-violet-200">AI</span>
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-violet-100 px-2.5 py-1 font-bold text-violet-800">
                {categoryLabel}
              </span>
              <span className="text-slate-400">{item.sourceName}</span>
            </div>
            <h3 className="mt-2 text-base font-bold leading-snug text-slate-900 group-hover:text-violet-700 sm:text-lg">
              {title}
            </h3>
            {excerpt && (
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{excerpt}</p>
            )}
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg ring-1 ring-slate-900/5">
      <div className="grid lg:grid-cols-2">
        <Link
          href={`/ai-news/${item.slug}`}
          className="relative block min-h-[240px] overflow-hidden bg-slate-100 sm:min-h-[320px] lg:min-h-[420px]"
        >
          {item.imageUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
              loading="eager"
              fetchPriority="high"
            />
          ) : (
            <div className="flex h-full min-h-[240px] items-center justify-center bg-gradient-to-br from-violet-100 via-white to-slate-50 sm:min-h-[320px] lg:min-h-[420px]">
              <span className="text-7xl font-black text-violet-200">AI</span>
            </div>
          )}
          <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow">
            Top story
          </span>
        </Link>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Link
              href={`/ai-news?category=${item.category}`}
              className="rounded-full bg-violet-100 px-3 py-1 font-bold uppercase tracking-wide text-violet-800 hover:bg-violet-200"
            >
              {categoryLabel}
            </Link>
            <span className="text-slate-400">·</span>
            <span className="font-semibold text-slate-500">{item.sourceName}</span>
            <span className="text-slate-400">·</span>
            <span className="inline-flex items-center gap-1 text-slate-500">
              <Clock size={13} />
              {new Date(item.publishedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl group-hover:text-violet-800">
            <Link href={`/ai-news/${item.slug}`}>{title}</Link>
          </h2>

          {excerpt && (
            <p className="mt-4 line-clamp-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {excerpt}
            </p>
          )}

          <Link
            href={`/ai-news/${item.slug}`}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
          >
            Read full summary
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
