"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Twitter, LinkedinIcon } from "lucide-react";
import { SiReddit } from "react-icons/si";
import Link from "next/link";
import ProfileMenu from "@/userprofile/ProfileMenu";

export default function DesktopHeader({
  megaMenu,
}: {
  megaMenu: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
 className={`sticky top-0 z-[999] bg-white/90 backdrop-blur-md transition-all duration-300 ${
  isScrolled
   ? "border-b border-slate-200 shadow-md"
   : "border-b border-slate-100"
 }`}
>   
      {/* Top Bar */}
      <div className="flex justify-between items-center px-12 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50/50">
        <div className="flex gap-6">
          <a
            href="mailto:contactaiwedia@gmail.com"
            className="flex items-center gap-2 hover:text-indigo-600"
          >
            <Mail size={12} className="text-indigo-600" />
            contactaiwedia@gmail.com
          </a>

          <span className="flex items-center gap-2 hover:text-indigo-600">
            <Phone size={12} className="text-indigo-600" />
            +91 9818521688
          </span>
        </div>

        <div className="flex gap-4 items-center">
          <a href="https://www.reddit.com/user/Aiwedia/" target="_blank">
            <SiReddit className="hover:text-orange-500 cursor-pointer" size={14} />
          </a>

          <a
            href="https://www.linkedin.com/in/aiwedia-group-27231a3b6/"
            target="_blank"
          >
            <LinkedinIcon
              size={14}
              className="hover:text-blue-600 cursor-pointer"
            />
          </a>

          <a href="https://x.com/aiwedia1" target="_blank">
            <Twitter
              size={14}
              className="hover:text-indigo-600 cursor-pointer"
            />
          </a>

          <Link href="/source" className="hover:text-indigo-600 text-xs">
            Source
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex h-28 items-center justify-between px-12">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            onClick={scrollToTop}
            className="font-extrabold text-3xl tracking-tight"
          >
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              AiWedia
            </span>
          </Link>

          {megaMenu}
        </div>

        <div className="flex items-center gap-8">
          <nav className="flex gap-8 text-sm font-bold text-slate-600">
            <Link
              href="/category/onlinegames/"
              className="hover:text-indigo-600"
            >
              Online Games
            </Link>

            <Link
              href="/category/vibecoding"
              className="hover:text-indigo-600"
            >
              Vibe Coding
            </Link>

            <Link
              href="/category/aimarketingseo"
              className="hover:text-indigo-600"
            >
              AI For Seo
            </Link>

            <Link
              href="/category/ImageBackgroundRemover"
              className="hover:text-indigo-600"
            >
              Bg remover
            </Link>

            <Link href="/about" className="hover:text-indigo-600">
              About
            </Link>

            <Link href="/blog" className="hover:text-indigo-600">
              Blog
            </Link>

            <Link href="/contact" className="hover:text-indigo-600">
              Contact
            </Link>
          </nav>

          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}