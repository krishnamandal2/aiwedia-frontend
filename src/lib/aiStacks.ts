export type AiStack = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  accent: string;
  categoryLinks: { href: string; label: string }[];
  toolLinks: { href: string; label: string }[];
  promptLinks: { href: string; label: string }[];
  newsCategory?: string;
};

export const AI_STACKS: AiStack[] = [
  {
    slug: "seo",
    title: "AI SEO Stack",
    tagline: "Rank on Google with AI",
    description:
      "Everything you need to research keywords, write content, optimize pages, and track rankings — powered by AI tools.",
    accent: "from-emerald-600 to-teal-600",
    categoryLinks: [
      { href: "/category/ai-seo-tools", label: "AI SEO Tools" },
      { href: "/best/ai-seo-tools", label: "Best AI SEO Guide" },
    ],
    toolLinks: [
      { href: "/category/ai-seo-tools", label: "Browse SEO AI directory" },
    ],
    promptLinks: [
      { href: "/prompts?category=seo", label: "SEO prompts" },
    ],
    newsCategory: "seo-ai",
  },
  {
    slug: "vibe-coding",
    title: "Vibe Coding Stack",
    tagline: "Ship code faster with AI",
    description:
      "Copilots, agents, and no-code builders for developers who want to move from idea to production quickly.",
    accent: "from-violet-600 to-indigo-700",
    categoryLinks: [
      { href: "/category/ai-code-generators", label: "AI Code Generators" },
      { href: "/category/ai-no-code-builders", label: "No-Code AI Builders" },
    ],
    toolLinks: [
      { href: "/category/ai-code-generators", label: "Coding AI tools" },
    ],
    promptLinks: [
      { href: "/prompts?category=coding", label: "Coding prompts" },
    ],
    newsCategory: "coding-ai",
  },
  {
    slug: "startup",
    title: "Startup AI Stack",
    tagline: "Launch & grow with AI",
    description:
      "Tools for founders — marketing automation, copy, analytics, and productivity — plus the latest startup & funding news.",
    accent: "from-amber-500 to-orange-600",
    categoryLinks: [
      { href: "/category/ai-marketing-tools", label: "Marketing AI" },
      { href: "/category/ai-office-workplace-tools", label: "Workplace AI" },
    ],
    toolLinks: [
      { href: "/category/ai-tools", label: "Full AI directory" },
    ],
    promptLinks: [
      { href: "/prompts?category=marketing", label: "Marketing prompts" },
    ],
    newsCategory: "startups",
  },
  {
    slug: "content-creator",
    title: "Content Creator Stack",
    tagline: "Image, video & writing AI",
    description:
      "Create visuals, videos, and copy for social, ads, and blogs — the creator's essential AI toolkit.",
    accent: "from-pink-600 to-rose-600",
    categoryLinks: [
      { href: "/category/ai-image-generators", label: "Image AI" },
      { href: "/category/ai-video-generators", label: "Video AI" },
    ],
    toolLinks: [
      { href: "/category/ai-image-generators", label: "Image generators" },
    ],
    promptLinks: [
      { href: "/prompts?category=image", label: "Image prompts" },
      { href: "/prompts?category=writing", label: "Writing prompts" },
    ],
    newsCategory: "image-ai",
  },
];

export function getStackBySlug(slug: string) {
  return AI_STACKS.find((s) => s.slug === slug);
}
