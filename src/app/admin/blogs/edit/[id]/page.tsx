"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import BlogEditor from "@/blogscms/BlogEditor";
import { cleanHtml } from "@/utils/cleanHtml";

const API = process.env.NEXT_PUBLIC_API_URL 

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  

  useEffect(() => {
    if (!id) return;

    const init = async () => {
      try {
        const verify = await fetch(`${API}/api/admin/verify`, { credentials: "include" });
        if (!verify.ok) return router.push("/admin/login");

        const res = await fetch(`${API}/api/blogs/admin/${id}`, { credentials: "include" });
        if (!res.ok) throw new Error("Blog not found");

        const blog = await res.json();

        setTitle(blog.title);
        setSummary(blog.summary);
        setImage(blog.image || "");
        setStatus(blog.status || "draft");
       setContent(blog.content || "");

        setLoading(false);
        
      } catch (err) {
        alert("Something went wrong");
        router.push("/admin/dashboard");
      }
    };

    init();
  }, [id, router]);

  const updateBlog = async () => {
    
    if (!title || !summary || !content) {
      alert("Please fill all required fields");
      return;
    }

    setSaving(true);
     
    
  const cleanedContent = cleanHtml(content);
  
    const res = await fetch(`${API}/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        summary,
        image,
        status,
        content: cleanedContent, 
      }),
    });

    if (!res.ok) {
      alert("Failed to update blog");
      setSaving(false);
      return;
    }

    router.push("/admin/dashboard");
  };

  if (loading) return <p className="max-w-5xl mx-auto p-6">Loading blog...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Blog</h1>

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
          <option value="published">Published</option>
        </select>

        <div className="flex gap-3">
          <button onClick={() => router.push("/admin/dashboard")} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={updateBlog}
            disabled={saving}
            className={`bg-indigo-600 text-white px-6 py-2 rounded ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {saving ? "Saving..." : "Update Blog"}
          </button>
        </div>
      </div>
    </div>
  );
}
