import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GitCompare,
  Layers,
  Mail,
  Newspaper,
  PenLine,
  Sparkles,
  Trophy,
  Bot,
} from "lucide-react";

const FEATURES = [
  {
    href: "/ai-directory",
    title: "AI Tool Directory",
    desc: "1,200+ AI tools across coding, SEO, agents, image AI, and more.",
    icon: Bot,
    accent: "from-violet-600 to-indigo-600",
  },
  {
    href: "/prompts",
    title: "AI Prompt Library",
    desc: "Copy-ready prompts for ChatGPT, Claude, Midjourney, and SEO.",
    icon: Sparkles,
    accent: "from-fuchsia-600 to-pink-600",
  },
  {
    href: "/newsletter",
    title: "Newsletter",
    desc: "Weekly digest — tools, news, prompts, and guides in your inbox.",
    icon: Mail,
    accent: "from-indigo-600 to-blue-600",
  },
  {
    href: "/ai-news",
    title: "AI News Live",
    desc: "RSS feed — AI, tech, startups & research updated every 3 hours.",
    icon: Newspaper,
    accent: "from-red-600 to-violet-600",
  },
  {
    href: "/best",
    title: "Best-of guides",
    desc: "Ranked lists Google loves — “best AI SEO tools”, vibe coding, and more.",
    icon: Trophy,
    accent: "from-amber-500 to-orange-600",
  },
  {
    href: "/compare",
    title: "Compare tools",
    desc: "Side-by-side picks so visitors pick faster (and stay on AIWedia).",
    icon: GitCompare,
    accent: "from-violet-600 to-indigo-600",
  },
  {
    href: "/collections",
    title: "Curated stacks",
    desc: "Ready-made bundles for SEO, coding, marketing workflows.",
    icon: Layers,
    accent: "from-fuchsia-600 to-pink-600",
  },
  {
    href: "/blog",
    title: "Guides & blog",
    desc: "Long-form SEO content with comments and internal links.",
    icon: BookOpen,
    accent: "from-slate-700 to-violet-800",
  },
  {
    href: "/suggest-tool",
    title: "Suggest a tool",
    desc: "Community submissions — fresh pages and return visits.",
    icon: PenLine,
    accent: "from-blue-600 to-cyan-600",
  },
];

export default function HomeGrowthHub() {
  return (
    <section className="border-y border-slate-200/80 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
            Grow with AIWedia
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
            Features built to help you & rank on Google
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Compare, discover trends, read guides, and explore stacks — more pages
            for search engines and more reasons for users to stay.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex min-h-[120px] flex-col rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition hover:-translate-y-0.5 hover:border-violet-200 hover:bg-white hover:shadow-lg active:scale-[0.99] sm:min-h-[140px]"
            >
              <div
                className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-white shadow-md`}
              >
                <item.icon size={22} aria-hidden />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-800 sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                {item.desc}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-violet-600">
                Open
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
