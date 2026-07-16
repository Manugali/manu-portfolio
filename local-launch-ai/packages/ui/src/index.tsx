import type { HTMLAttributes, PropsWithChildren } from "react";
import { clsx } from "clsx";

export function Button({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-full bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:translate-y-[-1px]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-white/10 bg-white/70 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur dark:bg-slate-950/50",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-[color:var(--brand-primary)]/20 bg-[color:var(--brand-primary)]/10 px-3 py-1 text-xs font-medium text-[color:var(--brand-primary)]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
