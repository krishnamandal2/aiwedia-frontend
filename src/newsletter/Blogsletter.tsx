"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2, MailCheck, Sparkles } from "lucide-react";

export default function Blogsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    const cleanEmail = email.trim().toLowerCase();

    if (!emailRegex.test(cleanEmail)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: cleanEmail }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Subscription failed");
        return;
      }

      setSubscribed(true);
      setEmail("");
      toast.success("Welcome to AIWedia");
    } catch (err) {
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-20 mb-10">
      <div className="relative rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-xl">

        {/* subtle gradient glow */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 blur-2xl opacity-40" />

        {/* SUCCESS */}
        {subscribed ? (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <MailCheck className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900">
              You're in 🎉
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              You'll start receiving the best AI tools & tips soon.
            </p>
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div className="text-center max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-3 text-indigo-600 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AIWedia Newsletter
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Get Free AI Tools & <br className="hidden md:block" />
                Growth Hacks Weekly 
              </h2>

              <p className="text-slate-600 mt-4 text-sm md:text-base">
                Join thousands of creators learning how to use AI to grow faster,
                smarter, and earn more.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubscribe}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-4 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-pink-600 hover:opacity-90 transition disabled:opacity-60 shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Join Free"
                )}
              </button>
            </form>

            {/* TRUST */}
            <div className="mt-6 text-center text-xs text-slate-500">
              <p>🔥 Join many creators • No spam • Unsubscribe anytime</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}