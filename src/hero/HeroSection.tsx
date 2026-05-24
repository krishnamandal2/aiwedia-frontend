import { Sparkles } from "lucide-react";
import Searchbar from "@/components/search/SearchBar";
import RoundStrip from "@/HeroStrip/RoundStrip";



export default function HeroSection() {
  return (
    <section className="relative scroll-mt-20 pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium mb-10 animate-fade-in">
          <Sparkles size={12} className="text-indigo-500" />
          <span>The Web, Categorized.</span>
        </div>

        <h1 className="mb-6 text-[1.75rem] font-bold leading-tight tracking-tight text-slate-900 sm:mb-8 sm:text-4xl md:text-6xl">
          Every website you need. <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400">
            One digital home.
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl px-1 text-center text-sm leading-relaxed text-slate-500 sm:mb-10 sm:text-base md:text-lg lg:text-xl">
          <span className="block font-semibold text-slate-900 md:inline">
            Access the web, simplified.
          </span>{" "}
          AiWedia helps you quickly access and navigate any website from a single place.
        </p>

        <div className="mx-auto w-full max-w-2xl min-w-0 px-1">

          <Searchbar />
        </div>
     
     <RoundStrip/>
     
   
      </div>
    </section>
  );
}