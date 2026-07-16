import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@locallaunch/business-logic",
    "@locallaunch/prompts",
    "@locallaunch/templates",
    "@locallaunch/types",
    "@locallaunch/ui",
  ],
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
