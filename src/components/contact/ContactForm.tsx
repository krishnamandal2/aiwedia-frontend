"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, MessageSquare, Phone, Send } from "lucide-react";
import { submitContactForm } from "@/lib/accountApi";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General inquiry",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      setLoading(true);
      await submitContactForm(form);
      setSent(true);
      toast.success("Message sent!");
      setForm({ name: "", email: "", subject: "General inquiry", message: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <p className="text-lg font-bold text-emerald-900">Message received!</p>
        <p className="mt-2 text-sm text-emerald-700">
          We&apos;ll reply to your email within a few business days.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-semibold text-violet-600 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold text-slate-700">
            Your name *
          </span>
          <input
            required
            className={inputCls}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold text-slate-700">
            Email *
          </span>
          <input
            required
            type="email"
            className={inputCls}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-bold text-slate-700">Subject</span>
        <select
          className={inputCls}
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        >
          <option>General inquiry</option>
          <option>Tool suggestion</option>
          <option>Partnership</option>
          <option>Bug report</option>
          <option>Press / media</option>
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-bold text-slate-700">
          Message *
        </span>
        <textarea
          required
          rows={5}
          className={inputCls}
          placeholder="How can we help?"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:brightness-105 disabled:opacity-60 sm:w-auto sm:px-8"
      >
        <Send size={18} />
        {loading ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

export function ContactInfoCards() {
  return (
    <div className="space-y-4">
      <a
        href="mailto:contact@aiwedia.com"
        className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-200 hover:shadow-md"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
          <Mail size={20} />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Email
          </p>
          <p className="mt-1 font-bold text-slate-900">contact@aiwedia.com</p>
        </div>
      </a>
      <a
        href="tel:+919818521688"
        className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-violet-200 hover:shadow-md"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
          <Phone size={20} />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Phone
          </p>
          <p className="mt-1 font-bold text-slate-900">+91 9818521688</p>
        </div>
      </a>
      <div className="flex items-start gap-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-600">
          <MessageSquare size={20} />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-800">Response time</p>
          <p className="mt-1 text-sm text-slate-600">
            We typically reply within 1–3 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
