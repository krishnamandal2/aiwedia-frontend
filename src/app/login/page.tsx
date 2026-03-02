"use client";

import { useState } from "react";
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
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name as "email" | "password"]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

     localStorage.setItem("token", data.token);
     localStorage.setItem("user", JSON.stringify(data.user));
     toast.success("Welcome back!");

     setTimeout(() => {
  window.location.href = "/";
}, 500);
    } catch (err) {
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      {/* Background blur */}
      <div className="absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-purple-100 rounded-full blur-3xl opacity-50" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 relative">
          
          {/* Cross/Close button for home - Now inside the form card */}
          <button
            onClick={handleGoHome}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg hover:bg-white hover:shadow-xl transition-all"
            aria-label="Go to home"
            type="button"
          >
            <X size={20} className="sm:w-6 sm:h-6 text-slate-700" />
          </button>
          
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-indigo-600 rounded-2xl mb-4 text-white">
              <LogIn size={26} className="sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Welcome Back
            </h1>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Please enter your details
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" size={18}  />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 sm:py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all text-sm sm:text-base
                  ${
                    errors.email
                      ? "border-red-300 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                  }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 absolute -bottom-5 left-2">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" size={18} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 sm:py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all text-sm sm:text-base
                  ${
                    errors.password
                      ? "border-red-300 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                  }`}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 absolute -bottom-5 left-2">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <>
                  Login <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-slate-500 text-sm sm:text-base">
              Don't have an account?{" "}
              <Link href="/register" className="text-indigo-600 font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}