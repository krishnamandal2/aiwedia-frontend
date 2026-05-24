"use client";

import { useCallback, useEffect, useState } from "react";
import { Mail, LogOut, User, Bookmark, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getFavorites, syncFavorites } from "@/lib/toolsApi";
import {
  favoriteDisplayTitle,
  normalizeFavoritesList,
  slugFromFavoriteEntry,
  type FavoriteItem,
} from "@/lib/favorites";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email?: string } | null>(
    null
  );
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [syncing, setSyncing] = useState(false);

  const loadFavorites = useCallback(async (token: string) => {
    const remote = await getFavorites(token);
    const normalized = normalizeFavoritesList(remote?.favorites);
    if (normalized.length) {
      setFavorites(normalized);
      return;
    }
    const local = localStorage.getItem("aiwedia_favorites_sync");
    if (local) {
      try {
        setFavorites(normalizeFavoritesList(JSON.parse(local)));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  const mergeLocalFavorites = useCallback(async (token: string) => {
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith("aiwedia_favorites_")
    );
    const merged: FavoriteItem[] = [];
    for (const key of keys) {
      const categorySlug = key.replace("aiwedia_favorites_", "");
      try {
        const slugs = JSON.parse(localStorage.getItem(key) || "[]") as unknown[];
        slugs.forEach((entry) => {
          const toolSlug = slugFromFavoriteEntry(entry);
          if (toolSlug) merged.push({ categorySlug, toolSlug });
        });
      } catch {
        /* skip */
      }
    }
    if (merged.length) {
      setSyncing(true);
      await syncFavorites(token, merged);
      localStorage.setItem("aiwedia_favorites_sync", JSON.stringify(merged));
      setFavorites(normalizeFavoritesList(merged));
      setSyncing(false);
    }
  }, []);

  useEffect(() => {
    const u = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!u || !token) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(u));
    loadFavorites(token).then(() => mergeLocalFavorites(token));
  }, [router, loadFavorites, mergeLocalFavorites]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Hi, {user.name}
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Your account and saved tools
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
            <User size={16} className="text-slate-500" />
            <span className="text-sm font-medium text-slate-700">
              {user.name}
            </span>
          </div>
          {user.email && (
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
              <Mail size={16} className="text-slate-500" />
              <span className="text-sm text-slate-700 truncate">
                {user.email}
              </span>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <Bookmark size={16} className="text-amber-500" />
            Saved tools
            {syncing && (
              <span className="text-xs font-normal text-slate-400">
                syncing…
              </span>
            )}
          </h2>
          {favorites.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">
              Save tools from any AI category page — they&apos;ll appear here when
              you&apos;re logged in.
            </p>
          ) : (
            <ul className="mt-3 max-h-48 space-y-2 overflow-y-auto">
              {favorites.map((f, i) => (
                <li key={`${f.categorySlug}-${f.toolSlug}-${i}`}>
                  <Link
                    href={`/tool/${encodeURIComponent(f.categorySlug)}/${encodeURIComponent(f.toolSlug)}`}
                    className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-violet-50"
                  >
                    <span className="font-medium text-slate-800">
                      {favoriteDisplayTitle(f)}
                    </span>
                    <ExternalLink size={14} className="text-slate-400" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-slate-600 text-white py-3 rounded-2xl font-bold hover:bg-slate-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
