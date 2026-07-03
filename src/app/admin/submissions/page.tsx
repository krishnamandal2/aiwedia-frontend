"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Check,
  X,
  Inbox,
  Save,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Eye,
  ImageIcon,
  Star,
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

type Submission = {
  _id: string;
  toolName: string;
  toolUrl: string;
  categorySlug: string;
  description?: string;
  imageUrl?: string;
  affiliateUrl?: string;
  rank?: number;
  editorScore?: number | null;
  benefits?: string[];
  submitterEmail: string;
  submitterName?: string;
  status: string;
  createdAt: string;
};

type Category = { slug: string; title: string };

type Draft = {
  toolName: string;
  toolUrl: string;
  categorySlug: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
  rank: number;
  editorScore: string | number;
  benefits: string;
};

const emptyDraft = (s: Submission): Draft => ({
  toolName: s.toolName,
  toolUrl: s.toolUrl,
  categorySlug: s.categorySlug,
  description: s.description || "",
  imageUrl: s.imageUrl || "",
  affiliateUrl: s.affiliateUrl || "",
  rank: s.rank ?? 999,
  editorScore: s.editorScore ?? "",
  benefits: (s.benefits || []).join(", "),
});

function benefitsList(raw: string) {
  return raw
    .split(/[\n,]/)
    .map((b) => b.trim())
    .filter(Boolean);
}

