import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Zap, Newspaper, Download, Gamepad2, FileText } from "lucide-react";
import { WEB_SPOTLIGHT, webCategoryEmoji } from "@/lib/megaMenuUtils";

type WebCategory = {
  slug: string;
  title: string;
  desc: string;
  image: string;
};

const HELPFUL_PATHS = [
  {
    href: "/ai-news",
    title: "AI News Live",
    desc: "AI, technology & startup news from RSS",
    icon: Newspaper,
    accent: "from-violet-600 to-red-600",
  },
  {
    href: "/tools",
    title: "Free download hub",
    desc: "TikTok, Reels, YouTube, PDF tools",
    icon: Download,
    accent: "from-emerald-600 to-teal-600",
  },
  {
    href: "/category/online-games",
    title: "Browser games",
    desc: "Play instantly — no install",
    icon: Gamepad2,
    accent: "from-cyan-600 to-blue-600",
  },
  {
    href: "/category/pdf-and-document-tools",
    title: "PDF & documents",
    desc: "Merge, split, compress, convert",
    icon: FileText,
    accent: "from-slate-700 to-slate-900",
  },
];

const FALLBACK_IMAGE =
  "https://res.cloudinary.com/dj3vrogpl/image/upload/v1768645475/aitools_wn5tnv.jpg";

export default function WebUtilitySection({
  categories,
}: {
  categories: WebCategory[];
}) {
  if (!categories.length) return null;

  return (
    <section
      id="web-categories"
      className="scroll-mt-24 bg-gradient-to-b from-slate-50/90 via-white to-white py-12 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Globe size={14} className="text-slate-600" aria-hidden />
              Web & utilities
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Web & Utility Categories
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
              Games, PDF tools, downloads, and everyday sites — pick a path below.
              No filters, just what people search for most.
            </p>
          </div>
          <Link
            href="/web-directory"
            className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:self-auto"
          >
            Full web hub
            <ArrowRight size={16} />
          </Link>
        </div>

        <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700">
          <Zap size={12} aria-hidden />
          Popular right now
        </p>
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {WEB_SPOTLIGHT.map((pick) => (
            <Link
              key={pick.href}
              href={pick.href}
              className="group flex min-h-[88px] flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md active:scale-[0.98] sm:min-h-[100px] sm:p-4"
            >
              <span className="text-2xl leading-none sm:text-3xl" aria-hidden>
                {pick.emoji}
              </span>
              <div>
                <span className="block text-sm font-bold leading-tight text-slate-900 group-hover:text-slate-700">
                  {pick.label}
                </span>
                <span className="mt-0.5 block text-[11px] font-medium text-slate-500">
                  {pick.tag}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Helpful shortcuts
        </p>
        <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HELPFUL_PATHS.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="flex min-h-[72px] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md active:bg-slate-50"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${path.accent} text-white`}
              >
                <path.icon size={20} aria-hidden />
              </div>
              <div className="min-w-0">
                <span className="block text-sm font-bold text-slate-900">{path.title}</span>
                <span className="mt-0.5 block text-xs text-slate-500 line-clamp-2">
                  {path.desc}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
          All web categories
        </p>

        <ul
          className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
        >
          {categories.map((cat) => (
            <li key={cat.slug} className="min-w-0 w-full">
              <WebCategoryTile cat={cat} />
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/web-directory"
            className="inline-flex min-h-[48px] items-center gap-2 text-sm font-bold text-slate-700 hover:underline"
          >
            Open web directory hub
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WebCategoryTile({ cat }: { cat: WebCategory }) {
  const src = cat.image?.trim() ? cat.image : FALLBACK_IMAGE;

  return (
    <Link
      href={`/category/${cat.slug}`}
      prefetch={false}
      className="group flex h-full min-h-[120px] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.99]"
    >
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-slate-100">
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 768px) 85vw, 280px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-lg bg-white/95 px-2 py-0.5 text-lg shadow-sm">
          {webCategoryEmoji(cat.slug)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <h3 className="text-sm font-bold leading-snug text-slate-900 sm:text-base">
          {cat.title}
        </h3>
        {cat.desc ? (
          <p className="mt-1 line-clamp-2 text-xs text-slate-500 sm:text-sm">{cat.desc}</p>
        ) : null}
        <span className="mt-auto pt-2 text-xs font-semibold text-slate-600 group-hover:text-slate-900">
          Explore →
        </span>
      </div>
    </Link>
  );
}
