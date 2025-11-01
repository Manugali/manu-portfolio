import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
