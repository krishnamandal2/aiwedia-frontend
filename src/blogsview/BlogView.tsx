"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TableOfContents from "@/blogscms/TableOfContents";
import RelatedPosts from "@/blogscms/RelatedPosts";
import Blogsletter from "@/newsletter/Blogsletter";



export default function BlogView({
  blog,
  related,
  headings,
  html,
  readingText,
  
}: any) {

  const [progress, setProgress] = useState(0);
  const [showTOC, setShowTOC] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [nearFooter, setNearFooter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* Check if mobile */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /* Scroll progress + footer detection */
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      const height = scrollHeight - clientHeight;
      const percent = (scrollTop / height) * 100;
      setProgress(percent);

      /* Better footer detection */
      const footer = document.querySelector("footer");
      if (footer) {
        const rect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Consider near footer when footer is within 100px of viewport
        setNearFooter(rect.top < windowHeight + 100);
      }

      // Auto-hide TOC when scrolling near footer
      if (nearFooter && showTOC) {
        setShowTOC(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nearFooter, showTOC]);

  /* Active heading observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    headings?.forEach(({ id }: any) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  

  if (!blog) return <LoadingSkeleton />;

  return (
    <div className="relative bg-white min-h-screen selection:bg-black selection:text-white">
      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-black z-[100] transition-width duration-150"
        style={{ width: `${progress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Desktop TOC */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28">
              <div className="border-l border-gray-100 pl-6">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                  Table of Contents
                </p>
                <TableOfContents
                  headings={headings}
                  activeId={activeId}
                />
              </div>
            </div>
          </aside>

          {/* Blog Content */}
          <main className="lg:col-span-8 xl:col-span-7">
            {/* Header */}
            <header className="mb-8 md:mb-12">
              <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm font-medium text-gray-500 mb-4 md:mb-6">
                <span className="bg-gray-100 px-2 md:px-3 py-1 rounded-full text-black">
                  Article
                </span>
                <span>•</span>
                <span>
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <span>•</span>
                <span>{readingText}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] mb-4 md:mb-6 tracking-tight">
                {blog.title}
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-500 font-light leading-relaxed italic mb-6 md:mb-8">
                {blog.summary}
              </p>

              <div className="px-0 sm:px-4 md:px-6">
                <img
                  src={blog.fullImage || blog.image}
                  alt={blog.title}
                  className="w-full max-w-3xl mx-auto rounded-xl md:rounded-2xl shadow-lg"
                  loading="lazy"
                />
              </div>
            </header>

            {/* Article */}
 <article
  className="
    max-w-none text-gray-800

    [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3
    [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-2
    [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mt-5 [&_h3]:mb-2

    [&_p]:mb-3 [&_p]:leading-relaxed

    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3
    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3
    [&_li]:mb-1

    [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-3

    [&_img]:rounded-xl [&_img]:my-6 [&_img]:mx-auto

    [&_pre]:bg-gray-100 [&_pre]:p-3 [&_pre]:rounded [&_pre]:text-sm [&_pre]:my-4
    [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded

    [&_a]:text-blue-600 [&_a]:underline

    /* ✅ TABLE FIX START */

    [&_table]:w-full
    [&_table]:border-collapse
    [&_table]:my-6
    [&_table]:text-sm

    [&_thead]:bg-gray-100

    [&_th]:border
    [&_th]:px-4
    [&_th]:py-3
    [&_th]:text-left
    [&_th]:font-semibold
    [&_th]:text-gray-800

    [&_td]:border
    [&_td]:px-4
    [&_td]:py-3
    [&_td]:text-gray-600

    [&_tr:nth-child(even)]:bg-gray-50

    /* ❌ REMOVE THIS LINE (IMPORTANT) */
    /* [&_table]:block */

  "
  dangerouslySetInnerHTML={{ __html: html }}
/>

            {/* Related Posts */}
            <footer className="mt-12 md:mt-16 lg:mt-20 pt-8 md:pt-10 border-t border-gray-100">
               <Blogsletter/>
              <RelatedPosts posts={related} />
            </footer>
          </main>
        </div>
      </div>

      {/* Mobile TOC Menu */}
      <AnimatePresence>
        {showTOC && !nearFooter && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed bottom-24 left-4 right-4 bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 z-50 max-h-[70vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white pb-2 mb-2 border-b border-gray-100 flex justify-between items-center">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Table of Contents
              </p>
              <button 
                onClick={() => setShowTOC(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>
            <TableOfContents
              headings={headings}
              activeId={activeId}
              onItemClick={() => setShowTOC(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating TOC Button */}
      {!nearFooter && isMobile && (
        <button
          onClick={() => setShowTOC(!showTOC)}
          className={`
            lg:hidden fixed bottom-6 left-6 
            bg-black text-white w-14 h-14 rounded-full 
            shadow-xl z-[60] flex items-center justify-center 
            font-bold transition-transform active:scale-95
            ${showTOC ? 'rotate-90' : ''}
          `}
          aria-label={showTOC ? "Close table of contents" : "Open table of contents"}
        >
          {showTOC ? "✕" : "≡"}
        </button>
      )}

      {/* Mobile Safe Area */}
      <div className="lg:hidden h-20" />
    </div>
  );
}


/* Skeleton */
function LoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-10 animate-pulse">
      <div className="h-4 w-24 sm:w-32 bg-gray-200 rounded mb-4 md:mb-6" />
      <div className="h-8 sm:h-10 md:h-12 w-full bg-gray-200 rounded mb-2 md:mb-4" />
      <div className="h-8 sm:h-10 md:h-12 w-3/4 bg-gray-200 rounded mb-6 md:mb-10" />
      <div className="aspect-video w-full bg-gray-200 rounded-xl md:rounded-2xl mb-6 md:mb-10" />
      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
        <div className="h-4 w-4/6 bg-gray-200 rounded" />
      </div>
    </div>
  );
  
}