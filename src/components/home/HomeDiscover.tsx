import Link from "next/link";
import { ArrowRight, Bot, Code, Image, Search } from "lucide-react";

const DISCOVER = [
  {
    slug: "ai-seo-tools",
    title: "AI SEO tools",
    icon: Search,
    color: "text-emerald-400 bg-emerald-500/10",
  },
  {
    slug: "ai-background-remover",
    title: "Image & BG tools",
    icon: Image,
    color: "text-pink-400 bg-pink-500/10",
  },
  {
    slug: "ai-code-generators",
    title: "Vibe coding",
    icon: Code,
    color: "text-violet-400 bg-violet-500/10",
  },
  {
    slug: "ai-tools",
    title: "All AI tools",
    icon: Bot,
    color: "text-cyan-400 bg-cyan-500/10",
  },
];

export default function HomeDiscover() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 p-8 sm:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-violet-300">
                Discover by use case
              </p>
              <h2 className="mt-2 text-2xl font-black text-white sm:text-4xl">
                Find the right category in seconds
              </h2>
              <p className="mt-3 text-slate-400">
                Use the search bar above or browse popular AI paths — SEO suites,
                code assistants, image generators, and the full directory.
              </p>
              <Link
                href="/#categories"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-violet-100"
              >
                Browse all categories
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-3 sm:max-w-md">
              {DISCOVER.map((item) => (
                <Link
                  key={item.slug}
                  href={`/category/${item.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-violet-500/40 hover:bg-white/10"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.color}`}
                  >
                    <item.icon size={20} />
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
