/**
 * Blog content. Each post is Markdown (rendered with react-markdown). Posts feed
 * the /blog listing, /blog/[slug] pages, Article structured data, and the
 * sitemap. Outbound links to authoritative sources (central banks, the BIS,
 * reference sites) are deliberate credibility signals.
 *
 * Every human-facing field (slug, title, description, tags, body) is localized
 * per locale, so `/en/blog/...` renders English and `/es/blog/...` renders the
 * Spanish translation under a natural Spanish slug.
 *
 * To add a post: append an entry below. Keep `date` in ISO (YYYY-MM-DD).
 */

export type BlogLocale = "en" | "es";

type Localized<T> = Record<BlogLocale, T>;

export type Post = {
  slug: Localized<string>;
  title: Localized<string>;
  description: Localized<string>;
  /** ISO publish date. */
  date: string;
  /** ISO last-updated date (optional). */
  updated?: string;
  authorSlug: string;
  tags: Localized<string[]>;
  /** Cover image path (replace the placeholders in /public/blog with photos). */
  cover: string;
  body: Localized<string>;
};

/** A post flattened to a single locale for rendering, keeping every locale's slug
 *  around so pages can emit correct hreflang alternates. */
export type ResolvedPost = {
  slug: string;
  slugs: Localized<string>;
  title: string;
  description: string;
  date: string;
  updated?: string;
  authorSlug: string;
  tags: string[];
  cover: string;
  body: string;
};

