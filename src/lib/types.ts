/** Shared types — safe to import from Client and Server Components */

export interface ToolIntelligence {
  popularityScore: number;
  trafficTrend: "rising" | "stable" | "declining";
  trafficTrendLabel?: string;
  aiSummary: string;
  features: string[];
  pros: string[];
  cons: string[];
  useCases: string[];
  pricingSnapshot?: string;
  pricingHistory?: {
    date: string;
    plan: string;
    price: string;
    note?: string;
  }[];
  communityRating?: { average: number; count: number };
  source?: "curated" | "editorial" | "generated";
  updatedAt?: string | null;
}

export interface Tool {
  slug: string;
  title: string;
  description: string;
  image: string;
  url: string;
  rank: number;
  benefits: string[];
  categorySlug: string;
  editorScore?: number | null;
  editorsPick?: boolean;
  affiliateUrl?: string;
  launchUrl?: string;
  intelligence?: ToolIntelligence;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RelatedLink {
  slug: string;
  title: string;
  description?: string;
  summary?: string;
  href: string;
}

export interface CategoryResponse {
  title?: string;
  description?: string;
  seoIntro?: string;
  slug?: string;
  image?: string;
  typeui?: string;
  faq?: FaqItem[];
  tools: Tool[];
  total: number;
  relatedTools?: Tool[];
  relatedGuides?: RelatedLink[];
  relatedComparisons?: RelatedLink[];
}
