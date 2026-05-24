import BlogCard from "@/blogscms/BlogCard";

import BlogPagination from "@/components/blog/BlogPagination";

import { getPublicBlogs } from "@/lib/blogApi";

import { buildPageMetadata } from "@/lib/seo/buildMetadata";

import { BLOG_INDEX_SEO } from "@/lib/seo/pages";

import { Sparkles } from "lucide-react";



export const metadata = buildPageMetadata(BLOG_INDEX_SEO);

export const dynamic = "force-dynamic";



interface PageProps {

  searchParams: Promise<{ page?: string }>;

}



export default async function BlogsPage({ searchParams }: PageProps) {

  const params = await searchParams;

  const page = Math.max(1, parseInt(params.page || "1", 10) || 1);

  const { blogs, pagination } = await getPublicBlogs(page, 12);



  return (

    <main className="min-h-screen bg-[#06060c] text-slate-100">

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />

        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />

      </div>



      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">

        <header className="mb-12 text-center sm:text-left">

          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-violet-300">

            <Sparkles size={12} />

            AIWedia Journal

          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">

            Insights on{" "}

            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">

              AI & tools

            </span>

          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400 sm:mx-0">

            Guides on AI tools, SEO, vibe coding, and what&apos;s trending —

            written to help you rank and build faster.

          </p>

        </header>



        {blogs.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-slate-300 font-semibold">No published posts showing</p>
            <p className="mt-2 text-sm text-slate-500">
              If you had posts before, set status to <strong className="text-violet-300">Published</strong> in{" "}
              <a href="/admin/dashboard" className="text-violet-400 underline">
                Admin
              </a>
              , or run <code className="text-xs">npm run migrate:blogs</code> in the backend.
            </p>
          </div>
        ) : (

          <>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {blogs.map((blog) => (

                <BlogCard key={blog.slug} {...blog} />

              ))}

            </div>

            <BlogPagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              hasPrev={pagination.hasPrev}
              hasNext={pagination.hasNext}
            />

          </>

        )}

      </div>

    </main>

  );

}

