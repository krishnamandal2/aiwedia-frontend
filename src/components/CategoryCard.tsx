//home card of category

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  image: string;
  title: string;
  description: string;
  slug: string;
  rank?: number;
}

const CategoryCard = ({
  image,
  title,
  description,
  slug,
  rank = 99,
}: CategoryCardProps) => {
  return (
    <Link href={`/category/${slug}`} prefetch={false} className="group block h-full">
     
     
      <div className="relative bg-[#f8f8f8] rounded-3xl border border-[#c6c6c6]/70 hover:border-[#eb442c]/40 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full overflow-hidden">

        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#c6c6c6]/40">
          <Image
            src={image}
            alt={title}
            fill
            quality={80}
          
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f8f8f8]/70" />

          <div className="absolute top-4 right-4 bg-[#f8f8f8]/90 backdrop-blur-md p-2.5 rounded-xl border border-[#c6c6c6] shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight size={18} className="text-[#eb442c]" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <h3 className="text-xl font-extrabold text-[#3a3a3a] group-hover:text-[#eb442c] transition-colors mb-2 leading-snug">
              {title}
            </h3>
            <p className="text-sm text-[#6a6a6a] font-medium line-clamp-4 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#7c7c7c] group-hover:text-[#3a3a3a] transition-colors">
              Browse Category
            </span>

            <div className="flex items-center gap-2">
              <div className="w-0 group-hover:w-6 h-[1.5px] bg-[#eb442c] transition-all duration-300" />
              <span className="text-xs font-bold text-[#eb442c]">View</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#eb442c] group-hover:w-full transition-all duration-500" />
      </div>
      
    </Link>
  );
};

export default CategoryCard;
