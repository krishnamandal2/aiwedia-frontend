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
export const dynamic = "force-dynamic";

async function getBlog(slug: string): Promise<Blog | null> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) return null;

  const res = await fetch(`${base}/api/blogs/public/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

async function getBlogs(): Promise<Blog[]> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) return [];

  const res = await fetch(`${base}/api/blogs/public?page=1&limit=50`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  if (Array.isArray(data)) return data;
  return data.blogs ?? [];
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

  const image = blog.fullImage || blog.image;

  return {
    title: blog.title,
    description: blog.summary,
    alternates: {
      canonical: `https://aiwedia.com/blog/${blog.slug}`,
    },
    openGraph: {
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      title: blog.title,
      description: blog.summary,
      url: `https://aiwedia.com/blog/${blog.slug}`,
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: blog.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.summary,
      images: image ? [image] : undefined,
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
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.summary,
            image: blog.fullImage || blog.image,
            url: `https://aiwedia.com/blog/${blog.slug}`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://aiwedia.com/blog/${blog.slug}`,
            },
            author: {
              "@type": "Person",
              name: "Krishna",
            },
            publisher: {
              "@type": "Organization",
              name: "AIWedia",
              logo: {
                "@type": "ImageObject",
                url: "https://aiwedia.com/favicon.png",
              },
            },
            datePublished: blog.createdAt || blog.date,
            dateModified: blog.updatedAt || blog.createdAt || blog.date,
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