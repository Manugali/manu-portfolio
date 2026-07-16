"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-rose-500">Something failed</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">The generation workflow hit an issue.</h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">{error.message}</p>
      <button
        onClick={reset}
        className="mt-8 inline-flex items-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
      >
        Retry
      </button>
    </main>
  );
}
