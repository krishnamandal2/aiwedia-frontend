"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Plus,
  Save,
  Search,
} from "lucide-react";
import { clientApi } from "@/lib/api-client";
import ComparisonAdminForm, {
  comparisonToForm,
  emptyComparison,
  formToPayload,
  type ComparisonFormData,
} from "@/components/admin/ComparisonAdminForm";

type CmpRow = ComparisonFormData & { _id: string };

export default function AdminComparisonsPage() {
  const router = useRouter();
  const [items, setItems] = useState<CmpRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | "new" | null>(null);
  const [drafts, setDrafts] = useState<Record<string, ComparisonFormData>>({});
  const [newForm, setNewForm] = useState<ComparisonFormData>(emptyComparison());
  const [busy, setBusy] = useState<string | null>(null);
  const [specBusy, setSpecBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    const d = await clientApi.admin.comparisons.list();
    const rows = (d.comparisons as Record<string, unknown>[]).map((c) => ({
      _id: String(c._id),
      ...comparisonToForm(c),
    }));
    setItems(rows);
    const map: Record<string, ComparisonFormData> = {};
    rows.forEach((r) => {
      const { _id, ...form } = r;
      map[_id] = form;
    });
    setDrafts(map);
  }, []);

  useEffect(() => {
    clientApi.admin.verify().then(async (r) => {
      if (!r.ok) router.push("/admin/login");
      else {
        await load();
        setLoading(false);
      }
    });
  }, [router, load]);

  const filtered = items.filter((c) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      c.title.toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q) ||
      c.toolA.title.toLowerCase().includes(q) ||
      c.toolB.title.toLowerCase().includes(q)
    );
  });

  const autoFillSpecs = async (
    id: string | "new",
    form: ComparisonFormData,
    apply: (f: ComparisonFormData) => void
  ) => {
    if (!form.toolA.toolSlug || !form.toolB.toolSlug) {
      toast.error("Enter both tool slugs first");
      return;
    }
    setSpecBusy(id);
    try {
      const data = await clientApi.admin.comparisons.resolveSpecs(
        form.toolA.toolSlug,
        form.toolB.toolSlug
      );
      apply({
        ...form,
        specsA: { ...form.specsA, ...data.specsA },
        specsB: { ...form.specsB, ...data.specsB },
      });
      toast.success("Specs filled from defaults");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to fill specs");
    } finally {
      setSpecBusy(null);
    }
  };

  const saveExisting = async (id: string) => {
    const form = drafts[id];
    if (!form?.slug || !form?.title) {
      toast.error("Slug and title are required");
      return;
    }
    setBusy(id);
    try {
      await clientApi.admin.comparisons.update(id, formToPayload(form));
      toast.success("Saved");
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(null);
    }
  };

  const create = async () => {
    if (!newForm.slug || !newForm.title) {
      toast.error("Slug and title are required");
      return;
    }
    if (!newForm.toolA.toolSlug || !newForm.toolB.toolSlug) {
      toast.error("Both tool slugs are required");
      return;
    }
    setBusy("new");
    try {
      await clientApi.admin.comparisons.create(formToPayload(newForm));
      toast.success("Comparison created");
      setNewForm(emptyComparison());
      setExpanded(null);
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Create failed");
    } finally {
      setBusy(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this comparison?")) return;
    setBusy(id);
    try {
      await clientApi.admin.comparisons.remove(id);
      toast.success("Deleted");
      setItems((x) => x.filter((i) => i._id !== id));
      if (expanded === id) setExpanded(null);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(null);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl p-6 text-slate-500">Loading…</div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <Link
        href="/admin/manage"
        className="text-sm font-semibold text-violet-600 hover:underline"
      >
        ← Content hub
      </Link>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Comparisons</h1>
          <p className="mt-1 text-sm text-slate-500">
            Add or edit tool vs tool pages — pricing, API limits, criteria & verdict.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setExpanded(expanded === "new" ? null : "new")
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-violet-500"
        >
          <Plus size={16} />
          New comparison
        </button>
      </div>

      {expanded === "new" && (
        <div className="mt-6 rounded-2xl border-2 border-violet-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">Create comparison</h2>
          <ComparisonAdminForm
            form={newForm}
            onChange={setNewForm}
            autoFillBusy={specBusy === "new"}
            onAutoFillSpecs={() =>
              autoFillSpecs("new", newForm, setNewForm)
            }
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={create}
              disabled={busy === "new"}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              <Save size={16} />
              {busy === "new" ? "Creating…" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => setExpanded(null)}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="relative mt-8">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-4 text-sm"
          placeholder="Search by title, slug, or tool…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <p className="mt-3 text-xs text-slate-500">
        {filtered.length} comparison{filtered.length !== 1 ? "s" : ""}
      </p>

      <ul className="mt-4 space-y-3">
        {filtered.map((c) => {
          const isOpen = expanded === c._id;
          const draft = drafts[c._id] ?? c;
          return (
            <li
              key={c._id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : c._id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left hover:bg-slate-50 sm:px-5"
              >
                <div className="min-w-0">
                  <p className="font-bold text-slate-900">{c.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    /compare/{c.slug} · {c.toolA.title} vs {c.toolB.title} ·{" "}
                    <span
                      className={
                        c.status === "published"
                          ? "text-emerald-600"
                          : "text-amber-600"
                      }
                    >
                      {c.status}
                    </span>
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/compare/${c.slug}`}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-violet-600"
                    aria-label="Preview"
                  >
                    <ExternalLink size={16} />
                  </Link>
                  {isOpen ? (
                    <ChevronUp size={18} className="text-slate-400" />
                  ) : (
                    <ChevronDown size={18} className="text-slate-400" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 px-4 py-5 sm:px-5">
                  <ComparisonAdminForm
                    form={draft}
                    onChange={(f) =>
                      setDrafts((prev) => ({ ...prev, [c._id]: f }))
                    }
                    autoFillBusy={specBusy === c._id}
                    onAutoFillSpecs={() =>
                      autoFillSpecs(c._id, draft, (f) =>
                        setDrafts((prev) => ({ ...prev, [c._id]: f }))
                      )
                    }
                  />
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => saveExisting(c._id)}
                      disabled={busy === c._id}
                      className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-500 disabled:opacity-60"
                    >
                      <Save size={16} />
                      {busy === c._id ? "Saving…" : "Save changes"}
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(c._id)}
                      disabled={busy === c._id}
                      className="rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
