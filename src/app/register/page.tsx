"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, Loader2, ArrowRight, X } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (form.fullName.trim().length < 3)
      newErrors.fullName = "Full name required";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email";

    if (!/^\d{10}$/.test(form.mobile))
      newErrors.mobile = "10-digit mobile required";

    if (form.password.length < 6)
      newErrors.password = "Min 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Welcome to AiWedia!");
     setTimeout(() => {
     window.location.href = "/";
      }, 1000);
    } catch (err: any) {
      toast.error(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-20 sm:w-96 sm:h-96" />
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-20 sm:w-96 sm:h-96" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100 relative">
          {/* Cross/Close button - Now inside the form card */}
         <button
            onClick={handleGoHome}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg hover:bg-white hover:shadow-xl transition-all"
            aria-label="Go to home"
            type="button"
          >
            <X size={20} className="sm:w-6 sm:h-6 text-slate-700" />
          </button>

          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Create Account
            </h1>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Join{" "}
              <span className="text-indigo-600 font-semibold">
                AiWedia
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {[
              {
                name: "fullName",
                placeholder: "Full Name",
                type: "text",
                icon: <User size={18} className="sm:w-5 sm:h-5" />,
              },
              {
                name: "email",
                placeholder: "Email Address",
                type: "email",
                icon: <Mail size={18} className="sm:w-5 sm:h-5" />,
              },
              {
                name: "mobile",
                placeholder: "Mobile Number",
                type: "tel",
                icon: <Phone size={18} className="sm:w-5 sm:h-5" />,
              },
              {
                name: "password",
                placeholder: "Password",
                type: "password",
                icon: <Lock size={18} className="sm:w-5 sm:h-5" />,
              },
            ].map((field) => (
              <div key={field.name} className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600">
                  {field.icon}
                </div>

                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={(form as any)[field.name]}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 sm:py-3.5 bg-slate-50 border rounded-2xl outline-none transition-all text-sm sm:text-base
                    ${
                      errors[field.name]
                        ? "border-red-300 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                    }`}
                />

                {errors[field.name] && (
                  <span className="text-[10px] sm:text-xs text-red-500 absolute -bottom-4 left-2">
                    {errors[field.name]}
                  </span>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <>
                  Sign Up <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-slate-500 text-sm sm:text-base">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-indigo-600 font-bold hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}