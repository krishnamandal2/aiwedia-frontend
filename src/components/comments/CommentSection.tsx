"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

type Comment = {
  _id: string;
  authorName: string;
  body: string;
  createdAt: string;
};

type Props = {
  contentSlug: string;
  contentType?: "blog" | "tool";
};

export default function CommentSection({
  contentSlug,
  contentType = "blog",
}: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [body, setBody] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!API) return;
    fetch(
      `${API}/api/comments?slug=${encodeURIComponent(contentSlug)}&type=${contentType}`
    )
      .then((r) => r.json())
      .then((d) => setComments(d.comments || []))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [API, contentSlug, contentType]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!API || submitting) return;
    if (!authorName.trim() || !body.trim()) {
      toast.error("Name and comment are required");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentSlug,
          contentType,
          authorName: authorName.trim(),
          authorEmail: authorEmail.trim(),
          body: body.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not post comment");
        return;
      }
      toast.success("Comment submitted — it will appear after review");
      setBody("");
    } catch {
      toast.error("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-12 border-t border-gray-100 pt-10">
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
        <MessageSquare size={22} className="text-violet-600" />
        Comments
        {!loading && (
          <span className="text-sm font-normal text-gray-400">
            ({comments.length})
          </span>
        )}
      </h2>

      <form onSubmit={submit} className="mt-6 space-y-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Your name *"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            maxLength={80}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <textarea
          placeholder="Share your thoughts…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          maxLength={2000}
          rows={4}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-700 disabled:opacity-60"
        >
          {submitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
          Post comment
        </button>
        <p className="text-xs text-gray-400">
          Comments are moderated before they appear publicly.
        </p>
      </form>

      <ul className="mt-8 space-y-6">
        {loading && (
          <li className="text-sm text-gray-400">Loading comments…</li>
        )}
        {!loading && comments.length === 0 && (
          <li className="text-sm text-gray-500">
            No comments yet. Be the first to share your thoughts!
          </li>
        )}
        {comments.map((c) => (
          <li key={c._id} className="border-b border-gray-50 pb-6 last:border-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-semibold text-gray-900">{c.authorName}</span>
              <time className="text-xs text-gray-400">
                {new Date(c.createdAt).toLocaleDateString()}
              </time>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
              {c.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
