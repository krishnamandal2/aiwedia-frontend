"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clientApi } from "@/lib/api-client";

type Cmp = {
  _id: string;
  slug: string;
  title: string;
  status: string;
};

export default function AdminComparisonsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Cmp[]>([]);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    summary: "",
    toolA: { categorySlug: "ai-tools", toolSlug: "chatgpt", title: "ChatGPT" },
    toolB: { categorySlug: "ai-tools", toolSlug: "claude", title: "Claude" },
    status: "published",
  });

  useEffect(() => {
    clientApi.admin.verify().then((r) => {
      if (!r.ok) router.push("/admin/login");
      else
        clientApi.admin.comparisons.list().then((d) =>
          setItems(d.comparisons as Cmp[])
        );
    });
  }, [router]);

  const create = async () => {
    await clientApi.admin.comparisons.create(form);
    const d = await clientApi.admin.comparisons.list();
    setItems(d.comparisons as Cmp[]);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    await clientApi.admin.comparisons.remove(id);
    setItems((x) => x.filter((i) => i._id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link href="/admin/manage" className="text-sm text-indigo-600 hover:underline">
        ← Content hub
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Comparisons</h1>

      <div className="mt-6 space-y-2 rounded-xl border p-4 bg-slate-50 text-sm">
        <input
          placeholder="slug (chatgpt-vs-claude)"
          className="w-full border rounded px-3 py-2"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <input
          placeholder="title"
          className="w-full border rounded px-3 py-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <button
          type="button"
          onClick={create}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-bold text-white"
        >
          Add comparison
        </button>
      </div>

      <ul className="mt-8 space-y-2">
        {items.map((c) => (
          <li
            key={c._id}
            className="flex justify-between border rounded-lg px-4 py-3"
          >
            <div>
              <p className="font-semibold">{c.title}</p>
              <p className="text-xs text-slate-500">/compare/{c.slug}</p>
            </div>
            <button
              type="button"
              onClick={() => remove(c._id)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
