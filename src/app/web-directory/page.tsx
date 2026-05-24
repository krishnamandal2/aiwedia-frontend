import Link from "next/link";
import { ArrowRight, Download, FileText, Gamepad2, Globe, TrendingUp } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { WEB_SPOTLIGHT } from "@/lib/megaMenuUtils";

export const revalidate = 3600;

export const metadata = buildPageMetadata({
  title: "Web & Utility Tools Directory — Games, PDF, Free Downloads",
  description:
    "Browse web utilities on AIWedia: online games, PDF tools, free social downloads, trending websites, and productivity categories. Built for search traffic in 2026.",
  path: "/web-directory",
  keywords: [
    "free download tools",
    "online games",
    "PDF tools online",
    "web utilities directory",
    "trending websites",
  ],
});

const HUB_SECTIONS = [
  {
    href: "/category/online-games",
    title: "Online & Browser Games",
    desc: "Play without installs — high engagement traffic.",
    icon: Gamepad2,
    accent: "from-cyan-600 to-blue-600",
  },
  {
    href: "/tools",
    title: "Free Download Tools",
    desc: "Instagram, TikTok, YouTube, PDF — huge search volume.",
    icon: Download,
    accent: "from-emerald-600 to-teal-600",
  },
  {
    href: "/category/pdf-and-document-tools",
    title: "PDF & Document Tools",
    desc: "Merge, split, compress, convert files online.",
    icon: FileText,
    accent: "from-slate-700 to-slate-900",
  },
  {
    href: "/top-trending-websites",
    title: "Trending Websites",
    desc: "What the world searched on Google, year by year.",
    icon: TrendingUp,
    accent: "from-orange-500 to-amber-600",
  },
  {
    href: "/category/ai-image-filters",
    title: "Image & Photo Tools",
    desc: "Filters, editors, and enhancement apps.",
    icon: Globe,
    accent: "from-pink-600 to-rose-600",
  },
  {
    href: "/#web-categories",
    title: "All web categories on home",
    desc: "Full list with emoji tiles and quick paths.",
    icon: Globe,
    accent: "from-indigo-600 to-violet-600",
  },
];

export default function WebDirectoryPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFB]">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
            AIWedia web hub
          </p>
          <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">
            Web & Utility Tools Directory
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Games, downloads, PDF suites, and trending sites — curated for everyday
            searches. No clutter: start with popular picks, then browse categories.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-800"
            >
              Back to home
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/ai-directory"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-bold text-violet-800"
            >
              AI tools hub
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <h2 className="text-lg font-bold text-slate-900">Start here</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {WEB_SPOTLIGHT.map((pick) => (
            <Link
              key={pick.href}
              href={pick.href}
              className="flex min-h-[88px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              <span className="text-2xl">{pick.emoji}</span>
              <span className="text-sm font-bold text-slate-900">{pick.label}</span>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 text-lg font-bold text-slate-900">Browse by category</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {HUB_SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-6"
            >
              <div
                className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${section.accent} p-2.5 text-white`}
              >
                <section.icon size={22} aria-hidden />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-700 sm:text-lg">
                {section.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">{section.desc}</p>
            </Link>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white sm:p-8">
          <h2 className="text-lg font-bold sm:text-xl">More traffic for AIWedia</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
            <li>Dedicated URLs for download, games, and PDF keywords.</li>
            <li>Internal links from home, blog, and AI directory hub.</li>
            <li>Pair with Best guides and Compare pages for long-tail rankings.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/best"
              className="inline-flex min-h-[44px] items-center rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-900"
            >
              Best guides
            </Link>
            <Link
              href="/blog"
              className="inline-flex min-h-[44px] items-center rounded-xl bg-violet-500 px-4 py-2 text-sm font-bold text-white hover:bg-violet-400"
            >
              Read the blog
            </Link>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Web & Utility Tools Directory",
            url: "https://aiwedia.com/web-directory",
            description:
              "Games, PDF tools, free downloads, and trending websites on AIWedia.",
            isPartOf: {
              "@type": "WebSite",
              name: "AIWedia",
              url: "https://aiwedia.com",
            },
          }),
        }}
      />
    </div>
  );
}
