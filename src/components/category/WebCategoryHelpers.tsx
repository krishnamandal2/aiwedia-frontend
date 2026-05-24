import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { WEB_SPOTLIGHT } from "@/lib/megaMenuUtils";

export default function WebCategoryHelpers({
  categorySlug,
  toolCount,
}: {
  categorySlug: string;
  toolCount: number;
}) {
  const related = WEB_SPOTLIGHT.filter((p) => !p.href.includes(categorySlug)).slice(
    0,
    4
  );

  return (
    <div className="space-y-3 border-t border-slate-100 pt-4">
      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700">
        <Zap size={12} aria-hidden />
        Quick picks — no filters needed
      </p>
      <p className="text-xs text-slate-500">
        {toolCount > 0
          ? `${toolCount} tools below, sorted by popularity. Or jump to a high-traffic hub:`
          : "Explore popular web hubs while we add more tools here:"}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {related.map((pick) => (
          <Link
            key={pick.href}
            href={pick.href}
            className="flex min-h-[64px] flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 text-left transition hover:border-slate-300 hover:bg-white active:scale-[0.98]"
          >
            <span className="text-lg" aria-hidden>
              {pick.emoji}
            </span>
            <span className="text-xs font-bold text-slate-800">{pick.label}</span>
          </Link>
        ))}
      </div>
      <Link
        href="/web-directory"
        className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-violet-600 hover:underline"
      >
        Web & utility directory
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
