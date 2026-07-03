"use client";

import {
  Activity,
  BarChart3,
  Brain,
  CheckCircle2,
  Minus,
  Sparkles,
  Tag,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";
import type { ToolIntelligence } from "@/lib/types";

type Props = {
  toolTitle: string;
  intelligence: ToolIntelligence;
};

function ScoreRing({ score }: { score: number }) {
  const pct = Math.min(100, Math.max(0, score));
  const strokeClass =
    pct >= 85 ? "stroke-emerald-500" : pct >= 70 ? "stroke-violet-500" : "stroke-amber-500";
  const textClass =
    pct >= 85 ? "text-emerald-500" : pct >= 70 ? "text-violet-500" : "text-amber-500";

  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36" aria-hidden>
        <circle
          cx="18"
          cy="18"
          r="15.5"
          fill="none"
          className="stroke-slate-200"
          strokeWidth="3"
        />
        <circle
          cx="18"
          cy="18"
          r="15.5"
          fill="none"
          className={strokeClass}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${pct} 100`}
        />
      </svg>
      <div className="text-center">
        <p className={`text-2xl font-black ${textClass}`}>{score}</p>
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
          / 100
        </p>
      </div>
    </div>
  );
}

function TrendBadge({
  trend,
  label,
}: {
  trend: ToolIntelligence["trafficTrend"];
  label?: string;
}) {
  const config = {
    rising: {
      icon: TrendingUp,
      className: "bg-emerald-50 text-emerald-800 ring-emerald-200",
      text: "Rising",
    },
    stable: {
      icon: Minus,
      className: "bg-slate-100 text-slate-700 ring-slate-200",
      text: "Stable",
    },
    declining: {
      icon: TrendingDown,
      className: "bg-rose-50 text-rose-800 ring-rose-200",
      text: "Declining",
    },
  }[trend];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex flex-col gap-0.5 rounded-xl px-3 py-2 ring-1 ${config.className}`}
    >
      <span className="inline-flex items-center gap-1.5 text-xs font-bold">
        <Icon size={14} />
        {config.text}
      </span>
      {label && <span className="text-[10px] opacity-80">{label}</span>}
    </div>
  );
}

export default function ToolIntelligencePanel({ toolTitle, intelligence }: Props) {
  const {
    popularityScore,
    trafficTrend,
    trafficTrendLabel,
    aiSummary,
    features,
    pros,
    cons,
    useCases,
    pricingSnapshot,
    pricingHistory,
    source,
  } = intelligence;

  const hasFeatures = features.length > 0;
  const hasProsCons = pros.length > 0 || cons.length > 0;
  const hasUseCases = useCases.length > 0;
  const hasPricingHistory = (pricingHistory?.length ?? 0) > 0;

  return (
    <section
      id="intelligence"
      className="scroll-mt-28 overflow-hidden rounded-3xl border border-violet-200/80 bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 text-white shadow-xl"
    >
      <div className="border-b border-white/10 bg-white/5 px-6 py-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-violet-200">
              <Sparkles size={12} />
              AIWedia Intelligence
            </span>
            <h2 className="mt-2 text-xl font-black sm:text-2xl">
              Data-driven insight for {toolTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Popularity, traffic signals, pricing context, and editorial analysis —
              exclusive to AIWedia.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Popularity
              </p>
              <ScoreRing score={popularityScore} />
            </div>
            <TrendBadge trend={trafficTrend} label={trafficTrendLabel} />
          </div>
        </div>
      </div>

      <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
        {/* AI Summary */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-3 flex items-center gap-2 text-violet-200">
            <Brain size={18} />
            <h3 className="text-sm font-bold uppercase tracking-wider">AI summary</h3>
          </div>
          <p className="text-base leading-relaxed text-slate-200">{aiSummary}</p>
          {source && (
            <p className="mt-3 text-[10px] uppercase tracking-wider text-slate-500">
              Source: {source} profile
            </p>
          )}
        </div>

        {/* Metrics row */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <BarChart3 size={16} className="text-violet-300" />
            <p className="mt-2 text-xs text-slate-400">Popularity score</p>
            <p className="text-2xl font-black">{popularityScore}/100</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <Activity size={16} className="text-emerald-300" />
            <p className="mt-2 text-xs text-slate-400">Traffic trend</p>
            <p className="text-lg font-bold capitalize">{trafficTrend}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <Tag size={16} className="text-amber-300" />
            <p className="mt-2 text-xs text-slate-400">Current pricing</p>
            <p className="text-sm font-semibold leading-snug text-slate-200">
              {pricingSnapshot || "See official site"}
            </p>
          </div>
        </div>

        {/* Features */}
        {hasFeatures && (
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-violet-200">
              Features
            </h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-slate-200"
                >
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-violet-400" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pros / Cons */}
        {hasProsCons && (
          <div className="grid gap-4 lg:grid-cols-2">
            {pros.length > 0 && (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-emerald-300">
                  Pros
                </h3>
                <ul className="space-y-2">
                  {pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-emerald-50">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {cons.length > 0 && (
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-5">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-rose-300">
                  Cons
                </h3>
                <ul className="space-y-2">
                  {cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-rose-50">
                      <XCircle size={15} className="mt-0.5 shrink-0 text-rose-400" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Use cases */}
        {hasUseCases && (
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-violet-200">
              Use cases
            </h3>
            <div className="flex flex-wrap gap-2">
              {useCases.map((uc, i) => (
                <span
                  key={i}
                  className="rounded-full border border-violet-400/30 bg-violet-500/15 px-3 py-1.5 text-xs font-semibold text-violet-100"
                >
                  {uc}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pricing history */}
        {hasPricingHistory && (
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-violet-200">
              Pricing history
            </h3>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <div className="hidden grid-cols-4 gap-2 border-b border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:grid">
                <span>Date</span>
                <span>Plan</span>
                <span>Price</span>
                <span>Note</span>
              </div>
              <ul className="divide-y divide-white/10">
                {pricingHistory!.map((row, i) => (
                  <li
                    key={i}
                    className="grid gap-1 px-4 py-3 text-sm sm:grid-cols-4 sm:gap-2 sm:py-2.5"
                  >
                    <span className="font-mono text-xs text-slate-400">{row.date}</span>
                    <span className="font-semibold text-white">{row.plan}</span>
                    <span className="text-violet-200">{row.price}</span>
                    <span className="text-xs text-slate-400">{row.note || "—"}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              Historical pricing for context — always confirm current plans on the official
              website.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
