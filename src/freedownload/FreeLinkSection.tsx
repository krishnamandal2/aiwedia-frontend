import Link from "next/link";
import {
  ArrowUpRight,
  Download,
  Home,
  ChevronRight,
  ExternalLink,
  Shield,
} from "lucide-react";
import AboutSection from "./AboutSection";
import FAQSection from "./FAQSection";
import HowToSection from "./HowToSection";
import BenefitsSection from "./BenefitsSection";
import ScreenshotsSection from "./ScreenshotsSection";

type Tool = {
  name: string;
  desc: string;
  url: string;
};

type FAQ = {
  question: string;
  answer: string;
};

type HowToStep = {
  step: number;
  title: string;
  text: string;
};

type Screenshot = {
  title: string;
  image: string;
  caption: string;
};

type Props = {
  title: string;
  description: string;
  tools: Tool[];
  about?: string;
  faq?: FAQ[];
  howTo?: HowToStep[];
  benefits?: string[];
  screenshots?: Screenshot[];
};

export default function FreeLinkSection({
  title,
  description,
  tools,
  about,
  faq,
  howTo,
  benefits,
  screenshots,
}: Props) {
  return (
    <div className="relative min-h-screen bg-[#06060c] text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-emerald-600/10 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[350px] w-[350px] rounded-full bg-violet-600/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
          <Link
            href="/"
            className="inline-flex items-center gap-1 hover:text-emerald-400"
          >
            <Home size={14} />
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/tools" className="hover:text-emerald-400">
            Free tools
          </Link>
          <ChevronRight size={12} />
          <span className="truncate text-slate-300">{title}</span>
        </nav>

        <header className="mb-10 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
            <Download size={12} />
            Free toolkit
          </div>
          <h1 className="mt-4 text-2xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {description}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-500">
            <Shield size={14} className="text-emerald-400" />
            We review and list tools — we do not host third-party content.
          </p>
        </header>

        {benefits && benefits.length > 0 && (
          <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <BenefitsSection benefits={benefits} />
          </div>
        )}

        {howTo && howTo.length > 0 && (
          <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <HowToSection howTo={howTo} />
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">
            {tools.length} recommended tools
          </h2>
        </div>

        {tools.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-amber-500/30 bg-amber-500/5 p-6 text-center">
            <p className="text-sm text-slate-400">
              Tool links are loading from our database. If this stays empty, run{" "}
              <code className="rounded bg-white/10 px-1 text-amber-200">
                npm run seed:free-tools-popular
              </code>{" "}
              in the backend, then refresh.
            </p>
            <Link
              href="/tools"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:underline"
            >
              Back to all free tools
            </Link>
          </div>
        ) : (
        <div className="space-y-3">
          {tools.map((tool, index) => (
            <article
              key={tool.name}
              className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-emerald-500/30 hover:bg-white/[0.05] sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="flex min-w-0 flex-1 gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                    index < 3
                      ? "bg-gradient-to-br from-emerald-600/30 to-cyan-600/20 text-emerald-300"
                      : "bg-white/5 text-slate-400"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 sm:text-lg">
                    {tool.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {tool.desc}
                  </p>
                </div>
              </div>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 text-sm font-bold text-white transition hover:from-emerald-500 hover:to-teal-500 sm:min-w-[140px]"
              >
                Visit site
                <ExternalLink size={14} />
              </a>
            </article>
          ))}
        </div>
        )}

        {screenshots && screenshots.length > 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <ScreenshotsSection screenshots={screenshots} />
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <AboutSection about={about} />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <FAQSection faq={faq} />
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-emerald-500/40 hover:text-white"
          >
            Browse all free tools
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
