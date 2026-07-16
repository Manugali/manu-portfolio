import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-violet-500">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">This draft page is missing.</h1>
      <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">
        The route may not be generated yet, or the project draft was removed before publishing.
      </p>
      <Link
        href="/dashboard"
        className="mt-8 inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
      >
        Return to dashboard
      </Link>
    </main>
  );
}
