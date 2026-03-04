"use client";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Github, Twitter, ArrowRight,ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 1. Import usePathname
import ProfileMenu from "@/components/ProfileMenu";
import MobileProfileMenu from "@/components/MobileProfileMenu";

export default function HeaderClient({
  megaMenu,
 mobileMenu,
  
}: {
  megaMenu: React.ReactNode;
 mobileMenu: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); 

 
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  //top scroll
    const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-all duration-300 font-sans ${
        isScrolled ? "border-b border-slate-200 shadow-sm" : "border-b border-slate-100"
      }`}
    >
      {/* Top Bar */}
      <div className="hidden lg:flex justify-between items-center px-12 py-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50/50">
        <div className="flex gap-6">
          <a href="mailto: contactaiwedia@gmail.com" className="flex items-center gap-2 hover:text-indigo-600">
            <Mail size={12} className="text-indigo-600" /> contactaiwedia@gmail.com
          </a>
          <span className="hidden md:flex items-center gap-2 hover:text-indigo-600">
            <Phone size={12} className="text-indigo-600" /> +91 98185 21688
          </span>
        </div>
        <div className="flex gap-4">
          <Github size={14} className="hover:text-indigo-600 cursor-pointer" />
          <a
          href="https://x.com/aiwedia1"
         target="_blank"
         rel="noopener noreferrer"
           >
     <Twitter size={14} className="hover:text-indigo-600 cursor-pointer" />
    </a>
          <Link href="/source" className="hover:text-indigo-600 text-xs">Source</Link>
        </div>
      </div>

      {/* Main Header */}
     {/* <div className="flex h-20 items-center justify-between px-4 lg:px-12"> */}
     <div className="flex h-20 sm:h-24 lg:h-28 items-center justify-between px-4 lg:px-12">

  {/* LEFT SIDE */}
  <div className="flex items-center gap-4 sm:gap-6">
    <button
      className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>

   <Link
  href="/"
  onClick={scrollToTop}
  className="relative font-extrabold text-2xl sm:text-3xl tracking-tight whitespace-nowrap"
>
  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]">
    AiWedia
  </span>
</Link>


    <div className="hidden lg:block">
      {megaMenu}
      
    </div>

   </div>
    
  {/* RIGHT SIDE */}
  <div className="flex items-center gap-4">
    {/* Desktop Nav */}
    <nav className="hidden lg:flex items-center gap-6 xl:gap-8 border-r border-slate-100 pr-6">
        <Link
    href="/category/onlinegames/"
    className="text-sm font-bold text-slate-600 hover:text-indigo-600"
  >
    Online Games
  </Link>

  <Link
    href="/category/vibecoding"
    className="text-sm font-bold text-slate-600 hover:text-indigo-600"
  >
    Vibe Coding
  </Link>
  <Link
    href="/category/aimarketingseo"
    className="text-sm font-bold text-slate-600 hover:text-indigo-600"
  >
    AI For Seo
  </Link>
   <Link
    href="/category/ImageBackgroundRemover"
    className="text-sm font-bold text-slate-600 hover:text-indigo-600"
  >
    Bg remover
  </Link>
      <Link href="/about" className="text-sm font-bold text-slate-600 hover:text-indigo-600">
        About
      </Link>
      <Link href="/blog" className="text-sm font-bold text-slate-600 hover:text-indigo-600">
        Blog
      </Link>
      <Link href="/contact" className="text-sm font-bold text-slate-600 hover:text-indigo-600">
        Contact
      </Link>

      
    </nav>

    {/* Desktop Profile */}
    <div className="hidden lg:flex items-center">
      <ProfileMenu />
    </div>

    {/* Mobile Profile */}
    <div className="lg:hidden flex items-center">
      <MobileProfileMenu />
    </div>
  </div>
</div>
      {/* Mobile Drawer */}
   
       <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-slate-100 ${
          isMenuOpen 
            ? "max-h-screen shadow-2xl shadow-slate-300/50" 
            : "max-h-0"
        }`}
      >
      <div className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-5rem)] overscroll-contain">


          {mobileMenu}

          <nav className="space-y-0.5 pt-2">
             
            <Link 
              href="/category/onlinegames/" 
              className="flex items-center justify-between p-4 text-base font-semibold text-slate-900 hover:text-indigo-600 hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-200"></div>
                Online Games
              </div>
              <ChevronRight size={18} className="text-slate-400" />
            </Link>

              <Link 
              href="/category/ImageBackgroundRemover" 
              className="flex items-center justify-between p-4 text-base font-semibold text-slate-900 hover:text-indigo-600 hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-200"></div>
                image Bg remover
              </div>
              <ChevronRight size={18} className="text-slate-400" />
            </Link>

             <Link 
              href="/category/aitools" 
              className="flex items-center justify-between p-4 text-base font-semibold text-slate-900 hover:text-indigo-600 hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-200"></div>
                AI Websites
              </div>
              <ChevronRight size={18} className="text-slate-400" />
            </Link>
            
            <Link 
              href="/about" 
              className="flex items-center justify-between p-4 text-base font-semibold text-slate-900 hover:text-indigo-600 hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-200"></div>
                About
              </div>
              <ChevronRight size={18} className="text-slate-400" />
            </Link>
            
            <Link 
              href="/blog" 
              className="flex items-center justify-between p-4 text-base font-semibold text-slate-900 hover:text-indigo-600 hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-200"></div>
                Blog
              </div>
              <ChevronRight size={18} className="text-slate-400" />
            </Link>
            
            <Link 
              href="/contact" 
              className="flex items-center justify-between p-4 text-base font-semibold text-slate-900 hover:text-indigo-600 hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-200"></div>
                Contact
              </div>
              <ChevronRight size={18} className="text-slate-400" />
            </Link>
          </nav>

          {/* Contact Info Section */}
          <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
            <div className="px-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Contact Us</p>
              
              <a 
                href="mailto: contactaiwedia@gmail.com" 
                className="flex items-center gap-3 p-3 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-indigo-50 rounded-lg">
                  <Mail size={18} className="text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Email Us</p>
                  <p className="text-xs text-slate-500">contactaiwedia@gmail.com</p>
                </div>
              </a>
              
              <div className="flex items-center gap-3 p-3 text-slate-700">
                <div className="flex items-center justify-center w-10 h-10 bg-indigo-50 rounded-lg">
                  <Phone size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Call Us</p>
                  <p className="text-xs text-slate-500">+91 98185 21688</p>
                </div>
              </div>
            </div>
          </div>
 
        </div>
      </div>
    </header>
  );
}