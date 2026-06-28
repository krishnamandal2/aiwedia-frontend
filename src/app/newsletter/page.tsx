import Link from "next/link";
import { Mail, Sparkles, Newspaper, Bot, BookOpen } from "lucide-react";
import NewsletterSubscribe from "@/newsletter/NewsletterSubscribe";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildPageMetadata({
  title: "AIWedia Newsletter — Weekly AI Tools & Tech Digest",
  description:
    "Subscribe to the AIWedia newsletter for weekly AI tool picks, news, prompts, and guides. No spam — unsubscribe anytime.",
  path: "/newsletter",
  keywords: ["AI newsletter", "AI tools weekly", "tech newsletter", "AIWedia subscribe"],
});

const BENEFITS = [
  {
    icon: Bot,
    title: "New AI tools",
    desc: "Fresh additions to our directory every week.",
  },
  {
    icon: Newspaper,
    title: "AI news & trends",
    desc: "What changed in ChatGPT, Gemini, agents, and more.",
  },
  {
    icon: BookOpen,
    title: "Guides & comparisons",
    desc: "Best-of lists and head-to-head tool breakdowns.",
  },
  {
    icon: Sparkles,
    title: "Prompt picks",
    desc: "Copy-ready prompts from our prompt library.",
  },
];

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 text-center">
        <div className="inline-flex items-center justify-center rounded-2xl bg-violet-600/20 p-4 mb-6">
          <Mail size={32} className="text-violet-400" />
        </div>
        <h1 className="text-3xl font-black sm:text-5xl">
          AIWedia Weekly Newsletter
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-400 text-lg">
          Join thousands of AI enthusiasts. One email per week — tools, news,
          prompts, and guides curated for builders and marketers.
        </p>

        <div className="mx-auto mt-10 max-w-md text-left">
          <NewsletterSubscribe />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 text-left">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <b.icon size={24} className="text-violet-400" />
              <h2 className="mt-3 font-bold text-white">{b.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{b.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-slate-500">
          Already subscribed?{" "}
          <Link href="/blog" className="text-violet-400 hover:underline">
            Read latest posts
          </Link>{" "}
          or explore the{" "}
          <Link href="/ai-directory" className="text-violet-400 hover:underline">
            AI directory
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
