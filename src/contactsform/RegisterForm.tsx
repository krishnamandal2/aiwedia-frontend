"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, Loader2, ArrowRight, X } from "lucide-react";

export default function RegisterForm({
  form,
  errors,
  loading,
  handleChange,
  handleSubmit,
}: any) {

  const router = useRouter();

  const fields = [
    {
      name: "fullName",
      placeholder: "Full Name",
      type: "text",
      icon: <User size={18} />,
    },
    {
      name: "email",
      placeholder: "Email Address",
      type: "email",
      icon: <Mail size={18} />,
    },
    {
      name: "mobile",
      placeholder: "Mobile Number",
      type: "tel",
      icon: <Phone size={18} />,
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
      icon: <Lock size={18} />,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">

      {/* Background */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20" />

      <div className="w-full max-w-md relative z-10">

        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 relative">

          {/* Close */}
          <button
            onClick={() => router.push("/")}
            className="absolute top-6 right-6 p-2 rounded-full bg-white border shadow hover:bg-gray-100"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900">
              Create Account
            </h1>

            <p className="text-slate-500 mt-2">
              Join <span className="text-indigo-600 font-semibold">AiWedia</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {fields.map((field) => (
              <div key={field.name} className="relative">

                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {field.icon}
                </div>

                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-2xl outline-none
                  ${
                    errors[field.name]
                      ? "border-red-300"
                      : "border-slate-200 focus:border-indigo-500"
                  }`}
                />

                {errors[field.name] && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors[field.name]}
                  </p>
                )}

              </div>
            ))}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-2xl font-bold shadow-lg hover:bg-indigo-700"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>
                  Sign Up <ArrowRight size={18} />
                </>
              )}
            </button>

          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-slate-500">
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