import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/webp"],
  },
  // Allow R3F / Three.js to work without SSR issues
  transpilePackages: ["three"],
};

export default nextConfig;
