import Link from "next/link";
import {
  ArrowUpRight,
  GraduationCap,
  Infinity,
  Rocket,
  Sparkles,
} from "lucide-react";
import DealCard from "@/components/deals/DealCard";
import { DEAL_TYPES, type AiDeal, type DealType } from "@/lib/dealsApi";

const ICONS = {
  lifetime: Infinity,
  student: GraduationCap,
  startup: Rocket,
};

type Props = {
  deals: AiDeal[];
  featuredByType?: Partial<Record<DealType, AiDeal[]>>;
};

export default function DealsHub({ deals, featuredByType }: Props) {
  const counts = Object.keys(DEAL_TYPES).reduce(
    (acc, key) => {
      acc[key as DealType] = deals.filter((d) => d.dealType === key).length;
      return acc;
    },
    {} as Record<DealType, number>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-violet-50/30">
      <section className="relative overflow-hidden border-b border-amber-200/50 bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(245,158,11,0.15),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
            <Sparkles size={14} />
            Save on AI
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            AI Deals & Discounts
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Lifetime deals, student discounts, and startup credits — curated so you
            pay less for the AI stack you need.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-3">
          {(Object.keys(DEAL_TYPES) as DealType[]).map((type) => {
            const meta = DEAL_TYPES[type];
            const Icon = ICONS[meta.icon as keyof typeof ICONS] || Sparkles;
            return (
              <Link
                key={type}
                href={`/deals/${type}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${meta.accent} p-3 text-white shadow-lg`}
                >
                  <Icon size={22} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-violet-700">
                  {meta.label}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {meta.description}
                </p>
                <p className="mt-3 text-xs font-semibold text-slate-400">
                  {counts[type]} deal{counts[type] !== 1 ? "s" : ""}
                </p>
                <ArrowUpRight
                  size={18}
                  className="absolute right-4 top-4 text-slate-300 transition group-hover:text-violet-500"
                />
              </Link>
            );
          })}
        </div>

        {deals.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-6 text-xl font-bold text-slate-900">Featured deals</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {deals
                .filter((d) => d.featured)
                .slice(0, 6)
                .map((deal) => (
                  <DealCard key={deal.slug} deal={deal} />
                ))}
            </div>
          </div>
        )}

        {(Object.keys(DEAL_TYPES) as DealType[]).map((type) => {
          const sectionDeals = featuredByType?.[type] || deals.filter((d) => d.dealType === type).slice(0, 3);
          if (!sectionDeals.length) return null;
          const meta = DEAL_TYPES[type];
          return (
            <div key={type} className="mt-14">
              <div className="mb-5 flex items-end justify-between gap-4">
                <h2 className="text-xl font-bold text-slate-900">{meta.label}</h2>
                <Link
                  href={`/deals/${type}`}
                  className="text-sm font-semibold text-violet-600 hover:underline"
                >
                  View all →
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {sectionDeals.map((deal) => (
                  <DealCard key={deal.slug} deal={deal} />
                ))}
              </div>
            </div>
          );
        })}

        {deals.length === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            No deals yet. Run{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
              npm run seed:deals
            </code>{" "}
            on the backend.
          </p>
        )}
      </section>
    </div>
  );
}
