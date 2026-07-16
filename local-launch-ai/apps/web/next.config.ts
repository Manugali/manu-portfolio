import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const workspaceRoot = path.join(fileURLToPath(new URL(".", import.meta.url)), "../..");

const nextConfig: NextConfig = {
  transpilePackages: [
    "@locallaunch/business-logic",
    "@locallaunch/prompts",
    "@locallaunch/templates",
    "@locallaunch/types",
    "@locallaunch/ui",
  ],
  typedRoutes: true,
  turbopack: {
    root: workspaceRoot,
  },
};

export default nextConfig;
