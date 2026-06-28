import { Sparkles } from "lucide-react";

type Props = {
  benefits?: string[];
};

export default function BenefitsSection({ benefits }: Props) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-amber-500/15 p-2 text-amber-400">
          <Sparkles className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-white">Key benefits</h2>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {benefits.map((benefit, i) => (
          <li
            key={i}
            className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-slate-300"
          >
            <span className="mt-0.5 shrink-0 text-emerald-400">✓</span>
            {benefit}
          </li>
        ))}
      </ul>
    </section>
  );
}
