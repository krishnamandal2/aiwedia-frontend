import Link from "next/link";
import Image from "next/image";
import { getAllTools } from "@/lib/api";

// Define a proper type for your tool data (adjust as needed)
interface Tool {
  slug: string;
  image?: string;
  title?: string;
  categoryTitle?: string;
  intro?: string;
}

export default async function FreeToolsGrid() {
  const data = await getAllTools();

  return (
    <section className="mx-auto max-w-8xl px-4 py-12">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-3xl">
            Explore Free Tools
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Download tools for Instagram, Twitter, Facebook and more
          </p>
        </div>
        
      </div>

      {/* Grid – reduced gap & responsive columns */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((item: Tool) => (
          <Link
            key={item.slug}
            href={`/tools/${item.slug}`}
            className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* Image Container - fixed aspect ratio for consistency */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
              <Image
                src={item.image || "/fallback.jpg"}
                alt={item.title || item.categoryTitle || "Tool image"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              {/* Free Badge */}
              <div className="absolute left-2 top-2 z-10">
                <span className="inline-flex items-center rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-indigo-600 shadow-sm backdrop-blur-sm">
                  Free
                </span>
              </div>

              {/* Subtle hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
            </div>

            {/* Content – reduced padding slightly for compactness */}
            <div className="flex flex-1 flex-col p-3">
              <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-gray-900">
                {item.title || item.categoryTitle || "Tool Name"}
              </h3>

              <p className="line-clamp-2 mt-1 min-h-[2.2rem] text-xs leading-relaxed text-gray-600">
                {item.intro}
              </p>

              {/* Footer CTA */}
              <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
                <span className="flex items-center gap-1 text-xs font-medium text-indigo-600 transition group-hover:text-indigo-700">
                  Explore
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </span>
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 transition-all duration-200 group-hover:scale-125 group-hover:bg-indigo-600" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}