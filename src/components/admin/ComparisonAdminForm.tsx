"use client";

import { Plus, Trash2, Wand2 } from "lucide-react";

export type ToolRefForm = {
  categorySlug: string;
  toolSlug: string;
  title: string;
};

export type ToolSpecsForm = {
  pricing: string;
  freeTier: string;
  apiAccess: string;
  apiLimit: string;
  rateLimit: string;
  contextWindow: string;
  bestFor: string;
};

export type CriterionForm = {
  label: string;
  winner: "a" | "b" | "tie";
  note: string;
};

export type ComparisonFormData = {
  slug: string;
  title: string;
  summary: string;
  metaDescription: string;
  toolA: ToolRefForm;
  toolB: ToolRefForm;
  specsA: ToolSpecsForm;
  specsB: ToolSpecsForm;
  criteria: CriterionForm[];
  verdict: string;
  body: string;
  keywords: string;
  status: "draft" | "published";
  rank: number;
};

export const SPEC_FIELDS: { key: keyof ToolSpecsForm; label: string }[] = [
  { key: "pricing", label: "Plans & pricing" },
  { key: "freeTier", label: "Free tier" },
  { key: "apiAccess", label: "API access" },
  { key: "apiLimit", label: "API limits / quota" },
  { key: "rateLimit", label: "Rate limits" },
  { key: "contextWindow", label: "Context window" },
  { key: "bestFor", label: "Best for" },
];

export function emptySpecs(): ToolSpecsForm {
  return {
    pricing: "",
    freeTier: "",
    apiAccess: "",
    apiLimit: "",
    rateLimit: "",
    contextWindow: "",
    bestFor: "",
  };
}

export function emptyComparison(): ComparisonFormData {
  return {
    slug: "",
    title: "",
    summary: "",
    metaDescription: "",
    toolA: { categorySlug: "ai-tools", toolSlug: "", title: "" },
    toolB: { categorySlug: "ai-tools", toolSlug: "", title: "" },
    specsA: emptySpecs(),
    specsB: emptySpecs(),
    criteria: [
      { label: "Pricing value", winner: "tie", note: "" },
      { label: "API access", winner: "tie", note: "" },
    ],
    verdict: "",
    body: "",
    keywords: "",
    status: "published",
    rank: 0,
  };
}

export function comparisonToForm(c: Record<string, unknown>): ComparisonFormData {
  const toolA = (c.toolA as ToolRefForm) || emptyComparison().toolA;
  const toolB = (c.toolB as ToolRefForm) || emptyComparison().toolB;
  const specsA = { ...emptySpecs(), ...((c.specsA as ToolSpecsForm) || {}) };
  const specsB = { ...emptySpecs(), ...((c.specsB as ToolSpecsForm) || {}) };
  const criteria = ((c.criteria as CriterionForm[]) || []).map((row) => ({
    label: row.label || "",
    winner: (row.winner as CriterionForm["winner"]) || "tie",
    note: row.note || "",
  }));
  const keywords = Array.isArray(c.keywords)
    ? (c.keywords as string[]).join(", ")
    : "";

  return {
    slug: String(c.slug || ""),
    title: String(c.title || ""),
    summary: String(c.summary || ""),
    metaDescription: String(c.metaDescription || ""),
    toolA,
    toolB,
    specsA,
    specsB,
    criteria: criteria.length ? criteria : emptyComparison().criteria,
    verdict: String(c.verdict || ""),
    body: String(c.body || ""),
    keywords,
    status: (c.status as ComparisonFormData["status"]) || "published",
    rank: Number(c.rank) || 0,
  };
}

export function formToPayload(form: ComparisonFormData) {
  return {
    slug: form.slug.trim(),
    title: form.title.trim(),
    summary: form.summary.trim(),
    metaDescription: form.metaDescription.trim(),
    toolA: {
      categorySlug: form.toolA.categorySlug.trim(),
      toolSlug: form.toolA.toolSlug.trim(),
      title: form.toolA.title.trim(),
    },
    toolB: {
      categorySlug: form.toolB.categorySlug.trim(),
      toolSlug: form.toolB.toolSlug.trim(),
      title: form.toolB.title.trim(),
    },
    specsA: form.specsA,
    specsB: form.specsB,
    criteria: form.criteria.filter((r) => r.label.trim()),
    verdict: form.verdict.trim(),
    body: form.body.trim(),
    keywords: form.keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    status: form.status,
    rank: Number(form.rank) || 0,
  };
}

const input =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100";
const label = "mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500";
const section = "rounded-xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5";

type Props = {
  form: ComparisonFormData;
  onChange: (form: ComparisonFormData) => void;
  onAutoFillSpecs?: () => void;
  autoFillBusy?: boolean;
};

