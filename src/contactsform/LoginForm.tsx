"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Loader2,
  LogIn,
  ArrowRight,
  X,
} from "lucide-react";

export default function LoginForm({
  form,
  errors,
  loading,
  handleChange,
  handleSubmit,
}: any) {

  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">

      {/* Background blur */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 relative">

          {/* Close Button */}
          <button
            onClick={() => router.push("/")}
            className="absolute top-6 right-6 p-2 rounded-full bg-white border shadow hover:bg-gray-100"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 text-white">
              <LogIn size={28} />
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900">
              Welcome Back
            </h1>

            <p className="text-slate-500 mt-2">
              Please enter your details
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-2xl outline-none
                ${
                  errors.email
                    ? "border-red-300"
                    : "border-slate-200 focus:border-indigo-500"
                }`}
              />

              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-2xl outline-none
                ${
                  errors.password
                    ? "border-red-300"
                    : "border-slate-200 focus:border-indigo-500"
                }`}
              />

              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition-all"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>
                  Login <ArrowRight size={18} />
                </>
              )}
            </button>

          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-slate-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-indigo-600 font-bold hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}