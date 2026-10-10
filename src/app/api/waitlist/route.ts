import { isIP } from "node:net";
import {
  WAITLIST_PRODUCTS,
  COMPANY_SIZES,
  NOTE_MAX_CHARS,
  type WaitlistProduct,
} from "@/components/waitlist/options";

/**
 * Waitlist sign-up. Validates the form, then creates (or updates) the subscriber in
 * MailerLite and adds them to one group per selected product. Confirmation emails
 * (double opt-in) and unsubscribe links are handled by MailerLite.
 *
 * Env: MAILERLITE_API_KEY, MAILERLITE_GROUP_RFP_OS, MAILERLITE_GROUP_PROVESTACK,
 * MAILERLITE_GROUP_INBOXGRAPH.
 */

const MAILERLITE_URL = "https://connect.mailerlite.com/api/subscribers";

const GROUP_ENV: Record<WaitlistProduct, string> = {
  "rfp-os": "MAILERLITE_GROUP_RFP_OS",
  provestack: "MAILERLITE_GROUP_PROVESTACK",
  inboxgraph: "MAILERLITE_GROUP_INBOXGRAPH",
};

/* ── Per-IP rate limit ──────────────────────────────────────────────────────
 * In memory, so it is per server instance. Enough to stop a form being hammered;
 * MailerLite's own limits sit behind it. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwarded ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-nf-client-connection-ip") ||
    "unknown"
  );
}

/* ── Validation ─────────────────────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function bad(message: string, status = 400) {
  return Response.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad("Invalid request.");
  }

  // Honeypot: real people never see or fill this field. Pretend it worked.
  if (str(body.website, 200)) return Response.json({ ok: true });

  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return bad("Too many attempts. Please wait a few minutes and try again.", 429);
  }

  const fullName = str(body.name, 120);
  const email = str(body.email, 254).toLowerCase();
  const company = str(body.company, 120);
  const role = str(body.role, 120);
  const companySize = str(body.companySize, 40);
  const note = str(body.note, NOTE_MAX_CHARS);
  const products = (Array.isArray(body.products) ? body.products : []).filter(
    (p): p is WaitlistProduct => WAITLIST_PRODUCTS.some((w) => w.id === p),
  );

  if (!fullName) return bad("Please enter your full name.");
  if (!EMAIL_RE.test(email)) return bad("Please enter a valid email address.");
  if (products.length === 0) return bad("Please choose at least one product.");
  if (companySize && !COMPANY_SIZES.includes(companySize)) return bad("Please choose a company size.");
  if (body.consent !== true) return bad("Please agree to receive emails about the products you selected.");

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.error("[waitlist] MAILERLITE_API_KEY is not set");
    return bad("The waitlist isn't available right now. Please email hello@sysogen.com.", 503);
  }

  const [firstName, ...rest] = fullName.split(/\s+/);
  const groups = products
    .map((p) => process.env[GROUP_ENV[p]])
    .filter((id): id is string => Boolean(id));
  const productLabels = WAITLIST_PRODUCTS.filter((w) => products.includes(w.id)).map((w) => w.label);

  const payload: Record<string, unknown> = {
    email,
    fields: {
      name: firstName,
      last_name: rest.join(" "),
      company,
      role,
      company_size: companySize,
      waitlist_products: productLabels.join(", "),
      waitlist_note: note,
      waitlist_consent_at: new Date().toISOString(),
    },
    groups,
  };
  if (isIP(ip)) payload.ip_address = ip;

  try {
    const res = await fetch(MAILERLITE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

    // 201 = new subscriber, 200 = already on the list (updated). Same answer for both.
    if (res.ok) return Response.json({ ok: true });

    const detail = await res.text().catch(() => "");
    console.error(`[waitlist] MailerLite ${res.status}: ${detail.slice(0, 500)}`);
    if (res.status === 422 && detail.includes('"email"')) {
      return bad("Please enter a valid email address.");
    }
    return bad("Something went wrong. Please try again, or email hello@sysogen.com.", 502);
  } catch (err) {
    console.error("[waitlist] MailerLite request failed", err);
    return bad("Something went wrong. Please try again, or email hello@sysogen.com.", 502);
  }
}