export const POSTS: Post[] = [
  {
    slug: {
      en: "forex-trading-sessions-explained",
      es: "sesiones-de-trading-forex-explicadas",
    },
    title: {
      en: "Forex Trading Sessions Explained: The Four Major Markets",
      es: "Sesiones de trading en forex explicadas: los cuatro mercados principales",
    },
    description: {
      en: "Forex trading sessions explained: Sydney, Tokyo, London and New York hours in GMT, how they overlap, and how to see each session in your own timezone.",
      es: "Sesiones de trading en forex explicadas: horarios de Sídney, Tokio, Londres y Nueva York en GMT, sus solapamientos y cómo verlas en tu zona horaria.",
    },
    date: "2026-07-23",
    authorSlug: "author",
    tags: {
      en: ["Sessions", "Basics"],
      es: ["Sesiones", "Fundamentos"],
    },
    cover: "/blog/forex-trading-sessions-explained.svg",
    body: {
      en: `During the working week, the foreign exchange market never really sleeps. Trading runs 24 hours a day, five days a week, moving from one financial centre to the next as the earth turns. Experienced traders, though, rarely picture it as a single block of time. They think in **sessions**: Sydney, Tokyo, London and New York. Each one has its own rhythm, its own currencies and its own level of activity. This article covers what the four major forex trading sessions are, when they run, how they overlap, and why the distinction matters if you're deciding when to trade.

## Why forex runs in sessions, not one market

Unlike a stock exchange, forex has no central building and no single opening bell. Trading happens over the counter, through a global network of banks, brokers and institutions. Liquidity, meaning the volume of buyers and sellers willing to transact, follows the business day around the world. When the major banks in a region open their doors, activity there rises. When they shut for the evening, it falls.

Think of it as a relay. The Australian business day winds down just as Asia gets going. Tokyo starts to quieten, and Europe wakes up. By the time London is working through its afternoon, New York is opening. This handover repeats every weekday, and it's why the market can stay open continuously from the Sunday evening open to the Friday evening close, without any single centre needing to be awake the whole time.

The week starts Sunday at 22:00 GMT, which is 5:00 PM in New York, the moment Sydney comes online. It closes Friday at 22:00 GMT, again 5:00 PM New York time, then stays shut over the weekend. Really, understanding the session structure is just understanding how the working day travels around the globe.

## The four major forex sessions at a glance

The four sessions most traders track are anchored to the major financial centres. The table below shows the standard-time windows in GMT. These shift by an hour when daylight saving is in effect, since each session follows local time in its own city rather than GMT.

| Session | Financial centre | Hours (GMT, standard time) | Character |
|---|---|---|---|
| Sydney | Sydney | 22:00 - 07:00 | Opens the week, lighter liquidity, AUD and NZD focus |
| Tokyo | Tokyo | 00:00 - 09:00 | Asian trade, JPY pairs active, often range-bound |
| London | London | 08:00 - 17:00 | Largest by volume, sets much of the day's direction |
| New York | New York | 13:00 - 22:00 | USD-driven, high volatility, overlaps London |

There's a fifth centre worth naming too. **Frankfurt**, the hub of the European session, opens around 07:00 GMT, roughly an hour before London. Many traders treat the European session as starting with Frankfurt and then deepening once London joins. Because London dominates European turnover, the whole session usually just gets called the London session. Those windows overlap on purpose, and that overlap is where the day's most important trading tends to happen, as we'll see.

## The Sydney session

Sydney opens the trading week. Coming online on Sunday evening GMT, it's the first major centre to reopen after the weekend, and its standard-time window runs from 22:00 to 07:00 GMT. That makes Sydney the quiet start of the global relay rather than a burst of heavy activity.

Liquidity during the pure Sydney hours is usually lighter than at any other point in the day. The Australian and New Zealand economies are large and important, but their currency markets are smaller than Europe's or America's, so ranges tend to be narrower and price movement more measured. The currencies most associated with this session are the Australian dollar (AUD) and the New Zealand dollar (NZD), plus their crosses against the US dollar and the Japanese yen.

For traders, the Sydney session sets an early tone. News out of Australia and New Zealand, such as central bank decisions from the Reserve Bank of Australia, can move these pairs sharply against an otherwise calm backdrop. Commodity prices matter here too, since the Australian dollar is closely tied to raw materials.

Because Sydney sits in the southern hemisphere, its daylight saving calendar runs opposite to Europe's and America's. Australian clocks move forward when northern clocks move back, so the exact GMT window for the Sydney session shifts at different times of year than the London or New York windows do. It's one reason a fixed printed table of session hours can quietly go out of date.

## The Tokyo (Asian) session

Tokyo anchors the Asian session, running from 00:00 to 09:00 GMT in standard time. It overlaps the tail end of Sydney and brings the first genuinely large pool of liquidity in the trading day. Tokyo is one of the world's biggest currency-trading centres, so the Asian session carries a good deal more weight than Sydney alone.

The Japanese yen (JPY) is the natural focus. Pairs like USD/JPY, EUR/JPY and AUD/JPY see their most active local trading during these hours, driven by Japanese banks, exporters and institutional flows. Chinese and other regional data feed into sentiment as well, since much of Asian economic activity settles in this window.

The Tokyo session has a reputation for staying relatively range-bound. Big directional moves are less common than during the European and US sessions, and prices often trade within defined levels. That suits traders who like range strategies and frustrates those hunting strong trends. It's a general tendency, not a rule, and major news can override it at any time.

The Asian session also matters because it sets up the European open. Ranges built overnight in Tokyo often become reference points once London arrives. For a closer look at how this session behaves and which pairs deserve attention, see our dedicated guide to the [Tokyo and Asian forex session](/en/blog/tokyo-asian-forex-session).

## The London session

London is the heavyweight of the forex day. Its standard-time window runs from 08:00 to 17:00 GMT, and by turnover it's the largest foreign exchange centre in the world. That isn't folklore; it's measured. The **BIS Triennial Central Bank Survey**, run by the Bank for International Settlements, consistently shows the United Kingdom handling the single largest share of global FX turnover, well ahead of any other country. You can read the survey directly at https://www.bis.org/statistics/rpfx22.htm.

When London opens, volume surges. Traders often describe the London open as the moment the day picks up real direction, because there's enough depth of liquidity to establish trends that carry through the rest of the session. Spreads on the major pairs usually tighten as more participants pile in, and the euro, the British pound and the Swiss franc all trade heavily against the US dollar. EUR/USD and GBP/USD rank among the most active pairs on earth during these hours.

The London session also absorbs the Frankfurt open an hour earlier, so European momentum is already building by the time London is fully underway. From mid-morning on, economic releases from the eurozone and the United Kingdom can drive sharp moves: inflation figures, central bank commentary from the Bank of England, and the like. The Bank of England publishes its schedule and decisions at https://www.bankofengland.co.uk.

Because so much happens around the London open, many traders build their day around it. For a focused look at exactly when this session begins and how its opening hour behaves, see our companion article on [what time the London session opens](/en/blog/what-time-does-the-london-session-open).

## The New York session

New York is the second pillar of global forex, running from 13:00 to 22:00 GMT in standard time. The US dollar dominates it, sitting on one side of the large majority of all currency trades, so US economic data and Federal Reserve policy ripple across the entire market. Releases like non-farm payrolls, inflation reports and Fed rate decisions often produce the sharpest volatility of the week, and they land during New York hours. The Federal Reserve publishes its calendar at https://www.federalreserve.gov.

The New York session tends to open with high energy, then thin out gradually as the afternoon wears on and European desks close for the day. Those opening hours are lively precisely because London is still open alongside them. Once London finishes around 17:00 GMT, liquidity starts to drain, and the later part of the New York session, the run into the 22:00 GMT close, is usually the quietest stretch of the whole trading day.

That overlap between London and New York is the most important window in the forex day, so it deserves its own section.
## Session overlaps: where the volume concentrates

The single busiest period of the trading day is the **London-New York overlap**, running roughly from 13:00 to 17:00 GMT. For those four hours, the two largest financial centres are open at the same time. Liquidity is at its deepest, spreads on the major pairs are usually at their tightest, and price movement is at its most sustained. For a lot of traders this window is the core of the day, especially for dollar and euro pairs.

There's a second, smaller overlap earlier in the day: the **Sydney-Tokyo overlap** during the Asian morning. It's far less active than the London-New York window, but it does add liquidity to yen and Australian dollar pairs, and it can produce meaningful moves when regional news breaks.

Overlaps matter because they squeeze the activity of two regions into the same clock hours. More participants means more volume, and more volume usually means smoother execution and clearer trends. Choosing when to trade often comes down to which overlap fits your schedule and your strategy.
## How to see the sessions in your own timezone

Every session window in this article is quoted in GMT, because GMT is the common reference the whole market shares. But you don't trade in GMT. You trade on your own clock, wherever you happen to live. Converting these windows by hand is easy to get wrong, and there's a further wrinkle: daylight saving time.

Because each session is anchored to local time in its own city, the GMT windows shift by an hour whenever a region changes its clocks. The United Kingdom and the European Union switch on the last Sunday of March and October; the United States switches on the second Sunday of March and the first Sunday of November; Australia moves the other way. So a table printed once is wrong for several weeks of every year.
The dependable way around all of this is to let a tool do the conversion. Our [live forex market hours tool](/) shows all four sessions in your own timezone in real time, adjusting automatically for daylight saving so the times you see are always current.

## Frequently asked questions

**How many forex trading sessions are there?**
There are four major sessions: Sydney, Tokyo, London and New York, each named for a leading financial centre. Frankfurt is sometimes counted as the opener of the European session, but it's usually folded into London.

**Which forex session is the most volatile?**
London and New York are the most volatile sessions, and volatility peaks during their overlap, roughly 13:00 to 17:00 GMT, when both centres are open at once and liquidity is deepest.

**Do the forex sessions overlap?**
Yes. The big one is London and New York, roughly 13:00 to 17:00 GMT. There's also a smaller Sydney-Tokyo overlap during the Asian morning. These overlaps are when trading volume runs highest.

**Which session is best for beginners?**
There's no single right answer; it depends on your timezone and the pairs you follow. Many beginners find the London session offers the clearest trends and the tightest spreads, while the quieter Sydney and Tokyo hours can be a calmer place to learn. The best approach is to watch each session in your own time and see which one suits you.

**Why do session times shift during the year?**
Sessions are tied to local time in each city, so when a region moves its clocks for daylight saving, the GMT window shifts by an hour. That's why a live tool beats a printed table.

*This article is for general information only and is not financial advice.*`,
      es: `Durante la semana laboral, el mercado de divisas no descansa. Las operaciones funcionan 24 horas al día, cinco días a la semana, y pasan de un centro financiero al siguiente a medida que gira la Tierra. Aun así, los operadores con experiencia rara vez lo ven como un único bloque de tiempo. Piensan en **sesiones**: Sídney, Tokio, Londres y Nueva York. Cada una tiene su propio ritmo, sus propias divisas y su propio nivel de actividad. Este artículo explica cuáles son las cuatro grandes sesiones de trading en forex, cuándo se desarrollan, cómo se solapan y por qué la distinción importa si estás decidiendo cuándo operar.

## Por qué el forex funciona por sesiones y no como un solo mercado

A diferencia de una bolsa de valores, el forex no tiene un edificio central ni una única campana de apertura. Las operaciones se realizan de forma extrabursátil, a través de una red global de bancos, brókers e instituciones. La liquidez, es decir, el volumen de compradores y vendedores dispuestos a operar, sigue la jornada laboral por todo el mundo. Cuando los grandes bancos de una región abren sus puertas, la actividad allí aumenta. Cuando cierran por la tarde, disminuye.

Piénsalo como un relevo. La jornada australiana termina justo cuando Asia arranca. Tokio empieza a calmarse y Europa despierta. Para cuando Londres avanza en su tarde, Nueva York ya está abriendo. Ese traspaso se repite cada día laborable, y por eso el mercado puede permanecer abierto de forma continua desde la apertura del domingo por la tarde hasta el cierre del viernes por la tarde, sin que ningún centro tenga que estar despierto todo el tiempo.

La semana arranca el domingo a las 22:00 GMT, que son las 5:00 PM en Nueva York, el momento en que Sídney entra en funcionamiento. Cierra el viernes a las 22:00 GMT, otra vez las 5:00 PM hora de Nueva York, y luego permanece cerrado durante el fin de semana. En realidad, entender la estructura de sesiones no es más que entender cómo viaja la jornada laboral alrededor del planeta.

## Las cuatro grandes sesiones de forex de un vistazo

Las cuatro sesiones que sigue la mayoría de los operadores están ancladas a los principales centros financieros. La tabla siguiente muestra las ventanas en horario estándar en GMT. Ten en cuenta que se desplazan una hora cuando está vigente el horario de verano, ya que cada sesión sigue la hora local de su propia ciudad y no el GMT.

| Sesión | Centro financiero | Horario (GMT, hora estándar) | Carácter |
|---|---|---|---|
| Sídney | Sídney | 22:00 - 07:00 | Abre la semana, menor liquidez, foco en AUD y NZD |
| Tokio | Tokio | 00:00 - 09:00 | Comercio asiático, pares JPY activos, suele moverse en rango |
| Londres | Londres | 08:00 - 17:00 | La mayor por volumen, marca gran parte de la dirección del día |
| Nueva York | Nueva York | 13:00 - 22:00 | Impulsada por el USD, alta volatilidad, se solapa con Londres |

Hay también un quinto centro que merece mención. **Fráncfort**, el eje de la sesión europea, abre alrededor de las 07:00 GMT, aproximadamente una hora antes que Londres. Muchos operadores consideran que la sesión europea empieza con Fráncfort y se profundiza en cuanto Londres se incorpora. Como Londres domina el volumen europeo, a la sesión en conjunto se la suele llamar simplemente sesión de Londres. Esas ventanas se solapan a propósito, y ese solapamiento es donde tiende a producirse el trading más importante del día, como veremos.

## La sesión de Sídney

Sídney abre la semana de trading. Al entrar en funcionamiento el domingo por la tarde en GMT, es el primer gran centro que reabre tras el fin de semana, y su ventana en horario estándar va de las 22:00 a las 07:00 GMT. Eso convierte a Sídney en el arranque tranquilo del relevo global, no en un estallido de intensa actividad.

La liquidez durante las horas puras de Sídney suele ser más baja que en cualquier otro momento del día. Las economías australiana y neozelandesa son grandes e importantes, pero sus mercados de divisas son más pequeños que los de Europa o Estados Unidos, así que los rangos tienden a ser más estrechos y el movimiento del precio más pausado. Las divisas más asociadas a esta sesión son el dólar australiano (AUD) y el dólar neozelandés (NZD), junto con sus cruces frente al dólar estadounidense y al yen japonés.

Para los operadores, la sesión de Sídney marca un tono temprano. Las noticias de Australia y Nueva Zelanda, como las decisiones del Banco de la Reserva de Australia, pueden mover estos pares con fuerza sobre un fondo por lo demás tranquilo. Los precios de las materias primas también cuentan aquí, ya que el dólar australiano está estrechamente ligado a ellas.

Como Sídney está en el hemisferio sur, su calendario de horario de verano es el opuesto al de Europa y Estados Unidos. Los relojes australianos se adelantan cuando los del norte se atrasan, así que la ventana GMT exacta de la sesión de Sídney se desplaza en momentos del año distintos a los de Londres o Nueva York. Es una de las razones por las que una tabla impresa fija de horarios de sesión puede quedarse desactualizada sin avisar.

## La sesión de Tokio (asiática)

Tokio es el ancla de la sesión asiática y va de las 00:00 a las 09:00 GMT en horario estándar. Se solapa con el final de Sídney y aporta el primer conjunto verdaderamente grande de liquidez de la jornada. Tokio es uno de los mayores centros de negociación de divisas del mundo, así que la sesión asiática pesa bastante más que Sídney por sí sola.

El yen japonés (JPY) es el foco natural. Pares como USD/JPY, EUR/JPY y AUD/JPY registran su negociación local más activa durante estas horas, impulsados por los bancos japoneses, los exportadores y los flujos institucionales. Los datos de China y de otros países de la región también alimentan el sentimiento, ya que buena parte de la actividad económica asiática se resuelve en esta ventana.

La sesión de Tokio tiene fama de moverse relativamente en rango. Los grandes movimientos direccionales son menos frecuentes que durante las sesiones europea y estadounidense, y los precios suelen operar dentro de niveles definidos. Eso conviene a quienes prefieren estrategias de rango y frustra a quienes buscan tendencias fuertes. Es una tendencia general, no una regla, y cualquier noticia importante puede anularla en cualquier momento.

La sesión asiática también importa porque prepara la apertura europea. Los rangos que se forman durante la noche en Tokio suelen servir de puntos de referencia una vez que llega Londres. Si quieres ver más de cerca cómo se comporta esta sesión y qué pares merecen atención, consulta nuestra guía dedicada a la [sesión forex asiática de Tokio](/es/blog/sesion-forex-asiatica-tokio).

## La sesión de Londres

Londres es el peso pesado de la jornada de forex. Su ventana en horario estándar va de las 08:00 a las 17:00 GMT, y por volumen es el mayor centro de divisas del mundo. No es folclore: está medido. La **Encuesta Trienal de Bancos Centrales del BIS**, realizada por el Banco de Pagos Internacionales, muestra una y otra vez que el Reino Unido gestiona la mayor cuota individual del volumen mundial de divisas, muy por delante de cualquier otro país. Puedes leer la encuesta directamente en https://www.bis.org/statistics/rpfx22.htm.

Cuando Londres abre, el volumen se dispara. Los operadores suelen describir la apertura de Londres como el momento en que el día toma una dirección real, porque allí hay suficiente profundidad de liquidez para establecer tendencias que se prolongan durante el resto de la sesión. Los diferenciales de los pares principales suelen estrecharse a medida que entran más participantes, y el euro, la libra esterlina y el franco suizo se negocian con fuerza frente al dólar estadounidense. EUR/USD y GBP/USD figuran entre los pares más activos del planeta durante estas horas.

La sesión de Londres también absorbe la apertura de Fráncfort una hora antes, así que el impulso europeo ya se está formando cuando Londres arranca del todo. De media mañana en adelante, las publicaciones económicas de la eurozona y del Reino Unido pueden provocar movimientos bruscos: cifras de inflación, comentarios del Banco de Inglaterra y cosas por el estilo. El Banco de Inglaterra publica su calendario y sus decisiones en https://www.bankofengland.co.uk.

Como pasa tanto en torno a la apertura de Londres, muchos operadores organizan su día alrededor de ella. Para un análisis centrado en cuándo comienza exactamente esta sesión y cómo se comporta su primera hora, consulta nuestro artículo complementario sobre [a qué hora abre la sesión de Londres](/es/blog/a-que-hora-abre-la-sesion-de-londres).

## La sesión de Nueva York

Nueva York es el segundo pilar del forex global y va de las 13:00 a las 22:00 GMT en horario estándar. La domina el dólar estadounidense, que figura en un lado de la gran mayoría de las operaciones de divisas, así que los datos económicos de Estados Unidos y la política de la Reserva Federal repercuten en todo el mercado. Publicaciones como las nóminas no agrícolas, los informes de inflación y las decisiones de tipos de la Fed producen a menudo la volatilidad más acusada de la semana, y llegan durante las horas de Nueva York. La Reserva Federal publica su calendario en https://www.federalreserve.gov.

La sesión de Nueva York arranca con mucha energía y se va adelgazando poco a poco a medida que avanza la tarde y las mesas europeas cierran por el día. Sus horas de apertura son animadas precisamente porque Londres sigue abierto en paralelo. Una vez que Londres termina en torno a las 17:00 GMT, la liquidez empieza a drenarse, y la parte final de la sesión de Nueva York, el tramo hacia el cierre de las 22:00 GMT, suele ser la más tranquila de toda la jornada de trading.

Ese solapamiento entre Londres y Nueva York es la ventana más importante de la jornada de forex, así que merece su propia sección.
## Solapamientos de sesión: dónde se concentra el volumen

El periodo más activo de toda la jornada es el **solapamiento de Londres y Nueva York**, que va aproximadamente de las 13:00 a las 17:00 GMT. Durante esas cuatro horas, los dos mayores centros financieros están abiertos a la vez. La liquidez toca su punto más profundo, los diferenciales de los pares principales suelen estar en su punto más estrecho y el movimiento del precio es el más sostenido. Para muchos operadores esta ventana es el núcleo del día, sobre todo para los pares con dólar y euro.

Hay un segundo solapamiento, más pequeño y anterior: el **solapamiento de Sídney y Tokio** durante la mañana asiática. Es mucho menos activo que la ventana de Londres y Nueva York, pero añade liquidez a los pares con yen y con dólar australiano, y puede generar movimientos relevantes cuando surgen noticias regionales.

Los solapamientos importan porque concentran la actividad de dos regiones en las mismas horas del reloj. Más participantes significan más volumen, y más volumen suele traducirse en una ejecución más fluida y tendencias más claras. Elegir cuándo operar a menudo se reduce a qué solapamiento encaja con tu horario y tu estrategia.
## Cómo ver las sesiones en tu propia zona horaria

Cada ventana de sesión de este artículo está expresada en GMT, porque el GMT es la referencia común que comparte todo el mercado. Pero tú no operas en GMT. Operas según tu propio reloj, vivas donde vivas. Convertir estas ventanas a mano es fácil de equivocar, y hay una complicación añadida: el horario de verano.

Como cada sesión está anclada a la hora local de su propia ciudad, las ventanas GMT se desplazan una hora cada vez que una región cambia sus relojes. El Reino Unido y la Unión Europea cambian el último domingo de marzo y de octubre; Estados Unidos, el segundo domingo de marzo y el primer domingo de noviembre; Australia se mueve en sentido contrario. Así que una tabla impresa una sola vez queda desactualizada durante varias semanas de cada año.
La forma fiable de evitar todo esto es dejar que una herramienta haga la conversión. Nuestra [herramienta de horarios del mercado forex en vivo](/es) muestra las cuatro sesiones en tu propia zona horaria en tiempo real y se ajusta automáticamente al horario de verano, para que las horas que ves estén siempre al día.

## Preguntas frecuentes

**¿Cuántas sesiones de trading en forex hay?**
Hay cuatro grandes sesiones: Sídney, Tokio, Londres y Nueva York, cada una nombrada por un centro financiero de referencia. A veces se cuenta Fráncfort como la que abre la sesión europea, pero por lo general se integra en Londres.

**¿Cuál es la sesión de forex más volátil?**
Londres y Nueva York son las sesiones más volátiles, y la volatilidad alcanza su máximo durante su solapamiento, de aproximadamente las 13:00 a las 17:00 GMT, cuando ambos centros están abiertos a la vez y la liquidez es más profunda.

**¿Se solapan las sesiones de forex?**
Sí. El más importante es el de Londres y Nueva York, aproximadamente de las 13:00 a las 17:00 GMT. También hay uno menor entre Sídney y Tokio durante la mañana asiática. En esos solapamientos es cuando el volumen de trading es más alto.

**¿Qué sesión es mejor para principiantes?**
No hay una única respuesta correcta; depende de tu zona horaria y de los pares que sigas. Muchos principiantes encuentran que la sesión de Londres ofrece las tendencias más claras y los diferenciales más estrechos, mientras que las horas más tranquilas de Sídney y Tokio pueden ser un lugar más calmado para aprender. Lo mejor es observar cada sesión en tu propio horario y ver cuál te encaja.

**¿Por qué cambian los horarios de sesión a lo largo del año?**
Las sesiones están vinculadas a la hora local de cada ciudad, así que cuando una región mueve sus relojes por el horario de verano, la ventana GMT se desplaza una hora. Por eso una herramienta en vivo resulta más fiable que una tabla impresa.

*Este artículo es solo informativo y no constituye asesoramiento financiero.*`,
    },
  },
  {
    slug: {
      en: "what-time-does-the-london-session-open",
      es: "a-que-hora-abre-la-sesion-de-londres",
    },
    title: {
      en: "What Time Does the London Session Open in Your Timezone?",
      es: "¿A qué hora abre la sesión de Londres en tu zona horaria?",
    },
    description: {
      en: "The London session open time is 08:00 UK local, 08:00 GMT in winter and 07:00 GMT in summer. See the London open in EST, IST and more, plus why BST shifts it.",
      es: "La sesión de Londres abre a las 08:00 hora del Reino Unido: 08:00 GMT en invierno y 07:00 GMT en verano. Ve la apertura en EST, IST y por qué el BST la mueve.",
    },
    date: "2026-07-24",
    authorSlug: "author",
    tags: {
      en: ["Sessions", "London"],
      es: ["Sesiones", "Londres"],
    },
    cover: "/blog/what-time-does-the-london-session-open.svg",
    body: {
      en: `The London session opens at 08:00 UK local time. That's 08:00 GMT in winter and 07:00 GMT in summer, under British Summer Time. Because it's anchored to London's clock, the open lands at a different hour in your own timezone depending on the time of year. This guide shows the exact London open across the major timezones and explains why it moves.

For most retail traders, the London session is the single most important block of the trading day. It carries the largest share of global turnover and sets the tone for the European morning, then feeds straight into the afternoon overlap with New York. Knowing exactly when it opens where you live clears up a common source of confusion, especially in the weeks around the daylight-saving changeovers, when the GMT figure quietly shifts by an hour.

## London session hours: open and close

The London session runs from about **08:00 to 17:00 UK local time**, every weekday. That's the reference point that never changes. Whatever the calendar says, the London trading day is built around London's own clock: it opens early in the UK morning and winds down in the late afternoon.

The part that trips people up is how those local hours map to GMT. In winter the United Kingdom is on Greenwich Mean Time, so 08:00 local is also **08:00 GMT** and the 17:00 local close is **17:00 GMT**. In summer the UK switches to British Summer Time, which is GMT+1, so that same 08:00 local open reads as **07:00 GMT** and the 17:00 local close reads as **16:00 GMT**.

So there are really two things to hold in mind at once. The local London window stays put at roughly 08:00 to 17:00 all year. The GMT window, though, is 08:00 to 17:00 in winter and 07:00 to 16:00 in summer. Both are correct; they just describe the session from two different reference frames. Think in London local time and the session never seems to move. Think in GMT, or in your own fixed offset from it, and the session appears to shift by an hour twice a year.

## Why the London open is 07:00 or 08:00 GMT: the BST effect

The reason the London open flips between 07:00 and 08:00 GMT is daylight saving time in the United Kingdom, known as British Summer Time, or BST.

For part of the year the UK observes Greenwich Mean Time, and GMT is the baseline the whole world sets its offset against. While the UK is on GMT, London local time and GMT are identical, so the 08:00 local open is 08:00 GMT. Then, on the last Sunday of March, UK clocks move forward one hour and the country switches to BST, which is GMT+1. The local schedule doesn't change, so the market still opens at 08:00 in London, but since the clock has jumped ahead, that same moment is now 07:00 GMT. On the last Sunday of October, clocks go back an hour, the UK returns to GMT, and the open returns to 08:00 GMT.

The practical effect: for roughly seven months of the year, from late March to late October, the London open in GMT is an hour earlier than most reference tables suggest. Read a static list of session hours in GMT and you'll be an hour off all summer, unless the table flags the BST adjustment.

It's also why the London open can seem to drift in your own timezone. If your country changes its clocks on different dates than the UK, there will be short windows, usually a week or two in spring and autumn, when the usual gap between London and your city is off by an hour. The UK's official changeover dates are published by the government at [gov.uk/when-do-the-clocks-change](https://www.gov.uk/when-do-the-clocks-change).

## The London open in major timezones

Because the London session is anchored to UK local time, the open falls at a different hour in each part of the world, and it shifts by an hour when the UK moves in or out of BST. The table below gives the London open across a range of major zones, for both the winter case, when London is on GMT, and the summer case, when London is on BST.

| Your city / zone | London open (UK winter, GMT) | London open (UK summer, BST) |
| --- | --- | --- |
| London (UK local) | 08:00 | 08:00 |
| New York (EST/EDT) | 03:00 | 02:00 |
| Chicago (CST/CDT) | 02:00 | 01:00 |
| Los Angeles (PST/PDT) | 00:00 | 23:00 (prev day) |
| Frankfurt / Paris (CET/CEST) | 09:00 | 09:00 |
| Istanbul (TRT) | 11:00 | 10:00 |
| Dubai (GST) | 12:00 | 11:00 |
| Mumbai (IST) | 13:30 | 12:30 |
| Singapore (SGT) | 16:00 | 15:00 |
| Sydney (AEST/AEDT) | 19:00 | 17:00 |

A few of these deserve a note. New York and the other North American zones keep their own daylight-saving calendar, so the clean one-hour relationship shown here holds most of the year but breaks during the short spring and autumn windows when the UK and the US change clocks on different dates. Istanbul and Dubai stay on a fixed offset all year, so their column just follows the UK's BST switch. Sydney runs on the Southern Hemisphere calendar, with summer and winter reversed relative to the UK, and that's why its two columns differ by two hours rather than one.

Rather than track all of this by hand, the [forexmarkethours.app](/) tool converts every session, the London open and close included, into your own timezone automatically and keeps pace with the daylight-saving changes on both sides. You can also review the full breakdown in our [forex market hours by timezone](/en/blog/forex-market-hours-by-timezone) guide.

## Why the London open moves the market

By turnover, London is the largest foreign-exchange trading centre in the world. The Bank for International Settlements, in its Triennial Central Bank Survey, consistently reports the United Kingdom handling the single biggest share of global FX activity, well ahead of any other financial centre. You can read the survey directly at [bis.org](https://www.bis.org/statistics/rpfx22.htm).

That concentration of activity is why the London open matters so much. When the session begins, a large pool of banks, funds, and corporate desks come online at once, and order volume jumps sharply against the quieter hours before it. A couple of things tend to follow. The open often sets the day's direction, or at least maps out the range the rest of the European and American sessions will trade around. And as genuine liquidity arrives, spreads on the major pairs usually tighten, because more participants are willing to quote both sides of the market.

The contrast with the hours before the open is stark. The late Asian session and the lull before Europe wakes up are usually thinner, with wider spreads and choppier price action. Once London arrives, the market generally feels more orderly and continuous, even if it can also be more volatile in that first hour. Deep liquidity plus meaningful movement: that combination is what makes the session central to how the trading day is structured.

If you want to see how London sits alongside Sydney, Tokyo, Frankfurt, and New York, our [forex trading sessions explained](/en/blog/forex-trading-sessions-explained) guide walks through each one and how they hand off to each other around the clock.

## The London-New York overlap

The busiest window of the entire trading day is the overlap between London and New York. For the several hours when both centres are open at once, roughly **13:00 to 17:00 GMT**, the two largest pools of FX liquidity are active together, and turnover hits its daily peak.

During this overlap you generally get the tightest spreads and the largest, most sustained moves, particularly on dollar pairs and the euro and pound crosses. European traders are still at their desks while American traders have just arrived, so order flow from both regions combines. The overlap also tends to coincide with US economic data in the early New York morning, which can add sharp bursts of movement on top of the already high volume.

Because it draws on London's turnover, the overlap inherits much of what makes the London session important, then amplifies it.
## Best currency pairs during the London session

The London session naturally puts the spotlight on pairs that involve the pound and the euro, since those are the currencies whose home markets are open and most active during these hours.

**GBP/USD** is the most direct expression of the session. With the UK market fully engaged and US participants arriving as the day goes on, the pair tends to see strong participation, healthy liquidity, and clear moves. It reacts at once to UK economic data too, which usually lands in the early morning around the open.

**EUR/USD** is the most heavily traded currency pair in the world, and the London session is one of its most active windows. Frankfurt and Paris are open alongside London, so European order flow is at its fullest, and the pair generally offers very tight spreads and deep liquidity right through the session.

**EUR/GBP** is a purely European cross that trades almost entirely within European hours, which makes the London session its natural home. It's useful for taking a view on the relative strength of the euro and the pound without the dollar in the mix, though it often moves in a narrower range than the dollar majors.

Beyond these, other euro and pound crosses like EUR/JPY and GBP/JPY also see elevated activity during London hours. The common thread is simple: the session favours pairs whose underlying markets are open, and for London that means the euro and the pound above all.
## Trading the London open: practical notes

The hour or two around the London open is one of the more active stretches of the day, and that carries practical implications worth understanding.

Volatility tends to rise as the session begins. The first hour after 08:00 UK time often carries some of the strongest directional movement of the morning, as accumulated orders from the Asian session and fresh European flow hit the market together. That can produce clean trends, but also sharp reversals and false starts, so the very first minutes can be noisy before a clearer picture forms.

News is a big factor at the open. UK economic releases, such as inflation, employment, and growth figures, commonly come out in the window from **07:00 to 08:00 GMT** in winter, or the equivalent local morning, and they can move the pound sharply just as the session gets underway. Statements and data from the [Bank of England](https://www.bankofengland.co.uk) fall into the same category. Knowing the day's scheduled releases helps explain sudden moves that might otherwise look random.

None of this is a recommendation to trade the open in any particular way. Higher volatility means larger moves in both directions, and the first-hour range can be as much a source of risk as of opportunity. The point here is just to describe what typically happens, not to suggest when or how anyone should enter or exit a position. Your own plan, risk tolerance, and circumstances should drive those decisions.

## Frequently asked questions

**What time is the London open in EST?**
In UK winter, when London is on GMT, the 08:00 London open is 03:00 EST. In UK summer, when London is on BST, it's 02:00 EST, assuming the US is also on daylight time. During the short spring and autumn windows when the UK and US change clocks on different dates, the exact figure can be off by an hour for a week or two.

**Does the London open change with daylight saving time?**
In London local terms, no; it stays at about 08:00 all year. In GMT terms, yes; it's 08:00 GMT in winter and 07:00 GMT in summer because of British Summer Time. So in your own timezone the open shifts by an hour twice a year, and possibly at slightly different moments if your country changes clocks on other dates.

**Is the London session good for beginners?**
It's the most liquid and active part of the day, which means tight spreads but also faster movement. Many traders find it a natural session to follow because so much happens in it, though the higher volatility around the open calls for care. This is general information, not advice about whether it suits your situation.

**When does the London session close?**
It closes around 17:00 UK local time, which is 17:00 GMT in winter and 16:00 GMT in summer under BST.

**Where can I see the London open in my own timezone?**
The [forexmarkethours.app](/) tool converts the London open and close, along with every other session, into your local time automatically, and it adjusts for daylight-saving changes on both sides.

*This article is for general information only and is not financial advice.*`,
      es: `La sesión de Londres abre a las 08:00 hora local del Reino Unido. Eso es 08:00 GMT en invierno y 07:00 GMT en verano, bajo el horario de verano británico. Como está anclada al reloj de Londres, la apertura cae a una hora distinta en tu propia zona horaria según la época del año. Esta guía muestra la apertura exacta de Londres en las principales zonas horarias y explica por qué se mueve.

Para la mayoría de los traders minoristas, la sesión de Londres es el bloque más importante del día de negociación. Concentra la mayor parte del volumen mundial y marca el tono de la mañana europea, y luego enlaza directamente con el solapamiento con Nueva York por la tarde. Saber con precisión cuándo abre en el lugar donde vives despeja una confusión muy habitual, sobre todo en las semanas cercanas a los cambios de horario, cuando la cifra en GMT se desplaza discretamente una hora.

## Horario de la sesión de Londres: apertura y cierre

La sesión de Londres va de aproximadamente las **08:00 a las 17:00 hora local del Reino Unido**, cada día laborable. Ese es el punto de referencia que nunca cambia. Diga lo que diga el calendario, el día de negociación de Londres se organiza en torno al propio reloj de Londres: abre temprano en la mañana británica y cierra a última hora de la tarde.

Lo que suele confundir es cómo se traducen esas horas locales al GMT. En invierno, el Reino Unido está en hora de Greenwich, así que las 08:00 locales son también las **08:00 GMT** y el cierre de las 17:00 locales, las **17:00 GMT**. En verano, el Reino Unido pasa al horario de verano británico, que es GMT+1, de modo que esa misma apertura a las 08:00 locales se lee como las **07:00 GMT** y el cierre de las 17:00 locales como las **16:00 GMT**.

Así que en realidad hay que tener dos cosas presentes a la vez. La ventana local de Londres se mantiene estable, de aproximadamente 08:00 a 17:00 todo el año. La ventana en GMT, en cambio, es de 08:00 a 17:00 en invierno y de 07:00 a 16:00 en verano. Ambas son correctas; solo describen la sesión desde dos marcos de referencia distintos. Si piensas siempre en hora local de Londres, la sesión nunca parece moverse. Si piensas en GMT, o en tu propio desfase fijo respecto a él, la sesión parece desplazarse una hora dos veces al año.

## Por qué la apertura de Londres es a las 07:00 o a las 08:00 GMT: el efecto BST

La razón por la que la apertura de Londres alterna entre las 07:00 y las 08:00 GMT es el horario de verano del Reino Unido, conocido como British Summer Time, o BST.

Durante parte del año, el Reino Unido observa la hora de Greenwich, y el GMT es la base sobre la que el mundo entero fija su desfase. Mientras el Reino Unido está en GMT, la hora local de Londres y el GMT coinciden, así que la apertura a las 08:00 locales son las 08:00 GMT. Luego, el último domingo de marzo, los relojes del Reino Unido se adelantan una hora y el país pasa al BST, que es GMT+1. El horario local no cambia, así que el mercado sigue abriendo a las 08:00 en Londres, pero como el reloj ha saltado hacia delante, ese mismo momento son ahora las 07:00 GMT. El último domingo de octubre, los relojes se atrasan una hora, el Reino Unido vuelve al GMT y la apertura regresa a las 08:00 GMT.

El efecto práctico: durante unos siete meses del año, de finales de marzo a finales de octubre, la apertura de Londres en GMT es una hora más temprana de lo que sugieren la mayoría de las tablas de referencia. Si lees una lista estática de horarios de sesión en GMT, te equivocarás en una hora todo el verano, salvo que la tabla señale el ajuste por el BST.

Eso también explica por qué la apertura de Londres puede parecer que se desplaza en tu propia zona horaria. Si tu país cambia los relojes en fechas distintas a las del Reino Unido, habrá periodos breves, normalmente una o dos semanas en primavera y otoño, en los que la diferencia habitual entre Londres y tu ciudad estará desfasada una hora. Las fechas oficiales de cambio del Reino Unido las publica el gobierno en [gov.uk/when-do-the-clocks-change](https://www.gov.uk/when-do-the-clocks-change).

## La apertura de Londres en las principales zonas horarias

Como la sesión de Londres está anclada a la hora local del Reino Unido, la apertura cae a una hora distinta en cada parte del mundo y se desplaza una hora cuando el Reino Unido entra o sale del BST. La tabla siguiente recoge la apertura de Londres en una serie de zonas importantes, tanto en el caso de invierno, cuando Londres está en GMT, como en el de verano, cuando está en BST.

| Tu ciudad / zona | Apertura de Londres (invierno UK, GMT) | Apertura de Londres (verano UK, BST) |
| --- | --- | --- |
| Londres (hora local UK) | 08:00 | 08:00 |
| Nueva York (EST/EDT) | 03:00 | 02:00 |
| Chicago (CST/CDT) | 02:00 | 01:00 |
| Los Ángeles (PST/PDT) | 00:00 | 23:00 (día anterior) |
| Fráncfort / París (CET/CEST) | 09:00 | 09:00 |
| Estambul (TRT) | 11:00 | 10:00 |
| Dubái (GST) | 12:00 | 11:00 |
| Bombay (IST) | 13:30 | 12:30 |
| Singapur (SGT) | 16:00 | 15:00 |
| Sídney (AEST/AEDT) | 19:00 | 17:00 |

Algunas de estas filas merecen una nota. Nueva York y las demás zonas de Norteamérica siguen su propio calendario de horario de verano, así que la relación limpia de una hora que ves aquí se cumple la mayor parte del año, pero se rompe durante los breves periodos de primavera y otoño en los que el Reino Unido y Estados Unidos cambian los relojes en fechas distintas. Estambul y Dubái se mantienen en un desfase fijo todo el año, de modo que su columna solo sigue el cambio de BST del Reino Unido. Sídney funciona con el calendario del hemisferio sur, con el verano y el invierno invertidos respecto al Reino Unido, y por eso sus dos columnas se diferencian en dos horas en lugar de una.

En vez de llevar todo esto a mano, la herramienta de [forexmarkethours.app](/es) convierte cada sesión, la apertura y el cierre de Londres incluidos, a tu propia zona horaria de forma automática y se mantiene al día con los cambios de horario de verano en ambos lados. También puedes revisar el desglose completo en nuestra guía sobre el [horario del mercado forex por zona horaria](/es/blog/horario-del-mercado-forex-por-zona-horaria).

## Por qué la apertura de Londres mueve el mercado

Por volumen, Londres es el mayor centro de negociación de divisas del mundo. El Banco de Pagos Internacionales, en su Encuesta Trienal de Bancos Centrales, informa una y otra vez de que el Reino Unido concentra la mayor cuota individual de la actividad forex mundial, muy por delante de cualquier otro centro financiero. Puedes consultar la encuesta directamente en [bis.org](https://www.bis.org/statistics/rpfx22.htm).

Esa concentración de actividad es la razón por la que la apertura de Londres importa tanto. Cuando comienza la sesión, un gran conjunto de bancos, fondos y mesas corporativas entran en línea a la vez, y el volumen de órdenes sube con fuerza frente a las horas más tranquilas que la preceden. Suelen seguir un par de cosas. La apertura a menudo marca la dirección del día, o al menos define el rango en torno al cual negociarán el resto de la sesión europea y la americana. Y a medida que llega liquidez genuina, los diferenciales de los pares principales suelen estrecharse, porque hay más participantes dispuestos a cotizar ambos lados del mercado.

El contraste con las horas anteriores a la apertura es marcado. La sesión asiática tardía y la calma previa a que Europa despierte suelen ser más delgadas, con diferenciales más amplios y un movimiento de precios más errático. Una vez que llega Londres, el mercado por lo general se siente más ordenado y continuo, aunque también pueda ser más volátil en esa primera hora. Liquidez profunda más movimiento significativo: esa combinación es lo que hace que la sesión sea central en la forma de estructurar el día de negociación.

Si quieres ver cómo encaja Londres junto a Sídney, Tokio, Fráncfort y Nueva York, nuestra guía de [sesiones de trading forex explicadas](/es/blog/sesiones-de-trading-forex-explicadas) repasa cada una y cómo se pasan el relevo a lo largo del día.

## El solapamiento entre Londres y Nueva York

La ventana más movida de toda la jornada es el solapamiento entre Londres y Nueva York. Durante las varias horas en que ambos centros están abiertos a la vez, aproximadamente de **13:00 a 17:00 GMT**, los dos mayores focos de liquidez del forex están activos juntos, y el volumen alcanza su máximo diario.

Durante este solapamiento se suelen ver los diferenciales más estrechos y los movimientos más amplios y sostenidos, sobre todo en los pares con el dólar y en los cruces del euro y la libra. Los traders europeos siguen en sus mesas mientras los estadounidenses acaban de llegar, de modo que el flujo de órdenes de ambas regiones se combina. El solapamiento también suele coincidir con datos económicos estadounidenses a primera hora de la mañana de Nueva York, lo que puede añadir estallidos bruscos de movimiento sobre un volumen ya elevado.

Como se apoya en el volumen de Londres, el solapamiento hereda gran parte de lo que hace importante a la sesión de Londres y después lo amplifica.
## Mejores pares de divisas durante la sesión de Londres

La sesión de Londres pone de forma natural el foco en los pares que involucran a la libra y al euro, ya que son las divisas cuyos mercados de origen están abiertos y más activos durante estas horas.

**GBP/USD** es la expresión más directa de la sesión. Con el mercado del Reino Unido plenamente activo y los participantes estadounidenses incorporándose a medida que avanza el día, el par suele registrar una participación fuerte, buena liquidez y movimientos claros. Y reacciona de inmediato a los datos económicos del Reino Unido, que suelen salir a primera hora de la mañana en torno a la apertura.

**EUR/USD** es el par de divisas más negociado del mundo, y la sesión de Londres es una de sus ventanas más activas. Fráncfort y París están abiertos junto a Londres, así que el flujo de órdenes europeo está en su punto más pleno, y el par suele ofrecer diferenciales muy estrechos y liquidez profunda a lo largo de toda la sesión.

**EUR/GBP** es un cruce puramente europeo que se negocia casi por completo dentro del horario europeo, lo que convierte a la sesión de Londres en su hogar natural. Sirve para tomar una postura sobre la fuerza relativa del euro y la libra sin el dólar de por medio, aunque a menudo se mueve en un rango más estrecho que los pares principales con el dólar.

Más allá de estos, otros cruces del euro y la libra como EUR/JPY y GBP/JPY también registran una actividad elevada durante el horario de Londres. El hilo común es sencillo: la sesión favorece a los pares cuyos mercados subyacentes están abiertos, y para Londres eso significa el euro y la libra por encima de todo.
## Operar en la apertura de Londres: notas prácticas

La hora o dos en torno a la apertura de Londres es uno de los tramos más activos del día, y eso tiene implicaciones prácticas que conviene entender.

La volatilidad tiende a subir cuando comienza la sesión. La primera hora tras las 08:00 hora del Reino Unido suele traer parte del movimiento direccional más fuerte de la mañana, ya que las órdenes acumuladas de la sesión asiática y el flujo europeo fresco golpean el mercado a la vez. Puede producir tendencias limpias, pero también reversiones bruscas y arranques en falso, así que los primeros minutos pueden ser ruidosos antes de que se forme una imagen más clara.

Las noticias son un factor importante en la apertura. Las publicaciones económicas del Reino Unido, como la inflación, el empleo y las cifras de crecimiento, suelen salir en la ventana de las **07:00 a las 08:00 GMT** en invierno, o la mañana local equivalente, y pueden mover la libra con fuerza justo cuando arranca la sesión. Las declaraciones y datos del [Banco de Inglaterra](https://www.bankofengland.co.uk) entran en la misma categoría. Conocer las publicaciones programadas para el día ayuda a explicar movimientos repentinos que de otro modo parecerían aleatorios.

Nada de esto debe leerse como una recomendación de operar la apertura de una forma concreta. Una mayor volatilidad significa movimientos más grandes en ambas direcciones, y el rango de la primera hora puede ser tanto una fuente de riesgo como de oportunidad. La intención aquí es solo describir lo que suele ocurrir, no sugerir cuándo o cómo debería nadie entrar o salir de una posición. Tu propio plan, tu tolerancia al riesgo y tus circunstancias son lo que debe guiar esas decisiones.

## Preguntas frecuentes

**¿A qué hora es la apertura de Londres en EST?**
En invierno del Reino Unido, cuando Londres está en GMT, la apertura de las 08:00 son las 03:00 EST. En verano del Reino Unido, cuando Londres está en BST, son las 02:00 EST, suponiendo que Estados Unidos también esté en horario de verano. Durante los breves periodos de primavera y otoño en que el Reino Unido y Estados Unidos cambian los relojes en fechas distintas, la cifra exacta puede desfasarse una hora durante una o dos semanas.

**¿Cambia la apertura de Londres con el horario de verano?**
En términos de hora local de Londres, no; se mantiene en torno a las 08:00 todo el año. En términos de GMT, sí; son las 08:00 GMT en invierno y las 07:00 GMT en verano por el horario de verano británico. Así que en tu propia zona horaria la apertura se desplaza una hora dos veces al año, y posiblemente en momentos algo distintos si tu país cambia los relojes en otras fechas.

**¿Es buena la sesión de Londres para principiantes?**
Es la parte más líquida y activa del día, lo que implica diferenciales estrechos pero también un movimiento más rápido. Muchos traders la ven como una sesión natural para seguir porque en ella ocurre mucho, aunque la mayor volatilidad en torno a la apertura exige cautela. Esto es información general, no un consejo sobre si te conviene según tu situación.

**¿Cuándo cierra la sesión de Londres?**
Cierra hacia las 17:00 hora local del Reino Unido, es decir, las 17:00 GMT en invierno y las 16:00 GMT en verano bajo el BST.

**¿Dónde puedo ver la apertura de Londres en mi propia zona horaria?**
La herramienta de [forexmarkethours.app](/es) convierte la apertura y el cierre de Londres, junto con todas las demás sesiones, a tu hora local de forma automática, y se ajusta a los cambios de horario de verano en ambos lados.

*Este artículo es solo informativo y no constituye asesoramiento financiero.*`,
    },
  },
  {
    slug: {
      en: "forex-market-hours-by-timezone",
      es: "horario-del-mercado-forex-por-zona-horaria",
    },
    title: {
      en: "Forex Market Hours by Timezone: GMT, EST, IST and AEST",
      es: "Horario del mercado forex por zona horaria: GMT, EST, IST y AEST",
    },
    description: {
      en: "Forex market hours in my timezone: convert the four sessions to GMT, EST, CET, IST, GST, SGT and AEST with clear tables and a live DST-aware tool.",
      es: "Horario del mercado forex en mi zona horaria: convierte las cuatro sesiones a GMT, EST, CET, IST, GST, SGT y AEST con tablas claras y conversor en vivo.",
    },
    date: "2026-07-25",
    authorSlug: "author",
    tags: {
      en: ["Timezones", "Basics"],
      es: ["Zonas horarias", "Fundamentos"],
    },
    cover: "/blog/forex-market-hours-by-timezone.svg",
    body: {
      en: `Forex session hours are almost always quoted in GMT. As a shared reference that makes sense: GMT never moves, and every trader can translate from it. The catch is that you don't trade in GMT. You trade on the clock on your wall, whether that reads Eastern Time, Central European Time, India Standard Time, Gulf Standard Time or Australian Eastern time. Converting the four major sessions to your own zone by hand is easy to get slightly wrong, and the errors get worse twice a year, when daylight saving shifts some zones but not others. This guide gives you clean conversion tables for the most common zones, shows exactly where fixed tables break, and points you to a live converter that reads your timezone for you.

## All four sessions in GMT: the baseline

Everything below starts from the same baseline: the standard-time (northern-hemisphere winter) windows for each major centre, in GMT. Learn these five rows and every other table in this article turns into a simple addition or subtraction.

| Session | Open (GMT) | Close (GMT) |
|---|---|---|
| Sydney | 22:00 | 07:00 |
| Tokyo | 00:00 | 09:00 |
| Frankfurt | 07:00 | 16:00 |
| London | 08:00 | 17:00 |
| New York | 13:00 | 22:00 |

These are standard-time windows. The market itself runs continuously from Sunday 22:00 GMT to Friday 22:00 GMT, then closes over the weekend. The session labels just mark when each regional trading centre is active. Notice that Sydney opens the global day and its window wraps past midnight, and that London and New York overlap from roughly 13:00 to 17:00 GMT, the busiest and most liquid stretch of the whole week. For more on what each session means, see our guide to the [forex trading sessions](/en/blog/forex-trading-sessions-explained).

## Forex hours in US time (EST/EDT)

For traders in the United States, US Eastern Time is the natural reference. Standard Eastern Time (EST) is GMT-5, so to convert any GMT session, subtract five hours.

| Session | Open (EST) | Close (EST) |
|---|---|---|
| Sydney | 17:00 | 02:00 |
| Tokyo | 19:00 | 04:00 |
| Frankfurt | 02:00 | 11:00 |
| London | 03:00 | 12:00 |
| New York | 08:00 | 17:00 |

The single most useful number here is the weekly open. Forex reopens on Sunday at 22:00 GMT, which is Sunday 17:00 EST, in other words 5 PM Eastern on Sunday afternoon. That's when the Sydney session begins and the trading week starts for US-based traders. The New York session itself runs from 08:00 to 17:00 Eastern, lining up neatly with a normal working day.

If you're further west, adjust from Eastern. Central Time (CST) is one hour behind Eastern, so the Sunday open is 16:00 and New York runs 07:00 to 16:00. Pacific Time (PST) is three hours behind Eastern, which puts the Sunday open at 14:00 and New York at 05:00 to 14:00. One reminder: from mid-March to early November the US uses Eastern Daylight Time (EDT, GMT-4), so subtract four hours instead of five during that stretch, which covers most of the year.

## Forex hours in Europe (CET/CEST)

Continental Europe, from Frankfurt and Paris to Madrid, Rome and Amsterdam, uses Central European Time. Standard CET is GMT+1, so add one hour to each GMT figure.

| Session | Open (CET) | Close (CET) |
|---|---|---|
| Sydney | 23:00 | 08:00 |
| Tokyo | 01:00 | 10:00 |
| Frankfurt | 08:00 | 17:00 |
| London | 09:00 | 18:00 |
| New York | 14:00 | 23:00 |

For a trader in Frankfurt or Madrid, the local session opens at 08:00 CET and the London session an hour later, at 09:00. The high-liquidity London-New York overlap falls between 14:00 and 18:00 CET, comfortably inside the afternoon. The weekly open of Sunday 22:00 GMT lands at 23:00 CET on Sunday night. From late March to late October, continental Europe switches to Central European Summer Time (CEST, GMT+2); during those months add two hours instead of one. And here's the detail that trips people up: London is one hour behind Frankfurt, so the London session runs on UK time, not CET.

## Forex hours in India (IST)

India Standard Time is GMT+5:30, and India doesn't observe daylight saving. That keeps the Indian table stable all year, a genuine convenience, though the half-hour offset means the local times land on the half hour. Add five hours and thirty minutes to each GMT figure.

| Session | Open (IST) | Close (IST) |
|---|---|---|
| Sydney | 03:30 | 12:30 |
| Tokyo | 05:30 | 14:30 |
| Frankfurt | 12:30 | 21:30 |
| London | 13:30 | 22:30 |
| New York | 18:30 | 03:30 |

For an Indian trader, the London session opens at 13:30 IST in the early afternoon and New York at 18:30 IST in the evening. The London-New York overlap, the most active window of the day, runs from 18:30 to 22:30 IST, which suits people who work during the day and trade in the evening. Since India has no DST, these local times never change on the Indian side. What does move is the GMT anchor when the UK, Europe or the US shift to summer time, so during the northern-hemisphere summer the London and New York rows above arrive an hour earlier in IST. It's exactly the kind of cross-DST drift a static table can't capture on its own.

## Forex hours in the Gulf (GST)

Gulf Standard Time covers Dubai, Abu Dhabi, Muscat and the wider UAE and Oman region. GST is GMT+4 and, like India, the Gulf doesn't observe daylight saving. Add four hours to each GMT figure.

| Session | Open (GST) | Close (GST) |
|---|---|---|
| Sydney | 02:00 | 11:00 |
| Tokyo | 04:00 | 13:00 |
| Frankfurt | 11:00 | 20:00 |
| London | 12:00 | 21:00 |
| New York | 17:00 | 02:00 |

From Dubai, the London session opens at midday, 12:00 GST, and New York at 17:00 GST in the late afternoon. The London-New York overlap runs 17:00 to 21:00 GST, an evening window for Gulf-based traders. Istanbul traders can take a similar approach: Turkey uses GMT+3 year-round with no DST, so subtract one hour from every GST figure for Istanbul time, which puts the London open at 11:00 and New York at 16:00. Since neither the Gulf nor Turkey shifts clocks, the only variable is again the northern-hemisphere summer time on the London, Frankfurt and New York anchors.

## Forex hours in Asia-Pacific (SGT and AEST)

The Asia-Pacific region splits into two useful references. Singapore Standard Time (SGT) is GMT+8 with no daylight saving, and in practice traders across much of East and Southeast Asia share it. Add eight hours to GMT.

| Session | Open (SGT) | Close (SGT) |
|---|---|---|
| Sydney | 06:00 | 15:00 |
| Tokyo | 08:00 | 17:00 |
| Frankfurt | 15:00 | 00:00 |
| London | 16:00 | 01:00 |
| New York | 21:00 | 06:00 |

Australian Eastern time is the second reference, and it's trickier, because Australia does observe daylight saving in the southern-hemisphere summer, the opposite half of the year from the north. Standard Australian Eastern Time (AEST) is GMT+10; during the Australian summer, roughly October to April, it becomes AEDT at GMT+11. The table below uses standard AEST, so add ten hours to GMT.

| Session | Open (AEST) | Close (AEST) |
|---|---|---|
| Sydney | 08:00 | 17:00 |
| Tokyo | 10:00 | 19:00 |
| Frankfurt | 17:00 | 02:00 |
| London | 18:00 | 03:00 |
| New York | 23:00 | 08:00 |

For a Sydney trader in standard time, the local Sydney session runs a normal 08:00 to 17:00, London opens at 18:00 in the evening, and New York at 23:00 late at night. During Australian daylight saving, add one more hour to the AEST column.

## Why fixed conversion tables go wrong (DST)

Every table above is a snapshot of standard time. Why can't a printed table be trusted all year? It comes down to one fact: the sessions are anchored to local time in each trading centre, not to GMT. When a centre observes daylight saving, its clocks move forward, so the session moves relative to GMT even though GMT itself never changes.

The complication is that the world doesn't switch on the same day. The UK and the European Union change on the last Sunday of March and the last Sunday of October. The United States changes earlier in spring, on the second Sunday of March, and later in autumn, on the first Sunday of November. For a few weeks each spring and autumn, the US and Europe fall out of step, which briefly narrows or widens the London-New York overlap. Australia, in the southern hemisphere, shifts the opposite way and at opposite times of year. India, the Gulf, Singapore and Turkey, meanwhile, never shift at all.

Put those together and a single fixed table can be wrong for any zone on the day a relevant DST change lands on either side of the conversion. A trader in Mumbai doesn't change clocks, yet the London session still arrives an hour earlier in IST from late March, purely because London sprang forward. The only reliable method is to compute each session from live timezone rules, not from a table memorised months ago. For the London case in detail, see [what time the London session opens](/en/blog/what-time-does-the-london-session-open).

## Get your exact local hours automatically

Rather than juggling six offsets and two DST calendars in your head, let software do it. The [live converter on the homepage](/) reads your device timezone and its current daylight-saving state, then shows each session's open and close in your exact local time. It updates automatically when your region, or any of the trading centres, changes clocks, so the numbers are always current for the day you're looking at them.

If you trade across several regions, the tool is faster and safer than any static reference, because it removes the two error sources that catch people out: adding the wrong offset, and forgetting a DST change on the far side of the conversion. Open the [homepage](/) once, confirm your timezone, and the four sessions appear on your own clock.

## Frequently asked questions

**What are forex market hours in my timezone?** Take the GMT baseline (Sydney 22:00-07:00, Tokyo 00:00-09:00, Frankfurt 07:00-16:00, London 08:00-17:00, New York 13:00-22:00) and add or subtract your offset from GMT. For an exact, DST-aware answer, use the live converter on the homepage; it reads your timezone for you.

**Does forex trading time change with daylight saving?** Yes, in effect. GMT never changes, but when you convert to a zone that observes DST, the local clock hours move by an hour for part of the year. Different regions switch on different dates, so the overlaps can shift briefly.

**What time is the forex market open in India?** In India Standard Time (GMT+5:30, no DST), the London session runs about 13:30 to 22:30 IST and New York about 18:30 to 03:30 IST during the northern-hemisphere winter. From late March, the London and New York rows arrive an hour earlier because those centres move to summer time.

**What time does the New York session open?** New York runs 13:00 to 22:00 GMT in standard time, which is 08:00 to 17:00 US Eastern. The trading week itself reopens on Sunday at 5 PM Eastern.

**Is GMT the same as UTC for this?** For practical forex-hours purposes, yes. UTC and GMT line up closely enough that the conversion tables here are identical whether you start from GMT or UTC.

For a broader overview, see the [sessions explained guide](/en/blog/forex-trading-sessions-explained) or start converting on the [homepage](/).

Authoritative references: the [IANA time zone database](https://www.iana.org/time-zones) for canonical zone and DST rules, [timeanddate.com daylight saving](https://www.timeanddate.com/time/dst/) for switch dates, [gov.uk when the clocks change](https://www.gov.uk/when-do-the-clocks-change) for UK dates, and the [Bank for International Settlements](https://www.bis.org/) for foreign-exchange market context.

*This article is for general information only and is not financial advice.*`,
      es: `Los horarios de las sesiones del mercado forex casi siempre se expresan en GMT. Como referencia común tiene sentido: el GMT nunca cambia y cualquier operador puede convertir a partir de él. El problema es que tú no operas en GMT. Operas según el reloj de tu pared, ya marque hora del Este, hora central europea, hora estándar de India, hora estándar del Golfo u hora del este de Australia. Convertir las cuatro sesiones principales a tu propia zona a mano es fácil de equivocar por poco, y los errores empeoran dos veces al año, cuando el horario de verano desplaza unas zonas pero no otras. Esta guía te ofrece tablas de conversión limpias para las zonas más comunes, explica exactamente dónde fallan las tablas fijas y te lleva a un conversor en vivo que lee tu zona horaria automáticamente.

## Las cuatro sesiones en GMT: la base

Todo lo que sigue parte de la misma base: las ventanas en horario estándar (invierno del hemisferio norte) de cada centro principal, expresadas en GMT. Aprende estas cinco filas y cualquier otra tabla de este artículo se convierte en una simple suma o resta.

| Sesión | Apertura (GMT) | Cierre (GMT) |
|---|---|---|
| Sídney | 22:00 | 07:00 |
| Tokio | 00:00 | 09:00 |
| Fráncfort | 07:00 | 16:00 |
| Londres | 08:00 | 17:00 |
| Nueva York | 13:00 | 22:00 |

Estas son ventanas de horario estándar. El mercado en sí funciona de forma continua desde el domingo 22:00 GMT hasta el viernes 22:00 GMT, y luego cierra el fin de semana. Las etiquetas de cada sesión solo marcan cuándo está activo cada centro regional. Fíjate en que Sídney abre la jornada global y su ventana cruza la medianoche, y en que Londres y Nueva York se solapan aproximadamente entre las 13:00 y las 17:00 GMT, el tramo de mayor liquidez de toda la semana. Para saber más sobre lo que significa cada sesión, consulta nuestra guía de las [sesiones de trading forex](/es/blog/sesiones-de-trading-forex-explicadas).

## Horario del forex en hora de EE. UU. (EST/EDT)

Para los operadores de Estados Unidos, la hora del Este es la referencia natural. La hora estándar del Este (EST) es GMT-5, así que para convertir cualquier sesión en GMT, resta cinco horas.

| Sesión | Apertura (EST) | Cierre (EST) |
|---|---|---|
| Sídney | 17:00 | 02:00 |
| Tokio | 19:00 | 04:00 |
| Fráncfort | 02:00 | 11:00 |
| Londres | 03:00 | 12:00 |
| Nueva York | 08:00 | 17:00 |

El dato más útil aquí es la apertura semanal. El forex reabre el domingo a las 22:00 GMT, que son las 17:00 EST del domingo, es decir, las 5 de la tarde hora del Este. Ese es el momento en que empieza la sesión de Sídney y arranca la semana de trading para los operadores de EE. UU. La sesión de Nueva York en sí va de 08:00 a 17:00 hora del Este, lo que encaja bien con una jornada laboral normal.

Si estás más al oeste, ajusta desde la hora del Este. La hora central (CST) está una hora por detrás del Este, de modo que la apertura del domingo son las 16:00 y Nueva York va de 07:00 a 16:00. La hora del Pacífico (PST) está tres horas por detrás del Este, lo que sitúa la apertura del domingo a las 14:00 y Nueva York de 05:00 a 14:00. Un recordatorio: de mediados de marzo a principios de noviembre EE. UU. usa el horario de verano del Este (EDT, GMT-4), así que resta cuatro horas en lugar de cinco durante ese tramo, que es la mayor parte del año.

## Horario del forex en Europa (CET/CEST)

Europa continental, desde Fráncfort y París hasta Madrid, Roma y Ámsterdam, usa la hora central europea. La CET estándar es GMT+1, así que suma una hora a cada cifra en GMT.

| Sesión | Apertura (CET) | Cierre (CET) |
|---|---|---|
| Sídney | 23:00 | 08:00 |
| Tokio | 01:00 | 10:00 |
| Fráncfort | 08:00 | 17:00 |
| Londres | 09:00 | 18:00 |
| Nueva York | 14:00 | 23:00 |

Para un operador en Fráncfort o Madrid, la sesión local abre a las 08:00 CET y la de Londres una hora después, a las 09:00. El solape de alta liquidez entre Londres y Nueva York cae entre las 14:00 y las 18:00 CET, cómodamente dentro de la tarde. La apertura semanal del domingo 22:00 GMT llega a las 23:00 CET del domingo por la noche. De finales de marzo a finales de octubre, Europa continental pasa al horario de verano central europeo (CEST, GMT+2); durante esos meses suma dos horas en lugar de una. Y aquí está el detalle que confunde a mucha gente: Londres está una hora por detrás de Fráncfort, así que la sesión de Londres va en hora del Reino Unido, no en CET.

## Horario del forex en India (IST)

La hora estándar de India es GMT+5:30, e India no aplica horario de verano. Eso mantiene la tabla india estable todo el año, una auténtica comodidad, aunque el desfase de media hora hace que las horas locales caigan en la media hora. Suma cinco horas y treinta minutos a cada cifra en GMT.

| Sesión | Apertura (IST) | Cierre (IST) |
|---|---|---|
| Sídney | 03:30 | 12:30 |
| Tokio | 05:30 | 14:30 |
| Fráncfort | 12:30 | 21:30 |
| Londres | 13:30 | 22:30 |
| Nueva York | 18:30 | 03:30 |

Para un operador indio, la sesión de Londres abre a las 13:30 IST a primera hora de la tarde y la de Nueva York a las 18:30 IST por la noche. El solape entre Londres y Nueva York, la ventana más activa del día, va de 18:30 a 22:30 IST, lo que conviene a quienes trabajan de día y operan por la tarde-noche. Como India no tiene horario de verano, estas horas locales no cambian nunca en el lado indio. Lo que sí se mueve es el ancla GMT cuando el Reino Unido, Europa o EE. UU. pasan al horario de verano, de modo que durante el verano del hemisferio norte las filas de Londres y Nueva York de arriba llegan una hora antes en IST. Es justo el tipo de desfase entre horarios de verano que una tabla estática no puede captar por sí sola.

## Horario del forex en el Golfo (GST)

La hora estándar del Golfo abarca Dubái, Abu Dabi, Mascate y la región más amplia de los EAU y Omán. La GST es GMT+4 y, como India, el Golfo no aplica horario de verano. Suma cuatro horas a cada cifra en GMT.

| Sesión | Apertura (GST) | Cierre (GST) |
|---|---|---|
| Sídney | 02:00 | 11:00 |
| Tokio | 04:00 | 13:00 |
| Fráncfort | 11:00 | 20:00 |
| Londres | 12:00 | 21:00 |
| Nueva York | 17:00 | 02:00 |

Desde Dubái, la sesión de Londres abre al mediodía, a las 12:00 GST, y la de Nueva York a las 17:00 GST al final de la tarde. El solape entre Londres y Nueva York va de 17:00 a 21:00 GST, una ventana vespertina para los operadores del Golfo. Los operadores de Estambul pueden aplicar un enfoque similar: Turquía usa GMT+3 todo el año sin horario de verano, así que resta una hora a cada cifra GST para obtener la hora de Estambul, lo que sitúa la apertura de Londres a las 11:00 y Nueva York a las 16:00. Como ni el Golfo ni Turquía cambian de reloj, la única variable es de nuevo el horario de verano del hemisferio norte en las anclas de Londres, Fráncfort y Nueva York.

## Horario del forex en Asia-Pacífico (SGT y AEST)

La región de Asia-Pacífico se divide en dos referencias útiles. La hora estándar de Singapur (SGT) es GMT+8 sin horario de verano, y en la práctica la comparten operadores de gran parte de Asia oriental y del sudeste. Suma ocho horas al GMT.

| Sesión | Apertura (SGT) | Cierre (SGT) |
|---|---|---|
| Sídney | 06:00 | 15:00 |
| Tokio | 08:00 | 17:00 |
| Fráncfort | 15:00 | 00:00 |
| Londres | 16:00 | 01:00 |
| Nueva York | 21:00 | 06:00 |

La hora del este de Australia es la segunda referencia, y es más complicada, porque Australia sí aplica horario de verano en el verano del hemisferio sur, la mitad opuesta del año respecto al norte. La hora estándar del este de Australia (AEST) es GMT+10; durante el verano australiano, aproximadamente de octubre a abril, pasa a ser AEDT en GMT+11. La tabla siguiente usa AEST estándar, así que suma diez horas al GMT.

| Sesión | Apertura (AEST) | Cierre (AEST) |
|---|---|---|
| Sídney | 08:00 | 17:00 |
| Tokio | 10:00 | 19:00 |
| Fráncfort | 17:00 | 02:00 |
| Londres | 18:00 | 03:00 |
| Nueva York | 23:00 | 08:00 |

Para un operador de Sídney en horario estándar, la sesión local de Sídney va de unas 08:00 a 17:00, Londres abre a las 18:00 por la tarde y Nueva York a las 23:00 de la noche. Durante el horario de verano australiano, suma una hora más a la columna AEST.

## Por qué fallan las tablas de conversión fijas (horario de verano)

Cada tabla de arriba es una instantánea del horario estándar. ¿Por qué no puedes fiarte de una tabla impresa todo el año? Se reduce a un hecho: las sesiones están ancladas a la hora local de cada centro de negociación, no al GMT. Cuando un centro aplica horario de verano, sus relojes se adelantan, y por tanto la sesión se mueve respecto al GMT aunque el GMT no cambie nunca.

La complicación es que el mundo no cambia el mismo día. El Reino Unido y la Unión Europea cambian el último domingo de marzo y el último domingo de octubre. Estados Unidos cambia antes en primavera, el segundo domingo de marzo, y después en otoño, el primer domingo de noviembre. Durante unas semanas cada primavera y otoño, EE. UU. y Europa quedan desacompasados, lo que estrecha o amplía brevemente el solape entre Londres y Nueva York. Australia, en el hemisferio sur, cambia en sentido contrario y en épocas opuestas del año. India, el Golfo, Singapur y Turquía, en cambio, no cambian nunca.

Junta todo eso y una sola tabla fija puede ser incorrecta para cualquier zona el día en que ocurra un cambio de horario relevante en cualquiera de los dos lados de la conversión. Un operador en Bombay no cambia de reloj, pero la sesión de Londres aun así llega una hora antes en IST desde finales de marzo, únicamente porque Londres se adelantó. El único método fiable es calcular cada sesión a partir de reglas de zona horaria en vivo, no de una tabla memorizada meses atrás. Para el caso de Londres en detalle, ve [a que hora abre la sesion de Londres](/es/blog/a-que-hora-abre-la-sesion-de-londres).

## Obtén tu horario local exacto de forma automática

En lugar de llevar seis desfases y dos calendarios de horario de verano en la cabeza, deja que lo haga el software. El [conversor en vivo de la pagina de inicio](/es) lee la zona horaria de tu dispositivo y su estado actual de horario de verano, y luego muestra la apertura y el cierre de cada sesión en tu hora local exacta. Se actualiza automáticamente cuando tu región, o cualquiera de los centros de negociación, cambia de reloj, de modo que las cifras están siempre al día para el día en que las consultas.

Si operas en varias regiones, la herramienta es más rápida y segura que cualquier referencia estática, porque elimina las dos fuentes de error que atrapan a la gente: sumar el desfase equivocado y olvidar un cambio de horario de verano en el otro lado de la conversión. Abre la [pagina de inicio](/es) una vez, confirma tu zona horaria y las cuatro sesiones quedan dispuestas en tu propio reloj.

## Preguntas frecuentes

**¿Cuál es el horario del mercado forex en mi zona horaria?** Toma la base en GMT (Sídney 22:00-07:00, Tokio 00:00-09:00, Fráncfort 07:00-16:00, Londres 08:00-17:00, Nueva York 13:00-22:00) y suma o resta tu desfase respecto al GMT. Para una respuesta exacta y ajustada al horario de verano, usa el conversor en vivo de la página de inicio; lee tu zona horaria por ti.

**¿Cambia el horario del forex con el horario de verano?** Sí, en la práctica. El GMT no cambia nunca, pero al convertir a una zona que aplica horario de verano, las horas del reloj local se mueven una hora durante parte del año. Distintas regiones cambian en fechas distintas, así que los solapes pueden desplazarse brevemente.

**¿A qué hora abre el mercado forex en India?** En hora estándar de India (GMT+5:30, sin horario de verano), la sesión de Londres va de unas 13:30 a 22:30 IST y la de Nueva York de unas 18:30 a 03:30 IST durante el invierno del hemisferio norte. Desde finales de marzo, las filas de Londres y Nueva York llegan una hora antes porque esos centros pasan al horario de verano.

**¿A qué hora abre la sesión de Nueva York?** Nueva York va de 13:00 a 22:00 GMT en horario estándar, lo que son las 08:00 a 17:00 hora del Este de EE. UU. La semana de trading en sí reabre el domingo a las 5 de la tarde hora del Este.

**¿Es lo mismo GMT que UTC para esto?** A efectos prácticos del horario forex, sí. UTC y GMT coinciden lo suficiente como para que las tablas de conversión de aquí sean idénticas, empieces por GMT o por UTC.

Para una visión más amplia, ve la [guia de sesiones explicadas](/es/blog/sesiones-de-trading-forex-explicadas) o empieza a convertir en la [pagina de inicio](/es).

Referencias autorizadas: la [base de datos de zonas horarias IANA](https://www.iana.org/time-zones) para las reglas canónicas de zonas y horario de verano, [timeanddate.com horario de verano](https://www.timeanddate.com/time/dst/) para las fechas de cambio, [gov.uk cuando cambian los relojes](https://www.gov.uk/when-do-the-clocks-change) para las fechas del Reino Unido, y el [Banco de Pagos Internacionales](https://www.bis.org/) para el contexto del mercado de divisas.

*Este artículo es solo informativo y no constituye asesoramiento financiero.*`,
    },
  },
  {
    slug: {
      en: "is-the-forex-market-open-today",
      es: "esta-abierto-el-mercado-forex-hoy",
    },
    title: {
      en: "Is the Forex Market Open Today? Weekends and Holidays 2026",
      es: "¿Está abierto el mercado forex hoy? Fines de semana y festivos 2026",
    },
    description: {
      en: "Is the forex market open today? Forex runs 24/5, Sunday to Friday 5 PM ET, closed weekends. See the 2026 forex market holidays and low-liquidity days.",
      es: "¿Está abierto el mercado forex hoy? El forex opera 24/5, de domingo a viernes 5 PM ET, cerrado los fines de semana. Consulta los festivos forex de 2026.",
    },
    date: "2026-07-26",
    authorSlug: "author",
    tags: {
      en: ["Basics", "Holidays"],
      es: ["Fundamentos", "Festivos"],
    },
    cover: "/blog/is-the-forex-market-open-today.svg",
    body: {
      en: `The forex market is open 24 hours a day, five days a week, from Sunday 5 PM New York time to Friday 5 PM New York time, and it's closed on weekends. So if you're wondering whether forex is open today, the short answer is that it's open on weekdays and shut from Friday evening in New York until Sunday evening.

That simple rule covers most of the year. Still, there are details worth knowing: the exact open and close, the Sunday reopen, and the handful of major holidays that quietly drain liquidity even when the market is technically running. This guide walks through each one so you always know what to expect before you place a trade.

## When forex opens and closes each week

The forex week runs continuously from **Sunday 5 PM New York time** to **Friday 5 PM New York time**. In the northern-hemisphere winter that Sunday open lands at 22:00 GMT; during US daylight saving time it shifts to 21:00 GMT. The anchor is always 5 PM in New York, not a fixed GMT clock time, so stating it as 5 PM New York time keeps you correct all year.

The open coincides with the start of the Sydney session, the first major centre to come online after the weekend. Trading then rolls westward around the globe: Tokyo, then Frankfurt, then London, then New York, each handing liquidity to the next without a pause. The market never closes overnight during the week, because as one region winds down, another is already active.

At 5 PM New York time on Friday the New York session closes, and with no other major centre open, the market goes quiet for the weekend. There's no bell and no single exchange behind this. Forex has no central exchange at all; it's a decentralised network of banks, brokers, and other institutions. The weekly rhythm is simply the sum of when the world's major financial centres are staffed and settling trades.
## Why forex is closed on weekends

Forex closes on Saturday and Sunday because the banking system that underpins it stops settling trades. Spot forex transactions are ultimately cleared through the interbank market, and the banks in the major financial centres are closed over the weekend. Without banks to settle positions and provide pricing, there's no functioning market to trade in.

This is different from the way a stock exchange closes. An exchange is a single venue with published opening hours. Forex has no such venue, so the weekend closure is really the collective absence of the institutions that make prices. Once New York shuts on Friday and no other centre is open, quoting effectively stops until Sydney reopens on Sunday.

One practical consequence is the **weekend gap**. Prices freeze on Friday evening, but the world doesn't stop moving. Elections, central-bank statements, geopolitical events, economic news, all of it can happen while the market is closed. When trading resumes on Sunday, the first prices can appear at a noticeably different level than Friday's close, leaving a visible gap on the chart.

Because of gap risk, some traders trim or close positions before the weekend, and many are cautious about holding leveraged trades through Friday's close. Stop-loss orders may not fill at the intended price if the market reopens beyond them, since there's no continuous pricing to trade against over the weekend. Understanding this is part of managing risk around the closed period.

## The Sunday open, explained

The forex week reopens on **Sunday at 5 PM New York time**, when Sydney comes online. This is the quietest stretch of the trading week. Only the Asia-Pacific centres are active, volumes are light, and the deep liquidity of the London and New York sessions is still many hours off.

Thin liquidity at the Sunday open has real effects. Spreads, the gap between the buy and sell price, tend to be wider than during peak hours because fewer participants are quoting. Price can also move more sharply on relatively small orders, since there's less depth to absorb them. For these reasons, many traders treat the first hour or two of the week with caution rather than rushing in the moment it opens.

The Sunday open is also where the weekend gap becomes visible. If significant news broke while the market was closed, the opening prices reflect it right away. A large gap can trigger stops, create slippage, and set a volatile tone for the early Asian hours. Traders who watch the open often wait for spreads to normalise and for London to draw closer before committing to larger positions.

To see exactly when Sydney and the other centres come online in your own timezone, the live tool at [forexmarkethours.app](/) shows each session's status in real time. For more on how the sessions fit together, read our guide to the [forex trading sessions explained](/en/blog/forex-trading-sessions-explained).

## Forex market holidays in 2026

Here's the point that surprises many newcomers: **forex has no exchange holiday calendar**. With no central exchange, there's no official list of days the market is closed apart from weekends. Technically, it stays open on most public holidays.

What actually changes on major holidays is **liquidity**. When banks in a major centre are closed, the participants who normally provide pricing step away, so volumes fall and spreads widen even as quoting continues. On the biggest global holidays, such as Christmas Day and New Year's Day, several centres shut at once and conditions can be extremely thin. Individual currencies can also go quiet on their home country's public holiday: the US dollar around US Independence Day or Thanksgiving, the Japanese yen around Japanese national holidays, and so on.

The table below lists widely observed 2026 holidays that tend to thin FX liquidity. Treat it as a guide to when conditions may be poor, not as a schedule of market closures. Always confirm exact dates against an official source, since observed dates and bank holidays vary by country and year.

| Holiday | Date (2026) | Centres / currencies affected |
| --- | --- | --- |
| New Year's Day | Jan 1 | Global; most centres closed, very thin |
| Good Friday | Apr 3 | UK, Europe, US; broad thinning |
| Easter Monday | Apr 6 | UK and much of Europe |
| US Memorial Day | May 25 | US; USD pairs quieter |
| US Independence Day (observed) | Jul 3 | US; USD pairs quieter |
| US Labor Day | Sep 7 | US; USD pairs quieter |
| US Thanksgiving | Nov 26 | US; USD pairs quieter, thin afternoon |
| Christmas Day | Dec 25 | Global; most centres closed, very thin |
| Boxing Day | Dec 26 | UK, Europe, and others |

Watch out for the **half-days** around Christmas and New Year too. On Christmas Eve and New Year's Eve, and sometimes the days right after, many banks run shortened hours or skeleton desks. The market may be open on paper, but trading conditions in late December are often among the poorest of the year, with wide spreads and erratic moves on small volume.

## Open but thin: low-liquidity days

It helps to separate two very different situations: the market being **closed** and the market being **open but thin**. On weekends it's closed and you can't trade. On major holidays it's usually open, but liquidity can be so low that trading is inadvisable for many strategies.

On a thin holiday session, several things tend to happen at once. Spreads widen as fewer institutions quote prices. Depth drops, so a normal-sized order can push price further than usual. Moves turn erratic, with sharp spikes that reverse just as fast because there isn't enough two-way flow to steady the market. Economic data releases on these days can produce outsized reactions relative to their real importance.

For traders, the practical takeaway is caution. A wider spread raises the cost of getting in and out, which can turn an otherwise reasonable setup into a losing one. Thin conditions also make stops more likely to be hit by noise rather than genuine direction. Plenty of experienced traders simply cut size or stand aside on the biggest holidays, treating them as days to protect capital rather than chase opportunity. Knowing a day is technically open tells you little; knowing it's thin tells you how to behave.

## How to check if a session is open right now

The most reliable way to know whether forex is open today, and which sessions are live, is to check in your own timezone instead of converting GMT in your head. The live tool at [forexmarkethours.app](/) shows the current status of the Sydney, Tokyo, Frankfurt, London, and New York sessions, converted automatically to wherever you are.

It makes the overlaps easy to spot too, including the busy **London-New York overlap** around 13:00-17:00 GMT, when liquidity is deepest. If you prefer to reason in fixed reference points, our guide to [forex market hours by timezone](/en/blog/forex-market-hours-by-timezone) lists each session across a range of common zones.

## Public holidays vs bank holidays

The terms **public holiday** and **bank holiday** get used interchangeably, but the distinction matters for forex. What affects the market is whether the **banks** in a given centre are closed, since banks are the settlement layer beneath spot forex. A public holiday that keeps banks open has little effect; a bank holiday that shuts them thins liquidity in that centre's currency.

This is why the effect is often **currency-specific** rather than global. When UK banks close, the British pound and London-based liquidity take the biggest hit. When US banks close, the dollar and the New York session feel it most. When Japanese banks close, the yen and the Tokyo session quieten. A holiday in one country rarely stops the whole market, but it can noticeably dampen activity in the affected pairs while the rest of the world trades on.

The takeaway is to check holidays by centre, not just by calendar. A day that looks ordinary for your local pairs might land on a bank holiday in the home country of a currency you're trading, and that's enough to widen spreads and mute the moves you were expecting.

## Frequently asked questions

**Is forex open on Saturday?**
No. The forex market is closed all weekend, Saturday and Sunday, until the Sunday evening reopen. With banks in the major centres closed, there's no interbank settlement and no continuous pricing, so trading stops from Friday 5 PM New York time until Sunday.

**Is forex open on Christmas?**
Technically the market isn't formally closed, but on Christmas Day the major centres' banks are shut and liquidity is extremely thin. In practice most traders treat it as a non-trading day, and conditions around Christmas Eve and Boxing Day are poor as well. Confirm specifics with your broker.

**What time does forex open on Sunday?**
Forex opens on Sunday at 5 PM New York time, when the Sydney session begins. In GMT that's 22:00 in the northern-hemisphere winter and 21:00 during US daylight saving time, because the open is pinned to New York's clock rather than a fixed GMT time.

**Is forex open on New Year's Day?**
On January 1 the market isn't formally closed, but banks across most major centres are shut and liquidity is among the thinnest of the year. Combined with the half-days around New Year's Eve, late December and January 1 are best treated with caution.

**Is forex open today if today is a weekday?**
Yes. On any normal weekday the market is open around the clock. The only weekday caveats are the major holidays in the table above, when it stays open but can be very quiet. Check the live tool to confirm the current session status in your timezone.

For official references on when banks are closed, see the UK bank holiday schedule at [gov.uk](https://www.gov.uk/bank-holidays), the US Federal Reserve holiday schedule at [federalreserve.gov](https://www.federalreserve.gov/aboutthefed/k8.htm), background on the global FX market from the [Bank for International Settlements](https://www.bis.org/statistics/rpfx22.htm), and a general public-holiday reference such as [timeanddate.com](https://www.timeanddate.com/holidays/).

*This article is for general information only and is not financial advice.*`,
      es: `El mercado forex está abierto 24 horas al día, cinco días a la semana, desde el domingo a las 5 PM hora de Nueva York hasta el viernes a las 5 PM hora de Nueva York, y permanece cerrado los fines de semana. Así que si te preguntas si el forex está abierto hoy, la respuesta breve es que está abierto entre semana y cerrado desde el viernes por la tarde en Nueva York hasta el domingo por la noche.

Esa regla sencilla cubre la mayor parte del año. Aun así, hay detalles que conviene conocer: la apertura y el cierre exactos, la reapertura del domingo y el puñado de festivos importantes que reducen la liquidez en silencio aunque el mercado esté técnicamente en marcha. Esta guía repasa cada uno de ellos para que sepas siempre qué esperar antes de operar.

## Cuándo abre y cierra el forex cada semana

La semana de forex transcurre de forma continua desde el **domingo a las 5 PM hora de Nueva York** hasta el **viernes a las 5 PM hora de Nueva York**. En el invierno del hemisferio norte esa apertura del domingo cae a las 22:00 GMT; durante el horario de verano de EE. UU. se desplaza a las 21:00 GMT. El punto de anclaje es siempre las 5 PM en Nueva York, no una hora fija en GMT, así que expresarlo como las 5 PM hora de Nueva York te mantiene correcto todo el año.

La apertura coincide con el inicio de la sesión de Sídney, el primer centro importante que entra en línea tras el fin de semana. La negociación avanza luego hacia el oeste por todo el mundo: Tokio, después Fráncfort, después Londres y después Nueva York, cada uno cediendo liquidez al siguiente sin ninguna pausa. El mercado nunca cierra por la noche entre semana, porque cuando una región reduce su actividad, otra ya está en marcha.

A las 5 PM hora de Nueva York del viernes cierra la sesión de Nueva York y, sin ningún otro centro importante abierto, el mercado queda en silencio durante el fin de semana. No hay campana ni una única bolsa detrás de esto. El forex no tiene ninguna bolsa central; es una red descentralizada de bancos, brókeres y otras instituciones. El ritmo semanal es, simplemente, la suma de cuándo están operativos y liquidando operaciones los principales centros financieros del mundo.
## Por qué el forex cierra los fines de semana

El forex cierra los sábados y domingos porque el sistema bancario que lo sustenta deja de liquidar operaciones. Las transacciones de forex al contado se compensan en última instancia a través del mercado interbancario, y los bancos de los principales centros financieros están cerrados el fin de semana. Sin bancos que liquiden posiciones y fijen precios, no hay un mercado funcional en el que operar.

Esto es distinto de cómo cierra una bolsa de valores. Una bolsa es un único recinto con horarios de apertura publicados. El forex no tiene tal recinto, así que el cierre del fin de semana es en realidad la ausencia colectiva de las instituciones que forman los precios. En cuanto Nueva York cierra el viernes y ningún otro centro está abierto, la cotización se detiene en la práctica hasta que Sídney reabre el domingo.

Una consecuencia práctica es el **hueco del fin de semana** (gap). Los precios quedan congelados desde el viernes por la tarde, pero el mundo no se detiene. Elecciones, declaraciones de bancos centrales, acontecimientos geopolíticos, noticias económicas: todo eso puede ocurrir mientras el mercado está cerrado. Cuando la negociación se reanuda el domingo, los primeros precios pueden aparecer en un nivel notablemente distinto al cierre del viernes, dejando un hueco visible en el gráfico.

Por el riesgo de hueco, algunos operadores reducen o cierran posiciones antes del fin de semana, y muchos son cautelosos a la hora de mantener operaciones apalancadas durante el cierre del viernes. Las órdenes de stop-loss pueden no ejecutarse al precio previsto si el mercado reabre más allá de ellas, ya que no hay cotización continua contra la que operar durante el fin de semana. Comprender esto forma parte de gestionar el riesgo en torno al periodo cerrado.

## La apertura del domingo, explicada

La semana de forex reabre el **domingo a las 5 PM hora de Nueva York**, cuando Sídney entra en línea. Es el tramo más tranquilo de la semana de negociación. Solo los centros de Asia-Pacífico están activos, los volúmenes son ligeros y la profunda liquidez de las sesiones de Londres y Nueva York aún queda a muchas horas.

La escasa liquidez en la apertura del domingo tiene efectos reales. Los spreads, la diferencia entre el precio de compra y el de venta, tienden a ser más amplios que en las horas punta porque hay menos participantes cotizando. El precio también puede moverse con más brusquedad ante órdenes relativamente pequeñas, ya que hay menos profundidad para absorberlas. Por eso muchos operadores tratan la primera hora o dos de la semana con cautela en lugar de lanzarse a operar en cuanto abre.

La apertura del domingo es también donde se hace visible el hueco del fin de semana. Si surgieron noticias importantes mientras el mercado estaba cerrado, los precios de apertura las reflejan al instante. Un hueco grande puede activar stops, generar deslizamiento y marcar un tono volátil para las primeras horas asiáticas. Los operadores que vigilan la apertura suelen esperar a que los spreads se normalicen y a que se acerque Londres antes de asumir posiciones mayores.

Para ver exactamente cuándo entran en línea Sídney y los demás centros en tu propia zona horaria, la herramienta en vivo en [forexmarkethours.app](/) muestra el estado de cada sesión en tiempo real. Para saber más sobre cómo encajan las sesiones, lee nuestra guía sobre las [sesiones de trading forex explicadas](/es/blog/sesiones-de-trading-forex-explicadas).

## Festivos del mercado forex en 2026

Aquí está el punto que sorprende a muchos principiantes: **el forex no tiene un calendario de festivos de bolsa**. Como no hay una bolsa central, no existe una lista oficial de días en los que el mercado cierre aparte de los fines de semana. Técnicamente, permanece abierto en la mayoría de los festivos.

Lo que de verdad cambia en los festivos importantes es la **liquidez**. Cuando los bancos de un centro importante cierran, los participantes que normalmente fijan precios se retiran, así que los volúmenes caen y los spreads se amplían aunque la cotización continúe. En los mayores festivos globales, como el día de Navidad y el día de Año Nuevo, varios centros cierran a la vez y las condiciones pueden ser extremadamente escasas. Ciertas divisas también pueden quedar en silencio en el festivo de su país de origen: el dólar estadounidense en torno al Día de la Independencia o Acción de Gracias, el yen japonés en torno a los festivos nacionales de Japón, y así sucesivamente.

La tabla siguiente enumera festivos de 2026 ampliamente observados que tienden a reducir la liquidez en forex. Trátala como una guía de cuándo las condiciones pueden ser malas, no como un calendario de cierres del mercado. Confirma siempre las fechas exactas con una fuente oficial, ya que las fechas observadas y los festivos bancarios varían según el país y el año.

| Festivo | Fecha (2026) | Centros / divisas afectados |
| --- | --- | --- |
| Año Nuevo | 1 ene | Global; la mayoría de centros cerrados, muy escaso |
| Viernes Santo | 3 abr | Reino Unido, Europa, EE. UU.; reducción amplia |
| Lunes de Pascua | 6 abr | Reino Unido y gran parte de Europa |
| Día de los Caídos (EE. UU.) | 25 may | EE. UU.; pares con USD más tranquilos |
| Día de la Independencia de EE. UU. (observado) | 3 jul | EE. UU.; pares con USD más tranquilos |
| Día del Trabajo (EE. UU.) | 7 sep | EE. UU.; pares con USD más tranquilos |
| Acción de Gracias (EE. UU.) | 26 nov | EE. UU.; pares con USD más tranquilos, tarde escasa |
| Día de Navidad | 25 dic | Global; la mayoría de centros cerrados, muy escaso |
| Boxing Day | 26 dic | Reino Unido, Europa y otros |

Vigila también los **medios días** en torno a Navidad y Año Nuevo. En Nochebuena y Nochevieja, y a veces en los días justo posteriores, muchos bancos operan con horarios reducidos o con equipos mínimos. El mercado puede estar abierto sobre el papel, pero las condiciones de negociación a finales de diciembre suelen estar entre las peores del año, con spreads amplios y movimientos erráticos con poco volumen.

## Abierto pero escaso: días de baja liquidez

Conviene separar dos situaciones muy distintas: que el mercado esté **cerrado** y que esté **abierto pero escaso**. El fin de semana está cerrado y no puedes operar. En los festivos importantes suele estar abierto, pero la liquidez puede ser tan baja que operar resulta poco aconsejable para muchas estrategias.

En una sesión festiva escasa, tienden a ocurrir varias cosas a la vez. Los spreads se amplían al cotizar menos instituciones. La profundidad cae, así que una orden de tamaño normal puede empujar el precio más de lo habitual. Los movimientos se vuelven erráticos, con picos bruscos que se revierten con la misma rapidez porque no hay suficiente flujo en ambos sentidos para estabilizar el mercado. Las publicaciones de datos económicos en estos días pueden producir reacciones desproporcionadas respecto a su importancia real.

Para los operadores, la conclusión práctica es la cautela. Un spread más amplio eleva el coste de entrar y salir, lo que puede convertir una configuración por lo demás razonable en una perdedora. Las condiciones escasas también hacen que los stops salten con más facilidad por el ruido en lugar de por una dirección genuina. Muchos operadores experimentados sencillamente reducen el tamaño o se apartan en los mayores festivos, tratándolos como días para proteger el capital en lugar de buscar oportunidad. Saber que un día está técnicamente abierto dice poco; saber que es escaso te dice cómo comportarte.

## Cómo comprobar si una sesión está abierta ahora mismo

La forma más fiable de saber si el forex está abierto hoy, y qué sesiones están en marcha, es comprobarlo en tu propia zona horaria en lugar de convertir el GMT mentalmente. La herramienta en vivo en [forexmarkethours.app](/) muestra el estado actual de las sesiones de Sídney, Tokio, Fráncfort, Londres y Nueva York, convertido automáticamente a donde te encuentres.

También facilita detectar los solapamientos, incluido el concurrido **solapamiento Londres-Nueva York** en torno a las 13:00-17:00 GMT, cuando la liquidez es más profunda. Si prefieres razonar con puntos de referencia fijos, nuestra guía sobre el [horario del mercado forex por zona horaria](/es/blog/horario-del-mercado-forex-por-zona-horaria) enumera cada sesión en varias zonas comunes.

## Festivos públicos frente a festivos bancarios

Los términos **festivo público** y **festivo bancario** suelen usarse indistintamente, pero la distinción importa para el forex. Lo que afecta al mercado es si los **bancos** de un centro dado están cerrados, ya que los bancos son la capa de liquidación bajo el forex al contado. Un festivo público que mantiene los bancos abiertos tiene poco efecto; un festivo bancario que los cierra reduce la liquidez en la divisa de ese centro.

Por eso el efecto suele ser **específico de cada divisa** más que global. Cuando cierran los bancos del Reino Unido, la libra esterlina y la liquidez con base en Londres son las más afectadas. Cuando cierran los de EE. UU., el dólar y la sesión de Nueva York lo notan más. Cuando cierran los bancos japoneses, el yen y la sesión de Tokio se calman. Un festivo en un país rara vez detiene todo el mercado, pero puede reducir notablemente la actividad en los pares afectados mientras el resto del mundo sigue operando.

La conclusión es comprobar los festivos por centro, no solo por calendario. Un día que parece normal para tus pares locales podría caer en un festivo bancario en el país de origen de una divisa con la que operas, y eso basta para ampliar los spreads y amortiguar los movimientos que esperabas.

## Preguntas frecuentes

**¿Está abierto el forex el sábado?**
No. El mercado forex está cerrado todo el fin de semana, el sábado y el domingo, hasta la reapertura del domingo por la noche. Con los bancos de los principales centros cerrados, no hay liquidación interbancaria ni cotización continua, así que la negociación se detiene desde el viernes a las 5 PM hora de Nueva York hasta el domingo.

**¿Está abierto el forex en Navidad?**
Técnicamente el mercado no está formalmente cerrado, pero el día de Navidad los bancos de los principales centros están cerrados y la liquidez es extremadamente escasa. En la práctica, la mayoría de los operadores lo tratan como un día sin negociación, y las condiciones alrededor de Nochebuena y Boxing Day también son malas. Confirma los detalles con tu bróker.

**¿A qué hora abre el forex el domingo?**
El forex abre el domingo a las 5 PM hora de Nueva York, cuando comienza la sesión de Sídney. En GMT eso son las 22:00 en el invierno del hemisferio norte y las 21:00 durante el horario de verano de EE. UU., ya que la apertura está anclada al reloj de Nueva York y no a una hora fija en GMT.

**¿Está abierto el forex el día de Año Nuevo?**
El 1 de enero el mercado no está formalmente cerrado, pero los bancos de la mayoría de los centros importantes están cerrados y la liquidez está entre las más escasas del año. Sumado a los medios días en torno a Nochevieja, finales de diciembre y el 1 de enero conviene tratarlos con cautela.

**¿Está abierto el forex hoy si hoy es día laborable?**
Sí. En cualquier día laborable normal el mercado está abierto las 24 horas. Las únicas salvedades entre semana son los festivos importantes de la tabla anterior, cuando sigue abierto pero puede estar muy tranquilo. Consulta la herramienta en vivo para confirmar el estado actual de las sesiones en tu zona horaria.

Para referencias oficiales sobre cuándo cierran los bancos, consulta el calendario de festivos bancarios del Reino Unido en [gov.uk](https://www.gov.uk/bank-holidays), el calendario de festivos de la Reserva Federal de EE. UU. en [federalreserve.gov](https://www.federalreserve.gov/aboutthefed/k8.htm), información de contexto sobre el mercado global de divisas del [Banco de Pagos Internacionales](https://www.bis.org/statistics/rpfx22.htm) y una referencia general de festivos públicos como [timeanddate.com](https://www.timeanddate.com/holidays/).

*Este artículo es solo informativo y no constituye asesoramiento financiero.*`,
    },
  },
  {
    slug: {
      en: "tokyo-asian-forex-session",
      es: "sesion-forex-asiatica-tokio",
    },
    title: {
      en: "The Tokyo (Asian) Session: Hours, Best Pairs and Strategy",
      es: "La sesión de Tokio (asiática): horario, mejores pares y estrategia",
    },
    description: {
      en: "Asian session forex explained: Tokyo session hours in your timezone, why it runs range-bound, the best pairs to trade and how the range breaks at London.",
      es: "La sesión asiática forex explicada: horario de Tokio en tu zona, por qué es lateral, los mejores pares para operar y cómo el rango se rompe en Londres.",
    },
    date: "2026-07-27",
    authorSlug: "author",
    tags: {
      en: ["Sessions", "Strategy"],
      es: ["Sesiones", "Estrategia"],
    },
    cover: "/blog/tokyo-asian-forex-session.svg",
    body: {
      en: `The Tokyo session is the beating heart of the Asian trading day. When New York winds down and the European desks have long gone home, liquidity shifts east, and Tokyo becomes the reference point for how the currency market behaves through the Asian hours. For retail traders, the Asian session has a distinct personality: quieter, more contained, and often range-bound in a way the London and New York sessions rarely are. Getting a feel for that personality is the first step to trading it well, or to deciding it isn't for you. This article covers when the Tokyo session runs in your own timezone, what makes it different, which currency pairs tend to be most active, and how traders commonly approach a market that spends much of its time drifting inside a range.

## Tokyo session hours in your timezone

The Tokyo session runs roughly from **00:00 to 09:00 GMT**. In local Japanese time that maps to **09:00 to 18:00 JST**, since Japan sits at GMT+9. One detail matters more here than almost anywhere else in the forex calendar: Japan doesn't observe daylight saving time. So Tokyo's window in GMT stays stable all year, while sessions anchored to cities that shift their clocks, such as London and New York, move by an hour twice a year. When you're mapping the Asian session across seasons, Tokyo is the fixed post everything else rotates around.

Because the session is defined in local terms, the easiest way to know when it opens for you is to convert from GMT into your own zone. The table below shows the standard-time picture.

| City / Zone | Tokyo session open | Tokyo session close |
|---|---|---|
| GMT (UTC) | 00:00 | 09:00 |
| JST (Tokyo, GMT+9) | 09:00 | 18:00 |
| EST (New York, GMT-5) | 19:00 (prev day) | 04:00 |
| CET (Frankfurt, GMT+1) | 01:00 | 10:00 |

Remember that the EST and CET rows shift when those regions move to daylight time, while the GMT and JST rows don't. If you want the exact open in your location on any given date, the cleanest approach is to let a tool convert it live instead of doing the arithmetic by hand. Our [forex market hours by timezone](/en/blog/forex-market-hours-by-timezone) guide walks through that conversion in detail, and the homepage tool shows every session in your local time automatically.

## What makes the Asian session different

The defining feature of the Asian session is lower volatility. Next to London and New York, price tends to move in narrower ranges, and the pace is slower. There are structural reasons for this. The largest pools of forex liquidity sit in London and New York, and when those centers are closed, fewer participants are active. Thinner liquidity doesn't automatically mean chaos. More often it means price has less fuel to trend, so it settles into ranges and respects support and resistance more cleanly than when the European and American desks are firing.

The Asian session also runs on a different mix of information. Economic releases from Japan, Australia, New Zealand, and China land during these hours, along with commentary from the Bank of Japan and the Reserve Bank of Australia. That regional data flow can produce sharp, localized moves in the affected currencies, but between those events the broader market often drifts.

This calmer profile is why many traders describe Tokyo as a range-setter. The session frequently establishes a high and a low that later sessions use as reference levels. You'll often see a range built patiently through the Asian hours, then tested or broken when Europe arrives. None of this holds every single day; risk events, central bank surprises, and thin holiday liquidity can all upend the usual pattern. But as a baseline expectation, the Asian session rewards patience more than aggression. For a fuller comparison of how the five sessions differ in character, see our overview of [forex trading sessions explained](/en/blog/forex-trading-sessions-explained).

## Best currency pairs for the Tokyo session

The pairs with the most meaningful activity during the Asian session are those tied to the currencies whose home markets are open. That points first to the Japanese yen.

**USD/JPY** is the natural centerpiece. It's one of the most liquid pairs in the world, and during Tokyo hours it benefits from domestic order flow, exporter and importer hedging, and reactions to Japanese data and Bank of Japan communication. It tends to be relatively orderly, which suits traders who want a liquid yen instrument without the wider swings of the yen crosses.

**EUR/JPY** and **GBP/JPY** are the busier yen crosses. Both can move more than USD/JPY, and GBP/JPY in particular has a reputation for wider ranges and faster spikes, which cuts both ways: more opportunity, more risk. During pure Asian hours these crosses are often calmer than they get once Europe opens and the euro and pound sides wake up.

Beyond the yen, the **Australian dollar** and **New Zealand dollar** pairs deserve attention. Sydney is open through the early Asian block, Australian and New Zealand data prints during these hours, and China, the dominant trading partner for both economies, releases figures that ripple straight into AUD and NZD. **AUD/USD**, **NZD/USD**, and the cross **AUD/JPY** are all widely watched. AUD/JPY is especially characteristic of the session because it combines two currencies whose home markets are both active, which makes it a clean expression of Asian-hours sentiment. Pairs whose currencies are entirely tied to closed markets, such as certain European crosses, generally see thinner, less rewarding conditions until London arrives.

## The Sydney-Tokyo overlap

The Asian session isn't really a single-city event. Sydney opens first, around **22:00 GMT**, and its window runs to about **07:00 GMT**, overlapping the early part of the Tokyo session. Together, Sydney and Tokyo form what traders often call the Asian liquidity block: the stretch of the day when the Pacific and East Asian markets are both contributing flow.

This overlap matters for a few reasons. It's when Australian and New Zealand order flow meets the deeper liquidity of the Tokyo open, so the first hour or two after Tokyo comes online tends to be the most active part of the Asian day. Cross pairs that bridge the two regions, above all **AUD/JPY**, are the clearest beneficiaries, since both legs of the pair are trading in their home hours at once. Keep in mind that Sydney observes daylight saving time, and because it sits in the southern hemisphere its clock shift runs opposite to the northern seasons, so the Sydney portion of the block moves relative to GMT at different times of year than London or New York do.

## The Tokyo to London handover

The most important structural feature of the Asian session is what happens at its end. As Tokyo moves toward its close, the European day is beginning. Frankfurt opens around **07:00 GMT** and London follows at **08:00 GMT**, so for roughly the final couple of hours of Tokyo there's a brief handover as liquidity migrates from Asia into Europe.

This handover is where the range-setting character of the Asian session becomes practically useful. The high and low Tokyo establishes overnight frequently serve as the levels London tests. A very common sequence: a quiet, contained Asian range, then a decisive push through one edge of it as European volume floods in. The London open is one of the more energetic moments of the trading day, and the ranges patiently built during Asian hours are exactly the structures that energy tends to break.

For a trader, this cuts two ways. If you're trading the Asian session itself, keep in mind that your quiet range has an expiry: the calm can end abruptly when Europe arrives, and positions comfortable in a low-volatility environment can be caught out by the transition. If you're trading the London open, the Asian range hands you a ready-made map of levels to watch. Either way, the two sessions are best understood as a connected sequence, not isolated blocks. Our guide to [what time the London session opens](/en/blog/what-time-does-the-london-session-open) covers the European side of this handover in more depth.

## Range-trading the Asian session

Because the Asian session spends so much of its time inside ranges, the approach traders most often associate with it is range trading. This describes a common style, not a recommendation to use it; every method carries risk, and what follows is general information rather than advice.

The core idea is straightforward. In a market drifting sideways, some traders mark the boundaries of the range, the session high and the session low, or nearby support and resistance levels, and watch how price behaves as it approaches those edges. In a genuinely range-bound market, price often reverses near the boundaries rather than pushing straight through them. Traders working this style pay close attention to the levels the early Asian hours establish, and to whether price is respecting or ignoring them.

A few things make this style fit the session. Lower volatility means ranges tend to hold longer before breaking. Cleaner respect of support and resistance gives the boundaries more meaning. And the relative quiet leaves time to observe rather than react in a hurry.

The essential caveat is the London open. A range that has held all night is a prime candidate to break precisely when European volume arrives, so the same boundaries that contained price for hours can fail suddenly in the final stretch of the Asian session. Traders who focus on ranges during Asian hours generally treat the approach of the European open as the point where the assumptions behind range trading weaken, and many step back well before that transition. Risk control, position sizing, and awareness of scheduled data matter as much here as in any session.
## Common mistakes

A handful of avoidable errors show up again and again among traders new to the Asian session. One is expecting London-style volatility. Traders who cut their teeth on the European or American sessions sometimes carry over expectations of large, fast moves and grow frustrated when Tokyo refuses to deliver. The quiet is a feature of the session, not a malfunction, and trying to force trend-style trades into a range-bound market is a common way to rack up losses.

Another is ignoring Japanese data and holidays. Bank of Japan decisions, Japanese economic releases, and regional prints from Australia, New Zealand, and China can all inject sudden volatility into an otherwise calm session. Japanese public holidays, for their part, can drain liquidity further and make ranges even thinner and less reliable. A trader who doesn't check the regional calendar can be blindsided in both directions.

A third is over-trading. A quiet market offers fewer high-quality opportunities, and the temptation to manufacture activity, taking marginal trades just to be doing something, is strong when price is barely moving. In a low-volatility environment, patience and selectivity usually matter more than frequency.

## Frequently asked questions

**What time is the Asian session in forex?**
The Asian session, anchored on Tokyo, runs roughly 00:00 to 09:00 GMT, or 09:00 to 18:00 in Tokyo local time. Sydney opens earlier, around 22:00 GMT, and overlaps the first part of Tokyo. Convert those GMT times into your own zone to see the exact hours where you are.

**Is the Tokyo session good for beginners?**
Many beginners find the lower volatility of the Asian session easier to observe than the faster pace of London or New York, because there's more time to think and price tends to respect levels more cleanly. Even so, quieter doesn't mean safer; thin liquidity and sudden data-driven moves still carry real risk. This is general information, not advice.

**What are the best pairs for the Asian session?**
The most active pairs are the yen instruments, USD/JPY, EUR/JPY, and GBP/JPY, along with the Australian and New Zealand dollar pairs like AUD/USD, NZD/USD, and AUD/JPY, which benefit from Sydney being open and from Australian, New Zealand, and Chinese data.

**Does the Tokyo session observe daylight saving time?**
No. Japan doesn't use daylight saving time, so the Tokyo session stays at 00:00 to 09:00 GMT all year. Sessions in cities that shift their clocks, such as London and New York, move relative to GMT twice a year, but Tokyo doesn't.

**Why is the Asian session so quiet?**
The deepest forex liquidity sits in London and New York, and both are closed during Asian hours. With fewer major participants active, price has less momentum to trend and tends to settle into ranges until European volume shows up.

For authoritative background, the Bank for International Settlements publishes the definitive surveys of global foreign exchange turnover at https://www.bis.org, the Bank of Japan explains its policy and market operations at https://www.boj.or.jp/en/, and the Japan Exchange Group provides market and calendar information at https://www.jpx.co.jp/english/. Broader trader education on session behavior is available from reputable sources such as https://www.babypips.com.

*This article is for general information only and is not financial advice.*`,
      es: `La sesión de Tokio es el corazón de la jornada de trading asiática. Cuando Nueva York cierra y los operadores europeos hace tiempo que se marcharon, la liquidez se desplaza hacia el este, y Tokio se convierte en la referencia de cómo se comporta el mercado de divisas durante las horas asiáticas. Para el trader minorista, la sesión asiática tiene una personalidad propia: más tranquila, más contenida y a menudo lateral de una forma que las sesiones de Londres y Nueva York rara vez muestran. Hacerse con esa personalidad es el primer paso para operarla bien, o para decidir que no es para ti. Este artículo explica cuándo se desarrolla la sesión de Tokio en tu propia zona horaria, qué la hace diferente, qué pares de divisas suelen estar más activos y cómo los traders abordan habitualmente un mercado que pasa buena parte del tiempo moviéndose dentro de un rango.

## Horario de la sesión de Tokio en tu zona horaria

La sesión de Tokio se desarrolla aproximadamente de **00:00 a 09:00 GMT**. En hora local japonesa eso corresponde a **09:00 a 18:00 JST**, ya que Japón está en GMT+9. Un detalle importa aquí más que en casi cualquier otro punto del calendario forex: Japón no observa el horario de verano. Por eso la ventana de Tokio en GMT se mantiene estable todo el año, mientras que las sesiones ancladas a ciudades que cambian sus relojes, como Londres y Nueva York, se desplazan una hora dos veces al año. Cuando trazas la sesión asiática a lo largo de las estaciones, Tokio es el poste fijo alrededor del cual gira todo lo demás.

Como la sesión se define en términos locales, la forma más sencilla de saber cuándo abre para ti es convertirla desde GMT a tu propia zona. La siguiente tabla muestra el panorama en horario estándar.

| Ciudad / Zona | Apertura de Tokio | Cierre de Tokio |
|---|---|---|
| GMT (UTC) | 00:00 | 09:00 |
| JST (Tokio, GMT+9) | 09:00 | 18:00 |
| EST (Nueva York, GMT-5) | 19:00 (día previo) | 04:00 |
| CET (Fráncfort, GMT+1) | 01:00 | 10:00 |

Recuerda que las filas de EST y CET se desplazan cuando esas regiones adoptan el horario de verano, mientras que las de GMT y JST no cambian. Si quieres la apertura exacta en tu ubicación en una fecha concreta, lo más limpio es dejar que una herramienta la convierta en tiempo real en lugar de hacer los cálculos a mano. Nuestra guía sobre el [horario del mercado forex por zona horaria](/es/blog/horario-del-mercado-forex-por-zona-horaria) explica esa conversión en detalle, y la herramienta de la página principal muestra automáticamente cada sesión en tu hora local.

## Qué hace diferente a la sesión asiática

El rasgo que define a la sesión asiática es la menor volatilidad. Frente a Londres y Nueva York, el precio tiende a moverse en rangos más estrechos, y el ritmo es más lento. Hay razones estructurales para ello. Los mayores focos de liquidez forex están en Londres y Nueva York, y cuando esos centros están cerrados, hay menos participantes activos. Una liquidez más fina no significa automáticamente caos. Más a menudo significa que el precio tiene menos combustible para tender, así que se asienta en rangos y respeta los soportes y resistencias con más limpieza que cuando los operadores europeos y estadounidenses están a pleno rendimiento.

La sesión asiática también se rige por una mezcla distinta de información. Las publicaciones económicas de Japón, Australia, Nueva Zelanda y China llegan en estas horas, junto con los comentarios del Banco de Japón y del Banco de la Reserva de Australia. Ese flujo de datos regional puede producir movimientos bruscos y localizados en las divisas afectadas, pero entre esos eventos el mercado en general suele derivar.

Este perfil más calmado es la razón por la que muchos traders describen a Tokio como fijador de rangos. La sesión establece con frecuencia un máximo y un mínimo que las sesiones posteriores usan como niveles de referencia. Es habitual ver un rango construido con paciencia durante las horas asiáticas, y luego probado o roto cuando llega Europa. Nada de esto se cumple todos los días; los eventos de riesgo, las sorpresas de los bancos centrales y la liquidez reducida por festivos pueden alterar el patrón habitual. Pero como expectativa base, la sesión asiática premia la paciencia más que la agresividad. Para una comparación más completa de cómo difieren en carácter las cinco sesiones, consulta nuestro resumen de [las sesiones de trading forex explicadas](/es/blog/sesiones-de-trading-forex-explicadas).

## Mejores pares de divisas para la sesión de Tokio

Los pares que registran la actividad más significativa durante la sesión asiática son los ligados a las divisas cuyos mercados de origen están abiertos. Eso apunta en primer lugar al yen japonés.

**USD/JPY** es la pieza central natural. Es uno de los pares más líquidos del mundo, y en las horas de Tokio se beneficia del flujo de órdenes doméstico, de la cobertura de exportadores e importadores y de las reacciones a los datos japoneses y a la comunicación del Banco de Japón. Tiende a ser relativamente ordenado, lo que conviene a los traders que quieren un instrumento líquido en yenes sin las oscilaciones más amplias de los cruces del yen.

**EUR/JPY** y **GBP/JPY** son los cruces del yen más movidos. Ambos pueden desplazarse más que el USD/JPY, y el GBP/JPY en particular tiene fama de rangos más amplios y picos más rápidos, lo que corta por ambos lados: más oportunidad, más riesgo. En las horas puramente asiáticas estos cruces suelen ser más tranquilos de lo que se vuelven una vez que abre Europa y despiertan los lados del euro y la libra.

Más allá del yen, los pares del **dólar australiano** y del **dólar neozelandés** merecen atención. Sídney está abierto durante el bloque asiático temprano, los datos de Australia y Nueva Zelanda se publican en estas horas, y China, el socio comercial dominante de ambas economías, difunde cifras que repercuten directamente en el AUD y el NZD. **AUD/USD**, **NZD/USD** y el cruce **AUD/JPY** son todos muy observados. El AUD/JPY es especialmente característico de la sesión porque combina dos divisas cuyos mercados de origen están ambos activos, lo que lo convierte en una expresión limpia del sentimiento de las horas asiáticas. Los pares cuyas divisas están enteramente ligadas a mercados cerrados, como ciertos cruces europeos, suelen ver condiciones más finas y menos rentables hasta que llega Londres.

## El solapamiento Sídney-Tokio

La sesión asiática no es realmente un evento de una sola ciudad. Sídney abre primero, alrededor de las **22:00 GMT**, y su ventana llega hasta cerca de las **07:00 GMT**, solapándose con la primera parte de la sesión de Tokio. Juntas, Sídney y Tokio forman lo que los traders suelen llamar el bloque de liquidez asiático: el tramo del día en que los mercados del Pacífico y de Asia oriental aportan flujo a la vez.

Este solapamiento importa por varias razones. Es cuando el flujo de órdenes de Australia y Nueva Zelanda se encuentra con la liquidez más profunda de la apertura de Tokio, de modo que la primera hora o dos tras la puesta en marcha de Tokio suele ser la parte más activa de la jornada asiática. Los pares cruzados que unen ambas regiones, sobre todo el **AUD/JPY**, son los beneficiarios más claros, ya que ambas patas del par operan en sus horas de origen a la vez. Ten presente que Sídney observa el horario de verano y, al estar en el hemisferio sur, su cambio de reloj va en sentido opuesto a las estaciones del norte, de modo que la parte de Sídney del bloque se mueve respecto al GMT en momentos del año distintos a los de Londres o Nueva York.

## El relevo de Tokio a Londres

El rasgo estructural más importante de la sesión asiática es lo que ocurre al final. A medida que Tokio se acerca a su cierre, comienza la jornada europea. Fráncfort abre en torno a las **07:00 GMT** y Londres le sigue a las **08:00 GMT**, así que durante aproximadamente las últimas dos horas de Tokio hay un breve relevo mientras la liquidez migra de Asia a Europa.

Este relevo es donde el carácter fijador de rangos de la sesión asiática se vuelve prácticamente útil. El máximo y el mínimo que Tokio fija durante la noche sirven con frecuencia como los niveles que Londres pone a prueba. Una secuencia muy común: un rango asiático tranquilo y contenido, seguido de un impulso decisivo a través de uno de sus bordes cuando entra el volumen europeo. La apertura de Londres es uno de los momentos más enérgicos de la jornada, y los rangos construidos con paciencia durante las horas asiáticas son precisamente las estructuras que esa energía tiende a romper.

Para el trader, esto tiene dos caras. Si operas la sesión asiática en sí, ten presente que tu rango tranquilo tiene fecha de caducidad: la calma puede terminar de golpe cuando llega Europa, y las posiciones cómodas en un entorno de baja volatilidad pueden verse sorprendidas por la transición. Si operas la apertura de Londres, el rango asiático te ofrece un mapa listo de niveles a vigilar. En cualquier caso, las dos sesiones se entienden mejor como una secuencia conectada que como bloques aislados. Nuestra guía sobre [a qué hora abre la sesión de Londres](/es/blog/a-que-hora-abre-la-sesion-de-londres) cubre el lado europeo de este relevo con más profundidad.

## Operar en rango la sesión asiática

Como la sesión asiática pasa tanto tiempo dentro de rangos, el enfoque que los traders asocian con más frecuencia a ella es el trading de rango. Esto describe un estilo común, no una recomendación de usarlo; todo método conlleva riesgo, y lo que sigue es información general, no asesoramiento.

La idea central es sencilla. En un mercado que deriva de forma lateral, algunos traders marcan los límites del rango, el máximo y el mínimo de la sesión, o los niveles cercanos de soporte y resistencia, y observan cómo se comporta el precio a medida que se aproxima a esos bordes. En un mercado genuinamente lateral, el precio a menudo se gira cerca de los límites en lugar de atravesarlos directamente. Los traders que trabajan este estilo prestan mucha atención a los niveles que fijan las primeras horas asiáticas y a si el precio los respeta o los ignora.

Unas cuantas cosas hacen que este estilo encaje con la sesión. La menor volatilidad implica que los rangos tienden a aguantar más tiempo antes de romperse. Un respeto más limpio de soportes y resistencias da más significado a los límites. Y la relativa calma deja tiempo para observar en lugar de reaccionar con prisa.

La advertencia esencial es la apertura de Londres. Un rango que ha aguantado toda la noche es un candidato ideal a romperse justo cuando llega el volumen europeo, así que los mismos límites que contuvieron el precio durante horas pueden fallar de repente en el tramo final de la sesión asiática. Los traders que se centran en los rangos durante las horas asiáticas suelen tratar la proximidad de la apertura europea como el punto en que las premisas del trading de rango se debilitan, y muchos se apartan bastante antes de esa transición. El control del riesgo, el dimensionamiento de las posiciones y la atención a los datos programados importan tanto aquí como en cualquier sesión.
## Errores comunes

Un puñado de errores evitables aparece una y otra vez entre los traders nuevos en la sesión asiática. Uno es esperar volatilidad al estilo de Londres. Los traders que se formaron en las sesiones europea o estadounidense a veces trasladan expectativas de movimientos grandes y rápidos y se frustran cuando Tokio se niega a ofrecerlos. La calma es una característica de la sesión, no una avería, y tratar de forzar operaciones de tendencia en un mercado lateral es una forma habitual de acumular pérdidas.

Otro es ignorar los datos y festivos japoneses. Las decisiones del Banco de Japón, las publicaciones económicas japonesas y los datos regionales de Australia, Nueva Zelanda y China pueden inyectar volatilidad repentina en una sesión por lo demás tranquila. Los festivos públicos japoneses, por su parte, pueden drenar aún más la liquidez y hacer los rangos todavía más finos y menos fiables. Un trader que no revisa el calendario regional puede verse sorprendido en ambos sentidos.

Un tercero es sobreoperar. Un mercado tranquilo ofrece menos oportunidades de alta calidad, y la tentación de fabricar actividad, tomando operaciones marginales solo por hacer algo, es fuerte cuando el precio apenas se mueve. En un entorno de baja volatilidad, la paciencia y la selectividad suelen importar más que la frecuencia.

## Preguntas frecuentes

**¿A qué hora es la sesión asiática en forex?**
La sesión asiática, anclada en Tokio, se desarrolla aproximadamente de 00:00 a 09:00 GMT, o de 09:00 a 18:00 en hora local de Tokio. Sídney abre antes, hacia las 22:00 GMT, y se solapa con la primera parte de Tokio. Convierte esas horas GMT a tu propia zona para ver el horario exacto donde estás.

**¿Es buena la sesión de Tokio para principiantes?**
Muchos principiantes encuentran que la menor volatilidad de la sesión asiática es más fácil de observar que el ritmo más rápido de Londres o Nueva York, porque hay más tiempo para pensar y el precio tiende a respetar los niveles con más limpieza. Aun así, más tranquila no significa más segura; la liquidez fina y los movimientos repentinos por datos siguen conllevando riesgo real. Esto es información general, no asesoramiento.

**¿Cuáles son los mejores pares para la sesión asiática?**
Los pares más activos son los instrumentos del yen (USD/JPY, EUR/JPY y GBP/JPY), junto con los pares del dólar australiano y neozelandés como AUD/USD, NZD/USD y AUD/JPY, que se benefician de que Sídney esté abierto y de los datos de Australia, Nueva Zelanda y China.

**¿La sesión de Tokio observa el horario de verano?**
No. Japón no usa el horario de verano, así que la sesión de Tokio se mantiene de 00:00 a 09:00 GMT todo el año. Las sesiones en ciudades que cambian sus relojes, como Londres y Nueva York, se mueven respecto al GMT dos veces al año, pero Tokio no.

**¿Por qué es tan tranquila la sesión asiática?**
La liquidez forex más profunda está en Londres y Nueva York, y ambas están cerradas durante las horas asiáticas. Con menos grandes participantes activos, el precio tiene menos impulso para tender y tiende a asentarse en rangos hasta que aparece el volumen europeo.

Como base autorizada, el Banco de Pagos Internacionales publica los estudios de referencia sobre el volumen global de divisas en https://www.bis.org, el Banco de Japón explica su política y operaciones de mercado en https://www.boj.or.jp/en/, y el Japan Exchange Group ofrece información de mercado y calendario en https://www.jpx.co.jp/english/. Formación más amplia para traders sobre el comportamiento de las sesiones está disponible en fuentes reputadas como https://www.babypips.com.

*Este artículo es solo informativo y no constituye asesoramiento financiero.*`,
    },
  },
];

