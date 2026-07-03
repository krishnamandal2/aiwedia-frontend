export type ToolSpecs = {
  pricing?: string;
  freeTier?: string;
  apiAccess?: string;
  apiLimit?: string;
  rateLimit?: string;
  contextWindow?: string;
  bestFor?: string;
};

export type ComparisonCriterion = {
  label: string;
  winner: "a" | "b" | "tie" | string;
  note?: string;
};

export type ComparisonToolRef = {
  title: string;
  slug?: string;
  categorySlug?: string;
  description?: string;
  image?: string;
  url?: string;
  detailUrl?: string;
  found?: boolean;
};

export type ComparisonDoc = {
  slug: string;
  title: string;
  summary?: string;
  metaDescription?: string;
  body?: string;
  verdict?: string;
  criteria?: ComparisonCriterion[];
  specsA?: ToolSpecs;
  specsB?: ToolSpecs;
  toolA?: { title?: string; toolSlug?: string; categorySlug?: string };
  toolB?: { title?: string; toolSlug?: string; categorySlug?: string };
};

export type ComparisonListItem = {
  slug: string;
  title: string;
  summary?: string;
  toolA?: { title?: string };
  toolB?: { title?: string };
};

export const PRICING_ROWS: { key: keyof ToolSpecs; label: string }[] = [
  { key: "pricing", label: "Plans & pricing" },
  { key: "freeTier", label: "Free tier" },
];

export const API_ROWS: { key: keyof ToolSpecs; label: string }[] = [
  { key: "apiAccess", label: "API access" },
  { key: "apiLimit", label: "API limits / quota" },
  { key: "rateLimit", label: "Rate limits" },
  { key: "contextWindow", label: "Context window" },
  { key: "bestFor", label: "Best for" },
];
