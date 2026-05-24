"use client";

import BlogEditor from "./BlogEditor";

interface BlogAdminFormProps {
  title: string;
  setTitle: (v: string) => void;
  summary: string;
  setSummary: (v: string) => void;
  image: string;
  setImage: (v: string) => void;
  content: string;
  setContent: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel: string;
  loading: boolean;
  pageTitle: string;
}

export default function BlogAdminForm({
  title,
  setTitle,
  summary,
  setSummary,
  image,
  setImage,
  content,
  setContent,
  status,
  setStatus,
  onSubmit,
  onCancel,
  submitLabel,
  loading,
  pageTitle,
}: BlogAdminFormProps) {
  const slugPreview = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <button
              type="button"
              onClick={onCancel}
              className="text-sm font-medium text-slate-500 hover:text-slate-800"
            >
              ← Dashboard
            </button>
            <h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
              {pageTitle}
            </h1>
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold shadow-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
              Article details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Title
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-lg font-medium outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  placeholder="Catchy headline…"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {slugPreview && (
                  <p className="mt-1.5 text-xs text-slate-400">
                    Slug: <span className="font-mono text-violet-600">/blog/{slugPreview}</span>
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Summary
                </label>
                <textarea
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm leading-relaxed outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  placeholder="Short excerpt for cards and SEO…"
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Cover image URL
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  placeholder="https://…"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
              Content
            </h2>
            <BlogEditor value={content} onChange={setContent} />
          </section>

          <div className="flex flex-wrap justify-end gap-3 pb-12">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50"
            >
              {loading ? "Saving…" : submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
