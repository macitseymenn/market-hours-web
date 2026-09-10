import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PRODUCT, SESSIONS, SITE_URL } from "@/lib/site";
import { Link, getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { sharedAlternates } from "@/i18n/alternates";

// ISR: re-render daily. The page's own copy is static, but the shared chrome
// (header language switcher, footer) lists the locales that are currently live,
// so a scheduled locale reaching its date must be able to appear here without a
// deploy. See @/i18n/locales.
export const revalidate = 86400;

const CITY: Record<Locale, Record<string, string>> = {
  en: {
    Sydney: "Sydney",
    Tokyo: "Tokyo",
    Frankfurt: "Frankfurt",
    London: "London",
    "New York": "New York",
  },
  es: {
    Sydney: "Sídney",
    Tokyo: "Tokio",
    Frankfurt: "Fráncfort",
    London: "Londres",
    "New York": "Nueva York",
  },
  fr: {
    Sydney: "Sydney",
    Tokyo: "Tokyo",
    Frankfurt: "Francfort",
    London: "Londres",
    "New York": "New York",
  },
};

const REGION: Record<Locale, Record<string, string>> = {
  en: {
    Sydney: "Australia",
    Tokyo: "Japan",
    Frankfurt: "Germany",
    London: "United Kingdom",
    "New York": "United States",
  },
  es: {
    Sydney: "Australia",
    Tokyo: "Japón",
    Frankfurt: "Alemania",
    London: "Reino Unido",
    "New York": "Estados Unidos",
  },
  fr: {
    Sydney: "Australie",
    Tokyo: "Japon",
    Frankfurt: "Allemagne",
    London: "Royaume-Uni",
    "New York": "États-Unis",
  },
};

const COPY = {
  en: {
    metaTitle: "How We Calculate Forex Session Times",
    metaDescription:
      "Our methodology: how Forex Market Hours computes each session’s open and close from live timezone rules, including daylight-saving shifts.",
    ogDescription:
      "How Forex Market Hours computes each session’s open and close from live timezone rules, including daylight-saving shifts.",
    breadcrumb: "Methodology",
    h1: "How We Calculate Forex Session Times",
    lead: (
      <>
        Every session time in {PRODUCT.name} is computed live from each financial
        centre&apos;s own timezone rules, not read from a static GMT table, so
        daylight-saving shifts are always applied automatically.
      </>
    ),
    body: (sessionList: ReactNode) => (
      <>
        <h2>The short answer</h2>
        <p>
          Each forex session is defined by the <strong>local</strong> trading
          hours of its financial centre, for example, London trades roughly
          08:00–17:00 in its own local time, all year round. We compute the
          current UTC/GMT equivalent of that local window using each city&apos;s
          IANA timezone rules, via the browser&apos;s built-in <code>Intl</code>{" "}
          API. Because the calculation always starts from local time, it
          automatically follows every daylight-saving change (GMT/BST, EST/EDT,
          AEST/AEDT and so on) without us having to publish a new table twice a
          year.
        </p>

        <h2>Standard-time session windows</h2>
        <p>
          For orientation, here are the five major sessions&apos; approximate
          windows in GMT during northern-hemisphere winter (standard time). These
          shift by an hour for centres observing daylight saving during their
          local summer:
        </p>
        <ul>{sessionList}</ul>

        <h2>How the calculation works</h2>
        <p>
          Rather than hard-coding an offset like &quot;GMT+1&quot; for London, we
          ask the browser what time it currently is in the{" "}
          <code>Europe/London</code> timezone (and the equivalent IANA zone for
          every other session city), using the same time-zone database that
          underpins most modern operating systems and browsers: the{" "}
          <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
            IANA Time Zone Database
          </a>
          . That database is maintained precisely because daylight-saving rules
          change from country to country and year to year, so reading from it,
          instead of a fixed table we&apos;d have to update by hand, is what keeps
          the tool accurate without drifting out of date. In practice we also
          spot-check the tool against the actual local clocks in each session city,
          especially around the spring and autumn clock-change weekends when
          mismatches are most likely to surface.
        </p>

        <h2>Why not a fixed GMT table?</h2>
        <p>
          Countries change their clocks on different dates. The UK and EU move to
          summer time on the last Sunday of March; the United States moves a few
          weeks earlier, on the second Sunday of March; Australia, in the southern
          hemisphere, moves in the opposite direction entirely. The UK government
          publishes the exact dates for its own clock changes on{" "}
          <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
            gov.uk/when-do-the-clocks-change
          </a>
          . A static table quickly goes stale across one or more of these
          transitions; computing from live timezone rules does not.
        </p>

        <h2>Sources</h2>
        <ul>
          <li>
            <a href="https://www.bis.org/statistics/rpfx22.htm" target="_blank" rel="noopener noreferrer">
              Bank for International Settlements: Triennial Central Bank Survey
            </a>{" "}
            for London&apos;s position as the largest FX centre by trading volume.
          </li>
          <li>
            The{" "}
            <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
              IANA Time Zone Database
            </a>{" "}
            for local trading-hour to UTC conversions and daylight-saving rules.
          </li>
          <li>
            <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
              UK government clock-change guidance
            </a>{" "}
            as a reference for one major transition date.
          </li>
        </ul>

        <h2>Limitations</h2>
        <p>
          The session windows above are indicative of a normal trading day and
          exclude market holidays, half-days, and unscheduled closures, which
          individual banks and exchanges set independently. Use the{" "}
          <Link href="/">live tool on our homepage</Link> for the current,
          timezone-adjusted status, and treat any session time as general
          information rather than a guarantee that a given market is trading.
        </p>
      </>
    ),
  },
  es: {
    metaTitle: "Cómo calculamos los horarios de las sesiones forex",
    metaDescription:
      "Nuestra metodología: cómo Horario del Mercado Forex calcula la apertura y el cierre de cada sesión a partir de reglas de zona horaria en vivo, incluidos los cambios de horario de verano.",
    ogDescription:
      "Cómo Horario del Mercado Forex calcula la apertura y el cierre de cada sesión a partir de reglas de zona horaria en vivo, incluidos los cambios de horario de verano.",
    breadcrumb: "Metodología",
    h1: "Cómo calculamos los horarios de las sesiones forex",
    lead: (
      <>
        Cada horario de sesión en {PRODUCT.name} se calcula en vivo a partir de las
        reglas de la propia zona horaria de cada centro financiero, no se lee de
        una tabla fija en GMT, de modo que los cambios de horario de verano se
        aplican siempre de forma automática.
      </>
    ),
    body: (sessionList: ReactNode) => (
      <>
        <h2>La respuesta breve</h2>
        <p>
          Cada sesión forex se define por las horas de negociación{" "}
          <strong>locales</strong> de su centro financiero; por ejemplo, Londres
          opera aproximadamente de 08:00 a 17:00 en su propia hora local, durante
          todo el año. Calculamos el equivalente actual en UTC/GMT de esa ventana
          local usando las reglas de zona horaria IANA de cada ciudad, mediante la
          API <code>Intl</code> integrada en el navegador. Como el cálculo siempre
          parte de la hora local, sigue automáticamente cada cambio de horario de
          verano (GMT/BST, EST/EDT, AEST/AEDT, etc.) sin que tengamos que publicar
          una tabla nueva dos veces al año.
        </p>

        <h2>Ventanas de sesión en horario estándar</h2>
        <p>
          A modo de orientación, estas son las ventanas aproximadas en GMT de las
          cinco grandes sesiones durante el invierno del hemisferio norte (horario
          estándar). Se desplazan una hora en los centros que aplican el horario de
          verano durante su verano local:
        </p>
        <ul>{sessionList}</ul>

        <h2>Cómo funciona el cálculo</h2>
        <p>
          En lugar de fijar un desfase como «GMT+1» para Londres, preguntamos al
          navegador qué hora es en ese momento en la zona horaria{" "}
          <code>Europe/London</code> (y la zona IANA equivalente de cada una de las
          demás ciudades de sesión), usando la misma base de datos de zonas
          horarias que sustenta la mayoría de los sistemas operativos y navegadores
          modernos: la{" "}
          <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
            base de datos de zonas horarias de la IANA
          </a>
          . Esa base de datos se mantiene precisamente porque las reglas del
          horario de verano cambian de un país a otro y de un año a otro, así que
          leer de ella, en lugar de una tabla fija que tendríamos que actualizar a
          mano, es lo que mantiene la herramienta precisa sin quedarse desfasada.
          En la práctica, además cotejamos la herramienta con los relojes locales
          reales de cada ciudad de sesión, sobre todo en los fines de semana de
          cambio de hora de primavera y otoño, cuando es más probable que aparezcan
          discrepancias.
        </p>

        <h2>¿Por qué no una tabla fija en GMT?</h2>
        <p>
          Los países cambian sus relojes en fechas distintas. El Reino Unido y la
          UE pasan al horario de verano el último domingo de marzo; Estados Unidos
          lo hace unas semanas antes, el segundo domingo de marzo; Australia, en el
          hemisferio sur, lo hace en el sentido contrario. El Gobierno del Reino
          Unido publica las fechas exactas de sus cambios de hora en{" "}
          <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
            gov.uk/when-do-the-clocks-change
          </a>
          . Una tabla fija se queda desfasada rápidamente en una o más de estas
          transiciones; calcular a partir de reglas de zona horaria en vivo, no.
        </p>

        <h2>Fuentes</h2>
        <ul>
          <li>
            <a href="https://www.bis.org/statistics/rpfx22.htm" target="_blank" rel="noopener noreferrer">
              Banco de Pagos Internacionales: Encuesta Trienal de Bancos Centrales
            </a>{" "}
            para la posición de Londres como el mayor centro forex por volumen de
            negociación.
          </li>
          <li>
            La{" "}
            <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
              base de datos de zonas horarias de la IANA
            </a>{" "}
            para las conversiones de la hora local de negociación a UTC y las reglas
            del horario de verano.
          </li>
          <li>
            La{" "}
            <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
              guía del Gobierno del Reino Unido sobre los cambios de hora
            </a>{" "}
            como referencia de una de las principales fechas de transición.
          </li>
        </ul>

        <h2>Limitaciones</h2>
        <p>
          Las ventanas de sesión anteriores son orientativas para una jornada de
          negociación normal y excluyen los festivos de mercado, las medias
          jornadas y los cierres imprevistos, que cada banco y bolsa fija de forma
          independiente. Usa la{" "}
          <Link href="/">herramienta en vivo de nuestra página de inicio</Link>{" "}
          para conocer el estado actual ajustado a la zona horaria, y considera
          cualquier horario de sesión como información general y no como garantía de
          que un mercado concreto esté operando.
        </p>
      </>
    ),
  },
  fr: {
    metaTitle: "Comment nous calculons les horaires des séances forex",
    metaDescription:
      "Notre méthodologie : comment Forex Market Hours calcule l’ouverture et la fermeture de chaque séance à partir de règles de fuseau horaire en direct, heure d’été comprise.",
    ogDescription:
      "Comment Forex Market Hours calcule l’ouverture et la fermeture de chaque séance à partir de règles de fuseau horaire en direct, heure d’été comprise.",
    breadcrumb: "Méthodologie",
    h1: "Comment nous calculons les horaires des séances forex",
    lead: (
      <>
        Chaque horaire de séance dans {PRODUCT.name} est calculé en direct à partir
        des règles de fuseau horaire propres à chaque place financière, et non lu
        dans un tableau GMT figé : les changements d’heure saisonniers sont donc
        toujours appliqués automatiquement.
      </>
    ),
    body: (sessionList: ReactNode) => (
      <>
        <h2>La réponse courte</h2>
        <p>
          Chaque séance du forex est définie par les horaires de trading{" "}
          <strong>locaux</strong> de sa place financière : Londres, par exemple,
          négocie approximativement de 08:00 à 17:00 à son heure locale, toute
          l’année. Nous calculons l’équivalent UTC/GMT actuel de cette plage locale à
          partir des règles de fuseau horaire IANA de chaque ville, via l’API{" "}
          <code>Intl</code> intégrée au navigateur. Comme le calcul part toujours de
          l’heure locale, il suit automatiquement chaque changement d’heure
          saisonnier (GMT/BST, EST/EDT, AEST/AEDT, etc.) sans que nous ayons à
          publier un nouveau tableau deux fois par an.
        </p>

        <h2>Plages horaires des séances en heure standard</h2>
        <p>
          À titre de repère, voici les plages approximatives des cinq grandes
          séances en GMT pendant l’hiver de l’hémisphère nord (heure standard).
          Elles se décalent d’une heure pour les places qui appliquent l’heure d’été
          pendant leur été local :
        </p>
        <ul>{sessionList}</ul>

        <h2>Comment fonctionne le calcul</h2>
        <p>
          Plutôt que de coder en dur un décalage du type « GMT+1 » pour Londres,
          nous demandons au navigateur quelle heure il est actuellement dans le
          fuseau <code>Europe/London</code> (et dans le fuseau IANA équivalent pour
          chaque autre ville de séance), en utilisant la même base de données de
          fuseaux horaires que celle qui sous-tend la plupart des systèmes
          d’exploitation et navigateurs modernes : la{" "}
          <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
            base de données des fuseaux horaires IANA
          </a>
          . Cette base est maintenue précisément parce que les règles d’heure d’été
          changent d’un pays à l’autre et d’une année à l’autre : y puiser, au lieu
          d’un tableau figé que nous devrions mettre à jour à la main, est ce qui
          garde l’outil exact sans qu’il ne se périme. En pratique, nous vérifions
          aussi l’outil par sondage face aux horloges locales réelles de chaque
          ville de séance, en particulier autour des week-ends de changement d’heure
          du printemps et de l’automne, où les écarts sont les plus probables.
        </p>

        <h2>Pourquoi pas un tableau GMT figé ?</h2>
        <p>
          Les pays changent d’heure à des dates différentes. Le Royaume-Uni et l’UE
          passent à l’heure d’été le dernier dimanche de mars ; les États-Unis
          basculent quelques semaines plus tôt, le deuxième dimanche de mars ;
          l’Australie, dans l’hémisphère sud, va dans le sens inverse. Le
          gouvernement britannique publie les dates exactes de ses propres
          changements d’heure sur{" "}
          <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
            gov.uk/when-do-the-clocks-change
          </a>
          . Un tableau statique devient rapidement obsolète au fil de l’une ou
          l’autre de ces transitions ; un calcul fondé sur des règles de fuseau
          horaire en direct, non.
        </p>

        <h2>Sources</h2>
        <ul>
          <li>
            <a href="https://www.bis.org/statistics/rpfx22.htm" target="_blank" rel="noopener noreferrer">
              Banque des règlements internationaux : enquête triennale des banques
              centrales
            </a>{" "}
            pour la position de Londres comme première place de change en volume.
          </li>
          <li>
            La{" "}
            <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
              base de données des fuseaux horaires IANA
            </a>{" "}
            pour la conversion des horaires de trading locaux en UTC et les règles
            d’heure d’été.
          </li>
          <li>
            <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
              Informations du gouvernement britannique sur le changement d’heure
            </a>{" "}
            comme référence pour l’une des grandes dates de transition.
          </li>
        </ul>

        <h2>Limites</h2>
        <p>
          Les plages de séance ci-dessus sont indicatives d’une journée de trading
          normale et excluent les jours fériés de marché, les séances écourtées et
          les fermetures imprévues, que chaque banque et chaque place fixent
          indépendamment. Utilisez l’
          <Link href="/">outil en direct sur notre page d’accueil</Link> pour
          connaître l’état actuel ajusté à votre fuseau horaire, et considérez tout
          horaire de séance comme une information générale plutôt que comme une
          garantie qu’un marché donné est bien en train de négocier.
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
  const href = "/methodology";

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

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as Locale;
  const c = COPY[l];

  const sessionList = SESSIONS.map((s) => (
    <li key={s.city}>
      <strong>{CITY[l][s.city]}</strong> ({REGION[l][s.city]}): {s.gmt} GMT
    </li>
  ));

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
        item: `${SITE_URL}${getPathname({ locale: l, href: "/methodology" })}`,
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

      <div className="article-prose mt-8">{c.body(sessionList)}</div>
    </article>
  );
}
