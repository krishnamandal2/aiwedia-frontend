import Link from "next/link";
import { ArrowRight, Plus, Rocket, Sparkles, Users } from "lucide-react";

export default function HomeSubmitToolBanner() {
  return (
    <div className="relative mt-12 overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-600 via-indigo-600 to-slate-900 p-8 text-white shadow-xl sm:p-10">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl"
        aria-hidden
      />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
            <Sparkles size={12} />
            List your AI tool
          </span>
          <h3 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">
            Built an AI tool? Get listed on AIWedia
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-violet-100 sm:text-base">
            Submit for free. We review every listing, publish it in the right category,
            and email you when it goes live — plus exposure to our AI builder audience.
          </p>
          <ul className="mt-5 flex flex-wrap gap-4 text-xs font-semibold text-violet-100 sm:text-sm">
            <li className="inline-flex items-center gap-1.5">
              <Users size={14} className="text-violet-200" />
              Free submission
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Rocket size={14} className="text-violet-200" />
              Live in 24–48h
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Plus size={14} className="text-violet-200" />
              Dedicated tool page
            </li>
          </ul>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
          <Link
            href="/suggest-tool"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-violet-700 shadow-lg transition hover:bg-violet-50"
          >
            Submit your AI tool
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/ai-directory"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            Browse directory first
          </Link>
        </div>
      </div>
    </div>
  );
}
