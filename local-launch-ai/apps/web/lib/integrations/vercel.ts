import { env } from "@/lib/env";

export function getDeploymentProviderStatus() {
  return {
    provider: "vercel",
    projectLinked: Boolean(env.VERCEL_PROJECT_ID),
    mode: env.VERCEL_PROJECT_ID ? "one-click deploy ready" : "local preview only",
  };
}
