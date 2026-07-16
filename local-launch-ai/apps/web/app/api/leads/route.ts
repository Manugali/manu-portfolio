import { NextResponse } from "next/server";
import { queueLeadNotification } from "@/lib/integrations/resend";
import { logEvent } from "@/lib/observability/logger";

export async function POST(request: Request) {
  const payload = (await request.json()) as { projectName?: string; senderEmail?: string };
  const notification = await queueLeadNotification({
    projectName: payload.projectName ?? "Unknown project",
    senderEmail: payload.senderEmail ?? "unknown@example.com",
  });

  logEvent("lead.submitted", {
    projectName: payload.projectName,
    senderEmail: payload.senderEmail,
    queued: notification.queued,
  });

  return NextResponse.json({
    ok: true,
    notification,
  });
}
