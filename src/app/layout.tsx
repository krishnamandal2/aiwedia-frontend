import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";


const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: {
    default: "onewbsolution",
    template: "%s | OneWebSolution",
  },
  description: "Best tools & resources for developers and creators",
  keywords: ["tools", "developer tools", "AI tools","vibe coding","ai","top ai"],
  authors: [{ name: "Krishna" }],
  robots: "index, follow",

  /** ✅ BROWSER TAB ICON */
  icons: {
    icon: "/favicon.ico",
    
  },

  /** ✅ OPEN GRAPH (SOCIAL PREVIEW) */
  openGraph: {
   
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
        <Header />
        <main>{children}</main>
        <Footer />
        <Providers />
      </body>
    </html>
  );
}
