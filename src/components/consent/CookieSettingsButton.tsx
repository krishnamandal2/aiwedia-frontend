"use client";

import { Settings2 } from "lucide-react";
import { openCookieSettings } from "./CookieConsentBanner";

export default function CookieSettingsButton({
  className = "",
  variant = "primary",
}: {
  className?: string;
  variant?: "primary" | "footer";
}) {
  const styles =
    variant === "footer"
      ? "text-slate-400 hover:text-white text-sm"
      : "min-h-[44px] rounded-xl border border-violet-200 bg-violet-50 px-5 py-2.5 text-sm font-bold text-violet-800 hover:bg-violet-100";

  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={`inline-flex items-center gap-2 ${styles} ${className}`}
    >
      <Settings2 size={16} aria-hidden />
      Manage cookie preferences
    </button>
  );
}
