"use client";

import Link from "next/link";
import { User, Mail, Phone, Lock, Loader2, ArrowRight } from "lucide-react";
import AuthShell, {
  authBtnCls,
  authInputCls,
  authInputErrorCls,
} from "@/components/auth/AuthShell";

type RegisterFormProps = {
  form: {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
  };
  errors: Record<string, string>;
  loading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

const FIELDS = [
  { name: "fullName", placeholder: "Full name", type: "text", icon: User, auto: "name" },
  { name: "email", placeholder: "Email address", type: "email", icon: Mail, auto: "email" },
  { name: "mobile", placeholder: "Mobile (10 digits)", type: "tel", icon: Phone, auto: "tel" },
  { name: "password", placeholder: "Password (min 6 chars)", type: "password", icon: Lock, auto: "new-password" },
] as const;

export default function RegisterForm({
  form,
  errors,
  loading,
  handleChange,
  handleSubmit,
}: RegisterFormProps) {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Join AIWedia free — save tools, follow categories, and get personalized picks."
      badge="Free to join"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-violet-600 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {FIELDS.map(({ name, placeholder, type, icon: Icon, auto }) => (
          <label key={name} className="relative block">
            <span className="sr-only">{placeholder}</span>
            <Icon
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type={type}
              name={name}
              autoComplete={auto}
              placeholder={placeholder}
              value={form[name]}
              onChange={handleChange}
              className={`${authInputCls} ${errors[name] ? authInputErrorCls : ""}`}
            />
            {errors[name] && (
              <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
            )}
          </label>
        ))}

        <button type="submit" disabled={loading} className={`${authBtnCls} mt-2`}>
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Create account
              <ArrowRight size={18} />
            </>
          )}
        </button>

        <p className="text-center text-[11px] leading-relaxed text-slate-400">
          By signing up you agree to our{" "}
          <Link href="/terms" className="underline hover:text-slate-600">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-slate-600">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </AuthShell>
  );
}
