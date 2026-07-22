import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
import { Link, getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const COPY = {
  en: {
    metaTitle: "Editorial Standards & Accuracy Policy",
    metaDescription:
      "How we research, source and review forex market-hours content — our accuracy, corrections and non-advice editorial standards.",
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
          maintains the tool — see our <Link href="/about">About page</Link>. The
          same team both writes the guides and maintains the live tool, so the
          data behind an article and the words describing it are checked together
          rather than in isolation. When a real named editor is credited on an
          article, their profile and background will be linked from the byline.
        </p>

        <h2>Corrections</h2>
        <p>
          If we find — or are told about — an inaccuracy, we correct it and, for
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
          their hours work — see our full{" "}
          <Link href="/disclaimer">risk and trading disclaimer</Link>.
        </p>

        <h2>Report an inaccuracy</h2>
        <p>
          Spotted something wrong — a session time, a source link, a date? Tell us
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
          Si detectamos —o nos avisan de— una imprecisión, la corregimos y, en los
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

export default async function EditorialPolicyPage({
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
