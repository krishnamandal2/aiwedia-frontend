import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import Chatbot from "@/Aichartbot/Chatbot";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-static";



export const metadata: Metadata = {
  metadataBase: new URL("https://aiwedia.com"),

   verification: {
    google: "bhHsDR9p0n7Llb4acGm-q12PFDQ4QuhKVHVFCbC991M",
  },

  title: {
    default: "Aiwedia - Best AI Tools, Developer Resources & Tech News",
    template: "%s | Aiwedia",
  },

  description:
    "Discover the best AI tools, developer resources, gaming updates, SEO tools, PDF tools and trending tech news on Aiwedia.",

keywords: [
  "best AI tools 2026",
  "top AI tools for developers",
  "AI tools directory",
  "free AI tools for productivity",
  "AI tools for coding",
  "AI tools for startups",

  "AI image generator",
  "free AI image generator",
  "AI art generator online",
  "text to image AI tools",

  "AI background remover",
  "remove image background online",
  "free background remover tool",

  "PDF editor online",
  "free PDF editing tools",
  "merge PDF files online",
  "compress PDF online",

  "best SEO tools for bloggers",
  "developer productivity tools",
  "coding tools for developers",

  "gaming news",
  "latest gaming updates",
  "gaming industry news",

  "latest tech news",
  "AI technology news",
  "new AI tools released",
  "Online games",
],

  authors: [{ name: "Krishna" }],
  creator: "Aiwedia",
  publisher: "Aiwedia",

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

  alternates: {
    canonical: "https://aiwedia.com",
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    url: "https://aiwedia.com",
    title: "Aiwedia - Best AI Tools & Developer Resources",
    description:
      "Explore top AI tools, developer utilities, SEO tools, gaming content and trending tech updates.",
    siteName: "Aiwedia",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Aiwedia Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Aiwedia - Best AI Tools & Developer Resources",
    description:
      "Explore top AI tools, developer utilities, SEO tools, gaming content and trending tech updates.",
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
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Aiwedia",
      url: "https://aiwedia.com",
      sameAs: [
        "https://x.com/aiwedia1",
        
      ]
    }),
  }}
/>
        <Header />
        <main>{children}</main>
        <Footer />
        <Providers />
        {/* Floating Components */}
        <ScrollToTopButton />
        <Chatbot />
      </body>
      
    </html>
  );
}
