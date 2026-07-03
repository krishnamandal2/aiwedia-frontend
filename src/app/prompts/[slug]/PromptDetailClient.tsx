"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy } from "lucide-react";
import toast from "react-hot-toast";
import SaveItemButton from "@/components/SaveItemButton";

type PromptDetailProps = {
  prompt: {
    slug: string;
    title: string;
    promptText: string;
    category: string;
    useCase?: string;
    tags?: string[];
    relatedCategorySlug?: string;
  };
};

export default function PromptDetailClient({ prompt }: PromptDetailProps) {
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt.promptText);
      setCopied(true);
      toast.success("Prompt copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy — select text manually");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB]">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link
          href="/prompts"
          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-800"
        >
          <ArrowLeft size={16} />
          All prompts
        </Link>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase text-violet-700">
              {prompt.category}
            </span>
            <h1 className="mt-4 text-3xl font-black text-slate-900">{prompt.title}</h1>
            {prompt.useCase && (
              <p className="mt-3 text-slate-600">{prompt.useCase}</p>
            )}
          </div>
          <SaveItemButton type="prompt" slug={prompt.slug} label="Save prompt" />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Prompt
            </span>
            <button
              type="button"
              onClick={copyPrompt}
              className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white hover:bg-violet-700"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy prompt"}
            </button>
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap p-5 text-sm leading-relaxed text-slate-800 font-mono">
            {prompt.promptText}
          </pre>
        </div>

        {prompt.tags && prompt.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {prompt.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {prompt.relatedCategorySlug && (
          <div className="mt-10 rounded-xl border border-violet-100 bg-violet-50/50 p-5">
            <p className="text-sm text-slate-700">
              Use this prompt with tools from{" "}
              <Link
                href={`/category/${prompt.relatedCategorySlug}`}
                className="font-bold text-violet-700 hover:underline"
              >
                {prompt.relatedCategorySlug.replace(/-/g, " ")}
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
