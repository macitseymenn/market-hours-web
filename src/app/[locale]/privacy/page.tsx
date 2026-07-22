import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const LAST_UPDATED = "2026-07-22";

const COPY = {
  en: {
    metaTitle: "Privacy Policy",
    metaDescription:
      "How Forex Market Hours handles data. The web tool runs in your browser; we collect no personal trading data.",
    breadcrumb: "Privacy Policy",
    h1: "Privacy Policy",
    lead: (
      <>
        Short version: {PRODUCT.name} runs in your browser, collects no personal
        data, and does not track you.
      </>
    ),
    lastUpdated: (date: string) => <>Last updated: {date}.</>,
    body: (
      <>
        <h2>The web tool runs in your browser</h2>
        <p>
          {PRODUCT.name} at {SITE_URL} is a client-side tool: the live session
          clock, timezone conversion and calculations all run on your own device.
          We do not operate any backend that logs which sessions you view, what
          timezone you use, or how you use the site.
        </p>

        <h2>We collect no personal data</h2>
        <p>
          We run no analytics, no advertising trackers, and set no tracking cookies
          on this site. We do not collect names, email addresses, IP addresses, or
          any other personal or trading data through the web tool, and we have
          nothing of yours to sell or share.
        </p>

        <h2>Local storage: theme and alarms only</h2>
        <p>
          The only data the site stores is kept in your own browser&apos;s{" "}
          <code>localStorage</code> and never sent to us:
        </p>
        <ul>
          <li>your light/dark theme preference; and</li>
          <li>
            any session alarms you choose to set, so they persist between visits.
          </li>
        </ul>
        <p>
          Clearing your browser&apos;s site data removes this information
          completely. It never leaves your device.
        </p>

        <h2>Notifications and audio</h2>
        <p>
          If you enable a session alarm, the site uses your browser&apos;s native
          Notifications permission and Web Audio API to alert you locally. These
          only activate if you explicitly opt in, and no alarm data is transmitted
          anywhere.
        </p>

        <h2>The mobile app</h2>
        <p>
          The {PRODUCT.name} iOS and Android app, per its App Store and Google Play
          listings, collects no data from its users.
        </p>

        <h2>Third-party links</h2>
        <p>
          This site links to the Apple App Store and Google Play to download the
          app, and to external sources we cite in our articles. Those third-party
          sites have their own privacy policies, which we encourage you to review;
          we are not responsible for their content or practices.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If this policy changes, we will update this page and the &quot;last
          updated&quot; date above.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.{" "}
          {PRODUCT.name} is published by {PUBLISHER.displayName}.
        </p>
      </>
    ),
  },
  es: {
    metaTitle: "Política de privacidad",
    metaDescription:
      "Cómo gestiona los datos Horario del Mercado Forex. La herramienta web funciona en tu navegador; no recopilamos datos personales de trading.",
    breadcrumb: "Política de privacidad",
    h1: "Política de privacidad",
    lead: (
      <>
        Versión breve: {PRODUCT.name} funciona en tu navegador, no recopila datos
        personales y no te rastrea.
      </>
    ),
    lastUpdated: (date: string) => <>Última actualización: {date}.</>,
    body: (
      <>
        <h2>La herramienta web funciona en tu navegador</h2>
        <p>
          {PRODUCT.name} en {SITE_URL} es una herramienta del lado del cliente: el
          reloj de sesiones en vivo, la conversión de zona horaria y los cálculos
          se ejecutan por completo en tu propio dispositivo. No operamos ningún
          servidor que registre qué sesiones consultas, qué zona horaria usas o
          cómo utilizas el sitio.
        </p>

        <h2>No recopilamos datos personales</h2>
        <p>
          No usamos analíticas, ni rastreadores publicitarios, ni instalamos
          cookies de seguimiento en este sitio. No recopilamos nombres, direcciones
          de correo electrónico, direcciones IP ni ningún otro dato personal o de
          trading a través de la herramienta web, y no tenemos nada tuyo que vender
          ni compartir.
        </p>

        <h2>Almacenamiento local: solo tema y alarmas</h2>
        <p>
          Los únicos datos que guarda el sitio se almacenan en el{" "}
          <code>localStorage</code> de tu propio navegador y nunca se nos envían:
        </p>
        <ul>
          <li>tu preferencia de tema claro/oscuro; y</li>
          <li>
            las alarmas de sesión que decidas configurar, para que se mantengan
            entre visitas.
          </li>
        </ul>
        <p>
          Borrar los datos del sitio en tu navegador elimina esta información por
          completo. Nunca sale de tu dispositivo.
        </p>

        <h2>Notificaciones y audio</h2>
        <p>
          Si activas una alarma de sesión, el sitio usa el permiso de
          Notificaciones nativo de tu navegador y la API Web Audio para avisarte de
          forma local. Solo se activan si das tu consentimiento expreso, y no se
          transmite ningún dato de alarma a ninguna parte.
        </p>

        <h2>La app para móvil</h2>
        <p>
          La app de {PRODUCT.name} para iOS y Android, según sus fichas en la App
          Store y en Google Play, no recopila ningún dato de sus usuarios.
        </p>

        <h2>Enlaces de terceros</h2>
        <p>
          Este sitio enlaza a la App Store de Apple y a Google Play para descargar
          la app, y a las fuentes externas que citamos en nuestros artículos. Esos
          sitios de terceros tienen sus propias políticas de privacidad, que te
          animamos a revisar; no somos responsables de su contenido ni de sus
          prácticas.
        </p>

        <h2>Cambios en esta política</h2>
        <p>
          Si esta política cambia, actualizaremos esta página y la fecha de «última
          actualización» de arriba.
        </p>

        <h2>Contacto</h2>
        <p>
          Las preguntas sobre esta política pueden enviarse a{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.{" "}
          {PRODUCT.name} está publicado por {PUBLISHER.displayName}.
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
  const href = "/privacy";

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: getPathname({ locale: l, href }),
      languages: {
        en: getPathname({ locale: "en", href }),
        es: getPathname({ locale: "es", href }),
        "x-default": getPathname({ locale: "en", href }),
      },
    },
    openGraph: {
      type: "website",
      title: c.metaTitle,
      description: c.metaDescription,
      url: `${SITE_URL}${getPathname({ locale: l, href })}`,
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as Locale;
  const c = COPY[l];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: l === "es" ? "Inicio" : "Home", item: `${SITE_URL}/${l}` },
      {
        "@type": "ListItem",
        position: 2,
        name: c.breadcrumb,
        item: `${SITE_URL}${getPathname({ locale: l, href: "/privacy" })}`,
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

      <div className="article-prose mt-8">
        <p>{c.lastUpdated(formatDate(LAST_UPDATED, l))}</p>
        {c.body}
      </div>
    </article>
  );
}
