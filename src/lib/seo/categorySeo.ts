import type { Metadata } from "next";
import type { CategoryResponse } from "@/lib/types";
import { formatCategoryTitle } from "@/lib/formatTitle";
import { SITE_URL } from "./site";

const SITE = SITE_URL;

/** High-intent slugs — titles & descriptions tuned for Google search */
const SEO_PRESETS: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  "ai-tools": {
    title: "Best AI Tools Directory 2026 — Compare Free & Paid",
    description:
      "Curated list of the best AI tools for chat, images, video, writing, and productivity. Filter, compare, and find free AI apps on AIWedia.",
    keywords: [
      "best AI tools",
      "AI tools directory",
      "free AI tools 2026",
      "AI tools list",
    ],
  },
  "ai-code-generators": {
    title: "Best AI Coding Tools & Vibe Coding Assistants 2026",
    description:
      "Compare GitHub Copilot, Cursor, Bolt, Replit Agent, and more AI code generators. Build faster with vibe coding tools ranked for developers.",
    keywords: [
      "AI coding tools",
      "vibe coding",
      "AI code generator",
      "Cursor alternative",
      "best AI for programming",
    ],
  },
  "ai-seo-tools": {
    title: "Best AI SEO Tools to Rank on Google 2026",
    description:
      "Discover AI SEO tools for keyword research, content optimization, SERP analysis, and technical audits. Rank higher with Surfer, Ahrefs, Frase, and more.",
    keywords: [
      "AI SEO tools",
      "SEO AI writer",
      "rank on Google",
      "AI keyword research",
      "content optimization AI",
    ],
  },
  "ai-marketing-tools": {
    title: "AI Marketing, SEO & Social Media Tools Directory",
    description:
      "AI tools for digital marketing, social posts, ads, and SEO campaigns. Grow traffic with Semrush, Surfer, and social automation platforms.",
    keywords: [
      "AI marketing tools",
      "AI social media",
      "SEO marketing AI",
    ],
  },
  "ai-agents-automation": {
    title: "Best AI Agents & Workflow Automation Tools 2026",
    description:
      "Build autonomous AI agents and no-code automations with Zapier, Make, n8n, LangChain, CrewAI, and more — ranked on AIWedia.",
    keywords: [
      "AI agents",
      "workflow automation AI",
      "AI automation tools",
      "multi-agent AI",
    ],
  },
  "ai-no-code-builders": {
    title: "AI No-Code App Builders — Websites & Apps Without Code",
    description:
      "Launch apps and sites with Bubble, Glide, Durable, 10Web, and AI no-code builders. Perfect for founders and marketers.",
    keywords: [
      "AI no code",
      "AI website builder",
      "no code app builder AI",
    ],
  },
  "ai-writing-tools": {
    title: "Best AI Writing & Content Tools for Bloggers 2026",
    description:
      "AI writing assistants for blogs, emails, ads, and long-form SEO content. Compare top content generators in one directory.",
    keywords: ["AI writing tools", "AI content writer", "blog AI"],
  },
  "ai-image-generators": {
    title: "Best AI Image Generators — Text to Image Tools 2026",
    description:
      "Top AI image generators for art, photos, and marketing visuals. Compare Midjourney alternatives and free image AI tools.",
    keywords: ["AI image generator", "text to image AI", "best image AI"],
  },
  "ai-content-creator-tools": {
    title: "Best AI Tools for Content Creators (2026)",
    description:
      "AI for YouTubers and creators — scripts, clips, captions, thumbnails, and social repurposing. Curated on AIWedia.",
    keywords: ["AI tools for content creators", "creator AI", "YouTuber AI tools"],
  },
  "ai-video-description-tools": {
    title: "Best AI for YouTube Descriptions & Video SEO (2026)",
    description:
      "Generate YouTube titles, descriptions, tags, and chapters with AI. Rank videos and get more clicks.",
    keywords: ["AI video description", "YouTube description generator", "YouTube SEO AI"],
  },
  "ai-thumbnail-design-tools": {
    title: "Best AI Thumbnail Makers for YouTube (2026)",
    description:
      "Create high-CTR thumbnails and channel art with AI image tools for creators.",
    keywords: ["AI thumbnail maker", "YouTube thumbnail AI"],
  },
  "ai-short-form-video-tools": {
    title: "Best AI Tools for Shorts, Reels & TikTok (2026)",
    description:
      "Edit short-form video faster with AI captions, clips, and viral hooks.",
    keywords: ["AI Reels editor", "TikTok AI tools", "Shorts AI"],
  },
  "ai-resume-career-tools": {
    title: "Best AI Resume Builders & Job Tools (2026)",
    description:
      "ATS-friendly AI resumes, cover letters, and job search tools students and professionals search on Google.",
    keywords: ["AI resume builder", "AI cover letter", "ATS resume AI"],
  },
  "ai-study-homework-tools": {
    title: "Best AI Homework Help & Study Tools (2026)",
    description:
      "AI tutors, math solvers, flashcards, and essay help for students.",
    keywords: ["AI homework help", "AI math solver", "study AI"],
  },
  "ai-pdf-chat-tools": {
    title: "Best AI PDF Chat & Summarizer Tools (2026)",
    description:
      "Chat with PDFs, summarize documents, and research faster with AI.",
    keywords: ["ChatPDF alternative", "AI PDF summarizer", "chat with PDF"],
  },
  "ai-office-workplace-tools": {
    title: "Best AI Tools for Office & Employees (2026)",
    description:
      "Microsoft 365 Copilot, Google Workspace, Slack, CRM, meetings, and spreadsheet AI for workplace teams.",
    keywords: [
      "Microsoft Copilot office",
      "AI for employees",
      "workplace AI tools",
      "Google Workspace AI",
    ],
  },
  "ai-hr-recruiting-tools": {
    title: "Best AI HR & Recruiting Tools (2026)",
    description:
      "ATS, AI sourcing, video interviews, and people analytics for recruiters and HR teams.",
    keywords: [
      "AI recruiting tools",
      "AI ATS",
      "HR AI software",
      "AI hiring assistant",
    ],
  },
  "ai-legal-contract-tools": {
    title: "Best AI Legal & Contract Tools (2026)",
    description:
      "AI contract review, legal research, CLM, and eDiscovery for law firms and in-house legal.",
    keywords: [
      "AI contract review",
      "legal AI tools",
      "AI for lawyers",
      "contract AI",
    ],
  },
  "ai-accounting-finance-tools": {
    title: "Best AI Accounting & Finance Tools (2026)",
    description:
      "AI bookkeeping, AP automation, FP&A, tax filing, and corporate spend tools for finance teams.",
    keywords: [
      "AI accounting software",
      "AI bookkeeping",
      "FP&A AI",
      "AI tax software",
    ],
  },
  "ai-agent-workflow-automation": {
    title: "Best AI Agent Workflow Automation Tools 2026",
    description:
      "Zapier, Make, n8n, Power Automate — build multi-step AI agent workflows. Compare free tiers on AIWedia.",
    keywords: [
      "ai agent workflow automation",
      "ai workflow automation",
      "workflow ai agent",
      "ai agents for workflows",
    ],
  },
  "ai-agent-automation-platform": {
    title: "Best AI Agent Automation Platforms 2026",
    description:
      "Enterprise and startup platforms to build, deploy, and monitor AI agents — Copilot Studio, Relevance AI, CrewAI.",
    keywords: [
      "ai agent automation platform",
      "ai agent software",
      "agent automation platform",
      "best ai agent tools",
    ],
  },
  "ai-email-marketing-tools": {
    title: "Best AI Email Marketing Tools 2026 — Free & Paid",
    description:
      "AI tools for email marketing — subject lines, automation, personalization. Mailchimp, Brevo, HubSpot, Klaviyo ranked.",
    keywords: [
      "ai tools for email marketing",
      "ai email marketing software",
      "free ai email marketing tool",
      "best ai email marketing tools",
    ],
  },
  "lemlist-ai-outreach": {
    title: "Lemlist & Best AI Cold Email Outreach Tools 2026",
    description:
      "Lemlist, Instantly, Smartlead, Apollo — AI cold email and multichannel outreach compared on AIWedia.",
    keywords: ["lemlist", "lemlist ai", "cold email ai", "lemlist alternatives"],
  },
  "bing-most-visited-websites": {
    title: "Bing & Microsoft Most Visited Websites 2026",
    description:
      "Bing, Copilot, MSN, Outlook, LinkedIn — Microsoft's highest-traffic sites ranked for 2026.",
    keywords: [
      "bing most visited websites",
      "microsoft most visited sites",
      "bing traffic 2026",
    ],
  },
  "ai-tools-india-2026": {
    title: "Best AI Tools in India 2026 — Free & Local",
    description:
      "ChatGPT, Gemini, Krutrim, Sarvam, Bhashini — top AI tools Indian users search on Google.",
    keywords: ["ai tools india", "best ai tools india 2026", "free ai india"],
  },
  "ai-tools-usa-2026": {
    title: "Best AI Tools in USA 2026",
    description:
      "Copilot, ChatGPT, Agentforce, Jasper — top AI software for US businesses and creators.",
    keywords: ["ai tools usa", "best ai tools america 2026", "ai software usa"],
  },
  "ipl-cricket-live-2026": {
    title: "IPL 2026 Live Score — Cricbuzz, ESPN, Official",
    description:
      "IPL live score, ball-by-ball updates, points table, and official cricket sources for 2026.",
    keywords: ["ipl live score", "ipl 2026", "cricket live score"],
  },
  "freight-booking": {
    title: "Best Logistics & Freight Booking Websites 2026",
    description:
      "Online freight booking, shipping quotes, and logistics platforms — Freightos, Flexport, and more.",
    keywords: [
      "best logistics website",
      "freight booking platform",
      "online freight forwarding",
    ],
  },
  "ai-image-filters": {
    title: "Best AI Image Filters & Photo Effects 2026",
    description:
      "AI photo filters, style transfer, and image effects for social media and design.",
    keywords: ["ai image filters", "ai photo effects", "image filter ai"],
  },
  "pdf-and-document-tools": {
    title: "Best AI PDF & Document Tools 2026",
    description:
      "Chat with PDFs, summarize documents, merge and convert — AI document assistants ranked.",
    keywords: ["ai pdf tools", "chat with pdf", "ai document assistant"],
  },
  "ai-workflow-automation-tools": {
    title: "AI Workflow Automation — Zapier-Style Tools 2026",
    description:
      "Connect apps and automate tasks with AI — no-code workflow builders compared.",
    keywords: ["ai workflow automation", "zapier alternative ai", "automation ai"],
  },
  "trending-websites": {
    title: "Top Trending & Most Visited Websites 2026",
    description:
      "Google, YouTube, ChatGPT, TikTok, FIFA — what the world searches and visits most in 2026.",
    keywords: [
      "top trending websites 2026",
      "most visited websites",
      "popular websites 2026",
    ],
  },
  "indian-government-websites": {
    title: "Indian Government Websites List 2026 — Official Portals",
    description:
      "Official Indian government websites for services, schemes, tax, and departments — curated list.",
    keywords: [
      "indian government website list",
      "gov websites india",
      "government of india website",
    ],
  },
};

