"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  ImageIcon,
  Mail,
  Rocket,
  Send,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { submitTool } from "@/lib/toolsApi";

type Category = { slug: string; title: string };

const PERKS = [
  { icon: Zap, text: "Free listing — no credit card" },
  { icon: Rocket, text: "Reviewed & published in 24–48h" },
  { icon: Users, text: "Exposure to AI builders worldwide" },
  { icon: Star, text: "Dedicated SEO tool page on AIWedia" },
];

export default function SuggestToolPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    toolName: "",
    toolUrl: "",
    categorySlug: "",
    description: "",
    imageUrl: "",
    submitterName: "",
    submitterEmail: "",
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?page=1&limit=200`)
      .then((r) => r.json())
      .then((d) => {
        const list = (d.categories || []).filter(
          (c: { typeui?: string }) => c.typeui === "ai"
        );
        setCategories(list);
        if (list[0]) setForm((f) => ({ ...f, categorySlug: list[0].slug }));
      })
      .catch(() => toast.error("Could not load categories"));
  }, []);

  const categoryTitle = useMemo(
    () =>
      categories.find((c) => c.slug === form.categorySlug)?.title ||
      "AI Tools",
    [categories, form.categorySlug]
  );

  const showPreviewImg = form.imageUrl.trim() && !imgError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.toolName || !form.toolUrl || !form.categorySlug || !form.submitterEmail) {
      toast.error("Fill in required fields");
      return;
    }
    try {
      setLoading(true);
      await submitTool(form);
      setSubmitted(true);
      toast.success("Thanks! We'll review your submission.");
      setForm({
        toolName: "",
        toolUrl: "",
        categorySlug: form.categorySlug,
        description: "",
        imageUrl: "",
        submitterName: "",
        submitterEmail: form.submitterEmail,
      });
      setImgError(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white">
        <div className="mx-auto max-w-lg px-4 py-20 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 size={40} className="text-emerald-600" />
          </div>
          <h1 className="mt-6 text-3xl font-black text-slate-900">
            Submission received!
          </h1>
          <p className="mt-3 text-slate-600">
            Our team will review your tool and email you when it&apos;s live on
            AIWedia.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white hover:bg-violet-500"
            >
              Submit another tool
            </button>
            <Link
              href="/ai-directory"
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Browse directory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/80 via-white to-slate-50">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-violet-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-200/40 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-violet-200">
            <Sparkles size={14} />
            Free listing
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Submit your AI tool
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Get discovered by thousands of AI builders. We review every submission,
            polish the listing, and notify you when it goes live.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Left — perks */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900">Why list on AIWedia?</h2>
            <ul className="mt-5 space-y-4">
              {PERKS.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                    <Icon size={18} />
                  </span>
                  <span className="text-sm font-medium text-slate-700">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
              <p className="border-b border-slate-100 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Live preview
              </p>
              <div className="p-5">
                <div className="flex gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-violet-50">
                    {showPreviewImg ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={form.imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center text-xl font-bold text-violet-300">
                        {form.toolName.charAt(0) || "?"}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-800">
                      {categoryTitle}
                    </span>
                    <p className="mt-1 truncate text-base font-black text-slate-900">
                      {form.toolName || "Your tool name"}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                      {form.description || "Description appears on your listing page…"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-1 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-bold text-white">
                  Visit tool
                  <Globe size={12} />
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl"
            >
              <div className="border-b border-slate-100 bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-5 text-white sm:px-8">
                <h2 className="text-xl font-black">Tool details</h2>
                <p className="mt-1 text-sm text-violet-100">
                  Fields marked * are required
                </p>
              </div>

              <div className="space-y-5 p-6 sm:p-8">
                <Field label="Tool name *" icon={Sparkles}>
                  <input
                    required
                    className={inputCls}
                    placeholder="e.g. TrafficWins"
                    value={form.toolName}
                    onChange={(e) =>
                      setForm({ ...form, toolName: e.target.value })
                    }
                  />
                </Field>

                <Field label="Website URL *" icon={Globe}>
                  <input
                    required
                    type="url"
                    className={inputCls}
                    placeholder="https://yourtool.com"
                    value={form.toolUrl}
                    onChange={(e) =>
                      setForm({ ...form, toolUrl: e.target.value })
                    }
                  />
                </Field>

                <Field label="Category *">
                  <select
                    required
                    className={inputCls}
                    value={form.categorySlug}
                    onChange={(e) =>
                      setForm({ ...form, categorySlug: e.target.value })
                    }
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Short description">
                  <textarea
                    rows={3}
                    className={inputCls}
                    placeholder="What does your tool do? Who is it for?"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                </Field>

                <Field label="Logo or screenshot URL" icon={ImageIcon}>
                  <input
                    type="url"
                    className={inputCls}
                    placeholder="https://… (optional)"
                    value={form.imageUrl}
                    onChange={(e) => {
                      setImgError(false);
                      setForm({ ...form, imageUrl: e.target.value });
                    }}
                  />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your name">
                    <input
                      className={inputCls}
                      placeholder="Optional"
                      value={form.submitterName}
                      onChange={(e) =>
                        setForm({ ...form, submitterName: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Your email *" icon={Mail}>
                    <input
                      required
                      type="email"
                      className={inputCls}
                      placeholder="you@company.com"
                      value={form.submitterEmail}
                      onChange={(e) =>
                        setForm({ ...form, submitterEmail: e.target.value })
                      }
                    />
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:brightness-105 disabled:opacity-60"
                >
                  <Send size={18} />
                  {loading ? "Sending…" : "Submit for review"}
                  {!loading && <ArrowRight size={18} />}
                </button>

                <p className="text-center text-xs text-slate-400">
                  By submitting you agree we may edit the listing for quality and SEO.
                </p>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already listed?{" "}
              <Link href="/ai-directory" className="font-semibold text-violet-600 hover:underline">
                Browse the AI directory
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20";

function Field({
  label,
  children,
  icon: Icon,
}: {
  label: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-700">
        {Icon && <Icon size={14} className="text-violet-500" />}
        {label}
      </span>
      {children}
    </label>
  );
}
