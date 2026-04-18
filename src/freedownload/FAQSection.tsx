"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (

    <section className="mt-20 px-4">

      {/* Header */}
      <div className="text-center mb-12">

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>

        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm md:text-base">
          Find quick answers to common questions about these tools.
        </p>

      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-4">

        {faq.map((item, index) => {

          const isOpen = openIndex === index;

          return (

            <div
              key={index}
              className={`border rounded-2xl transition-all duration-300 overflow-hidden
                ${isOpen
                  ? "border-blue-500 shadow-md"
                  : "border-gray-200 hover:border-gray-300"}
              `}
            >

              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between gap-4
                p-5 md:p-6 text-left font-medium text-gray-900
                hover:bg-gray-50 transition"
              >

                <span className="text-sm md:text-base lg:text-lg">
                  {item.question}
                </span>

                {/* Icon */}
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform duration-300
                  ${isOpen ? "rotate-180 text-blue-600" : "text-gray-400"}
                  `}
                />

              </button>

              {/* Answer */}
              <div
                className={`grid transition-all duration-300
                ${isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"}
                `}
              >

                <div className="overflow-hidden">

                  <p className="px-5 md:px-6 pb-5 md:pb-6 text-gray-600 text-sm md:text-base leading-relaxed">
                    {item.answer}
                  </p>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </section>

  );

}