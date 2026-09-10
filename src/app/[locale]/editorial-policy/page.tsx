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
    metaTitle: "Editorial Standards & Accuracy Policy",
    metaDescription:
      "How we research, source and review forex market-hours content, our accuracy, corrections and non-advice editorial standards.",
    breadcrumb: "Editorial Policy",
    h1: "Editorial Standards & Accuracy Policy",
    lead: (
      <>
        Forex is a subject where accuracy matters. This page explains how we
        research, write and correct the content on {PRODUCT.name}, and what we
        deliberately do not do.
      </>
    ),
    body: (
      <>
        <h2>How we research and source content</h2>
        <p>
          Our articles and reference pages are built from primary and official
          sources wherever possible: central-bank and monetary authority
          publications, the{" "}
          <a href="https://www.bis.org/statistics/rpfx22.htm" target="_blank" rel="noopener noreferrer">
            Bank for International Settlements&apos; Triennial Central Bank Survey
          </a>{" "}
          of global FX turnover, official government guidance such as the UK&apos;s{" "}
          <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
            clock-change pages
          </a>
          , and the{" "}
          <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
            IANA Time Zone Database
          </a>{" "}
          that also powers the tool itself. Where we cite a figure or claim, we
          link to the source rather than restating it as an unattributed fact.
        </p>

        <h2>How we review for accuracy</h2>
        <p>
          Before publishing, session-hours content is checked against the same
          timezone data our live tool uses (see our{" "}
          <Link href="/methodology">methodology page</Link>), so the written guides
          and the interactive clock never contradict each other. Content is
          periodically re-checked as clock-change dates and market conventions are
          confirmed each year.
        </p>

        <h2>Editorial oversight</h2>
        <p>
          Editorial responsibility for {PRODUCT.name} sits with the{" "}
          {PUBLISHER.displayName} team, the software company that builds and
          maintains the tool. See our <Link href="/about">About page</Link>. The
          same team both writes the guides and maintains the live tool, so the
          data behind an article and the words describing it are checked together
          rather than in isolation. When a real named editor is credited on an
          article, their profile and background will be linked from the byline.
        </p>

        <h2>Corrections</h2>
        <p>
          If we find, or are told about, an inaccuracy, we correct it and, for
          substantial changes, update the article&apos;s &quot;last updated&quot;
          date. We would rather fix a mistake quickly than leave it live for the
          sake of appearances.
        </p>

        <h2>What we do not do</h2>
        <p>
          {PRODUCT.name} does not provide financial advice, trading signals, or
          buy/sell recommendations of any kind, and none of our content should be
          read as a suggestion to trade a specific instrument at a specific time.
          We publish general, educational information about how forex sessions and
          their hours work. See our full{" "}
          <Link href="/disclaimer">risk and trading disclaimer</Link>.
        </p>

        <h2>Report an inaccuracy</h2>
        <p>
          Spotted something wrong, a session time, a source link, a date? Tell us
          at{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          and we will look into it.
        </p>
      </>
    ),
  },
  es: {
    metaTitle: "Normas editoriales y política de precisión",
    metaDescription:
      "Cómo investigamos, documentamos y revisamos el contenido sobre el horario del mercado forex: nuestras normas de precisión, correcciones y no asesoramiento.",
    breadcrumb: "Política editorial",
    h1: "Normas editoriales y política de precisión",
    lead: (
      <>
        El forex es un tema en el que la precisión importa. Esta página explica
        cómo investigamos, redactamos y corregimos el contenido de {PRODUCT.name},
        y qué decidimos deliberadamente no hacer.
      </>
    ),
    body: (
      <>
        <h2>Cómo investigamos y documentamos el contenido</h2>
        <p>
          Nuestros artículos y páginas de referencia se basan siempre que es
          posible en fuentes primarias y oficiales: publicaciones de bancos
          centrales y autoridades monetarias, la{" "}
          <a href="https://www.bis.org/statistics/rpfx22.htm" target="_blank" rel="noopener noreferrer">
            Encuesta Trienal de Bancos Centrales del Banco de Pagos Internacionales
          </a>{" "}
          sobre el volumen mundial de divisas, orientaciones oficiales de los
          gobiernos como las{" "}
          <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
            páginas sobre los cambios de hora del Reino Unido
          </a>
          , y la{" "}
          <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
            base de datos de zonas horarias de la IANA
          </a>{" "}
          que también impulsa la propia herramienta. Cuando citamos una cifra o una
          afirmación, enlazamos a la fuente en lugar de repetirla como un dato sin
          atribuir.
        </p>

        <h2>Cómo revisamos la precisión</h2>
        <p>
          Antes de publicar, el contenido sobre horarios de sesión se coteja con
          los mismos datos de zona horaria que usa nuestra herramienta en vivo
          (consulta nuestra{" "}
          <Link href="/methodology">página de metodología</Link>), de modo que las
          guías escritas y el reloj interactivo nunca se contradicen. El contenido
          se vuelve a comprobar periódicamente, a medida que cada año se confirman
          las fechas de los cambios de hora y las convenciones de mercado.
        </p>

        <h2>Supervisión editorial</h2>
        <p>
          La responsabilidad editorial de {PRODUCT.name} recae en el equipo de{" "}
          {PUBLISHER.displayName}, la empresa de software que crea y mantiene la
          herramienta; consulta nuestra <Link href="/about">página Acerca de</Link>.
          El mismo equipo redacta las guías y mantiene la herramienta en vivo, de
          modo que los datos que hay detrás de un artículo y las palabras que lo
          describen se comprueban a la vez, no por separado. Cuando se acredite a un
          editor con nombre en un artículo, su perfil y su trayectoria se enlazarán
          desde la firma.
        </p>

        <h2>Correcciones</h2>
        <p>
          Si detectamos, o nos avisan de, una imprecisión, la corregimos y, en los
          cambios sustanciales, actualizamos la fecha de «última actualización» del
          artículo. Preferimos corregir un error con rapidez antes que dejarlo
          publicado por guardar las apariencias.
        </p>

        <h2>Lo que no hacemos</h2>
        <p>
          {PRODUCT.name} no ofrece asesoramiento financiero, señales de trading ni
          recomendaciones de compra o venta de ningún tipo, y ninguno de nuestros
          contenidos debe interpretarse como una sugerencia para operar un
          instrumento concreto en un momento concreto. Publicamos información
          general y educativa sobre cómo funcionan las sesiones forex y sus
          horarios; consulta nuestro{" "}
          <Link href="/disclaimer">aviso de riesgo y trading</Link> completo.
        </p>

        <h2>Informar de una imprecisión</h2>
        <p>
          ¿Has visto algo incorrecto: un horario de sesión, un enlace a una fuente,
          una fecha? Escríbenos a{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          y lo revisaremos.
        </p>
      </>
    ),
  },
  fr: {
    metaTitle: "Normes éditoriales et politique d’exactitude",
    metaDescription:
      "Comment nous recherchons, sourçons et relisons le contenu sur les horaires du forex : nos normes d’exactitude, de correction et de non-conseil.",
    breadcrumb: "Politique éditoriale",
    h1: "Normes éditoriales et politique d’exactitude",
    lead: (
      <>
        Le forex est un sujet où l’exactitude compte. Cette page explique comment
        nous recherchons, rédigeons et corrigeons le contenu de {PRODUCT.name}, et
        ce que nous nous interdisons délibérément de faire.
      </>
    ),
    body: (
      <>
        <h2>Comment nous recherchons et sourçons le contenu</h2>
        <p>
          Nos articles et nos pages de référence sont construits à partir de
          sources primaires et officielles chaque fois que c’est possible :
          publications des banques centrales et des autorités monétaires,{" "}
          <a href="https://www.bis.org/statistics/rpfx22.htm" target="_blank" rel="noopener noreferrer">
            enquête triennale des banques centrales
          </a>{" "}
          de la Banque des règlements internationaux sur le volume mondial des
          changes, informations officielles des gouvernements comme les{" "}
          <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
            pages britanniques sur le changement d’heure
          </a>
          , et la{" "}
          <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
            base de données des fuseaux horaires IANA
          </a>{" "}
          qui alimente également l’outil lui-même. Lorsque nous citons un chiffre
          ou une affirmation, nous renvoyons à la source plutôt que de la présenter
          comme un fait sans attribution.
        </p>

        <h2>Comment nous vérifions l’exactitude</h2>
        <p>
          Avant publication, le contenu portant sur les horaires de séance est
          confronté aux mêmes données de fuseaux horaires que celles utilisées par
          notre outil en direct (voir notre{" "}
          <Link href="/methodology">page méthodologie</Link>), afin que les guides
          rédigés et l’horloge interactive ne se contredisent jamais. Le contenu est
          revérifié périodiquement, à mesure que les dates de changement d’heure et
          les usages de marché sont confirmés chaque année.
        </p>

        <h2>Supervision éditoriale</h2>
        <p>
          La responsabilité éditoriale de {PRODUCT.name} incombe à l’équipe{" "}
          {PUBLISHER.displayName}, la société qui développe et maintient l’outil.
          Voir notre <Link href="/about">page À propos</Link>. La même équipe rédige
          les guides et maintient l’outil en direct : les données derrière un
          article et les mots qui les décrivent sont donc vérifiés ensemble plutôt
          qu’isolément. Lorsqu’un rédacteur réel et nommé signera un article, son
          profil et son parcours seront liés depuis la signature.
        </p>

        <h2>Corrections</h2>
        <p>
          Si nous constatons une inexactitude, ou si on nous la signale, nous la
          corrigeons et, pour les modifications substantielles, nous mettons à jour
          la date de « dernière mise à jour » de l’article. Nous préférons corriger
          rapidement une erreur plutôt que de la laisser en ligne pour sauver les
          apparences.
        </p>

        <h2>Ce que nous ne faisons pas</h2>
        <p>
          {PRODUCT.name} ne fournit ni conseil financier, ni signaux de trading, ni
          recommandation d’achat ou de vente de quelque nature que ce soit, et aucun
          de nos contenus ne doit être lu comme une suggestion de trader un
          instrument précis à un moment précis. Nous publions des informations
          générales et pédagogiques sur le fonctionnement des séances du forex et
          de leurs horaires. Voir notre{" "}
          <Link href="/disclaimer">avertissement complet sur les risques</Link>.
        </p>

        <h2>Signaler une inexactitude</h2>
        <p>
          Vous avez repéré une erreur : un horaire de séance, un lien source, une
          date ? Dites-le-nous à{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          et nous examinerons cela.
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
  const href = "/editorial-policy";

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

export default async function EditorialPolicyPage({
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
        item: `${SITE_URL}${getPathname({ locale: l, href: "/editorial-policy" })}`,
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