function SpecBlock({
  title,
  specs,
  onSpecChange,
}: {
  title: string;
  specs: ToolSpecsForm;
  onSpecChange: (key: keyof ToolSpecsForm, value: string) => void;
}) {
  return (
    <div className={section}>
      <h3 className="mb-3 text-sm font-bold text-slate-800">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {SPEC_FIELDS.map(({ key, label: fieldLabel }) => (
          <div key={key} className={key === "bestFor" ? "sm:col-span-2" : ""}>
            <label className={label}>{fieldLabel}</label>
            <input
              className={input}
              value={specs[key]}
              onChange={(e) => onSpecChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ComparisonAdminForm({
  form,
  onChange,
  onAutoFillSpecs,
  autoFillBusy,
}: Props) {
  const set = (patch: Partial<ComparisonFormData>) =>
    onChange({ ...form, ...patch });

  const setTool = (side: "toolA" | "toolB", patch: Partial<ToolRefForm>) =>
    onChange({ ...form, [side]: { ...form[side], ...patch } });

  const setSpec = (
    side: "specsA" | "specsB",
    key: keyof ToolSpecsForm,
    value: string
  ) => onChange({ ...form, [side]: { ...form[side], [key]: value } });

  const setCriterion = (index: number, patch: Partial<CriterionForm>) => {
    const criteria = form.criteria.map((row, i) =>
      i === index ? { ...row, ...patch } : row
    );
    onChange({ ...form, criteria });
  };

  const addCriterion = () =>
    onChange({
      ...form,
      criteria: [...form.criteria, { label: "", winner: "tie", note: "" }],
    });

  const removeCriterion = (index: number) =>
    onChange({
      ...form,
      criteria: form.criteria.filter((_, i) => i !== index),
    });

  return (
    <div className="space-y-5">
      <div className={section}>
        <h3 className="mb-3 text-sm font-bold text-slate-800">Basics</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={label}>Slug</label>
            <input
              className={input}
              placeholder="chatgpt-vs-claude"
              value={form.slug}
              onChange={(e) => set({ slug: e.target.value })}
            />
          </div>
          <div>
            <label className={label}>Rank</label>
            <input
              type="number"
              className={input}
              value={form.rank}
              onChange={(e) => set({ rank: Number(e.target.value) })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Title</label>
            <input
              className={input}
              value={form.title}
              onChange={(e) => set({ title: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Summary</label>
            <textarea
              className={input + " min-h-[72px]"}
              value={form.summary}
              onChange={(e) => set({ summary: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Meta description</label>
            <textarea
              className={input + " min-h-[60px]"}
              value={form.metaDescription}
              onChange={(e) => set({ metaDescription: e.target.value })}
            />
          </div>
          <div>
            <label className={label}>Status</label>
            <select
              className={input}
              value={form.status}
              onChange={(e) =>
                set({ status: e.target.value as ComparisonFormData["status"] })
              }
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div>
            <label className={label}>Keywords (comma-separated)</label>
            <input
              className={input}
              value={form.keywords}
              onChange={(e) => set({ keywords: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {(["toolA", "toolB"] as const).map((side, idx) => (
          <div key={side} className={section}>
            <h3 className="mb-3 text-sm font-bold text-slate-800">
              Tool {idx === 0 ? "A" : "B"}
            </h3>
            <div className="space-y-3">
              <div>
                <label className={label}>Display title</label>
                <input
                  className={input}
                  value={form[side].title}
                  onChange={(e) => setTool(side, { title: e.target.value })}
                />
              </div>
              <div>
                <label className={label}>Category slug</label>
                <input
                  className={input}
                  placeholder="ai-tools"
                  value={form[side].categorySlug}
                  onChange={(e) =>
                    setTool(side, { categorySlug: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={label}>Tool slug</label>
                <input
                  className={input}
                  placeholder="chatgpt"
                  value={form[side].toolSlug}
                  onChange={(e) => setTool(side, { toolSlug: e.target.value })}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {onAutoFillSpecs && (
        <button
          type="button"
          onClick={onAutoFillSpecs}
          disabled={autoFillBusy}
          className="inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-800 hover:bg-violet-100 disabled:opacity-60"
        >
          <Wand2 size={16} />
          {autoFillBusy ? "Filling…" : "Auto-fill pricing & API specs from tool slugs"}
        </button>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        <SpecBlock
          title={`Pricing & API — ${form.toolA.title || "Tool A"}`}
          specs={form.specsA}
          onSpecChange={(key, value) => setSpec("specsA", key, value)}
        />
        <SpecBlock
          title={`Pricing & API — ${form.toolB.title || "Tool B"}`}
          specs={form.specsB}
          onSpecChange={(key, value) => setSpec("specsB", key, value)}
        />
      </div>

      <div className={section}>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">Feature criteria</h3>
          <button
            type="button"
            onClick={addCriterion}
            className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800"
          >
            <Plus size={14} />
            Add row
          </button>
        </div>
        <div className="space-y-3">
          {form.criteria.map((row, i) => (
            <div
              key={i}
              className="grid gap-2 rounded-lg border border-slate-200 bg-white p-3 sm:grid-cols-[1fr_auto_1fr_auto]"
            >
              <input
                className={input}
                placeholder="Criteria label"
                value={row.label}
                onChange={(e) => setCriterion(i, { label: e.target.value })}
              />
              <select
                className={input + " sm:w-28"}
                value={row.winner}
                onChange={(e) =>
                  setCriterion(i, {
                    winner: e.target.value as CriterionForm["winner"],
                  })
                }
              >
                <option value="a">Tool A wins</option>
                <option value="b">Tool B wins</option>
                <option value="tie">Tie</option>
              </select>
              <input
                className={input}
                placeholder="Note (optional)"
                value={row.note}
                onChange={(e) => setCriterion(i, { note: e.target.value })}
              />
              <button
                type="button"
                onClick={() => removeCriterion(i)}
                className="flex items-center justify-center rounded-lg border border-red-200 px-2 text-red-600 hover:bg-red-50"
                aria-label="Remove criteria"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={section}>
        <label className={label}>Verdict</label>
        <textarea
          className={input + " min-h-[80px]"}
          value={form.verdict}
          onChange={(e) => set({ verdict: e.target.value })}
        />
        <label className={`${label} mt-4`}>Body HTML (optional)</label>
        <textarea
          className={input + " min-h-[100px] font-mono text-xs"}
          value={form.body}
          onChange={(e) => set({ body: e.target.value })}
        />
      </div>
    </div>
  );
}
