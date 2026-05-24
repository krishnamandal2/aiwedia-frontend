"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clientApi } from "@/lib/api-client";

type Cat = {
  _id: string;
  slug: string;
  title: string;
  desc?: string;
  seoIntro?: string;
  faq?: { question: string; answer: string }[];
};

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [cats, setCats] = useState<Cat[]>([]);
  const [selected, setSelected] = useState<Cat | null>(null);
  const [faqJson, setFaqJson] = useState("[]");

  useEffect(() => {
    clientApi.admin.verify().then((r) => {
      if (!r.ok) router.push("/admin/login");
      else clientApi.admin.categories.list().then((d) => setCats(d.categories as Cat[]));
    });
  }, [router]);

  const save = async () => {
    if (!selected) return;
    let faq = [];
    try {
      faq = JSON.parse(faqJson);
    } catch {
      alert("Invalid FAQ JSON");
      return;
    }
    await clientApi.admin.categories.update(selected._id, {
      desc: selected.desc,
      seoIntro: selected.seoIntro,
      faq,
    });
    alert("Saved");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href="/admin/manage" className="text-sm text-indigo-600 hover:underline">
        ← Content hub
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Categories</h1>

      <div className="mt-6 grid sm:grid-cols-2 gap-6">
        <ul className="max-h-[60vh] overflow-y-auto border rounded-lg divide-y">
          {cats.map((c) => (
            <li key={c._id}>
              <button
                type="button"
                className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                onClick={() => {
                  setSelected(c);
                  setFaqJson(JSON.stringify(c.faq || [], null, 2));
                }}
              >
                {c.title}
              </button>
            </li>
          ))}
        </ul>

        {selected && (
          <div className="space-y-3 border rounded-lg p-4">
            <p className="font-bold">{selected.title}</p>
            <textarea
              className="w-full border rounded p-2 text-sm min-h-[80px]"
              placeholder="Description"
              value={selected.desc || ""}
              onChange={(e) =>
                setSelected({ ...selected, desc: e.target.value })
              }
            />
            <textarea
              className="w-full border rounded p-2 text-sm min-h-[60px]"
              placeholder="SEO intro"
              value={selected.seoIntro || ""}
              onChange={(e) =>
                setSelected({ ...selected, seoIntro: e.target.value })
              }
            />
            <textarea
              className="w-full border rounded p-2 text-xs font-mono min-h-[120px]"
              value={faqJson}
              onChange={(e) => setFaqJson(e.target.value)}
            />
            <button
              type="button"
              onClick={save}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white"
            >
              Save category
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
