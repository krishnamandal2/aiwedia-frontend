"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

type Props = {
  faq?: FAQ[];
};

export default function FAQSection({ faq }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faq || faq.length === 0) return null;

  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-violet-500/15 p-2 text-violet-400">
          <HelpCircle className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold text-white">FAQ</h2>
      </div>

      <div className="space-y-2">
        {faq.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`overflow-hidden rounded-xl border transition ${
                isOpen
                  ? "border-emerald-500/40 bg-white/[0.04]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/15"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
              >
                <span className="text-sm font-semibold text-slate-200 sm:text-base">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-500 transition ${
                    isOpen ? "rotate-180 text-emerald-400" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <p className="border-t border-white/5 px-4 pb-4 text-sm leading-relaxed text-slate-400">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
