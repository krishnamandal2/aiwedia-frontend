"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Mail, Phone, ChevronRight } from "lucide-react";
import { SiReddit } from "react-icons/si";
import { Twitter, LinkedinIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileProfileMenu from "@/userprofile/MobileProfileMenu";
import { useScrolled } from "@/hooks/useScrollDirection";

// Static data moved outside component to prevent recreation
const MOBILE_NAV_LINKS = [
  { href: "/category/online-games", label: "Online Games" },
  { href: "/category/ai-background-remover", label: "Image BG Remover" },
  { href: "/category/ai-tools", label: "AI Websites" },
  { href: "/top-trending-websites", label: "Top Trending websites" },
   { href: "/tools", label: "Free Download" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

const SOCIAL_LINKS = [
  { href: "https://www.reddit.com/user/Aiwedia/", icon: SiReddit, label: "Reddit", color: "text-orange-500" },
  { href: "https://www.linkedin.com/in/aiwedia-group-27231a3b6/", icon: LinkedinIcon, label: "LinkedIn", color: "text-blue-600" },
  { href: "https://x.com/aiwedia1", icon: Twitter, label: "Twitter", color: "text-slate-700" },
] as const;

export default function MobileHeader({ mobileMenu }: { mobileMenu: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number>(0);
  const isScrolled = useScrolled(10);

  const openMenu = useCallback(() => setIsMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Close drawer on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Body scroll lock when drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMenuOpen]);

  // Focus trap and escape key handling
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousFocus = document.activeElement as HTMLElement;
    const focusableElements = drawerRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !firstElement || !lastElement) return;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };

    if (!drawerRef.current?.contains(document.activeElement)) {
      firstElement?.focus();
    }

    document.addEventListener("keydown", handleTab);
    document.addEventListener("keydown", handleEscape);
    
    return () => {
      document.removeEventListener("keydown", handleTab);
      document.removeEventListener("keydown", handleEscape);
      previousFocus?.focus();
    };
  }, [isMenuOpen, closeMenu]);

  // Swipe to close drawer (touch start)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  // Swipe to close drawer (touch move)
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isMenuOpen) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    // If swiping left more than 50px, close the drawer
    if (diff < -50) {
      closeMenu();
    }
  }, [isMenuOpen, closeMenu]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-[999] transition-all duration-300 will-change-transform ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
            : "bg-white border-b border-slate-100"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <button
            ref={menuButtonRef}
            onClick={openMenu}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-haspopup="dialog"
          >
            <Menu size={24} className="text-slate-700" />
          </button>

          <Link
            href="/"
            onClick={scrollToTop}
            className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            AiWedia
          </Link>

          <MobileProfileMenu />
        </div>
      </header>

      {/* Backdrop overlay with blur */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[998] transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden="true"
      />

      {/* Drawer panel - Full width on mobile, capped on larger screens */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-label="Mobile navigation menu"
        aria-modal="true"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className={`fixed top-0 left-0 h-full w-full sm:w-96 bg-white z-[999] shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white sticky top-0 z-10">
            <span className="font-semibold text-lg text-slate-800">Menu</span>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              aria-label="Close menu"
            >
              <X size={22} className="text-slate-600" />
            </button>
          </div>

          {/* Drawer content with improved spacing and touch-friendly targets */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
            {/* Custom mobile menu content from parent */}
            <div className="mb-6">{mobileMenu}</div>

            {/* Navigation links */}
            <nav className="space-y-1">
              {MOBILE_NAV_LINKS.map(({ href, label }) => (
                <NavItem key={href} href={href} title={label} onClick={closeMenu} />
              ))}
            </nav>

            {/* Contact information */}
            <div className="pt-8 mt-6 border-t border-slate-200 space-y-4 text-sm">
              <a
                href="mailto:contactaiwedia@gmail.com"
                className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-2 -ml-1"
              >
                <Mail size={18} className="flex-shrink-0" />
                <span>contactaiwedia@gmail.com</span>
              </a>
              <a
                href="tel:+919783152203"
                className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-2 -ml-1"
              >
                <Phone size={18} className="flex-shrink-0" />
                <span>+91 9783152203</span>
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-3 pt-6 mt-4 border-t border-slate-200">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg hover:bg-slate-100 transition-colors ${color} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2`}
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// Optimized NavItem component with memo and better active state
import { memo } from "react";

const NavItem = memo(function NavItem({ 
  href, 
  title, 
  onClick 
}: { 
  href: string; 
  title: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center justify-between p-3 rounded-xl font-medium transition-all duration-200 ${
        isActive
          ? "bg-indigo-50 text-indigo-700"
          : "text-slate-700 hover:bg-slate-100"
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2`}
      aria-current={isActive ? "page" : undefined}
    >
      <span>{title}</span>
      <ChevronRight
        size={18}
        className={`transition-transform duration-200 ${
          isActive ? "text-indigo-500 translate-x-0.5" : "text-slate-400"
        } group-hover:translate-x-0.5`}
      />
    </Link>
  );
});