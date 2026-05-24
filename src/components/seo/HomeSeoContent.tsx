import Link from "next/link";

/** Crawlable intro copy + internal links (helps Google understand site topics) */
export default function HomeSeoContent() {
  return (
    <section
      className="border-t border-slate-200 bg-slate-50 py-12 sm:py-16"
      aria-label="About AIWedia"
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Your directory for AI tools, SEO, and free utilities
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          <strong>AIWedia</strong> lists the best AI tools for developers,
          marketers, and creators. Compare{" "}
          <Link href="/category/ai-code-generators" className="text-violet-600 hover:underline">
            AI coding assistants
          </Link>
          , find{" "}
          <Link href="/category/ai-seo-tools" className="text-violet-600 hover:underline">
            AI SEO tools to rank on Google
          </Link>
          , explore the full{" "}
          <Link href="/category/ai-tools" className="text-violet-600 hover:underline">
            AI tools directory
          </Link>
          , or use our{" "}
          <Link href="/tools" className="text-violet-600 hover:underline">
            free download tools
          </Link>{" "}
          for social and video. Read the{" "}
          <Link href="/blog" className="text-violet-600 hover:underline">
            blog
          </Link>{" "}
          or browse the{" "}
          <Link href="/ai-directory" className="text-violet-600 hover:underline">
            AI directory hub
          </Link>
          ,{" "}
          <Link href="/web-directory" className="text-violet-600 hover:underline">
            web & utility hub
          </Link>
          , or see{" "}
          <Link href="/best" className="text-violet-600 hover:underline">
            best-of guides
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
