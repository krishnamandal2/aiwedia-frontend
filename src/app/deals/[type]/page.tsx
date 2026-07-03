import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import DealCard from "@/components/deals/DealCard";
import { DEAL_TYPES, fetchDeals, type DealType } from "@/lib/dealsApi";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { type } = await params;
  const meta = DEAL_TYPES[type as DealType];
  if (!meta) return { title: "Deals not found" };

  return buildPageMetadata({
    title: `${meta.label} — AI Deals`,
    description: meta.description,
    path: `/deals/${type}`,
  });
}

export default async function DealsTypePage({ params }: PageProps) {
  const { type } = await params;
  const meta = DEAL_TYPES[type as DealType];
  if (!meta) notFound();

  const { deals } = await fetchDeals(type as DealType);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <Link
            href="/deals"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:underline"
          >
            <ArrowLeft size={16} />
            All deals
          </Link>
          <h1 className="text-3xl font-black text-slate-900">{meta.label}</h1>
          <p className="mt-2 max-w-2xl text-slate-600">{meta.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {deals.length === 0 ? (
          <p className="text-center text-slate-500">No deals in this category yet.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((deal) => (
              <DealCard key={deal.slug} deal={deal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
