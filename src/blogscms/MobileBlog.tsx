"use client";

import readingTime from "reading-time";

type Blog = {
  title: string;
  summary: string;
  content?: string;
  image?: string;
  fullImage?: string;
  date: string;
};

export default function MobileBlog({ blog }: { blog: Blog }) {

  const stats = readingTime(blog.content || "");

  return (
    <div className="px-4 py-8 max-w-2xl mx-auto">

      <div className="text-xs text-gray-500 mb-4 flex gap-2">
        <span>{new Date(blog.date).toDateString()}</span>
        <span>•</span>
        <span>{stats.text}</span>
      </div>

      <h1 className="text-3xl font-semibold mb-4">
        {blog.title}
      </h1>

      <p className="text-gray-500 italic mb-6">
        {blog.summary}
      </p>

      <img
        src={blog.fullImage || blog.image}
        alt={blog.title}
        className="w-full h-[220px] object-cover rounded-xl mb-8"
      />

      <article
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content || "" }}
      />

    </div>
  );
}