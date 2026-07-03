"use client";

import Link from "next/link";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import AuthShell, {
  authBtnCls,
  authInputCls,
  authInputErrorCls,
} from "@/components/auth/AuthShell";

type LoginFormProps = {
  form: { email: string; password: string };
  errors: { email?: string; password?: string };
  loading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export default function LoginForm({
  form,
  errors,
  loading,
  handleChange,
  handleSubmit,
}: LoginFormProps) {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to access your saved tools, prompts, and recommendations."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-violet-600 hover:underline"
          >
            Create free account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="relative block">
          <span className="sr-only">Email</span>
          <Mail
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className={`${authInputCls} ${errors.email ? authInputErrorCls : ""}`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </label>

        <label className="relative block">
          <span className="sr-only">Password</span>
          <Lock
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={`${authInputCls} ${errors.password ? authInputErrorCls : ""}`}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </label>

        <button type="submit" disabled={loading} className={authBtnCls}>
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Sign in
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>
    </AuthShell>
  );
}
