/**
 * AIWedia design tokens — keep homepage & category pages consistent.
 * Font: Inter (from root layout)
 */

export const theme = {
  page: "min-h-screen bg-white text-slate-900",
  muted: "text-slate-600",
  subtle: "text-slate-500",
  border: "border-slate-200",
  borderLight: "border-slate-100",
  card: "rounded-2xl border border-slate-200 bg-white shadow-sm",
  cardHover:
    "hover:border-violet-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300",
  input:
    "rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20",
  chipActive: "border-violet-600 bg-violet-600 text-white",
  chipIdle:
    "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50",
  btnPrimary:
    "rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500",
  badge: "rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-700",
  stickyBar: "sticky z-30 border-y border-slate-200 bg-white/95 backdrop-blur-md",
  headerBar: "sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md",
} as const;

export function isAiCategorySlug(slug: string) {
  return slug === "ai-tools" || slug.startsWith("ai-");
}
