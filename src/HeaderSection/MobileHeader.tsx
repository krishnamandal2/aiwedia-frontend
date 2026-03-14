"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Mail,
  Phone,
  ChevronRight,
  Twitter,
  LinkedinIcon,
} from "lucide-react";
import { SiReddit } from "react-icons/si";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileProfileMenu from "@/userprofile/MobileProfileMenu";

export default function MobileHeader({
  mobileMenu,
}: {
  mobileMenu: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

   const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-[999] bg-white border-b border-slate-200 backdrop-blur-md">

        <div className="flex h-16 items-center justify-between px-4">

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-xl hover:bg-slate-100 transition"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link
             href="/"
            onClick={scrollToTop}
            className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            AiWedia
          </Link>

          {/* Profile */}
          <MobileProfileMenu />

        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[998] transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-[999] shadow-xl transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">

          {/* Drawer Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <span className="font-semibold text-lg">Menu</span>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <X size={22} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">

            {mobileMenu}

            <NavItem href="/category/onlinegames/" title="Online Games" />
            <NavItem href="/category/ImageBackgroundRemover" title="Image BG Remover" />
            <NavItem href="/category/aitools" title="AI Websites" />
            <NavItem href="/about" title="About" />
            <NavItem href="/blog" title="Blog" />
            <NavItem href="/contact" title="Contact" />

            {/* Contact */}
            <div className="pt-6 mt-6 border-t border-slate-200 space-y-3 text-sm">

              <a
                href="mailto:contactaiwedia@gmail.com"
                className="flex items-center gap-3 hover:text-indigo-600"
              >
                <Mail size={18} />
                contactaiwedia@gmail.com
              </a>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                 +91 9783152203
              </div>

            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-6 mt-6 border-t border-slate-200">

              <a
                href="https://www.reddit.com/user/Aiwedia/"
                target="_blank"
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <SiReddit size={18} className="text-orange-500" />
              </a>

              <a
                href="https://www.linkedin.com/in/aiwedia-group-27231a3b6/"
                target="_blank"
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <LinkedinIcon size={18} className="text-blue-600" />
              </a>

              <a
                href="https://x.com/aiwedia1"
                target="_blank"
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <Twitter size={18} />
              </a>

            </div>

          </div>
        </div>
      </aside>
    </>
  );
}

/* Navigation Item */
function NavItem({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between p-3 rounded-xl font-medium text-slate-800 hover:bg-slate-100 transition"
    >
      {title}
      <ChevronRight size={18} className="text-slate-400" />
    </Link>
  );
}