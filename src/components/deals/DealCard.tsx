import Link from "next/link";
import { ArrowUpRight, ExternalLink, Tag } from "lucide-react";
import type { AiDeal } from "@/lib/dealsApi";

export default function DealCard({ deal }: { deal: AiDeal }) {
  const toolHref =
    deal.categorySlug && deal.toolSlug
      ? `/tool/${deal.categorySlug}/${deal.toolSlug}`
      : null;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">
          <Tag size={12} />
          {deal.discountText || "Deal"}
        </span>
        {deal.featured && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-800">
            Featured
          </span>
        )}
      </div>

      <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-violet-700">
        {deal.title}
      </h3>
      {deal.toolName && (
        <p className="mt-1 text-sm font-medium text-violet-600">{deal.toolName}</p>
      )}
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {deal.description}
      </p>

      {deal.promoCode && (
        <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700">
          Code: <strong>{deal.promoCode}</strong>
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={deal.dealUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
        >
          Get deal
          <ExternalLink size={14} />
        </a>
        {toolHref && (
          <Link
            href={toolHref}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Tool profile
            <ArrowUpRight size={14} />
          </Link>
        )}
      </div>
    </article>
  );
}