/** Rough reading time in minutes (~200 words/min). */
export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function resolve(post: Post, locale: BlogLocale): ResolvedPost {
  return {
    slug: post.slug[locale],
    slugs: post.slug,
    title: post.title[locale],
    description: post.description[locale],
    date: post.date,
    updated: post.updated,
    authorSlug: post.authorSlug,
    tags: post.tags[locale],
    cover: post.cover,
    body: post.body[locale],
  };
}

/**
 * Scheduled publishing. A post goes live at 00:00 UTC on its `date`; until then
 * it is hidden from every surface, the listing, the homepage preview, the
 * sitemap, author pages, and its own URL (which 404s). This is what powers the
 * day-by-day automatic rollout: future-dated posts are committed now and reveal
 * themselves on their date. It works because the blog routes are ISR
 * (`export const revalidate` re-evaluates this gate over time), so no deploy or
 * external cron is needed, the site simply re-renders and the gate lets the
 * post through once its date has arrived.
 *
 * Set BLOG_SHOW_DRAFTS=1 in the environment (e.g. a Netlify deploy preview) to
 * see unpublished posts while drafting.
 */
export function isPublished(post: Pick<Post, "date">, now: number = Date.now()): boolean {
  if (process.env.BLOG_SHOW_DRAFTS === "1") return true;
  return Date.parse(`${post.date}T00:00:00Z`) <= now;
}

export function getAllPosts(locale: BlogLocale): ResolvedPost[] {
  return [...POSTS]
    .filter((p) => isPublished(p))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => resolve(p, locale));
}

/** Find a post by its slug in the given locale (only if already published). */
export function getPost(slug: string, locale: BlogLocale): ResolvedPost | undefined {
  const post = POSTS.find((p) => p.slug[locale] === slug);
  return post && isPublished(post) ? resolve(post, locale) : undefined;
}

export function getPostsByAuthor(authorSlug: string, locale: BlogLocale): ResolvedPost[] {
  return getAllPosts(locale).filter((p) => p.authorSlug === authorSlug);
}
