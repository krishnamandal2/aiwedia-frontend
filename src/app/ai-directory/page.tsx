import Link from "next/link";
import { ArrowRight, Bot, Code, Search, Workflow } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";

export const revalidate = 3600;

export const metadata = buildPageMetadata({
  title: "AI Tools Directory Hub — Coding, SEO, Agents & Free Tools",
  description:
    "One hub for the best AI tools in 2026: coding assistants, SEO rank tools, agents, no-code builders, image AI, and free downloads. Built for Google discovery on AIWedia.",
  path: "/ai-directory",
  keywords: [
    "AI tools directory",
    "best AI tools 2026",
    "AI SEO tools",
    "AI coding tools",
    "free AI tools",
  ],
});

const HUB_SECTIONS = [
  {
    href: "/category/ai-tools",
    title: "All AI Tools",
    desc: "Master directory with filters, compare, and favorites.",
    icon: Bot,
    accent: "from-violet-600 to-indigo-600",
  },
  {
    href: "/category/ai-code-generators",
    title: "AI Coding & Vibe Coding",
    desc: "Copilot, Cursor, Bolt, Replit — ship code faster.",
    icon: Code,
    accent: "from-slate-700 to-violet-800",
  },
  {
    href: "/category/ai-seo-tools",
    title: "AI SEO & Google Rank",
    desc: "Keyword research, content scores, and SERP optimization.",
    icon: Search,
    accent: "from-emerald-600 to-teal-600",
  },
  {
    href: "/category/ai-agents-automation",
    title: "AI Agents & Automation",
    desc: "Zapier, Make, n8n, LangChain — workflow bots.",
    icon: Workflow,
    accent: "from-amber-600 to-orange-600",
  },
  {
    href: "/category/ai-no-code-builders",
    title: "No-Code AI Builders",
    desc: "Sites and apps without writing code.",
    icon: Bot,
    accent: "from-pink-600 to-rose-600",
  },
  {
    href: "/category/ai-marketing-tools",
    title: "Marketing & Social AI",
    desc: "Ads, social posts, and growth automation.",
    icon: Search,
    accent: "from-blue-600 to-cyan-600",
  },
  {
    href: "/tools",
    title: "Free Download Tools",
    desc: "Video, social, PDF utilities — high search volume.",
    icon: Bot,
    accent: "from-green-600 to-emerald-600",
  },
  {
    href: "/top-trending-websites",
    title: "Trending Websites",
    desc: "What the world searched on Google, year by year.",
    icon: Search,
    accent: "from-indigo-600 to-blue-600",
  },
];

export default function AiDirectoryPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFB]">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
            AIWedia directory hub
          </p>
          <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-5xl">
            Best AI Tools Directory — Coding, SEO & Traffic
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Explore curated categories built for developers, marketers, and
            creators. Each page is optimized for search with structured data,
            fresh tool lists, and internal links Google can crawl.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-800"
            >
              Back to home
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/web-directory"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Web & utility hub
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {HUB_SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div
                className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${section.accent} p-2.5 text-white`}
              >
                <section.icon size={22} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-violet-700">
                {section.title}
              </h2>
              <p className="mt-2 text-sm text-slate-500">{section.desc}</p>
            </Link>
          ))}
        </div>

        <section className="mt-14 rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white">
          <h2 className="text-xl font-bold">Why this helps you rank & get traffic</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-300 list-disc pl-5">
            <li>
              Dedicated URLs for high-volume keywords (AI SEO tools, vibe coding,
              agents).
            </li>
            <li>Schema.org breadcrumbs and item lists on every category page.</li>
            <li>
              Internal links from home, footer, megamenu, and this hub strengthen
              crawl paths.
            </li>
            <li>
              Trending and free-tool pages capture download and “best website”
              searches.
            </li>
          </ul>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-400"
          >
            Read guides on the blog
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "AI Tools Directory Hub",
            url: "https://aiwedia.com/ai-directory",
            description:
              "One hub for the best AI tools in 2026: coding assistants, SEO rank tools, agents, no-code builders, and free downloads.",
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
