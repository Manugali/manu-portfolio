export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-slate-950 p-8">
      <div className="grid gap-6">
        <div className="h-10 w-72 animate-pulse rounded-2xl bg-white/10" />
        <div className="grid gap-5 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-44 animate-pulse rounded-3xl bg-white/10" />
          ))}
        </div>
      </div>
    </main>
  );
}
