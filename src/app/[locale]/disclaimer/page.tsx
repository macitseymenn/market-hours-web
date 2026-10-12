import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PRODUCT, SITE_URL } from "@/lib/site";
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
  fr: {
    metaTitle: "Avertissement sur les risques et le trading",
    metaDescription:
      "Forex Market Hours est uniquement un outil d’horaires de marché : ni conseil financier, ni courtier. Lisez notre avertissement complet sur les risques.",
    ogDescription:
      "Forex Market Hours est uniquement un outil d’horaires de marché : ni conseil financier, ni courtier.",
    breadcrumb: "Avertissement",
    h1: "Avertissement sur les risques et le trading",
    body: (
      <>
        <h2>Aucun conseil financier</h2>
        <p>
          Rien sur {PRODUCT.name}, ni l’outil web, ni l’application mobile, ni le
          blog, ni aucune autre page de ce site, ne constitue un conseil financier,
          d’investissement, de trading, fiscal ou juridique. Nous ne recommandons ni
          d’acheter, ni de vendre, ni de conserver une devise, un titre ou tout
          autre instrument financier. Toute décision de trading n’appartient qu’à
          vous, et il convient de consulter un conseil indépendant et agréé avant
          de la prendre.
        </p>

        <h2>Nous ne sommes pas un courtier</h2>
        <p>
          {PRODUCT.name} est un utilitaire d’horaires de marché. Il n’exécute aucun
          ordre, ne détient aucun fonds de client et ne propose aucun service de
          dépôt ou de retrait. Nous ne sommes ni courtier, ni place de marché, ni
          prestataire de paiement, et nous ne vous demandons jamais les identifiants
          de votre compte de trading ni vos fonds.
        </p>

        <h2>Le trading sur devises comporte des risques</h2>
        <p>
          Le trading sur le marché des changes comporte un risque de perte
          important et ne convient pas à tous les investisseurs. Les performances
          passées d’un marché ou d’une stratégie ne préjugent pas des résultats
          futurs. Si vous choisissez de trader, faites-le uniquement auprès d’un
          courtier dûment réglementé et uniquement avec de l’argent que vous pouvez
          vous permettre de perdre.
        </p>

        <h2>Les horaires des séances sont indicatifs</h2>
        <p>
          Les horaires de séance affichés par {PRODUCT.name} sont calculés à partir
          des règles de fuseau horaire de chaque place financière et suivent
          automatiquement les changements d’heure saisonniers. Voir notre{" "}
          <Link href="/methodology">méthodologie</Link> pour le détail. Ils sont
          fournis à titre d’orientation générale, correspondent à une journée de
          trading normale et excluent les jours fériés de marché et les fermetures
          imprévues. Vérifiez toujours les horaires exacts auprès de votre courtier
          ou de votre place de marché avant de vous y fier pour une décision de
          trading.
        </p>

        <h2>Questions</h2>
        <p>
          Si quelque chose ici n’est pas clair, écrivez-nous à{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
        </p>
      </>
    ),
  },
  pt: {
    metaTitle: "Aviso sobre Riscos e Trading",
    metaDescription:
      "O Forex Market Hours é apenas uma ferramenta de horários de mercado, não é aconselhamento financeiro nem corretora. Leia nosso aviso completo sobre riscos e trading.",
    ogDescription:
      "O Forex Market Hours é apenas uma ferramenta de horários de mercado, não é aconselhamento financeiro nem corretora.",
    breadcrumb: "Aviso legal",
    h1: "Aviso sobre Riscos e Trading",
    body: (
      <>
        <h2>Não é aconselhamento financeiro</h2>
        <p>
          Nada no {PRODUCT.name}, incluindo a ferramenta web, o app para celular, o
          blog ou qualquer outra página deste site, constitui aconselhamento
          financeiro, de investimentos, de trading, tributário ou jurídico. Não
          recomendamos comprar, vender ou manter qualquer moeda, título ou outro
          instrumento financeiro. Qualquer decisão de operar é exclusivamente sua,
          e você deve buscar orientação independente e de um profissional
          habilitado antes de tomá-la.
        </p>

        <h2>Não somos uma corretora</h2>
        <p>
          O {PRODUCT.name} é um utilitário de horários de mercado. Ele não executa
          operações, não mantém recursos de clientes e não oferece nenhum serviço
          de depósito ou saque. Não somos corretora, bolsa nem provedor de
          pagamentos, e nunca pedimos as credenciais da sua conta de trading nem o
          seu dinheiro.
        </p>

        <h2>Operar no mercado de câmbio envolve riscos</h2>
        <p>
          A negociação de moedas envolve risco substancial de perda e não é
          adequada para todos os investidores. O desempenho passado de qualquer
          mercado ou estratégia não é garantia de resultados futuros. Se decidir
          operar, faça isso apenas por meio de uma corretora devidamente
          regulamentada e somente com dinheiro que você pode se dar ao luxo de
          perder.
        </p>

        <h2>Os horários das sessões são indicativos</h2>
        <p>
          Os horários de sessão exibidos pelo {PRODUCT.name} são calculados a
          partir das regras de fuso horário de cada centro financeiro e acompanham
          automaticamente as mudanças do horário de verão. Veja nossa{" "}
          <Link href="/methodology">metodologia</Link> para entender como. Eles são
          fornecidos como orientação geral, refletem um dia normal de negociação e
          não consideram feriados de mercado nem fechamentos não programados.
          Sempre confirme os horários exatos com a sua corretora ou bolsa antes de
          se basear neles para uma decisão de trading.
        </p>

        <h2>Dúvidas</h2>
        <p>
          Se algo aqui não estiver claro, fale conosco em{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
        </p>
      </>
    ),
  },
  it: {
    metaTitle: "Avvertenze su rischi e trading",
    metaDescription:
      "Forex Market Hours è solo uno strumento per gli orari di mercato: non è consulenza finanziaria né un broker. Leggi le nostre avvertenze complete su rischi e trading.",
    ogDescription:
      "Forex Market Hours è solo uno strumento per gli orari di mercato: non è consulenza finanziaria né un broker.",
    breadcrumb: "Avvertenze",
    h1: "Avvertenze su rischi e trading",
    body: (
      <>
        <h2>Non è consulenza finanziaria</h2>
        <p>
          Nulla di quanto presente su {PRODUCT.name}, compresi lo strumento web,
          l’app mobile, il blog o qualsiasi altra pagina di questo sito, costituisce
          una consulenza finanziaria, d’investimento, di trading, fiscale o legale.
          Non raccomandiamo di acquistare, vendere o detenere alcuna valuta, titolo
          o altro strumento finanziario. Qualsiasi decisione di fare trading spetta
          esclusivamente a te, e prima di prenderla dovresti rivolgerti a un
          consulente indipendente e abilitato.
        </p>

        <h2>Non siamo un broker</h2>
        <p>
          {PRODUCT.name} è un’utility per gli orari di mercato. Non esegue
          operazioni, non detiene fondi dei clienti e non offre alcun servizio di
          deposito o prelievo. Non siamo un broker, una borsa né un fornitore di
          servizi di pagamento, e non ti chiederemo mai le credenziali del tuo conto
          di trading né i tuoi fondi.
        </p>

        <h2>Il trading sul mercato dei cambi comporta rischi</h2>
        <p>
          Il trading sul mercato dei cambi comporta un rischio di perdita
          considerevole e non è adatto a tutti gli investitori. I rendimenti passati
          di qualsiasi mercato o strategia non sono indicativi dei risultati futuri.
          Se scegli di fare trading, fallo solo tramite un broker regolarmente
          autorizzato e solo con denaro che puoi permetterti di perdere.
        </p>

        <h2>Gli orari delle sessioni sono indicativi</h2>
        <p>
          Gli orari delle sessioni mostrati da {PRODUCT.name} vengono calcolati in
          base alle regole del fuso orario di ciascun centro finanziario e seguono
          automaticamente i cambi dell’ora legale. Consulta la nostra{" "}
          <Link href="/methodology">metodologia</Link> per i dettagli. Sono forniti
          come orientamento generale, si riferiscono a una normale giornata di
          trading ed escludono le festività di mercato e le chiusure non
          programmate. Verifica sempre gli orari esatti con il tuo broker o con la
          borsa prima di basarti su di essi per una decisione di trading.
        </p>

        <h2>Domande</h2>
        <p>
          Se qualcosa non ti è chiaro, scrivici all’indirizzo{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
        </p>
      </>
    ),
  },
  de: {
    metaTitle: "Risiko- und Handelshinweis",
    metaDescription:
      "Forex Market Hours ist ausschließlich ein Tool für Handelszeiten, keine Finanzberatung und kein Broker. Lesen Sie unseren vollständigen Risikohinweis.",
    ogDescription:
      "Forex Market Hours ist ausschließlich ein Tool für Handelszeiten, keine Finanzberatung und kein Broker.",
    breadcrumb: "Haftungsausschluss",
    h1: "Risiko- und Handelshinweis",
    body: (
      <>
        <h2>Keine Finanzberatung</h2>
        <p>
          Nichts auf {PRODUCT.name}, weder das Web-Tool noch die mobile App, der
          Blog oder eine andere Seite dieser Website, stellt eine Finanz-,
          Anlage-, Handels-, Steuer- oder Rechtsberatung dar. Wir empfehlen weder
          den Kauf noch den Verkauf oder das Halten einer Währung, eines
          Wertpapiers oder eines anderen Finanzinstruments. Jede
          Handelsentscheidung liegt allein bei Ihnen, und Sie sollten vorher eine
          unabhängige, zugelassene Beratung einholen.
        </p>

        <h2>Kein Broker</h2>
        <p>
          {PRODUCT.name} ist ein Tool für Handelszeiten. Es führt keine Trades
          aus, verwahrt keine Kundengelder und bietet keine Einzahlungs- oder
          Auszahlungsdienste an. Wir sind kein Broker, keine Börse und kein
          Zahlungsdienstleister, und wir fragen niemals nach den Zugangsdaten Ihres
          Handelskontos oder nach Ihrem Geld.
        </p>

        <h2>Devisenhandel ist mit Risiken verbunden</h2>
        <p>
          Der Devisenhandel birgt ein erhebliches Verlustrisiko und ist nicht für
          jeden Anleger geeignet. Die vergangene Wertentwicklung eines Marktes
          oder einer Strategie ist kein Hinweis auf künftige Ergebnisse. Wenn Sie
          sich für den Handel entscheiden, tun Sie dies nur über einen
          ordnungsgemäß regulierten Broker und nur mit Geld, dessen Verlust Sie
          sich leisten können.
        </p>

        <h2>Session-Zeiten sind Richtwerte</h2>
        <p>
          Die von {PRODUCT.name} angezeigten Session-Zeiten werden aus den
          Zeitzonenregeln des jeweiligen Finanzplatzes berechnet und folgen
          Umstellungen auf die Sommerzeit automatisch. Wie das funktioniert,
          erklärt unsere <Link href="/methodology">Methodik</Link>. Sie dienen der
          allgemeinen Orientierung, beziehen sich auf einen normalen Handelstag und
          berücksichtigen keine Börsenfeiertage und keine außerplanmäßigen
          Schließungen. Prüfen Sie die genauen Zeiten immer bei Ihrem Broker oder
          Ihrer Börse, bevor Sie sich bei einer Handelsentscheidung darauf
          verlassen.
        </p>

        <h2>Fragen</h2>
        <p>
          Wenn hier etwas unklar ist, kontaktieren Sie uns unter{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
        </p>
      </>
    ),
  },
  tr: {
    metaTitle: "Risk ve İşlem Sorumluluk Reddi",
    metaDescription:
      "Forex Market Hours yalnızca bir piyasa saatleri aracıdır; finansal tavsiye değildir ve aracı kurum değildir. Risk ve işlem sorumluluk reddinin tamamını okuyun.",
    ogDescription:
      "Forex Market Hours yalnızca bir piyasa saatleri aracıdır; finansal tavsiye değildir ve aracı kurum değildir.",
    breadcrumb: "Sorumluluk reddi",
    h1: "Risk ve İşlem Sorumluluk Reddi",
    body: (
      <>
        <h2>Finansal tavsiye değildir</h2>
        <p>
          Web aracı, mobil uygulama, blog veya bu sitedeki diğer herhangi bir sayfa
          dahil olmak üzere, {PRODUCT.name} üzerindeki hiçbir içerik finansal,
          yatırım, işlem, vergi veya hukuki tavsiye niteliği taşımaz. Herhangi bir
          dövizin, menkul kıymetin veya başka bir finansal aracın alınmasını,
          satılmasını ya da elde tutulmasını tavsiye etmeyiz. İşlem yapma kararı
          yalnızca size aittir ve böyle bir karar vermeden önce bağımsız, lisanslı
          bir danışmandan görüş almanız gerekir.
        </p>

        <h2>Aracı kurum değildir</h2>
        <p>
          {PRODUCT.name} bir piyasa saatleri aracıdır. İşlem gerçekleştirmez,
          müşteri fonu tutmaz ve herhangi bir para yatırma veya para çekme hizmeti
          sunmaz. Aracı kurum, borsa veya ödeme hizmeti sağlayıcısı değiliz ve
          sizden asla işlem hesabı giriş bilgilerinizi ya da fonlarınızı talep
          etmeyiz.
        </p>

        <h2>Döviz işlemleri risk içerir</h2>
        <p>
          Döviz piyasasında işlem yapmak önemli ölçüde zarar riski taşır ve her
          yatırımcı için uygun değildir. Herhangi bir piyasanın veya stratejinin
          geçmiş performansı gelecekteki sonuçların göstergesi değildir. İşlem
          yapmayı seçerseniz, bunu yalnızca usulüne uygun şekilde düzenlenip
          denetlenen bir aracı kurum üzerinden ve yalnızca kaybetmeyi göze
          alabileceğiniz parayla yapın.
        </p>

        <h2>Seans saatleri gösterge niteliğindedir</h2>
        <p>
          {PRODUCT.name} tarafından gösterilen seans saatleri, her finans merkezinin
          saat dilimi kurallarından hesaplanır ve yaz saati değişikliklerini otomatik
          olarak takip eder. Nasıl hesaplandığını görmek için{" "}
          <Link href="/methodology">metodolojimize</Link> bakın. Bu saatler genel
          yönlendirme amacıyla sunulur, normal bir işlem gününü yansıtır ve piyasa
          tatillerini ve planlanmamış kapanışları kapsamaz. Bir işlem kararında bu
          saatlere güvenmeden önce kesin saatleri her zaman aracı kurumunuzdan veya
          borsanızdan teyit edin.
        </p>

        <h2>Sorular</h2>
        <p>
          Buradaki herhangi bir konu açık değilse bize{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          adresinden ulaşın.
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
      { "@type": "ListItem", position: 1, name: tc("home"), item: `${SITE_URL}/${l}` },
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
