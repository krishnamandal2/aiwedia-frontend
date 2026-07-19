export type HeroStripTool = {
  title: string;
  image: string;
  link: string;
  href?: string;
  description?: string;
};

export type HeroCopy = {
  badge: string;
  headline: string;
  headlineAccent: string;
  subtitle: string;
};

export const DEFAULT_HERO_STRIP: HeroStripTool[] = [
  { title: "ChatGPT", image: "/aiimage/chatgpt.png", link: "https://chatgpt.com/", href: "/tool/ai-tools/chatgpt", description: "OpenAI's flagship AI assistant" },
  { title: "Gemini", image: "/aiimage/Googlegemini.png", link: "https://gemini.google.com/app", href: "/tool/ai-tools/google-gemini", description: "Google's multimodal AI" },
  { title: "Claude", image: "/aiimage/cld.png", link: "https://claude.ai/", href: "/tool/ai-tools/claude-ai", description: "Anthropic's reasoning AI" },
  { title: "Cursor", image: "/aitools/cursor.png", link: "https://cursor.com/", href: "/category/ai-code-generators", description: "AI-powered code editor" },
  { title: "DeepSeek", image: "/aitools/deepseek.png", link: "https://www.deepseek.com/", href: "/category/ai-tools", description: "Coding & reasoning models" },
  { title: "GitHub Copilot", image: "/aitools/githubco.png", link: "https://github.com/copilot", href: "/category/ai-code-generators", description: "AI pair programmer" },
  { title: "Perplexity", image: "/aitools/Perplexity.png", link: "https://www.perplexity.ai/", href: "/tool/ai-tools/perplexity-ai", description: "AI answer engine" },
  { title: "Replit", image: "/aitools/replit.png", link: "https://replit.com/", href: "/category/ai-code-generators", description: "Build with AI in the browser" },
  { title: "Resemble AI", image: "/aitools/resemble.png", link: "https://www.resemble.ai/", href: "/category/ai-tools", description: "AI voice generation" },
  { title: "Voicemod AI", image: "/aitools/Voicemod.png", link: "https://www.voicemod.net/", href: "/category/ai-tools", description: "AI voice changer" },
  { title: "Surfer SEO", image: "/aitools/sufer.png", link: "https://surferseo.com/", href: "/category/ai-seo-tools", description: "AI SEO optimization" },
  { title: "MidJourney", image: "/aitools/midjourney.png", link: "https://www.midjourney.com/", href: "/category/ai-tools", description: "AI image generation" },
  { title: "Locofy.ai", image: "/aitools/locofy.png", link: "https://www.locofy.ai/", href: "/category/ai-code-generators", description: "Design to production code" },
  { title: "Canva AI", image: "/aitools/canva.png", link: "https://www.canva.com/ai-assistant/", href: "/category/ai-tools", description: "AI design assistant" },
  { title: "Sora", image: "/aitools/sora.png", link: "https://sora.chatgpt.com/explore", href: "/category/ai-tools", description: "OpenAI video generation" },
  { title: "Runway ML", image: "/aitools/runway.png", link: "https://runwayml.com/", href: "/category/ai-tools", description: "AI video creation" },
];

export const DEFAULT_HERO_COPY: HeroCopy = {
  badge: "AI tools directory 2026",
  headline: "Find the best AI tools.",
  headlineAccent: "One place to start.",
  subtitle:
    "Discover, compare, and launch ChatGPT, Claude, Cursor, and thousands more — curated with AIWedia Intelligence.",
};
