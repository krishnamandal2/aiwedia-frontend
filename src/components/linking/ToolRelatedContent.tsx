import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Newspaper, Sparkles, Star } from "lucide-react";
import type { LinkedNews, LinkedPrompt } from "@/lib/linkingApi";
import { formatAiNewsTitle } from "@/lib/aiNewsFormat";

type SimilarTool = {
  title: string;
  slug: string;
  image?: string;
  href: string;
};

export default function ToolRelatedContent({
  news,
  prompts,
  similarTools,
}: {
  news: LinkedNews[];
  prompts: LinkedPrompt[];
  similarTools: SimilarTool[];
}) {
  if (!news.length && !prompts.length && !similarTools.length) return null;

  return (
    <section className="mt-12 space-y-10">
      {news.length > 0 && (
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
            <Newspaper size={20} className="text-violet-600" />
            Latest AI news
          </h2>
          <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {news.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="flex items-center justify-between gap-3 px-5 py-4 transition hover:bg-violet-50/50"
                >
                  <div className="min-w-0">
                    <p className="line-clamp-2 font-semibold text-slate-900">
                      {formatAiNewsTitle(n.title)}
                    </p>
                    {n.sourceName && (
                      <p className="mt-0.5 text-xs text-slate-400">{n.sourceName}</p>
                    )}
                  </div>
                  {n.aiwediaScore != null && n.aiwediaScore > 0 && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-bold text-amber-800">
                      <Star size={12} className="fill-amber-400 text-amber-500" />
                      {n.aiwediaScore}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/ai-news"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:underline"
          >
            All AI news
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {prompts.length > 0 && (
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
            <Sparkles size={20} className="text-violet-600" />
            Try these prompts
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {prompts.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-violet-200 hover:shadow-md"
              >
                <p className="font-bold text-slate-900">{p.title}</p>
                {p.useCase && (
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">{p.useCase}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {similarTools.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-bold text-slate-900">More like this</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {similarTools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-violet-200"
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-violet-50">
                  {t.image ? (
                    <Image src={t.image} alt="" fill className="object-cover" sizes="40px" />
                  ) : (
                    <span className="flex h-full items-center justify-center text-sm font-bold text-violet-500">
                      {t.title.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="font-semibold text-slate-800">{t.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
