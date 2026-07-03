export const DEAL_TYPES = {
  "lifetime-deals": {
    slug: "lifetime-deals",
    label: "Lifetime Deals",
    shortLabel: "Lifetime",
    description:
      "One-time payment AI tools and SaaS lifetime tiers from AppSumo-style marketplaces.",
    accent: "from-amber-500 to-orange-600",
    icon: "lifetime",
  },
  "student-discounts": {
    slug: "student-discounts",
    label: "Student Discounts",
    shortLabel: "Students",
    description:
      "Education pricing, free student packs, and verified .edu discounts on AI tools.",
    accent: "from-sky-500 to-blue-600",
    icon: "student",
  },
  "startup-credits": {
    slug: "startup-credits",
    label: "Startup Credits",
    shortLabel: "Startups",
    description:
      "Cloud, API, and workspace credits for founders through accelerator programs.",
    accent: "from-emerald-500 to-teal-600",
    icon: "startup",
  },
} as const;

export type DealType = keyof typeof DEAL_TYPES;

export type AiDeal = {
  slug: string;
  title: string;
  description: string;
  dealType: DealType;
  discountText: string;
  promoCode?: string;
  dealUrl: string;
  categorySlug?: string;
  toolSlug?: string;
  toolName?: string;
  featured?: boolean;
};

const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function fetchDeals(type?: DealType) {
  const url = type
    ? `${BASE}/api/deals/type/${type}`
    : `${BASE}/api/deals`;
  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) return { deals: [] as AiDeal[] };
  return res.json() as Promise<{ deals: AiDeal[] }>;
}
