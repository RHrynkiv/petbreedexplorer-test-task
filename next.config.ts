import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn2.thedogapi.com",
      },
      {
        protocol: "https",
        hostname: "cdn2.thecatapi.com",
      },
    ],
  },
};

export default nextConfig;
