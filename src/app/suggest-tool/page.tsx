"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Send, Sparkles } from "lucide-react";
import { submitTool } from "@/lib/toolsApi";
import { theme } from "@/lib/siteTheme";

type Category = { slug: string; title: string };

export default function SuggestToolPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    toolName: "",
    toolUrl: "",
    categorySlug: "",
    description: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.toolName || !form.toolUrl || !form.categorySlug || !form.submitterEmail) {
      toast.error("Fill in required fields");
      return;
    }
    try {
      setLoading(true);
      await submitTool(form);
      toast.success("Thanks! We'll review your submission.");
      setForm({
        toolName: "",
        toolUrl: "",
        categorySlug: form.categorySlug,
        description: "",
        submitterName: "",
        submitterEmail: form.submitterEmail,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={theme.page}>
      <div className="mx-auto max-w-lg px-4 py-12 sm:py-16">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
            <Sparkles size={14} />
            Community
          </span>
          <h1 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
            Suggest a tool
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Help us grow the directory. Submissions are reviewed before going live.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`space-y-4 p-6 ${theme.card}`}
        >
          <Field label="Tool name *">
            <input
              required
              className={`w-full px-3 ${theme.input}`}
              value={form.toolName}
              onChange={(e) => setForm({ ...form, toolName: e.target.value })}
            />
          </Field>
          <Field label="Website URL *">
            <input
              required
              type="url"
              className={`w-full px-3 ${theme.input}`}
              placeholder="https://"
              value={form.toolUrl}
              onChange={(e) => setForm({ ...form, toolUrl: e.target.value })}
            />
          </Field>
          <Field label="Category *">
            <select
              required
              className={`w-full px-3 ${theme.input}`}
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
              className={`w-full px-3 ${theme.input}`}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Field>
          <Field label="Your name">
            <input
              className={`w-full px-3 ${theme.input}`}
              value={form.submitterName}
              onChange={(e) =>
                setForm({ ...form, submitterName: e.target.value })
              }
            />
          </Field>
          <Field label="Your email *">
            <input
              required
              type="email"
              className={`w-full px-3 ${theme.input}`}
              value={form.submitterEmail}
              onChange={(e) =>
                setForm({ ...form, submitterEmail: e.target.value })
              }
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className={`flex w-full items-center justify-center gap-2 py-3 ${theme.btnPrimary} disabled:opacity-60`}
          >
            <Send size={18} />
            {loading ? "Sending…" : "Submit for review"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          <Link href="/ai-directory" className="text-violet-600 hover:underline">
            Browse the AI directory
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}
