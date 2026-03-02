"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface SearchResultItem {
  type: "tool" | "category";
  slug: string;
  title: string;
  categorySlug?: string;
  categoryTitle?: string;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    setResults([]);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${encodeURIComponent(q)}`)
      .then(res => res.json())
      .then(data => setResults(data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Search results for "{q}"</h1>
      {loading && <p>Loading...</p>}
      {!loading && results.length === 0 && <p>No results found.</p>}
      {!loading && results.length > 0 && (
        <ul className="space-y-2">
          {results.map((item, idx) => (
            <li key={idx}>
              <a href={item.type === "tool" ? `/category/${item.categorySlug}` : `/category/${item.slug}`} className="text-blue-600 hover:underline">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
