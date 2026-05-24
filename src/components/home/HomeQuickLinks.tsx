import Link from "next/link";
import {
  Bot,
  Download,
  TrendingUp,
  BookOpen,
  ArrowUpRight,
  Code,
  Search,
  GitCompare,
  Layers,
} from "lucide-react";
import { getSiteConfig } from "@/lib/api";

const ICONS: Record<string, typeof Bot> = {
  ai: Bot,
  code: Code,
  seo: Search,
  download: Download,
  trending: TrendingUp,
  blog: BookOpen,
  best: Search,
  collections: Layers,
  compare: GitCompare,
  suggest: Download,
};

const GRADIENTS = [
  "from-violet-600 to-indigo-600",
  "from-slate-700 to-violet-800",
  "from-emerald-600 to-teal-600",
  "from-fuchsia-600 to-pink-600",
  "from-blue-600 to-cyan-600",
  "from-amber-500 to-orange-600",
  "from-indigo-600 to-violet-700",
  "from-rose-500 to-pink-600",
];

type QuickLink = { href: string; label: string; desc: string; icon?: string };

export default async function HomeQuickLinks() {
  const config = await getSiteConfig();
  const links = (config.home_quick_links as QuickLink[] | undefined) ?? [];

  return (
    <section className="relative border-y border-slate-200/80 bg-slate-50/50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
              Quick access
            </p>
            <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              Jump to what you need
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-500">
            Popular destinations on AIWedia — managed from admin.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link, i) => {
            const Icon = ICONS[link.icon || "ai"] || Bot;
            const gradient = GRADIENTS[i % GRADIENTS.length];
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${gradient} p-2.5 text-white shadow-lg`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-700">
                  {link.label}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{link.desc}</p>
                <ArrowUpRight
                  size={18}
                  className="absolute right-4 top-4 text-slate-300 transition group-hover:text-violet-500"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
