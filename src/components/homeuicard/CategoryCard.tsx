import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const FALLBACK_IMAGE =
  "https://res.cloudinary.com/dj3vrogpl/image/upload/v1769150882/aiimag_a1g9uk.jpg";

export type CategoryCardVariant = "ai" | "web";

export interface CategoryCardProps {
  image: string;
  title: string;
  description: string;
  slug: string;
  variant?: CategoryCardVariant;
}

const ACCENT = {
  ai: {
    ring: "hover:ring-violet-300/80",
    badge: "bg-violet-100 text-violet-700",
    title: "group-hover:text-violet-700",
    cta: "text-violet-600",
    bar: "bg-violet-500",
    icon: "bg-violet-600 text-white",
  },
  web: {
    ring: "hover:ring-slate-300/80",
    badge: "bg-slate-100 text-slate-700",
    title: "group-hover:text-slate-900",
    cta: "text-slate-600",
    bar: "bg-slate-800",
    icon: "bg-slate-800 text-white",
  },
} as const;

export default function CategoryCard({
  image,
  title,
  description,
  slug,
  variant = "ai",
}: CategoryCardProps) {
  const a = ACCENT[variant];
  const src = image?.trim() ? image : FALLBACK_IMAGE;

  return (
    <Link
      href={`/category/${slug}`}
      prefetch={false}
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-2xl"
    >
      <article
        className={`flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${a.ring}`}
      >
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-slate-100">
          <Image
            src={src}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/5 to-transparent opacity-60 transition-opacity group-hover:opacity-70" />
          <span
            className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg shadow-md transition-transform duration-300 group-hover:scale-110 ${a.icon}`}
            aria-hidden
          >
            <ArrowUpRight size={16} />
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <div className="min-h-0 flex-1 space-y-2">
            <h3
              className={`text-base font-bold leading-snug text-slate-900 transition-colors sm:text-lg ${a.title}`}
            >
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-500 line-clamp-2">
              {description}
            </p>
          </div>

          <div
            className={`flex items-center gap-1.5 text-sm font-semibold ${a.cta}`}
          >
            Explore
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>

        <div
          className={`h-0.5 w-0 transition-all duration-500 group-hover:w-full ${a.bar}`}
        />
      </article>
    </Link>
  );
}
