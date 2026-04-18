import { Sparkles } from "lucide-react";
import Searchbar from "@/components/search/SearchBar";
import RoundStrip from "@/HeroStrip/RoundStrip";



export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium mb-10 animate-fade-in">
          <Sparkles size={12} className="text-indigo-500" />
          <span>The Web, Categorized.</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-8">
          Every website you need. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400">
            One digital home.
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-center text-base leading-relaxed tracking-tight text-slate-500 sm:text-lg md:text-xl md:leading-extra-relaxed lg:text-[22px]">
          <span className="block font-semibold text-slate-900 md:inline">
            Access the web, simplified.
          </span>{" "}
          AiWedia helps you quickly access and navigate any website from a single place.
        </p>

        <div className="max-w-2xl mx-auto">

          <Searchbar />
        </div>
     
     <RoundStrip/>
     
   
      </div>
    </section>
  );
}