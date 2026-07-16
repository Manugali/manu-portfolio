import { Card } from "@locallaunch/ui";

const supportMetrics = [
  { label: "Users", value: "1,284" },
  { label: "Projects", value: "3,912" },
  { label: "Failed generations", value: "0.8%" },
  { label: "Feature flags", value: "12 active" },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Admin panel</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Support, analytics, and release controls</h1>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {supportMetrics.map((metric) => (
            <Card key={metric.label} className="border-white/10 bg-white/5">
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-3 text-2xl font-semibold">{metric.value}</p>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
