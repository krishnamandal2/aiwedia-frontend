import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
} from "./site";

export interface PageSeoInput {
  /** Page title without site suffix — template adds "| AIWedia" */
  title: string;
  description: string;
  /** Path starting with / e.g. "/blog" */
  path: string;
  keywords?: string[];
  /** Set true for login, search results, admin */
  noIndex?: boolean;
  ogImage?: string;
  /** Override full title (skips template) */
  absoluteTitle?: string;
}

export function buildPageMetadata(input: PageSeoInput): Metadata {
  const canonical = `${SITE_URL}${input.path === "/" ? "" : input.path}`;
  const ogImage = input.ogImage ?? DEFAULT_OG_IMAGE;
  const title = input.absoluteTitle ?? input.title;

  return {
    title: input.absoluteTitle ? { absolute: input.absoluteTitle } : title,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical },
    robots: input.noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description: input.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title,
      description: input.description,
      images: [ogImage],
    },
  };
}
