"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Star } from "lucide-react";
import { trackOutboundLink } from "@/lib/analytics";

export interface DirectoryTool {
  title: string;
  slug: string;
  description?: string;
  image?: string;
  rank?: number;
  categorySlug: string;
  launchUrl?: string;
  url?: string;
  editorScore?: number | null;
  editorsPick?: boolean;
}

export default function ToolDirectoryCard({ tool }: { tool: DirectoryTool }) {
  const href = tool.launchUrl || tool.url || "#";
  const detailHref = `/tool/${tool.categorySlug}/${tool.slug}`;
  const hasImage = Boolean(tool.image?.trim());
  const initials = tool.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-violet-300 hover:shadow-md">
      <div className="relative aspect-[16/10] border-b border-slate-100 bg-slate-50">
        {hasImage ? (
          <Image
            src={tool.image!}
            alt={tool.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-2xl font-black text-violet-200">
            {initials}
          </div>
        )}
        {tool.editorsPick && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
            <Sparkles size={10} />
            Editor&apos;s pick
          </span>
        )}
        {tool.editorScore != null && tool.editorScore > 0 && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-0.5 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold text-slate-800 shadow-sm">
            <Star size={10} className="fill-amber-400 text-amber-500" />
            {tool.editorScore}/10
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <Link
          href={detailHref}
          className="text-base font-bold text-slate-900 hover:text-violet-700"
        >
          {tool.title}
        </Link>
        {tool.description && (
          <p className="mt-1 line-clamp-2 flex-1 text-sm text-slate-600">
            {tool.description}
          </p>
        )}
        <div className="mt-4 flex gap-2">
          <Link
            href={detailHref}
            className="flex-1 rounded-xl border border-slate-200 py-2 text-center text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Details
          </Link>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutboundLink(href, tool.title)}
            className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-violet-600 py-2 text-xs font-semibold text-white hover:bg-violet-500"
          >
            Launch
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}
