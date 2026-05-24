"use client";

import { useState, useCallback } from "react";

export interface Category {
  title: string;
  desc?: string;
  slug: string;
  image: string;
}

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(
        `${base}/api/categories?page=${page}&limit=12`
      );
      const data = await res.json();

      if (!data?.categories?.length) {
        setHasMore(false);
      } else {
        setCategories((prev) => [...prev, ...data.categories]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  return { categories, loading, hasMore, fetchMore };
};

export default useCategories;
