import BlogCard from "@/blogscms/BlogCard";

type Blog = {
 
  title: string;
  slug: string;
  summary: string;
  image: string;
  date: string;
};

// ✅ Server-side fetch
async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/public`,
     { cache: "no-store" }
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen bg-gray-50/50">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Latest <span className="text-blue-600">Tools & Blogs</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Stay ahead with the best AI tools, agents, and trends shaping the future.
          </p>
        </header>

        {blogs.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.slug}
                slug={blog.slug}
                title={blog.title}
                summary={blog.summary}
                image={blog.image}
                date={blog.date}
              />
            ))}
          </section>
        ) : (
          <p className="text-center text-gray-500 text-xl">
            No articles found. Check back soon!
          </p>
        )}
      </div>
    </main>
  );
}
