/** @type {import('next').NextConfig} */
const nextConfig = {
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
