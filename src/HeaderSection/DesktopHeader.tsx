"use client";

import { useScrolled } from "@/hooks/useScrollDirection";
import { Mail, Phone, Twitter, LinkedinIcon } from "lucide-react";
import { SiReddit } from "react-icons/si";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileMenu from "@/userprofile/ProfileMenu";

const navLinks = [
  { href: "/category/online-games", label: "Online Games" },
  { href: "/category/ai-code-generators", label: "Vibe Coding" },
  { href: "/tools", label: "Free Download" },
  { href: "/category/ai-background-remover", label: "Bg remover" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function DesktopHeader({ megaMenu }: { megaMenu: React.ReactNode }) {
  const isScrolled = useScrolled(10);
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-[999] transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-100"
      }`}
    >
      {/* Top Bar - only show on larger screens */}
      <div className="hidden lg:flex justify-between items-center px-6 xl:px-12 py-2 text-xs font-medium text-slate-600 bg-slate-50/80 border-b border-slate-100">
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:contactaiwedia@gmail.com"
            className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
            aria-label="Email us"
          >
            <Mail size={13} className="text-indigo-500" />
            <span>contactaiwedia@gmail.com</span>
          </a>
          <a
            href="tel:+919783152203"
            className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
            aria-label="Call us"
          >
            <Phone size={13} className="text-indigo-500" />
            <span>+91-9818521688</span>
          </a>
        </div>

        <div className="flex gap-3 items-center">
          <SocialLinks />
          <Link
            href="/source"
            className="hover:text-indigo-600 text-xs font-medium transition-colors"
          >
            Source
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 md:px-6 xl:px-12 py-4 min-h-[4.5rem]">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            onClick={scrollToTop}
            className="font-extrabold text-2xl md:text-3xl tracking-tight whitespace-nowrap"
            aria-label="AiWedia Home"
          >
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              AiWedia
            </span>
          </Link>
          {megaMenu}
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex flex-wrap gap-5 text-sm font-semibold">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${
                  pathname === href
                    ? "text-indigo-600 border-b-2 border-indigo-500 pb-0.5"
                    : "text-slate-700 hover:text-indigo-600"
                }`}
                aria-current={pathname === href ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}

// Reusable social links component
function SocialLinks() {
  const socials = [
    { icon: SiReddit, href: "https://www.reddit.com/user/Aiwedia/", label: "Reddit", color: "hover:text-orange-500" },
    { icon: LinkedinIcon, href: "https://www.linkedin.com/in/aiwedia-group-27231a3b6/", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: Twitter, href: "https://x.com/aiwedia1", label: "Twitter", color: "hover:text-indigo-500" },
  ];

  return (
    <>
      {socials.map(({ icon: Icon, href, label, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`transition-colors ${color}`}
        >
          <Icon size={15} />
        </a>
      ))}
    </>
  );
}