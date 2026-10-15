"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CONTACT_EMAIL = "info@forexmarkethours.app";

/** Dropdown values. Must match the <select> in public/__forms.html. */
const TOPICS = [
  "advertising",
  "information",
  "request",
  "correction",
  "partnership",
  "other",
] as const;

type Status = "idle" | "sending" | "sent" | "error" | "unverified";

/** Cloudflare Turnstile. The site key is public; the secret lives in src/app/api/contact. */
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TOKEN_FIELD = "cf-turnstile-response";

type TurnstileApi = {
  render(el: HTMLElement, options: Record<string, unknown>): string;
  reset(id: string): void;
  remove(id: string): void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstileScript: Promise<void> | null = null;

/** Injects the Turnstile script once per page, on the first form mount. */
function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  turnstileScript ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = TURNSTILE_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      turnstileScript = null;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(s);
  });
  return turnstileScript;
}

const field =
  "mt-1.5 w-full rounded-lg border border-surface-2 bg-charcoal px-3 py-2 text-ivory outline-none focus-visible:border-emerald";
const label = "block text-sm text-fog";

/** Red asterisk on required labels. Decorative: the inputs carry `required`. */
function Req() {
  return (
    <span aria-hidden="true" className="ml-0.5 text-red-400">
      *
    </span>
  );
}

/**
 * Contact form, delivered by Netlify Forms. The form posts to /api/contact,
 * which checks the Turnstile token and then forwards the fields to Netlify.
 * Submissions show up in the Netlify dashboard and are emailed to info@
 * through the site's form notification settings.
 */
export function ContactForm() {
  const t = useTranslations("contactForm");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const widgetEl = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const sent = status === "sent";

  useEffect(() => {
    const el = widgetEl.current;
    if (sent || !el || !TURNSTILE_SITE_KEY) return;
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !window.turnstile) return;
        widgetId.current = window.turnstile.render(el, {
          sitekey: TURNSTILE_SITE_KEY,
          language: locale === "pt" ? "pt-br" : locale,
          theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
          // "flexible" needs 300px; very narrow phones get the compact box.
          size: el.offsetWidth < 300 ? "compact" : "flexible",
        });
      })
      // Blocked or offline: the server rejects the post and the error offers email.
      .catch(() => {});
    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [locale, sent]);

  /** Tokens are single use, so every failed attempt needs a fresh one. */
  function resetWidget() {
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Netlify uses a field named `subject` as the notification email's subject.
    data.set("subject", `Forex Market Hours contact: ${data.get("topic")} (${locale})`);
    // Turnstile writes its token into a hidden input inside the widget.
    if (TURNSTILE_SITE_KEY && !data.get(TOKEN_FIELD)) {
      setStatus("unverified");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(
          [...data.entries()].map(([k, v]) => [k, String(v)]),
        ).toString(),
      });
      if (res.status === 403) {
        resetWidget();
        setStatus("unverified");
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      resetWidget();
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="mt-10 rounded-2xl border border-emerald/40 bg-emerald/10 p-6 text-ivory"
      >
        {t("success")}
      </div>
    );
  }

  return (
    <section
      aria-labelledby="contact-form-title"
      className="mt-10 rounded-2xl border border-surface-2 bg-surface/50 p-5 sm:p-6"
    >
      <h2 id="contact-form-title" className="text-xl font-semibold text-ivory">
        {t("title")}
      </h2>
      <p className="mt-1 text-sm text-muted">
        <Req /> {t("requiredNote")}
      </p>

      <form name="contact" onSubmit={onSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="language" value={locale} />
        {/* Honeypot: hidden from people, filled in by bots, dropped by Netlify. */}
        <p className="hidden" aria-hidden="true">
          <label>
            Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <label className={label}>
          {t("name")}
          <Req />
          <input name="name" required maxLength={100} autoComplete="name" className={field} />
        </label>

        <label className={label}>
          {t("email")}
          <Req />
          <input
            type="email"
            name="email"
            required
            maxLength={200}
            autoComplete="email"
            className={field}
          />
        </label>

        <label className={`${label} sm:col-span-2`}>
          {t("topic")}
          <Req />
          <select name="topic" required defaultValue="" className={field}>
            <option value="" disabled>
              {t("topicPlaceholder")}
            </option>
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {t(`topics.${topic}`)}
              </option>
            ))}
          </select>
        </label>

        <label className={`${label} sm:col-span-2`}>
          {t("message")}
          <Req />
          <textarea name="message" required rows={6} maxLength={5000} className={field} />
        </label>

        {TURNSTILE_SITE_KEY && <div ref={widgetEl} className="min-h-[65px] sm:col-span-2" />}

        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-lg bg-emerald px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-emerald-600 disabled:opacity-60"
          >
            {status === "sending" ? t("sending") : t("submit")}
          </button>
          <p className="text-sm text-muted">
            {t.rich("privacyNote", {
              link: (chunks) => (
                <Link href="/privacy" className="underline hover:text-emerald">
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>

        {status === "unverified" && (
          <p role="alert" className="text-sm text-red-400 sm:col-span-2">
            {t("verify")}
          </p>
        )}

        {status === "error" && (
          <p role="alert" className="text-sm text-red-400 sm:col-span-2">
            {t.rich("error", {
              email: CONTACT_EMAIL,
              mail: (chunks) => (
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                  {chunks}
                </a>
              ),
            })}
          </p>
        )}
      </form>
    </section>
  );
}
