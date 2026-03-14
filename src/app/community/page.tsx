import { Twitter, Linkedin } from "lucide-react";

export default function Community() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-4xl font-bold text-white mb-6">
          AiWedia Community
        </h1>

        <p className="text-slate-400 mb-10">
          Connect with other AI enthusiasts and stay updated with the latest tools.
        </p>

        <div className="flex justify-center gap-6">

          <a
            href="https://x.com/aiwedia1"
            target="_blank"
            className="flex items-center gap-3 px-6 py-3 bg-slate-900 border border-slate-800 rounded-lg hover:border-[#eb442c]"
          >
            <Twitter size={18} />
            Twitter
          </a>

          <a
            href="https://www.linkedin.com/in/aiwedia-group-27231a3b6/"
            target="_blank"
            className="flex items-center gap-3 px-6 py-3 bg-slate-900 border border-slate-800 rounded-lg hover:border-[#eb442c]"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>

        </div>

      </div>
    </div>
  );
}