export function buildCategoryMetadata(
  slug: string,
  data: CategoryResponse | null
): Metadata {
  const preset = SEO_PRESETS[slug];
  const displayName = formatCategoryTitle(data?.title ?? slug);
  const toolCount = data?.total ?? data?.tools?.length ?? 0;

  const title =
    preset?.title ??
    `${displayName} — Best Tools & Websites (${toolCount}+) | AIWedia`;

  const description =
    preset?.description ??
    (data?.description
      ? `${data.description} Browse ${toolCount}+ curated links on AIWedia.`
      : `Explore ${toolCount}+ ${displayName} tools, websites, and resources. Updated directory for 2026 on AIWedia.`);

  const keywords = preset?.keywords ?? [
    displayName,
    `${displayName} list`,
    "best websites",
    "AIWedia",
  ];

  const canonical = `${SITE}/category/${slug}`;

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "AIWedia",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildCategoryJsonLd(
  slug: string,
  data: CategoryResponse
) {
  const name = formatCategoryTitle(data.title ?? slug);
  const description =
    data.description ??
    `Curated ${name} directory with ${data.total} tools on AIWedia.`;
  const pageUrl = `${SITE}/category/${slug}`;

  const itemList = (data.tools ?? []).slice(0, 20).map((tool, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: tool.title,
    url: tool.url || pageUrl,
    description: tool.description,
  }));

  const graphs: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: name,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name,
      description,
      url: pageUrl,
      isPartOf: { "@type": "WebSite", name: "AIWedia", url: SITE },
      numberOfItems: data.total,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Top ${name}`,
      numberOfItems: itemList.length,
      itemListElement: itemList,
    },
  ];

  const faq = data.faq ?? [];
  if (faq.length > 0) {
    graphs.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return graphs;
}
