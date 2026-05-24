"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlogAdminForm from "@/blogscms/BlogAdminForm";
import { cleanHtml } from "@/utils/cleanHtml";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function NewBlog() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("published");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const res = await fetch(`${API}/api/admin/verify`, {
        credentials: "include",
      });
      if (!res.ok) router.push("/admin/login");
    };
    verifyAdmin();
  }, [router]);

  const generateSlug = (text: string) =>
    text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

  const createBlog = async () => {
    if (!title || !summary || !content) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const cleanedContent = cleanHtml(content);
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
          content: cleanedContent,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create blog");

      alert("Blog created successfully");
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlogAdminForm
      pageTitle="Create new article"
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
      onSubmit={createBlog}
      onCancel={() => router.push("/admin/dashboard")}
      submitLabel="Publish article"
      loading={loading}
    />
  );
}
