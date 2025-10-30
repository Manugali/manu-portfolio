import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get("user") || process.env.NEXT_PUBLIC_GITHUB_USER || "Manugali";
  const headers: Record<string, string> = { "User-Agent": "manu-portfolio" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;

  // stars total
  const reposRes = await fetch(`https://api.github.com/users/${user}/repos?per_page=100`, { headers, cache: "no-store" });
  const repos = await reposRes.json();
  const stars = Array.isArray(repos) ? repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0) : 0;

  // commits approx: count PushEvent in recent public events
  const eventsRes = await fetch(`https://api.github.com/users/${user}/events/public`, { headers, cache: "no-store" });
  const events = await eventsRes.json();
  const since = Date.now() - 24 * 60 * 60 * 1000;
  const commits24h = Array.isArray(events)
    ? events
        .filter((e: any) => e.type === "PushEvent" && new Date(e.created_at).getTime() >= since)
        .reduce((sum: number, e: any) => sum + (e.payload?.size || 0), 0)
    : 0;

  return NextResponse.json({ user, stars, commits24h });
}


