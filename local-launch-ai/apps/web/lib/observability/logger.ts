export function logEvent(event: string, metadata: Record<string, unknown>) {
  console.info(
    JSON.stringify({
      level: "info",
      event,
      metadata,
      timestamp: new Date().toISOString(),
    }),
  );
}
