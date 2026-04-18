import { Metadata } from "next";
import readingTime from "reading-time";
import BlogView from "@/blogsview/BlogView";
import { notFound } from "next/navigation";

// ================= TYPES =================
type Blog = {
  title: string;
  summary: string;
  content?: string;
  image?: string;
  fullImage?: string;
  date: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
};

// ✅ IMPORTANT: params is Promise (Next.js latest)
type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// ================= FETCH =================
async function getBlog(slug: string): Promise<Blog | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/public/${slug}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return null;

  return res.json();
}

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/public`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) return [];

  return res.json();
}

// ================= METADATA =================
export async function generateMetadata(
  { params }: BlogPageProps
): Promise<Metadata> {
  const { slug } = await params; // ✅ FIX

  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.summary,
    alternates: {
      canonical: `https://aiwedia.com/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.summary,
      url: `https://aiwedia.com/blog/${blog.slug}`,
      images: [
        {
          url: blog.fullImage || blog.image || "/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.summary,
      images: [blog.fullImage || blog.image || "/og-image.png"],
    },
  };
}

// ================= PAGE =================
export default async function SingleBlogPage({ params }: BlogPageProps) {
  const { slug } = await params; // ✅ FIX

  const blog = await getBlog(slug);

  // ✅ SEO-safe 404
  if (!blog) return notFound();

  const allBlogs = await getBlogs();

  const related = allBlogs
    .filter((b) => b.slug !== slug)
    .slice(0, 3);

  // ================= HEADINGS =================
  const headings: { id: string; text: string }[] = [];
  let html = blog.content || "";

  html = html.replace(/<(h[12])>(.*?)<\/\1>/gi, (match, tag, text, offset) => {
    const id = `heading-${offset}`;
    headings.push({
      id,
      text: text.replace(/<[^>]*>?/gm, ""),
    });
    return `<${tag} id="${id}" class="scroll-mt-24">${text}</${tag}>`;
  });

  const stats = readingTime(blog.content || "");

  return (
    <>
      {/* ================= ARTICLE SCHEMA ================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: blog.title,
            description: blog.summary,
            image: blog.fullImage || blog.image,
            author: {
              "@type": "Person",
              name: "Krishna",
            },
            publisher: {
              "@type": "Organization",
              name: "Aiwedia",
              logo: {
                "@type": "ImageObject",
                url: "https://aiwedia.com/favicon.png",
              },
            },
            datePublished: blog.createdAt,
            dateModified: blog.updatedAt,
          }),
        }}
      />

      {/* ================= BLOG VIEW ================= */}
      <BlogView
        blog={blog}
        related={related}
        headings={headings}
        html={html}
        readingText={stats.text}
      />
    </>
  );
}