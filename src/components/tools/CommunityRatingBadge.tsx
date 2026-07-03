import { Star, Users } from "lucide-react";
import type { ToolRatingSummary } from "@/lib/toolRatingsApi";

type CommunityRatingBadgeProps = {
  rating?: ToolRatingSummary | null;
  size?: "sm" | "md";
  className?: string;
};

export default function CommunityRatingBadge({
  rating,
  size = "sm",
  className = "",
}: CommunityRatingBadgeProps) {
  if (!rating || rating.count < 1) return null;

  const textSize = size === "sm" ? "text-[10px]" : "text-xs";
  const iconSize = size === "sm" ? 10 : 12;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-0.5 font-bold text-white backdrop-blur ${textSize} ${className}`}
      title={`${rating.count} community rating${rating.count === 1 ? "" : "s"}`}
    >
      <Star size={iconSize} className="fill-amber-400 text-amber-400" />
      {rating.average}
      <Users size={iconSize - 2} className="opacity-70" />
      <span className="opacity-80">{rating.count}</span>
    </span>
  );
}
