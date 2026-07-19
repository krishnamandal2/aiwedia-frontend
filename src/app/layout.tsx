import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "@/app/globals.css";
import Header from "@/components/headers/Header";
import Footer from "@/components/footer/Footer";
import Providers from "@/components/toastui/Providers"
import ScrollToTopButton from "@/components/topbutton/ScrollToTopButton";
import Chatllm from "@/LLMChatboat/Chatllm";

import ConsentGatedAnalytics from "@/components/consent/ConsentGatedAnalytics";
import CookieConsentBanner from "@/components/consent/CookieConsentBanner";
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const revalidate = 3600;



export const metadata: Metadata = {
  metadataBase: new URL("https://aiwedia.com"),

  verification: {
    google: "bhHsDR9p0n7Llb4acGm-q12PFDQ4QuhKVHVFCbC991M",
  },

  title: {
    default: "AIWedia — Best AI Tools Directory 2026 | Coding, SEO & Free Tools",
    template: "%s | AIWedia",
  },

  description:
    "Discover and compare the best AI tools for coding, SEO, images, and agents. Free downloads, deals, alternatives, and AIWedia Intelligence on every listing.",

  keywords: [
    "AIWedia",
    "best AI tools",
    "AI tools directory",
    "ChatGPT alternatives",
    "AI coding tools",
    "AI SEO tools",
    "free AI tools 2026",
    "compare AI tools",
    "AI deals",
  ],

  authors: [{ name: "AIWedia" }],
  creator: "AIWedia",
  publisher: "AIWedia",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    url: "https://aiwedia.com",
    title: "AIWedia — Best AI Tools Directory 2026",
    description:
      "Compare AI tools, find alternatives, and explore deals — curated with AIWedia Intelligence.",
    siteName: "AIWedia",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AIWedia — AI Tools Directory",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AIWedia — Best AI Tools Directory 2026",
    description:
      "Compare AI tools, find alternatives, and explore deals on AIWedia.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConsentGatedAnalytics />
        <CookieConsentBanner />

    

     <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://aiwedia.com/#organization",
        name: "AIWedia",
        url: "https://aiwedia.com",
        logo: "https://aiwedia.com/favicon.png",
        sameAs: ["https://x.com/aiwedia1"],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://aiwedia.com/#website",
        name: "AIWedia",
        url: "https://aiwedia.com",
        publisher: { "@id": "https://aiwedia.com/#organization" },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://aiwedia.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ]),
  }}
/>
        <Header />
        <main className="relative min-w-0 overflow-x-hidden">
          {children}
        </main>
        <Footer />
        <Providers />
        {/* Floating Components */}
        <ScrollToTopButton />
        <Chatllm />
      

       

      </body>
      
    </html>
  );
}
