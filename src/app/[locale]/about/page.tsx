import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { APP, PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
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
    metaTitle: `About ${PRODUCT.name}`,
    metaDescription:
      "Who builds Forex Market Hours, why we made a free live session clock, and how we keep session times accurate. By Hunters Group Software.",
    ogDescription:
      "Who builds Forex Market Hours, why we made a free live session clock, and how we keep session times accurate.",
    breadcrumb: "About",
    h1: `About ${PRODUCT.name}`,
    lead: (
      <>
        {PRODUCT.name} is a free, live forex session clock built by{" "}
        {PUBLISHER.displayName}, a software company that makes small, focused
        tools instead of broad financial products.
      </>
    ),
    body: (
      <>
        <h2>Who we are</h2>
        <p>
          {PUBLISHER.displayName} ({PUBLISHER.legalName}) is a software company.
          We build and maintain {PRODUCT.name}, the web tool at {SITE_URL} and
          its companion iOS and Android apps, as a single, focused product: a
          market-hours utility for people who trade or follow the
          foreign-exchange market. We are not a bank, a brokerage, or an
          investment firm.
        </p>

        <h2>Why we built this</h2>
        <p>
          Forex trading runs 24 hours a day across five days a week, split across
          regional sessions in Sydney, Tokyo, Frankfurt, London and New York.
          Working out which of those sessions is open right now, in your own
          timezone, usually meant converting GMT by hand and re-checking it
          whenever a country&rsquo;s clocks changed for daylight saving. We built{" "}
          {PRODUCT.name} so that conversion happens automatically, all the time,
          for free.
        </p>
        <p>
          That problem is one we ran into first-hand: as a small software team
          that follows the markets ourselves, we were tired of doing GMT maths in
          our heads and second-guessing whether London had already moved to
          summer time. The tool started as the utility we wanted for our own use,
          and we still use it every trading day, which is the fastest way we
          notice when anything looks wrong.
        </p>

        <h2>What Forex Market Hours is, and isn&apos;t</h2>
        <p>
          {PRODUCT.name} is a market-hours utility. It shows when the major forex
          sessions open, close and overlap, converted to your local timezone. It
          is <strong>not</strong> a broker, a financial adviser, or a signals
          service, and it does not offer trading, deposit or withdrawal services.
          Nothing on this site is personalised financial advice, see our{" "}
          <Link href="/disclaimer">risk and trading disclaimer</Link> for the full
          detail.
        </p>

        <h2>How we keep it accurate</h2>
        <p>
          Every session time is computed from each financial centre&apos;s own
          timezone rules rather than a fixed table, so daylight-saving shifts are
          applied automatically. We explain exactly how that works, and the
          sources we rely on, on our{" "}
          <Link href="/methodology">methodology page</Link>. How we research,
          review and correct our written content is set out in our{" "}
          <Link href="/editorial-policy">editorial policy</Link>.
        </p>

        <h2>The free web tool and app</h2>
        <p>
          The web tool at {SITE_URL} runs entirely in your browser, with no
          sign-up and no ads. It is paired with a free iOS and Android app that
          adds Home Screen widgets, an economic calendar and session alerts, for
          people who want the same live clock without a browser tab open.
        </p>

        <h2>Get in touch</h2>
        <p>
          Questions, corrections or partnership enquiries are welcome at{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>
          , or see our <Link href="/contact">contact page</Link>.
        </p>
      </>
    ),
  },
  es: {
    metaTitle: `Acerca de ${PRODUCT.name}`,
    metaDescription:
      "Quién crea Horario del Mercado Forex, por qué desarrollamos un reloj de sesiones gratuito y en vivo, y cómo mantenemos la precisión de los horarios. Por Hunters Group Software.",
    ogDescription:
      "Quién crea Horario del Mercado Forex, por qué desarrollamos un reloj de sesiones gratuito y en vivo, y cómo mantenemos la precisión de los horarios.",
    breadcrumb: "Acerca de",
    h1: `Acerca de ${PRODUCT.name}`,
    lead: (
      <>
        {PRODUCT.name} es un reloj de sesiones forex gratuito y en vivo, creado
        por {PUBLISHER.displayName}, una empresa de software que desarrolla
        herramientas pequeñas y específicas en lugar de amplios productos
        financieros.
      </>
    ),
    body: (
      <>
        <h2>Quiénes somos</h2>
        <p>
          {PUBLISHER.displayName} ({PUBLISHER.legalName}) es una empresa de
          software. Creamos y mantenemos {PRODUCT.name}, la herramienta web en{" "}
          {SITE_URL} y sus apps para iOS y Android, como un único producto
          específico: una utilidad de horarios de mercado para quienes operan o
          siguen el mercado de divisas. No somos un banco, un bróker ni una
          gestora de inversiones.
        </p>

        <h2>Por qué lo creamos</h2>
        <p>
          El trading forex funciona las 24 horas del día, cinco días a la semana,
          repartido en sesiones regionales en Sídney, Tokio, Fráncfort, Londres y
          Nueva York. Averiguar cuál de esas sesiones está abierta ahora mismo, en
          tu propia zona horaria, solía implicar convertir el GMT a mano y volver a
          comprobarlo cada vez que un país cambiaba sus relojes por el horario de
          verano. Creamos {PRODUCT.name} para que esa conversión se haga de forma
          automática, siempre y gratis.
        </p>
        <p>
          Es un problema que vivimos en primera persona: como un pequeño equipo
          de software que también sigue los mercados, estábamos cansados de hacer
          cálculos de GMT mentalmente y de dudar si Londres ya había pasado al
          horario de verano. La herramienta nació como la utilidad que queríamos
          para nuestro propio uso, y seguimos usándola cada jornada de trading, que
          es la forma más rápida de darnos cuenta cuando algo no cuadra.
        </p>

        <h2>Qué es Horario del Mercado Forex y qué no es</h2>
        <p>
          {PRODUCT.name} es una utilidad de horarios de mercado. Muestra cuándo
          abren, cierran y se solapan las principales sesiones forex, convertidas a
          tu zona horaria local. <strong>No</strong> es un bróker, un asesor
          financiero ni un servicio de señales, y no ofrece servicios de trading,
          depósito o retiro. Nada en este sitio es asesoramiento financiero
          personalizado; consulta nuestro{" "}
          <Link href="/disclaimer">aviso de riesgo y trading</Link> para conocer
          todos los detalles.
        </p>

        <h2>Cómo mantenemos la precisión</h2>
        <p>
          Cada horario de sesión se calcula a partir de las reglas de la propia
          zona horaria de cada centro financiero, en lugar de una tabla fija, de
          modo que los cambios de horario de verano se aplican automáticamente.
          Explicamos exactamente cómo funciona, y las fuentes en las que nos
          basamos, en nuestra{" "}
          <Link href="/methodology">página de metodología</Link>. Cómo
          investigamos, revisamos y corregimos nuestro contenido escrito se detalla
          en nuestra <Link href="/editorial-policy">política editorial</Link>.
        </p>

        <h2>La herramienta web y la app gratuitas</h2>
        <p>
          La herramienta web en {SITE_URL} funciona íntegramente en tu navegador,
          sin registro ni anuncios. Se acompaña de una app gratuita para iOS y
          Android que añade widgets para la pantalla de inicio, un calendario
          económico y alertas de sesión, para quienes quieren el mismo reloj en
          vivo sin tener una pestaña del navegador abierta.
        </p>

        <h2>Contacto</h2>
        <p>
          Atendemos consultas, correcciones o propuestas de colaboración en{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>
          , o consulta nuestra <Link href="/contact">página de contacto</Link>.
        </p>
      </>
    ),
  },
  fr: {
    metaTitle: `À propos de ${PRODUCT.name}`,
    metaDescription:
      "Qui développe Forex Market Hours, pourquoi nous avons créé une horloge de séances gratuite et en direct, et comment nous gardons les horaires exacts.",
    ogDescription:
      "Qui développe Forex Market Hours, pourquoi nous avons créé une horloge de séances gratuite et en direct, et comment nous gardons les horaires exacts.",
    breadcrumb: "À propos",
    h1: `À propos de ${PRODUCT.name}`,
    lead: (
      <>
        {PRODUCT.name} est une horloge de séances forex gratuite et en direct,
        développée par {PUBLISHER.displayName}, une société logicielle qui conçoit
        de petits outils ciblés plutôt que de larges produits financiers.
      </>
    ),
    body: (
      <>
        <h2>Qui nous sommes</h2>
        <p>
          {PUBLISHER.displayName} ({PUBLISHER.legalName}) est une société
          logicielle. Nous développons et maintenons {PRODUCT.name}, l’outil web
          disponible sur {SITE_URL} et les applications iOS et Android qui
          l’accompagnent, comme un seul produit ciblé : un utilitaire d’horaires de
          marché pour celles et ceux qui tradent ou suivent le marché des changes.
          Nous ne sommes ni une banque, ni un courtier, ni une société
          d’investissement.
        </p>

        <h2>Pourquoi nous l’avons créé</h2>
        <p>
          Le trading sur le forex fonctionne 24 heures sur 24, cinq jours par
          semaine, réparti entre les séances régionales de Sydney, Tokyo, Francfort,
          Londres et New York. Savoir laquelle de ces séances est ouverte en ce
          moment, dans votre propre fuseau horaire, supposait généralement de
          convertir le GMT à la main et de tout revérifier dès qu’un pays changeait
          d’heure. Nous avons créé {PRODUCT.name} pour que cette conversion se fasse
          automatiquement, en permanence et gratuitement.
        </p>
        <p>
          C’est un problème que nous avons rencontré nous-mêmes : petite équipe
          logicielle qui suit les marchés, nous en avions assez de faire des calculs
          GMT de tête et de nous demander si Londres était déjà passée à l’heure
          d’été. L’outil est né comme l’utilitaire que nous voulions pour notre
          propre usage, et nous nous en servons encore chaque jour de trading, ce
          qui reste le moyen le plus rapide de repérer une anomalie.
        </p>

        <h2>Ce qu’est Forex Market Hours, et ce qu’il n’est pas</h2>
        <p>
          {PRODUCT.name} est un utilitaire d’horaires de marché. Il montre quand les
          grandes séances du forex ouvrent, ferment et se chevauchent, converties
          dans votre fuseau horaire local. Ce n’est <strong>pas</strong> un
          courtier, ni un conseiller financier, ni un service de signaux, et il ne
          propose aucun service de trading, de dépôt ou de retrait. Rien sur ce site
          ne constitue un conseil financier personnalisé : voir notre{" "}
          <Link href="/disclaimer">avertissement sur les risques</Link> pour le
          détail complet.
        </p>

        <h2>Comment nous maintenons l’exactitude</h2>
        <p>
          Chaque horaire de séance est calculé à partir des règles de fuseau horaire
          propres à chaque place financière plutôt qu’à partir d’un tableau figé :
          les changements d’heure saisonniers sont donc appliqués automatiquement.
          Nous expliquons précisément comment cela fonctionne, ainsi que les sources
          sur lesquelles nous nous appuyons, sur notre{" "}
          <Link href="/methodology">page méthodologie</Link>. La manière dont nous
          recherchons, relisons et corrigeons nos contenus rédigés est décrite dans
          notre <Link href="/editorial-policy">politique éditoriale</Link>.
        </p>

        <h2>L’outil web gratuit et l’application</h2>
        <p>
          L’outil web disponible sur {SITE_URL} fonctionne entièrement dans votre
          navigateur, sans inscription et sans publicité. Il s’accompagne d’une
          application iOS et Android gratuite qui ajoute des widgets d’écran
          d’accueil, un calendrier économique et des alertes de séance, pour celles
          et ceux qui veulent la même horloge en direct sans garder un onglet
          ouvert.
        </p>

        <h2>Nous contacter</h2>
        <p>
          Questions, corrections ou demandes de partenariat sont les bienvenues à{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>
          , ou consultez notre <Link href="/contact">page contact</Link>.
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
  const href = "/about";

  return {
    title: { absolute: c.metaTitle },
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

export default async function AboutPage({
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
        item: `${SITE_URL}${getPathname({ locale: l, href: "/about" })}`,
      },
    ],
  };

  // AboutPage → Organization: the org-level E-E-A-T / entity signal. `sameAs`
  // points to the publisher's real, verifiable App Store and Google Play
  // listings; the org publishes both apps under this identity.
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: c.metaTitle,
    inLanguage: l,
    url: `${SITE_URL}${getPathname({ locale: l, href: "/about" })}`,
    mainEntity: {
      "@type": "Organization",
      name: PUBLISHER.legalName,
      alternateName: PUBLISHER.displayName,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.webp`,
      email: "info@forexmarkethours.app",
      sameAs: [APP.appStoreUrl, APP.googlePlayUrl],
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-ivory sm:text-5xl">{c.h1}</h1>
        <p className="mt-4 text-lg text-fog">{c.lead}</p>
      </header>

      <div className="article-prose mt-8">{c.body}</div>
    </article>
  );
}
