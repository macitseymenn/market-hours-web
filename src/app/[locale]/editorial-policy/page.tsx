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
  pt: {
    metaTitle: "Padrões Editoriais e Política de Precisão",
    metaDescription:
      "Como pesquisamos, citamos fontes e revisamos o conteúdo sobre horários do forex: nossos padrões editoriais de precisão, correções e não aconselhamento.",
    breadcrumb: "Política editorial",
    h1: "Padrões Editoriais e Política de Precisão",
    lead: (
      <>
        Forex é um assunto em que a precisão importa. Esta página explica como
        pesquisamos, escrevemos e corrigimos o conteúdo do {PRODUCT.name}, e o que
        deliberadamente não fazemos.
      </>
    ),
    body: (
      <>
        <h2>Como pesquisamos e escolhemos as fontes</h2>
        <p>
          Nossos artigos e páginas de referência são construídos a partir de
          fontes primárias e oficiais sempre que possível: publicações de bancos
          centrais e autoridades monetárias, a{" "}
          <a href="https://www.bis.org/statistics/rpfx22.htm" target="_blank" rel="noopener noreferrer">
            Pesquisa Trienal dos Bancos Centrais do Banco de Compensações Internacionais
          </a>{" "}
          sobre o giro global do mercado de câmbio, orientações oficiais de
          governos, como as{" "}
          <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
            páginas do governo britânico sobre a mudança de horário
          </a>
          , e o{" "}
          <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
            banco de dados de fusos horários da IANA
          </a>{" "}
          que também alimenta a própria ferramenta. Quando citamos um número ou uma
          afirmação, colocamos o link para a fonte em vez de apresentá-lo como um
          fato sem atribuição.
        </p>

        <h2>Como revisamos a precisão</h2>
        <p>
          Antes da publicação, o conteúdo sobre horários de sessão é conferido com
          os mesmos dados de fuso horário que a nossa ferramenta ao vivo usa (veja
          nossa <Link href="/methodology">página de metodologia</Link>), para que
          os guias escritos e o relógio interativo nunca se contradigam. O
          conteúdo é revisado periodicamente, à medida que as datas de mudança de
          horário e as convenções de mercado são confirmadas a cada ano.
        </p>

        <h2>Supervisão editorial</h2>
        <p>
          A responsabilidade editorial pelo {PRODUCT.name} é da equipe da{" "}
          {PUBLISHER.displayName}, a empresa de software que desenvolve e mantém a
          ferramenta. Veja nossa <Link href="/about">página Sobre</Link>. A mesma
          equipe escreve os guias e mantém a ferramenta ao vivo, então os dados por
          trás de um artigo e as palavras que os descrevem são verificados juntos,
          e não de forma isolada. Quando um editor real e identificado assinar um
          artigo, o perfil e a trajetória dele estarão linkados na assinatura.
        </p>

        <h2>Correções</h2>
        <p>
          Se encontrarmos uma imprecisão, ou se alguém nos avisar de uma, nós a
          corrigimos e, em mudanças substanciais, atualizamos a data de “última
          atualização” do artigo. Preferimos corrigir um erro rapidamente a deixá-lo
          no ar só para manter as aparências.
        </p>

        <h2>O que não fazemos</h2>
        <p>
          O {PRODUCT.name} não oferece aconselhamento financeiro, sinais de trading
          nem recomendações de compra ou venda de nenhum tipo, e nenhum conteúdo
          nosso deve ser lido como sugestão para negociar um instrumento específico
          em um momento específico. Publicamos informações gerais e educativas
          sobre como funcionam as sessões do forex e seus horários. Veja nosso{" "}
          <Link href="/disclaimer">aviso completo sobre riscos e trading</Link>.
        </p>

        <h2>Informe uma imprecisão</h2>
        <p>
          Viu algo errado, um horário de sessão, um link de fonte, uma data? Conte
          para a gente em{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          e vamos verificar.
        </p>
      </>
    ),
  },
  it: {
    metaTitle: "Standard editoriali e politica di accuratezza",
    metaDescription:
      "Come ricerchiamo, documentiamo e revisioniamo i contenuti sugli orari del mercato forex: i nostri standard di accuratezza, correzione e assenza di consulenza.",
    breadcrumb: "Politica editoriale",
    h1: "Standard editoriali e politica di accuratezza",
    lead: (
      <>
        Il forex è un argomento in cui l’accuratezza conta. Questa pagina spiega
        come ricerchiamo, scriviamo e correggiamo i contenuti di {PRODUCT.name}, e
        cosa scegliamo deliberatamente di non fare.
      </>
    ),
    body: (
      <>
        <h2>Come ricerchiamo e documentiamo i contenuti</h2>
        <p>
          I nostri articoli e le pagine di riferimento si basano, ogni volta che è
          possibile, su fonti primarie e ufficiali: pubblicazioni delle banche
          centrali e delle autorità monetarie, la{" "}
          <a href="https://www.bis.org/statistics/rpfx22.htm" target="_blank" rel="noopener noreferrer">
            Triennial Central Bank Survey della Banca dei Regolamenti Internazionali
          </a>{" "}
          sul volume globale degli scambi valutari, indicazioni governative
          ufficiali come le{" "}
          <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
            pagine britanniche sul cambio dell’ora
          </a>
          , e il{" "}
          <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
            database dei fusi orari IANA
          </a>{" "}
          su cui si basa anche lo strumento stesso. Quando citiamo un dato o
          un’affermazione, rimandiamo alla fonte invece di riportarlo come un fatto
          senza attribuzione.
        </p>

        <h2>Come verifichiamo l’accuratezza</h2>
        <p>
          Prima della pubblicazione, i contenuti sugli orari delle sessioni vengono
          confrontati con gli stessi dati sui fusi orari usati dal nostro strumento
          in tempo reale (consulta la nostra{" "}
          <Link href="/methodology">pagina sulla metodologia</Link>), così le guide
          scritte e l’orologio interattivo non si contraddicono mai. I contenuti
          vengono ricontrollati periodicamente, man mano che ogni anno vengono
          confermate le date del cambio dell’ora e le convenzioni di mercato.
        </p>

        <h2>Supervisione editoriale</h2>
        <p>
          La responsabilità editoriale di {PRODUCT.name} spetta al team di{" "}
          {PUBLISHER.displayName}, la software house che sviluppa e gestisce lo
          strumento. Consulta la nostra <Link href="/about">pagina Chi siamo</Link>.
          Lo stesso team scrive le guide e gestisce lo strumento in tempo reale,
          quindi i dati alla base di un articolo e le parole che li descrivono
          vengono verificati insieme e non separatamente. Quando un articolo sarà
          firmato da un editor reale con nome e cognome, il suo profilo e il suo
          percorso saranno collegati dalla firma.
        </p>

        <h2>Correzioni</h2>
        <p>
          Se troviamo un’inesattezza, o se qualcuno ce la segnala, la correggiamo e,
          in caso di modifiche sostanziali, aggiorniamo la data di «ultimo
          aggiornamento» dell’articolo. Preferiamo correggere in fretta un errore
          piuttosto che lasciarlo online per salvare le apparenze.
        </p>

        <h2>Cosa non facciamo</h2>
        <p>
          {PRODUCT.name} non fornisce consulenza finanziaria, segnali di trading né
          raccomandazioni di acquisto o vendita di alcun tipo, e nessuno dei nostri
          contenuti va letto come un suggerimento a negoziare uno strumento
          specifico in un momento specifico. Pubblichiamo informazioni generali e
          didattiche su come funzionano le sessioni forex e i loro orari. Consulta
          le nostre{" "}
          <Link href="/disclaimer">avvertenze complete su rischi e trading</Link>.
        </p>

        <h2>Segnala un’inesattezza</h2>
        <p>
          Hai notato qualcosa di sbagliato, un orario di sessione, un link a una
          fonte, una data? Scrivici all’indirizzo{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          e lo verificheremo.
        </p>
      </>
    ),
  },
  de: {
    metaTitle: "Redaktionelle Standards und Richtlinie zur Genauigkeit",
    metaDescription:
      "Wie wir Inhalte zu Forex-Handelszeiten recherchieren, belegen und prüfen: unsere Standards für Genauigkeit, Korrekturen und den Verzicht auf Beratung.",
    breadcrumb: "Redaktionelle Richtlinien",
    h1: "Redaktionelle Standards und Richtlinie zur Genauigkeit",
    lead: (
      <>
        Beim Thema Forex kommt es auf Genauigkeit an. Diese Seite erklärt, wie
        wir die Inhalte auf {PRODUCT.name} recherchieren, schreiben und
        korrigieren, und was wir bewusst nicht tun.
      </>
    ),
    body: (
      <>
        <h2>Wie wir Inhalte recherchieren und belegen</h2>
        <p>
          Unsere Artikel und Referenzseiten stützen sich wo immer möglich auf
          Primärquellen und offizielle Quellen: Veröffentlichungen von
          Zentralbanken und Währungsbehörden, den{" "}
          <a href="https://www.bis.org/statistics/rpfx22.htm" target="_blank" rel="noopener noreferrer">
            Triennial Central Bank Survey der Bank für Internationalen Zahlungsausgleich
          </a>{" "}
          zum weltweiten Devisenumsatz, offizielle Regierungsinformationen wie die
          britischen{" "}
          <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
            Seiten zur Zeitumstellung
          </a>
          {" "}sowie die{" "}
          <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
            IANA Time Zone Database
          </a>
          , auf der auch das Tool selbst basiert. Wenn wir eine Zahl oder
          Aussage anführen, verlinken wir die Quelle, statt sie als Tatsache ohne
          Herkunftsangabe wiederzugeben.
        </p>

        <h2>Wie wir die Genauigkeit prüfen</h2>
        <p>
          Vor der Veröffentlichung werden Inhalte zu Session-Zeiten mit denselben
          Zeitzonendaten abgeglichen, die auch unser Live-Tool verwendet (siehe
          unsere <Link href="/methodology">Methodik-Seite</Link>). So
          widersprechen sich die schriftlichen Ratgeber und die interaktive Uhr
          nie. Die Inhalte werden regelmäßig erneut geprüft, sobald die Termine
          der Zeitumstellung und die Marktkonventionen jedes Jahr bestätigt sind.
        </p>

        <h2>Redaktionelle Verantwortung</h2>
        <p>
          Die redaktionelle Verantwortung für {PRODUCT.name} liegt beim Team von{" "}
          {PUBLISHER.displayName}, dem Softwareunternehmen, das das Tool
          entwickelt und pflegt. Siehe unsere{" "}
          <Link href="/about">Über-uns-Seite</Link>. Dasselbe Team schreibt die
          Ratgeber und pflegt das Live-Tool, sodass die Daten hinter einem Artikel
          und die Worte, die sie beschreiben, gemeinsam statt getrennt geprüft
          werden. Wird ein Artikel einem namentlich genannten Redakteur
          zugeschrieben, sind dessen Profil und Werdegang über die Autorenzeile
          verlinkt.
        </p>

        <h2>Korrekturen</h2>
        <p>
          Wenn wir selbst eine Ungenauigkeit finden oder darauf hingewiesen
          werden, korrigieren wir sie und aktualisieren bei wesentlichen
          Änderungen das Datum „Zuletzt aktualisiert“ des Artikels. Wir beheben
          einen Fehler lieber schnell, als ihn des Anscheins wegen online zu
          lassen.
        </p>

        <h2>Was wir nicht tun</h2>
        <p>
          {PRODUCT.name} bietet keine Finanzberatung, keine Handelssignale und
          keinerlei Kauf- oder Verkaufsempfehlungen, und keiner unserer Inhalte
          sollte als Anregung verstanden werden, ein bestimmtes Instrument zu
          einem bestimmten Zeitpunkt zu handeln. Wir veröffentlichen allgemeine,
          lehrreiche Informationen darüber, wie Forex-Sessions und ihre Zeiten
          funktionieren. Siehe unseren vollständigen{" "}
          <Link href="/disclaimer">Risiko- und Handelshinweis</Link>.
        </p>

        <h2>Ungenauigkeit melden</h2>
        <p>
          Haben Sie einen Fehler entdeckt, etwa eine Session-Zeit, einen
          Quellenlink oder ein Datum? Schreiben Sie uns an{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          und wir sehen uns das an.
        </p>
      </>
    ),
  },
  tr: {
    metaTitle: "Yayın Standartları ve Doğruluk Politikası",
    metaDescription:
      "Forex piyasa saatleri içeriğini nasıl araştırdığımız, kaynaklandırdığımız ve incelediğimiz: doğruluk, düzeltme ve tavsiye vermeme ilkelerimiz.",
    breadcrumb: "Yayın İlkeleri",
    h1: "Yayın Standartları ve Doğruluk Politikası",
    lead: (
      <>
        Forex, doğruluğun önemli olduğu bir konudur. Bu sayfa, {PRODUCT.name}{" "}
        üzerindeki içeriği nasıl araştırdığımızı, yazdığımızı ve düzelttiğimizi,
        bilinçli olarak neleri yapmadığımızı açıklar.
      </>
    ),
    body: (
      <>
        <h2>İçeriği nasıl araştırıyor ve kaynaklandırıyoruz</h2>
        <p>
          Makalelerimiz ve başvuru sayfalarımız, mümkün olan her durumda birincil ve
          resmi kaynaklara dayanır: merkez bankalarının ve para otoritelerinin
          yayınları, küresel döviz işlem hacmine ilişkin{" "}
          <a href="https://www.bis.org/statistics/rpfx22.htm" target="_blank" rel="noopener noreferrer">
            Uluslararası Ödemeler Bankası Üç Yıllık Merkez Bankası Anketi
          </a>
          , Birleşik Krallık’ın{" "}
          <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
            saat değişikliği sayfaları
          </a>{" "}
          gibi resmi hükümet bilgilendirmeleri ve aracın kendisine de güç veren{" "}
          <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
            IANA Saat Dilimi Veritabanı
          </a>
          . Bir rakam veya iddiaya atıf yaptığımızda, onu kaynağı belirtilmemiş bir
          gerçek gibi yeniden ifade etmek yerine kaynağa bağlantı veririz.
        </p>

        <h2>Doğruluğu nasıl inceliyoruz</h2>
        <p>
          Seans saatleriyle ilgili içerik, yayımlanmadan önce canlı aracımızın
          kullandığı saat dilimi verileriyle karşılaştırılarak kontrol edilir (bkz.{" "}
          <Link href="/methodology">metodoloji sayfamız</Link>); böylece yazılı
          rehberler ile etkileşimli saat hiçbir zaman birbiriyle çelişmez. Saat
          değişikliği tarihleri ve piyasa teamülleri her yıl teyit edildikçe içerik
          düzenli aralıklarla yeniden kontrol edilir.
        </p>

        <h2>Yayın denetimi</h2>
        <p>
          {PRODUCT.name} için yayın sorumluluğu, aracı geliştiren ve sürdüren
          yazılım şirketi {PUBLISHER.displayName} ekibine aittir. Bkz.{" "}
          <Link href="/about">Hakkımızda sayfası</Link>. Rehberleri yazan ve canlı
          aracı sürdüren aynı ekip olduğundan, bir makalenin arkasındaki veriler ile
          onu anlatan ifadeler ayrı ayrı değil, birlikte kontrol edilir. Bir
          makalede gerçek ve adı belirtilen bir editöre yer verildiğinde, editörün
          profili ve geçmişi yazar satırından bağlantıyla verilecektir.
        </p>

        <h2>Düzeltmeler</h2>
        <p>
          Bir hata tespit ettiğimizde veya bize bildirildiğinde onu düzeltiriz ve
          esaslı değişikliklerde makalenin “son güncelleme” tarihini yeniliriz. Bir
          hatayı görüntü kurtarmak adına yayında bırakmaktansa hızla düzeltmeyi
          tercih ederiz.
        </p>

        <h2>Neleri yapmıyoruz</h2>
        <p>
          {PRODUCT.name} hiçbir şekilde finansal tavsiye, işlem sinyali veya
          alım/satım önerisi sunmaz ve içeriklerimizin hiçbiri belirli bir aracı
          belirli bir zamanda işlem yapma önerisi olarak okunmamalıdır. Forex
          seanslarının ve saatlerinin nasıl işlediğine dair genel, eğitim amaçlı
          bilgiler yayımlarız. Ayrıntılar için{" "}
          <Link href="/disclaimer">risk ve işlem sorumluluk reddi</Link> metninin
          tamamına bakın.
        </p>

        <h2>Bir hatayı bildirin</h2>
        <p>
          Bir seans saati, bir kaynak bağlantısı ya da bir tarih gibi yanlış bir şey
          mi fark ettiniz? Bunu{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          adresinden bize bildirin, inceleyelim.
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
