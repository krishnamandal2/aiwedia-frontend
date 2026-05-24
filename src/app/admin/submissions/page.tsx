"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, X, Inbox } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

type Submission = {
  _id: string;
  toolName: string;
  toolUrl: string;
  categorySlug: string;
  description?: string;
  submitterEmail: string;
  submitterName?: string;
  status: string;
  createdAt: string;
};

export default function AdminSubmissionsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const verify = await fetch(`${API}/api/admin/verify`, {
        credentials: "include",
      });
      if (!verify.ok) {
        router.push("/admin/login");
        return;
      }
      const res = await fetch(`${API}/api/submissions/admin?status=pending`, {
        credentials: "include",
      });
      const data = await res.json();
      setItems(data.submissions || []);
      setLoading(false);
    };
    init();
  }, [router]);

  const act = async (id: string, action: "approve" | "reject") => {
    setBusy(id);
    const res = await fetch(`${API}/api/submissions/admin/${id}/${action}`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      setItems((prev) => prev.filter((s) => s._id !== id));
    } else {
      alert("Action failed");
    }
    setBusy(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8">Loading…</div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 sm:p-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Inbox size={24} />
              Tool submissions
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {items.length} pending review
            </p>
          </div>
          <Link
            href="/admin/dashboard"
            className="text-sm text-indigo-400 hover:underline"
          >
            ← Dashboard
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="text-slate-500">No pending submissions.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((s) => (
              <li
                key={s._id}
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="font-bold text-white">{s.toolName}</h2>
                    <a
                      href={s.toolUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-400 break-all"
                    >
                      {s.toolUrl}
                    </a>
                    <p className="mt-2 text-sm text-slate-400">
                      Category: {s.categorySlug} · {s.submitterEmail}
                    </p>
                    {s.description && (
                      <p className="mt-2 text-sm text-slate-300">{s.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      disabled={busy === s._id}
                      onClick={() => act(s._id, "approve")}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
                    >
                      <Check size={16} />
                      Approve
                    </button>
                    <button
                      disabled={busy === s._id}
                      onClick={() => act(s._id, "reject")}
                      className="inline-flex items-center gap-1 rounded-lg bg-slate-700 px-3 py-2 text-sm font-semibold hover:bg-slate-600 disabled:opacity-50"
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
