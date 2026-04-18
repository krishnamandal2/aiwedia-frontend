"use client";

import { useState, useEffect } from "react";
import { trendingData, Website } from "@/data/trendingsitedata/Trendingdata";

export default function TrendingWebsites() {
  const [year, setYear] = useState("2025");
  const currentData = trendingData[year];

  // Optional: add a mounting animation class
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/20 to-white overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Enhanced */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 text-blue-700 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Trending Now
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-600 bg-clip-text text-transparent">
                Trending
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent ml-3">
                Websites
              </span>
            </h2>
            {/* HIGHLIGHTED PARAGRAPH - Enhanced with gradient background, icon, and improved visibility */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-blue-300/10 to-transparent blur-md rounded-xl"></div>

              <div className="relative bg-gradient-to-r from-blue-50/80 to-transparent backdrop-blur-sm px-5 py-4 rounded-xl border-l-4 border-blue-500 shadow-sm">

                <p className="text-blue-800 text-base md:text-lg font-semibold flex items-center gap-2">
                  <span className="text-xl">✨</span>
                  Discover the digital leaders and innovators of
                </p>

                {/* BIG YEAR */}
                <h3 className="text-3xl md:text-4xl font-extrabold mt-1 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  {year}
                </h3>
              </div>
            </div>
          </div>

          {/* IMPROVED YEAR SECTION - Added explicit "Choose year" label and better structure */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold tracking-wide">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Choose year</span>
            </div>
            <div className="relative bg-white/70 backdrop-blur-sm p-1.5 rounded-2xl border border-blue-100 shadow-lg shadow-blue-100/30">
              <div className="flex flex-wrap justify-center gap-1">
                {Object.keys(trendingData).map((y) => (
                  <button
                    key={y}
                    onClick={() => setYear(y)}
                    aria-pressed={year === y}
                    aria-label={`Select year ${y}`}
                    className={`relative px-5 md:px-6 py-2.5 rounded-xl text-sm md:text-base font-bold transition-all duration-300 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${year === y
                      ? "text-white"
                      : "text-blue-700 hover:text-blue-900 hover:bg-blue-50"
                      }`}
                  >
                    {year === y && (
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-md shadow-blue-200 animate-fade-in" />
                    )}
                    <span className="relative z-10">{y}</span>
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-blue-400 mt-1 hidden sm:block">Last updated: monthly trends</p>
          </div>
        </div>

        {/* Content Area */}
        {currentData === "coming-soon" ? (
          <div className="flex flex-col justify-center items-center text-center py-20 md:py-28 px-6 border-2 border-dashed border-blue-200 rounded-3xl bg-blue-50/20 backdrop-blur-sm">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-lg">
                <span className="text-4xl">🚀</span>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
              2026 Collection
            </h3>
            <p className="text-blue-500 mt-3 max-w-md">
              We&apos;re currently analyzing emerging trends and collecting data...
            </p>
            <div className="flex gap-2 mt-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-all duration-700 ${isMounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
          >
            {currentData.map((site: Website, index: number) => (
              <div
                key={index}
                className="group relative flex flex-col h-full rounded-2xl border border-blue-100 bg-white/80 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-blue-200/50 hover:-translate-y-1 hover:border-blue-200 overflow-hidden"
              >
                {/* Animated gradient border on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-blue-400/10 group-hover:to-blue-500/10 transition-all duration-700 pointer-events-none"></div>

                <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
                  {/* Rank Badge - Enhanced */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="relative">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 font-bold text-xl shadow-sm group-hover:scale-105 transition-transform duration-300">
                        {index + 1}
                      </div>
                      {/* Trending arrow for top 3 */}
                      {index < 3 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="h-px flex-grow mx-3 bg-gradient-to-r from-blue-100 via-blue-200 to-transparent"></div>
                    {index === 0 && (
                      <span className="text-xs font-bold px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                        #1 Top Pick
                      </span>
                    )}
                  </div>

                  {/* Website Name */}
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-950 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {site.name}
                  </h3>

                  {/* Description with line clamp for consistency */}
                  <p className="text-slate-500 leading-relaxed mb-6 flex-grow line-clamp-3">
                    {site.description}
                  </p>

                  {/* Visit Button - Premium */}
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 group-hover:from-blue-600 group-hover:to-blue-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-200"
                  >
                    <span>Visit Website</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </div>

                {/* Decorative background element - animated */}
                <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-gradient-to-tr from-blue-100 to-blue-50 rounded-full opacity-0 group-hover:opacity-60 group-hover:scale-150 transition-all duration-700 -z-0 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}

        {/* Additional footer note for better UX */}
        {currentData !== "coming-soon" && (
          <div className="text-center mt-12 text-sm text-blue-400 border-t border-blue-100 pt-6">
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Rankings updated monthly based on traffic & engagement
            </span>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-in-out;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        .delay-150 {
          animation-delay: 150ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}