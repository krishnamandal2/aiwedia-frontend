"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clientApi } from "@/lib/api-client";

type Comment = {
  _id: string;
  authorName: string;
  body: string;
  contentSlug: string;
  status: string;
  createdAt: string;
};

export default function AdminCommentsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Comment[]>([]);
  const [filter, setFilter] = useState("pending");

  const load = () => {
    clientApi.admin.comments.list(filter).then((d) =>
      setItems(d.comments as Comment[])
    );
  };

  useEffect(() => {
    clientApi.admin.verify().then((r) => {
      if (!r.ok) router.push("/admin/login");
      else load();
    });
  }, [router, filter]);

  const setStatus = async (id: string, status: string) => {
    await clientApi.admin.comments.updateStatus(id, status);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete comment?")) return;
    await clientApi.admin.comments.remove(id);
    load();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link href="/admin/manage" className="text-sm text-indigo-600 hover:underline">
        ← Content hub
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Comments</h1>

      <div className="mt-4 flex gap-2">
        {["pending", "approved", "rejected"].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold capitalize ${
              filter === s ? "bg-indigo-600 text-white" : "bg-slate-100"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <ul className="mt-8 space-y-4">
        {items.map((c) => (
          <li key={c._id} className="rounded-xl border p-4 text-sm">
            <div className="flex justify-between gap-2">
              <strong>{c.authorName}</strong>
              <span className="text-slate-400 text-xs">
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="mt-2 text-slate-700">{c.body}</p>
            <p className="mt-1 text-xs text-slate-400">
              on /blog/{c.contentSlug}
            </p>
            <div className="mt-3 flex gap-2">
              {c.status !== "approved" && (
                <button
                  type="button"
                  onClick={() => setStatus(c._id, "approved")}
                  className="rounded bg-green-600 px-3 py-1 text-white text-xs font-bold"
                >
                  Approve
                </button>
              )}
              {c.status !== "rejected" && (
                <button
                  type="button"
                  onClick={() => setStatus(c._id, "rejected")}
                  className="rounded bg-amber-600 px-3 py-1 text-white text-xs font-bold"
                >
                  Reject
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(c._id)}
                className="text-red-600 text-xs font-bold"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {items.length === 0 && (
        <p className="mt-6 text-slate-500">No {filter} comments.</p>
      )}
    </div>
  );
}