export default function AdminSubmissionsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Submission[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [rejectNotes, setRejectNotes] = useState<Record<string, string>>({});
  const [imgPreviewError, setImgPreviewError] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const init = async () => {
      const verify = await fetch(`${API}/api/admin/verify`, {
        credentials: "include",
      });
      if (!verify.ok) {
        router.push("/admin/login");
        return;
      }
      const [subRes, catRes] = await Promise.all([
        fetch(`${API}/api/submissions/admin?status=pending`, {
          credentials: "include",
        }),
        fetch(`${API}/api/categories?page=1&limit=200`),
      ]);
      const data = await subRes.json();
      const subs: Submission[] = data.submissions || [];
      setItems(subs);
      const draftMap: Record<string, Draft> = {};
      subs.forEach((s) => {
        draftMap[s._id] = emptyDraft(s);
      });
      setDrafts(draftMap);

      const catData = await catRes.json();
      setCategories(
        (catData.categories || []).filter(
          (c: { typeui?: string }) => c.typeui === "ai"
        )
      );
      setLoading(false);
    };
    init();
  }, [router]);

  const updateDraft = (id: string, field: keyof Draft, value: string | number) => {
    if (field === "imageUrl") {
      setImgPreviewError((prev) => ({ ...prev, [id]: false }));
    }
    setDrafts((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const save = async (id: string) => {
    setBusy(id);
    const d = drafts[id];
    try {
      const res = await fetch(`${API}/api/submissions/admin/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...d,
          rank: Number(d.rank) || 999,
          editorScore: d.editorScore === "" ? null : Number(d.editorScore),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Saved");
      if (data.submission) {
        setItems((prev) =>
          prev.map((s) => (s._id === id ? { ...s, ...data.submission } : s))
        );
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(null);
    }
  };

  const act = async (id: string, action: "approve" | "reject") => {
    setBusy(id);
    try {
      if (action === "approve") {
        await save(id);
      }
      const res = await fetch(`${API}/api/submissions/admin/${id}/${action}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          note: action === "reject" ? rejectNotes[id] || "" : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      if (action === "approve") {
        toast.success(
          data.emailSent
            ? "Approved & confirmation email sent!"
            : "Approved (email not sent — check SMTP)"
        );
      } else {
        toast.success(
          data.emailSent
            ? "Rejected & notification email sent"
            : "Rejected (email not sent — check SMTP)"
        );
      }
      setItems((prev) => prev.filter((s) => s._id !== id));
      setExpanded(null);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Action failed");
    } finally {
      setBusy(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 text-slate-600">Loading…</div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              <Inbox size={24} className="text-violet-600" />
              Tool submissions
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {items.length} pending — edit image, description & benefits before
              approving
            </p>
          </div>
          <Link
            href="/admin/manage"
            className="text-sm font-semibold text-violet-600 hover:underline"
          >
            ← Content hub
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            No pending submissions.
          </p>
        ) : (
          <ul className="space-y-4">
            {items.map((s) => {
              const open = expanded === s._id;
              const d = drafts[s._id];
              if (!d) return null;

              const categoryTitle =
                categories.find((c) => c.slug === d.categorySlug)?.title ||
                d.categorySlug;
              const previewBenefits = benefitsList(d.benefits);
              const showImg = d.imageUrl && !imgPreviewError[s._id];

              return (
                <li
                  key={s._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 p-5">
                    <div className="flex gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-violet-50">
                        {showImg ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={d.imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                            onError={() =>
                              setImgPreviewError((prev) => ({
                                ...prev,
                                [s._id]: true,
                              }))
                            }
                          />
                        ) : (
                          <span className="flex h-full items-center justify-center text-xl font-bold text-violet-300">
                            {d.toolName.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <h2 className="font-bold text-slate-900">{d.toolName}</h2>
                        <a
                          href={d.toolUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 break-all text-sm text-violet-600 hover:underline"
                        >
                          {d.toolUrl}
                          <ExternalLink size={12} />
                        </a>
                        <p className="mt-1 text-xs text-slate-500">
                          {s.submitterName || "Anonymous"} · {s.submitterEmail} ·{" "}
                          {new Date(s.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setExpanded(open ? null : s._id)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      {open ? "Collapse" : "Edit & preview"}
                      {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>

                  {open && (
                    <div className="border-t border-slate-100 bg-slate-50/80 p-5">
                      <div className="grid gap-8 xl:grid-cols-2">
                        {/* Edit form */}
                        <div>
                          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-800">
                            <Save size={16} className="text-violet-600" />
                            Edit submission
                          </h3>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Tool name" className="sm:col-span-2">
                              <input
                                className={inputCls}
                                value={d.toolName}
                                onChange={(e) =>
                                  updateDraft(s._id, "toolName", e.target.value)
                                }
                              />
                            </Field>
                            <Field label="Website URL" className="sm:col-span-2">
                              <input
                                className={inputCls}
                                value={d.toolUrl}
                                onChange={(e) =>
                                  updateDraft(s._id, "toolUrl", e.target.value)
                                }
                              />
                            </Field>
                            <Field label="Category">
                              <select
                                className={inputCls}
                                value={d.categorySlug}
                                onChange={(e) =>
                                  updateDraft(s._id, "categorySlug", e.target.value)
                                }
                              >
                                {categories.map((c) => (
                                  <option key={c.slug} value={c.slug}>
                                    {c.title}
                                  </option>
                                ))}
                              </select>
                            </Field>
                            <Field label="Affiliate / launch URL">
                              <input
                                className={inputCls}
                                placeholder="Optional override"
                                value={d.affiliateUrl}
                                onChange={(e) =>
                                  updateDraft(s._id, "affiliateUrl", e.target.value)
                                }
                              />
                            </Field>

                            <div className="sm:col-span-2">
                              <Field label="Image URL">
                                <input
                                  className={inputCls}
                                  placeholder="https://… logo or screenshot"
                                  value={d.imageUrl}
                                  onChange={(e) =>
                                    updateDraft(s._id, "imageUrl", e.target.value)
                                  }
                                />
                              </Field>
                              <div className="mt-3 overflow-hidden rounded-xl border border-dashed border-slate-300 bg-white">
                                {showImg ? (
                                  <div className="relative aspect-[16/9] max-h-48">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={d.imageUrl}
                                      alt="Preview"
                                      className="h-full w-full object-contain bg-slate-100 p-2"
                                      onError={() =>
                                        setImgPreviewError((prev) => ({
                                          ...prev,
                                          [s._id]: true,
                                        }))
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center gap-2 py-10 text-slate-400">
                                    <ImageIcon size={32} />
                                    <p className="text-xs">
                                      Paste an image URL to preview
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>

                            <Field label="Rank">
                              <input
                                type="number"
                                className={inputCls}
                                value={d.rank}
                                onChange={(e) =>
                                  updateDraft(s._id, "rank", e.target.value)
                                }
                              />
                            </Field>
                            <Field label="Editor score (1–10)">
                              <input
                                type="number"
                                min={1}
                                max={10}
                                className={inputCls}
                                value={d.editorScore}
                                onChange={(e) =>
                                  updateDraft(s._id, "editorScore", e.target.value)
                                }
                              />
                            </Field>

                            <Field label="Description" className="sm:col-span-2">
                              <textarea
                                rows={4}
                                className={inputCls}
                                value={d.description}
                                onChange={(e) =>
                                  updateDraft(s._id, "description", e.target.value)
                                }
                              />
                            </Field>
                            <Field
                              label="Benefits (comma-separated)"
                              className="sm:col-span-2"
                            >
                              <input
                                className={inputCls}
                                placeholder="Free tier, API access, No-code"
                                value={d.benefits}
                                onChange={(e) =>
                                  updateDraft(s._id, "benefits", e.target.value)
                                }
                              />
                            </Field>

                            <Field
                              label="Rejection note (optional, emailed to submitter)"
                              className="sm:col-span-2"
                            >
                              <textarea
                                rows={2}
                                className={inputCls}
                                placeholder="e.g. Please add a clearer description and resubmit"
                                value={rejectNotes[s._id] || ""}
                                onChange={(e) =>
                                  setRejectNotes((prev) => ({
                                    ...prev,
                                    [s._id]: e.target.value,
                                  }))
                                }
                              />
                            </Field>
                          </div>
                        </div>

                        {/* Live preview */}
                        <div>
                          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-800">
                            <Eye size={16} className="text-emerald-600" />
                            Live listing preview
                          </h3>
                          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
                            <div className="border-b border-slate-100 bg-gradient-to-br from-violet-50/60 to-white p-5">
                              <div className="flex gap-4">
                                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-violet-50">
                                  {showImg ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                      src={d.imageUrl}
                                      alt=""
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <span className="flex h-full items-center justify-center text-lg font-bold text-violet-400">
                                      {d.toolName.charAt(0) || "?"}
                                    </span>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap gap-1.5">
                                    <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-800">
                                      {categoryTitle}
                                    </span>
                                    {d.editorScore !== "" &&
                                      Number(d.editorScore) > 0 && (
                                        <span className="inline-flex items-center gap-0.5 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                                          <Star
                                            size={10}
                                            className="fill-amber-400 text-amber-500"
                                          />
                                          {d.editorScore}/10
                                        </span>
                                      )}
                                  </div>
                                  <p className="mt-2 text-lg font-black text-slate-900">
                                    {d.toolName || "Tool name"}
                                  </p>
                                  <p className="mt-1 line-clamp-3 text-sm text-slate-600">
                                    {d.description || "Description will appear here…"}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white">
                                  Visit tool
                                  <ExternalLink size={12} />
                                </span>
                                <span className="inline-flex items-center rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600">
                                  Browse category
                                </span>
                              </div>
                            </div>

                            {previewBenefits.length > 0 && (
                              <div className="border-t border-slate-100 px-5 py-4">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                  Key benefits
                                </p>
                                <ul className="mt-2 space-y-1.5">
                                  {previewBenefits.slice(0, 4).map((b, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2 text-sm text-slate-700"
                                    >
                                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                                      {b}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <p className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-center text-[10px] text-slate-400">
                              Preview matches the published tool page layout
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-200 pt-5">
                        <button
                          type="button"
                          disabled={busy === s._id}
                          onClick={() => save(s._id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50"
                        >
                          <Save size={16} />
                          Save changes
                        </button>
                        <button
                          type="button"
                          disabled={busy === s._id}
                          onClick={() => act(s._id, "approve")}
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-500 disabled:opacity-50"
                        >
                          <Check size={16} />
                          Approve & email user
                        </button>
                        <button
                          type="button"
                          disabled={busy === s._id}
                          onClick={() => act(s._id, "reject")}
                          className="inline-flex items-center gap-1 rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-300 disabled:opacity-50"
                        >
                          <X size={16} />
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-semibold text-slate-600">
        {label}
      </span>
      {children}
    </label>
  );
}
