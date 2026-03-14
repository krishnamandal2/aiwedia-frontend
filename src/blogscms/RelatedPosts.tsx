"use client";

import Link from "next/link";
import Image from "next/image";

type Blog = {
  title: string;
  summary?: string;
  image?: string;
  slug: string;
  date?: string;
  readingTime?: string;
};

export default function RelatedPosts({ posts }: { posts: Blog[] }) {
  if (!posts?.length) return null;

  return (
    <section className="mt-20 pt-12 border-t">
      <div className="max-w-4xl mx-auto px-4">

        <h3 className="text-xl sm:text-2xl font-bold mb-8 sm:mb-10 text-gray-900">
          More like this
        </h3>

        <div className="space-y-10">

          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col sm:flex-row gap-5 sm:gap-6"
            >

              {/* Image */}
              {p.image && (
                <div className="relative w-full sm:w-32 h-52 sm:h-24 flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 128px"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}

              {/* Text Content */}
              <div className="flex-1">

                {/* Meta */}
                {(p.date || p.readingTime) && (
                  <div className="text-xs text-gray-500 mb-2">
                    {p.date && <span>{p.date}</span>}
                    {p.date && p.readingTime && <span> • </span>}
                    {p.readingTime && <span>{p.readingTime}</span>}
                  </div>
                )}

                {/* Title */}
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug group-hover:underline">
                  {p.title}
                </h4>

                {/* Summary */}
                {p.summary && (
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {p.summary}
                  </p>
                )}

              </div>

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}