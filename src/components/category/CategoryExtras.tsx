import Link from "next/link";
import { BookOpen, GitCompare, HelpCircle } from "lucide-react";
import ToolDirectoryCard, {
  type DirectoryTool,
} from "@/components/tools/ToolDirectoryCard";
import type { CategoryResponse, FaqItem } from "@/lib/types";
import { theme } from "@/lib/siteTheme";

export default function CategoryExtras({ data }: { data: CategoryResponse }) {
  const faq = data.faq ?? [];
  const related = (data.relatedTools ?? []) as DirectoryTool[];
  const guides = data.relatedGuides ?? [];
  const comparisons = data.relatedComparisons ?? [];

  if (!faq.length && !related.length && !guides.length && !comparisons.length) {
    return null;
  }

  return (
    <div className="border-t border-slate-200 bg-slate-50/50">
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 sm:py-16">
        {data.seoIntro && (
          <section className="max-w-3xl">
            <p className="text-base leading-relaxed text-slate-600">
              {data.seoIntro}
            </p>
          </section>
        )}

        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Related tools you may like
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Editor picks and top tools from this category
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((t) => (
                <ToolDirectoryCard
                  key={`${t.categorySlug}-${t.slug}`}
                  tool={t}
                />
              ))}
            </div>
          </section>
        )}

        {(guides.length > 0 || comparisons.length > 0) && (
          <section className="grid gap-6 sm:grid-cols-2">
            {guides.length > 0 && (
              <div className={`p-5 ${theme.card}`}>
                <h3 className="flex items-center gap-2 font-bold text-slate-900">
                  <BookOpen size={18} className="text-violet-600" />
                  Best-of guides
                </h3>
                <ul className="mt-3 space-y-2">
                  {guides.map((g) => (
                    <li key={g.slug}>
                      <Link
                        href={g.href}
                        className="text-sm font-semibold text-violet-600 hover:underline"
                      >
                        {g.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {comparisons.length > 0 && (
              <div className={`p-5 ${theme.card}`}>
                <h3 className="flex items-center gap-2 font-bold text-slate-900">
                  <GitCompare size={18} className="text-violet-600" />
                  Comparisons
                </h3>
                <ul className="mt-3 space-y-2">
                  {comparisons.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={c.href}
                        className="text-sm font-semibold text-violet-600 hover:underline"
                      >
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {faq.length > 0 && (
          <section id="faq">
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
              <HelpCircle size={20} className="text-violet-600" />
              Frequently asked questions
            </h2>
            <dl className="mt-6 space-y-4">
              {faq.map((item: FaqItem, i: number) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <dt className="font-semibold text-slate-900">
                    {item.question}
                  </dt>
                  <dd className="mt-2 text-sm text-slate-600">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </div>
    </div>
  );
}
