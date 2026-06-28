"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SECTIONS = [
  { href: "/admin/dashboard", title: "Blogs", desc: "Create & edit blog posts" },
  { href: "/admin/submissions", title: "Tool submissions", desc: "Approve user suggestions" },
  { href: "/admin/prompts", title: "Prompt library", desc: "AI prompts for /prompts" },
  { href: "/admin/comments", title: "Comments", desc: "Moderate blog comments" },
  { href: "/admin/newsletter", title: "Newsletter", desc: "Subscriber stats" },
  { href: "/admin/ai-news", title: "AI News RSS", desc: "Auto-fetch & refresh feeds" },
  { href: "/admin/guides", title: "Best guides", desc: "SEO landing guides (DB)" },
  { href: "/admin/comparisons", title: "Comparisons", desc: "Tool vs tool pages" },
  { href: "/admin/categories", title: "Categories", desc: "FAQ, descriptions, SEO intro" },
  { href: "/admin/tools", title: "Tools", desc: "Edit ranks, scores, affiliate URLs" },
];

export default function AdminManageHub() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API}/api/admin/verify`, { credentials: "include" }).then((r) => {
      if (!r.ok) router.push("/admin/login");
    });
  }, [API, router]);

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10">
      <h1 className="text-2xl font-bold text-slate-900">Content management</h1>
      <p className="mt-2 text-slate-600 text-sm">
        All data is stored in MongoDB and served via the API — update here without
        redeploying the frontend.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition"
          >
            <h2 className="font-bold text-slate-900">{s.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
