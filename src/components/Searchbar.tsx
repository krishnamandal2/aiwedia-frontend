"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Globe, LayoutGrid, Loader2, X } from "lucide-react";

interface SearchResultItem {
  type: "tool" | "category";
  slug: string;
  title: string;
  categorySlug?: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Fetch results with debounce
  const fetchResults = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error(`API Error ${res.status}`);
      const data: SearchResultItem[] = await res.json();
      setResults(data || []);

      if (!data || data.length === 0) {
        setNotFoundMessage(`No results for "${q}"`);
        setTimeout(() => setNotFoundMessage(null), 3000);
      }
    } catch (err) {
      console.error(err);
      setNotFoundMessage("Error fetching results");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchResults(query), 300);
    return () => clearTimeout(timer);
  }, [query, fetchResults]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: SearchResultItem) => {
    setQuery("");
    setResults([]);
    setIsFocused(false);
    setSelectedIndex(-1);

    if (item.type === "tool" && item.categorySlug) router.push(`/category/${item.categorySlug}`);
    else router.push(`/category/${item.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) handleSelect(results[selectedIndex]);
      else if (query.trim()) router.push(`/search?q=${encodeURIComponent(query)}`);
    } else if (e.key === "Escape") {
      setIsFocused(false);
      setSelectedIndex(-1);
    }
  };

  const highlightQuery = (text: string) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          value={query}
          onFocus={() => setIsFocused(true)}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search tools or categories..."
          className="w-full h-12 pl-12 pr-12 rounded-xl border outline-none"
        />
        <Search className="absolute left-4 top-3 text-gray-400" />
        {query && <X className="absolute right-4 top-3 cursor-pointer" onClick={() => setQuery("")} />}
      </div>

      {notFoundMessage && (
        <div className="mt-2 p-2 text-red-600 text-sm">{notFoundMessage}</div>
      )}

      {isFocused && (loading || results.length > 0) && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
          {loading && (
            <div className="p-4 text-gray-500 flex items-center gap-2">
              <Loader2 className="animate-spin" /> Searching...
            </div>
          )}
          {!loading && results.length === 0 && (
            <div className="p-4 text-gray-500 text-sm text-center">No results</div>
          )}
          {!loading && results.length > 0 && (
            <ul>
              {results.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className={`p-3 cursor-pointer hover:bg-indigo-50 flex items-center gap-2 ${
                    selectedIndex === idx ? "bg-indigo-100" : ""
                  }`}
                >
                  {item.type === "tool" ? <Globe /> : <LayoutGrid />}
                  <span
                    className="truncate"
                    dangerouslySetInnerHTML={{ __html: highlightQuery(item.title) }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
