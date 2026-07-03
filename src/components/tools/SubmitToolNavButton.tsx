"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Sparkles } from "lucide-react";

type Props = {
  compact?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function SubmitToolNavButton({
  compact = false,
  className = "",
  onClick,
}: Props) {
  const pathname = usePathname();
  const active = pathname === "/suggest-tool";

  return (
    <Link
      href="/suggest-tool"
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-xl font-bold text-white shadow-md transition hover:shadow-lg hover:brightness-105 ${
        compact ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm"
      } ${
        active
          ? "ring-2 ring-violet-300 ring-offset-2"
          : ""
      } ${className}`}
      style={{
        background:
          "linear-gradient(135deg, #7c3aed 0%, #6366f1 45%, #8b5cf6 100%)",
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)",
        }}
      />
      <Sparkles size={compact ? 14 : 16} className="relative shrink-0" />
      <span className="relative whitespace-nowrap">
        {compact ? "Submit tool" : "Submit AI Tool"}
      </span>
      <Plus size={compact ? 14 : 15} className="relative shrink-0 opacity-90" />
    </Link>
  );
}
