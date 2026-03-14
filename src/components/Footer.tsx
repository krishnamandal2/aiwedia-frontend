import { Twitter, LinkedinIcon, Mail, ExternalLink, ChevronRight } from "lucide-react";
import { FaGithub, FaReddit } from "react-icons/fa";
import NewsletterSubscribe from "@/newsletter/NewsletterSubscribe";
import Link from "next/link";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: "AI Tools", href: "/category/aitools", count: 30 },
    { name: "Vibe Coding", href: "/category/vibecoding", count: 15 },
    { name: "Web Design", href: "/category/aiwebdesign", count: 28 },
    { name: "Voice Change Ai", href: "/category/AIVoice", count: 16},
    { name: "Marketing and Seo", href: "/category/aimarketingseo", count: 24 },
    { name: "Online Games", href: "/category/onlinegames", count: 40 },
  ];

  const quickLinks = [
    { name: "Blog", href: "/blog" },
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
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Brand Section - Full width on mobile, 5 cols on desktop */}
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

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div>
                <div className="text-2xl font-bold text-white">200+</div>
                <div className="text-xs text-slate-500">Curated Tools</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">35+</div>
                <div className="text-xs text-slate-500">Office tools</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">40+</div>
                <div className="text-xs text-slate-500">Categories</div>
              </div>
            </div>

            {/* Email Subscription */}
           <NewsletterSubscribe/>

            {/* Email Contact */}
            <a
              href="mailto:contact@aiwedia.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:text-white transition text-sm group"
            >
              <Mail size={16} className="text-indigo-400" />
              contact@aiwedia.com
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition" />
            </a>
          </div>

          {/* Links Section - 7 cols on desktop */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">

            {/* Categories */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                Categories
              </h4>
              <ul className="space-y-3">
                {categories.slice(0, 5).map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      prefetch={false} 
                      className="text-sm hover:text-indigo-400 transition flex items-center justify-between group"
                    >
                      <span>{item.name}</span>
                      {item.count && (
                        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full group-hover:bg-indigo-900/30 group-hover:text-indigo-400">
                          {item.count}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link 
                    href="/" 
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mt-2"
                  >
                    View all <ChevronRight size={12} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
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
                      className="text-sm hover:text-indigo-400 transition flex items-center gap-2"
                    >
                      {item.name}
                      {(
                        <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">
                         
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
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

            {/* Legal & Social - Stack on mobile */}
            <div className="col-span-2 sm:col-span-1 space-y-6">
              <div>
                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                  Legal
                </h4>
                <ul className="space-y-3">
                  {legal.slice(0, 4).map((item) => (
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

              {/* Social Links */}
              <div>
                <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                  Connect
                </h4>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://twitter.com/aiwedia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800 hover:border-indigo-500 hover:text-indigo-400 hover:bg-slate-800 transition group"
                    aria-label="Twitter"
                  >
                    <Twitter size={18} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aiwedia-group-27231a3b6/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800 hover:border-indigo-500 hover:text-indigo-400 hover:bg-slate-800 transition group"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon size={18} />
                  </a>
                  <a
                href="https://github.com/aiwedia"
                 target="_blank"
                 rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800 hover:border-indigo-500 hover:text-indigo-400 hover:bg-slate-800 transition group"
                aria-label="GitHub"
           >
             <FaGithub className="w-5 h-5" />
          </a>
             
<a
  href="https://www.reddit.com/user/Aiwedia/"
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800 hover:border-indigo-500 hover:text-indigo-400 hover:bg-slate-800 transition group"
  aria-label="Reddit"
>
  <FaReddit className="w-5 h-5" />
</a>
                 
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Improved mobile layout */}
        <div className="mt-12 pt-8 border-t border-slate-900">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <p className="text-xs text-slate-600 text-center lg:text-left order-3 lg:order-1">
              © {currentYear} AiWedia. All rights reserved. 
              <span className="block sm:inline sm:ml-1">
                Built with ❤️ for the AI community.
              </span>
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 order-1 lg:order-2">
              <span className="text-xs text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                All systems operational
              </span>
              <span className="text-xs text-slate-700 hidden sm:inline">|</span>
              <span className="text-xs text-slate-700">
                ⚡ 99.9% uptime
              </span>
            </div>

            {/* Legal Links - Horizontal scroll on mobile */}
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 text-xs font-medium order-2 lg:order-3">
              {legal.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  prefetch={false} 
                  className="text-slate-600 hover:text-white transition whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Additional Info - Mobile only */}
          <div className="mt-6 text-center lg:hidden">
            <p className="text-xs text-slate-700">
              Made with ❤️ by the AiWedia team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;