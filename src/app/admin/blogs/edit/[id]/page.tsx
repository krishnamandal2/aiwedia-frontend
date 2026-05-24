"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import BlogAdminForm from "@/blogscms/BlogAdminForm";
import { cleanHtml } from "@/utils/cleanHtml";

const API = process.env.NEXT_PUBLIC_API_URL;

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
        const verify = await fetch(`${API}/api/admin/verify`, {
          credentials: "include",
        });
        if (!verify.ok) return router.push("/admin/login");

        const res = await fetch(`${API}/api/blogs/admin/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Blog not found");

        const blog = await res.json();
        setTitle(blog.title);
        setSummary(blog.summary);
        setImage(blog.image || "");
        setStatus(blog.status || "draft");
        setContent(blog.content || "");
        setLoading(false);
      } catch {
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

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
        Loading article…
      </div>
    );
  }

  return (
    <BlogAdminForm
      pageTitle="Edit article"
      title={title}
      setTitle={setTitle}
      summary={summary}
      setSummary={setSummary}
      image={image}
      setImage={setImage}
      content={content}
      setContent={setContent}
      status={status}
      setStatus={setStatus}
      onSubmit={updateBlog}
      onCancel={() => router.push("/admin/dashboard")}
      submitLabel="Save changes"
      loading={saving}
    />
  );
}
