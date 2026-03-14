"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2, MailCheck } from "lucide-react";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    const cleanEmail = email.trim().toLowerCase();

    if (!emailRegex.test(cleanEmail)) {
      toast.error("Please enter a valid email address");
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
      toast.success("Successfully subscribed!");

    } catch (err) {
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <div className="flex items-center gap-3 text-green-400 text-sm">
        <MailCheck className="w-5 h-5" />
        <span>You are now subscribed </span>
      </div>
    );
  }

  return (
    <div className="space-y-3 w-full max-w-md">
      <p className="text-sm font-semibold text-white">
        Subscribe to our newsletter
      </p>

      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-white placeholder-slate-500 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition whitespace-nowrap disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Subscribing
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>

      <p className="text-xs text-slate-500">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}