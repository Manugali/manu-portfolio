import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legacy Bridge Simulator",
  description:
    "Interactive integration demo: mock legacy HR, Policy, and GL systems syncing into Payout Ops with retries, dead-letter handling, and reconciliation.",
  openGraph: {
    title: "Legacy Bridge Simulator · Manohar Gali",
    description:
      "Watch adapters, retries, dead-letter queues, and reconciliation in a fictional financial ops integration.",
  },
};

export default function BridgeLabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
