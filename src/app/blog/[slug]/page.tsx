"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type BlogSection = {
  text?: string;
  image?: string;
};

type Blog = {
  title: string;
  summary: string;
  content?: BlogSection[];
  image?: string;
  fullImage?: string;
  date: string;
};

export default function SingleBlog() {
  const { slug } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/public/${slug}`)
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, [slug]);

  if (!blog) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Back Button */}
      <div className="flex justify-start">
        <button
          onClick={() => router.back()}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm"
        >
          &larr; Back
        </button>
      </div>

      {/* Blog Full Image */}
      <img
        src={blog.fullImage || blog.image}
        alt={blog.title}
        className="w-full h-64 object-cover rounded"
      />

      {/* Title and Summary */}
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-gray-600">{blog.summary}</p>

      {/* Blog Content */}
      <div className="space-y-4">
        {blog.content?.map((section, idx) => {
          if (!section.text) return null;

          // Split block by lines
          const lines = section.text.split("\n").map((l) => l.trim()).filter(Boolean);

          if (lines.length === 0) return null;

          // First line as heading if it looks like a heading (you can improve this logic)
          const heading = lines[0];
          const rest = lines.slice(1);

          return (
            <div key={idx} className="space-y-2">
              <h2 className="text-2xl font-bold">{heading}</h2>

              {rest.length > 0 && rest[0].startsWith("-") ? (
                <ul className="list-disc ml-5 space-y-1">
                  {rest.map((line, i) => (
                    <li key={i}>{line.replace(/^- /, "")}</li>
                  ))}
                </ul>
              ) : (
                rest.map((line, i) => <p key={i}>{line}</p>)
              )}
            </div>
          );
        })}
      </div>

      {/* Date */}
      <p className="text-gray-500">{new Date(blog.date).toLocaleDateString()}</p>
    </div>
  );
}
