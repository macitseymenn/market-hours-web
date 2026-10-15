import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
import { Link, getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { sharedAlternates } from "@/i18n/alternates";
import { ContactForm } from "@/components/ContactForm";

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
  pt: {
    metaTitle: "Fale conosco",
    metaDescription:
      "Entre em contato com a equipe do Forex Market Hours: correções, feedback e propostas de parceria. info@forexmarkethours.app.",
    ogDescription:
      "Entre em contato com a equipe do Forex Market Hours: correções, feedback e propostas de parceria.",
    breadcrumb: "Contato",
    h1: "Fale conosco",
    lead: (
      <>
        O jeito mais rápido de falar com a equipe do {PRODUCT.name} é por e-mail,
        no endereço{" "}
        <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
      </>
    ),
    body: (
      <>
        <h2>Envie um e-mail</h2>
        <p>
          Mande sua mensagem para{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          e responderemos assim que possível.
        </p>

        <h2>Sobre o que falar com a gente</h2>
        <ul>
          <li>
            <strong>Correções</strong>: encontrou um horário de sessão incorreto,
            um link de fonte quebrado ou uma data desatualizada em um artigo? Avise
            a gente e vamos revisar (veja nossa{" "}
            <Link href="/editorial-policy">política editorial</Link>).
          </li>
          <li>
            <strong>Feedback</strong>: pedidos de recursos, relatos de bugs ou
            opiniões gerais sobre a ferramenta web ou o app.
          </li>
          <li>
            <strong>Parcerias</strong>: imprensa, colaborações ou propostas de
            integração.
          </li>
        </ul>

        <h2>Publicado por</h2>
        <p>
          O {PRODUCT.name} é publicado pela {PUBLISHER.displayName} ({PUBLISHER.legalName}),
          a empresa por trás da ferramenta web gratuita em {SITE_URL} e dos apps
          complementares para iOS e Android.
        </p>
      </>
    ),
  },
  it: {
    metaTitle: "Contattaci",
    metaDescription:
      "Contatta il team di Forex Market Hours per correzioni, feedback e proposte di collaborazione. info@forexmarkethours.app.",
    ogDescription:
      "Contatta il team di Forex Market Hours per correzioni, feedback e proposte di collaborazione.",
    breadcrumb: "Contatti",
    h1: "Contattaci",
    lead: (
      <>
        Il modo più rapido per raggiungere il team di {PRODUCT.name} è scriverci
        all’indirizzo{" "}
        <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
      </>
    ),
    body: (
      <>
        <h2>Scrivici</h2>
        <p>
          Inviaci un messaggio all’indirizzo{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          e ti risponderemo il prima possibile.
        </p>

        <h2>Per cosa contattarci</h2>
        <ul>
          <li>
            <strong>Correzioni</strong>: hai notato un orario di sessione
            inesatto, un link a una fonte non funzionante o una data non aggiornata
            in un articolo? Segnalacelo e lo verificheremo (consulta la nostra{" "}
            <Link href="/editorial-policy">politica editoriale</Link>).
          </li>
          <li>
            <strong>Feedback</strong>: richieste di nuove funzioni, segnalazioni di
            bug o impressioni generali sullo strumento web o sull’app.
          </li>
          <li>
            <strong>Collaborazioni</strong>: richieste da parte della stampa,
            proposte di collaborazione o di integrazione.
          </li>
        </ul>

        <h2>Pubblicato da</h2>
        <p>
          {PRODUCT.name} è pubblicato da {PUBLISHER.displayName} ({PUBLISHER.legalName}),
          l’azienda che sviluppa sia lo strumento web gratuito su {SITE_URL} sia le
          app per iOS e Android che lo accompagnano.
        </p>
      </>
    ),
  },
  de: {
    metaTitle: "Kontakt",
    metaDescription:
      "Kontaktieren Sie das Team von Forex Market Hours: Korrekturen, Feedback und Partnerschaftsanfragen. info@forexmarkethours.app.",
    ogDescription:
      "Kontaktieren Sie das Team von Forex Market Hours: Korrekturen, Feedback und Partnerschaftsanfragen.",
    breadcrumb: "Kontakt",
    h1: "Kontakt",
    lead: (
      <>
        Am schnellsten erreichen Sie das Team von {PRODUCT.name} per E-Mail an{" "}
        <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
      </>
    ),
    body: (
      <>
        <h2>Schreiben Sie uns</h2>
        <p>
          Senden Sie uns eine Nachricht an{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          und wir melden uns so schnell wie möglich bei Ihnen.
        </p>

        <h2>Worum es gehen kann</h2>
        <ul>
          <li>
            <strong>Korrekturen</strong>: Sie haben eine ungenaue Session-Zeit,
            einen defekten Quellenlink oder ein veraltetes Datum in einem Artikel
            entdeckt? Geben Sie uns Bescheid, und wir prüfen es (siehe unsere{" "}
            <Link href="/editorial-policy">redaktionellen Richtlinien</Link>).
          </li>
          <li>
            <strong>Feedback</strong>: Funktionswünsche, Fehlermeldungen oder
            allgemeine Anmerkungen zum Web-Tool oder zur App.
          </li>
          <li>
            <strong>Partnerschaften</strong>: Presse-, Kooperations- oder
            Integrationsanfragen.
          </li>
        </ul>

        <h2>Herausgeber</h2>
        <p>
          {PRODUCT.name} wird herausgegeben von {PUBLISHER.displayName} ({PUBLISHER.legalName}),
          dem Unternehmen hinter dem kostenlosen Web-Tool unter {SITE_URL} und den
          begleitenden Apps für iOS und Android.
        </p>
      </>
    ),
  },
  tr: {
    metaTitle: "Bize Ulaşın",
    metaDescription:
      "Forex Market Hours ekibiyle iletişime geçin: düzeltmeler, geri bildirimler ve iş birliği talepleri. info@forexmarkethours.app.",
    ogDescription:
      "Forex Market Hours ekibiyle iletişime geçin: düzeltmeler, geri bildirimler ve iş birliği talepleri.",
    breadcrumb: "İletişim",
    h1: "Bize Ulaşın",
    lead: (
      <>
        {PRODUCT.name} ekibine ulaşmanın en hızlı yolu,{" "}
        <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
        adresine e-posta göndermektir.
      </>
    ),
    body: (
      <>
        <h2>Bize e-posta gönderin</h2>
        <p>
          Mesajınızı{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          adresine gönderin, size en kısa sürede dönüş yapalım.
        </p>

        <h2>Hangi konularda bize yazabilirsiniz</h2>
        <ul>
          <li>
            <strong>Düzeltmeler</strong>: Bir makalede hatalı bir seans saati,
            çalışmayan bir kaynak bağlantısı veya güncelliğini yitirmiş bir tarih mi
            fark ettiniz? Bize bildirin, inceleyelim (bkz.{" "}
            <Link href="/editorial-policy">yayın ilkelerimiz</Link>).
          </li>
          <li>
            <strong>Geri bildirim</strong>: Web aracı veya uygulamayla ilgili özellik
            talepleri, hata bildirimleri ya da genel görüşleriniz.
          </li>
          <li>
            <strong>İş birlikleri</strong>: Basın, iş birliği veya entegrasyon
            talepleri.
          </li>
        </ul>

        <h2>Yayıncı</h2>
        <p>
          {PRODUCT.name}, hem {SITE_URL} adresindeki ücretsiz web aracının hem de ona
          eşlik eden iOS ve Android uygulamalarının arkasındaki şirket olan{" "}
          {PUBLISHER.displayName} ({PUBLISHER.legalName}) tarafından yayımlanır.
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

      <ContactForm />

      <div className="article-prose mt-8">{c.body}</div>
    </article>
  );
}
