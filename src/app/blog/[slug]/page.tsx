"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import readingTime from "reading-time";
import BlogView from "@/blogsview/BlogView";

type Blog = {
  title: string;
  summary: string;
  content?: string;
  image?: string;
  fullImage?: string;
  date: string;
  slug: string;
};

export default function SingleBlogPage() {
  const { slug } = useParams();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [related, setRelated] = useState<Blog[]>([]);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/public/${slug}`, {
        cache: "no-store"
      }).then(res => res.json()),

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/public`, {
        cache: "no-store"
      }).then(res => res.json())

    ]).then(([blogData, allBlogs]) => {
      setBlog(blogData);
      setRelated(allBlogs.filter((b: Blog) => b.slug !== slug).slice(0, 3));
    });
  }, [slug]);

  const processed = useMemo(() => {
    if (!blog?.content) return { headings: [], html: "" };

    const headings: { id: string; text: string }[] = [];
    let html = blog.content;

    html = html.replace(/<(h[12])>(.*?)<\/\1>/gi, (match, tag, text, offset) => {
      const id = `heading-${offset}`;
      headings.push({ id, text: text.replace(/<[^>]*>?/gm, "") });
      return `<${tag} id="${id}" class="scroll-mt-24">${text}</${tag}>`;
    });

    return { headings, html };
  }, [blog]);

  const stats = readingTime(blog?.content || "");

  return (
    <BlogView
      blog={blog}
      related={related}
      headings={processed.headings}
      html={processed.html}
      readingText={stats.text}
    />
  );
}