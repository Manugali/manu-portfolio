import Link from "next/link";
import { ArrowRight, Sparkles, WandSparkles } from "lucide-react";
import { Badge, Button, Card } from "@locallaunch/ui";

const highlights = [
  "Generate a polished local-business site in under a minute",
  "Track provenance and approvals for every imported field",
  "Edit sections, themes, and calls to action before publishing",
];

export default function MarketingPage() {
  return (
    <main className="min-h-screen px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-14">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-950 px-3 py-2 text-sm font-semibold text-white">LL</div>
            <span className="text-sm font-medium text-slate-600">LocalLaunch AI</span>
          </div>
          <Link href="/dashboard" className="text-sm font-semibold text-slate-700">
            Open dashboard
          </Link>
        </header>

        <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <Badge>Website generation with approval-first publishing</Badge>
            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-7xl">
                Turn a Google Maps listing into a premium website your client will actually want to launch.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                LocalLaunch AI enriches public business facts, rewrites them into original marketing copy, and assembles an editable site draft with polished themes, provenance signals, and approval checkpoints.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard">
                <Button className="gap-2">
                  Start generating
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                href="/projects/demo"
                className="inline-flex items-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
              >
                View project preview
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <Card key={item} className="rounded-2xl border-slate-200 bg-white/80 p-5">
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden border-slate-200 bg-slate-950 p-0 text-white">
            <div className="border-b border-white/10 p-5">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Sparkles className="h-4 w-4" />
                Generation session
              </div>
            </div>
            <div className="space-y-6 p-6">
              <div className="rounded-3xl bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Business source</p>
                <p className="mt-3 text-lg font-semibold">Google Maps URL + manual overrides</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Public facts are normalized, source-tagged, and handed to the content engine.
                </p>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-violet-500/25 to-cyan-400/20 p-5">
                <div className="flex items-center gap-3">
                  <WandSparkles className="h-5 w-5" />
                  <p className="font-semibold">Original copy generation</p>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  <li>Summaries replace copied descriptions</li>
                  <li>Testimonials require approval before publish</li>
                  <li>Business-owned images only in live galleries</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
