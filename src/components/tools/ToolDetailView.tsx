"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Share2,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";
import ToolDirectoryCard, {
  type DirectoryTool,
} from "@/components/tools/ToolDirectoryCard";
import ToolRatingSection from "@/components/tools/ToolRatingSection";
import ToolRelatedContent from "@/components/linking/ToolRelatedContent";
import ToolDiscoveryLinks from "@/components/tools/ToolDiscoveryLinks";
import CommentSection from "@/components/comments/CommentSection";
import type { BatchRatingsMap } from "@/lib/toolRatingsApi";
import { ratingKey } from "@/lib/toolRatingsApi";
import type { LinkedNews, LinkedPrompt } from "@/lib/linkingApi";
import type { ToolIntelligence } from "@/lib/types";
import { buildFallbackIntelligence } from "@/lib/toolIntelligenceFallback";
import { trackOutboundLink } from "@/lib/analytics";
import ToolIntelligencePanel from "@/components/tools/ToolIntelligencePanel";

type SimilarToolLink = {
  title: string;
  slug: string;
  image?: string;
  href: string;
};

type RelatedData = {
  news?: LinkedNews[];
  prompts?: LinkedPrompt[];
  similarTools?: SimilarToolLink[];
  alternativePage?: {
    slug: string;
    title: string;
    summary?: string;
    href: string;
  } | null;
  comparisons?: { title: string; href: string }[];
  collections?: { title: string; href: string }[];
  deals?: { title: string; discountText?: string; href: string }[];
};

type ToolData = {
  title: string;
  slug: string;
  description?: string;
  image?: string;
  launchUrl?: string;
  url?: string;
  benefits?: string[];
  editorScore?: number | null;
  editorsPick?: boolean;
  rank?: number;
  intelligence?: ToolIntelligence;
};

type CategoryData = {
  title: string;
  slug: string;
  desc?: string;
};

type Props = {
  tool: ToolData;
  category: CategoryData;
  categorySlug: string;
  toolSlug: string;
  launchUrl: string;
  commentSlug: string;
  similar?: DirectoryTool[];
  similarRatings: BatchRatingsMap;
  related: RelatedData;
};

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "intelligence", label: "Intelligence" },
  { id: "ratings", label: "Ratings" },
  { id: "discuss", label: "Discuss" },
  { id: "related", label: "Related" },
] as const;

