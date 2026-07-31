import { NextResponse } from "next/server";

/**
 * Inquiry form endpoint — documented integration point.
 *
 * No email service is configured in this repository, so this route validates
 * the payload and returns 503 rather than pretending delivery succeeded. The
 * client surfaces that state honestly to the visitor.
 *
 * To go live, wire up a provider inside `deliver()` below, e.g. with Resend:
 *
 *   1. `npm i resend`
 *   2. Set RESEND_API_KEY and INQUIRY_TO_EMAIL in the deployment environment.
 *   3. const resend = new Resend(process.env.RESEND_API_KEY);
 *      await resend.emails.send({
 *        from: "inquiries@<verified-domain>",
 *        to: process.env.INQUIRY_TO_EMAIL!,
 *        replyTo: payload.email,
 *        subject: `Website inquiry — ${payload.nature}`,
 *        text: format(payload),
 *      });
 *
 * Any SMTP/API provider works the same way: implement deliver(), return true.
 */

interface InquiryPayload {
  name: string;
  email: string;
  phone?: string;
  method?: string;
  nature: string;
  message: string;
  consent: string;
}

function isValid(body: Partial<InquiryPayload>): body is InquiryPayload {
  return Boolean(
    body.name?.trim() &&
      body.email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) &&
      body.nature &&
      body.message &&
      body.message.trim().length >= 20 &&
      body.consent === "yes"
  );
}

async function deliver(payload: InquiryPayload): Promise<boolean> {
  // TODO: implement delivery (see doc comment above). Returning false keeps
  // the endpoint honest: the client tells the visitor nothing was sent.
  void payload;
  return false;
}

export async function POST(request: Request) {
  let body: Partial<InquiryPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json({ error: "Please complete the required fields." }, { status: 422 });
  }

  const delivered = await deliver(body);
  if (!delivered) {
    return NextResponse.json(
      { error: "Inquiry delivery is not configured for this deployment." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
