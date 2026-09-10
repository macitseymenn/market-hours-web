import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PUBLISHER, SITE_URL } from "@/lib/site";
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

const LAST_UPDATED = "2026-08-03";

/** Full store name, plus the short name used throughout the prose. */
const LOTWISE = {
  name: "FX Lot Size Calculator:Lotwise",
  shortName: "Lotwise",
} as const;

// Honest, env-driven data-handling section for THIS web page (the app itself
// collects nothing either way). With no analytics configured the site is
// genuinely tracking-free; when analytics is enabled the wording below switches
// to describe exactly what runs and how consent works.
const DATA_SECTION: Record<Locale, ReactNode> = {
  en: analyticsEnabled ? (
    <>
      <h2>Analytics on this website</h2>
      <p>
        This policy page is hosted on our website, which uses privacy-respecting
        analytics to understand aggregate usage, which pages are popular and
        roughly where visitors come from. The {LOTWISE.shortName} app itself
        contains no analytics SDK. We never run advertising trackers and never
        sell or share your data.
      </p>
      {hasCookieAnalytics ? (
        <p>
          The analytics we use on the website may set cookies. They load{" "}
          <strong>only after you accept</strong> the consent banner; if you
          decline, no analytics cookies are set. Google Analytics, where used, is
          configured to anonymise IP addresses. You can change your choice any time
          by clearing this site&apos;s data in your browser.
        </p>
      ) : (
        <p>
          Our website analytics is cookieless and does not use any persistent
          identifier or track you across sites, so no consent banner is required.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>We collect no personal data</h2>
      <p>
        {LOTWISE.shortName} runs no analytics, no advertising trackers, and no
        third-party SDKs. We do not collect names, email addresses, IP addresses,
        device identifiers, or any account, broker or trading data. There is no
        sign-up and no user account, so we have nothing of yours to sell or share.
      </p>
    </>
  ),
  es: analyticsEnabled ? (
    <>
      <h2>Analítica en este sitio web</h2>
      <p>
        Esta página de política está alojada en nuestro sitio web, que usa
        analítica respetuosa con la privacidad para entender el uso agregado, qué
        páginas son populares y, de forma aproximada, de dónde vienen los
        visitantes. La app {LOTWISE.shortName} no incluye ningún SDK de analítica.
        Nunca usamos rastreadores publicitarios ni vendemos o compartimos tus
        datos.
      </p>
      {hasCookieAnalytics ? (
        <p>
          La analítica que usamos en el sitio web puede instalar cookies. Se
          cargan <strong>solo después de que aceptes</strong> el aviso de
          consentimiento; si lo rechazas, no se instala ninguna cookie de
          analítica. Google Analytics, cuando se usa, está configurado para
          anonimizar las direcciones IP. Puedes cambiar tu elección en cualquier
          momento borrando los datos de este sitio en tu navegador.
        </p>
      ) : (
        <p>
          La analítica de nuestro sitio web no usa cookies ni ningún
          identificador persistente, ni te rastrea entre sitios, por lo que no se
          requiere aviso de consentimiento.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>No recopilamos datos personales</h2>
      <p>
        {LOTWISE.shortName} no usa analíticas, ni rastreadores publicitarios, ni
        SDK de terceros. No recopilamos nombres, direcciones de correo
        electrónico, direcciones IP, identificadores de dispositivo ni ningún dato
        de cuenta, bróker o trading. No hay registro ni cuenta de usuario, así que
        no tenemos nada tuyo que vender ni compartir.
      </p>
    </>
  ),
  fr: analyticsEnabled ? (
    <>
      <h2>Analyse d’audience sur ce site web</h2>
      <p>
        Cette page de politique est hébergée sur notre site web, qui utilise une
        analyse d’audience respectueuse de la vie privée pour comprendre l’usage
        agrégé, quelles pages sont populaires et, de façon approximative, d’où
        viennent les visiteurs. L’application {LOTWISE.shortName} elle-même ne
        contient aucun SDK d’analyse. Nous n’utilisons jamais de traqueurs
        publicitaires et ne vendons ni ne partageons jamais vos données.
      </p>
      {hasCookieAnalytics ? (
        <p>
          L’analyse d’audience que nous utilisons sur le site web peut déposer des
          cookies. Ils ne se chargent{" "}
          <strong>qu’après votre acceptation</strong> de la bannière de
          consentement ; si vous refusez, aucun cookie d’analyse n’est déposé.
          Google Analytics, lorsqu’il est utilisé, est configuré pour anonymiser les
          adresses IP. Vous pouvez modifier votre choix à tout moment en effaçant les
          données de ce site dans votre navigateur.
        </p>
      ) : (
        <p>
          L’analyse d’audience de notre site web n’utilise ni cookie ni identifiant
          persistant et ne vous suit pas d’un site à l’autre : aucune bannière de
          consentement n’est donc nécessaire.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>Nous ne collectons aucune donnée personnelle</h2>
      <p>
        {LOTWISE.shortName} n’utilise aucune analyse d’audience, aucun traqueur
        publicitaire et aucun SDK tiers. Nous ne collectons ni noms, ni adresses
        e-mail, ni adresses IP, ni identifiants d’appareil, ni aucune donnée de
        compte, de courtier ou de trading. Il n’y a ni inscription ni compte
        utilisateur : nous n’avons donc rien de vous à vendre ou à partager.
      </p>
    </>
  ),
};

const COPY = {
  en: {
    metaTitle: `${LOTWISE.name} — Privacy Policy`,
    metaDescription: analyticsEnabled
      ? `How ${LOTWISE.name} handles data: every calculation runs on your device, the app uses no analytics SDK, shows no ads and never sells your data.`
      : `How ${LOTWISE.name} handles data. Every calculation runs on your device; we collect no personal or trading data.`,
    breadcrumb: "Lotwise Privacy Policy",
    h1: "Privacy Policy",
    lead: analyticsEnabled ? (
      <>
        Short version: {LOTWISE.name} runs entirely on your device, shows no ads,
        and never sells your data.
      </>
    ) : (
      <>
        Short version: {LOTWISE.name} runs entirely on your device, collects no
        personal data, and does not track you.
      </>
    ),
    lastUpdated: (date: string) => <>Last updated: {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>The app runs on your device</h2>
        <p>
          {LOTWISE.name} is an offline-first calculator: position size, lot size,
          pip value, risk and margin are all computed locally on your own phone or
          tablet. We do not operate any backend that receives your account
          balance, risk percentage, stop loss, currency pair or any other input
          you type into the app.
        </p>

        {dataSection}

        <h2>Data stored on your device only</h2>
        <p>
          The only data {LOTWISE.shortName} stores is kept in the app&apos;s own
          storage on your device and is never sent to us:
        </p>
        <ul>
          <li>your account currency, balance and default risk settings;</li>
          <li>your preferred instruments, units and appearance settings; and</li>
          <li>
            any saved calculations or history you choose to keep, so they persist
            between sessions.
          </li>
        </ul>
        <p>
          Deleting the app removes this information completely. It never leaves
          your device.
        </p>

        <h2>Notifications and permissions</h2>
        <p>
          {LOTWISE.shortName} asks for no location, contacts, photos, microphone
          or camera access. If a future version offers optional notifications,
          they use your device&apos;s native permission, only activate if you
          explicitly opt in, and are generated locally, no notification data is
          transmitted anywhere.
        </p>

        <h2>Purchases</h2>
        <p>
          If the app offers a paid version or in-app purchase, the transaction is
          handled entirely by Apple or Google. We never see or store your payment
          details; we only receive the anonymous receipt status the platform
          provides so the app can unlock what you bought.
        </p>

        <h2>Children</h2>
        <p>
          {LOTWISE.shortName} is a general-audience utility, not directed at
          children, and because it collects no data it knowingly collects nothing
          from anyone under 13.
        </p>

        <h2>Third-party links</h2>
        <p>
          This site links to the Apple App Store and Google Play to download the
          app, and to external sources we cite. Those third-party sites have their
          own privacy policies, which we encourage you to review; we are not
          responsible for their content or practices.
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
          {LOTWISE.name} is published by {PUBLISHER.displayName}.
        </p>
      </>
    ),
  },
  es: {
    metaTitle: `${LOTWISE.name} — Política de privacidad`,
    metaDescription: analyticsEnabled
      ? `Cómo gestiona los datos ${LOTWISE.name}: todos los cálculos se hacen en tu dispositivo, la app no usa SDK de analítica, sin anuncios y sin vender tus datos.`
      : `Cómo gestiona los datos ${LOTWISE.name}. Todos los cálculos se hacen en tu dispositivo; no recopilamos datos personales ni de trading.`,
    breadcrumb: "Política de privacidad de Lotwise",
    h1: "Política de privacidad",
    lead: analyticsEnabled ? (
      <>
        Versión breve: {LOTWISE.name} funciona por completo en tu dispositivo, no
        muestra anuncios y nunca vende tus datos.
      </>
    ) : (
      <>
        Versión breve: {LOTWISE.name} funciona por completo en tu dispositivo, no
        recopila datos personales y no te rastrea.
      </>
    ),
    lastUpdated: (date: string) => <>Última actualización: {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>La app funciona en tu dispositivo</h2>
        <p>
          {LOTWISE.name} es una calculadora que funciona sin conexión: el tamaño
          de posición, el tamaño del lote, el valor del pip, el riesgo y el margen
          se calculan localmente en tu propio teléfono o tablet. No operamos
          ningún servidor que reciba el saldo de tu cuenta, tu porcentaje de
          riesgo, tu stop loss, el par de divisas ni ningún otro dato que escribas
          en la app.
        </p>

        {dataSection}

        <h2>Datos guardados solo en tu dispositivo</h2>
        <p>
          Los únicos datos que guarda {LOTWISE.shortName} se almacenan en el
          propio almacenamiento de la app en tu dispositivo y nunca se nos envían:
        </p>
        <ul>
          <li>
            la divisa de tu cuenta, el saldo y tus ajustes de riesgo por defecto;
          </li>
          <li>
            tus instrumentos preferidos, las unidades y los ajustes de apariencia;
            y
          </li>
          <li>
            los cálculos o el historial que decidas guardar, para que se mantengan
            entre sesiones.
          </li>
        </ul>
        <p>
          Desinstalar la app elimina esta información por completo. Nunca sale de
          tu dispositivo.
        </p>

        <h2>Notificaciones y permisos</h2>
        <p>
          {LOTWISE.shortName} no solicita acceso a tu ubicación, contactos, fotos,
          micrófono ni cámara. Si una versión futura ofrece notificaciones
          opcionales, usarán el permiso nativo de tu dispositivo, solo se activarán
          si das tu consentimiento expreso y se generan de forma local: no se
          transmite ningún dato de notificación a ninguna parte.
        </p>

        <h2>Compras</h2>
        <p>
          Si la app ofrece una versión de pago o compras dentro de la aplicación,
          la transacción la gestionan íntegramente Apple o Google. Nunca vemos ni
          almacenamos tus datos de pago; solo recibimos el estado anónimo del
          recibo que proporciona la plataforma para que la app desbloquee lo que
          has comprado.
        </p>

        <h2>Menores</h2>
        <p>
          {LOTWISE.shortName} es una utilidad para público general, no está
          dirigida a menores y, al no recopilar datos, no recopila conscientemente
          nada de personas menores de 13 años.
        </p>

        <h2>Enlaces de terceros</h2>
        <p>
          Este sitio enlaza a la App Store de Apple y a Google Play para descargar
          la app, y a las fuentes externas que citamos. Esos sitios de terceros
          tienen sus propias políticas de privacidad, que te animamos a revisar; no
          somos responsables de su contenido ni de sus prácticas.
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
          {LOTWISE.name} está publicado por {PUBLISHER.displayName}.
        </p>
      </>
    ),
  },
  fr: {
    metaTitle: `${LOTWISE.name} : politique de confidentialité`,
    metaDescription: analyticsEnabled
      ? `Comment ${LOTWISE.name} traite les données : chaque calcul s’exécute sur votre appareil, l’application n’utilise aucun SDK d’analyse, n’affiche aucune publicité et ne vend jamais vos données.`
      : `Comment ${LOTWISE.name} traite les données. Chaque calcul s’exécute sur votre appareil ; nous ne collectons aucune donnée personnelle ni de trading.`,
    breadcrumb: "Politique de confidentialité de Lotwise",
    h1: "Politique de confidentialité",
    lead: analyticsEnabled ? (
      <>
        En bref : {LOTWISE.name} fonctionne entièrement sur votre appareil,
        n’affiche aucune publicité et ne vend jamais vos données.
      </>
    ) : (
      <>
        En bref : {LOTWISE.name} fonctionne entièrement sur votre appareil, ne
        collecte aucune donnée personnelle et ne vous suit pas.
      </>
    ),
    lastUpdated: (date: string) => <>Dernière mise à jour : {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>L’application fonctionne sur votre appareil</h2>
        <p>
          {LOTWISE.name} est une calculatrice qui fonctionne hors ligne : la taille
          de position, la taille de lot, la valeur du pip, le risque et la marge sont
          tous calculés localement sur votre propre téléphone ou tablette. Nous
          n’exploitons aucun serveur qui recevrait le solde de votre compte, votre
          pourcentage de risque, votre stop loss, votre paire de devises ou toute
          autre donnée que vous saisissez dans l’application.
        </p>

        {dataSection}

        <h2>Données conservées uniquement sur votre appareil</h2>
        <p>
          Les seules données que {LOTWISE.shortName} conserve sont stockées dans
          l’espace de stockage propre à l’application sur votre appareil et ne nous
          sont jamais envoyées :
        </p>
        <ul>
          <li>la devise de votre compte, votre solde et vos réglages de risque par défaut ;</li>
          <li>vos instruments préférés, vos unités et vos réglages d’apparence ; et</li>
          <li>
            les calculs ou l’historique que vous choisissez de conserver, afin qu’ils
            persistent d’une session à l’autre.
          </li>
        </ul>
        <p>
          Désinstaller l’application supprime complètement ces informations. Elles ne
          quittent jamais votre appareil.
        </p>

        <h2>Notifications et autorisations</h2>
        <p>
          {LOTWISE.shortName} ne demande aucun accès à votre localisation, à vos
          contacts, à vos photos, à votre microphone ni à votre caméra. Si une
          future version propose des notifications facultatives, elles utiliseront
          l’autorisation native de votre appareil, ne s’activeront que si vous y
          consentez explicitement et seront générées localement : aucune donnée de
          notification n’est transmise où que ce soit.
        </p>

        <h2>Achats</h2>
        <p>
          Si l’application propose une version payante ou des achats intégrés, la
          transaction est entièrement gérée par Apple ou Google. Nous ne voyons ni ne
          stockons jamais vos informations de paiement ; nous recevons uniquement
          l’état anonyme du reçu fourni par la plateforme afin que l’application
          débloque ce que vous avez acheté.
        </p>

        <h2>Mineurs</h2>
        <p>
          {LOTWISE.shortName} est un utilitaire tout public, non destiné aux enfants,
          et comme il ne collecte aucune donnée, il ne collecte sciemment rien auprès
          de personnes de moins de 13 ans.
        </p>

        <h2>Liens de tiers</h2>
        <p>
          Ce site renvoie vers l’App Store d’Apple et Google Play pour télécharger
          l’application, ainsi que vers les sources externes que nous citons. Ces
          sites tiers ont leurs propres politiques de confidentialité, que nous vous
          encourageons à consulter ; nous ne sommes pas responsables de leur contenu
          ni de leurs pratiques.
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
          {LOTWISE.name} est publié par {PUBLISHER.displayName}.
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
  const href = "/lotwise-privacy";

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

export default async function LotwisePrivacyPage({
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
        item: `${SITE_URL}${getPathname({ locale: l, href: "/lotwise-privacy" })}`,
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
        <p className="mt-2 text-sm font-medium uppercase tracking-wide text-emerald">
          {LOTWISE.name}
        </p>
        <p className="mt-4 text-lg text-fog">{c.lead}</p>
      </header>

      <div className="article-prose mt-8">
        <p>{c.lastUpdated(formatDate(LAST_UPDATED, l))}</p>
        {c.body(DATA_SECTION[l])}
      </div>
    </article>
  );
}
