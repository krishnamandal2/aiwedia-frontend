"use client";

type Heading = {
  id: string;
  text: string | null;
};

export default function TableOfContents({
  headings,
  activeId,

}: {
  headings: Heading[];
  activeId?: string;
  onItemClick?: () => void;
}) {
  if (!headings.length) return null;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);

    if (!el) return;

    const offset = 90;

    const top =
      el.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  return (
    <div className="sticky top-24 max-h-[70vh] overflow-y-auto pr-2">

      {/* Title */}
      <h3 className="font-semibold mb-4 text-gray-900 tracking-tight">
        Table of Contents
      </h3>

      {/* Links */}
      <ul className="text-sm space-y-2">

        {headings.map((h) => (
          <li key={h.id}>
            <button
              onClick={() => scrollToHeading(h.id)}
              className={`text-left block w-full transition-colors duration-200 ${
                activeId === h.id
                  ? "text-black font-semibold"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {h.text}
            </button>
          </li>
        ))}

      </ul>
    </div>
  );
}