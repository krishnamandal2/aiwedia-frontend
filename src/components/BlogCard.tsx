import Link from "next/link";
import Image from "next/image"; // Optimization

type BlogCardProps = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  category?: string; // Added optional category
};

export default function BlogCard({ slug, title, summary, image, date, category = "Article" }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group">
      <article className="h-full border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 bg-white flex flex-col">
        
        {/* Image Container with Zoom Effect */}
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600">
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
              {title}
            </h2>
            <p className="text-gray-500 text-sm mt-3 line-clamp-3 leading-relaxed">
              {summary}
            </p>
          </div>

          {/* Footer Metadata */}
          <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-tighter">
              {date}
            </span>
            <span className="text-blue-600 text-xs font-semibold flex items-center group-hover:translate-x-1 transition-transform">
              Read More 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}