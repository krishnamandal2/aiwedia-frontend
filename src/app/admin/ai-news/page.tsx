"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clientApi } from "@/lib/api-client";
import { Rss, RefreshCw } from "lucide-react";

export default function AdminAiNewsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<{
    total: number;
    byCategory: { _id: string; count: number }[];
  } | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastResult, setLastResult] = useState<string>("");

  const loadStats = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/manage/ai-news/stats`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  };

  useEffect(() => {
    clientApi.admin.verify().then((r) => {
      if (!r.ok) router.push("/admin/login");
      else loadStats();
    });
  }, [router]);

  const refresh = async () => {
    setRefreshing(true);
    setLastResult("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/manage/ai-news/refresh`,
        { method: "POST", credentials: "include" }
      );
      const data = await res.json();
      setLastResult(
        res.ok
          ? `✅ ${data.totalUpserted} items upserted from RSS`
          : data.message || "Failed"
      );
      loadStats();
    } catch {
      setLastResult("Request failed");
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link href="/admin/manage" className="text-sm text-indigo-600 hover:underline">
        ← Content hub
      </Link>
      <div className="mt-4 flex items-center gap-3">
        <Rss className="text-indigo-600" />
        <h1 className="text-2xl font-bold">AI News (RSS)</h1>
      </div>
      <p className="mt-2 text-sm text-slate-500">
        Auto-fetches from 42 category-specific RSS feeds every 3 hours. Public:{" "}
        /ai-news
      </p>

      <button
        type="button"
        onClick={refresh}
        disabled={refreshing}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60"
      >
        <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
        {refreshing ? "Fetching RSS…" : "Refresh RSS now"}
      </button>

      {lastResult && (
        <p className="mt-3 text-sm text-slate-600">{lastResult}</p>
      )}

      {stats && (
        <div className="mt-10">
          <p className="text-3xl font-black text-indigo-600">{stats.total}</p>
          <p className="text-sm text-slate-500">published articles</p>

          <h2 className="mt-8 font-bold text-slate-900">By category</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {stats.byCategory.map((row) => (
              <li
                key={row._id}
                className="flex justify-between border-b py-2 text-slate-600"
              >
                <span className="capitalize">{row._id.replace(/-/g, " ")}</span>
                <span className="font-semibold">{row.count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
