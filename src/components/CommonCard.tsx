//for common card of toolsdaat

"use client";

import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from "lucide-react";

import Image from "next/image";
import { useState, lazy, Suspense, useRef, useEffect } from "react";

interface CommonCardProps {
  image: string;
  title: string;
  description: string;
  url: string;
  benefits?: string[];
  rank?: number;
}

const CommonCard = ({ 
  image, 
  title, 
  description, 
  url, 
  benefits = [], 
  rank = 0 
}: CommonCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  // Exact Logic: Check if description actually overflows 2 lines
  useEffect(() => {
    const checkOverflow = () => {
      if (descriptionRef.current) {
        const isContentLarger = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
        setIsOverflowing(isContentLarger);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow); // Re-check on screen resize
    return () => window.removeEventListener('resize', checkOverflow);
  }, [description]);

  return (
    <div className="group relative h-full flex flex-col">
      {/* Background Glow (Desktop Only) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-[#eb442c]/10 rounded-[1.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-500 hidden md:block" />
      
      <div className="relative bg-white rounded-[1.5rem] border border-slate-200/80 hover:border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden">
        
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden m-1.5 rounded-[1.2rem]">
          <a href={url} target="_blank" rel="noopener noreferrer" className="block h-full relative">
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-slate-100" />
            )}
            <Image
              src={image || "/placeholder-tool.jpg"}
              alt={title}
              fill
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 768px) 100vw, 33vw"
              
            />
            {/* Dark gradient overlay for rank visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
          </a>

          {/* Rank Badge */}
          {rank > 0 && (
            <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm">
              <span className="text-[10px] font-black text-slate-800">
                <span className="text-[#eb442c]">#</span>{rank} 
              </span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="px-5 py-4 flex flex-col flex-grow">
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-base font-bold text-slate-800 group-hover:text-[#eb442c] transition-colors line-clamp-1 mb-1.5">
              {title}
            </h3>
            
            {/* Description with Exact Overflow Logic */}
            <div className="relative">
              <p 
                ref={descriptionRef}
                className={`text-[12px] text-slate-500 leading-relaxed font-medium transition-all duration-300 ${
                  isExpanded ? 'line-clamp-none' : 'line-clamp-2'
                }`}
              >
                {description}
              </p>
              
              {/* Fade Effect when collapsed */}
              {isOverflowing && !isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              )}

              {/* Read More Toggle */}
              {isOverflowing && (
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-[11px] font-bold text-[#eb442c] mt-1.5 flex items-center gap-1 hover:underline underline-offset-2 transition-all"
                >
                  {isExpanded ? (
                    <>Show Less <ChevronUp size={12}/></>
                  ) : (
                    <>Read More <ChevronDown size={12}/></>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Benefits Section - Compact for Medium Size */}
          {benefits.length > 0 && (
            <div className="space-y-2 mb-6 mt-2">
              {benefits.slice(0, 4).map((benefit, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-md bg-orange-50 flex items-center justify-center shrink-0">
                    <Suspense fallback={null}>
                      <CheckCircle2 size={11} className="text-[#eb442c]" />
                    </Suspense>
                  </div>
                  <span className="text-[11px] text-slate-600 font-semibold truncate leading-none">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Action Button */}
          <div className="mt-auto pt-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full p-2.5 rounded-xl bg-slate-50 group-hover:bg-[#eb442c] transition-all duration-300 group/btn"
            >
              <div className="px-1.5">
                <span className="block text-[8px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white/70 transition-colors">
                  Get Started
                </span>
                <span className="text-[12px] font-bold text-slate-700 group-hover:text-white transition-colors">
                  Visit Website
                </span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-white group-hover:bg-white/20 flex items-center justify-center transition-all shadow-sm">
                <Suspense fallback={null}>
                  <ArrowRight 
                    size={16} 
                    className="text-[#eb442c] group-hover:text-white transform group-hover:translate-x-0.5 transition-all" 
                  />
                </Suspense>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonCard;