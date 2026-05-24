import Link from "next/link";
import { Layers, ArrowUpRight } from "lucide-react";
import { fetchCollections } from "@/lib/toolsApi";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { theme } from "@/lib/siteTheme";

export const metadata = buildPageMetadata({
  title: "Curated AI Tool Collections",
  description:
    "Hand-picked stacks for SEO, vibe coding, and more — explore curated tool lists on AIWedia.",
  path: "/collections",
});

export default async function CollectionsPage() {
  const { collections } = await fetchCollections();

  return (
    <div className={theme.page}>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10">
          <span className={theme.badge}>Collections</span>
          <h1 className="mt-3 text-3xl font-black text-slate-900">
            Curated tool stacks
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Editor-curated bundles so you can adopt a proven toolkit without
            comparing dozens of apps.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {collections.map(
            (c: {
              slug: string;
              title: string;
              description: string;
              toolCount: number;
              featured?: boolean;
            }) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className={`block p-6 ${theme.card} ${theme.cardHover}`}
              >
                <div className="mb-3 inline-flex rounded-xl bg-indigo-100 p-2 text-indigo-700">
                  <Layers size={20} />
                </div>
                {c.featured && (
                  <span className="mb-2 inline-block rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold uppercase text-violet-700">
                    Featured
                  </span>
                )}
                <h2 className="text-lg font-bold text-slate-900">{c.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{c.description}</p>
                <p className="mt-3 text-xs font-medium text-slate-500">
                  {c.toolCount} tools
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-violet-600">
                  Open collection
                  <ArrowUpRight size={14} />
                </span>
              </Link>
            )
          )}
        </div>

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
