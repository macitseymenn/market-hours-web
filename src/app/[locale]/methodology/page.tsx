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
  pt: {
    Sydney: "Sydney",
    Tokyo: "Tóquio",
    Frankfurt: "Frankfurt",
    London: "Londres",
    "New York": "Nova York",
  },
  it: {
    Sydney: "Sydney",
    Tokyo: "Tokyo",
    Frankfurt: "Francoforte",
    London: "Londra",
    "New York": "New York",
  },
  de: {
    Sydney: "Sydney",
    Tokyo: "Tokio",
    Frankfurt: "Frankfurt",
    London: "London",
    "New York": "New York",
  },
  tr: {
    Sydney: "Sidney",
    Tokyo: "Tokyo",
    Frankfurt: "Frankfurt",
    London: "Londra",
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
  pt: {
    Sydney: "Austrália",
    Tokyo: "Japão",
    Frankfurt: "Alemanha",
    London: "Reino Unido",
    "New York": "Estados Unidos",
  },
  it: {
    Sydney: "Australia",
    Tokyo: "Giappone",
    Frankfurt: "Germania",
    London: "Regno Unito",
    "New York": "Stati Uniti",
  },
  de: {
    Sydney: "Australien",
    Tokyo: "Japan",
    Frankfurt: "Deutschland",
    London: "Vereinigtes Königreich",
    "New York": "Vereinigte Staaten",
  },
  tr: {
    Sydney: "Avustralya",
    Tokyo: "Japonya",
    Frankfurt: "Almanya",
    London: "Birleşik Krallık",
    "New York": "Amerika Birleşik Devletleri",
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
  pt: {
    metaTitle: "Como Calculamos os Horários das Sessões do Forex",
    metaDescription:
      "Nossa metodologia: como o Forex Market Hours calcula a abertura e o fechamento de cada sessão a partir de regras de fuso horário ao vivo, incluindo o horário de verão.",
    ogDescription:
      "Como o Forex Market Hours calcula a abertura e o fechamento de cada sessão a partir de regras de fuso horário ao vivo, incluindo o horário de verão.",
    breadcrumb: "Metodologia",
    h1: "Como Calculamos os Horários das Sessões do Forex",
    lead: (
      <>
        Cada horário de sessão no {PRODUCT.name} é calculado ao vivo a partir das
        regras de fuso horário de cada centro financeiro, e não lido de uma tabela
        GMT fixa, então as mudanças do horário de verão são sempre aplicadas
        automaticamente.
      </>
    ),
    body: (sessionList: ReactNode) => (
      <>
        <h2>A resposta curta</h2>
        <p>
          Cada sessão do forex é definida pelo horário de negociação{" "}
          <strong>local</strong> do seu centro financeiro; por exemplo, Londres
          negocia aproximadamente no intervalo 08:00–17:00 do seu próprio horário
          local, o ano inteiro. Calculamos o equivalente atual em UTC/GMT dessa janela local
          usando as regras de fuso horário da IANA de cada cidade, por meio da API{" "}
          <code>Intl</code> embutida no navegador. Como o cálculo sempre parte do
          horário local, ele acompanha automaticamente cada mudança do horário de
          verão (GMT/BST, EST/EDT, AEST/AEDT e assim por diante) sem que
          precisemos publicar uma nova tabela duas vezes por ano.
        </p>

        <h2>Janelas das sessões no horário padrão</h2>
        <p>
          Como referência, estas são as janelas aproximadas das cinco principais
          sessões em GMT durante o inverno do hemisfério norte (horário padrão).
          Elas mudam em uma hora nos centros que adotam o horário de verão durante
          o seu verão local:
        </p>
        <ul>{sessionList}</ul>

        <h2>Como o cálculo funciona</h2>
        <p>
          Em vez de fixar no código um deslocamento como “GMT+1” para Londres,
          perguntamos ao navegador que horas são agora no fuso{" "}
          <code>Europe/London</code> (e no fuso IANA equivalente de cada uma das
          outras cidades de sessão), usando o mesmo banco de dados de fusos
          horários que dá base à maioria dos sistemas operacionais e navegadores
          modernos: o{" "}
          <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
            banco de dados de fusos horários da IANA
          </a>
          . Esse banco de dados é mantido justamente porque as regras do horário
          de verão mudam de país para país e de ano para ano; consultá-lo, em vez
          de uma tabela fixa que teríamos de atualizar à mão, é o que mantém a
          ferramenta precisa sem ficar desatualizada. Na prática, também
          conferimos a ferramenta por amostragem com os relógios locais reais de
          cada cidade de sessão, principalmente nos fins de semana de mudança de
          horário da primavera e do outono, quando as divergências têm mais chance
          de aparecer.
        </p>

        <h2>Por que não uma tabela GMT fixa?</h2>
        <p>
          Os países mudam seus relógios em datas diferentes. O Reino Unido e a UE
          passam para o horário de verão no último domingo de março; os Estados
          Unidos mudam algumas semanas antes, no segundo domingo de março; a
          Austrália, no hemisfério sul, muda no sentido totalmente oposto. O
          governo britânico publica as datas exatas das suas próprias mudanças de
          horário em{" "}
          <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
            gov.uk/when-do-the-clocks-change
          </a>
          . Uma tabela estática fica desatualizada rapidamente em uma ou mais
          dessas transições; um cálculo feito a partir de regras de fuso horário ao
          vivo, não.
        </p>

        <h2>Fontes</h2>
        <ul>
          <li>
            <a href="https://www.bis.org/statistics/rpfx22.htm" target="_blank" rel="noopener noreferrer">
              Banco de Compensações Internacionais: Pesquisa Trienal dos Bancos
              Centrais
            </a>{" "}
            para a posição de Londres como o maior centro de câmbio em volume
            negociado.
          </li>
          <li>
            O{" "}
            <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
              banco de dados de fusos horários da IANA
            </a>{" "}
            para a conversão do horário de negociação local para UTC e as regras do
            horário de verão.
          </li>
          <li>
            <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
              Orientações do governo britânico sobre a mudança de horário
            </a>{" "}
            como referência para uma das principais datas de transição.
          </li>
        </ul>

        <h2>Limitações</h2>
        <p>
          As janelas de sessão acima são indicativas de um dia normal de
          negociação e não consideram feriados de mercado, meios expedientes nem
          fechamentos não programados, que cada banco e cada bolsa definem de forma
          independente. Use a{" "}
          <Link href="/">ferramenta ao vivo na nossa página inicial</Link> para ver
          o status atual, ajustado ao seu fuso horário, e trate qualquer horário de
          sessão como informação geral, e não como garantia de que um determinado
          mercado está negociando.
        </p>
      </>
    ),
  },
  it: {
    metaTitle: "Come calcoliamo gli orari delle sessioni forex",
    metaDescription:
      "La nostra metodologia: come Forex Market Hours calcola apertura e chiusura di ogni sessione dalle regole dei fusi orari in tempo reale, ora legale inclusa.",
    ogDescription:
      "Come Forex Market Hours calcola apertura e chiusura di ogni sessione dalle regole dei fusi orari in tempo reale, ora legale inclusa.",
    breadcrumb: "Metodologia",
    h1: "Come calcoliamo gli orari delle sessioni forex",
    lead: (
      <>
        Ogni orario di sessione in {PRODUCT.name} viene calcolato in tempo reale in
        base alle regole del fuso orario di ciascun centro finanziario, e non letto
        da una tabella GMT statica, quindi i cambi dell’ora legale vengono sempre
        applicati automaticamente.
      </>
    ),
    body: (sessionList: ReactNode) => (
      <>
        <h2>La risposta breve</h2>
        <p>
          Ogni sessione forex è definita dagli orari di trading{" "}
          <strong>locali</strong> del suo centro finanziario: Londra, per esempio,
          opera all’incirca dalle 08:00 alle 17:00 della sua ora locale, tutto
          l’anno. Calcoliamo l’equivalente UTC/GMT attuale di quella finestra locale
          usando le regole dei fusi orari IANA di ciascuna città, tramite l’API{" "}
          <code>Intl</code> integrata nel browser. Poiché il calcolo parte sempre
          dall’ora locale, segue automaticamente ogni cambio dell’ora legale
          (GMT/BST, EST/EDT, AEST/AEDT e così via) senza che dobbiamo pubblicare una
          nuova tabella due volte l’anno.
        </p>

        <h2>Finestre delle sessioni in ora solare</h2>
        <p>
          Come riferimento, ecco le finestre approssimative in GMT delle cinque
          principali sessioni durante l’inverno dell’emisfero nord (ora solare).
          Si spostano di un’ora per i centri che adottano l’ora legale durante la
          loro estate locale:
        </p>
        <ul>{sessionList}</ul>

        <h2>Come funziona il calcolo</h2>
        <p>
          Invece di impostare in modo fisso uno scarto come «GMT+1» per Londra,
          chiediamo al browser che ora è in questo momento nel fuso orario{" "}
          <code>Europe/London</code> (e nel fuso IANA equivalente per ogni altra
          città di sessione), usando lo stesso database dei fusi orari su cui si
          basano la maggior parte dei sistemi operativi e dei browser moderni: il{" "}
          <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
            database dei fusi orari IANA
          </a>
          . Questo database viene aggiornato proprio perché le regole dell’ora
          legale cambiano da Paese a Paese e da un anno all’altro: attingere da lì,
          invece che da una tabella fissa da aggiornare a mano, è ciò che mantiene
          lo strumento preciso senza che diventi obsoleto. Nella pratica facciamo
          anche controlli a campione confrontando lo strumento con gli orologi
          locali reali di ogni città di sessione, soprattutto nei fine settimana del
          cambio dell’ora in primavera e in autunno, quando è più probabile che
          emergano discrepanze.
        </p>

        <h2>Perché non una tabella GMT fissa?</h2>
        <p>
          I Paesi cambiano l’ora in date diverse. Il Regno Unito e l’UE passano
          all’ora legale l’ultima domenica di marzo; gli Stati Uniti lo fanno
          qualche settimana prima, la seconda domenica di marzo; l’Australia,
          nell’emisfero sud, si muove addirittura nella direzione opposta. Il
          governo britannico pubblica le date esatte dei propri cambi dell’ora su{" "}
          <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
            gov.uk/when-do-the-clocks-change
          </a>
          . Una tabella statica diventa rapidamente obsoleta a ogni passaggio di
          questo tipo; un calcolo basato sulle regole dei fusi orari in tempo reale,
          no.
        </p>

        <h2>Fonti</h2>
        <ul>
          <li>
            <a href="https://www.bis.org/statistics/rpfx22.htm" target="_blank" rel="noopener noreferrer">
              Banca dei Regolamenti Internazionali: Triennial Central Bank Survey
            </a>{" "}
            per la posizione di Londra come principale centro forex per volume di
            scambi.
          </li>
          <li>
            Il{" "}
            <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
              database dei fusi orari IANA
            </a>{" "}
            per la conversione degli orari di trading locali in UTC e per le regole
            dell’ora legale.
          </li>
          <li>
            <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
              Indicazioni del governo britannico sul cambio dell’ora
            </a>{" "}
            come riferimento per una delle principali date di passaggio.
          </li>
        </ul>

        <h2>Limiti</h2>
        <p>
          Le finestre delle sessioni indicate sopra si riferiscono a una normale
          giornata di trading ed escludono le festività di mercato, le mezze
          giornate e le chiusure non programmate, che le singole banche e borse
          stabiliscono in modo indipendente. Usa lo{" "}
          <Link href="/">strumento in tempo reale nella nostra home page</Link> per
          lo stato attuale adeguato al tuo fuso orario, e considera qualsiasi orario
          di sessione come un’informazione generale e non come la garanzia che un
          determinato mercato sia effettivamente operativo.
        </p>
      </>
    ),
  },
  de: {
    metaTitle: "So berechnen wir die Zeiten der Forex-Sessions",
    metaDescription:
      "Unsere Methodik: wie Forex Market Hours Öffnung und Schließung jeder Session aus aktuellen Zeitzonenregeln berechnet, inklusive Sommerzeit.",
    ogDescription:
      "Wie Forex Market Hours Öffnung und Schließung jeder Session aus aktuellen Zeitzonenregeln berechnet, inklusive Sommerzeit.",
    breadcrumb: "Methodik",
    h1: "So berechnen wir die Zeiten der Forex-Sessions",
    lead: (
      <>
        Jede Session-Zeit in {PRODUCT.name} wird live aus den eigenen
        Zeitzonenregeln des jeweiligen Finanzplatzes berechnet, nicht aus einer
        statischen GMT-Tabelle abgelesen. Deshalb werden Umstellungen auf die
        Sommerzeit immer automatisch berücksichtigt.
      </>
    ),
    body: (sessionList: ReactNode) => (
      <>
        <h2>Die kurze Antwort</h2>
        <p>
          Jede Forex-Session ist durch die <strong>lokalen</strong> Handelszeiten
          ihres Finanzplatzes definiert. London handelt zum Beispiel das ganze
          Jahr über etwa von 08:00–17:00 Ortszeit. Wir berechnen das aktuelle
          UTC/GMT-Äquivalent dieses lokalen Zeitfensters anhand der
          IANA-Zeitzonenregeln jeder Stadt, über die im Browser eingebaute{" "}
          <code>Intl</code>-API. Da die Berechnung immer von der Ortszeit ausgeht,
          folgt sie automatisch jeder Zeitumstellung (GMT/BST, EST/EDT, AEST/AEDT
          und so weiter), ohne dass wir zweimal im Jahr eine neue Tabelle
          veröffentlichen müssen.
        </p>

        <h2>Session-Zeiten in der Normalzeit</h2>
        <p>
          Zur Orientierung hier die ungefähren Zeitfenster der fünf großen
          Sessions in GMT während des Winters auf der Nordhalbkugel (Normalzeit).
          Bei Finanzplätzen, die in ihrem lokalen Sommer die Sommerzeit nutzen,
          verschieben sie sich um eine Stunde:
        </p>
        <ul>{sessionList}</ul>

        <h2>So funktioniert die Berechnung</h2>
        <p>
          Statt für London einen festen Versatz wie „GMT+1“ fest einzuprogrammieren,
          fragen wir den Browser, wie spät es gerade in der Zeitzone{" "}
          <code>Europe/London</code> ist (und in der entsprechenden IANA-Zone jeder
          anderen Session-Stadt). Dabei nutzen wir dieselbe Zeitzonen-Datenbank,
          auf der die meisten modernen Betriebssysteme und Browser beruhen: die{" "}
          <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
            IANA Time Zone Database
          </a>
          . Diese Datenbank wird genau deshalb gepflegt, weil sich die
          Sommerzeitregeln von Land zu Land und von Jahr zu Jahr ändern. Dass wir
          aus ihr lesen statt aus einer festen Tabelle, die wir von Hand
          aktualisieren müssten, hält das Tool genau und verhindert, dass es
          veraltet. In der Praxis gleichen wir das Tool außerdem stichprobenartig
          mit den tatsächlichen Ortszeiten in jeder Session-Stadt ab, vor allem
          rund um die Wochenenden der Zeitumstellung im Frühjahr und Herbst, an
          denen Abweichungen am ehesten auftreten.
        </p>

        <h2>Warum keine feste GMT-Tabelle?</h2>
        <p>
          Länder stellen ihre Uhren an unterschiedlichen Tagen um. Das
          Vereinigte Königreich und die EU wechseln am letzten Sonntag im März
          zur Sommerzeit; die Vereinigten Staaten einige Wochen früher, am zweiten
          Sonntag im März; Australien auf der Südhalbkugel stellt sogar in die
          entgegengesetzte Richtung um. Die britische Regierung veröffentlicht die
          genauen Termine ihrer eigenen Zeitumstellungen unter{" "}
          <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
            gov.uk/when-do-the-clocks-change
          </a>
          . Eine statische Tabelle ist nach einer oder mehreren dieser Umstellungen
          schnell veraltet; eine Berechnung aus aktuellen Zeitzonenregeln nicht.
        </p>

        <h2>Quellen</h2>
        <ul>
          <li>
            <a href="https://www.bis.org/statistics/rpfx22.htm" target="_blank" rel="noopener noreferrer">
              Bank für Internationalen Zahlungsausgleich: Triennial Central Bank Survey
            </a>{" "}
            zur Stellung Londons als größtes Devisenhandelszentrum nach
            Handelsvolumen.
          </li>
          <li>
            Die{" "}
            <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
              IANA Time Zone Database
            </a>{" "}
            für die Umrechnung lokaler Handelszeiten in UTC und für die
            Sommerzeitregeln.
          </li>
          <li>
            <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
              Hinweise der britischen Regierung zur Zeitumstellung
            </a>{" "}
            als Referenz für einen wichtigen Umstellungstermin.
          </li>
        </ul>

        <h2>Einschränkungen</h2>
        <p>
          Die oben genannten Session-Zeiten beziehen sich auf einen normalen
          Handelstag und berücksichtigen keine Börsenfeiertage, verkürzten
          Handelstage und außerplanmäßigen Schließungen, die einzelne Banken und
          Börsen selbst festlegen. Nutzen Sie das{" "}
          <Link href="/">Live-Tool auf unserer Startseite</Link> für den aktuellen,
          an Ihre Zeitzone angepassten Status, und betrachten Sie jede
          Session-Zeit als allgemeine Information und nicht als Garantie dafür,
          dass ein bestimmter Markt gerade handelt.
        </p>
      </>
    ),
  },
  tr: {
    metaTitle: "Forex Seans Saatlerini Nasıl Hesaplıyoruz",
    metaDescription:
      "Metodolojimiz: Forex Market Hours, yaz saati geçişleri dahil her seansın açılış ve kapanışını canlı saat dilimi kurallarından nasıl hesaplıyor.",
    ogDescription:
      "Forex Market Hours, yaz saati geçişleri dahil her seansın açılış ve kapanışını canlı saat dilimi kurallarından nasıl hesaplıyor.",
    breadcrumb: "Metodoloji",
    h1: "Forex Seans Saatlerini Nasıl Hesaplıyoruz",
    lead: (
      <>
        {PRODUCT.name} içindeki her seans saati, sabit bir GMT tablosundan
        okunmak yerine her finans merkezinin kendi saat dilimi kurallarından canlı
        olarak hesaplanır; böylece yaz saati geçişleri her zaman otomatik olarak
        uygulanır.
      </>
    ),
    body: (sessionList: ReactNode) => (
      <>
        <h2>Kısa cevap</h2>
        <p>
          Her forex seansı, bağlı olduğu finans merkezinin{" "}
          <strong>yerel</strong> işlem saatleriyle tanımlanır; örneğin Londra’da
          yıl boyunca kendi yerel saatiyle yaklaşık 08:00–17:00 arasında işlem
          yapılır. Bu yerel aralığın güncel UTC/GMT karşılığını, her şehrin IANA
          saat dilimi kurallarını kullanarak tarayıcının yerleşik{" "}
          <code>Intl</code> API’si aracılığıyla hesaplarız. Hesaplama her zaman
          yerel saatten başladığı için, yılda iki kez yeni bir tablo yayımlamamıza
          gerek kalmadan her yaz saati değişikliğini (GMT/BST, EST/EDT, AEST/AEDT
          vb.) otomatik olarak takip eder.
        </p>

        <h2>Standart saate göre seans aralıkları</h2>
        <p>
          Fikir vermesi için, beş büyük seansın kuzey yarımkürede kış döneminde
          (standart saat) GMT cinsinden yaklaşık aralıkları aşağıdadır. Yaz saati
          uygulayan merkezlerde bu aralıklar kendi yerel yaz dönemlerinde bir saat
          kayar:
        </p>
        <ul>{sessionList}</ul>

        <h2>Hesaplama nasıl işliyor</h2>
        <p>
          Londra için “GMT+1” gibi bir farkı koda sabitlemek yerine, tarayıcıya{" "}
          <code>Europe/London</code> saat diliminde (ve diğer her seans şehri için
          eşdeğer IANA diliminde) şu anda saatin kaç olduğunu soruyoruz. Bunu,
          modern işletim sistemlerinin ve tarayıcıların çoğunun dayandığı aynı saat
          dilimi veritabanıyla yapıyoruz:{" "}
          <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
            IANA Saat Dilimi Veritabanı
          </a>
          . Bu veritabanı, yaz saati kuralları ülkeden ülkeye ve yıldan yıla
          değiştiği için titizlikle güncel tutulur; dolayısıyla elle güncellememiz
          gereken sabit bir tablo yerine bu veritabanından okumak, aracı zamanla
          eskimeden doğru tutan şeydir. Uygulamada aracı ayrıca her seans
          şehrindeki gerçek yerel saatlerle karşılaştırarak örneklem kontrolünden
          geçiriyoruz; özellikle uyumsuzlukların ortaya çıkma ihtimalinin en yüksek
          olduğu ilkbahar ve sonbahar saat değişikliği hafta sonlarında.
        </p>

        <h2>Neden sabit bir GMT tablosu değil?</h2>
        <p>
          Ülkeler saatlerini farklı tarihlerde değiştirir. Birleşik Krallık ve AB,
          Mart ayının son Pazar günü yaz saatine geçer; Amerika Birleşik Devletleri
          birkaç hafta önce, Mart ayının ikinci Pazar günü geçer; güney yarımkürede
          bulunan Avustralya ise tamamen ters yönde hareket eder. Birleşik Krallık
          hükümeti kendi saat değişikliklerinin kesin tarihlerini{" "}
          <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
            gov.uk/when-do-the-clocks-change
          </a>{" "}
          adresinde yayımlar. Sabit bir tablo bu geçişlerin bir veya birkaçında
          hızla güncelliğini yitirir; canlı saat dilimi kurallarına dayalı hesaplama
          ise yitirmez.
        </p>

        <h2>Kaynaklar</h2>
        <ul>
          <li>
            <a href="https://www.bis.org/statistics/rpfx22.htm" target="_blank" rel="noopener noreferrer">
              Uluslararası Ödemeler Bankası: Üç Yıllık Merkez Bankası Anketi
            </a>
            : Londra’nın işlem hacmine göre en büyük döviz merkezi konumu için.
          </li>
          <li>
            <a href="https://www.iana.org/time-zones" target="_blank" rel="noopener noreferrer">
              IANA Saat Dilimi Veritabanı
            </a>
            : yerel işlem saatlerinin UTC’ye dönüştürülmesi ve yaz saati kuralları
            için.
          </li>
          <li>
            <a href="https://www.gov.uk/when-do-the-clocks-change" target="_blank" rel="noopener noreferrer">
              Birleşik Krallık hükümetinin saat değişikliği rehberi
            </a>
            : önemli geçiş tarihlerinden biri için referans olarak.
          </li>
        </ul>

        <h2>Sınırlamalar</h2>
        <p>
          Yukarıdaki seans aralıkları normal bir işlem gününü temsil eder; bankaların
          ve borsaların kendi başlarına belirlediği piyasa tatillerini, yarım günleri
          ve planlanmamış kapanışları kapsamaz. Güncel ve saat diliminize göre
          ayarlanmış durum için{" "}
          <Link href="/">ana sayfamızdaki canlı aracı</Link> kullanın ve herhangi bir
          seans saatini, belirli bir piyasada işlem yapıldığının garantisi olarak
          değil, genel bilgi olarak değerlendirin.
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
