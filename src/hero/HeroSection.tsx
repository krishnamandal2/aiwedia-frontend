import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Searchbar from "@/components/search/SearchBar";
import RoundStrip from "@/HeroStrip/RoundStrip";
import {
  getSiteConfig,
} from "@/lib/api";
import {
  DEFAULT_HERO_COPY,
  DEFAULT_HERO_STRIP,
  type HeroCopy,
  type HeroStripTool,
} from "@/lib/heroTypes";

export default async function HeroSection() {
  const config = await getSiteConfig();
  const fromConfig = config.hero_strip_tools as HeroStripTool[] | undefined;
  const stripTools =
    Array.isArray(fromConfig) && fromConfig.length > 0
      ? fromConfig
      : DEFAULT_HERO_STRIP;
  const copy = {
    ...DEFAULT_HERO_COPY,
    ...((config.hero_copy as Partial<HeroCopy> | undefined) ?? {}),
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-violet-50/80 via-white to-white scroll-mt-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(139,92,246,0.18),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 rounded-full bg-fuchsia-200/25 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 text-center sm:px-6 sm:pb-14 sm:pt-20 md:pt-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur sm:mb-8">
          <Sparkles size={13} className="text-violet-500" />
          <span>{copy.badge}</span>
        </div>

        <h1 className="mx-auto max-w-4xl text-balance text-[1.85rem] font-black leading-[1.15] tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
          {copy.headline}{" "}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
            {copy.headlineAccent}
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 sm:mt-5 sm:text-base md:text-lg">
          {copy.subtitle}
        </p>

        <div className="mx-auto mt-7 w-full max-w-2xl min-w-0 px-1 sm:mt-9">
          <Searchbar />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:mt-6 sm:gap-3">
          <Link
            href="/category/ai-tools"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-violet-500 sm:text-sm"
          >
            Browse AI tools
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/compare"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-violet-200 hover:text-violet-700 sm:text-sm"
          >
            Compare tools
          </Link>
          <Link
            href="/ai-news"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-violet-200 hover:text-violet-700 sm:text-sm"
          >
            AI news
          </Link>
        </div>

        <RoundStrip tools={stripTools} />
      </div>
    </section>
  );
}
