"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  page: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function BlogPagination({
  page,
  totalPages,
  hasPrev,
  hasNext,
}: BlogPaginationProps) {
  const pages = buildPageList(page, totalPages);

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
      aria-label="Blog pagination"
    >
      {hasPrev ? (
        <Link
          href={`/blog?page=${page - 1}`}
          className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-violet-500/40 hover:text-white"
        >
          <ChevronLeft size={16} />
          Previous
        </Link>
      ) : (
        <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-xl border border-white/5 px-4 py-2 text-sm text-slate-600">
          <ChevronLeft size={16} />
          Previous
        </span>
      )}

      <div className="flex flex-wrap items-center gap-1">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-slate-500">
              …
            </span>
          ) : (
            <Link
              key={p}
              href={`/blog?page=${p}`}
              className={`min-w-[2.25rem] rounded-lg px-3 py-2 text-center text-sm font-bold transition ${
                p === page
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-900/30"
                  : "border border-white/10 text-slate-400 hover:border-violet-500/30 hover:text-white"
              }`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </Link>
          )
        )}
      </div>

      {hasNext ? (
        <Link
          href={`/blog?page=${page + 1}`}
          className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-violet-500/40 hover:text-white"
        >
          Next
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span className="inline-flex cursor-not-allowed items-center gap-1 rounded-xl border border-white/5 px-4 py-2 text-sm text-slate-600">
          Next
          <ChevronRight size={16} />
        </span>
      )}
    </nav>
  );
}

function buildPageList(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const list: (number | "...")[] = [1];
  if (current > 3) list.push("...");
  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  ) {
    list.push(i);
  }
  if (current < total - 2) list.push("...");
  list.push(total);
  return list;
}
