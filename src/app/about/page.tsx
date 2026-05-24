import InfoPageShell from "@/components/layout/InfoPageShell";
import Link from "next/link";
import { Compass, Layers, Sparkles, Target } from "lucide-react";

export const metadata = {
  title: "About Us",
  description:
    "Learn about AiWedia — your curated directory for AI tools, web utilities, and free downloads.",
};

export default function AboutPage() {
  return (
    <InfoPageShell
      title="About AiWedia"
      subtitle="One place to discover AI tools, web utilities, and the sites people search for every day."
    >
      <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
        AiWedia helps you find, compare, and access the best tools on the web —
        without jumping between dozens of tabs. We organize AI categories, web
        utilities, free download guides, blogs, and trending picks into a single
        streamlined experience.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          {
            icon: Target,
            title: "Our mission",
            text: "Make powerful digital tools accessible, searchable, and easy to use for creators, developers, students, and teams.",
          },
          {
            icon: Layers,
            title: "What we offer",
            text: "Curated AI directories, web tool hubs, free download pages, comparisons, collections, and fresh blog content.",
          },
          {
            icon: Compass,
            title: "Built for discovery",
            text: "Smart categories, filters, favorites, and trending lists so you spend less time searching and more time building.",
          },
          {
            icon: Sparkles,
            title: "Always improving",
            text: "We add high-demand tools and pages based on what people actually search for on Google.",
          },
        ].map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 transition hover:border-violet-200 hover:bg-violet-50/40"
          >
            <div className="mb-3 inline-flex rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 p-2.5 text-white">
              <Icon size={20} aria-hidden />
            </div>
            <h2 className="text-base font-bold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-base leading-relaxed text-slate-600">
        Thank you for visiting AiWedia. We hope this platform saves you time and
        keeps you productive. Explore our{" "}
        <Link href="/category/ai-tools" className="font-semibold text-violet-600 hover:text-violet-800">
          AI tools directory
        </Link>{" "}
        or browse{" "}
        <Link href="/tools" className="font-semibold text-violet-600 hover:text-violet-800">
          free download tools
        </Link>
        .
      </p>
    </InfoPageShell>
  );
}
