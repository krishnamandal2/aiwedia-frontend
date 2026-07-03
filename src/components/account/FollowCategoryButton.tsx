"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Bell, BellOff } from "lucide-react";
import { toggleFollowCategory } from "@/lib/accountApi";

type Props = {
  categorySlug: string;
  categoryTitle?: string;
  className?: string;
};

export default function FollowCategoryButton({
  categorySlug,
  categoryTitle,
  className = "",
}: Props) {
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    import("@/lib/accountApi").then(({ getAccount }) => {
      getAccount(token).then((data) => {
        if (data?.followedCategories?.includes(categorySlug)) {
          setFollowing(true);
        }
      });
    });
  }, [categorySlug]);

  const toggle = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Sign in to follow categories");
      return;
    }
    setLoading(true);
    const result = await toggleFollowCategory(token, categorySlug);
    if (result) {
      setFollowing(result.following);
      toast.success(
        result.following
          ? `Following ${categoryTitle || categorySlug}`
          : "Unfollowed category"
      );
    } else {
      toast.error("Could not update follow");
    }
    setLoading(false);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition disabled:opacity-60 ${
        following
          ? "border-violet-300 bg-violet-50 text-violet-800"
          : "border-slate-200 bg-white text-slate-700 hover:border-violet-200"
      } ${className}`}
    >
      {following ? <Bell size={16} /> : <BellOff size={16} />}
      {following ? "Following" : "Follow category"}
    </button>
  );
}
