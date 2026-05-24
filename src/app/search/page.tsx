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
} from "lucide-react";
import { theme } from "@/lib/siteTheme";
import { clientApi } from "@/lib/api-client";

type ResultType =
  | "tool"
  | "category"
  | "blog"
  | "free_tool"
  | "guide"
  | "comparison";

interface SearchResultItem {
  type: ResultType;
  slug: string;
  title: string;
  subtitle?: string;
  categorySlug?: string;
  categoryTitle?: string;
  image?: string;
}

const TYPE_META: Record<
  ResultType,
  { label: string; icon: typeof Bot; href: (i: SearchResultItem) => string }
> = {
  category: {
    label: "Category",
    icon: FolderOpen,
    href: (i) => `/category/${i.slug}`,
  },
  tool: {
    label: "AI Tool",
    icon: Bot,
    href: (i) =>
      i.categorySlug
        ? `/tool/${i.categorySlug}/${i.slug}`
        : `/category/${i.categorySlug}`,
  },
  blog: {
    label: "Blog",
    icon: FileText,
    href: (i) => `/blog/${i.slug}`,
  },
  free_tool: {
    label: "Free tool",
    icon: Download,
    href: (i) => `/tools/${i.slug}`,
  },
  guide: {
    label: "Best guide",
    icon: BookOpen,
    href: (i) => `/best/${i.slug}`,
  },
  comparison: {
    label: "Comparison",
    icon: GitCompare,
    href: (i) => `/compare/${i.slug}`,
  },
};

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    clientApi
      .search(q)
      .then((data) => setResults(Array.isArray(data) ? (data as SearchResultItem[]) : []))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [q]);

  const grouped = results.reduce(
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
              Search results
            </h1>
            {q && (
              <p className="text-sm text-slate-500">
                for &ldquo;<span className="font-medium text-slate-800">{q}</span>
                &rdquo;
              </p>
            )}
          </div>
        </div>

        {!q && (
          <p className="text-slate-500">Enter a query in the header search box.</p>
        )}

        {loading && (
          <p className="flex items-center gap-2 text-slate-500">
            <Loader2 size={18} className="animate-spin" />
            Searching…
          </p>
        )}

        {!loading && q && results.length === 0 && (
          <p className="text-slate-500">No results found. Try different keywords.</p>
        )}

        {!loading &&
          (Object.keys(TYPE_META) as ResultType[]).map((type) => {
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
                        className={`block rounded-xl border border-slate-200 px-4 py-3 transition hover:border-violet-300 hover:bg-violet-50/50 ${theme.card}`}
                      >
                        <span className="font-semibold text-slate-900">
                          {item.title}
                        </span>
                        {item.subtitle && (
                          <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">
                            {item.subtitle}
                          </p>
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
