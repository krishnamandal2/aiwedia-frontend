"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StripData } from "@/data/stripdata/StripData";
import Link from "next/link";
import { useState } from "react";

export default function RoundStrip() {
  // Limit initial render (performance boost)
  const [visibleCount] = useState(24);

  return (
    <section className="w-full px-3 sm:px-4 md:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">

        {/* Animation Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            grid
            grid-cols-4
            sm:grid-cols-5
            md:grid-cols-6
            lg:grid-cols-7
            xl:grid-cols-8
            gap-x-4 gap-y-8
          "
        >
          {StripData.slice(0, visibleCount).map((tool, index) => (
            <Link
              key={tool.link} // better key
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.08, y: -6 }}
                whileTap={{ scale: 0.95 }}
                className="
                  flex flex-col items-center text-center
                  p-3 rounded-xl
                  bg-white/[0.03]
                  backdrop-blur-sm
                  border border-white/5
                  transition-all duration-300
                  group-hover:bg-white/[0.06]
                  group-hover:border-blue-500/30
                "
              >

                {/* Image */}
                <div
                  className="
                    relative
                    w-16 h-16
                    sm:w-18 sm:h-18
                    md:w-20 md:h-20
                    rounded-full
                    overflow-hidden
                    border border-white/10
                    shadow-md
                    transition-all duration-300
                    group-hover:border-blue-500
                    group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]
                  "
                >
                  <Image
                    src={tool.image}
                    alt={tool.title}
                    fill
                    sizes="
                      (max-width: 640px) 64px,
                      (max-width: 768px) 72px,
                      80px
                    "
                    quality={70}
                    loading={index < 6 ? "eager" : "lazy"} // top items load fast
                    priority={index < 6} // boost above-the-fold
                    placeholder="blur"
                    blurDataURL="/placeholder.png" // add small blur image in public
                    className="object-cover"
                  />
                </div>

                {/* Title */}
                <p className="
                  text-[11px] sm:text-xs md:text-sm
                  text-gray-300 mt-3 font-medium
                  group-hover:text-white transition
                ">
                  {tool.title}
                </p>

                {/* Description */}
                {tool.description && (
                  <p className="
                    text-[10px] sm:text-[11px]
                    text-gray-500 mt-1 leading-tight
                    max-w-[90px]
                    group-hover:text-gray-300 transition
                  ">
                    {tool.description}
                  </p>
                )}
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}