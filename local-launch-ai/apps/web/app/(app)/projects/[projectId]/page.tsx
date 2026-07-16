import { Badge, Card } from "@locallaunch/ui";
import { generateSiteDraft } from "@/features/generator/server/generate-site";
import { SiteEditor } from "@/features/editor/components/site-editor";
import { buildPublishChecklist } from "@/features/publishing/server/publish-checklist";

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const site = await generateSiteDraft({
    projectId,
    sourceType: "business_search",
    sourceValue: "Velvet Bistro, Austin TX",
    businessName: "Velvet Bistro",
    location: "Austin, TX",
    ownerNotes: ["Known for chef-led tasting menus and private dining."],
    tone: "confident, elegant, local",
    style: "restaurant",
  });
  const checklist = buildPublishChecklist(site);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc,#eef2ff)] px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge>Project preview · {projectId}</Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{site.businessName}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              Generated from public business data and rewritten into original copy. Every publish-sensitive area remains reviewable before the site can go live.
            </p>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <SiteEditor initialSite={site} />
          <Card className="h-fit border-slate-200 bg-white/90">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Publish checklist</p>
            <div className="mt-4 space-y-3">
              {checklist.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-900">{item.label}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.status === "ready"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
