import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Layers, Newspaper, Sparkles, Wrench } from "lucide-react";
import { AI_STACKS, getStackBySlug } from "@/lib/aiStacks";
import { getAiNews } from "@/lib/aiNewsApi";
import { getToolsByCategory } from "@/lib/api";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { formatAiNewsTitle } from "@/lib/aiNewsFormat";
import { theme } from "@/lib/siteTheme";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return AI_STACKS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const stack = getStackBySlug(slug);
  if (!stack) return { title: "Stack not found" };
  return buildPageMetadata({
    title: `${stack.title} — AIWedia Stack`,
    description: stack.description,
    path: `/stacks/${slug}`,
  });
}

export default async function StackDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const stack = getStackBySlug(slug);
  if (!stack) notFound();

  const primaryCat = stack.categoryLinks[0]?.href.replace("/category/", "") || "ai-tools";
  const [categoryData, newsData] = await Promise.all([
    getToolsByCategory(primaryCat),
    stack.newsCategory
      ? getAiNews(1, 5, stack.newsCategory)
      : Promise.resolve({ items: [] }),
  ]);

  const tools = (categoryData?.tools ?? []).slice(0, 6);

  return (
    <main className={theme.page}>
      <div className={`bg-gradient-to-br ${stack.accent} text-white`}>
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <Link
            href="/stacks"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
          >
            <ArrowLeft size={16} />
            All stacks
          </Link>
          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-white/70">
            {stack.tagline}
          </p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">{stack.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{stack.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-12 px-4 py-12 sm:px-6">
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
            <Layers size={20} className="text-violet-600" />
            Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {stack.categoryLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:border-violet-200 hover:bg-violet-50"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </section>

        {tools.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Wrench size={20} className="text-violet-600" />
              Top tools in this stack
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tool/${primaryCat}/${t.slug}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-violet-200"
                >
                  <p className="font-bold text-slate-900">{t.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                    {t.description}
                  </p>
                </Link>
              ))}
            </div>
            <Link
              href={`/category/${primaryCat}`}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:underline"
            >
              View all in category
              <ArrowRight size={14} />
            </Link>
          </section>
        )}

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
            <Sparkles size={20} className="text-violet-600" />
            Prompts
          </h2>
          <div className="flex flex-wrap gap-3">
            {stack.promptLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-violet-500"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </section>

        {newsData.items.length > 0 && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Newspaper size={20} className="text-violet-600" />
              Related AI news
            </h2>
            <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
              {newsData.items.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/ai-news/${n.slug}`}
                    className="block px-4 py-3.5 text-sm font-semibold text-slate-800 hover:bg-violet-50"
                  >
                    {formatAiNewsTitle(n.title)}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={stack.newsCategory ? `/ai-news?category=${stack.newsCategory}` : "/ai-news"}
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-violet-700 hover:underline"
            >
              More news
              <ArrowRight size={14} />
            </Link>
          </section>
        )}

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-600">Missing a tool from this stack?</p>
          <Link
            href="/suggest-tool"
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
          >
            Submit your AI tool
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
