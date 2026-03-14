import Link from "next/link";
import Image from "next/image";

type BlogCardProps = {
  slug: string;
  title: string;
  summary: string;
  image?: string;
  date: string;
  category?: string;
  readingTime?: string;
};

export default function BlogCard({
  slug,
  title,
  summary,
  image,
  date,
  category = "Article",
  readingTime = "5 min read",
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <article className="flex flex-col h-full overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300">

        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={image || "/default-blog.jpg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* Category */}
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition">
            {title}
          </h2>

          {/* Summary */}
          <p className="text-gray-600 text-sm mt-3 line-clamp-3 leading-relaxed">
            {summary}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">

            {/* Date + Reading Time */}
            <div className="text-xs text-gray-400 flex gap-2">
              <span>{date}</span>
              <span>•</span>
              <span>{readingTime}</span>
            </div>

            {/* Read More */}
            <span className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
              Read
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>

          </div>
        </div>
      </article>
    </Link>
  );
}