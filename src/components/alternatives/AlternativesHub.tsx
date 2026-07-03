import Link from "next/link";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { fetchAlternatives } from "@/lib/alternativesApi";

export default async function AlternativesHub() {
  const { alternatives } = await fetchAlternatives();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 via-white to-slate-50">
      <section className="border-b border-indigo-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-800">
            <RefreshCw size={14} />
            Switch tools
          </div>
          <h1 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
            AI tool alternatives
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            “ChatGPT alternatives”, “Midjourney alternatives”, and more — curated
            picks with reasons, comparisons, and links to full reviews.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {alternatives.map((a) => (
            <Link
              key={a.slug}
              href={`/alternatives/${a.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                {a.focalTool?.title || a.slug}
              </p>
              <h2 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-indigo-700">
                {a.title}
              </h2>
              {a.summary && (
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">{a.summary}</p>
              )}
              <p className="mt-3 text-xs text-slate-400">
                {a.altCount ?? 0} alternatives
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                View list
                <ArrowUpRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        {alternatives.length === 0 && (
          <p className="text-center text-slate-500">
            Run{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
              npm run seed:alternatives
            </code>{" "}
            on the backend.
          </p>
        )}
      </div>
    </div>
  );
}
