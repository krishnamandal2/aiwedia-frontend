"use client";



import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import {

  ArrowRight,

  ArrowUpRight,

  Bot,

  ChevronLeft,

  ChevronRight,

  ExternalLink,

  Sparkles,

  Star,

  Users,

} from "lucide-react";

import type { RecentToolCard } from "@/lib/api";

import type { BatchRatingsMap } from "@/lib/toolRatingsApi";

import { ratingKey } from "@/lib/toolRatingsApi";

import { trackOutboundLink } from "@/lib/analytics";

import HomeSubmitToolBanner from "@/components/home/HomeSubmitToolBanner";



const FALLBACK_IMAGE =

  "https://res.cloudinary.com/dj3vrogpl/image/upload/v1768645475/aitools_wn5tnv.jpg";



type Props = {

  tools: RecentToolCard[];

  subtitle?: string;

  ratings: BatchRatingsMap;

};



export default function HomeRecentlyAddedInteractive({

  tools,

  subtitle,

  ratings,

}: Props) {

  const [active, setActive] = useState(0);

  const [imgError, setImgError] = useState(false);

  const pickerItemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const touchStartX = useRef<number | null>(null);



  const current = tools[active];

  const community = current

    ? ratings[ratingKey(current.categorySlug, current.slug)]

    : null;



  const selectTool = useCallback((index: number) => {

    setActive(index);

    setImgError(false);

  }, []);



  const go = useCallback(

    (dir: -1 | 1) => {

      setActive((i) => (i + dir + tools.length) % tools.length);

      setImgError(false);

    },

    [tools.length]

  );



  useEffect(() => {

    const onKey = (e: KeyboardEvent) => {

      if (e.key === "ArrowLeft") go(-1);

      if (e.key === "ArrowRight") go(1);

    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);

  }, [go]);



  useEffect(() => {

    pickerItemRefs.current[active]?.scrollIntoView({

      behavior: "smooth",

      block: "nearest",

      inline: "center",

    });

  }, [active]);



  const onPreviewTouchStart = (e: React.TouchEvent) => {

    touchStartX.current = e.touches[0]?.clientX ?? null;

  };



  const onPreviewTouchEnd = (e: React.TouchEvent) => {

    if (touchStartX.current == null) return;

    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;

    const delta = touchStartX.current - endX;

    if (Math.abs(delta) > 48) go(delta > 0 ? 1 : -1);

    touchStartX.current = null;

  };



  if (!tools.length) {

    return (

      <section className="border-y border-slate-200 bg-white py-14 sm:py-16">

        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          <HomeSubmitToolBanner />

        </div>

      </section>

    );

  }



  const launchUrl = current.launchUrl || current.href;

  const imageSrc =

    !imgError && current.image?.trim() ? current.image : FALLBACK_IMAGE;

  const progressPct = ((active + 1) / tools.length) * 100;



  return (

    <section className="relative overflow-x-clip border-y border-slate-200 bg-gradient-to-b from-slate-50 via-white to-white py-8 sm:py-14 lg:bg-white lg:py-20">

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-100/50 via-transparent to-transparent lg:from-violet-100/60 lg:via-white lg:to-white" />



      <div className="relative mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Mobile layout ── */}

        <div className="space-y-4 lg:hidden">

          <div className="flex items-start justify-between gap-3">

            <div className="min-w-0 flex-1">

              <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-600/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-700">

                <Sparkles size={11} />

                Fresh on AIWedia

              </span>

              <h2 className="mt-2 text-balance text-[1.35rem] font-black leading-tight tracking-tight text-slate-900">

                Recently added AI tools

              </h2>

              {subtitle && (

                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-slate-500">

                  {subtitle}

                </p>

              )}

            </div>

            <Link

              href="/category/ai-tools"

              className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-bold text-violet-700 shadow-sm ring-1 ring-slate-200/80 transition active:scale-95"

            >

              All

              <ArrowRight size={14} />

            </Link>

          </div>



          <div className="flex items-center gap-3">

            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200/80">

              <div

                className="h-full rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-fuchsia-500 transition-all duration-300 ease-out"

                style={{ width: `${progressPct}%` }}

              />

            </div>

            <span className="shrink-0 text-[11px] font-bold tabular-nums text-slate-500">

              {active + 1}/{tools.length}

            </span>

          </div>



          <div className="relative min-w-0">

            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-slate-50 to-transparent" />

            <ul className="flex min-w-0 gap-2 overflow-x-auto overscroll-x-contain pb-0.5 scrollbar-none [-webkit-overflow-scrolling:touch]">

              {tools.map((t, i) => {

                const isActive = i === active;

                return (

                  <li

                    key={`m-${t.categorySlug}-${t.slug}`}

                    ref={(el) => {

                      pickerItemRefs.current[i] = el;

                    }}

                    className="shrink-0"

                  >

                    <button

                      type="button"

                      onClick={() => selectTool(i)}

                      className={`flex min-h-[44px] items-center gap-2 rounded-2xl px-2.5 py-2 transition-all duration-200 ${

                        isActive

                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25"

                          : "bg-white text-slate-700 ring-1 ring-slate-200/90"

                      }`}

                      aria-label={t.title}

                      aria-current={isActive ? "true" : undefined}

                    >

                      <div

                        className={`relative h-8 w-8 shrink-0 overflow-hidden rounded-lg ${

                          isActive ? "ring-2 ring-white/40" : "ring-1 ring-slate-100"

                        }`}

                      >

                        <Image

                          src={t.image?.trim() ? t.image : FALLBACK_IMAGE}

                          alt=""

                          fill

                          className="object-cover"

                          sizes="32px"

                        />

                      </div>

                      <span className="max-w-[5.5rem] truncate text-xs font-bold">

                        {t.title}

                      </span>

                    </button>

                  </li>

                );

              })}

            </ul>

          </div>



          <div

            className="relative overflow-hidden rounded-[1.75rem] bg-white shadow-[0_12px_48px_-16px_rgba(79,70,229,0.35)] ring-1 ring-slate-200/80"

            onTouchStart={onPreviewTouchStart}

            onTouchEnd={onPreviewTouchEnd}

          >

            <div className="h-1 bg-gradient-to-r from-violet-600 via-indigo-500 to-fuchsia-500" />



            <button

              type="button"

              onClick={() => go(-1)}

              className="absolute left-3 top-[42%] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-md ring-1 ring-slate-200/80 backdrop-blur-sm transition active:scale-95"

              aria-label="Previous tool"

            >

              <ChevronLeft size={18} />

            </button>

            <button

              type="button"

              onClick={() => go(1)}

              className="absolute right-3 top-[42%] z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-md ring-1 ring-slate-200/80 backdrop-blur-sm transition active:scale-95"

              aria-label="Next tool"

            >

              <ChevronRight size={18} />

            </button>



            <div className="px-5 pb-5 pt-6">

              <div className="relative mx-auto mb-5 w-fit">

                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-violet-400/30 to-fuchsia-400/20 blur-xl" />

                <div className="relative h-[5.5rem] w-[5.5rem] overflow-hidden rounded-2xl bg-white shadow-lg ring-4 ring-white">

                  <Image

                    key={current.slug}

                    src={imageSrc}

                    alt={current.title}

                    fill

                    className="object-cover"

                    sizes="88px"

                    onError={() => setImgError(true)}

                  />

                </div>

                <span className="absolute -right-1 -top-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm">

                  New

                </span>

              </div>



              <div className="flex flex-wrap items-center justify-center gap-1.5">

                <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-bold text-violet-800">

                  {current.categoryTitle ?? "AI Tools"}

                </span>

                {current.editorsPick && (

                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">

                    Editor&apos;s pick

                  </span>

                )}

                {current.editorScore != null && current.editorScore > 0 && (

                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-700">

                    <Star size={10} className="fill-amber-400 text-amber-500" />

                    {current.editorScore}/10

                  </span>

                )}

                {community && community.count > 0 && (

                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-0.5 text-[10px] font-bold text-white">

                    <Star size={10} className="fill-amber-400 text-amber-400" />

                    {community.average}

                    <Users size={9} className="opacity-70" />

                    {community.count}

                  </span>

                )}

              </div>



              <h3

                key={`m-title-${current.slug}`}

                className="mt-3 text-center text-2xl font-black leading-tight tracking-tight text-slate-900"

              >

                {current.title}

              </h3>



              {current.description && (

                <p

                  key={`m-desc-${current.slug}`}

                  className="mt-2 line-clamp-3 text-center text-sm leading-relaxed text-slate-600"

                >

                  {current.description}

                </p>

              )}



              {current.benefits && current.benefits.length > 0 && (

                <ul className="mt-4 space-y-2">

                  {current.benefits.slice(0, 3).map((b, i) => (

                    <li

                      key={i}

                      className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700"

                    >

                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />

                      <span className="line-clamp-2">{b}</span>

                    </li>

                  ))}

                </ul>

              )}



              <div className="mt-5 grid gap-2.5">

                <a

                  href={launchUrl}

                  target="_blank"

                  rel="noopener noreferrer"

                  onClick={() => trackOutboundLink(launchUrl, current.title)}

                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition active:scale-[0.98]"

                >

                  Visit {current.title.split(" ")[0]}

                  <ExternalLink size={16} />

                </a>

                <Link

                  href={current.href}

                  className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition active:scale-[0.98]"

                >

                  Full tool page

                  <ArrowUpRight size={16} />

                </Link>

              </div>

            </div>



            <div className="flex justify-center gap-1.5 border-t border-slate-100 bg-slate-50/80 px-4 py-3">

              {tools.map((_, i) => (

                <button

                  key={i}

                  type="button"

                  onClick={() => selectTool(i)}

                  className="flex h-8 w-8 items-center justify-center"

                  aria-label={`Show tool ${i + 1}`}

                >

                  <span

                    className={`block rounded-full transition-all duration-200 ${

                      i === active ? "h-2 w-5 bg-violet-600" : "h-2 w-2 bg-slate-300"

                    }`}

                  />

                </button>

              ))}

            </div>

          </div>



          <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">

            <Bot size={13} />

            Swipe the card or tap a tool to browse

          </p>



          <HomeSubmitToolBanner />

        </div>



        {/* ── Desktop layout ── */}

        <div className="hidden lg:block">

          <div className="mb-10 flex items-end justify-between gap-6">

            <div className="min-w-0 flex-1">

              <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-violet-700">

                <Sparkles size={12} />

                Fresh on AIWedia

              </span>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900">

                Recently added AI tools

              </h2>

              {subtitle && (

                <p className="mt-2 max-w-xl text-base text-slate-600">{subtitle}</p>

              )}

            </div>

            <Link

              href="/category/ai-tools"

              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 shadow-sm transition hover:border-violet-200 hover:text-violet-700"

            >

              View all tools

              <ArrowRight size={16} />

            </Link>

          </div>



          <div className="grid grid-cols-12 gap-8">

            <div className="col-span-4 min-w-0">

              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">

                Pick a tool · {tools.length} new

              </p>

              <ul className="max-h-[520px] space-y-2 overflow-y-auto pr-1">

                {tools.map((t, i) => {

                  const isActive = i === active;

                  const r = ratings[ratingKey(t.categorySlug, t.slug)];

                  return (

                    <li

                      key={`${t.categorySlug}-${t.slug}`}

                      ref={(el) => {

                        pickerItemRefs.current[i] = el;

                      }}

                    >

                      <button

                        type="button"

                        onClick={() => selectTool(i)}

                        className={`flex w-full min-h-[44px] items-center gap-3 rounded-2xl border p-3 text-left transition ${

                          isActive

                            ? "border-violet-400 bg-violet-50 shadow-md ring-2 ring-violet-200"

                            : "border-slate-200 bg-white hover:border-violet-200 hover:bg-slate-50"

                        }`}

                      >

                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl ring-2 ring-white">

                          <Image

                            src={t.image?.trim() ? t.image : FALLBACK_IMAGE}

                            alt=""

                            fill

                            className="object-cover"

                            sizes="48px"

                          />

                        </div>

                        <div className="min-w-0 flex-1">

                          <p className="truncate text-sm font-bold text-slate-900">{t.title}</p>

                          <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-violet-600">

                            {t.categoryTitle ?? t.categorySlug.replace(/-/g, " ")}

                          </p>

                          {r && r.count > 0 && (

                            <p className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-500">

                              <Star size={9} className="fill-amber-400 text-amber-500" />

                              {r.average} ({r.count})

                            </p>

                          )}

                        </div>

                        {isActive && (

                          <span className="h-2 w-2 shrink-0 rounded-full bg-violet-500" />

                        )}

                      </button>

                    </li>

                  );

                })}

              </ul>

            </div>



            <div className="col-span-8 min-w-0">

              <div

                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl"

                onTouchStart={onPreviewTouchStart}

                onTouchEnd={onPreviewTouchEnd}

              >

                <div className="border-b border-slate-100 bg-gradient-to-br from-violet-50/80 to-white px-8 py-5">

                  <div className="flex items-center justify-between gap-2">

                    <span className="rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">

                      Latest #{active + 1}

                    </span>

                    <div className="flex items-center gap-1">

                      <button

                        type="button"

                        onClick={() => go(-1)}

                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-white hover:text-violet-700"

                        aria-label="Previous tool"

                      >

                        <ChevronLeft size={18} />

                      </button>

                      <button

                        type="button"

                        onClick={() => go(1)}

                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-white hover:text-violet-700"

                        aria-label="Next tool"

                      >

                        <ChevronRight size={18} />

                      </button>

                    </div>

                  </div>



                  <div className="mt-6 flex items-start gap-6">

                    <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                      <Image

                        key={current.slug}

                        src={imageSrc}

                        alt={current.title}

                        fill

                        className="object-cover transition-opacity duration-300"

                        sizes="128px"

                        onError={() => setImgError(true)}

                      />

                    </div>



                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-800">

                          {current.categoryTitle ?? "AI Tools"}

                        </span>

                        {current.editorsPick && (

                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">

                            Editor&apos;s pick

                          </span>

                        )}

                        {current.editorScore != null && current.editorScore > 0 && (

                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700">

                            <Star size={11} className="fill-amber-400 text-amber-500" />

                            {current.editorScore}/10

                          </span>

                        )}

                        {community && community.count > 0 && (

                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5 text-xs font-bold text-white">

                            <Star size={10} className="fill-amber-400 text-amber-400" />

                            {community.average}

                            <Users size={9} className="opacity-70" />

                            {community.count}

                          </span>

                        )}

                      </div>



                      <h3

                        key={`title-${current.slug}`}

                        className="mt-3 text-3xl font-black leading-tight text-slate-900"

                      >

                        {current.title}

                      </h3>



                      {current.description && (

                        <p

                          key={`desc-${current.slug}`}

                          className="mt-3 line-clamp-3 text-base leading-relaxed text-slate-600"

                        >

                          {current.description}

                        </p>

                      )}



                      <div className="mt-6 flex flex-wrap gap-3">

                        <a

                          href={launchUrl}

                          target="_blank"

                          rel="noopener noreferrer"

                          onClick={() => trackOutboundLink(launchUrl, current.title)}

                          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-violet-500"

                        >

                          Visit {current.title.split(" ")[0]}

                          <ExternalLink size={16} />

                        </a>

                        <Link

                          href={current.href}

                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50"

                        >

                          Full tool page

                          <ArrowUpRight size={16} />

                        </Link>

                      </div>

                    </div>

                  </div>

                </div>



                {current.benefits && current.benefits.length > 0 && (

                  <div className="border-t border-slate-100 px-8 py-5">

                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">

                      Key benefits

                    </h4>

                    <ul className="mt-3 grid grid-cols-2 gap-2">

                      {current.benefits.slice(0, 4).map((b, i) => (

                        <li

                          key={i}

                          className="flex items-start gap-2 text-sm text-slate-700"

                        >

                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />

                          {b}

                        </li>

                      ))}

                    </ul>

                  </div>

                )}



                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-8 py-4">

                  <p className="text-xs text-slate-500">

                    {active + 1} of {tools.length} recently added

                  </p>

                  <div className="flex gap-1.5">

                    {tools.map((_, i) => (

                      <button

                        key={i}

                        type="button"

                        onClick={() => selectTool(i)}

                        className="flex h-7 w-7 items-center justify-center"

                        aria-label={`Show tool ${i + 1}`}

                      >

                        <span

                          className={`block rounded-full transition-all ${

                            i === active ? "h-2 w-6 bg-violet-600" : "h-2 w-2 bg-slate-300 hover:bg-violet-300"

                          }`}

                        />

                      </button>

                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>



          <div className="mt-8">

            <HomeSubmitToolBanner />

          </div>



          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs text-slate-400">

            <Bot size={14} className="shrink-0" />

            <span>{tools.length} tools recently added · Use arrows or swipe the preview</span>

          </p>

        </div>

      </div>

    </section>

  );

}

