import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import Chatbot from "@/Aichartbot/Chatbot";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const revalidate = 60;



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
    "AI tools directory",
    "free AI tools",
    "AI tools for developers",
    "AI image generator",
    "PDF tools online",
    "SEO tools for bloggers",
    "latest tech news",
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
