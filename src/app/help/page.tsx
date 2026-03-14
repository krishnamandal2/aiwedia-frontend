export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 px-6 py-20">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-white mb-6">
          Help Center
        </h1>

        <p className="text-slate-400 mb-10">
          Find answers to common questions and learn how to use AiWedia.
        </p>

        <div className="space-y-8">

          <div>
            <h3 className="text-xl font-semibold text-white">
              How do I submit an AI tool?
            </h3>
            <p className="text-slate-400 mt-2">
              You can submit your AI tool through our contact page. Our team will review it before publishing.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">
              How often is the website updated?
            </h3>
            <p className="text-slate-400 mt-2">
              We regularly update AiWedia with new AI tools, blogs, and resources.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">
              How can I report an issue?
            </h3>
            <p className="text-slate-400 mt-2">
              Please contact us at contactaiwedia@gmail.com with details about the issue.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}