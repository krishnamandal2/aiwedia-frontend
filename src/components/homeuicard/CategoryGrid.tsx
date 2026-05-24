"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import CategoryCard from "@/components/homeuicard/CategoryCard";

/* ================= TYPES ================= */

type Category = {
  slug: string;
  title: string;
  desc: string;
  image: string;
};

type CategoryGridProps = {
  initialCategories: Category[];
  total: number;
};

/* ================= COMPONENT ================= */

export default function CategoryGrid({
  initialCategories,
  total,
}: CategoryGridProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(
    initialCategories.length < total
  );

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef<boolean>(false);

  /* ================= LOAD MORE ================= */

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingRef.current) return;

    loadingRef.current = true;

    try {
      const res = await fetch(
        `/api/categories?page=${page + 1}&limit=12`
      );

      if (!res.ok) throw new Error("Failed to load categories");

      const data: { categories: Category[] } = await res.json();

      if (!data.categories.length) {
        setHasMore(false);
        return;
      }

      // ✅ DEDUPE BY SLUG (NO CLS)
      setCategories((prev) => {
        const map = new Map<string, Category>(
          prev.map((item) => [item.slug, item])
        );

        data.categories.forEach((item) => {
          map.set(item.slug, item);
        });

        return Array.from(map.values());
      });

      setPage((p) => p + 1);

      if (categories.length + data.categories.length >= total) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Load more failed:", err);
    } finally {
      loadingRef.current = false;
    }
  }, [page, hasMore, total, categories.length]);

  /* ================= OBSERVER ================= */

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0,
      }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [loadMore]);

  /* ================= RENDER ================= */

  return (
    <>
      <ul
        className="grid list-none grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-7"
        role="list"
      >
        {categories.map((cat) => (
          <li key={cat.slug} className="min-w-0">
            <CategoryCard
              image={cat.image}
              title={cat.title}
              description={cat.desc}
              slug={cat.slug}
              variant="web"
            />
          </li>
        ))}
      </ul>

      {/* CLS-SAFE LOADER */}
      <div
        ref={loadMoreRef}
         className="py-4 flex items-center justify-center text-sm text-slate-500"
      >
        {hasMore && "Loading more…"}
      </div>
    </>
  );
}
