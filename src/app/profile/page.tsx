"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Bell,
  Bookmark,
  ExternalLink,
  LogOut,
  Sparkles,
  Star,
  User,
  Zap,
} from "lucide-react";
import { syncFavorites } from "@/lib/toolsApi";
import { getAccount, getRecommendations, type RecommendedTool } from "@/lib/accountApi";
import {
  formatSavedLabel,
  getLocalSaved,
  syncSavedRemote,
} from "@/lib/savedItems";
import {
  favoriteDisplayTitle,
  normalizeFavoritesList,
  slugFromFavoriteEntry,
  type FavoriteItem,
} from "@/lib/favorites";

type Tab = "overview" | "tools" | "prompts" | "categories" | "reviews";

const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "overview", label: "Overview", icon: User },
  { id: "tools", label: "Saved tools", icon: Bookmark },
  { id: "prompts", label: "Prompts & news", icon: Sparkles },
  { id: "categories", label: "Following", icon: Bell },
  { id: "reviews", label: "My reviews", icon: Star },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email?: string } | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);
  const [savedNews, setSavedNews] = useState<string[]>([]);
  const [followedCategories, setFollowedCategories] = useState<string[]>([]);
  const [reviews, setReviews] = useState<
    { categorySlug: string; toolSlug: string; rating: number }[]
  >([]);
  const [recommendations, setRecommendations] = useState<RecommendedTool[]>([]);
  const [syncing, setSyncing] = useState(false);

  const loadAll = useCallback(async (token: string) => {
    setSyncing(true);
    const account = await getAccount(token);
    if (account) {
      setFavorites(normalizeFavoritesList(account.favorites));
      setSavedPrompts(account.savedPrompts || []);
      setSavedNews(account.savedNews || []);
      setFollowedCategories(account.followedCategories || []);
      setReviews(account.reviews || []);
    }
    const rec = await getRecommendations(token);
    setRecommendations(rec.tools || []);
    setSyncing(false);
  }, []);

  const mergeLocal = useCallback(async (token: string) => {
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
    if (merged.length) await syncFavorites(token, merged);

    const localPrompts = getLocalSaved("prompt");
    const localNews = getLocalSaved("news");
    if (localPrompts.length || localNews.length) {
      await syncSavedRemote(token, { prompts: localPrompts, news: localNews });
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
    mergeLocal(token).then(() => loadAll(token));
  }, [router, mergeLocal, loadAll]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl font-black text-white shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">{user.name}</h1>
              <p className="text-sm text-slate-500">{user.email}</p>
              {syncing && (
                <p className="text-xs text-violet-500">Syncing your data…</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 sm:self-center"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === id
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Saved tools", value: favorites.length, icon: Bookmark },
                  { label: "Prompts", value: savedPrompts.length, icon: Sparkles },
                  { label: "Following", value: followedCategories.length, icon: Bell },
                  { label: "Reviews", value: reviews.length, icon: Star },
                ].map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <Icon size={20} className="text-violet-600" />
                    <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
                    <p className="text-xs font-medium text-slate-500">{label}</p>
                  </div>
                ))}
              </div>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <Zap size={20} className="text-amber-500" />
                  Recommended for you
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Based on saved tools and categories you follow
                </p>
                {recommendations.length === 0 ? (
                  <p className="mt-4 text-sm text-slate-500">
                    Follow categories or save tools to get personalized picks.
                  </p>
                ) : (
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {recommendations.slice(0, 6).map((t) => (
                      <li key={`${t.categorySlug}-${t.slug}`}>
                        <Link
                          href={t.href}
                          className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 hover:border-violet-200 hover:bg-violet-50/50"
                        >
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                            {t.image ? (
                              <Image src={t.image} alt="" fill className="object-cover" sizes="40px" />
                            ) : (
                              <span className="flex h-full items-center justify-center text-xs font-bold text-violet-400">
                                {t.title.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-slate-900">
                              {t.title}
                            </p>
                            <p className="truncate text-[10px] text-violet-600">
                              {t.categoryTitle}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          )}

          {tab === "tools" && (
            <ListSection
              empty="Save tools from any category page — they sync here when logged in."
              items={favorites.map((f, i) => ({
                key: `${f.categorySlug}-${f.toolSlug}-${i}`,
                href: `/tool/${f.categorySlug}/${f.toolSlug}`,
                label: favoriteDisplayTitle(f),
              }))}
            />
          )}

          {tab === "prompts" && (
            <div className="space-y-6">
              <ListSection
                title="Bookmarked prompts"
                empty="Save prompts from any prompt page."
                items={savedPrompts.map((slug) => ({
                  key: slug,
                  href: `/prompts/${slug}`,
                  label: formatSavedLabel(slug),
                }))}
              />
              <ListSection
                title="Saved news"
                empty="Save articles from AI News."
                items={savedNews.map((slug) => ({
                  key: slug,
                  href: `/ai-news/${slug}`,
                  label: formatSavedLabel(slug),
                }))}
              />
            </div>
          )}

          {tab === "categories" && (
            <ListSection
              empty="Follow categories from any AI category page to get recommendations."
              items={followedCategories.map((slug) => ({
                key: slug,
                href: `/category/${slug}`,
                label: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
              }))}
            />
          )}

          {tab === "reviews" && (
            <ListSection
              empty="Rate tools on their detail pages — reviews appear here when signed in."
              items={reviews.map((r) => ({
                key: `${r.categorySlug}-${r.toolSlug}`,
                href: `/tool/${r.categorySlug}/${r.toolSlug}`,
                label: `${r.toolSlug.replace(/-/g, " ")} · ${r.rating}/5 ★`,
              }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ListSection({
  title,
  empty,
  items,
}: {
  title?: string;
  empty: string;
  items: { key: string; href: string; label: string }[];
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {title && <h2 className="mb-4 text-lg font-bold text-slate-900">{title}</h2>}
      {items.length === 0 ? (
        <p className="text-sm text-slate-500">{empty}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3 text-sm font-medium text-slate-800 hover:border-violet-200 hover:bg-violet-50/50"
              >
                <span className="truncate">{item.label}</span>
                <ExternalLink size={14} className="shrink-0 text-slate-400" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
