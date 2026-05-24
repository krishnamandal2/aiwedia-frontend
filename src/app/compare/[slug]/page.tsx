import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { fetchComparison } from "@/lib/toolsApi";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { SITE_URL } from "@/lib/seo/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type ToolSide = {
  title: string;
  slug: string;
  categorySlug: string;
  description?: string;
  image?: string;
  url?: string;
  detailUrl?: string;
  found?: boolean;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchComparison(slug);
  const cmp = data?.comparison as { title?: string; metaDescription?: string } | undefined;
  if (!cmp) return { title: "Comparison not found" };

  return buildPageMetadata({
    title: cmp.title || "Comparison",
    description: cmp.metaDescription || "",
    path: `/compare/${slug}`,
  });
}

export default async function CompareDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await fetchComparison(slug);
  if (!data?.comparison) notFound();

  const cmp = data.comparison as {
    title: string;
    summary: string;
    body?: string;
    verdict: string;
    criteria?: { label: string; winner: string; note?: string }[];
    keywords?: string[];
  };
  const toolA = data.toolA as ToolSide;
  const toolB = data.toolB as ToolSide;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cmp.title,
    description: cmp.summary,
    url: `${SITE_URL}/compare/${slug}`,
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/compare"
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-violet-700"
        >
          <ArrowLeft size={16} />
          All comparisons
        </Link>

        <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
          {cmp.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{cmp.summary}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[toolA, toolB].map((tool, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-violet-50">
                  {tool.image ? (
                    <Image
                      src={tool.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-bold text-violet-600">
                      {tool.title?.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-violet-600">
                    {idx === 0 ? "Option A" : "Option B"}
                  </p>
                  <h2 className="text-lg font-bold">{tool.title}</h2>
                </div>
              </div>
              {tool.description && (
                <p className="mt-3 text-sm text-slate-600 line-clamp-4">
                  {tool.description}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {tool.categorySlug && tool.slug && (
                  <Link
                    href={`/tool/${tool.categorySlug}/${tool.slug}`}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50"
                  >
                    Details on AIWedia
                  </Link>
                )}
                {tool.url && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-500"
                  >
                    Visit
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {cmp.criteria && cmp.criteria.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold">Criteria breakdown</h2>
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="p-3 font-semibold">Criteria</th>
                    <th className="p-3 font-semibold">Winner</th>
                    <th className="p-3 font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {cmp.criteria.map((row, i) => (
                    <tr key={i} className="border-t border-slate-100">
                      <td className="p-3">{row.label}</td>
                      <td className="p-3 font-medium capitalize">
                        {row.winner === "a"
                          ? toolA.title
                          : row.winner === "b"
                            ? toolB.title
                            : "Tie"}
                      </td>
                      <td className="p-3 text-slate-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {cmp.verdict && (
          <section className="mt-10 rounded-2xl border border-violet-200 bg-violet-50/50 p-6">
            <h2 className="text-lg font-bold text-violet-900">Verdict</h2>
            <p className="mt-2 text-slate-700">{cmp.verdict}</p>
          </section>
        )}

        {cmp.body && (
          <div
            className="prose prose-slate mt-8 max-w-none"
            dangerouslySetInnerHTML={{ __html: cmp.body }}
          />
        )}
      </div>
    </div>
  );
}
