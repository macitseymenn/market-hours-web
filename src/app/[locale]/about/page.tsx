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
  pt: {
    metaTitle: `Sobre o ${PRODUCT.name}`,
    metaDescription:
      "Quem desenvolve o Forex Market Hours, por que criamos um relógio de sessões gratuito e ao vivo, e como mantemos os horários precisos. Pela Hunters Group Software.",
    ogDescription:
      "Quem desenvolve o Forex Market Hours, por que criamos um relógio de sessões gratuito e ao vivo, e como mantemos os horários precisos.",
    breadcrumb: "Sobre",
    h1: `Sobre o ${PRODUCT.name}`,
    lead: (
      <>
        O {PRODUCT.name} é um relógio de sessões do forex gratuito e ao vivo,
        criado pela {PUBLISHER.displayName}, uma empresa de software que faz
        ferramentas pequenas e focadas, em vez de produtos financeiros amplos.
      </>
    ),
    body: (
      <>
        <h2>Quem somos</h2>
        <p>
          A {PUBLISHER.displayName} ({PUBLISHER.legalName}) é uma empresa de
          software. Desenvolvemos e mantemos o {PRODUCT.name}, a ferramenta web em{" "}
          {SITE_URL} e os apps complementares para iOS e Android, como um único
          produto focado: um utilitário de horários de mercado para quem opera ou
          acompanha o mercado de câmbio. Não somos um banco, uma corretora nem uma
          empresa de investimentos.
        </p>

        <h2>Por que criamos esta ferramenta</h2>
        <p>
          O trading no forex funciona 24 horas por dia, cinco dias por semana,
          dividido em sessões regionais em Sydney, Tóquio, Frankfurt, Londres e
          Nova York. Descobrir qual dessas sessões está aberta agora, no seu
          próprio fuso horário, normalmente exigia converter o GMT na mão e
          conferir tudo de novo sempre que um país mudava os relógios por causa do
          horário de verão. Criamos o {PRODUCT.name} para que essa conversão
          aconteça automaticamente, o tempo todo, de graça.
        </p>
        <p>
          É um problema que vivemos na pele: como uma pequena equipe de software
          que também acompanha os mercados, estávamos cansados de fazer contas de
          GMT de cabeça e de ficar na dúvida se Londres já tinha mudado para o
          horário de verão. A ferramenta nasceu como o utilitário que queríamos
          para nós mesmos, e ainda a usamos em todos os dias de negociação, que é o
          jeito mais rápido de percebermos quando algo parece errado.
        </p>

        <h2>O que o Forex Market Hours é, e o que não é</h2>
        <p>
          O {PRODUCT.name} é um utilitário de horários de mercado. Ele mostra quando
          as principais sessões do forex abrem, fecham e se sobrepõem, convertidas
          para o seu fuso horário local. Ele <strong>não</strong> é uma corretora,
          um consultor financeiro nem um serviço de sinais, e não oferece serviços
          de negociação, depósito ou saque. Nada neste site é aconselhamento
          financeiro personalizado; veja nosso{" "}
          <Link href="/disclaimer">aviso sobre riscos e trading</Link> para todos
          os detalhes.
        </p>

        <h2>Como mantemos a precisão</h2>
        <p>
          Cada horário de sessão é calculado a partir das regras de fuso horário
          de cada centro financeiro, e não de uma tabela fixa, então as mudanças
          do horário de verão são aplicadas automaticamente. Explicamos exatamente
          como isso funciona, e as fontes em que nos baseamos, na nossa{" "}
          <Link href="/methodology">página de metodologia</Link>. A forma como
          pesquisamos, revisamos e corrigimos nosso conteúdo escrito está descrita
          na nossa <Link href="/editorial-policy">política editorial</Link>.
        </p>

        <h2>A ferramenta web e o app gratuitos</h2>
        <p>
          A ferramenta web em {SITE_URL} roda inteiramente no seu navegador, sem
          cadastro e sem anúncios. Ela vem acompanhada de um app gratuito para iOS
          e Android que acrescenta widgets para a Tela de Início, um calendário
          econômico e alertas de sessão, para quem quer o mesmo relógio ao vivo sem
          precisar deixar uma aba do navegador aberta.
        </p>

        <h2>Fale com a gente</h2>
        <p>
          Dúvidas, correções ou propostas de parceria são bem-vindas em{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>
          , ou acesse nossa <Link href="/contact">página de contato</Link>.
        </p>
      </>
    ),
  },
  it: {
    metaTitle: `Chi siamo: ${PRODUCT.name}`,
    metaDescription:
      "Chi sviluppa Forex Market Hours, perché abbiamo creato un orologio delle sessioni gratuito e in tempo reale e come manteniamo esatti gli orari. Di Hunters Group Software.",
    ogDescription:
      "Chi sviluppa Forex Market Hours, perché abbiamo creato un orologio delle sessioni gratuito e in tempo reale e come manteniamo esatti gli orari.",
    breadcrumb: "Chi siamo",
    h1: `Chi siamo: ${PRODUCT.name}`,
    lead: (
      <>
        {PRODUCT.name} è un orologio delle sessioni forex gratuito e in tempo
        reale, sviluppato da {PUBLISHER.displayName}, una software house che crea
        strumenti piccoli e mirati anziché ampi prodotti finanziari.
      </>
    ),
    body: (
      <>
        <h2>Chi siamo</h2>
        <p>
          {PUBLISHER.displayName} ({PUBLISHER.legalName}) è una software house.
          Sviluppiamo e manteniamo {PRODUCT.name}, lo strumento web su{" "}
          {SITE_URL} e le app per iOS e Android che lo accompagnano, come un unico
          prodotto mirato: un’utility per gli orari di mercato pensata per chi fa
          trading o segue il mercato dei cambi. Non siamo una banca, un broker né
          una società di investimento.
        </p>

        <h2>Perché l’abbiamo creato</h2>
        <p>
          Il trading sul forex è attivo 24 ore su 24, cinque giorni alla settimana,
          suddiviso nelle sessioni regionali di Sydney, Tokyo, Francoforte, Londra e
          New York. Capire quale di queste sessioni è aperta in questo momento, nel
          tuo fuso orario, di solito significava convertire il GMT a mano e
          ricontrollare tutto ogni volta che un Paese spostava le lancette per
          l’ora legale. Abbiamo creato {PRODUCT.name} perché quella conversione
          avvenga in automatico, sempre e gratis.
        </p>
        <p>
          È un problema che abbiamo vissuto in prima persona: come piccolo team di
          sviluppo che segue a sua volta i mercati, eravamo stanchi di fare calcoli
          sul GMT a mente e di chiederci se Londra fosse già passata all’ora
          legale. Lo strumento è nato come l’utility che volevamo per noi stessi, e
          lo usiamo ancora ogni giorno di trading: è il modo più rapido per
          accorgerci se qualcosa non torna.
        </p>

        <h2>Cosa è Forex Market Hours, e cosa non è</h2>
        <p>
          {PRODUCT.name} è un’utility per gli orari di mercato. Mostra quando le
          principali sessioni forex aprono, chiudono e si sovrappongono, convertite
          nel tuo fuso orario locale. <strong>Non</strong> è un broker, un
          consulente finanziario né un servizio di segnali, e non offre servizi di
          trading, deposito o prelievo. Niente su questo sito costituisce una
          consulenza finanziaria personalizzata: consulta le nostre{" "}
          <Link href="/disclaimer">avvertenze su rischi e trading</Link> per tutti
          i dettagli.
        </p>

        <h2>Come garantiamo la precisione</h2>
        <p>
          Ogni orario di sessione viene calcolato in base alle regole del fuso
          orario di ciascun centro finanziario, e non da una tabella fissa, quindi i
          cambi dell’ora legale vengono applicati automaticamente. Spieghiamo nel
          dettaglio come funziona, e su quali fonti ci basiamo, nella nostra{" "}
          <Link href="/methodology">pagina sulla metodologia</Link>. Il modo in cui
          ricerchiamo, revisioniamo e correggiamo i nostri contenuti scritti è
          descritto nella nostra{" "}
          <Link href="/editorial-policy">politica editoriale</Link>.
        </p>

        <h2>Lo strumento web gratuito e l’app</h2>
        <p>
          Lo strumento web su {SITE_URL} funziona interamente nel tuo browser, senza
          registrazione e senza pubblicità. È affiancato da un’app gratuita per iOS
          e Android che aggiunge widget per la schermata Home, un calendario
          economico e avvisi di sessione, per chi vuole lo stesso orologio in tempo
          reale senza tenere aperta una scheda del browser.
        </p>

        <h2>Contattaci</h2>
        <p>
          Domande, correzioni o proposte di collaborazione sono benvenute
          all’indirizzo{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>
          , oppure visita la nostra <Link href="/contact">pagina dei contatti</Link>.
        </p>
      </>
    ),
  },
  de: {
    metaTitle: `Über ${PRODUCT.name}`,
    metaDescription:
      "Wer Forex Market Hours entwickelt, warum wir eine kostenlose Live-Sessionuhr gebaut haben und wie wir die Zeiten genau halten. Von Hunters Group Software.",
    ogDescription:
      "Wer Forex Market Hours entwickelt, warum wir eine kostenlose Live-Sessionuhr gebaut haben und wie wir die Session-Zeiten genau halten.",
    breadcrumb: "Über uns",
    h1: `Über ${PRODUCT.name}`,
    lead: (
      <>
        {PRODUCT.name} ist eine kostenlose Live-Uhr für die Forex-Sessions,
        entwickelt von {PUBLISHER.displayName}, einem Softwareunternehmen, das
        kleine, fokussierte Tools statt breit angelegter Finanzprodukte baut.
      </>
    ),
    body: (
      <>
        <h2>Wer wir sind</h2>
        <p>
          {PUBLISHER.displayName} ({PUBLISHER.legalName}) ist ein
          Softwareunternehmen. Wir entwickeln und pflegen {PRODUCT.name}, das
          Web-Tool unter {SITE_URL} und die begleitenden Apps für iOS und Android,
          als ein einziges, fokussiertes Produkt: ein Tool für Handelszeiten für
          Menschen, die am Devisenmarkt handeln oder ihn verfolgen. Wir sind keine
          Bank, kein Broker und keine Investmentgesellschaft.
        </p>

        <h2>Warum wir es gebaut haben</h2>
        <p>
          Der Forex-Handel läuft 24 Stunden am Tag an fünf Tagen pro Woche,
          aufgeteilt auf regionale Handelssitzungen in Sydney, Tokio, Frankfurt,
          London und New York. Herauszufinden, welche dieser Sessions gerade in
          Ihrer eigenen Zeitzone geöffnet ist, hieß meist, GMT von Hand
          umzurechnen und alles erneut zu prüfen, sobald ein Land seine Uhren auf
          Sommerzeit umstellte. Wir haben {PRODUCT.name} gebaut, damit diese
          Umrechnung automatisch passiert, jederzeit und kostenlos.
        </p>
        <p>
          Auf dieses Problem sind wir selbst gestoßen: Als kleines Softwareteam,
          das die Märkte auch selbst verfolgt, hatten wir es satt, GMT im Kopf
          umzurechnen und zu rätseln, ob London schon auf Sommerzeit umgestellt
          hatte. Das Tool begann als das Hilfsmittel, das wir für uns selbst
          wollten, und wir nutzen es bis heute an jedem Handelstag. So bemerken
          wir am schnellsten, wenn etwas nicht stimmt.
        </p>

        <h2>Was Forex Market Hours ist und was nicht</h2>
        <p>
          {PRODUCT.name} ist ein Tool für Handelszeiten. Es zeigt, wann die großen
          Forex-Sessions öffnen, schließen und sich überschneiden, umgerechnet in
          Ihre lokale Zeitzone. Es ist <strong>kein</strong> Broker, kein
          Finanzberater und kein Signaldienst, und es bietet keine Handels-,
          Einzahlungs- oder Auszahlungsdienste an. Nichts auf dieser Website ist
          eine persönliche Finanzberatung. Alle Einzelheiten finden Sie in unserem{" "}
          <Link href="/disclaimer">Risiko- und Handelshinweis</Link>.
        </p>

        <h2>Wie wir für Genauigkeit sorgen</h2>
        <p>
          Jede Session-Zeit wird aus den eigenen Zeitzonenregeln des jeweiligen
          Finanzplatzes berechnet statt aus einer festen Tabelle, sodass
          Umstellungen auf die Sommerzeit automatisch berücksichtigt werden. Wie
          das genau funktioniert und auf welche Quellen wir uns stützen,
          erklären wir auf unserer{" "}
          <Link href="/methodology">Methodik-Seite</Link>. Wie wir unsere
          schriftlichen Inhalte recherchieren, prüfen und korrigieren, legen wir
          in unseren <Link href="/editorial-policy">redaktionellen Richtlinien</Link>{" "}
          dar.
        </p>

        <h2>Das kostenlose Web-Tool und die App</h2>
        <p>
          Das Web-Tool unter {SITE_URL} läuft vollständig in Ihrem Browser, ohne
          Anmeldung und ohne Werbung. Dazu gibt es eine kostenlose App für iOS und
          Android mit Widgets für den Homebildschirm, einem Wirtschaftskalender
          und Session-Alarmen, für alle, die dieselbe Live-Uhr ohne geöffneten
          Browser-Tab nutzen möchten.
        </p>

        <h2>Kontakt</h2>
        <p>
          Fragen, Korrekturen oder Partnerschaftsanfragen sind willkommen unter{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>
          , oder besuchen Sie unsere <Link href="/contact">Kontaktseite</Link>.
        </p>
      </>
    ),
  },
  tr: {
    metaTitle: `${PRODUCT.name} Hakkında`,
    metaDescription:
      "Forex Market Hours’u kim geliştiriyor, ücretsiz canlı seans saatini neden yaptık ve seans saatlerini nasıl doğru tutuyoruz. Hunters Group Software tarafından.",
    ogDescription:
      "Forex Market Hours’u kim geliştiriyor, ücretsiz canlı seans saatini neden yaptık ve seans saatlerini nasıl doğru tutuyoruz.",
    breadcrumb: "Hakkımızda",
    h1: `${PRODUCT.name} Hakkında`,
    lead: (
      <>
        {PRODUCT.name}, kapsamlı finansal ürünler yerine küçük ve odaklı araçlar
        geliştiren bir yazılım şirketi olan {PUBLISHER.displayName} tarafından
        hazırlanmış ücretsiz, canlı bir forex seans saatidir.
      </>
    ),
    body: (
      <>
        <h2>Biz kimiz</h2>
        <p>
          {PUBLISHER.displayName} ({PUBLISHER.legalName}) bir yazılım şirketidir.{" "}
          {PRODUCT.name} ürününü, yani {SITE_URL} adresindeki web aracını ve ona
          eşlik eden iOS ve Android uygulamalarını tek ve odaklı bir ürün olarak
          geliştiriyor ve sürdürüyoruz: döviz piyasasında işlem yapan ya da bu
          piyasayı takip eden kişiler için bir piyasa saatleri aracı. Banka, aracı
          kurum veya yatırım şirketi değiliz.
        </p>

        <h2>Bunu neden geliştirdik</h2>
        <p>
          Forex işlemleri haftada beş gün, günde 24 saat sürer ve Sidney, Tokyo,
          Frankfurt, Londra ve New York’taki bölgesel seanslara bölünür. Bu
          seanslardan hangisinin şu anda, kendi saat diliminizde açık olduğunu
          bulmak, genellikle GMT’yi elle çevirmek ve bir ülke yaz saati için
          saatlerini her değiştirdiğinde hesabı yeniden kontrol etmek demekti.{" "}
          {PRODUCT.name} aracını, bu dönüşüm her zaman, otomatik olarak ve
          ücretsiz yapılsın diye geliştirdik.
        </p>
        <p>
          Bu sorunu bizzat yaşadık: piyasaları kendisi de takip eden küçük bir
          yazılım ekibi olarak, kafamızda GMT hesabı yapmaktan ve Londra’nın yaz
          saatine geçip geçmediğinden emin olamamaktan yorulmuştuk. Araç, kendi
          kullanımımız için istediğimiz bir yardımcı olarak doğdu ve hâlâ her işlem
          gününde onu kullanıyoruz; bir şeyin yanlış göründüğünü fark etmenin en
          hızlı yolu da bu.
        </p>

        <h2>Forex Market Hours nedir, ne değildir</h2>
        <p>
          {PRODUCT.name} bir piyasa saatleri aracıdır. Başlıca forex seanslarının
          ne zaman açıldığını, kapandığını ve çakıştığını yerel saat diliminize
          çevrilmiş olarak gösterir. Bir aracı kurum, finansal danışman veya sinyal
          hizmeti <strong>değildir</strong>; alım satım, para yatırma veya para
          çekme hizmeti sunmaz. Bu sitedeki hiçbir içerik kişiye özel finansal
          tavsiye niteliği taşımaz; ayrıntılar için{" "}
          <Link href="/disclaimer">risk ve işlem sorumluluk reddi</Link> metnimize
          bakın.
        </p>

        <h2>Doğruluğu nasıl sağlıyoruz</h2>
        <p>
          Her seans saati sabit bir tablodan değil, her finans merkezinin kendi saat
          dilimi kurallarından hesaplanır; böylece yaz saati geçişleri otomatik
          olarak uygulanır. Bunun tam olarak nasıl işlediğini ve dayandığımız
          kaynakları <Link href="/methodology">metodoloji sayfamızda</Link>{" "}
          açıklıyoruz. Yazılı içeriğimizi nasıl araştırdığımız, incelediğimiz ve
          düzelttiğimiz ise <Link href="/editorial-policy">yayın ilkelerimizde</Link>{" "}
          anlatılıyor.
        </p>

        <h2>Ücretsiz web aracı ve uygulama</h2>
        <p>
          {SITE_URL} adresindeki web aracı tamamen tarayıcınızda çalışır; kayıt ve
          reklam yoktur. Aynı canlı saati bir tarayıcı sekmesi açık tutmadan
          kullanmak isteyenler için Ana Ekran widget’ları, ekonomik takvim ve seans
          uyarıları ekleyen ücretsiz bir iOS ve Android uygulamasıyla birlikte
          sunulur.
        </p>

        <h2>Bize ulaşın</h2>
        <p>
          Sorularınızı, düzeltme önerilerinizi veya iş birliği taleplerinizi{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          adresine iletebilir ya da <Link href="/contact">iletişim sayfamıza</Link>{" "}
          göz atabilirsiniz.
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
