export default function Documentation() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 px-6 py-20">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-white mb-6">
          Documentation
        </h1>

        <p className="text-slate-400 mb-10">
          Learn how AiWedia works and how you can explore AI tools effectively.
        </p>

        <div className="space-y-8">

          <div>
            <h3 className="text-xl font-semibold text-white">
              Getting Started
            </h3>
            <p className="text-slate-400 mt-2">
              Browse categories or search for AI tools using our search feature.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">
              Categories
            </h3>
            <p className="text-slate-400 mt-2">
              AI tools are organized into categories like AI Tools, Vibe Coding, and more.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">
              Blogs
            </h3>
            <p className="text-slate-400 mt-2">
              Our blog section provides insights about AI trends, tools, and tutorials.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}