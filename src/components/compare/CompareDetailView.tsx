import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  ExternalLink,
  Minus,
  Server,
  Trophy,
} from "lucide-react";
import type {
  ComparisonCriterion,
  ComparisonDoc,
  ComparisonToolRef,
  ToolSpecs,
} from "@/lib/compareTypes";
import { API_ROWS, PRICING_ROWS } from "@/lib/compareTypes";

type Props = {
  comparison: ComparisonDoc;
  toolA: ComparisonToolRef;
  toolB: ComparisonToolRef;
};

function ToolAvatar({ tool }: { tool: ComparisonToolRef }) {
  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white shadow-md ring-2 ring-white sm:h-20 sm:w-20">
      {tool.image ? (
        <Image
          src={tool.image}
          alt=""
          fill
          className="object-cover"
          sizes="80px"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-black text-white">
          {tool.title?.charAt(0)}
        </span>
      )}
    </div>
  );
}

function SpecTable({
  title,
  icon: Icon,
  accent,
  rows,
  specsA,
  specsB,
  toolAName,
  toolBName,
}: {
  title: string;
  icon: typeof DollarSign;
  accent: "emerald" | "sky";
  rows: { key: keyof ToolSpecs; label: string }[];
  specsA?: ToolSpecs;
  specsB?: ToolSpecs;
  toolAName: string;
  toolBName: string;
}) {
  const headerBg =
    accent === "emerald"
      ? "bg-emerald-50 text-emerald-900"
      : "bg-sky-50 text-sky-900";
  const iconColor = accent === "emerald" ? "text-emerald-500" : "text-sky-500";

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className={`flex items-center gap-2 border-b border-slate-100 px-5 py-4 ${headerBg}`}>
        <Icon size={20} className={iconColor} />
        <h2 className="text-lg font-bold">{title}</h2>
      </div>

      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-left">
              <th className="w-1/4 p-4 font-semibold text-slate-500">Spec</th>
              <th className="w-[37.5%] p-4 font-semibold text-violet-700">{toolAName}</th>
              <th className="w-[37.5%] p-4 font-semibold text-indigo-700">{toolBName}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ key, label }) => (
              <tr key={key} className="border-t border-slate-100">
                <td className="p-4 font-medium text-slate-600">{label}</td>
                <td className="p-4 text-slate-800">{specsA?.[key] || "—"}</td>
                <td className="p-4 text-slate-800">{specsB?.[key] || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-slate-100 sm:hidden">
        {rows.map(({ key, label }) => (
          <div key={key} className="p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              {label}
            </p>
            <div className="mt-3 grid gap-3">
              <div className="rounded-xl bg-violet-50/80 p-3">
                <p className="text-[10px] font-bold uppercase text-violet-600">
                  {toolAName}
                </p>
                <p className="mt-1 text-sm text-slate-800">{specsA?.[key] || "—"}</p>
              </div>
              <div className="rounded-xl bg-indigo-50/80 p-3">
                <p className="text-[10px] font-bold uppercase text-indigo-600">
                  {toolBName}
                </p>
                <p className="mt-1 text-sm text-slate-800">{specsB?.[key] || "—"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CriterionCard({
  row,
  toolAName,
  toolBName,
}: {
  row: ComparisonCriterion;
  toolAName: string;
  toolBName: string;
}) {
  const winnerLabel =
    row.winner === "a"
      ? toolAName
      : row.winner === "b"
        ? toolBName
        : "Tie";

  const isTie = row.winner === "tie";

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold text-slate-900">{row.label}</h3>
        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
            isTie
              ? "bg-slate-100 text-slate-600"
              : "bg-amber-100 text-amber-800"
          }`}
        >
          {isTie ? <Minus size={12} /> : <Trophy size={12} />}
          {winnerLabel}
        </span>
      </div>
      {row.note && (
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{row.note}</p>
      )}
    </div>
  );
}

export default function CompareDetailView({
  comparison: cmp,
  toolA,
  toolB,
}: Props) {
  const specsA = cmp.specsA;
  const specsB = cmp.specsB;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-violet-50/30">
      <div className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-violet-700"
          >
            <ArrowLeft size={16} />
            All comparisons
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-violet-100">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(139,92,246,0.12),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <h1 className="text-center text-2xl font-black text-slate-900 sm:text-4xl">
            {cmp.title}
          </h1>
          {cmp.summary && (
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600">
              {cmp.summary}
            </p>
          )}

          <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-4">
            {[toolA, toolB].map((tool, idx) => (
              <div
                key={idx}
                className={`flex w-full max-w-sm flex-col items-center rounded-2xl border bg-white p-6 shadow-lg ${
                  idx === 0
                    ? "border-violet-200 ring-2 ring-violet-100"
                    : "border-indigo-200 ring-2 ring-indigo-100"
                }`}
              >
                <ToolAvatar tool={tool} />
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {idx === 0 ? "Option A" : "Option B"}
                </p>
                <h2 className="mt-1 text-xl font-black text-slate-900">{tool.title}</h2>
                {tool.description && (
                  <p className="mt-2 line-clamp-3 text-center text-sm text-slate-500">
                    {tool.description}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {tool.categorySlug && tool.slug && (
                    <Link
                      href={`/tool/${tool.categorySlug}/${tool.slug}`}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      AIWedia profile
                    </Link>
                  )}
                  {tool.url && (
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-500"
                    >
                      Visit site
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}

            <div
              className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-sm font-black text-white shadow-lg"
              aria-hidden
            >
              VS
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
        <SpecTable
          title="Pricing"
          icon={DollarSign}
          accent="emerald"
          rows={PRICING_ROWS}
          specsA={specsA}
          specsB={specsB}
          toolAName={toolA.title}
          toolBName={toolB.title}
        />

        <SpecTable
          title="API & limits"
          icon={Server}
          accent="sky"
          rows={API_ROWS}
          specsA={specsA}
          specsB={specsB}
          toolAName={toolA.title}
          toolBName={toolB.title}
        />

        {cmp.criteria && cmp.criteria.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Feature comparison
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {cmp.criteria.map((row, i) => (
                <CriterionCard
                  key={i}
                  row={row}
                  toolAName={toolA.title}
                  toolBName={toolB.title}
                />
              ))}
            </div>
          </section>
        )}

        {cmp.verdict && (
          <section className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-violet-800">
              <CheckCircle2 size={22} />
              <h2 className="text-lg font-bold">Verdict</h2>
            </div>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">{cmp.verdict}</p>
          </section>
        )}

        {cmp.body && (
          <div
            className="prose prose-slate max-w-none rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
            dangerouslySetInnerHTML={{ __html: cmp.body }}
          />
        )}
      </div>
    </div>
  );
}
