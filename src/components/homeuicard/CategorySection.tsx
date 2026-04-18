"use client"; 

import { ArrowRight } from 'lucide-react';


type Category = {
  slug: string;
  title: string;
  desc: string;
  image: string;
};

type Props = {
  title: string;
  description: string;
  categories: Category[];
  viewAllLink?: string;
};

export default function CategorySection({
  title,
  description,
  categories,
  viewAllLink,
}: Props) {
  if (!categories.length) return null;

  return (
    <section className="py-5 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            {title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto my-4" />
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, index) => (
            <CategoryCard
              key={cat.slug}
              image={cat.image}
              title={cat.title}
              description={cat.desc}
              slug={cat.slug}
              index={index}
            />
          ))}
        </div>

        
        {viewAllLink && (
          <div className="text-center mt-12">
            <a
              href={viewAllLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm hover:shadow"
            >
              View all categories
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}


function CategoryCard({
  image,
  title,
  description,
  slug,
  index = 0,
}: {
  image: string;
  title: string;
  description: string;
  slug: string;
  index?: number;
}) {
  const fallbackImage = 'https://res.cloudinary.com/dj3vrogpl/image/upload/v1769150882/aiimag_a1g9uk.jpg';

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
      }}
    >
      <a href={`/category/${slug}`} className="block">
        <div className="relative h-48 overflow-hidden bg-slate-200">
          <img
            src={image || fallbackImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
          <div className="mt-4 flex items-center text-indigo-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-8px] group-hover:translate-x-0">
            Explore
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </a>
    </div>
  );
}

