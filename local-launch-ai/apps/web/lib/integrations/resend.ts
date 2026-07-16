import { Resend } from "resend";
import { env } from "@/lib/env";

export function getResendClient(): Resend | null {
  if (!env.RESEND_API_KEY) {
    return null;
  }

  return new Resend(env.RESEND_API_KEY);
}

export async function queueLeadNotification(input: { projectName: string; senderEmail: string }) {
  const resend = getResendClient();

  if (!resend) {
    return { queued: false, reason: "RESEND_API_KEY is not configured" };
  }

  return {
    queued: true,
    preview: `Lead notification queued for ${input.projectName} from ${input.senderEmail}`,
  };
}
