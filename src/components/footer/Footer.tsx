import { Twitter, LinkedinIcon, Mail, ExternalLink, ChevronRight } from "lucide-react";
import { FaGithub, FaReddit } from "react-icons/fa";
import NewsletterSubscribe from "@/newsletter/NewsletterSubscribe";
import CookieSettingsButton from "@/components/consent/CookieSettingsButton";
import Link from "next/link";
import { getSiteConfig } from "@/lib/api";

type FooterCat = { name: string; href: string; count?: number };

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const config = await getSiteConfig();

  const footerFromApi = config.footer_categories as FooterCat[] | undefined;
  const categories =
    footerFromApi && footerFromApi.length > 0
      ? footerFromApi
      : [
          { name: "AI Tools", href: "/category/ai-tools" },
          { name: "AI SEO Tools", href: "/category/ai-seo-tools" },
          { name: "Vibe Coding", href: "/category/ai-code-generators" },
          { name: "Web Directory", href: "/web-directory" },
          { name: "Free Downloads", href: "/tools" },
          { name: "AI Directory", href: "/ai-directory" },
        ];

  const quickLinks = [
    { name: "Blog", href: "/blog" },
    { name: "Best Guides", href: "/best" },
    { name: "Compare Tools", href: "/compare" },
    { name: "Collections", href: "/collections" },
    { name: "Suggest a Tool", href: "/suggest-tool" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Home", href: "/" },
  ];

  const resources = [
    { name: "Help Center", href: "/help" },
    { name: "Documentation", href: "/docs" },
    { name: "Community", href: "/community" },
    { name: "Partner Program", href: "/partners" },
  ];

  const legal = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Disclaimer", href: "/disclaimer" },
  ];

  return (
    <footer
      className="relative z-20 bg-slate-950 text-slate-300 pt-12 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] sm:pt-16 sm:pb-8"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 space-y-6">
            <Link
              href="/"
              prefetch={false}
              className="text-2xl sm:text-3xl font-black tracking-tighter text-white inline-flex items-center gap-3 group"
            >
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                AiWedia
              </span>
              <span className="text-xs font-normal bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full border border-indigo-500/30">
                Beta
              </span>
            </Link>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md">
              Discover, access, and explore the web with ease. Our platform
              removes the hassle of searching by giving you direct access to
              websites across categories in one streamlined interface.
            </p>

            <NewsletterSubscribe />

            <a
              href="mailto:contact@aiwedia.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:text-white transition text-sm group"
            >
              <Mail size={16} className="text-indigo-400" />
              contact@aiwedia.com
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-4 lg:gap-6">
            <div className="min-w-0 sm:col-span-2 lg:col-span-1">
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                Categories
              </h4>
              <ul className="space-y-3">
                {categories.slice(0, 8).map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      prefetch={false}
                      className="flex min-h-[44px] items-center justify-between gap-2 text-sm transition hover:text-indigo-400 touch-manipulation"
                    >
                      <span className="min-w-0 truncate">{item.name}</span>
                      {item.count != null && (
                        <span className="text-xs text-slate-600 group-hover:text-indigo-400">
                          {item.count}
                        </span>
                      )}
                      <ChevronRight
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition -mr-4 group-hover:mr-0"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      prefetch={false}
                      className="text-sm hover:text-indigo-400 transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                Resources
              </h4>
              <ul className="space-y-3">
                {resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      prefetch={false}
                      className="text-sm hover:text-indigo-400 transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-3">
                {legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      prefetch={false}
                      className="text-sm hover:text-indigo-400 transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <CookieSettingsButton variant="footer" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} AIWedia. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/aiwedia1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://reddit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition"
            >
              <FaReddit size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
