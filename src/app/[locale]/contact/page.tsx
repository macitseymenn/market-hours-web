import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
import { Link, getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { sharedAlternates } from "@/i18n/alternates";

// ISR: re-render daily. The page's own copy is static, but the shared chrome
// (header language switcher, footer) lists the locales that are currently live,
// so a scheduled locale reaching its date must be able to appear here without a
// deploy. See @/i18n/locales.
export const revalidate = 86400;

const COPY = {
  en: {
    metaTitle: "Contact Us",
    metaDescription:
      "Get in touch with the Forex Market Hours team, corrections, feedback and partnership enquiries. info@forexmarkethours.app.",
    ogDescription:
      "Get in touch with the Forex Market Hours team, corrections, feedback and partnership enquiries.",
    breadcrumb: "Contact",
    h1: "Contact Us",
    lead: (
      <>
        The fastest way to reach the {PRODUCT.name} team is by email at{" "}
        <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
      </>
    ),
    body: (
      <>
        <h2>Email us</h2>
        <p>
          Send us a message at{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          and we will get back to you as soon as we can.
        </p>

        <h2>What to contact us about</h2>
        <ul>
          <li>
            <strong>Corrections</strong>: spotted an inaccurate session time, a
            broken source link, or an outdated date in an article? Let us know and
            we will review it (see our{" "}
            <Link href="/editorial-policy">editorial policy</Link>).
          </li>
          <li>
            <strong>Feedback</strong>: feature requests, bug reports, or general
            thoughts on the web tool or the app.
          </li>
          <li>
            <strong>Partnerships</strong>: press, collaboration, or integration
            enquiries.
          </li>
        </ul>

        <h2>Published by</h2>
        <p>
          {PRODUCT.name} is published by {PUBLISHER.displayName} ({PUBLISHER.legalName}),
          the company behind both the free web tool at {SITE_URL} and the companion
          iOS and Android apps.
        </p>
      </>
    ),
  },
  es: {
    metaTitle: "Contacto",
    metaDescription:
      "Ponte en contacto con el equipo de Horario del Mercado Forex: correcciones, comentarios y propuestas de colaboración. info@forexmarkethours.app.",
    ogDescription:
      "Ponte en contacto con el equipo de Horario del Mercado Forex: correcciones, comentarios y propuestas de colaboración.",
    breadcrumb: "Contacto",
    h1: "Contacto",
    lead: (
      <>
        La forma más rápida de contactar con el equipo de {PRODUCT.name} es por
        correo electrónico en{" "}
        <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
      </>
    ),
    body: (
      <>
        <h2>Escríbenos</h2>
        <p>
          Envíanos un mensaje a{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          y te responderemos lo antes posible.
        </p>

        <h2>Sobre qué contactarnos</h2>
        <ul>
          <li>
            <strong>Correcciones</strong>: ¿has detectado un horario de sesión
            incorrecto, un enlace a una fuente roto o una fecha desactualizada en un
            artículo? Avísanos y lo revisaremos (consulta nuestra{" "}
            <Link href="/editorial-policy">política editorial</Link>).
          </li>
          <li>
            <strong>Comentarios</strong>: solicitudes de funciones, informes de
            errores o impresiones generales sobre la herramienta web o la app.
          </li>
          <li>
            <strong>Colaboraciones</strong>: prensa, colaboración o consultas de
            integración.
          </li>
        </ul>

        <h2>Publicado por</h2>
        <p>
          {PRODUCT.name} está publicado por {PUBLISHER.displayName} ({PUBLISHER.legalName}),
          la empresa que hay detrás tanto de la herramienta web gratuita en{" "}
          {SITE_URL} como de las apps para iOS y Android.
        </p>
      </>
    ),
  },
  fr: {
    metaTitle: "Nous contacter",
    metaDescription:
      "Contactez l’équipe Forex Market Hours : corrections, retours et demandes de partenariat. info@forexmarkethours.app.",
    ogDescription:
      "Contactez l’équipe Forex Market Hours : corrections, retours et demandes de partenariat.",
    breadcrumb: "Contact",
    h1: "Nous contacter",
    lead: (
      <>
        Le moyen le plus rapide de joindre l’équipe {PRODUCT.name} est l’e-mail, à
        l’adresse{" "}
        <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
      </>
    ),
    body: (
      <>
        <h2>Écrivez-nous</h2>
        <p>
          Envoyez-nous un message à{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          et nous vous répondrons dès que possible.
        </p>

        <h2>Pour quoi nous contacter</h2>
        <ul>
          <li>
            <strong>Corrections</strong> : vous avez repéré un horaire de séance
            inexact, un lien source cassé ou une date obsolète dans un article ?
            Signalez-le-nous et nous l’examinerons (voir notre{" "}
            <Link href="/editorial-policy">politique éditoriale</Link>).
          </li>
          <li>
            <strong>Retours</strong> : demandes de fonctionnalités, signalements de
            bugs ou impressions générales sur l’outil web ou l’application.
          </li>
          <li>
            <strong>Partenariats</strong> : presse, collaboration ou demandes
            d’intégration.
          </li>
        </ul>

        <h2>Publié par</h2>
        <p>
          {PRODUCT.name} est publié par {PUBLISHER.displayName} ({PUBLISHER.legalName}),
          la société à l’origine de l’outil web gratuit disponible sur {SITE_URL} et
          des applications iOS et Android qui l’accompagnent.
        </p>
      </>
    ),
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as Locale;
  const c = COPY[l];
  const href = "/contact";

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    // Canonical + hreflang over the locales that are live, from the registry.
    alternates: sharedAlternates(l, href),
    openGraph: {
      type: "website",
      title: c.metaTitle,
      description: c.ogDescription,
      url: `${SITE_URL}${getPathname({ locale: l, href })}`,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as Locale;
  const c = COPY[l];

  const tc = await getTranslations("common");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tc("home"), item: `${SITE_URL}/${l}` },
      {
        "@type": "ListItem",
        position: 2,
        name: c.breadcrumb,
        item: `${SITE_URL}${getPathname({ locale: l, href: "/contact" })}`,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-ivory sm:text-5xl">{c.h1}</h1>
        <p className="mt-4 text-lg text-fog">{c.lead}</p>
      </header>

      <div className="article-prose mt-8">{c.body}</div>
    </article>
  );
}
