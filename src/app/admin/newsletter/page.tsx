"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clientApi } from "@/lib/api-client";
import toast from "react-hot-toast";

type NewsletterStats = {
  total: number;
  active: number;
  recent: { email: string; createdAt: string }[];
};

export default function AdminNewsletterPage() {
  const router = useRouter();
  const [stats, setStats] = useState<NewsletterStats | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    clientApi.admin.verify().then((r) => {
      if (!r.ok) router.push("/admin/login");
      else
        clientApi.admin.newsletter.stats().then((d) =>
          setStats(d as NewsletterStats)
        );
    });
  }, [router]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link href="/admin/manage" className="text-sm text-indigo-600 hover:underline">
        ← Content hub
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Newsletter</h1>
      <p className="mt-2 text-sm text-slate-500">
        Weekly digest: top AI news (by score), featured tools, prompt of the week,
        and guides. Auto-sends Mondays 10:00 UTC.
      </p>

      <button
        type="button"
        disabled={sending}
        onClick={async () => {
          if (!confirm("Send weekly newsletter to all active subscribers?")) return;
          setSending(true);
          try {
            const r = await clientApi.admin.newsletter.sendWeekly();
            toast.success(`Sent to ${r.sent} of ${r.total} subscribers`);
          } catch {
            toast.error("Send failed");
          } finally {
            setSending(false);
          }
        }}
        className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-500 disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send weekly digest now"}
      </button>

      {stats && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border p-6">
            <p className="text-sm text-slate-500">Active subscribers</p>
            <p className="text-3xl font-black text-indigo-600">{stats.active}</p>
          </div>
          <div className="rounded-xl border p-6">
            <p className="text-sm text-slate-500">Total signups (incl. unsubscribed)</p>
            <p className="text-3xl font-black text-slate-800">{stats.total}</p>
          </div>
        </div>
      )}

      {stats?.recent && stats.recent.length > 0 && (
        <div className="mt-10">
          <h2 className="font-bold text-slate-900">Recent subscribers</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {stats.recent.map((s, i) => (
              <li key={i} className="flex justify-between border-b py-2 text-slate-600">
                <span>{s.email}</span>
                <time className="text-xs text-slate-400">
                  {new Date(s.createdAt).toLocaleDateString()}
                </time>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
