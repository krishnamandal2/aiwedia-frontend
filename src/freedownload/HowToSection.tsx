import { ListOrdered } from "lucide-react";

type HowToStep = {
  step: number;
  title: string;
  text: string;
};

type Props = {
  howTo?: HowToStep[];
};

export default function HowToSection({ howTo }: Props) {
  if (!howTo || howTo.length === 0) return null;

  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-cyan-500/15 p-2 text-cyan-400">
          <ListOrdered className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-white">How to use</h2>
      </div>

      <ol className="space-y-4">
        {howTo.map((item) => (
          <li
            key={item.step}
            className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600/40 to-emerald-600/30 text-sm font-black text-cyan-200">
              {item.step}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-white">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
