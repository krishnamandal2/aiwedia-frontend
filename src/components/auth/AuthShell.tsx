"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  badge?: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

const PERKS = [
  "Save favorite AI tools",
  "Bookmark prompts & news",
  "Follow categories you care about",
  "Get personalized recommendations",
  "Submit tool reviews",
];

export default function AuthShell({
  title,
  subtitle,
  badge = "AIWedia account",
  children,
  footer,
}: AuthShellProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid min-h-screen max-w-6xl lg:grid-cols-2">
        {/* Left — brand panel */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-slate-900 px-10 py-14 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-white"
            >
              AIWedia
            </Link>
            <span className="mt-6 inline-block rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
              {badge}
            </span>
            <h1 className="mt-4 text-3xl font-black leading-tight xl:text-4xl">
              Your AI discovery hub
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-violet-100">
              One account to save tools, follow categories, and get recommendations
              tailored to how you build with AI.
            </p>
          </div>

          <ul className="relative mt-10 space-y-3">
            {PERKS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm font-medium text-violet-100"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — form */}
        <div className="relative flex flex-col justify-center px-4 py-10 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white p-2 text-slate-500 shadow-sm transition hover:bg-slate-50 lg:right-8 lg:top-8"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 lg:mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-violet-600 lg:hidden">
                {badge}
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">{title}</h2>
              <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
              {children}
            </div>

            <div className="mt-6 text-center text-sm text-slate-600">{footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const authInputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20";

export const authInputErrorCls = "border-red-300 focus:border-red-400 focus:ring-red-500/20";

export const authBtnCls =
  "flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:brightness-105 disabled:opacity-60";
