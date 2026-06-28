/** @type {import('next').NextConfig} */
const apiBackend =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:7300";

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/tools/youtube-thumbnail-downloader",
        destination: "/tools/youtube-thumbnail-downloader-free",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const base = apiBackend.replace(/\/$/, "");
    return [
      { source: "/api/chatllm", destination: `${base}/api/chatllm` },
      { source: "/api/favorites", destination: `${base}/api/favorites` },
      { source: "/api/auth/:path*", destination: `${base}/api/auth/:path*` },
      { source: "/api/search", destination: `${base}/api/search` },
      { source: "/api/subscribe", destination: `${base}/api/subscribe` },
      { source: "/api/site", destination: `${base}/api/site` },
      { source: "/api/message", destination: `${base}/api/message` },
    ];
  },
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
         
    ],

    // ✅ ADD THIS
    qualities: [70, 75, 80],
  },
};

module.exports = nextConfig;
