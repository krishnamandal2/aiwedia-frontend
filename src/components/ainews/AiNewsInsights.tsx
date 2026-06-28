import { CheckCircle2, Lightbulb, Star } from "lucide-react";

export type AiNewsInsightsData = {
  keyTakeaways?: string[];
  whyItMatters?: string;
  aiwediaScore?: number;
  aiwediaScoreLabel?: string;
};

function scoreColor(score: number) {
  if (score >= 8.5) return "text-emerald-600";
  if (score >= 7) return "text-violet-600";
  if (score >= 6) return "text-amber-600";
  return "text-slate-600";
}

function scoreBarColor(score: number) {
  if (score >= 8.5) return "bg-emerald-500";
  if (score >= 7) return "bg-violet-500";
  if (score >= 6) return "bg-amber-500";
  return "bg-slate-400";
}

export default function AiNewsInsights({
  keyTakeaways = [],
  whyItMatters,
  aiwediaScore,
  aiwediaScoreLabel,
}: AiNewsInsightsData) {
  const takeaways = keyTakeaways.filter(Boolean);
  const score = typeof aiwediaScore === "number" ? aiwediaScore : null;
  const scorePct = score != null ? Math.min(100, (score / 10) * 100) : 0;

  if (!takeaways.length && !whyItMatters && score == null) return null;

  return (
    <div className="mt-10 space-y-6">
      {takeaways.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-sm font-black text-violet-700">
              1
            </span>
            Key Takeaways
          </h2>
          <ul className="mt-5 space-y-3">
            {takeaways.map((point, i) => (
              <li key={i} className="flex gap-3 text-base leading-relaxed text-slate-700">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-violet-500"
                  aria-hidden
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {score != null && (
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-sm font-black text-amber-800">
              2
            </span>
            <Star size={20} className="fill-amber-400 text-amber-500" aria-hidden />
            AIWedia Score
          </h2>
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className={`text-4xl font-black tabular-nums ${scoreColor(score)}`}>
                {score}
                <span className="text-xl font-bold text-slate-400">/10</span>
              </p>
              {aiwediaScoreLabel && (
                <p className="mt-2 text-sm font-medium text-slate-600">
                  {aiwediaScoreLabel}
                </p>
              )}
            </div>
            <div className="w-full sm:max-w-xs">
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full transition-all ${scoreBarColor(score)}`}
                  style={{ width: `${scorePct}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Based on source trust, recency, category impact, and story depth.
              </p>
            </div>
          </div>
        </section>
      )}

      {whyItMatters && (
        <section className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50/80 to-white p-6 shadow-sm sm:p-8">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-sm font-black text-amber-800">
              3
            </span>
            <Lightbulb size={20} className="text-amber-600" aria-hidden />
            Why it matters
          </h2>
          <p className="mt-4 text-base leading-[1.75] text-slate-700 sm:text-lg">
            {whyItMatters}
          </p>
        </section>
      )}
    </div>
  );
}
