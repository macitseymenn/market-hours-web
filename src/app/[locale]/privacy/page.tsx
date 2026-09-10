import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { sharedAlternates } from "@/i18n/alternates";
import { analyticsEnabled, hasCookieAnalytics } from "@/lib/analytics";

// ISR: re-render daily. The page's own copy is static, but the shared chrome
// (header language switcher, footer) lists the locales that are currently live,
// so a scheduled locale reaching its date must be able to appear here without a
// deploy. See @/i18n/locales.
export const revalidate = 86400;

const LAST_UPDATED = "2026-07-22";

// Honest, env-driven data-handling section. With no analytics configured the
// site is genuinely tracking-free; when analytics is enabled the wording below
// switches to describe exactly what runs and how consent works.
const DATA_SECTION: Record<Locale, ReactNode> = {
  en: analyticsEnabled ? (
    <>
      <h2>Analytics</h2>
      <p>
        We use privacy-respecting analytics to understand aggregate usage, which
        pages are popular and roughly where visitors come from, so we can improve
        the tool. We never run advertising trackers and never sell or share your
        data.
      </p>
      {hasCookieAnalytics ? (
        <p>
          The analytics we use may set cookies. They load{" "}
          <strong>only after you accept</strong> the consent banner; if you
          decline, no analytics cookies are set. Google Analytics, where used, is
          configured to anonymise IP addresses. You can change your choice any time
          by clearing this site&apos;s data in your browser.
        </p>
      ) : (
        <p>
          Our analytics is cookieless and does not use any persistent identifier or
          track you across sites, so no consent banner is required.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>We collect no personal data</h2>
      <p>
        We run no analytics, no advertising trackers, and set no tracking cookies
        on this site. We do not collect names, email addresses, IP addresses, or
        any other personal or trading data through the web tool, and we have
        nothing of yours to sell or share.
      </p>
    </>
  ),
  es: analyticsEnabled ? (
    <>
      <h2>Analítica</h2>
      <p>
        Usamos analítica respetuosa con la privacidad para entender el uso
        agregado, qué páginas son populares y, de forma aproximada, de dónde vienen
        los visitantes, y así mejorar la herramienta. Nunca usamos rastreadores
        publicitarios ni vendemos o compartimos tus datos.
      </p>
      {hasCookieAnalytics ? (
        <p>
          La analítica que usamos puede instalar cookies. Se cargan{" "}
          <strong>solo después de que aceptes</strong> el aviso de consentimiento;
          si lo rechazas, no se instala ninguna cookie de analítica. Google
          Analytics, cuando se usa, está configurado para anonimizar las direcciones
          IP. Puedes cambiar tu elección en cualquier momento borrando los datos de
          este sitio en tu navegador.
        </p>
      ) : (
        <p>
          Nuestra analítica no usa cookies ni ningún identificador persistente, ni
          te rastrea entre sitios, por lo que no se requiere aviso de
          consentimiento.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>No recopilamos datos personales</h2>
      <p>
        No usamos analíticas, ni rastreadores publicitarios, ni instalamos cookies
        de seguimiento en este sitio. No recopilamos nombres, direcciones de correo
        electrónico, direcciones IP ni ningún otro dato personal o de trading a
        través de la herramienta web, y no tenemos nada tuyo que vender ni
        compartir.
      </p>
    </>
  ),
  fr: analyticsEnabled ? (
    <>
      <h2>Analyse d’audience</h2>
      <p>
        Nous utilisons une analyse d’audience respectueuse de la vie privée pour
        comprendre l’usage agrégé, quelles pages sont populaires et, de façon
        approximative, d’où viennent les visiteurs, afin d’améliorer l’outil. Nous
        n’utilisons jamais de traqueurs publicitaires et ne vendons ni ne partageons
        jamais vos données.
      </p>
      {hasCookieAnalytics ? (
        <p>
          L’analyse d’audience que nous utilisons peut déposer des cookies. Ils ne
          se chargent <strong>qu’après votre acceptation</strong> de la bannière de
          consentement ; si vous refusez, aucun cookie d’analyse n’est déposé.
          Google Analytics, lorsqu’il est utilisé, est configuré pour anonymiser les
          adresses IP. Vous pouvez modifier votre choix à tout moment en effaçant
          les données de ce site dans votre navigateur.
        </p>
      ) : (
        <p>
          Notre analyse d’audience n’utilise ni cookie ni identifiant persistant et
          ne vous suit pas d’un site à l’autre : aucune bannière de consentement
          n’est donc nécessaire.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>Nous ne collectons aucune donnée personnelle</h2>
      <p>
        Nous n’utilisons aucune analyse d’audience, aucun traqueur publicitaire et
        ne déposons aucun cookie de suivi sur ce site. Nous ne collectons ni noms,
        ni adresses e-mail, ni adresses IP, ni aucune autre donnée personnelle ou de
        trading via l’outil web, et nous n’avons donc rien de vous à vendre ou à
        partager.
      </p>
    </>
  ),
};

const COPY = {
  en: {
    metaTitle: "Privacy Policy",
    metaDescription: analyticsEnabled
      ? "How Forex Market Hours handles data: the web tool runs in your browser, uses privacy-friendly analytics, shows no ads and never sells your data."
      : "How Forex Market Hours handles data. The web tool runs in your browser; we collect no personal trading data.",
    breadcrumb: "Privacy Policy",
    h1: "Privacy Policy",
    lead: analyticsEnabled ? (
      <>
        Short version: {PRODUCT.name} runs in your browser, uses privacy-friendly
        analytics, shows no ads, and never sells your data.
      </>
    ) : (
      <>
        Short version: {PRODUCT.name} runs in your browser, collects no personal
        data, and does not track you.
      </>
    ),
    lastUpdated: (date: string) => <>Last updated: {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>The web tool runs in your browser</h2>
        <p>
          {PRODUCT.name} at {SITE_URL} is a client-side tool: the live session
          clock, timezone conversion and calculations all run on your own device.
          We do not operate any backend that logs which sessions you view, what
          timezone you use, or how you use the site.
        </p>

        {dataSection}

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
    metaDescription: analyticsEnabled
      ? "Cómo gestiona los datos Horario del Mercado Forex: la herramienta funciona en tu navegador, usa analítica respetuosa con la privacidad, sin anuncios y sin vender tus datos."
      : "Cómo gestiona los datos Horario del Mercado Forex. La herramienta web funciona en tu navegador; no recopilamos datos personales de trading.",
    breadcrumb: "Política de privacidad",
    h1: "Política de privacidad",
    lead: analyticsEnabled ? (
      <>
        Versión breve: {PRODUCT.name} funciona en tu navegador, usa analítica
        respetuosa con la privacidad, no muestra anuncios y nunca vende tus datos.
      </>
    ) : (
      <>
        Versión breve: {PRODUCT.name} funciona en tu navegador, no recopila datos
        personales y no te rastrea.
      </>
    ),
    lastUpdated: (date: string) => <>Última actualización: {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>La herramienta web funciona en tu navegador</h2>
        <p>
          {PRODUCT.name} en {SITE_URL} es una herramienta del lado del cliente: el
          reloj de sesiones en vivo, la conversión de zona horaria y los cálculos
          se ejecutan por completo en tu propio dispositivo. No operamos ningún
          servidor que registre qué sesiones consultas, qué zona horaria usas o
          cómo utilizas el sitio.
        </p>

        {dataSection}

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
  fr: {
    metaTitle: "Politique de confidentialité",
    metaDescription: analyticsEnabled
      ? "Comment Forex Market Hours traite les données : l’outil web s’exécute dans votre navigateur, utilise une analyse respectueuse de la vie privée et ne vend jamais vos données."
      : "Comment Forex Market Hours traite les données. L’outil web s’exécute dans votre navigateur ; nous ne collectons aucune donnée personnelle de trading.",
    breadcrumb: "Politique de confidentialité",
    h1: "Politique de confidentialité",
    lead: analyticsEnabled ? (
      <>
        En bref : {PRODUCT.name} s’exécute dans votre navigateur, utilise une
        analyse d’audience respectueuse de la vie privée, n’affiche aucune publicité
        et ne vend jamais vos données.
      </>
    ) : (
      <>
        En bref : {PRODUCT.name} s’exécute dans votre navigateur, ne collecte aucune
        donnée personnelle et ne vous suit pas.
      </>
    ),
    lastUpdated: (date: string) => <>Dernière mise à jour : {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>L’outil web s’exécute dans votre navigateur</h2>
        <p>
          {PRODUCT.name}, sur {SITE_URL}, est un outil côté client : l’horloge de
          séance en direct, la conversion de fuseau horaire et les calculs
          s’exécutent tous sur votre propre appareil. Nous n’exploitons aucun serveur
          qui enregistrerait les séances que vous consultez, le fuseau horaire que
          vous utilisez ou la façon dont vous naviguez sur le site.
        </p>

        {dataSection}

        <h2>Stockage local : thème et alarmes uniquement</h2>
        <p>
          Les seules données stockées par le site restent dans le{" "}
          <code>localStorage</code> de votre propre navigateur et ne nous sont jamais
          transmises :
        </p>
        <ul>
          <li>votre préférence de thème clair ou sombre ; et</li>
          <li>
            les alarmes de séance que vous choisissez de régler, afin qu’elles
            persistent d’une visite à l’autre.
          </li>
        </ul>
        <p>
          Effacer les données de site de votre navigateur supprime complètement ces
          informations. Elles ne quittent jamais votre appareil.
        </p>

        <h2>Notifications et audio</h2>
        <p>
          Si vous activez une alarme de séance, le site utilise l’autorisation native
          de notifications de votre navigateur et l’API Web Audio pour vous alerter
          localement. Cela ne s’active que si vous y consentez explicitement, et
          aucune donnée d’alarme n’est transmise où que ce soit.
        </p>

        <h2>L’application mobile</h2>
        <p>
          L’application {PRODUCT.name} pour iOS et Android, conformément à ses fiches
          App Store et Google Play, ne collecte aucune donnée de ses utilisateurs.
        </p>

        <h2>Liens de tiers</h2>
        <p>
          Ce site renvoie vers l’App Store d’Apple et Google Play pour télécharger
          l’application, ainsi que vers les sources externes que nous citons dans nos
          articles. Ces sites tiers ont leurs propres politiques de confidentialité,
          que nous vous encourageons à consulter ; nous ne sommes pas responsables de
          leur contenu ni de leurs pratiques.
        </p>

        <h2>Modification de cette politique</h2>
        <p>
          Si cette politique change, nous mettrons à jour cette page ainsi que la
          date de « dernière mise à jour » ci-dessus.
        </p>

        <h2>Contact</h2>
        <p>
          Les questions relatives à cette politique peuvent être envoyées à{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.{" "}
          {PRODUCT.name} est publié par {PUBLISHER.displayName}.
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
    // Canonical + hreflang over the locales that are live, from the registry.
    alternates: sharedAlternates(l, href),
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
        {c.body(DATA_SECTION[l])}
      </div>
    </article>
  );
}
