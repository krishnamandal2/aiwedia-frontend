"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Bot,
  FolderOpen,
  FileText,
  Download,
  Loader2,
  BookOpen,
  GitCompare,
  Sparkles,
  Newspaper,
  Star,
} from "lucide-react";
import { theme } from "@/lib/siteTheme";
import { clientApi } from "@/lib/api-client";

type ResultType =
  | "tool"
  | "category"
  | "blog"
  | "free_tool"
  | "guide"
  | "comparison"
  | "prompt"
  | "ai_news";

interface SearchResultItem {
  type: ResultType;
  slug: string;
  title: string;
  subtitle?: string;
  categorySlug?: string;
  categoryTitle?: string;
  image?: string;
  score?: number;
}

const TYPE_META: Record<
  ResultType,
  { label: string; icon: typeof Bot; href: (i: SearchResultItem) => string }
> = {
  category: {
    label: "Categories",
    icon: FolderOpen,
    href: (i) => `/category/${i.slug}`,
  },
  tool: {
    label: "AI Tools",
    icon: Bot,
    href: (i) =>
      i.categorySlug
        ? `/tool/${i.categorySlug}/${i.slug}`
        : `/category/ai-tools`,
  },
  ai_news: {
    label: "AI News",
    icon: Newspaper,
    href: (i) => `/ai-news/${i.slug}`,
  },
  prompt: {
    label: "Prompts",
    icon: Sparkles,
    href: (i) => `/prompts/${i.slug}`,
  },
  blog: {
    label: "Blog",
    icon: FileText,
    href: (i) => `/blog/${i.slug}`,
  },
  guide: {
    label: "Best guides",
    icon: BookOpen,
    href: (i) => `/best/${i.slug}`,
  },
  comparison: {
    label: "Comparisons",
    icon: GitCompare,
    href: (i) => `/compare/${i.slug}`,
  },
  free_tool: {
    label: "Free tools",
    icon: Download,
    href: (i) => `/tools/${i.slug}`,
  },
};

const FILTER_OPTIONS: { id: "all" | ResultType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "tool", label: "Tools" },
  { id: "ai_news", label: "News" },
  { id: "prompt", label: "Prompts" },
  { id: "category", label: "Categories" },
  { id: "blog", label: "Blog" },
  { id: "guide", label: "Guides" },
];

const DISPLAY_ORDER: ResultType[] = [
  "tool",
  "ai_news",
  "prompt",
  "category",
  "blog",
  "guide",
  "comparison",
  "free_tool",
];

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | ResultType>("all");

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    clientApi
      .search(q)
      .then((data) =>
        setResults(Array.isArray(data) ? (data as SearchResultItem[]) : [])
      )
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [q]);

  const filtered =
    filter === "all" ? results : results.filter((r) => r.type === filter);

  const grouped = filtered.reduce(
    (acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    },
    {} as Record<ResultType, SearchResultItem[]>
  );

  return (
    <div className={theme.page}>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-violet-100 p-2.5 text-violet-700">
            <Search size={22} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 sm:text-2xl">
              Search AIWedia
            </h1>
            {q && (
              <p className="text-sm text-slate-500">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} for{" "}
                <span className="font-medium text-slate-800">&ldquo;{q}&rdquo;</span>
              </p>
            )}
          </div>
        </div>

        {!q && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-slate-600">
              Search tools, AI news, prompts, guides, and categories from the header.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-semibold text-violet-700">
              <Link href="/ai-directory">AI Directory</Link>
              <span className="text-slate-300">·</span>
              <Link href="/ai-news">AI News</Link>
              <span className="text-slate-300">·</span>
              <Link href="/prompts">Prompts</Link>
              <span className="text-slate-300">·</span>
              <Link href="/stacks">AI Stacks</Link>
            </div>
          </div>
        )}

        {q && !loading && results.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((opt) => {
              const count =
                opt.id === "all"
                  ? results.length
                  : results.filter((r) => r.type === opt.id).length;
              if (opt.id !== "all" && count === 0) return null;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFilter(opt.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    filter === opt.id ? theme.chipActive : theme.chipIdle
                  }`}
                >
                  {opt.label}
                  <span className="ml-1 opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        )}

        {loading && (
          <p className="flex items-center gap-2 text-slate-500">
            <Loader2 size={18} className="animate-spin" />
            Searching…
          </p>
        )}

        {!loading && q && filtered.length === 0 && (
          <p className="text-slate-500">No results found. Try different keywords.</p>
        )}

        {!loading &&
          DISPLAY_ORDER.map((type) => {
            const items = grouped[type];
            if (!items?.length) return null;
            const meta = TYPE_META[type];
            const Icon = meta.icon;
            return (
              <section key={type} className="mb-8">
                <h2 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Icon size={14} />
                  {meta.label} ({items.length})
                </h2>
                <ul className="space-y-2">
                  {items.map((item, idx) => (
                    <li key={`${type}-${idx}`}>
                      <Link
                        href={meta.href(item)}
                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-violet-300 hover:bg-violet-50/50"
                      >
                        <div className="min-w-0">
                          <span className="font-semibold text-slate-900">
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                        {item.score != null && item.score > 0 && (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-800">
                            <Star size={12} className="fill-amber-400 text-amber-500" />
                            {item.score}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-slate-500">
          Loading…
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
