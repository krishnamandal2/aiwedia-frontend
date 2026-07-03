import Link from "next/link";
import { Layers, ArrowUpRight, Sparkles } from "lucide-react";
import { fetchCollections } from "@/lib/toolsApi";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildPageMetadata({
  title: "AI Tool Collections — Best-of Lists & Curated Stacks",
  description:
    "Best AI tools for students, coding, video, startups, and free tiers — plus curated stacks on AIWedia.",
  path: "/collections",
});

function CollectionCard({
  c,
}: {
  c: {
    slug: string;
    title: string;
    description: string;
    toolCount: number;
    featured?: boolean;
  };
}) {
  return (
    <Link
      href={`/collections/${c.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
    >
      <div className="mb-3 inline-flex rounded-xl bg-violet-100 p-2.5 text-violet-600">
        <Layers size={20} />
      </div>
      {c.featured && (
        <span className="mb-2 inline-block w-fit rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-800">
          Featured
        </span>
      )}
      <h2 className="text-lg font-bold text-slate-900 group-hover:text-violet-700">
        {c.title}
      </h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {c.description}
      </p>
      <p className="mt-3 text-xs font-medium text-slate-400">
        {c.toolCount} tools
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-600">
        Open collection
        <ArrowUpRight size={14} />
      </span>
    </Link>
  );
}

export default async function CollectionsPage() {
  const { collections } = await fetchCollections();

  const bestOf = collections.filter((c: { slug: string }) =>
    c.slug.startsWith("best-")
  );
  const stacks = collections.filter(
    (c: { slug: string }) => !c.slug.startsWith("best-")
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/40 via-white to-slate-50">
      <div className="border-b border-violet-100 bg-white/80">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-700">
            <Sparkles size={14} />
            Collections
          </span>
          <h1 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
            AI collections
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Best-of lists and curated stacks — pick a toolkit without comparing
            dozens of apps.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        {bestOf.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Best AI collections
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {bestOf.map((c: Parameters<typeof CollectionCard>[0]["c"]) => (
                <CollectionCard key={c.slug} c={c} />
              ))}
            </div>
          </section>
        )}

        {stacks.length > 0 && (
          <section>
            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Curated stacks
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {stacks.map((c: Parameters<typeof CollectionCard>[0]["c"]) => (
                <CollectionCard key={c.slug} c={c} />
              ))}
            </div>
          </section>
        )}

        {collections.length === 0 && (
          <p className="text-slate-500">
            No collections yet. Run{" "}
            <code className="rounded bg-slate-100 px-1">npm run seed:collections</code>{" "}
            on the backend.
          </p>
        )}
      </div>
    </div>
  );
}
