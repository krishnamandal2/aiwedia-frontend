import Link from "next/link";
import { ArrowRight, Sparkles, Globe } from "lucide-react";
import CategoryCard, { type CategoryCardVariant } from "./CategoryCard";

type Category = {
  slug: string;
  title: string;
  desc: string;
  image: string;
};

type Props = {
  id?: string;
  title: string;
  description: string;
  categories: Category[];
  viewAllLink?: string;
  variant?: CategoryCardVariant;
};

export default function CategorySection({
  id,
  title,
  description,
  categories,
  viewAllLink,
  variant = "ai",
}: Props) {
  if (!categories.length) return null;

  const isAi = variant === "ai";

  return (
    <section
      id={id}
      className={`scroll-mt-24 py-14 sm:py-20 ${
        isAi
          ? "bg-gradient-to-b from-violet-50/40 via-white to-white"
          : "bg-gradient-to-b from-slate-50/80 via-white to-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header — SaaS-style */}
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div
              className={`mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                isAi
                  ? "bg-violet-100 text-violet-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {isAi ? (
                <Sparkles size={14} className="text-violet-600" />
              ) : (
                <Globe size={14} className="text-slate-600" />
              )}
              {isAi ? "AI directory" : "Web & utilities"}
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
              {description}
            </p>
          </div>

          {viewAllLink && (
            <Link
              href={viewAllLink}
              className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold transition ${
                isAi
                  ? "border-violet-200 bg-white text-violet-700 shadow-sm hover:border-violet-300 hover:bg-violet-50"
                  : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              View all
              <ArrowRight size={16} />
            </Link>
          )}
        </div>

        {/* Vertical list on mobile; responsive grid on tablet+ */}
        <ul
          className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-7"
          role="list"
        >
          {categories.map((cat) => (
            <li key={cat.slug} className="min-w-0 w-full">
              <CategoryCard
                image={cat.image}
                title={cat.title}
                description={cat.desc}
                slug={cat.slug}
                variant={variant}
              />
            </li>
          ))}
        </ul>

        {viewAllLink && (
          <div className="mt-10 text-center md:hidden">
            <Link
              href={viewAllLink}
              className="inline-flex items-center gap-2 text-sm font-bold text-violet-600 hover:underline"
            >
              View all categories
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
