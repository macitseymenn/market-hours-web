// POST /api/contact, the contact form's endpoint (src/components/ContactForm.tsx).
// Checks the Cloudflare Turnstile token with the secret key, then hands the
// fields to Netlify Forms, which stores them and emails info@. The Turnstile
// field itself is dropped so it never shows up in the submission.

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TOKEN_FIELD = "cf-turnstile-response";

/** Fields Netlify Forms knows about. Keep in sync with public/__forms.html. */
const FORWARDED = ["form-name", "bot-field", "subject", "language", "name", "email", "topic", "message"];
const REQUIRED = ["name", "email", "topic", "message"];

function fail(status: number, error: string) {
  return Response.json({ ok: false, error }, { status });
}

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY!, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch(SITEVERIFY_URL, { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.error("[contact] TURNSTILE_SECRET_KEY is not set for Functions");
    return fail(500, "not-configured");
  }

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return fail(400, "bad-request");
  }

  const token = String(data.get(TOKEN_FIELD) ?? "");
  if (!token) return fail(400, "verification");
  if (REQUIRED.some((k) => !String(data.get(k) ?? "").trim())) return fail(400, "missing-fields");

  // Netlify sets the visitor IP header; x-forwarded-for is the generic fallback.
  const ip =
    request.headers.get("x-nf-client-connection-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    null;
  if (!(await verifyTurnstile(token, ip))) {
    console.error("[contact] Turnstile rejected the token (check the secret key and the widget's hostnames)");
    return fail(403, "verification");
  }

  const fields = new URLSearchParams();
  for (const k of FORWARDED) fields.set(k, String(data.get(k) ?? ""));
  fields.set("form-name", "contact");

  // Post to the site's own netlify.app address, never the public domain: that
  // one sits behind Cloudflare, whose bot protection blocks server-to-server
  // posts. Netlify only exposes URL/SITE_NAME/SITE_ID to functions at runtime,
  // so DEPLOY_URL is baked in at build time (next.config.ts `env`).
  const base =
    process.env.NETLIFY_DEPLOY_URL ||
    (process.env.SITE_NAME ? `https://${process.env.SITE_NAME}.netlify.app` : "") ||
    new URL(request.url).origin;
  try {
    const res = await fetch(`${base}/__forms.html`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: fields.toString(),
    });
    if (!res.ok) {
      // Shows up in Netlify -> Logs -> Functions.
      console.error(`[contact] Netlify Forms rejected the post: ${res.status} from ${res.url}`);
      return fail(502, "delivery");
    }
  } catch (err) {
    console.error(`[contact] Netlify Forms post to ${base} failed:`, err);
    return fail(502, "delivery");
  }

  return Response.json({ ok: true });
}
