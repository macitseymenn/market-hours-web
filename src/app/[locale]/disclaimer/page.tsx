import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PRODUCT, SITE_URL } from "@/lib/site";
import { Link, getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const COPY = {
  en: {
    metaTitle: "Risk & Trading Disclaimer",
    metaDescription:
      "Forex Market Hours is a market-hours tool only, not financial advice and not a broker. Read our full risk and trading disclaimer.",
    ogDescription:
      "Forex Market Hours is a market-hours tool only, not financial advice and not a broker.",
    breadcrumb: "Disclaimer",
    h1: "Risk & Trading Disclaimer",
    body: (
      <>
        <h2>Not financial advice</h2>
        <p>
          Nothing on {PRODUCT.name}, including the web tool, the mobile app, the
          blog, or any other page on this site, constitutes financial, investment,
          trading, tax or legal advice. We do not recommend buying, selling, or
          holding any currency, security, or other financial instrument. Any
          decision to trade is yours alone, and you should seek independent,
          licensed advice before making one.
        </p>

        <h2>Not a broker</h2>
        <p>
          {PRODUCT.name} is a market-hours utility. It does not execute trades,
          hold client funds, or offer any deposit or withdrawal service. We are not
          a broker, exchange, or payment provider, and we never ask for your
          trading account credentials or funds.
        </p>

        <h2>Trading foreign exchange carries risk</h2>
        <p>
          Foreign-exchange trading involves substantial risk of loss and is not
          suitable for every investor. Past performance of any market or strategy
          is not indicative of future results. If you choose to trade, do so only
          through a properly regulated broker and only with money you can afford to
          lose.
        </p>

        <h2>Session times are indicative</h2>
        <p>
          The session hours shown by {PRODUCT.name} are computed from each financial
          centre&apos;s timezone rules and follow daylight-saving changes
          automatically. See our <Link href="/methodology">methodology</Link> for
          how. They are provided for general orientation, reflect a normal trading
          day, and exclude market holidays and unscheduled closures. Always confirm
          exact hours with your broker or exchange before relying on them for a
          trading decision.
        </p>

        <h2>Questions</h2>
        <p>
          If anything here is unclear, contact us at{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
        </p>
      </>
    ),
  },
  es: {
    metaTitle: "Aviso de riesgo y trading",
    metaDescription:
      "Horario del Mercado Forex es únicamente una herramienta de horarios de mercado: no es asesoramiento financiero ni un bróker. Lee nuestro aviso de riesgo y trading completo.",
    ogDescription:
      "Horario del Mercado Forex es únicamente una herramienta de horarios de mercado: no es asesoramiento financiero ni un bróker.",
    breadcrumb: "Aviso de riesgo",
    h1: "Aviso de riesgo y trading",
    body: (
      <>
        <h2>No es asesoramiento financiero</h2>
        <p>
          Nada en {PRODUCT.name}, ni la herramienta web, ni la app para móvil, ni
          el blog, ni ninguna otra página de este sitio, constituye asesoramiento
          financiero, de inversión, de trading, fiscal o legal. No recomendamos
          comprar, vender ni mantener ninguna divisa, valor u otro instrumento
          financiero. Cualquier decisión de operar es únicamente tuya, y deberías
          buscar asesoramiento independiente y autorizado antes de tomarla.
        </p>

        <h2>No es un bróker</h2>
        <p>
          {PRODUCT.name} es una utilidad de horarios de mercado. No ejecuta
          operaciones, no custodia fondos de clientes ni ofrece ningún servicio de
          depósito o retiro. No somos un bróker, una bolsa ni un proveedor de
          pagos, y nunca te pedimos las credenciales ni los fondos de tu cuenta de
          trading.
        </p>

        <h2>Operar en el mercado de divisas conlleva riesgo</h2>
        <p>
          El trading de divisas implica un riesgo sustancial de pérdida y no es
          adecuado para todos los inversores. El rendimiento pasado de cualquier
          mercado o estrategia no es indicativo de resultados futuros. Si decides
          operar, hazlo solo a través de un bróker debidamente regulado y
          únicamente con dinero que puedas permitirte perder.
        </p>

        <h2>Los horarios de las sesiones son orientativos</h2>
        <p>
          Los horarios de sesión que muestra {PRODUCT.name} se calculan a partir de
          las reglas de zona horaria de cada centro financiero y se ajustan
          automáticamente a los cambios de horario de verano; consulta nuestra{" "}
          <Link href="/methodology">metodología</Link> para saber cómo. Se facilitan
          a título orientativo, reflejan una jornada de negociación normal y
          excluyen los festivos de mercado y los cierres imprevistos. Confirma
          siempre las horas exactas con tu bróker o bolsa antes de basar en ellas
          una decisión de trading.
        </p>

        <h2>Preguntas</h2>
        <p>
          Si algo aquí no queda claro, contáctanos en{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
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
  const href = "/disclaimer";

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
      description: c.ogDescription,
      url: `${SITE_URL}${getPathname({ locale: l, href })}`,
    },
  };
}

export default async function DisclaimerPage({
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
      { "@type": "ListItem", position: 1, name: l === "es" ? "Inicio" : "Home", item: `${SITE_URL}/${l}` },
      {
        "@type": "ListItem",
        position: 2,
        name: c.breadcrumb,
        item: `${SITE_URL}${getPathname({ locale: l, href: "/disclaimer" })}`,
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
        <p className="mt-4 text-lg text-fog">{tc("disclaimer")}</p>
      </header>

      <div className="article-prose mt-8">{c.body}</div>
    </article>
  );
}
