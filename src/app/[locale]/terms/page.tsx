import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { Link, getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { sharedAlternates } from "@/i18n/alternates";

// ISR: re-render daily. The page's own copy is static, but the shared chrome
// (header language switcher, footer) lists the locales that are currently live,
// so a scheduled locale reaching its date must be able to appear here without a
// deploy. See @/i18n/locales.
export const revalidate = 86400;

const LAST_UPDATED = "2026-07-22";

const COPY = {
  en: {
    metaTitle: "Terms of Use",
    metaDescription:
      "The terms governing use of the Forex Market Hours web tool and mobile apps.",
    breadcrumb: "Terms of Use",
    h1: "Terms of Use",
    lead: (
      <>
        These terms govern your use of the {PRODUCT.name} web tool at {SITE_URL}{" "}
        and its companion iOS and Android apps, published by{" "}
        {PUBLISHER.displayName}.
      </>
    ),
    lastUpdated: (date: string) => <>Last updated: {date}.</>,
    body: (
      <>
        <blockquote>
          This is a general terms-of-use template intended to describe how the
          service actually works. It is not a substitute for legal advice, please
          have it reviewed by qualified counsel before relying on it for any dispute
          or compliance purpose.
        </blockquote>

        <h2>1. Acceptance of these terms</h2>
        <p>
          By accessing or using {PRODUCT.name} (the &quot;Service&quot;), you agree
          to these Terms of Use. If you do not agree, please do not use the Service.
        </p>

        <h2>2. Description of the service</h2>
        <p>
          {PRODUCT.name} is a market-hours utility that displays the open, close and
          overlap times of the major forex trading sessions, converted to your local
          timezone, along with related informational content. The Service is
          provided free of charge, with no account required for the web tool.
        </p>

        <h2>3. Not financial advice</h2>
        <p>
          The Service is provided for general, informational purposes only. It is
          not financial, investment, trading, tax or legal advice, and nothing in
          the Service should be treated as a recommendation to buy, sell, or hold any
          instrument. See our full{" "}
          <Link href="/disclaimer">risk and trading disclaimer</Link>.
        </p>

        <h2>4. No warranty of accuracy for trading decisions</h2>
        <p>
          While we make reasonable efforts to keep session times and associated
          content accurate (see our <Link href="/methodology">methodology</Link> and{" "}
          <Link href="/editorial-policy">editorial policy</Link>), the Service is
          provided &quot;as is&quot; and &quot;as available,&quot; without
          warranties of any kind, express or implied, including accuracy,
          completeness, or fitness for a particular purpose. You should independently
          verify any time-sensitive information before acting on it.
        </p>

        <h2>5. Acceptable use</h2>
        <p>
          You agree not to misuse the Service, including by attempting to disrupt it,
          scraping it at a disproportionate rate, reverse engineering the app beyond
          what applicable law permits, or using it for any unlawful purpose.
        </p>

        <h2>6. Intellectual property</h2>
        <p>
          The Service, including its design, text, graphics, and underlying code, is
          owned by {PUBLISHER.displayName} or its licensors and is protected by
          applicable intellectual-property laws. You may use the Service for
          personal, non-commercial purposes; you may not reproduce, redistribute, or
          create derivative products from it without our written permission.
        </p>

        <h2>7. Third-party links and app stores</h2>
        <p>
          The Service links to the Apple App Store and Google Play, and to
          third-party sources cited in our content. Your use of those platforms is
          governed by their own terms, which we do not control.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {PUBLISHER.displayName} shall not
          be liable for any indirect, incidental, or consequential damages, including
          trading losses, arising from your use of, or inability to use, the Service.
        </p>

        <h2>9. Governing entity</h2>
        <p>
          The Service is published by {PUBLISHER.displayName} ({PUBLISHER.legalName}).
        </p>

        <h2>10. Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the Service
          after a change constitutes acceptance of the updated terms.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
        </p>
      </>
    ),
  },
  es: {
    metaTitle: "Términos de uso",
    metaDescription:
      "Los términos que rigen el uso de la herramienta web y las apps para móvil de Horario del Mercado Forex.",
    breadcrumb: "Términos de uso",
    h1: "Términos de uso",
    lead: (
      <>
        Estos términos rigen tu uso de la herramienta web {PRODUCT.name} en{" "}
        {SITE_URL} y de sus apps para iOS y Android, publicadas por{" "}
        {PUBLISHER.displayName}.
      </>
    ),
    lastUpdated: (date: string) => <>Última actualización: {date}.</>,
    body: (
      <>
        <blockquote>
          Esta es una plantilla general de términos de uso destinada a describir cómo
          funciona realmente el servicio. No sustituye al asesoramiento jurídico:
          conviene que la revise un abogado cualificado antes de basar en ella
          cualquier disputa o cumplimiento normativo.
        </blockquote>

        <h2>1. Aceptación de estos términos</h2>
        <p>
          Al acceder a {PRODUCT.name} (el «Servicio») o utilizarlo, aceptas estos
          Términos de uso. Si no estás de acuerdo, te rogamos que no utilices el
          Servicio.
        </p>

        <h2>2. Descripción del servicio</h2>
        <p>
          {PRODUCT.name} es una utilidad de horarios de mercado que muestra las horas
          de apertura, cierre y solapamiento de las principales sesiones de trading
          forex, convertidas a tu zona horaria local, junto con contenido informativo
          relacionado. El Servicio se ofrece de forma gratuita y no requiere cuenta
          para la herramienta web.
        </p>

        <h2>3. No es asesoramiento financiero</h2>
        <p>
          El Servicio se ofrece únicamente con fines informativos generales. No es
          asesoramiento financiero, de inversión, de trading, fiscal o legal, y nada
          en el Servicio debe interpretarse como una recomendación para comprar,
          vender o mantener ningún instrumento. Consulta nuestro{" "}
          <Link href="/disclaimer">aviso de riesgo y trading</Link> completo.
        </p>

        <h2>4. Sin garantía de precisión para decisiones de trading</h2>
        <p>
          Aunque hacemos esfuerzos razonables por mantener la precisión de los
          horarios de sesión y del contenido relacionado (consulta nuestra{" "}
          <Link href="/methodology">metodología</Link> y nuestra{" "}
          <Link href="/editorial-policy">política editorial</Link>), el Servicio se
          ofrece «tal cual» y «según disponibilidad», sin garantías de ningún tipo,
          expresas o implícitas, incluidas la precisión, la integridad o la
          idoneidad para un fin concreto. Deberías verificar de forma independiente
          cualquier información sensible al tiempo antes de actuar en función de ella.
        </p>

        <h2>5. Uso aceptable</h2>
        <p>
          Te comprometes a no hacer un uso indebido del Servicio, lo que incluye
          intentar interrumpirlo, extraer datos a un ritmo desproporcionado, aplicar
          ingeniería inversa a la app más allá de lo que permita la ley aplicable o
          utilizarlo para cualquier fin ilícito.
        </p>

        <h2>6. Propiedad intelectual</h2>
        <p>
          El Servicio, incluidos su diseño, texto, gráficos y código subyacente, es
          propiedad de {PUBLISHER.displayName} o de sus licenciantes y está protegido
          por las leyes de propiedad intelectual aplicables. Puedes usar el Servicio
          con fines personales y no comerciales; no puedes reproducirlo,
          redistribuirlo ni crear productos derivados de él sin nuestro permiso por
          escrito.
        </p>

        <h2>7. Enlaces de terceros y tiendas de aplicaciones</h2>
        <p>
          El Servicio enlaza a la App Store de Apple y a Google Play, y a las fuentes
          de terceros citadas en nuestro contenido. Tu uso de esas plataformas se
          rige por sus propios términos, que no controlamos.
        </p>

        <h2>8. Limitación de responsabilidad</h2>
        <p>
          En la máxima medida permitida por la ley, {PUBLISHER.displayName} no será
          responsable de daños indirectos, incidentales o consecuentes, incluidas las
          pérdidas por operaciones, derivados de tu uso del Servicio o de la
          imposibilidad de usarlo.
        </p>

        <h2>9. Entidad responsable</h2>
        <p>
          El Servicio está publicado por {PUBLISHER.displayName} ({PUBLISHER.legalName}).
        </p>

        <h2>10. Cambios en estos términos</h2>
        <p>
          Podemos actualizar estos términos de vez en cuando. El uso continuado del
          Servicio tras un cambio constituye la aceptación de los términos
          actualizados.
        </p>

        <h2>11. Contacto</h2>
        <p>
          Las preguntas sobre estos términos pueden enviarse a{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
        </p>
      </>
    ),
  },
  fr: {
    metaTitle: "Conditions d’utilisation",
    metaDescription:
      "Les conditions régissant l’utilisation de l’outil web Forex Market Hours et de ses applications mobiles.",
    breadcrumb: "Conditions d’utilisation",
    h1: "Conditions d’utilisation",
    lead: (
      <>
        Les présentes conditions régissent votre utilisation de l’outil web{" "}
        {PRODUCT.name} disponible sur {SITE_URL} et des applications iOS et Android
        qui l’accompagnent, publiées par {PUBLISHER.displayName}.
      </>
    ),
    lastUpdated: (date: string) => <>Dernière mise à jour : {date}.</>,
    body: (
      <>
        <blockquote>
          Il s’agit d’un modèle général de conditions d’utilisation destiné à
          décrire le fonctionnement réel du service. Il ne remplace pas un conseil
          juridique : faites-le relire par un conseil qualifié avant de vous y fier
          à des fins contentieuses ou de conformité.
        </blockquote>

        <h2>1. Acceptation des présentes conditions</h2>
        <p>
          En accédant à {PRODUCT.name} (le « Service ») ou en l’utilisant, vous
          acceptez les présentes conditions d’utilisation. Si vous ne les acceptez
          pas, veuillez ne pas utiliser le Service.
        </p>

        <h2>2. Description du service</h2>
        <p>
          {PRODUCT.name} est un utilitaire d’horaires de marché qui affiche les
          heures d’ouverture, de fermeture et de chevauchement des grandes séances
          de trading forex, converties dans votre fuseau horaire local, ainsi que
          des contenus informatifs associés. Le Service est fourni gratuitement et
          l’outil web ne nécessite aucun compte.
        </p>

        <h2>3. Aucun conseil financier</h2>
        <p>
          Le Service est fourni à des fins d’information générale uniquement. Il ne
          constitue ni un conseil financier, d’investissement, de trading, fiscal ou
          juridique, et rien dans le Service ne doit être considéré comme une
          recommandation d’acheter, de vendre ou de conserver un instrument. Voir
          notre <Link href="/disclaimer">avertissement complet sur les risques</Link>.
        </p>

        <h2>4. Aucune garantie d’exactitude pour vos décisions de trading</h2>
        <p>
          Bien que nous fassions des efforts raisonnables pour maintenir l’exactitude
          des horaires de séance et des contenus associés (voir notre{" "}
          <Link href="/methodology">méthodologie</Link> et notre{" "}
          <Link href="/editorial-policy">politique éditoriale</Link>), le Service est
          fourni « en l’état » et « selon disponibilité », sans garantie d’aucune
          sorte, expresse ou implicite, y compris quant à l’exactitude, à
          l’exhaustivité ou à l’adéquation à un usage particulier. Il vous appartient
          de vérifier de manière indépendante toute information sensible au temps
          avant d’agir en conséquence.
        </p>

        <h2>5. Utilisation acceptable</h2>
        <p>
          Vous vous engagez à ne pas détourner l’usage du Service, notamment en
          tentant de le perturber, en l’extrayant à un rythme disproportionné, en
          procédant à une ingénierie inverse de l’application au-delà de ce que la
          loi applicable autorise, ou en l’utilisant à des fins illicites.
        </p>

        <h2>6. Propriété intellectuelle</h2>
        <p>
          Le Service, y compris son design, ses textes, ses graphismes et son code
          sous-jacent, appartient à {PUBLISHER.displayName} ou à ses concédants de
          licence et est protégé par les lois applicables en matière de propriété
          intellectuelle. Vous pouvez utiliser le Service à des fins personnelles et
          non commerciales ; vous ne pouvez ni le reproduire, ni le redistribuer, ni
          en tirer des produits dérivés sans notre autorisation écrite.
        </p>

        <h2>7. Liens tiers et boutiques d’applications</h2>
        <p>
          Le Service renvoie vers l’App Store d’Apple et Google Play, ainsi que vers
          les sources tierces citées dans nos contenus. Votre utilisation de ces
          plateformes est régie par leurs propres conditions, que nous ne
          contrôlons pas.
        </p>

        <h2>8. Limitation de responsabilité</h2>
        <p>
          Dans toute la mesure permise par la loi, {PUBLISHER.displayName} ne saurait
          être tenue responsable de tout dommage indirect, accessoire ou consécutif,
          y compris les pertes de trading, résultant de votre utilisation du Service
          ou de l’impossibilité de l’utiliser.
        </p>

        <h2>9. Entité éditrice</h2>
        <p>
          Le Service est publié par {PUBLISHER.displayName} ({PUBLISHER.legalName}).
        </p>

        <h2>10. Modification des présentes conditions</h2>
        <p>
          Nous pouvons mettre à jour ces conditions de temps à autre. La poursuite de
          l’utilisation du Service après une modification vaut acceptation des
          conditions mises à jour.
        </p>

        <h2>11. Contact</h2>
        <p>
          Les questions relatives aux présentes conditions peuvent être envoyées à{" "}
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
  const href = "/terms";

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

export default async function TermsPage({
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
        item: `${SITE_URL}${getPathname({ locale: l, href: "/terms" })}`,
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
