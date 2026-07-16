import Link from "next/link";
import { BarChart3, Bot, Globe2, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { Badge, Card } from "@locallaunch/ui";

const sidebar = ["Dashboard", "Projects", "Website Generator", "Templates", "Domains", "SEO", "AI Copywriter", "Analytics", "Invoices", "Billing", "Settings"];

const projectCards = [
  { name: "Northside Dental", style: "Medical", status: "Ready for approval" },
  { name: "Velvet Bistro", style: "Restaurant", status: "Draft generated" },
  { name: "Marlow Fitness", style: "Modern", status: "Awaiting images" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-white/10 px-5 py-8">
          <div className="mb-8 rounded-3xl bg-white/5 p-4">
            <p className="text-sm text-slate-300">LocalLaunch AI</p>
            <p className="mt-2 text-xl font-semibold">Agency workspace</p>
          </div>
          <nav className="space-y-2">
            {sidebar.map((item) => (
              <div key={item} className="rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">
                {item}
              </div>
            ))}
          </nav>
        </aside>

        <section className="space-y-8 px-6 py-8 sm:px-10">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge>Production-grade MVP foundation</Badge>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight">Build premium local business sites without copying the web.</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                Projects flow from business enrichment to AI-generated copy, structured editing, approvals, SEO, billing, and deploy readiness.
              </p>
            </div>
            <Link
              href="/projects/demo"
              className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Open demo project
            </Link>
          </header>

          <div className="grid gap-5 xl:grid-cols-3">
            {[
              { icon: Sparkles, title: "Generator", text: "Maps URL or business name intake with source confidence." },
              { icon: Palette, title: "AI Designer", text: "Theme presets with premium spacing, motion, and typography." },
              { icon: ShieldCheck, title: "Approval Engine", text: "Rights-aware checks before any site goes live." },
            ].map(({ icon: Icon, title, text }) => (
              <Card key={title} className="border-white/10 bg-white/5">
                <Icon className="h-5 w-5 text-violet-300" />
                <h2 className="mt-4 text-xl font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card className="border-white/10 bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Projects</p>
                  <h2 className="mt-2 text-2xl font-semibold">Recent launches</h2>
                </div>
                <Globe2 className="h-5 w-5 text-cyan-300" />
              </div>
              <div className="mt-6 space-y-4">
                {projectCards.map((project) => (
                  <div key={project.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-slate-400">{project.style} theme</p>
                      </div>
                      <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Operating system</p>
                  <h2 className="mt-2 text-2xl font-semibold">Growth stack</h2>
                </div>
                <BarChart3 className="h-5 w-5 text-violet-300" />
              </div>
              <div className="mt-6 grid gap-4">
                {[
                  { label: "Credits remaining", value: "187" },
                  { label: "Average generation time", value: "34s" },
                  { label: "Publish readiness score", value: "91/100" },
                  { label: "Lead notifications", value: "Resend + inbox" },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 p-4">
                    <p className="text-sm text-slate-400">{metric.label}</p>
                    <p className="mt-2 text-xl font-semibold">{metric.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-violet-500/10 p-4">
                <div className="flex items-center gap-3">
                  <Bot className="h-5 w-5 text-violet-300" />
                  <p className="font-semibold">AI Copywriter panel</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Generate FAQs, refine headlines, and produce SEO metadata with auditable prompt histories.
                </p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
