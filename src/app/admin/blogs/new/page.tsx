"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlogEditor from "@/components/BlogEditor";
import { textToContentArray } from "@/utils/textToContentArray";

const API = process.env.NEXT_PUBLIC_API_URL 

export default function NewBlog() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState(""); // plain-text
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(false);

  // 🔐 Verify admin
  useEffect(() => {
    const verifyAdmin = async () => {
      const res = await fetch(`${API}/api/admin/verify`, { credentials: "include" });
      if (!res.ok) router.push("/admin/login");
    };
    verifyAdmin();
  }, [router]);

  // Slug generator
  const generateSlug = (text: string) =>
    text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

  // Create blog
  const createBlog = async () => {
    if (!title || !summary || !content) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/api/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          slug: generateSlug(title),
          summary,
          image,
          status,
          date: new Date().toISOString(),
          content: textToContentArray(content), // ✅ convert plain text
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create blog");

      alert("Blog created successfully");
      router.push("/admin/dashboard");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => router.push("/admin/dashboard")} className="text-sm text-gray-600 hover:text-black">
          ← Back
        </button>
        <h1 className="text-2xl font-bold">Create New Blog</h1>
      </div>

      <input
        className="w-full border p-3 rounded"
        placeholder="Blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-3 rounded min-h-[100px]"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <input
        className="w-full border p-3 rounded"
        placeholder="Cover image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <div>
        <label className="font-semibold block mb-2">Blog Content</label>
        <BlogEditor value={content} onChange={setContent} />
      </div>

      <div className="flex items-center justify-between gap-4">
        <select className="border p-2 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="draft">Draft</option>
          <option value="published">Publish</option>
        </select>

        <div className="flex gap-3">
          <button onClick={() => router.push("/admin/blogs")} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={createBlog}
            disabled={loading}
            className={`bg-indigo-600 text-white px-6 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </div>
      </div>
    </div>
  );
}
