import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";
import { getVerifiedRecentTools } from "@/lib/api";

export default async function HomeWhatsNew() {
  const { tools, subtitle } = await getVerifiedRecentTools(30, 12);
  if (!tools.length) return null;

  return (
    <section className="border-y border-slate-200/80 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-violet-600">
              <Sparkles size={14} />
              What&apos;s new
            </p>
            <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              Recently added tools
            </h2>
            {subtitle ? (
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            ) : null}
          </div>
          <Link
            href="/category/ai-tools"
            className="inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700"
          >
            View all AI tools
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((t) => (
            <Link
              key={`${t.categorySlug}-${t.slug}`}
              href={t.href}
              className="group flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-violet-300 hover:shadow-md"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-violet-50">
                {t.image ? (
                  <Image
                    src={t.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-xs font-bold text-violet-600">
                    {t.title.charAt(0)}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900 group-hover:text-violet-700">
                  {t.title}
                </p>
                <p className="text-[11px] font-medium text-violet-600">
                  {t.categoryTitle ?? t.categorySlug.replace(/-/g, " ")}
                </p>
                {t.description ? (
                  <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                    {t.description}
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
