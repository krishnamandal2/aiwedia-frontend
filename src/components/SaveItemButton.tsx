"use client";

import { useCallback, useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import toast from "react-hot-toast";
import {
  getLocalSaved,
  isLocallySaved,
  setLocalSaved,
  toggleLocalSaved,
  toggleSavedRemote,
  type SaveItemType,
} from "@/lib/savedItems";

type SaveItemButtonProps = {
  type: SaveItemType;
  slug: string;
  label?: string;
  className?: string;
};

export default function SaveItemButton({
  type,
  slug,
  label = "Save",
  className = "",
}: SaveItemButtonProps) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSaved(isLocallySaved(type, slug));
    const token = localStorage.getItem("token");
    if (!token) return;
    import("@/lib/savedItems").then(({ getSavedRemote }) => {
      getSavedRemote(token).then((data) => {
        const list = type === "news" ? data.news : data.prompts;
        if (list?.includes(slug)) setSaved(true);
      });
    });
  }, [type, slug]);

  const toggle = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      const result = await toggleSavedRemote(token, type, slug);
      if (result) {
        setSaved(result.saved);
        setLocalSaved("prompt", result.prompts);
        setLocalSaved("news", result.news);
        toast.success(result.saved ? "Saved to your profile" : "Removed from saves");
      } else {
        const nowSaved = toggleLocalSaved(type, slug);
        setSaved(nowSaved);
        toast.success(nowSaved ? "Saved locally" : "Removed");
      }
    } else {
      const nowSaved = toggleLocalSaved(type, slug);
      setSaved(nowSaved);
      toast.success(
        nowSaved
          ? "Saved — log in to sync across devices"
          : "Removed from saves"
      );
    }

    setLoading(false);
  }, [type, slug]);

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition disabled:opacity-60 ${
        saved
          ? "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100"
          : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:text-violet-700"
      } ${className}`}
      aria-pressed={saved}
    >
      <Bookmark
        size={16}
        className={saved ? "fill-amber-400 text-amber-500" : ""}
      />
      {saved ? "Saved" : label}
    </button>
  );
}

export function getAllLocalSavedForSync() {
  return {
    prompts: getLocalSaved("prompt"),
    news: getLocalSaved("news"),
  };
}
