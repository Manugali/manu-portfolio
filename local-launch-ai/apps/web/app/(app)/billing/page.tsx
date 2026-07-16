import { Card } from "@locallaunch/ui";
import { describePlans } from "@/lib/integrations/stripe";

export default function BillingPage() {
  const plans = describePlans();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Billing</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Plans built for freelancers through white-label agencies</h1>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <Card key={plan.tier} className="border-white/10 bg-white/5">
              <p className="text-sm text-slate-400">{plan.tier}</p>
              <p className="mt-3 text-3xl font-semibold">{plan.price}</p>
              <p className="mt-2 text-sm text-slate-300">{plan.credits} generation credits</p>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
