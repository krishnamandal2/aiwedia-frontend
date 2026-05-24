import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar } from "lucide-react";

export type BlogCardItem = {
  slug: string;
  title: string;
  summary: string;
  image?: string;
  date: string;
  category?: string;
};

type BlogCardProps = BlogCardItem & {
  /** Legacy: pass full blog object from API */
  blog?: BlogCardItem;
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function BlogCard(props: BlogCardProps) {
  const data = props.blog ?? props;
  const {
    slug,
    title,
    summary,
    image,
    date,
    category = "AI & Tools",
  } = data;

  if (!slug || !title) return null;
  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] transition duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-900/20">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={
              image ||
              "https://res.cloudinary.com/dj3vrogpl/image/upload/v1768645475/aitools_wn5tnv.jpg"
            }
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06060c] via-transparent to-transparent" />
          <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-200 backdrop-blur-md">
            {category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-1.5 text-[11px] text-slate-500">
            <Calendar size={12} />
            {formatDate(date)}
          </div>

          <h2 className="line-clamp-2 text-lg font-bold leading-snug text-white transition group-hover:text-violet-200">
            {title}
          </h2>

          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">
            {summary}
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-400 transition group-hover:gap-2 group-hover:text-violet-300">
            Read article
            <ArrowUpRight size={16} />
          </span>
        </div>
      </article>
    </Link>
  );
}
