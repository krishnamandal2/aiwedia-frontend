"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clientApi } from "@/lib/api-client";

type Guide = {
  _id: string;
  slug: string;
  title: string;
  categorySlug: string;
  status: string;
};

export default function AdminGuidesPage() {
  const router = useRouter();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    categorySlug: "ai-tools",
    description: "",
    status: "published",
  });

  useEffect(() => {
    clientApi.admin.verify().then((r) => {
      if (!r.ok) router.push("/admin/login");
      else clientApi.admin.guides.list().then((d) => setGuides(d.guides as Guide[]));
    });
  }, [router]);

  const create = async () => {
    await clientApi.admin.guides.create(form);
    const d = await clientApi.admin.guides.list();
    setGuides(d.guides as Guide[]);
    setForm({ slug: "", title: "", categorySlug: "ai-tools", description: "", status: "published" });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete guide?")) return;
    await clientApi.admin.guides.remove(id);
    setGuides((g) => g.filter((x) => x._id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link href="/admin/manage" className="text-sm text-indigo-600 hover:underline">
        ← Content hub
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Best guides</h1>

      <div className="mt-6 space-y-2 rounded-xl border p-4 bg-slate-50">
        <input
          placeholder="slug"
          className="w-full border rounded px-3 py-2 text-sm"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <input
          placeholder="title"
          className="w-full border rounded px-3 py-2 text-sm"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="categorySlug"
          className="w-full border rounded px-3 py-2 text-sm"
          value={form.categorySlug}
          onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
        />
        <button
          type="button"
          onClick={create}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white"
        >
          Add guide
        </button>
      </div>

      <ul className="mt-8 space-y-2">
        {guides.map((g) => (
          <li
            key={g._id}
            className="flex justify-between items-center border rounded-lg px-4 py-3"
          >
            <div>
              <p className="font-semibold">{g.title}</p>
              <p className="text-xs text-slate-500">
                /best/{g.slug} · {g.categorySlug} · {g.status}
              </p>
            </div>
            <button
              type="button"
              onClick={() => remove(g._id)}
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
