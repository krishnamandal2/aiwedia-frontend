import { Info } from "lucide-react";

type Props = {
  about?: string;
};

export default function AboutSection({ about }: Props) {
  if (!about) return null;

  return (
    <section className="mt-16">

      {/* Container Card */}
      <div className="relative bg-white border rounded-2xl shadow-sm p-8 overflow-hidden">

        {/* Gradient Accent */}
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">

          {/* Icon */}
          <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">
            <Info className="w-5 h-5" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-900">
            About These Tools
          </h2>

        </div>

        {/* Content */}
        <p className="text-gray-700 leading-relaxed text-base">
          {about}
        </p>

      </div>

    </section>
  );
}