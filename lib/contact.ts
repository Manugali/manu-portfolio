export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

export type ContactFieldErrors = Partial<
  Record<keyof Pick<ContactPayload, "name" | "email" | "message">, string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(
  payload: ContactPayload,
): ContactFieldErrors | null {
  const errors: ContactFieldErrors = {};

  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length > 120) {
    errors.name = "Name must be 120 characters or fewer.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  } else if (email.length > 254) {
    errors.email = "Email must be 254 characters or fewer.";
  }

  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (message.length > 5000) {
    errors.message = "Message must be 5000 characters or fewer.";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

export async function parseContactRequest(
  req: Request,
): Promise<ContactPayload | null> {
  const contentType = req.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const body = (await req.json()) as Partial<ContactPayload>;
      return {
        name: String(body.name ?? ""),
        email: String(body.email ?? ""),
        message: String(body.message ?? ""),
        website: body.website ? String(body.website) : undefined,
      };
    } catch {
      return null;
    }
  }

  try {
    const data = await req.formData();
    return {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      website: data.get("website")
        ? String(data.get("website"))
        : undefined,
    };
  } catch {
    return null;
  }
}
