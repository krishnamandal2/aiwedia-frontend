import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  badge?: string;
  children: ReactNode;
};

export default function InfoPageShell({
  title,
  subtitle,
  badge = "AiWedia",
  children,
}: Props) {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-6 py-10 text-center sm:px-10 sm:py-12">
            <span className="inline-block rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">
              {badge}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-indigo-100 sm:text-base">
                {subtitle}
              </p>
            ) : null}
          </div>

          <div className="px-6 py-8 text-slate-700 sm:px-10 sm:py-10">
            {children}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/80 px-6 py-5 sm:px-10">
            <p className="text-xs text-slate-500">© {year} AiWedia. All rights reserved.</p>
            <div className="flex flex-wrap gap-3 text-sm font-semibold">
              <Link
                href="/"
                className="text-violet-600 hover:text-violet-800"
              >
                Home
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-1 text-violet-600 hover:text-violet-800"
              >
                Free tools
                <ArrowUpRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="text-violet-600 hover:text-violet-800"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
