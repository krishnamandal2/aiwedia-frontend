"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clientApi } from "@/lib/api-client";

type Prompt = { _id: string; slug: string; title: string; category: string };

export default function AdminPromptsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Prompt[]>([]);

  useEffect(() => {
    clientApi.admin.verify().then((r) => {
      if (!r.ok) router.push("/admin/login");
      else clientApi.admin.prompts.list().then((d) => setItems(d.prompts as Prompt[]));
    });
  }, [router]);

  const remove = async (id: string) => {
    if (!confirm("Delete prompt?")) return;
    await clientApi.admin.prompts.remove(id);
    setItems((x) => x.filter((i) => i._id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link href="/admin/manage" className="text-sm text-indigo-600 hover:underline">
        ← Content hub
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Prompt library</h1>
      <p className="mt-2 text-sm text-slate-500">
        Seed with <code>npm run seed:prompts</code> on backend. Public: /prompts
      </p>
      <ul className="mt-8 space-y-2">
        {items.map((p) => (
          <li
            key={p._id}
            className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm"
          >
            <span>
              <strong>{p.title}</strong>{" "}
              <span className="text-slate-400">/prompts/{p.slug}</span>
            </span>
            <button
              type="button"
              onClick={() => remove(p._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {items.length === 0 && (
        <p className="mt-6 text-slate-500">No prompts in DB. Run seed:prompts.</p>
      )}
    </div>
  );
}
