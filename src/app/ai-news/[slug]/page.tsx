import Link from "next/link";

import { notFound } from "next/navigation";

import { ArrowLeft, ExternalLink, Clock } from "lucide-react";

import { getAiNewsItem, AI_NEWS_CATEGORY_LABELS } from "@/lib/aiNewsApi";

import AiNewsCategoryTools from "@/components/ainews/AiNewsCategoryTools";

import AiNewsInsights from "@/components/ainews/AiNewsInsights";

import AiNewsSummary from "@/components/ainews/AiNewsSummary";

import NewsRelatedContent from "@/components/linking/NewsRelatedContent";

import AiNewsSaveButton from "@/components/ainews/AiNewsSaveButton";

import { buildAiNewsInsights } from "@/lib/aiNewsInsights";

import { getNewsRelated } from "@/lib/linkingApi";

import {

  formatAiNewsTitle,

  formatAiNewsSummary,

  formatAiNewsDetailSummary,

} from "@/lib/aiNewsFormat";

import { buildPageMetadata } from "@/lib/seo/buildMetadata";



interface PageProps {

  params: Promise<{ slug: string }>;

}



export async function generateMetadata({ params }: PageProps) {

  const { slug } = await params;

  const data = await getAiNewsItem(slug);

  const item = data?.item as { title?: string; summary?: string } | undefined;

  if (!item) return { title: "News not found" };



  return buildPageMetadata({

    title: formatAiNewsTitle(item.title || "AI News"),

    description: formatAiNewsSummary(item.summary || "").slice(0, 155),

    path: `/ai-news/${slug}`,

  });

}



export default async function AiNewsDetailPage({ params }: PageProps) {

  const { slug } = await params;

  const data = await getAiNewsItem(slug);

  if (!data?.item) notFound();



  const item = data.item as {

    title: string;

    summary: string;

    sourceUrl: string;

    sourceName: string;

    imageUrl?: string;

    category: string;

    publishedAt: string;

    slug: string;

    keyTakeaways?: string[];

    whyItMatters?: string;

    aiwediaScore?: number;

    aiwediaScoreLabel?: string;

  };



  const categoryLabel = AI_NEWS_CATEGORY_LABELS[item.category] || item.category;

  const title = formatAiNewsTitle(item.title);

  const cleanSummary = formatAiNewsDetailSummary(item.summary);

  const insights = buildAiNewsInsights(

    { ...item, summary: cleanSummary },

    categoryLabel

  );

  const related = await getNewsRelated(item.category, slug);



  return (

    <main className="min-h-screen bg-slate-100 text-slate-900">

      <div className="border-b border-slate-800 bg-slate-950">

        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">

          <Link

            href="/ai-news"

            className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"

          >

            <ArrowLeft size={16} />

            Back to AI News

          </Link>

        </div>

      </div>



      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">

          <div className="flex flex-wrap items-center gap-2 text-sm">

            <Link

              href={`/ai-news?category=${item.category}`}

              className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-violet-800 hover:bg-violet-200"

            >

              {categoryLabel}

            </Link>

            <span className="text-slate-300">·</span>

            <span className="font-medium text-slate-600">{item.sourceName}</span>

            <span className="text-slate-300">·</span>

            <span className="inline-flex items-center gap-1 text-slate-500">

              <Clock size={14} />

              {new Date(item.publishedAt).toLocaleDateString(undefined, {

                dateStyle: "long",

              })}

            </span>

          </div>



          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">

            <h1 className="text-3xl font-black leading-[1.15] tracking-tight text-slate-900 sm:text-4xl sm:leading-tight">

              {title}

            </h1>

            <AiNewsSaveButton slug={slug} />

          </div>



          {item.imageUrl && (

            <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner">

              {/* eslint-disable-next-line @next/next/no-img-element */}

              <img

                src={item.imageUrl}

                alt=""

                className="max-h-[440px] w-full object-cover"

              />

            </figure>

          )}



          <AiNewsSummary summary={cleanSummary} />



          <AiNewsInsights {...insights} />



          <NewsRelatedContent

            tools={related.tools || []}

            prompts={related.prompts || []}

            news={related.news || []}

            toolCategorySlug={related.toolCategorySlug}

          />



          <div className="mt-10">

            <AiNewsCategoryTools category={item.category} />

          </div>

        </div>



        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950 p-8 text-center text-white shadow-xl">

          <p className="text-sm text-slate-400">

            Full story on {item.sourceName}

          </p>

          <a

            href={item.sourceUrl}

            target="_blank"

            rel="noopener noreferrer nofollow"

            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-violet-50"

          >

            Read full article

            <ExternalLink size={16} />

          </a>

        </div>



        <p className="mt-8 text-center text-xs leading-relaxed text-slate-500">

          Headlines aggregated via RSS for discovery on AIWedia. Original content ©{" "}

          {item.sourceName}. We link to the source and do not republish full articles.

        </p>

      </article>



      <script

        type="application/ld+json"

        dangerouslySetInnerHTML={{

          __html: JSON.stringify({

            "@context": "https://schema.org",

            "@type": "NewsArticle",

            headline: title,

            description: cleanSummary.slice(0, 155) || formatAiNewsSummary(item.summary).slice(0, 155),

            image: item.imageUrl || undefined,

            datePublished: item.publishedAt,

            author: { "@type": "Organization", name: item.sourceName },

            isBasedOn: item.sourceUrl,

            mainEntityOfPage: `https://aiwedia.com/ai-news/${slug}`,

          }),

        }}

      />

    </main>

  );

}


