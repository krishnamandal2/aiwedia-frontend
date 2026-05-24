import InfoPageShell from "@/components/layout/InfoPageShell";
import Link from "next/link";
import { Mail, MessageCircle, Send } from "lucide-react";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with the AiWedia team — questions, feedback, and partnerships.",
};

export default function ContactPage() {
  return (
    <InfoPageShell
      title="Contact Us"
      subtitle="Questions, suggestions, or partnership ideas? We’d love to hear from you."
    >
      <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
        Whether you found a broken link, want to suggest a tool, or are interested
        in collaborating — reach out anytime. We read every message.
      </p>

      <div className="mt-8 space-y-4">
        <a
          href="mailto:contact@aiwedia.com"
          className="flex items-start gap-4 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-5 transition hover:border-violet-300 hover:shadow-md"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
            <Mail size={22} aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wide text-violet-700">
              Email
            </p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              contact@aiwedia.com
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Tap to open your mail app — we usually reply within a few business days.
            </p>
          </div>
        </a>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
          <div className="flex items-center gap-2 text-slate-900">
            <MessageCircle size={18} className="text-indigo-500" />
            <h2 className="font-bold">What to include</h2>
          </div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>Tool name and URL if you’re suggesting a listing</li>
            <li>Page link if something looks wrong on the site</li>
            <li>Short description for partnership or press inquiries</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href="mailto:contact@aiwedia.com?subject=AiWedia%20Contact"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition hover:from-indigo-500 hover:to-violet-500"
        >
          <Send size={16} />
          Send an email
        </a>
        <Link
          href="https://x.com/aiwedia1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-violet-200 hover:text-violet-700"
        >
          Follow on X
        </Link>
      </div>
    </InfoPageShell>
  );
}
