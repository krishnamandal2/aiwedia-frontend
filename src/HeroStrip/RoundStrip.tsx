"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { HeroStripTool } from "@/lib/heroTypes";
import { DEFAULT_HERO_STRIP } from "@/lib/heroTypes";

type Props = {
  tools: HeroStripTool[];
  limit?: number;
};

export default function RoundStrip({ tools, limit = 16 }: Props) {
  const items = (tools?.length ? tools : DEFAULT_HERO_STRIP).slice(0, limit);
  if (!items.length) return null;

  return (
    <div className="mt-10 w-full min-w-0 sm:mt-14 lg:mt-16">
      <div className="mb-4 flex items-center justify-center gap-2 sm:mb-6">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-violet-300 sm:w-12" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
          Popular AI tools
        </p>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-violet-300 sm:w-12" />
      </div>

      <motion.ul
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid max-w-5xl grid-cols-4 gap-x-2 gap-y-5 sm:grid-cols-5 sm:gap-x-3 sm:gap-y-6 md:grid-cols-6 lg:grid-cols-8"
      >
        {items.map((tool, index) => {
          const internalHref = tool.href?.trim();
          const externalHref = tool.link?.trim();
          const href = internalHref || externalHref || "/category/ai-tools";
          const isExternal = !internalHref && Boolean(externalHref);

          return (
            <li key={`${tool.title}-${index}`} className="min-w-0">
              <Link
                href={href}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative"
                >
                  <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-2 ring-white transition duration-300 group-hover:border-violet-300 group-hover:shadow-lg group-hover:shadow-violet-200/50 sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem] md:rounded-[1.25rem]">
                    <Image
                      src={tool.image}
                      alt={tool.title}
                      fill
                      sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, 72px"
                      quality={70}
                      loading={index < 8 ? "eager" : "lazy"}
                      priority={index < 8}
                      className="object-cover"
                    />
                  </div>
                  <span className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-violet-400/0 to-fuchsia-400/0 opacity-0 blur-md transition group-hover:from-violet-400/30 group-hover:to-fuchsia-400/20 group-hover:opacity-100" />
                </motion.div>

                <p className="mt-2 max-w-[4.75rem] truncate text-[10px] font-bold text-slate-700 transition group-hover:text-violet-700 sm:max-w-[5.5rem] sm:text-xs">
                  {tool.title}
                </p>
                {tool.description && (
                  <p className="mt-0.5 hidden max-w-[5.5rem] truncate text-[9px] text-slate-400 sm:block">
                    {tool.description}
                  </p>
                )}
              </Link>
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
}
