import Link from "next/link";
import AboutSection from "./AboutSection";
import FAQSection from "./FAQSection";

type Tool = {
  name: string;
  desc: string;
  url: string;
};

type FAQ = {
  question: string;
  answer: string;
};

type Props = {
  title: string;
  description: string;
  tools: Tool[];
  about?: string;
  faq?: FAQ[];
};

export default function FreeLinkSection({
  title,
  description,
  tools,
  about,
  faq,
}: Props) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 md:py-12">

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-indigo-600">
          Home
        </Link>

        <span>›</span>

        <Link href="/tools" className="hover:text-indigo-600">
          Tools
        </Link>

        <span>›</span>

        <span className="text-gray-800 font-medium break-words">
          {title}
        </span>
      </nav>

      {/* Header */}
      <div className="mb-10">

        <h1 className="text-3xl md:text-5xl font-bold mb-4 
        bg-gradient-to-r from-indigo-600 to-purple-600 
        bg-clip-text text-transparent break-words leading-tight">
          {title}
        </h1>

        <p className="text-gray-600 text-base md:text-lg max-w-3xl">
          {description}
        </p>

        <p className="text-xs text-gray-500 mt-3 bg-gray-100 inline-block px-3 py-1 rounded-full">
          We review and list the best tools. We do not host any content.
        </p>

      </div>

      {/* Tools List */}
      <div className="grid gap-5">

        {tools.map((tool, index) => (

          <div
            key={tool.name}
            className="group border border-gray-200 
            rounded-2xl p-5 md:p-6 
            bg-white hover:shadow-lg 
            transition-all duration-300 
            hover:-translate-y-1"
          >

            {/* Responsive Layout */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

              {/* Left Content */}
              <div className="flex gap-4 flex-1 min-w-0">

                {/* Number Badge */}
                <div className="w-10 h-10 flex-shrink-0
                flex items-center justify-center 
                rounded-xl bg-indigo-100 
                text-indigo-600 font-bold text-sm">
                  #{index + 1}
                </div>

                <div className="min-w-0">

                  {/* Title Fix */}
                  <h2 className="text-base md:text-lg font-semibold 
                  text-gray-900 group-hover:text-indigo-600 
                  transition break-words leading-snug">

                    {tool.name}

                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mt-2 
                  break-words leading-relaxed">

                    {tool.desc}

                  </p>

                </div>

              </div>

              {/* CTA Button */}
              <div className="flex sm:flex-col justify-end sm:justify-start">

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center
                  bg-gradient-to-r 
                  from-indigo-600 to-purple-600 
                  hover:opacity-90 
                  text-white px-5 py-2.5 
                  rounded-xl text-sm font-medium 
                  transition whitespace-nowrap"
                >
                  Visit Site ↗
                </a>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* About Section */}
      <AboutSection about={about} />

      {/* FAQ Section */}
      <FAQSection faq={faq} />

    </section>
  );
}