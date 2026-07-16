import Stripe from "stripe";
import { env } from "@/lib/env";

export function getStripeClient(): Stripe | null {
  if (!env.STRIPE_SECRET_KEY) {
    return null;
  }

  return new Stripe(env.STRIPE_SECRET_KEY);
}

export function describePlans() {
  return [
    { tier: "Free", credits: 3, price: "$0" },
    { tier: "Pro", credits: 30, price: "$49" },
    { tier: "Agency", credits: 150, price: "$199" },
    { tier: "White Label", credits: 500, price: "Custom" },
  ];
}
