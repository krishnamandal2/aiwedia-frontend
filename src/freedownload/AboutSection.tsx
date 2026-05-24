import { Info } from "lucide-react";

type Props = {
  about?: string;
};

export default function AboutSection({ about }: Props) {
  if (!about) return null;

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-xl bg-emerald-500/15 p-2 text-emerald-400">
          <Info className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-white">About these tools</h2>
      </div>
      <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
        {about}
      </p>
    </section>
  );
}
