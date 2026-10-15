"use client";

import { useState, type FormEvent } from "react";
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

type Status = "idle" | "sending" | "sent" | "error";

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
 * Contact form, delivered by Netlify Forms. Submissions show up in the Netlify
 * dashboard and are emailed to info@ through the site's form notification
 * settings. No API key or server code is involved.
 */
export function ContactForm() {
  const t = useTranslations("contactForm");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Netlify uses a field named `subject` as the notification email's subject.
    data.set("subject", `Forex Market Hours contact: ${data.get("topic")} (${locale})`);

    setStatus("sending");
    try {
      // Posted to the static file that declares the form, see public/__forms.html.
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(
          [...data.entries()].map(([k, v]) => [k, String(v)]),
        ).toString(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
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