export default function ToolDetailView({
  tool,
  category,
  categorySlug,
  toolSlug,
  launchUrl,
  commentSlug,
  similar,
  similarRatings,
  related,
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const storageKey = `aiwedia_favorites_${categorySlug}`;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const list = JSON.parse(raw) as string[];
        setIsFavorite(list.includes(toolSlug));
      }
    } catch {
      /* ignore */
    }
  }, [storageKey, toolSlug]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 120);
      const offset = 160;
      for (const { id } of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  }, []);

  const toggleFavorite = () => {
    try {
      const raw = localStorage.getItem(storageKey);
      const list: string[] = raw ? JSON.parse(raw) : [];
      const next = list.includes(toolSlug)
        ? list.filter((s) => s !== toolSlug)
        : [...list, toolSlug];
      localStorage.setItem(storageKey, JSON.stringify(next));
      setIsFavorite(!isFavorite);
      toast.success(isFavorite ? "Removed from saved tools" : "Saved to your list");
    } catch {
      toast.error("Could not save");
    }
  };

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: tool.title, url });
        return;
      } catch {
        /* fall through */
      }
    }
    await navigator.clipboard.writeText(url);
    toast.success("Link copied!");
  };

  const hasHeroImage = Boolean(tool.image?.trim());
  const intelligence =
    tool.intelligence ?? buildFallbackIntelligence(tool);
  const initials = tool.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative min-h-screen bg-white text-slate-900">
      {/* Sticky mini bar */}
      <div
        className={`fixed left-0 right-0 top-[var(--header-offset,0px)] z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "translate-y-0 opacity-100 shadow-sm"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <p className="truncate text-sm font-bold text-slate-900">{tool.title}</p>
          <a
            href={launchUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundLink(launchUrl, tool.title)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-xs font-bold text-white hover:bg-violet-500"
          >
            Visit
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-slate-200">
        {hasHeroImage ? (
          <div className="absolute inset-0">
            <Image
              src={tool.image!}
              alt=""
              fill
              className="object-cover opacity-30 blur-sm scale-105"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-white/90 to-white" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-white to-indigo-50" />
        )}

        <div className="relative mx-auto max-w-5xl px-4 pb-8 pt-8 sm:px-6 sm:pb-12 sm:pt-10">
          <Link
            href={`/category/${category.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-600 backdrop-blur transition hover:border-violet-200 hover:text-violet-700"
          >
            <ArrowLeft size={16} />
            {category.title}
          </Link>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl ring-1 ring-slate-200 sm:mx-0 sm:h-32 sm:w-32">
                {hasHeroImage ? (
                  <Image
                    src={tool.image!}
                    alt={tool.title}
                    fill
                    className="object-cover"
                    sizes="128px"
                    priority
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-600 text-3xl font-black text-white">
                    {initials}
                  </span>
                )}
              </div>

              <div className="text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <span className="rounded-full bg-violet-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    {category.title}
                  </span>
                  {tool.editorsPick && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold text-amber-950">
                      <Sparkles size={10} />
                      Editor&apos;s pick
                    </span>
                  )}
                  {tool.rank != null && tool.rank > 0 && tool.rank <= 10 && (
                    <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-bold text-white">
                      Top #{tool.rank}
                    </span>
                  )}
                </div>

                <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  {tool.title}
                </h1>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  {intelligence.popularityScore > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/90 px-3 py-1.5 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-slate-200">
                      <BarChart3 size={15} className="text-violet-500" />
                      {intelligence.popularityScore}/100 Popularity
                    </span>
                  )}
                  {tool.editorScore != null && tool.editorScore > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/90 px-3 py-1.5 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-slate-200">
                      <Star size={16} className="fill-amber-400 text-amber-500" />
                      {tool.editorScore}/10 Editor score
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/90 px-3 py-1.5 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
                    <Zap size={15} className="text-violet-500" />
                    Verified listing
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
              <button
                type="button"
                onClick={toggleFavorite}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  isFavorite
                    ? "border-amber-300 bg-amber-50 text-amber-800"
                    : "border-slate-200 bg-white text-slate-700 hover:border-violet-200"
                }`}
              >
                <Bookmark
                  size={16}
                  className={isFavorite ? "fill-amber-400 text-amber-500" : ""}
                />
                {isFavorite ? "Saved" : "Save"}
              </button>
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Share2 size={16} />
                Share
              </button>
              <a
                href={launchUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOutboundLink(launchUrl, tool.title)}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-500 hover:shadow-xl"
              >
                Visit {tool.title.split(" ")[0]}
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section nav */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 py-2 scrollbar-none sm:px-6">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeSection === id
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <ToolDiscoveryLinks
          toolTitle={tool.title}
          links={{
            alternativePage: related.alternativePage,
            comparisons: related.comparisons,
            collections: related.collections,
            deals: related.deals,
          }}
        />

        {/* Overview */}
        <section id="overview" className="scroll-mt-28">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-gradient-to-r from-violet-50/50 to-white px-6 py-5 sm:px-8">
              <h2 className="text-lg font-black text-slate-900">About this tool</h2>
              <p className="mt-1 text-sm text-slate-500">
                What {tool.title} does and why it matters
              </p>
            </div>
            <div className="px-6 py-6 sm:px-8">
              <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
                {tool.description}
              </p>

              {tool.benefits && tool.benefits.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Key benefits
                  </h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {tool.benefits.map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-700"
                      >
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-violet-500"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={launchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundLink(launchUrl, tool.title)}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white hover:bg-violet-500"
                >
                  Open official website
                  <ExternalLink size={16} />
                </a>
                <Link
                  href={`/category/${category.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  More {category.title}
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* AIWedia Intelligence */}
        <section className="mt-10">
          <ToolIntelligencePanel toolTitle={tool.title} intelligence={intelligence} />
        </section>

        {/* Ratings */}
        <section id="ratings" className="mt-10 scroll-mt-28">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <ToolRatingSection categorySlug={categorySlug} toolSlug={toolSlug} />
          </div>
        </section>

        {/* Discuss */}
        <section id="discuss" className="mt-10 scroll-mt-28">
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare size={20} className="text-violet-600" />
            <h2 className="text-xl font-bold text-slate-900">Community discussion</h2>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <CommentSection contentSlug={commentSlug} contentType="tool" />
          </div>
        </section>

        {/* Related */}
        <section id="related" className="mt-10 scroll-mt-28">
          <ToolRelatedContent
            news={related.news || []}
            prompts={related.prompts || []}
            similarTools={related.similarTools || []}
          />

          {similar && similar.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-slate-900">Similar tools</h2>
              <p className="mt-1 text-sm text-slate-500">
                More picks from {category.title}
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((t) => (
                  <ToolDirectoryCard
                    key={t.slug}
                    tool={t}
                    communityRating={
                      similarRatings[ratingKey(t.categorySlug, t.slug)]
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur-md sm:hidden">
        <a
          href={launchUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackOutboundLink(launchUrl, tool.title)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-bold text-white"
        >
          Visit {tool.title}
          <ExternalLink size={16} />
        </a>
      </div>
      <div className="h-20 sm:hidden" aria-hidden />
    </div>
  );
}
