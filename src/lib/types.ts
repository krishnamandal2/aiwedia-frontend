/** Shared types — safe to import from Client and Server Components */

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
