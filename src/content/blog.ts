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

import type { LocaleCode } from "@/i18n/locales";

export type BlogLocale = LocaleCode;

/**
 * Per-locale content. Deliberately `Partial`: a language can go live with only
 * part of the blog translated, and the posts it is missing stay invisible in
 * that locale instead of falling back to English. That keeps every published
 * URL genuinely in its own language, so there is no thin machine-shaped page
 * and no hreflang alternate pointing at content in the wrong language.
 *
 * `hasTranslation()` is the gate; see also the scheduled-locale rollout in
 * @/i18n/locales, which is the same idea one level up.
 */
type Localized<T> = Partial<Record<BlogLocale, T>>;

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
  /** Every locale this post exists in, so pages can emit honest hreflang. */
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
      fr: "seances-de-trading-forex-expliquees",
    },
    title: {
      en: "Forex Trading Sessions Explained: The Four Major Markets",
      es: "Sesiones de trading en forex explicadas: los cuatro mercados principales",
      fr: "Séances de trading forex expliquées : les quatre marchés",
    },
    description: {
      en: "Forex trading sessions explained: Sydney, Tokyo, London and New York hours in GMT, how they overlap, and how to see each session in your own timezone.",
      es: "Sesiones de trading en forex explicadas: horarios de Sídney, Tokio, Londres y Nueva York en GMT, sus solapamientos y cómo verlas en tu zona horaria.",
      fr: "Les séances de trading forex expliquées : horaires de Sydney, Tokyo, Londres et New York en GMT, leurs chevauchements et comment les voir dans votre fuseau.",
    },
    date: "2026-07-23",
    authorSlug: "author",
    tags: {
      en: ["Sessions", "Basics"],
      es: ["Sesiones", "Fundamentos"],
      fr: ["Séances", "Bases"],
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
      fr: `Pendant la semaine de travail, le marché des changes ne dort jamais vraiment. Les échanges se déroulent 24 heures sur 24, cinq jours par semaine, passant d’une place financière à l’autre au fil de la rotation de la Terre. Les traders expérimentés, pourtant, se le représentent rarement comme un bloc de temps unique. Ils raisonnent en **séances** : Sydney, Tokyo, Londres et New York. Chacune a son rythme, ses devises et son niveau d’activité. Cet article explique ce que sont les quatre grandes séances de trading forex, quand elles se déroulent, comment elles se chevauchent, et pourquoi cette distinction compte quand vous décidez à quel moment trader.

## Pourquoi le forex fonctionne par séances, et non comme un marché unique

Contrairement à une bourse d’actions, le forex n’a ni bâtiment central ni cloche d’ouverture unique. Les échanges se font de gré à gré, à travers un réseau mondial de banques, de courtiers et d’institutions. La liquidité, c’est-à-dire le volume d’acheteurs et de vendeurs prêts à traiter, suit la journée de travail autour du globe. Quand les grandes banques d’une région ouvrent leurs portes, l’activité y monte. Quand elles ferment pour la soirée, elle retombe.

Voyez cela comme un relais. La journée de travail australienne se termine au moment où l’Asie se met en route. Tokyo commence à s’assoupir, et l’Europe se réveille. Lorsque Londres avance dans son après-midi, New York ouvre. Ce passage de témoin se répète chaque jour ouvré, et c’est ce qui permet au marché de rester ouvert en continu, de l’ouverture du dimanche soir à la clôture du vendredi soir, sans qu’aucune place n’ait besoin de rester éveillée en permanence.

La semaine commence le dimanche à 22:00 GMT, soit 17h00 à New York, au moment où Sydney entre en scène. Elle se termine le vendredi à 22:00 GMT, là encore 17h00 heure de New York, puis tout reste fermé le week-end. Au fond, comprendre la structure des séances revient simplement à comprendre comment la journée de travail voyage autour du monde.

## Les quatre grandes séances du forex en un coup d’œil

Les quatre séances que suivent la plupart des traders sont rattachées aux grandes places financières. Le tableau ci-dessous montre les plages en heure standard, exprimées en GMT. Elles se décalent d’une heure lorsque l’heure d’été s’applique, puisque chaque séance suit l’heure locale de sa propre ville plutôt que le GMT.

| Séance | Place financière | Horaires (GMT, heure standard) | Caractère |
|---|---|---|---|
| Sydney | Sydney | 22:00 - 07:00 | Ouvre la semaine, liquidité plus faible, focus AUD et NZD |
| Tokyo | Tokyo | 00:00 - 09:00 | Échanges asiatiques, paires JPY actives, souvent en range |
| Londres | Londres | 08:00 - 17:00 | La plus grande en volume, donne l’essentiel de la direction du jour |
| New York | New York | 13:00 - 22:00 | Portée par l’USD, forte volatilité, chevauche Londres |

Il existe une cinquième place qui mérite d’être citée. **Francfort**, le cœur de la séance européenne, ouvre vers 07:00 GMT, environ une heure avant Londres. Beaucoup de traders considèrent que la séance européenne commence avec Francfort puis s’approfondit quand Londres s’y joint. Comme Londres domine le volume européen, on appelle généralement l’ensemble la séance de Londres. Ces plages se chevauchent volontairement, et c’est dans ce chevauchement que se déroulent les échanges les plus importants de la journée, comme nous allons le voir.

## La séance de Sydney

Sydney ouvre la semaine de trading. Entrant en scène le dimanche soir GMT, c’est la première grande place à rouvrir après le week-end, et sa plage en heure standard va de 22:00 à 07:00 GMT. Sydney constitue donc le démarrage calme du relais mondial plutôt qu’un pic d’activité.

La liquidité pendant les heures purement australiennes est généralement plus faible qu’à tout autre moment de la journée. Les économies australienne et néo-zélandaise sont grandes et importantes, mais leurs marchés de devises sont plus petits que ceux de l’Europe ou de l’Amérique : les amplitudes ont donc tendance à être plus étroites et les mouvements de prix plus mesurés. Les devises les plus associées à cette séance sont le dollar australien (AUD) et le dollar néo-zélandais (NZD), ainsi que leurs croisements contre le dollar américain et le yen japonais.

Pour les traders, la séance de Sydney donne le ton initial. Les nouvelles en provenance d’Australie et de Nouvelle-Zélande, comme les décisions de la Reserve Bank of Australia, peuvent faire bouger fortement ces paires sur un fond par ailleurs calme. Les prix des matières premières comptent aussi, puisque le dollar australien y est étroitement lié.

Comme Sydney se situe dans l’hémisphère sud, son calendrier d’heure d’été fonctionne à l’inverse de celui de l’Europe et de l’Amérique. Les horloges australiennes avancent quand les horloges du nord reculent : la plage GMT exacte de la séance de Sydney se décale donc à d’autres moments de l’année que celles de Londres ou de New York. C’est l’une des raisons pour lesquelles un tableau imprimé une fois pour toutes se périme discrètement.

## La séance de Tokyo (asiatique)

Tokyo est le pilier de la séance asiatique, qui court de 00:00 à 09:00 GMT en heure standard. Elle chevauche la fin de Sydney et apporte le premier véritable réservoir de liquidité de la journée. Tokyo est l’un des plus grands centres de change au monde : la séance asiatique pèse donc nettement plus lourd que Sydney seule.

Le yen japonais (JPY) en est le point focal naturel. Des paires comme USD/JPY, EUR/JPY et AUD/JPY connaissent leurs échanges locaux les plus actifs pendant ces heures, portés par les banques japonaises, les exportateurs et les flux institutionnels. Les données chinoises et régionales alimentent également le sentiment de marché, puisque l’essentiel de l’activité économique asiatique se dénoue dans cette fenêtre.

La séance de Tokyo a la réputation de rester relativement en range. Les grands mouvements directionnels y sont moins fréquents que pendant les séances européenne et américaine, et les prix évoluent souvent à l’intérieur de niveaux définis. Cela convient aux traders qui aiment les stratégies de range et frustre ceux qui cherchent des tendances marquées. C’est une tendance générale, pas une règle, et une actualité majeure peut la contredire à tout moment.

La séance asiatique compte aussi parce qu’elle prépare l’ouverture européenne. Les ranges construits pendant la nuit à Tokyo deviennent souvent des points de référence une fois Londres arrivée. Pour un examen plus détaillé du comportement de cette séance et des paires qui méritent l’attention, voyez notre guide dédié à la [séance forex de Tokyo et d’Asie](/fr/blog/seance-forex-de-tokyo-asie).

## La séance de Londres

Londres est le poids lourd de la journée forex. Sa plage en heure standard va de 08:00 à 17:00 GMT et, en volume, c’est la plus grande place de change au monde. Ce n’est pas une légende : c’est mesuré. L’**enquête triennale des banques centrales de la BRI**, menée par la Banque des règlements internationaux, montre systématiquement que le Royaume-Uni traite la plus grande part du volume mondial des changes, loin devant tout autre pays. Vous pouvez consulter l’enquête directement sur https://www.bis.org/statistics/rpfx22.htm.

Quand Londres ouvre, le volume bondit. Les traders décrivent souvent l’ouverture de Londres comme le moment où la journée prend une véritable direction, parce que la profondeur de liquidité y est suffisante pour installer des tendances qui portent sur le reste de la séance. Les spreads sur les paires majeures se resserrent généralement à mesure que les participants affluent, et l’euro, la livre sterling et le franc suisse s’échangent massivement contre le dollar américain. EUR/USD et GBP/USD figurent parmi les paires les plus actives de la planète pendant ces heures.

La séance de Londres absorbe aussi l’ouverture de Francfort, une heure plus tôt : la dynamique européenne est donc déjà en place lorsque Londres tourne à plein régime. À partir de la fin de matinée, les publications économiques de la zone euro et du Royaume-Uni peuvent provoquer des mouvements brusques : chiffres d’inflation, commentaires de la Banque d’Angleterre, et ainsi de suite. La Banque d’Angleterre publie son calendrier et ses décisions sur https://www.bankofengland.co.uk.

Parce qu’il se passe tant de choses autour de l’ouverture de Londres, beaucoup de traders organisent leur journée autour d’elle. Pour un point précis sur le moment exact où cette séance commence et sur le comportement de sa première heure, voyez notre article compagnon sur [l’heure d’ouverture de la séance de Londres](/fr/blog/a-quelle-heure-ouvre-la-seance-de-londres).

## La séance de New York

New York est le second pilier du forex mondial, de 13:00 à 22:00 GMT en heure standard. Le dollar américain y domine : il figure d’un côté de la grande majorité de toutes les transactions de devises, si bien que les données économiques américaines et la politique de la Réserve fédérale se répercutent sur l’ensemble du marché. Des publications comme les chiffres de l’emploi non agricole, les rapports d’inflation et les décisions de taux de la Fed produisent souvent la volatilité la plus vive de la semaine, et elles tombent pendant les heures new-yorkaises. La Réserve fédérale publie son calendrier sur https://www.federalreserve.gov.

La séance de New York a tendance à ouvrir avec beaucoup d’énergie, puis à s’éclaircir progressivement à mesure que l’après-midi avance et que les salles de marché européennes ferment. Ces premières heures sont animées précisément parce que Londres est encore ouverte en parallèle. Une fois Londres terminée vers 17:00 GMT, la liquidité commence à se retirer, et la fin de la séance de New York, la ligne droite vers la clôture de 22:00 GMT, est généralement la plage la plus calme de toute la journée de trading.

Ce chevauchement entre Londres et New York est la fenêtre la plus importante de la journée forex : il mérite donc sa propre section.
## Chevauchements de séances : là où le volume se concentre

La période la plus animée de la journée de trading est le **chevauchement Londres-New York**, qui court approximativement de 13:00 à 17:00 GMT. Pendant ces quatre heures, les deux plus grandes places financières sont ouvertes en même temps. La liquidité est à son maximum, les spreads sur les paires majeures sont généralement au plus serré, et les mouvements de prix sont les plus soutenus. Pour beaucoup de traders, cette fenêtre est le cœur de la journée, en particulier pour les paires en dollar et en euro. Nous l’examinons en détail dans notre guide du [chevauchement Londres-New York](/fr/blog/chevauchement-londres-new-york).

Il existe un second chevauchement, plus petit, plus tôt dans la journée : le **chevauchement Sydney-Tokyo** pendant la matinée asiatique. Il est bien moins actif que la fenêtre Londres-New York, mais il ajoute de la liquidité aux paires en yen et en dollar australien, et il peut produire des mouvements significatifs lorsqu’une actualité régionale tombe.

Les chevauchements comptent parce qu’ils concentrent l’activité de deux régions sur les mêmes heures d’horloge. Plus de participants signifie plus de volume, et plus de volume signifie généralement une exécution plus fluide et des tendances plus nettes. Choisir quand trader revient souvent à déterminer quel chevauchement correspond à votre emploi du temps et à votre stratégie, un point que nous développons dans notre guide du [meilleur moment pour trader le forex](/fr/blog/meilleur-moment-pour-trader-le-forex).
## Comment voir les séances dans votre propre fuseau horaire

Chaque plage de séance de cet article est indiquée en GMT, parce que le GMT est la référence commune que partage tout le marché. Mais vous ne tradez pas en GMT. Vous tradez sur votre propre horloge, là où vous vivez. Convertir ces plages à la main est facile à rater, et il y a une difficulté supplémentaire : l’heure d’été.

Comme chaque séance est rattachée à l’heure locale de sa propre ville, les plages GMT se décalent d’une heure dès qu’une région change ses horloges. Le Royaume-Uni et l’Union européenne basculent le dernier dimanche de mars et d’octobre ; les États-Unis basculent le deuxième dimanche de mars et le premier dimanche de novembre ; l’Australie va dans l’autre sens. Un tableau imprimé une fois est donc faux pendant plusieurs semaines chaque année. Nous détaillons ces conversions pays par pays dans notre guide des [horaires du forex par fuseau horaire](/fr/blog/horaires-du-forex-par-fuseau-horaire).
La façon fiable de contourner tout cela est de laisser un outil faire la conversion. Notre [outil des horaires du marché forex en direct](/) affiche les quatre séances dans votre propre fuseau horaire en temps réel, en s’ajustant automatiquement à l’heure d’été pour que les horaires affichés soient toujours à jour.

## Questions fréquentes

**Combien y a-t-il de séances de trading forex ?**
Il y a quatre grandes séances : Sydney, Tokyo, Londres et New York, chacune nommée d’après une place financière de premier plan. Francfort est parfois comptée comme l’ouverture de la séance européenne, mais elle est généralement rattachée à Londres.

**Quelle séance forex est la plus volatile ?**
Londres et New York sont les séances les plus volatiles, et la volatilité culmine pendant leur chevauchement, approximativement de 13:00 à 17:00 GMT, quand les deux places sont ouvertes en même temps et que la liquidité est la plus profonde.

**Les séances forex se chevauchent-elles ?**
Oui. Le grand chevauchement est celui de Londres et New York, approximativement de 13:00 à 17:00 GMT. Il existe aussi un chevauchement Sydney-Tokyo plus petit pendant la matinée asiatique. C’est pendant ces chevauchements que le volume échangé est le plus élevé.

**Quelle séance convient le mieux aux débutants ?**
Il n’y a pas de réponse unique : cela dépend de votre fuseau horaire et des paires que vous suivez. Beaucoup de débutants trouvent que la séance de Londres offre les tendances les plus nettes et les spreads les plus serrés, tandis que les heures plus calmes de Sydney et de Tokyo peuvent constituer un cadre plus posé pour apprendre. La meilleure approche est d’observer chaque séance à votre propre heure et de voir laquelle vous convient.

**Pourquoi les horaires des séances changent-ils au cours de l’année ?**
Les séances sont liées à l’heure locale de chaque ville : quand une région change ses horloges pour l’heure d’été, la plage GMT se décale d’une heure. C’est pourquoi un outil en direct vaut mieux qu’un tableau imprimé.

*Cet article est fourni à titre d’information générale uniquement et ne constitue pas un conseil financier.*`,
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
      fr: "horaires-du-forex-par-fuseau-horaire",
    },
    title: {
      en: "Forex Market Hours by Timezone: GMT, EST, IST and AEST",
      es: "Horario del mercado forex por zona horaria: GMT, EST, IST y AEST",
      fr: "Horaires du forex par fuseau horaire : tableaux complets",
    },
    description: {
      en: "Forex market hours in my timezone: convert the four sessions to GMT, EST, CET, IST, GST, SGT and AEST with clear tables and a live DST-aware tool.",
      es: "Horario del mercado forex en mi zona horaria: convierte las cuatro sesiones a GMT, EST, CET, IST, GST, SGT y AEST con tablas claras y conversor en vivo.",
      fr: "Horaires des séances forex convertis en EST, CET, IST, GST, SGT et AEST. Tableaux clairs, pièges de l’heure d’été et convertisseur en direct.",
    },
    date: "2026-07-25",
    authorSlug: "author",
    tags: {
      en: ["Timezones", "Basics"],
      es: ["Zonas horarias", "Fundamentos"],
      fr: ["Fuseaux horaires", "Horaires"],
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
      fr: `Les horaires des séances forex sont presque toujours cités en GMT. Comme référence partagée, cela se comprend : le GMT ne bouge jamais, et chaque trader peut faire la traduction depuis cette base. Le problème, c’est que vous ne tradez pas en GMT. Vous tradez sur l’horloge accrochée à votre mur, qu’elle affiche l’heure de l’Est, l’heure d’Europe centrale, l’heure standard de l’Inde, l’heure du Golfe ou l’heure de l’Est australien. Convertir les quatre grandes séances vers votre propre fuseau à la main est facile à rater de peu, et les erreurs s’aggravent deux fois par an, quand l’heure d’été décale certains fuseaux mais pas d’autres. Ce guide vous donne des tableaux de conversion propres pour les fuseaux les plus courants, montre exactement où les tableaux figés se cassent, et vous oriente vers un convertisseur en direct qui lit votre fuseau à votre place.

## Les quatre séances en GMT : la base de référence

Tout ce qui suit part de la même base : les plages en heure standard (hiver de l’hémisphère nord) pour chaque grande place, en GMT. Retenez ces cinq lignes et tous les autres tableaux de cet article se réduisent à une simple addition ou soustraction.

| Séance | Ouverture (GMT) | Clôture (GMT) |
|---|---|---|
| Sydney | 22:00 | 07:00 |
| Tokyo | 00:00 | 09:00 |
| Francfort | 07:00 | 16:00 |
| Londres | 08:00 | 17:00 |
| New York | 13:00 | 22:00 |

Ce sont des plages en heure standard. Le marché lui-même fonctionne en continu du dimanche 22:00 GMT au vendredi 22:00 GMT, puis ferme le week-end. Les étiquettes de séance marquent simplement le moment où chaque place régionale est active. Remarquez que Sydney ouvre la journée mondiale et que sa plage franchit minuit, et que Londres et New York se chevauchent d’environ 13:00 à 17:00 GMT, la plage la plus animée et la plus liquide de toute la semaine. Pour en savoir plus sur ce que représente chaque séance, voyez notre guide des [séances de trading forex](/fr/blog/seances-de-trading-forex-expliquees).

## Horaires du forex à l’heure américaine (EST/EDT)

Pour les traders aux États-Unis, l’heure de l’Est américain est la référence naturelle. L’heure standard de l’Est (EST) est GMT-5 : pour convertir n’importe quelle séance depuis le GMT, retranchez cinq heures.

| Séance | Ouverture (EST) | Clôture (EST) |
|---|---|---|
| Sydney | 17:00 | 02:00 |
| Tokyo | 19:00 | 04:00 |
| Francfort | 02:00 | 11:00 |
| Londres | 03:00 | 12:00 |
| New York | 08:00 | 17:00 |

Le chiffre le plus utile ici est l’ouverture hebdomadaire. Le forex rouvre le dimanche à 22:00 GMT, soit le dimanche à 17:00 EST, autrement dit 17h00 heure de l’Est le dimanche après-midi. C’est le moment où la séance de Sydney commence et où la semaine de trading démarre pour les traders basés aux États-Unis. La séance de New York elle-même court de 08:00 à 17:00 heure de l’Est, ce qui s’aligne proprement sur une journée de travail normale.

Si vous êtes plus à l’ouest, ajustez depuis l’heure de l’Est. L’heure du Centre (CST) a une heure de retard sur l’Est : l’ouverture du dimanche est donc à 16:00 et New York court de 07:00 à 16:00. L’heure du Pacifique (PST) a trois heures de retard sur l’Est, ce qui place l’ouverture du dimanche à 14:00 et New York de 05:00 à 14:00. Un rappel : de la mi-mars au début novembre, les États-Unis utilisent l’heure d’été de l’Est (EDT, GMT-4) : retranchez donc quatre heures au lieu de cinq pendant cette période, qui couvre l’essentiel de l’année. Pour l’ouverture hebdomadaire en détail, voyez notre article sur [l’heure d’ouverture du marché du forex](/fr/blog/a-quelle-heure-ouvre-le-marche-du-forex).

## Horaires du forex en Europe (CET/CEST)

L’Europe continentale, de Francfort et Paris à Madrid, Rome et Amsterdam, utilise l’heure d’Europe centrale. La CET standard est GMT+1 : ajoutez donc une heure à chaque chiffre GMT.

| Séance | Ouverture (CET) | Clôture (CET) |
|---|---|---|
| Sydney | 23:00 | 08:00 |
| Tokyo | 01:00 | 10:00 |
| Francfort | 08:00 | 17:00 |
| Londres | 09:00 | 18:00 |
| New York | 14:00 | 23:00 |

Pour un trader à Francfort, à Paris ou à Madrid, la séance locale ouvre à 08:00 CET et la séance de Londres une heure plus tard, à 09:00. Le chevauchement Londres-New York, à forte liquidité, tombe entre 14:00 et 18:00 CET, confortablement dans l’après-midi. L’ouverture hebdomadaire du dimanche 22:00 GMT arrive à 23:00 CET le dimanche soir. De fin mars à fin octobre, l’Europe continentale passe à l’heure d’été d’Europe centrale (CEST, GMT+2) : ajoutez alors deux heures au lieu d’une. Et voici le détail qui fait trébucher : Londres a une heure de retard sur Francfort, la séance de Londres suit donc l’heure britannique, pas la CET.

## Horaires du forex en Inde (IST)

L’heure standard de l’Inde est GMT+5:30, et l’Inde n’applique pas l’heure d’été. Cela rend le tableau indien stable toute l’année, un vrai confort, même si le décalage d’une demi-heure fait tomber les horaires locaux sur la demie. Ajoutez cinq heures et trente minutes à chaque chiffre GMT.

| Séance | Ouverture (IST) | Clôture (IST) |
|---|---|---|
| Sydney | 03:30 | 12:30 |
| Tokyo | 05:30 | 14:30 |
| Francfort | 12:30 | 21:30 |
| Londres | 13:30 | 22:30 |
| New York | 18:30 | 03:30 |

Pour un trader indien, la séance de Londres ouvre à 13:30 IST en début d’après-midi et New York à 18:30 IST en soirée. Le chevauchement Londres-New York, la fenêtre la plus active de la journée, court de 18:30 à 22:30 IST, ce qui convient aux personnes qui travaillent la journée et tradent le soir. Comme l’Inde n’a pas d’heure d’été, ces horaires locaux ne changent jamais du côté indien. Ce qui bouge, c’est l’ancrage GMT quand le Royaume-Uni, l’Europe ou les États-Unis passent à l’heure d’été : pendant l’été de l’hémisphère nord, les lignes Londres et New York ci-dessus arrivent donc une heure plus tôt en IST. C’est exactement le type de dérive entre calendriers d’heure d’été qu’un tableau figé ne peut pas capturer seul.

## Horaires du forex dans le Golfe (GST)

L’heure du Golfe couvre Dubaï, Abou Dabi, Mascate et plus largement les Émirats arabes unis et Oman. La GST est GMT+4 et, comme l’Inde, le Golfe n’applique pas l’heure d’été. Ajoutez quatre heures à chaque chiffre GMT.

| Séance | Ouverture (GST) | Clôture (GST) |
|---|---|---|
| Sydney | 02:00 | 11:00 |
| Tokyo | 04:00 | 13:00 |
| Francfort | 11:00 | 20:00 |
| Londres | 12:00 | 21:00 |
| New York | 17:00 | 02:00 |

Depuis Dubaï, la séance de Londres ouvre à midi, 12:00 GST, et New York à 17:00 GST en fin d’après-midi. Le chevauchement Londres-New York court de 17:00 à 21:00 GST, une fenêtre de soirée pour les traders du Golfe. Les traders d’Istanbul peuvent procéder de façon similaire : la Turquie utilise GMT+3 toute l’année sans heure d’été, il suffit donc de retrancher une heure à chaque chiffre GST pour obtenir l’heure d’Istanbul, ce qui place l’ouverture de Londres à 11:00 et New York à 16:00. Puisque ni le Golfe ni la Turquie ne changent d’horloge, la seule variable reste l’heure d’été de l’hémisphère nord sur les ancrages de Londres, Francfort et New York.

## Horaires du forex en Asie-Pacifique (SGT et AEST)

La région Asie-Pacifique se répartit entre deux références utiles. L’heure standard de Singapour (SGT) est GMT+8 sans heure d’été, et en pratique les traders d’une grande partie de l’Asie de l’Est et du Sud-Est la partagent. Ajoutez huit heures au GMT.

| Séance | Ouverture (SGT) | Clôture (SGT) |
|---|---|---|
| Sydney | 06:00 | 15:00 |
| Tokyo | 08:00 | 17:00 |
| Francfort | 15:00 | 00:00 |
| Londres | 16:00 | 01:00 |
| New York | 21:00 | 06:00 |

L’heure de l’Est australien est la seconde référence, et elle est plus délicate, car l’Australie applique bien l’heure d’été pendant l’été de l’hémisphère sud, soit la moitié de l’année opposée à celle du nord. L’heure standard de l’Est australien (AEST) est GMT+10 ; pendant l’été australien, approximativement d’octobre à avril, elle devient AEDT à GMT+11. Le tableau ci-dessous utilise l’AEST standard : ajoutez donc dix heures au GMT.

| Séance | Ouverture (AEST) | Clôture (AEST) |
|---|---|---|
| Sydney | 08:00 | 17:00 |
| Tokyo | 10:00 | 19:00 |
| Francfort | 17:00 | 02:00 |
| Londres | 18:00 | 03:00 |
| New York | 23:00 | 08:00 |

Pour un trader de Sydney en heure standard, la séance locale de Sydney court sur un classique 08:00-17:00, Londres ouvre à 18:00 en soirée et New York à 23:00 tard dans la nuit. Pendant l’heure d’été australienne, ajoutez encore une heure à la colonne AEST.

## Pourquoi les tableaux de conversion figés se trompent (heure d’été)

Chaque tableau ci-dessus est un instantané de l’heure standard. Pourquoi ne peut-on pas se fier à un tableau imprimé toute l’année ? Cela tient à un fait : les séances sont rattachées à l’heure locale de chaque place de trading, et non au GMT. Quand une place applique l’heure d’été, ses horloges avancent : la séance se déplace donc par rapport au GMT, même si le GMT lui-même ne change jamais.

La complication, c’est que le monde ne bascule pas le même jour. Le Royaume-Uni et l’Union européenne changent le dernier dimanche de mars et le dernier dimanche d’octobre. Les États-Unis changent plus tôt au printemps, le deuxième dimanche de mars, et plus tard à l’automne, le premier dimanche de novembre. Pendant quelques semaines chaque printemps et chaque automne, les États-Unis et l’Europe sont désynchronisés, ce qui rétrécit ou élargit brièvement le chevauchement Londres-New York. L’Australie, dans l’hémisphère sud, se décale dans l’autre sens et à des moments opposés de l’année. L’Inde, le Golfe, Singapour et la Turquie, eux, ne bougent jamais.

Mettez tout cela bout à bout et un tableau figé unique peut être faux pour n’importe quel fuseau le jour où un changement d’heure pertinent tombe d’un côté ou de l’autre de la conversion. Un trader de Bombay ne change pas d’horloge, et pourtant la séance de Londres arrive une heure plus tôt en IST à partir de fin mars, uniquement parce que Londres a avancé. La seule méthode fiable consiste à calculer chaque séance à partir de règles de fuseau horaire en direct, et non d’un tableau mémorisé des mois plus tôt. Pour le cas de Londres en détail, voyez [l’heure d’ouverture de la séance de Londres](/fr/blog/a-quelle-heure-ouvre-la-seance-de-londres), et pour la fenêtre la plus liquide, notre guide du [chevauchement Londres-New York](/fr/blog/chevauchement-londres-new-york).

## Obtenez automatiquement vos horaires locaux exacts

Plutôt que de jongler avec six décalages et deux calendriers d’heure d’été de tête, laissez le logiciel s’en charger. Le [convertisseur en direct sur la page d’accueil](/) lit le fuseau horaire de votre appareil et son état actuel d’heure d’été, puis affiche l’ouverture et la clôture de chaque séance à votre heure locale exacte. Il se met à jour automatiquement quand votre région, ou l’une des places de trading, change d’horloge : les chiffres sont donc toujours à jour le jour où vous les consultez.

Si vous tradez sur plusieurs régions, l’outil est plus rapide et plus sûr que n’importe quelle référence statique, parce qu’il supprime les deux sources d’erreur qui piègent les gens : ajouter le mauvais décalage, et oublier un changement d’heure de l’autre côté de la conversion. Ouvrez la [page d’accueil](/) une fois, confirmez votre fuseau horaire, et les quatre séances apparaissent sur votre propre horloge.

## Questions fréquentes

**Quels sont les horaires du forex dans mon fuseau horaire ?** Partez de la base GMT (Sydney 22:00-07:00, Tokyo 00:00-09:00, Francfort 07:00-16:00, Londres 08:00-17:00, New York 13:00-22:00) et ajoutez ou retranchez votre décalage par rapport au GMT. Pour une réponse exacte tenant compte de l’heure d’été, utilisez le convertisseur en direct de la page d’accueil : il lit votre fuseau à votre place.

**L’heure de trading du forex change-t-elle avec l’heure d’été ?** Oui, en pratique. Le GMT ne change jamais, mais quand vous convertissez vers un fuseau qui applique l’heure d’été, les heures locales se décalent d’une heure pendant une partie de l’année. Les régions basculent à des dates différentes, si bien que les chevauchements peuvent se décaler brièvement.

**À quelle heure le marché du forex est-il ouvert en Inde ?** En heure standard de l’Inde (GMT+5:30, sans heure d’été), la séance de Londres court d’environ 13:30 à 22:30 IST et New York d’environ 18:30 à 03:30 IST pendant l’hiver de l’hémisphère nord. À partir de fin mars, les lignes Londres et New York arrivent une heure plus tôt, parce que ces places passent à l’heure d’été.

**À quelle heure ouvre la séance de New York ?** New York court de 13:00 à 22:00 GMT en heure standard, soit de 08:00 à 17:00 heure de l’Est américain. La semaine de trading elle-même rouvre le dimanche à 17h00 heure de l’Est.

**Le GMT équivaut-il à l’UTC pour cet usage ?** À des fins pratiques d’horaires forex, oui. L’UTC et le GMT coïncident suffisamment pour que les tableaux de conversion présentés ici soient identiques, que vous partiez du GMT ou de l’UTC.

Pour une vue d’ensemble plus large, voyez le [guide des séances expliquées](/fr/blog/seances-de-trading-forex-expliquees) ou commencez à convertir sur la [page d’accueil](/).

Références faisant autorité : la [base de données des fuseaux horaires IANA](https://www.iana.org/time-zones) pour les règles canoniques de fuseaux et d’heure d’été, [timeanddate.com heure d’été](https://www.timeanddate.com/time/dst/) pour les dates de bascule, [gov.uk changement d’heure](https://www.gov.uk/when-do-the-clocks-change) pour les dates britanniques, et la [Banque des règlements internationaux](https://www.bis.org/) pour le contexte du marché des changes.

*Cet article est fourni à titre d’information générale uniquement et ne constitue pas un conseil financier.*`,
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
  {
    slug: {
      en: "new-york-forex-session",
      es: "sesion-forex-de-nueva-york",
    },
    title: {
      en: "The New York Forex Session: Hours, Best Pairs and Volatility",
      es: "La sesión forex de Nueva York: horario, mejores pares y volatilidad",
    },
    description: {
      en: "The New York forex session runs 13:00-22:00 GMT, dollar-driven and highly volatile. See the hours in your timezone, the best pairs and the London overlap.",
      es: "La sesión forex de Nueva York va de 13:00 a 22:00 GMT, impulsada por el dólar y muy volátil. Ve el horario en tu zona, los mejores pares y el solapamiento.",
    },
    date: "2026-07-28",
    authorSlug: "author",
    tags: {
      en: ["Sessions", "New York"],
      es: ["Sesiones", "Nueva York"],
    },
    cover: "/blog/new-york-forex-session.svg",
    body: {
      en: `The New York forex session runs from **13:00 to 22:00 GMT** in standard time, and it's the second-largest pool of currency-trading liquidity in the world after London. It's driven above all by the US dollar, which sits on one side of the large majority of global trades, so American economic data and Federal Reserve policy ripple through every pair. This guide covers exactly when the New York session opens in your own timezone, why it's so volatile, which pairs are most active, and how it overlaps with London to produce the busiest hours of the day.

For traders outside the Americas, New York is the session that closes out the global trading day. It picks up while London is still running, carries the heaviest US data releases, and then thins into the quiet run toward the weekly rhythm's next handover. Understanding its shape helps you plan around both the opportunity and the risk it brings.

## New York session hours in your timezone

In standard time the New York session runs from **13:00 to 22:00 GMT**, which is **08:00 to 17:00 in New York local time**. The anchor is New York's own clock, not GMT, so when the United States is on daylight saving time the GMT window shifts an hour earlier, to roughly 12:00 to 21:00 GMT. That's a point worth holding onto: any static table quoting the session purely in GMT will be an hour off for most of the year.

The table below shows the New York open and close across a range of common zones, for the northern-hemisphere winter, when New York is on Eastern Standard Time and aligned with the GMT figures above.

| Your city / zone | NY open (winter, GMT) | NY close (winter, GMT) |
| --- | --- | --- |
| New York (ET) | 08:00 | 17:00 |
| London (UK) | 13:00 | 22:00 |
| Frankfurt / Paris (CET) | 14:00 | 23:00 |
| Istanbul (TRT) | 16:00 | 01:00 (next day) |
| Dubai (GST) | 17:00 | 02:00 (next day) |
| Mumbai (IST) | 18:30 | 03:30 (next day) |
| Singapore (SGT) | 21:00 | 06:00 (next day) |
| Sydney (AEST) | 23:00 | 08:00 (next day) |

Because both New York and most of these cities change their clocks at different points in the year, the clean relationships above hold for most of the calendar but slip by an hour during the short spring and autumn windows when the changeovers fall on different dates. Rather than track that by hand, the [live forex market hours tool](/) converts the New York session into your own timezone automatically and keeps pace with daylight saving on both sides.

## Why the New York session is so volatile

New York's reputation for volatility comes down to one currency: the US dollar. The dollar is the most traded currency on earth, involved in the great majority of all foreign-exchange transactions, so anything that moves it moves the whole market. And the events that move it most, the scheduled US data releases and central-bank decisions, nearly all land during New York hours.

The heavyweight releases are familiar to anyone who watches the calendar. **Non-farm payrolls**, the monthly US jobs report, typically comes out at 08:30 New York time and can move dollar pairs sharply within seconds. Inflation data such as the Consumer Price Index arrives in the same early-morning slot. And **Federal Reserve** rate decisions and press conferences, published on the Fed's own schedule, routinely produce the largest single moves of the month. You can find the Fed's calendar directly at https://www.federalreserve.gov.

Two things amplify these moves. First, the releases cluster in the New York morning, right when the session is at its most liquid because London is still open. Second, the dollar's central role means a single US number reprices euro, pound, yen, and commodity-currency pairs all at once. The result is that the sharpest, fastest volatility of the trading week tends to concentrate in a narrow band of New York hours, then fade as the afternoon wears on and European desks close.

## The London-New York overlap

The single busiest window in the entire forex day is the overlap between London and New York, running roughly **13:00 to 17:00 GMT**. For those four hours the world's two largest financial centres are open at the same time, liquidity is at its deepest, spreads on the majors are usually at their tightest, and price movement is at its most sustained.

The overlap matters so much because it stacks two regions' order flow into the same clock hours. European traders are still at their desks as American traders arrive, and the biggest US data releases tend to fall in the New York morning, right inside the window. That combination of deep liquidity and scheduled news is why so many traders treat the overlap as the core of their day, especially for dollar and euro pairs.

Once London closes around 17:00 GMT, the character of the New York session changes. Liquidity starts to drain, the afternoon thins out, and the run into the 22:00 GMT close is usually the quietest stretch of the whole day. We cover this window in depth in our guide to the [London-New York overlap](/en/blog/london-new-york-overlap).

## Best currency pairs during the New York session

Because the session is dollar-driven, the most active pairs are the dollar majors, the ones where US participation and US data have the most direct effect.

**EUR/USD** is the most heavily traded pair in the world, and New York is one of its most active windows, particularly during the London overlap when both home markets are engaged. Spreads are usually at their tightest here and liquidity at its deepest.

**GBP/USD** stays lively through the New York morning while London is still open, then quietens as UK desks close. It reacts strongly to US data, since any dollar move shows up directly in the pair.

**USD/JPY** is a classic New York mover. The yen is sensitive to US interest-rate expectations, so Fed commentary and US yields often push this pair during American hours, even though Tokyo is long closed.

**USD/CAD** deserves a mention because Canadian and US data frequently land on the same mornings, and the Canadian dollar tracks oil prices, which are themselves priced in dollars. It's one of the more distinctly North American pairs.

Every one of these pairs carries the dollar on one side, which is really the whole point. When USD is in the mix, New York is the session where that pair's home-market liquidity and news flow hit their peak.

## Trading the New York session: practical notes

The New York session rewards awareness of the calendar more than almost any other. Because the biggest moves cluster around scheduled releases, knowing what's due, and when, explains most of the day's sharp swings.

Volatility is front-loaded. The morning, from the New York open through the London overlap, carries the deepest liquidity and the heaviest data, so it's where most of the session's meaningful movement happens. The afternoon, after London closes, is thinner and often driftier, with wider spreads and choppier price action on lower volume.

News risk works both ways. A payrolls or inflation surprise can hand you a clean, fast move, or it can whipsaw, spiking one way then reversing within minutes as traders pick apart the detail. Bigger volatility simply means bigger swings, and a swing is as likely to go against you as for you. Take all of this as a picture of how the session tends to behave, not as a steer on when or how to trade. What you do with it comes back to your own plan, your risk tolerance, and your circumstances.

To see how New York fits alongside Sydney, Tokyo, and London, our [forex trading sessions explained](/en/blog/forex-trading-sessions-explained) guide walks through each one and how they hand off around the clock.

## Frequently asked questions

**What time does the New York forex session open?**
It opens at 08:00 New York local time, which is 13:00 GMT in the northern-hemisphere winter and 12:00 GMT during US daylight saving time. The anchor is New York's clock, so the GMT figure shifts by an hour twice a year.

**Why is the New York session so volatile?**
Because it's driven by the US dollar, the most traded currency, and nearly all the major US data releases and Federal Reserve decisions land during New York hours. Those events move the dollar, and the dollar moves the whole market.

**When is the London-New York overlap?**
Roughly 13:00 to 17:00 GMT in standard time. It's the busiest window of the trading day, with the deepest liquidity and tightest spreads, because both major centres are open at once.

**Which pairs are best in the New York session?**
The dollar majors, EUR/USD, GBP/USD, USD/JPY and USD/CAD, are the most active, since the session is centred on the US dollar and US news flow.

**When does the New York session close?**
It closes at 17:00 New York local time, which is 22:00 GMT in winter and 21:00 GMT during US daylight saving time. That close also marks the end of the trading week each Friday.

*This article is for general information only and is not financial advice.*`,
      es: `La sesión forex de Nueva York va de las **13:00 a las 22:00 GMT** en horario estándar, y es el segundo mayor foco de liquidez de divisas del mundo después de Londres. La impulsa sobre todo el dólar estadounidense, que figura en un lado de la gran mayoría de las operaciones globales, así que los datos económicos de EE. UU. y la política de la Reserva Federal repercuten en todos los pares. Esta guía explica cuándo abre exactamente la sesión de Nueva York en tu propia zona horaria, por qué es tan volátil, qué pares son los más activos y cómo se solapa con Londres para producir las horas más movidas del día.

Para los operadores fuera de América, Nueva York es la sesión que cierra la jornada global de trading. Arranca mientras Londres sigue en marcha, concentra las publicaciones de datos estadounidenses más importantes y luego se adelgaza hacia el tramo tranquilo previo al siguiente relevo del ritmo semanal. Entender su forma ayuda a planificar tanto la oportunidad como el riesgo que trae.

## Horario de la sesión de Nueva York en tu zona horaria

En horario estándar, la sesión de Nueva York va de las **13:00 a las 22:00 GMT**, que son las **08:00 a las 17:00 hora local de Nueva York**. El anclaje es el propio reloj de Nueva York, no el GMT, así que cuando Estados Unidos está en horario de verano la ventana GMT se desplaza una hora antes, aproximadamente de las 12:00 a las 21:00 GMT. Es un detalle que conviene retener: cualquier tabla estática que exprese la sesión solo en GMT estará desfasada una hora durante gran parte del año.

La tabla siguiente muestra la apertura y el cierre de Nueva York en varias zonas comunes, para el invierno del hemisferio norte, cuando Nueva York está en hora estándar del Este y coincide con las cifras GMT anteriores.

| Tu ciudad / zona | Apertura NY (invierno, GMT) | Cierre NY (invierno, GMT) |
| --- | --- | --- |
| Nueva York (ET) | 08:00 | 17:00 |
| Londres (UK) | 13:00 | 22:00 |
| Fráncfort / París (CET) | 14:00 | 23:00 |
| Estambul (TRT) | 16:00 | 01:00 (día siguiente) |
| Dubái (GST) | 17:00 | 02:00 (día siguiente) |
| Bombay (IST) | 18:30 | 03:30 (día siguiente) |
| Singapur (SGT) | 21:00 | 06:00 (día siguiente) |
| Sídney (AEST) | 23:00 | 08:00 (día siguiente) |

Como tanto Nueva York como la mayoría de estas ciudades cambian sus relojes en momentos distintos del año, las relaciones limpias de arriba se cumplen casi todo el calendario pero se desfasan una hora durante los breves periodos de primavera y otoño en que los cambios caen en fechas distintas. En vez de llevar eso a mano, la [herramienta de horarios del mercado forex en vivo](/es) convierte la sesión de Nueva York a tu propia zona horaria de forma automática y se mantiene al día con el horario de verano en ambos lados.

## Por qué la sesión de Nueva York es tan volátil

La fama de volatilidad de Nueva York se reduce a una divisa: el dólar estadounidense. El dólar es la divisa más negociada del planeta, presente en la gran mayoría de las transacciones de divisas, así que todo lo que lo mueve mueve el mercado entero. Y los acontecimientos que más lo mueven, las publicaciones de datos estadounidenses programadas y las decisiones del banco central, llegan casi todos durante el horario de Nueva York.

Las publicaciones de peso son conocidas para cualquiera que siga el calendario. Las **nóminas no agrícolas**, el informe mensual de empleo de EE. UU., suelen salir a las 08:30 hora de Nueva York y pueden mover los pares con dólar con brusquedad en cuestión de segundos. Los datos de inflación, como el Índice de Precios al Consumo, llegan en la misma franja de primera hora. Y las decisiones de tipos y ruedas de prensa de la **Reserva Federal**, publicadas según su propio calendario, producen habitualmente los mayores movimientos individuales del mes. Puedes consultar el calendario de la Fed directamente en https://www.federalreserve.gov.

Dos cosas amplifican estos movimientos. Primero, las publicaciones se concentran en la mañana de Nueva York, justo cuando la sesión está en su punto más líquido porque Londres sigue abierto. Segundo, el papel central del dólar hace que un solo dato estadounidense revalorice a la vez los pares con euro, libra, yen y divisas ligadas a materias primas. El resultado es que la volatilidad más brusca y rápida de la semana tiende a concentrarse en una franja estrecha del horario de Nueva York, y luego se desvanece a medida que avanza la tarde y cierran las mesas europeas.

## El solapamiento entre Londres y Nueva York

La ventana más movida de toda la jornada de forex es el solapamiento entre Londres y Nueva York, que va aproximadamente de las **13:00 a las 17:00 GMT**. Durante esas cuatro horas los dos mayores centros financieros del mundo están abiertos a la vez, la liquidez toca su punto más profundo, los diferenciales de los pares principales suelen estar en su punto más estrecho y el movimiento del precio es el más sostenido.

El solapamiento importa tanto porque apila el flujo de órdenes de dos regiones en las mismas horas del reloj. Los operadores europeos siguen en sus mesas cuando llegan los estadounidenses, y las mayores publicaciones de datos de EE. UU. suelen caer en la mañana de Nueva York, justo dentro de la ventana. Esa combinación de liquidez profunda y noticias programadas es la razón por la que tantos operadores tratan el solapamiento como el núcleo de su día, sobre todo en los pares con dólar y euro.

Una vez que Londres cierra en torno a las 17:00 GMT, el carácter de la sesión de Nueva York cambia. La liquidez empieza a drenarse, la tarde se adelgaza y el tramo hacia el cierre de las 22:00 GMT suele ser el más tranquilo del día. Analizamos esta ventana en profundidad en nuestra guía sobre el [solapamiento entre Londres y Nueva York](/es/blog/solapamiento-londres-nueva-york).

## Mejores pares de divisas durante la sesión de Nueva York

Como la sesión está impulsada por el dólar, los pares más activos son los pares principales con el dólar, aquellos en los que la participación y los datos estadounidenses tienen el efecto más directo.

**EUR/USD** es el par más negociado del mundo, y Nueva York es una de sus ventanas más activas, sobre todo durante el solapamiento con Londres, cuando ambos mercados de origen están activos. Los diferenciales suelen estar aquí en su punto más estrecho y la liquidez en su punto más profundo.

**GBP/USD** se mantiene animado durante la mañana de Nueva York mientras Londres sigue abierto, y luego se calma cuando cierran las mesas del Reino Unido. Reacciona con fuerza a los datos de EE. UU., ya que cualquier movimiento del dólar aparece directamente en el par.

**USD/JPY** es un clásico de Nueva York. El yen es sensible a las expectativas de tipos de interés estadounidenses, así que los comentarios de la Fed y los rendimientos de EE. UU. suelen empujar este par durante el horario americano, aunque Tokio lleve tiempo cerrado.

**USD/CAD** merece mención porque los datos de Canadá y EE. UU. caen con frecuencia en las mismas mañanas, y el dólar canadiense sigue los precios del petróleo, que a su vez se cotizan en dólares. Es uno de los pares más netamente norteamericanos.

Cada uno de estos pares lleva el dólar en un lado, que es justo de lo que va la sesión. Cuando el USD entra en juego, Nueva York es donde la liquidez de su mercado de origen y su flujo de noticias tocan techo.

## Operar en la sesión de Nueva York: notas prácticas

La sesión de Nueva York premia estar atento al calendario más que casi ninguna otra. Como los mayores movimientos se concentran en torno a las publicaciones programadas, saber qué se espera, y cuándo, explica la mayor parte de los vaivenes bruscos del día.

La volatilidad está cargada al principio. La mañana, desde la apertura de Nueva York hasta el solapamiento con Londres, concentra la liquidez más profunda y los datos más pesados, así que es donde ocurre la mayor parte del movimiento relevante de la sesión. La tarde, tras el cierre de Londres, es más delgada y a menudo más errática, con diferenciales más amplios y un movimiento de precios más entrecortado con menos volumen.

El riesgo de noticias funciona en los dos sentidos. Una sorpresa en las nóminas o la inflación puede regalarte un movimiento limpio y rápido, o puede provocar un latigazo, dispararse hacia un lado y revertirse en minutos mientras los operadores desmenuzan el detalle. Más volatilidad no es otra cosa que oscilaciones más grandes, y una oscilación puede ir en tu contra con la misma facilidad que a tu favor. Tómate todo esto como una imagen de cómo suele comportarse la sesión, no como una indicación de cuándo o cómo operar. Lo que hagas con ello vuelve a tu propio plan, tu tolerancia al riesgo y tus circunstancias.

Para ver cómo encaja Nueva York junto a Sídney, Tokio y Londres, nuestra guía de [sesiones de trading forex explicadas](/es/blog/sesiones-de-trading-forex-explicadas) repasa cada una y cómo se pasan el relevo a lo largo del día.

## Preguntas frecuentes

**¿A qué hora abre la sesión forex de Nueva York?**
Abre a las 08:00 hora local de Nueva York, que son las 13:00 GMT en el invierno del hemisferio norte y las 12:00 GMT durante el horario de verano de EE. UU. El anclaje es el reloj de Nueva York, así que la cifra en GMT se desplaza una hora dos veces al año.

**¿Por qué es tan volátil la sesión de Nueva York?**
Porque la impulsa el dólar estadounidense, la divisa más negociada, y casi todas las grandes publicaciones de datos de EE. UU. y las decisiones de la Reserva Federal caen durante el horario de Nueva York. Esos acontecimientos mueven el dólar, y el dólar mueve todo el mercado.

**¿Cuándo es el solapamiento entre Londres y Nueva York?**
Aproximadamente de las 13:00 a las 17:00 GMT en horario estándar. Es la ventana más movida de la jornada, con la liquidez más profunda y los diferenciales más estrechos, porque ambos centros principales están abiertos a la vez.

**¿Qué pares son mejores en la sesión de Nueva York?**
Los pares principales con el dólar, EUR/USD, GBP/USD, USD/JPY y USD/CAD, son los más activos, ya que la sesión gira en torno al dólar estadounidense y su flujo de noticias.

**¿Cuándo cierra la sesión de Nueva York?**
Cierra a las 17:00 hora local de Nueva York, que son las 22:00 GMT en invierno y las 21:00 GMT durante el horario de verano de EE. UU. Ese cierre marca también el final de la semana de trading cada viernes.

*Este artículo es solo informativo y no constituye asesoramiento financiero.*`,
    },
  },
  {
    slug: {
      en: "london-new-york-overlap",
      es: "solapamiento-londres-nueva-york",
      fr: "chevauchement-londres-new-york",
    },
    title: {
      en: "The London-New York Overlap: The Busiest Hours in Forex",
      es: "El solapamiento Londres-Nueva York: las horas más movidas del forex",
      fr: "Chevauchement Londres-New York : horaires et paires clés",
    },
    description: {
      en: "The London-New York overlap runs 13:00-17:00 GMT, when both centres trade at once. See it in your timezone, why liquidity peaks and how spreads tighten.",
      es: "El solapamiento Londres-Nueva York va de 13:00 a 17:00 GMT, con ambos centros a la vez. Ve el horario en tu zona, por qué la liquidez y los spreads mejoran.",
      fr: "Le chevauchement Londres-New York va de 13:00 à 17:00 GMT, les heures les plus liquides du forex. Horaires dans votre fuseau, spreads et paires actives.",
    },
    date: "2026-07-29",
    authorSlug: "author",
    tags: {
      en: ["Overlap", "Strategy"],
      es: ["Solapamiento", "Estrategia"],
      fr: ["Chevauchements", "Séances"],
    },
    cover: "/blog/london-new-york-overlap.svg",
    body: {
      en: `The London-New York overlap runs from **13:00 to 17:00 GMT** in standard time, the four hours when the world's two largest forex centres are open at the same time. It's the busiest window of the entire trading day: liquidity is at its deepest, spreads on the major pairs are usually at their tightest, and price movement is at its most sustained. This guide explains exactly when the overlap falls in your own timezone, why it concentrates so much activity, and what that means in practice.

If you only have a couple of hours a day to follow the market, these are the hours most traders point to. Two regions' order flow combines, the heaviest US data releases land right inside the window, and the deep liquidity that London brings meets the volatility that New York brings. Understanding this overlap is close to understanding the shape of the whole forex day.

## When the London-New York overlap happens

In standard time the overlap runs from **13:00 to 17:00 GMT**. That's the stretch after New York opens at 13:00 GMT and before London closes at 17:00 GMT, the only part of the day when both centres are active together. Because both cities shift their clocks for daylight saving, the exact GMT window can move by an hour for parts of the year, but the four-hour overlap itself stays intact because London and New York change clocks in roughly the same seasons.

Here's how the overlap maps to a range of common zones, using the northern-hemisphere winter case, when both centres are on standard time.

| Your city / zone | Overlap start | Overlap end |
| --- | --- | --- |
| London (UK) | 13:00 | 17:00 |
| New York (ET) | 08:00 | 12:00 |
| Frankfurt / Paris (CET) | 14:00 | 18:00 |
| Istanbul (TRT) | 16:00 | 20:00 |
| Dubai (GST) | 17:00 | 21:00 |
| Mumbai (IST) | 18:30 | 22:30 |
| Singapore (SGT) | 21:00 | 01:00 (next day) |
| Sydney (AEST) | 23:00 | 03:00 (next day) |

Rather than convert these by hand and second-guess the daylight-saving shifts, the [live forex market hours tool](/) shows the overlap in your own timezone in real time and adjusts automatically as the clocks change. For a broader breakdown of every session across zones, see our [forex market hours by timezone](/en/blog/forex-market-hours-by-timezone) guide.

## Why liquidity peaks during the overlap

The overlap concentrates activity for a simple structural reason: it stacks two regions' business day into the same clock hours. London is the largest foreign-exchange centre in the world and New York is the second largest, so when both are open at once, the two deepest pools of liquidity on the planet are active together.

The scale of London's dominance is measured, not folklore. The **BIS Triennial Central Bank Survey**, run by the Bank for International Settlements, consistently shows the United Kingdom handling the single largest share of global FX turnover, with the United States second. You can read the survey directly at https://www.bis.org/statistics/rpfx22.htm. When those two centres overlap, a very large fraction of all daily currency trading is happening in the same four-hour window.

There's a timing effect on top of the scale. The major US economic releases, non-farm payrolls, inflation data, and Federal Reserve commentary, tend to land in the New York morning, which falls inside the overlap. So the window combines the deepest standing liquidity of the day with the moments most likely to move the market. That's why volume peaks here and why the overlap, not the open of any single session, is the true centre of gravity of the trading day.

## What tighter spreads and deeper liquidity mean

Deep liquidity isn't an abstraction; it has concrete effects you can see on the screen during the overlap.

The most visible is **tighter spreads**. The spread is the gap between the price you can buy at and the price you can sell at, and it narrows when more participants are willing to quote both sides of the market. During the overlap, with banks, funds, and corporate desks from two regions all active, the major pairs typically trade at their tightest spreads of the day. That lowers the cost of entering and exiting a position.

The second effect is **depth**. Depth is how much can be traded without moving the price much. When the market is deep, a normal-sized order gets absorbed smoothly; when it's thin, the same order can push price further than expected. The overlap is the deepest part of the day, so execution tends to be cleaner and slippage smaller than in quieter hours.

The third is **sustained movement**. With two regions' flow combining, trends that form during the overlap often have enough participation behind them to carry, rather than fizzling out on thin volume. That's a general tendency rather than a guarantee, and deeper liquidity can coincide with sharp, news-driven volatility, but the combination of tight spreads and real depth is what makes the window stand out.

## Which pairs move most in the overlap

The overlap favours the pairs whose home markets sit in London and New York, which in practice means the dollar majors and the big euro and pound crosses.

**EUR/USD** is the natural centrepiece. It's the most traded pair in the world, and during the overlap both the euro's European home market and the dollar's American one are fully engaged, so it typically shows the tightest spreads and deepest liquidity of any pair.

**GBP/USD** is highly active too, combining UK liquidity that's still running with US flow that has just arrived. It reacts sharply to US data that lands in the window.

**USD/JPY** moves on US yields and Fed expectations, both of which are in focus during the New York morning, so it's a common overlap mover even with Tokyo closed. Dollar pairs like **USD/CAD** and **USD/CHF** also see their most active hours here.

It comes down to the same setup each time: the dollar on one side, a major European currency on the other, precisely the pairs whose two home markets are both trading through these four hours. If you want to see the sessions that feed into the overlap, we cover them in our guides to the [London session open](/en/blog/what-time-does-the-london-session-open) and the [New York session](/en/blog/new-york-forex-session).

## What the overlap looks like in practice

The overlap is where opportunity and risk are both at their highest, and it's worth being clear-eyed about both.

On the opportunity side, the tight spreads and deep liquidity mean lower transaction costs and cleaner execution than at any other time of day. Movements tend to be more sustained, which some traders find easier to work with than the choppier thin-liquidity hours. For anyone who can only watch the market for a limited window, the overlap packs the most activity into the fewest hours.

The flip side is the risk. This is also the window when scheduled US news is most likely to hit, and news moves fast in either direction. Deeper liquidity doesn't cushion you from a sharp move; a position can turn against you as quickly as it runs in your favour. So take the overlap for what it is, the busiest and most liquid hours of the day, and let your own plan, risk tolerance, and circumstances decide whether that busyness is somewhere you want to be.

To see how the overlap sits within the full 24-hour cycle, our [forex trading sessions explained](/en/blog/forex-trading-sessions-explained) guide walks through each session and how they hand off around the world.

## Frequently asked questions

**What time is the London-New York overlap?**
In standard time it runs from 13:00 to 17:00 GMT, the four hours after New York opens and before London closes. In New York local time that's 08:00 to 12:00. The window can shift by an hour in GMT terms during parts of the year because both cities observe daylight saving.

**Why is the overlap the busiest time to trade?**
Because the world's two largest FX centres, London and New York, are open at once, so the two deepest pools of liquidity combine. The biggest US data releases also land inside the window, adding volatility on top of already peak volume.

**Are spreads tighter during the overlap?**
Yes, typically. With participants from two regions all quoting, the major pairs usually trade at their tightest spreads of the day, which lowers the cost of getting in and out.

**Which pairs are most active in the overlap?**
The dollar majors and big euro and pound crosses, especially EUR/USD, GBP/USD and USD/JPY, since these are the pairs whose home markets are open during the window.

**Is the overlap good for beginners?**
It's the most liquid part of the day, which means tight spreads, but also the most news-driven, which means fast moves. That mix can be harder to manage, not easier. This is general information, not advice about whether it suits your situation.

*This article is for general information only and is not financial advice.*`,
      es: `El solapamiento Londres-Nueva York va de las **13:00 a las 17:00 GMT** en horario estándar, las cuatro horas en que los dos mayores centros de forex del mundo están abiertos a la vez. Es la ventana más movida de toda la jornada: la liquidez toca su punto más profundo, los diferenciales de los pares principales suelen estar en su punto más estrecho y el movimiento del precio es el más sostenido. Esta guía explica cuándo cae exactamente el solapamiento en tu propia zona horaria, por qué concentra tanta actividad y qué significa eso en la práctica.

Si solo tienes un par de horas al día para seguir el mercado, estas son las horas que señalan la mayoría de los operadores. Se combina el flujo de órdenes de dos regiones, las publicaciones de datos estadounidenses más importantes caen justo dentro de la ventana, y la liquidez profunda que aporta Londres se une a la volatilidad que aporta Nueva York. Entender este solapamiento es casi entender la forma de toda la jornada de forex.

## Cuándo se produce el solapamiento Londres-Nueva York

En horario estándar, el solapamiento va de las **13:00 a las 17:00 GMT**. Es el tramo posterior a la apertura de Nueva York a las 13:00 GMT y anterior al cierre de Londres a las 17:00 GMT, la única parte del día en que ambos centros están activos juntos. Como las dos ciudades cambian sus relojes por el horario de verano, la ventana GMT exacta puede desplazarse una hora durante partes del año, pero el propio solapamiento de cuatro horas permanece intacto porque Londres y Nueva York cambian los relojes más o menos en las mismas estaciones.

Así se traduce el solapamiento en varias zonas comunes, usando el caso del invierno del hemisferio norte, cuando ambos centros están en horario estándar.

| Tu ciudad / zona | Inicio del solapamiento | Fin del solapamiento |
| --- | --- | --- |
| Londres (UK) | 13:00 | 17:00 |
| Nueva York (ET) | 08:00 | 12:00 |
| Fráncfort / París (CET) | 14:00 | 18:00 |
| Estambul (TRT) | 16:00 | 20:00 |
| Dubái (GST) | 17:00 | 21:00 |
| Bombay (IST) | 18:30 | 22:30 |
| Singapur (SGT) | 21:00 | 01:00 (día siguiente) |
| Sídney (AEST) | 23:00 | 03:00 (día siguiente) |

En vez de convertir esto a mano y dudar de los desplazamientos por el horario de verano, la [herramienta de horarios del mercado forex en vivo](/es) muestra el solapamiento en tu propia zona horaria en tiempo real y se ajusta automáticamente al cambiar los relojes. Para un desglose más amplio de cada sesión por zonas, consulta nuestra guía sobre el [horario del mercado forex por zona horaria](/es/blog/horario-del-mercado-forex-por-zona-horaria).

## Por qué la liquidez toca su máximo durante el solapamiento

El solapamiento concentra la actividad por una razón estructural sencilla: apila la jornada laboral de dos regiones en las mismas horas del reloj. Londres es el mayor centro de divisas del mundo y Nueva York el segundo, así que cuando ambos están abiertos a la vez, los dos focos de liquidez más profundos del planeta están activos juntos.

La magnitud del dominio de Londres está medida, no es folclore. La **Encuesta Trienal de Bancos Centrales del BIS**, realizada por el Banco de Pagos Internacionales, muestra una y otra vez que el Reino Unido gestiona la mayor cuota individual del volumen mundial de divisas, con Estados Unidos en segundo lugar. Puedes leer la encuesta directamente en https://www.bis.org/statistics/rpfx22.htm. Cuando esos dos centros se solapan, una fracción muy grande de toda la negociación diaria de divisas ocurre en la misma ventana de cuatro horas.

A la escala se le suma un efecto de calendario. Las grandes publicaciones económicas de EE. UU., las nóminas no agrícolas, los datos de inflación y los comentarios de la Reserva Federal, tienden a caer en la mañana de Nueva York, que queda dentro del solapamiento. Así que la ventana combina la liquidez permanente más profunda del día con los momentos con más probabilidad de mover el mercado. Por eso el volumen toca aquí su máximo y por eso el solapamiento, y no la apertura de ninguna sesión concreta, es el verdadero centro de gravedad de la jornada de trading.

## Qué significan unos spreads más estrechos y una liquidez más profunda

La liquidez profunda no es una abstracción; tiene efectos concretos que puedes ver en la pantalla durante el solapamiento.

El más visible son los **diferenciales más estrechos**. El diferencial es la distancia entre el precio al que puedes comprar y el precio al que puedes vender, y se estrecha cuando más participantes están dispuestos a cotizar ambos lados del mercado. Durante el solapamiento, con bancos, fondos y mesas corporativas de dos regiones todos activos, los pares principales suelen negociarse con sus diferenciales más estrechos del día. Eso reduce el coste de entrar y salir de una posición.

El segundo efecto es la **profundidad**. La profundidad es cuánto se puede negociar sin mover mucho el precio. Cuando el mercado es profundo, una orden de tamaño normal se absorbe con suavidad; cuando es delgado, la misma orden puede empujar el precio más de lo esperado. El solapamiento es la parte más profunda del día, así que la ejecución tiende a ser más limpia y el deslizamiento menor que en las horas tranquilas.

El tercero es el **movimiento sostenido**. Al combinarse el flujo de dos regiones, las tendencias que se forman durante el solapamiento suelen tener suficiente participación detrás para prolongarse, en lugar de apagarse con poco volumen. Es una tendencia general más que una garantía, y la liquidez profunda puede coincidir con una volatilidad brusca impulsada por noticias, pero la combinación de diferenciales estrechos y profundidad real es lo que hace destacar a esta ventana.

## Qué pares se mueven más en el solapamiento

El solapamiento favorece a los pares cuyos mercados de origen están en Londres y Nueva York, lo que en la práctica significa los pares principales con el dólar y los grandes cruces del euro y la libra.

**EUR/USD** es la pieza central natural. Es el par más negociado del mundo, y durante el solapamiento tanto el mercado de origen europeo del euro como el americano del dólar están plenamente activos, así que suele mostrar los diferenciales más estrechos y la liquidez más profunda de cualquier par.

**GBP/USD** también es muy activo, al combinar la liquidez del Reino Unido que sigue en marcha con el flujo estadounidense que acaba de llegar. Reacciona con fuerza a los datos de EE. UU. que caen en la ventana.

**USD/JPY** se mueve por los rendimientos de EE. UU. y las expectativas sobre la Fed, ambos en el foco durante la mañana de Nueva York, así que es un par habitual del solapamiento aun con Tokio cerrado. Pares con dólar como **USD/CAD** y **USD/CHF** también registran aquí sus horas más activas.

Se reduce al mismo esquema cada vez: el dólar en un lado y una divisa europea importante en el otro, justo los pares cuyos dos mercados de origen están negociando durante estas cuatro horas. Si quieres ver las sesiones que alimentan el solapamiento, las cubrimos en nuestras guías sobre la [apertura de la sesión de Londres](/es/blog/a-que-hora-abre-la-sesion-de-londres) y la [sesión de Nueva York](/es/blog/sesion-forex-de-nueva-york).

## Cómo se ve el solapamiento en la práctica

El solapamiento es donde la oportunidad y el riesgo están ambos en su punto más alto, y conviene verlos con claridad.

En el lado de la oportunidad, los diferenciales estrechos y la liquidez profunda implican menores costes de transacción y una ejecución más limpia que en cualquier otro momento del día. Los movimientos tienden a ser más sostenidos, algo que a algunos operadores les resulta más fácil de manejar que las horas entrecortadas de baja liquidez. Para quien solo puede seguir el mercado durante una ventana limitada, el solapamiento concentra la mayor actividad en el menor número de horas.

La otra cara es el riesgo. Este es también el tramo en que es más probable que impacten noticias estadounidenses programadas, y las noticias se mueven rápido en cualquier dirección. Una liquidez más profunda no te protege de un movimiento brusco; una posición puede volverse en tu contra tan deprisa como corre a tu favor. Así que toma el solapamiento por lo que es, las horas más movidas y líquidas del día, y deja que tu propio plan, tu tolerancia al riesgo y tus circunstancias decidan si ese ajetreo es donde quieres estar.

Para ver cómo encaja el solapamiento dentro del ciclo completo de 24 horas, nuestra guía de [sesiones de trading forex explicadas](/es/blog/sesiones-de-trading-forex-explicadas) repasa cada sesión y cómo se pasan el relevo por todo el mundo.

## Preguntas frecuentes

**¿A qué hora es el solapamiento Londres-Nueva York?**
En horario estándar va de las 13:00 a las 17:00 GMT, las cuatro horas posteriores a la apertura de Nueva York y anteriores al cierre de Londres. En hora local de Nueva York son las 08:00 a las 12:00. La ventana puede desplazarse una hora en términos de GMT durante partes del año porque ambas ciudades observan el horario de verano.

**¿Por qué el solapamiento es el momento más movido para operar?**
Porque los dos mayores centros de forex del mundo, Londres y Nueva York, están abiertos a la vez, así que se combinan los dos focos de liquidez más profundos. Las mayores publicaciones de datos de EE. UU. también caen dentro de la ventana, añadiendo volatilidad sobre un volumen ya máximo.

**¿Son más estrechos los diferenciales durante el solapamiento?**
Sí, normalmente. Con participantes de dos regiones cotizando, los pares principales suelen negociarse con sus diferenciales más estrechos del día, lo que reduce el coste de entrar y salir.

**¿Qué pares son más activos en el solapamiento?**
Los pares principales con el dólar y los grandes cruces del euro y la libra, sobre todo EUR/USD, GBP/USD y USD/JPY, ya que son los pares cuyos mercados de origen están abiertos durante la ventana.

**¿Es bueno el solapamiento para principiantes?**
Es la parte más líquida del día, lo que implica diferenciales estrechos, pero también la más impulsada por noticias, lo que implica movimientos rápidos. Esa mezcla puede ser más difícil de gestionar, no más fácil. Esto es información general, no un consejo sobre si te conviene según tu situación.

*Este artículo es solo informativo y no constituye asesoramiento financiero.*`,
      fr: `Le chevauchement Londres-New York court de **13:00 à 17:00 GMT** en heure standard : quatre heures pendant lesquelles les deux plus grandes places de change du monde sont ouvertes en même temps. C’est la fenêtre la plus animée de toute la journée de trading : la liquidité y est la plus profonde, les spreads sur les paires majeures sont généralement au plus serré, et les mouvements de prix sont les plus soutenus. Ce guide explique exactement quand le chevauchement tombe dans votre propre fuseau horaire, pourquoi il concentre autant d’activité, et ce que cela signifie en pratique.

Si vous ne disposez que de quelques heures par jour pour suivre le marché, ce sont celles que la plupart des traders désignent. Les flux d’ordres de deux régions se combinent, les publications américaines les plus lourdes tombent en plein dans la fenêtre, et la liquidité profonde qu’apporte Londres rencontre la volatilité qu’apporte New York. Comprendre ce chevauchement revient presque à comprendre la forme de toute la journée forex.

## Quand a lieu le chevauchement Londres-New York

En heure standard, le chevauchement va de **13:00 à 17:00 GMT**. C’est la plage située après l’ouverture de New York à 13:00 GMT et avant la clôture de Londres à 17:00 GMT, le seul moment de la journée où les deux places sont actives ensemble. Comme les deux villes décalent leurs horloges pour l’heure d’été, la fenêtre GMT exacte peut bouger d’une heure pendant certaines parties de l’année, mais le chevauchement de quatre heures lui-même reste intact, parce que Londres et New York changent d’heure à des saisons à peu près identiques.

Voici comment le chevauchement se traduit dans une série de fuseaux courants, dans le cas de l’hiver de l’hémisphère nord, quand les deux places sont à l’heure standard.

| Votre ville / fuseau | Début du chevauchement | Fin du chevauchement |
| --- | --- | --- |
| Londres (Royaume-Uni) | 13:00 | 17:00 |
| New York (ET) | 08:00 | 12:00 |
| Francfort / Paris (CET) | 14:00 | 18:00 |
| Istanbul (TRT) | 16:00 | 20:00 |
| Dubaï (GST) | 17:00 | 21:00 |
| Bombay (IST) | 18:30 | 22:30 |
| Singapour (SGT) | 21:00 | 01:00 (le lendemain) |
| Sydney (AEST) | 23:00 | 03:00 (le lendemain) |

Plutôt que de convertir tout cela à la main et de vous interroger sur les décalages d’heure d’été, l’[outil des horaires du marché forex en direct](/) affiche le chevauchement dans votre propre fuseau en temps réel et s’ajuste automatiquement au changement d’horloge. Pour une décomposition plus large de chaque séance à travers les fuseaux, voyez notre guide des [horaires du forex par fuseau horaire](/fr/blog/horaires-du-forex-par-fuseau-horaire).

## Pourquoi la liquidité culmine pendant le chevauchement

Le chevauchement concentre l’activité pour une raison structurelle simple : il empile la journée de travail de deux régions sur les mêmes heures d’horloge. Londres est la plus grande place de change au monde et New York la deuxième : quand les deux sont ouvertes en même temps, les deux réservoirs de liquidité les plus profonds de la planète sont actifs ensemble.

L’ampleur de la domination de Londres est mesurée, pas légendaire. L’**enquête triennale des banques centrales de la BRI**, menée par la Banque des règlements internationaux, montre systématiquement que le Royaume-Uni traite la plus grande part du volume mondial des changes, les États-Unis venant en deuxième position. Vous pouvez consulter l’enquête directement sur https://www.bis.org/statistics/rpfx22.htm. Quand ces deux places se chevauchent, une très large fraction de tous les échanges quotidiens de devises se produit dans la même fenêtre de quatre heures.

À l’effet d’échelle s’ajoute un effet de calendrier. Les grandes publications économiques américaines, l’emploi non agricole, les données d’inflation et les commentaires de la Réserve fédérale, tombent généralement dans la matinée new-yorkaise, qui se situe à l’intérieur du chevauchement. La fenêtre combine donc la liquidité permanente la plus profonde de la journée avec les moments les plus susceptibles de faire bouger le marché. C’est pourquoi le volume culmine ici et pourquoi le chevauchement, et non l’ouverture d’une séance isolée, est le véritable centre de gravité de la journée de trading.

## Ce que signifient des spreads plus serrés et une liquidité plus profonde

Une liquidité profonde n’est pas une abstraction : elle a des effets concrets visibles à l’écran pendant le chevauchement.

Le plus visible est le **resserrement des spreads**. Le spread est l’écart entre le prix auquel vous pouvez acheter et celui auquel vous pouvez vendre, et il se réduit quand davantage de participants acceptent de coter les deux côtés du marché. Pendant le chevauchement, avec des banques, des fonds et des salles de marché d’entreprises de deux régions tous actifs, les paires majeures s’échangent généralement à leurs spreads les plus serrés de la journée. Cela abaisse le coût d’entrée et de sortie d’une position.

Le deuxième effet est la **profondeur**. La profondeur, c’est le volume qui peut être échangé sans trop faire bouger le prix. Quand le marché est profond, un ordre de taille normale est absorbé sans heurt ; quand il est mince, le même ordre peut pousser le prix plus loin que prévu. Le chevauchement est la partie la plus profonde de la journée : l’exécution y est donc généralement plus propre et le slippage plus réduit qu’aux heures calmes.

Le troisième est la **continuité du mouvement**. Les flux de deux régions se combinant, les tendances qui se forment pendant le chevauchement ont souvent assez de participation derrière elles pour se prolonger, plutôt que de s’essouffler sur un volume mince. C’est une tendance générale plutôt qu’une garantie, et une liquidité plus profonde peut coïncider avec une volatilité brusque liée à l’actualité, mais c’est la combinaison de spreads serrés et d’une profondeur réelle qui distingue cette fenêtre.

## Quelles paires bougent le plus pendant le chevauchement

Le chevauchement favorise les paires dont les marchés d’origine se situent à Londres et à New York, ce qui signifie en pratique les majeures en dollar et les grands croisements en euro et en livre.

**EUR/USD** en est la pièce maîtresse naturelle. C’est la paire la plus tradée au monde, et pendant le chevauchement, le marché d’origine européen de l’euro et le marché américain du dollar sont tous deux pleinement engagés : elle affiche donc généralement les spreads les plus serrés et la liquidité la plus profonde de toutes les paires.

**GBP/USD** est très active elle aussi, combinant une liquidité britannique encore en cours avec un flux américain qui vient d’arriver. Elle réagit vivement aux données américaines qui tombent dans la fenêtre.

**USD/JPY** évolue au gré des taux américains et des anticipations sur la Fed, deux sujets au centre de l’attention pendant la matinée new-yorkaise : c’est donc un mouvement fréquent du chevauchement, même avec Tokyo fermée. Des paires en dollar comme **USD/CAD** et **USD/CHF** connaissent également ici leurs heures les plus actives.

Cela revient chaque fois au même schéma : le dollar d’un côté, une grande devise européenne de l’autre, précisément les paires dont les deux marchés d’origine négocient pendant ces quatre heures. Si vous voulez examiner les séances qui alimentent le chevauchement, nous les traitons dans nos guides sur [l’ouverture de la séance de Londres](/fr/blog/a-quelle-heure-ouvre-la-seance-de-londres) et la [séance de New York](/fr/blog/seance-forex-de-new-york).

## À quoi ressemble le chevauchement en pratique

Le chevauchement est le moment où l’opportunité et le risque sont tous deux à leur maximum, et il vaut mieux voir les deux clairement.

Du côté de l’opportunité, des spreads serrés et une liquidité profonde signifient des coûts de transaction plus bas et une exécution plus propre qu’à tout autre moment de la journée. Les mouvements tendent à être plus soutenus, ce que certains traders trouvent plus facile à exploiter que les heures hachées de faible liquidité. Pour qui ne peut suivre le marché que sur une fenêtre limitée, le chevauchement concentre le maximum d’activité dans le minimum d’heures.

Le revers est le risque. C’est aussi la fenêtre où l’actualité américaine programmée a le plus de chances de tomber, et l’actualité fait bouger vite, dans un sens comme dans l’autre. Une liquidité plus profonde ne vous protège pas d’un mouvement brusque : une position peut se retourner contre vous aussi vite qu’elle peut évoluer en votre faveur. Prenez donc le chevauchement pour ce qu’il est, les heures les plus animées et les plus liquides de la journée, et laissez votre propre plan, votre tolérance au risque et votre situation décider si cette agitation est un endroit où vous voulez être. Notre guide du [meilleur moment pour trader le forex](/fr/blog/meilleur-moment-pour-trader-le-forex) replace cette question dans la semaine entière.

Pour voir comment le chevauchement s’inscrit dans le cycle complet de 24 heures, notre guide [séances de trading forex expliquées](/fr/blog/seances-de-trading-forex-expliquees) parcourt chaque séance et la façon dont elles se passent le relais autour du monde.

## Questions fréquentes

**À quelle heure a lieu le chevauchement Londres-New York ?**
En heure standard, il va de 13:00 à 17:00 GMT : les quatre heures après l’ouverture de New York et avant la clôture de Londres. En heure locale new-yorkaise, cela correspond à 08:00-12:00. La fenêtre peut se décaler d’une heure en GMT pendant certaines parties de l’année, puisque les deux villes appliquent l’heure d’été.

**Pourquoi le chevauchement est-il le moment le plus animé pour trader ?**
Parce que les deux plus grandes places de change du monde, Londres et New York, sont ouvertes en même temps : les deux réservoirs de liquidité les plus profonds se combinent. Les plus grandes publications américaines tombent aussi dans la fenêtre, ajoutant de la volatilité à un volume déjà au sommet.

**Les spreads sont-ils plus serrés pendant le chevauchement ?**
Oui, généralement. Avec des participants de deux régions qui cotent tous, les paires majeures s’échangent habituellement à leurs spreads les plus serrés de la journée, ce qui abaisse le coût d’entrée et de sortie.

**Quelles paires sont les plus actives pendant le chevauchement ?**
Les majeures en dollar et les grands croisements en euro et en livre, en particulier EUR/USD, GBP/USD et USD/JPY, puisque ce sont les paires dont les marchés d’origine sont ouverts pendant la fenêtre.

**Le chevauchement convient-il aux débutants ?**
C’est la partie la plus liquide de la journée, donc des spreads serrés, mais aussi la plus dictée par l’actualité, donc des mouvements rapides. Ce mélange peut être plus difficile à gérer, pas plus facile. Il s’agit d’une information générale et non d’un conseil sur ce qui convient à votre situation.

*Cet article est fourni à titre d’information générale uniquement et ne constitue pas un conseil financier.*`,
    },
  },
  {
    slug: {
      en: "sydney-forex-session",
      es: "sesion-forex-de-sidney",
    },
    title: {
      en: "The Sydney Forex Session: Hours, Best Pairs and Character",
      es: "La sesión forex de Sídney: horario, mejores pares y carácter",
    },
    description: {
      en: "The Sydney forex session opens the trading week at 22:00 GMT. See its hours in your timezone, why liquidity is light, and the best AUD and NZD pairs.",
      es: "La sesión forex de Sídney abre la semana de trading a las 22:00 GMT. Ve su horario en tu zona, por qué la liquidez es baja y los mejores pares AUD y NZD.",
    },
    date: "2026-07-30",
    authorSlug: "author",
    tags: {
      en: ["Sessions", "Sydney"],
      es: ["Sesiones", "Sídney"],
    },
    cover: "/blog/sydney-forex-session.svg",
    body: {
      en: `The Sydney forex session opens the trading week. It comes online on Sunday evening GMT and runs from **22:00 to 07:00 GMT** in standard time, making Sydney the first major centre to reopen after the weekend. It's the quietest of the four major sessions, with lighter liquidity than any other part of the day and a natural focus on the Australian dollar (AUD) and New Zealand dollar (NZD). This guide covers when the Sydney session runs in your own timezone, why it's the calm start of the global relay, and which pairs are most worth watching.

For traders, Sydney sets the early tone. It's where the weekly rhythm begins, where the first prices of the week are formed, and where any weekend news first shows up on the chart. It rarely produces the dramatic moves of London or New York, but its quiet, contained character is exactly what makes it useful to understand.

## Sydney session hours in your timezone

In standard time the Sydney session runs from **22:00 to 07:00 GMT**, which is **08:00 to 17:00 in Sydney local time**, since eastern Australia sits at GMT+10 in standard time. There's an important twist here: Australia is in the southern hemisphere, so its daylight-saving calendar runs opposite to Europe's and North America's. Australian clocks move forward, to GMT+11, around October, exactly when northern clocks fall back, and they move back around April, when northern clocks spring forward. That means the Sydney session's GMT window shifts at different times of year than the London or New York windows do.

The table below shows the Sydney open across a range of common zones, using the case when Sydney is on standard time (AEST, GMT+10).

| Your city / zone | Sydney open (AEST case) | Sydney close (AEST case) |
| --- | --- | --- |
| Sydney (AEST) | 08:00 | 17:00 |
| London (UK, GMT) | 22:00 | 07:00 (next day) |
| New York (ET) | 17:00 | 02:00 (next day) |
| Frankfurt / Paris (CET) | 23:00 | 08:00 (next day) |
| Istanbul (TRT) | 01:00 (next day) | 10:00 (next day) |
| Dubai (GST) | 02:00 (next day) | 11:00 (next day) |
| Mumbai (IST) | 03:30 (next day) | 12:30 (next day) |
| Singapore (SGT) | 06:00 | 15:00 |

Because the northern and southern hemispheres change clocks in opposite directions, the gap between Sydney and cities like London or New York changes by two hours across the year rather than one. That's a common source of confusion, and it's exactly the kind of thing the [live forex market hours tool](/) handles for you, showing Sydney and every other session in your own timezone and adjusting automatically for daylight saving on both sides of the equator.

## Why the Sydney session is the quiet opener

Sydney is the calm start of the global relay rather than a burst of activity. Liquidity during the pure Sydney hours is usually lighter than at any other point in the trading day, for a straightforward reason: the Australian and New Zealand economies, while large and important, run smaller currency markets than Europe or the United States. Fewer participants are active, so ranges tend to be narrower and price movement more measured.

There's also the matter of what else is open. When Sydney comes online on Sunday evening GMT, no other major centre is trading yet. Only once Tokyo joins a couple of hours later does the Asian session gain real depth. So the earliest Sydney hours are the thinnest of the week, which is part of why many traders treat the Sunday open with caution: spreads are wider and price can move more sharply on relatively small orders when there's less depth to absorb them.

None of this makes Sydney unimportant. It opens the week, absorbs any weekend news first, and sets up the ranges that Tokyo and then London trade around. It's simply quieter by nature, and knowing that helps you read the early hours correctly rather than expecting London-style movement from them. For how Sydney hands off to the rest of the day, see our [forex trading sessions explained](/en/blog/forex-trading-sessions-explained) guide.

## Best currency pairs during the Sydney session

The Sydney session naturally centres on the currencies whose home markets are open: the Australian dollar and the New Zealand dollar, along with the Japanese yen once Tokyo starts to overlap.

**AUD/USD** is the headline pair. The Australian dollar is closely tied to commodity prices and to data from the Reserve Bank of Australia, and it sees its most active local trading during these hours. Australian economic releases typically land in the local morning, right in the Sydney session, and can move the pair against an otherwise calm backdrop.

**NZD/USD** behaves similarly, driven by New Zealand data and Reserve Bank of New Zealand decisions. It's often even thinner than AUD/USD, so moves can be sharper relative to the volume behind them.

**AUD/JPY** and **NZD/JPY** become more active as the Sydney session overlaps the Tokyo open. These commodity-yen crosses are popular during Asian hours and can respond to both Australasian and Japanese news.

**AUD/NZD** is a purely regional cross that trades almost entirely within Asia-Pacific hours, useful for taking a view on the relative strength of the two antipodean currencies without the US dollar in the mix.

In short, Sydney rewards the Australasian currencies, because those are the markets awake at the time. For the data that actually moves them, the Reserve Bank of Australia publishes its policy decisions and schedule at https://www.rba.gov.au.

## The Sydney-Tokyo overlap

Sydney doesn't trade in isolation for long. A couple of hours after it opens, Tokyo comes online, and the two sessions overlap through the Asian morning. This **Sydney-Tokyo overlap** is the second, smaller overlap of the trading day, far less active than the London-New York window but meaningful in its own right.

During this overlap, liquidity in yen and Australian dollar pairs improves noticeably compared with the pure Sydney hours. Tokyo brings the first genuinely large pool of Asian liquidity, so pairs like AUD/JPY and USD/JPY trade more actively, and regional news, from Australia, New Zealand, Japan, and often China, can produce real moves. It's still calmer than the European and American sessions, but it's the liveliest part of the Asia-Pacific day.

For a closer look at the session that Sydney hands off to, see our guide to the [Tokyo and Asian forex session](/en/blog/tokyo-asian-forex-session), which covers the range-bound character of Asian hours in more detail.

## Trading Sydney in practice

The Sydney session suits a particular kind of attention rather than a particular strategy, and a few practical points are worth keeping in mind.

Thin liquidity is the defining feature. Wider spreads raise the cost of trading, and lower depth means price can jump on news or on relatively small orders. The Sunday open in particular can show a weekend gap, where the first prices of the week appear at a different level from Friday's close if significant news broke while the market was shut. Many traders wait for spreads to normalise before committing to larger positions.

The flip side is that the calmer, more contained ranges of the Asia-Pacific session can be a steadier environment than the fast-moving European and American hours. That's a matter of temperament and timezone as much as anything: a trader in Sydney, Singapore, or Tokyo is following their local market at a civilised hour, while for someone in London or New York these are overnight hours.

Think of that as a sketch of the session, not a playbook. Thin liquidity means quieter markets most of the time and, now and then, a sharper jump on news; whether it suits you comes down to your pairs, your schedule, and how you like to work. And if you simply want to know whether Sydney is open where you are right now, the [live tool](/) shows its status in real time.

## Frequently asked questions

**What time does the Sydney forex session open?**
It opens at 08:00 Sydney local time, which is 22:00 GMT when Sydney is on standard time (AEST) and 21:00 GMT when it's on daylight time (AEDT). Because Australia is in the southern hemisphere, that switch happens at the opposite time of year to the UK and US.

**Why is the Sydney session so quiet?**
The Australian and New Zealand currency markets are smaller than Europe's or America's, and when Sydney first opens no other major centre is trading yet. That combination makes it the lightest-liquidity, narrowest-range part of the trading day.

**Which pairs are best in the Sydney session?**
The Australasian currencies: AUD/USD, NZD/USD, and the commodity-yen crosses AUD/JPY and NZD/JPY, plus the regional AUD/NZD cross. These are the markets that are awake during Sydney hours.

**Does the Sydney session overlap with Tokyo?**
Yes. A couple of hours after Sydney opens, Tokyo comes online, and the two overlap through the Asian morning. Liquidity in yen and Australian dollar pairs improves during this Sydney-Tokyo overlap.

**When does the Sydney session close?**
It closes at 17:00 Sydney local time, which is 07:00 GMT in the AEST (standard-time) case and 06:00 GMT in the AEDT (daylight-time) case.

*This article is for general information only and is not financial advice.*`,
      es: `La sesión forex de Sídney abre la semana de trading. Entra en línea el domingo por la tarde en GMT y va de las **22:00 a las 07:00 GMT** en horario estándar, lo que convierte a Sídney en el primer gran centro que reabre tras el fin de semana. Es la más tranquila de las cuatro grandes sesiones, con una liquidez más baja que cualquier otra parte del día y un foco natural en el dólar australiano (AUD) y el dólar neozelandés (NZD). Esta guía explica cuándo se desarrolla la sesión de Sídney en tu propia zona horaria, por qué es el arranque tranquilo del relevo global y qué pares merecen más atención.

Para los operadores, Sídney marca el tono temprano. Es donde comienza el ritmo semanal, donde se forman los primeros precios de la semana y donde cualquier noticia del fin de semana aparece primero en el gráfico. Rara vez produce los movimientos dramáticos de Londres o Nueva York, pero su carácter tranquilo y contenido es justo lo que hace útil entenderla.

## Horario de la sesión de Sídney en tu zona horaria

En horario estándar, la sesión de Sídney va de las **22:00 a las 07:00 GMT**, que son las **08:00 a las 17:00 hora local de Sídney**, ya que el este de Australia está en GMT+10 en horario estándar. Aquí hay un matiz importante: Australia está en el hemisferio sur, así que su calendario de horario de verano es el opuesto al de Europa y Norteamérica. Los relojes australianos se adelantan, a GMT+11, en torno a octubre, justo cuando los del norte se atrasan, y se atrasan hacia abril, cuando los del norte se adelantan. Eso significa que la ventana GMT de la sesión de Sídney se desplaza en momentos del año distintos a los de Londres o Nueva York.

La tabla siguiente muestra la apertura de Sídney en varias zonas comunes, usando el caso en que Sídney está en horario estándar (AEST, GMT+10).

| Tu ciudad / zona | Apertura Sídney (caso AEST) | Cierre Sídney (caso AEST) |
| --- | --- | --- |
| Sídney (AEST) | 08:00 | 17:00 |
| Londres (UK, GMT) | 22:00 | 07:00 (día siguiente) |
| Nueva York (ET) | 17:00 | 02:00 (día siguiente) |
| Fráncfort / París (CET) | 23:00 | 08:00 (día siguiente) |
| Estambul (TRT) | 01:00 (día siguiente) | 10:00 (día siguiente) |
| Dubái (GST) | 02:00 (día siguiente) | 11:00 (día siguiente) |
| Bombay (IST) | 03:30 (día siguiente) | 12:30 (día siguiente) |
| Singapur (SGT) | 06:00 | 15:00 |

Como los hemisferios norte y sur cambian los relojes en sentidos opuestos, la diferencia entre Sídney y ciudades como Londres o Nueva York cambia en dos horas a lo largo del año en lugar de una. Es una fuente habitual de confusión, y es justo el tipo de cosa que la [herramienta de horarios del mercado forex en vivo](/es) resuelve por ti, mostrando Sídney y cada una de las demás sesiones en tu propia zona horaria y ajustándose automáticamente al horario de verano a ambos lados del ecuador.

## Por qué la sesión de Sídney es el arranque tranquilo

Sídney es el arranque tranquilo del relevo global, no un estallido de actividad. La liquidez durante las horas puras de Sídney suele ser más baja que en cualquier otro momento de la jornada, por una razón sencilla: las economías australiana y neozelandesa, aunque grandes e importantes, tienen mercados de divisas más pequeños que los de Europa o Estados Unidos. Hay menos participantes activos, así que los rangos tienden a ser más estrechos y el movimiento del precio más pausado.

También está la cuestión de qué más está abierto. Cuando Sídney entra en línea el domingo por la tarde en GMT, ningún otro centro importante está operando todavía. Solo cuando Tokio se incorpora un par de horas después la sesión asiática gana profundidad real. Así que las primeras horas de Sídney son las más delgadas de la semana, y en parte por eso muchos operadores tratan la apertura del domingo con cautela: los diferenciales son más amplios y el precio puede moverse con más brusquedad ante órdenes relativamente pequeñas cuando hay menos profundidad para absorberlas.

Nada de esto hace que Sídney sea poco importante. Abre la semana, absorbe primero cualquier noticia del fin de semana y prepara los rangos en torno a los cuales negocian Tokio y después Londres. Simplemente es más tranquila por naturaleza, y saberlo ayuda a leer las primeras horas correctamente en lugar de esperar de ellas un movimiento al estilo de Londres. Para saber cómo cede Sídney el relevo al resto del día, consulta nuestra guía de [sesiones de trading forex explicadas](/es/blog/sesiones-de-trading-forex-explicadas).

## Mejores pares de divisas durante la sesión de Sídney

La sesión de Sídney se centra de forma natural en las divisas cuyos mercados de origen están abiertos: el dólar australiano y el dólar neozelandés, junto con el yen japonés en cuanto Tokio empieza a solaparse.

**AUD/USD** es el par protagonista. El dólar australiano está estrechamente ligado a los precios de las materias primas y a los datos del Banco de la Reserva de Australia, y registra su negociación local más activa durante estas horas. Las publicaciones económicas australianas suelen caer en la mañana local, justo en la sesión de Sídney, y pueden mover el par sobre un fondo por lo demás tranquilo.

**NZD/USD** se comporta de forma parecida, impulsado por los datos de Nueva Zelanda y las decisiones del Banco de la Reserva de Nueva Zelanda. Suele ser incluso más delgado que AUD/USD, así que los movimientos pueden ser más bruscos en relación con el volumen que los respalda.

**AUD/JPY** y **NZD/JPY** se vuelven más activos a medida que la sesión de Sídney se solapa con la apertura de Tokio. Estos cruces de materias primas con el yen son populares durante el horario asiático y pueden responder tanto a noticias de Australasia como de Japón.

**AUD/NZD** es un cruce puramente regional que se negocia casi por completo dentro del horario de Asia-Pacífico, útil para tomar una postura sobre la fuerza relativa de las dos divisas de las antípodas sin el dólar de por medio.

En resumen, Sídney premia a las divisas de Australasia, porque son los mercados despiertos a esa hora. Para los datos que de verdad las mueven, el Banco de la Reserva de Australia publica sus decisiones de política y su calendario en https://www.rba.gov.au.

## El solapamiento entre Sídney y Tokio

Sídney no negocia aislado por mucho tiempo. Un par de horas después de abrir, Tokio entra en línea, y las dos sesiones se solapan durante la mañana asiática. Este **solapamiento Sídney-Tokio** es el segundo solapamiento, más pequeño, de la jornada, mucho menos activo que la ventana de Londres-Nueva York pero relevante por sí mismo.

Durante este solapamiento, la liquidez en los pares con yen y con dólar australiano mejora de forma notable frente a las horas puras de Sídney. Tokio aporta el primer conjunto verdaderamente grande de liquidez asiática, así que pares como AUD/JPY y USD/JPY se negocian con más actividad, y las noticias regionales, de Australia, Nueva Zelanda, Japón y a menudo China, pueden producir movimientos reales. Sigue siendo más tranquilo que las sesiones europea y americana, pero es la parte más animada de la jornada de Asia-Pacífico.

Para una mirada más de cerca a la sesión a la que Sídney cede el relevo, consulta nuestra guía sobre la [sesión forex asiática de Tokio](/es/blog/sesion-forex-asiatica-tokio), que cubre con más detalle el carácter lateral del horario asiático.

## Operar en Sídney en la práctica

La sesión de Sídney conviene a un tipo particular de atención más que a una estrategia concreta, y hay algunos puntos prácticos que merece la pena tener en cuenta.

La escasa liquidez es el rasgo definitorio. Unos diferenciales más amplios elevan el coste de operar, y una menor profundidad significa que el precio puede saltar ante noticias o ante órdenes relativamente pequeñas. La apertura del domingo en particular puede mostrar un hueco del fin de semana, en el que los primeros precios de la semana aparecen en un nivel distinto al cierre del viernes si surgieron noticias importantes mientras el mercado estaba cerrado. Muchos operadores esperan a que los diferenciales se normalicen antes de asumir posiciones mayores.

La otra cara es que los rangos más tranquilos y contenidos de la sesión de Asia-Pacífico pueden ser un entorno más estable que las veloces horas europea y americana. Eso es tanto una cuestión de temperamento y zona horaria como de otra cosa: un operador en Sídney, Singapur o Tokio sigue su mercado local a una hora razonable, mientras que para alguien en Londres o Nueva York estas son horas nocturnas.

Piensa en esto como un boceto de la sesión, no como un manual de jugadas. La liquidez más ligera se traduce en mercados más tranquilos casi siempre y, de vez en cuando, en un salto más brusco ante noticias; si te conviene depende de tus pares, tu horario y tu forma de trabajar. Y si solo quieres saber si Sídney está abierto donde estás ahora mismo, la [herramienta en vivo](/es) muestra su estado en tiempo real.

## Preguntas frecuentes

**¿A qué hora abre la sesión forex de Sídney?**
Abre a las 08:00 hora local de Sídney, que son las 22:00 GMT cuando Sídney está en horario estándar (AEST) y las 21:00 GMT cuando está en horario de verano (AEDT). Como Australia está en el hemisferio sur, ese cambio ocurre en la época del año opuesta a la del Reino Unido y EE. UU.

**¿Por qué es tan tranquila la sesión de Sídney?**
Los mercados de divisas de Australia y Nueva Zelanda son más pequeños que los de Europa o América, y cuando Sídney abre por primera vez ningún otro centro importante está operando todavía. Esa combinación la convierte en la parte de la jornada con menor liquidez y rangos más estrechos.

**¿Qué pares son mejores en la sesión de Sídney?**
Las divisas de Australasia: AUD/USD, NZD/USD y los cruces de materias primas con el yen AUD/JPY y NZD/JPY, más el cruce regional AUD/NZD. Son los mercados que están despiertos durante el horario de Sídney.

**¿Se solapa la sesión de Sídney con Tokio?**
Sí. Un par de horas después de que Sídney abra, Tokio entra en línea, y las dos se solapan durante la mañana asiática. La liquidez en los pares con yen y con dólar australiano mejora durante este solapamiento Sídney-Tokio.

**¿Cuándo cierra la sesión de Sídney?**
Cierra a las 17:00 hora local de Sídney, que son las 07:00 GMT en el caso AEST (horario estándar) y las 06:00 GMT en el caso AEDT (horario de verano).

*Este artículo es solo informativo y no constituye asesoramiento financiero.*`,
    },
  },
  {
    slug: {
      en: "best-time-to-trade-forex",
      es: "mejor-hora-para-operar-en-forex",
      fr: "meilleur-moment-pour-trader-le-forex",
    },
    title: {
      en: "The Best Time to Trade Forex: Sessions, Overlaps and Days",
      es: "La mejor hora para operar en forex: sesiones, solapamientos y días",
      fr: "Meilleur moment pour trader le forex : heures et jours",
    },
    description: {
      en: "The best time to trade forex is the London-New York overlap, 13:00-17:00 GMT, when liquidity peaks. See the busiest sessions, days and how to find yours.",
      es: "La mejor hora para operar en forex es el solapamiento Londres-Nueva York, 13:00-17:00 GMT, con la liquidez más alta. Ve las sesiones y días más movidos.",
      fr: "Le meilleur moment pour trader le forex est le chevauchement Londres-New York, 13:00-17:00 GMT. Séances, jours les plus actifs et comment choisir le vôtre.",
    },
    date: "2026-07-31",
    authorSlug: "author",
    tags: {
      en: ["Strategy", "Basics"],
      es: ["Estrategia", "Fundamentos"],
      fr: ["Stratégie", "Horaires"],
    },
    cover: "/blog/best-time-to-trade-forex.svg",
    body: {
      en: `The most active time to trade forex is the **London-New York overlap**, roughly **13:00 to 17:00 GMT** in standard time, when the world's two largest financial centres are open at once and liquidity is at its deepest. That said, the "best" time isn't the same for everyone: it depends on the pairs you follow, your own timezone, and whether you want high activity or calmer conditions. This guide walks through the busiest sessions, the quietest ones, the best days of the week, and how to find the window that actually suits you.

There's no single magic hour that works for every trader. What the market data does show clearly is when volume and volatility are highest, and that's a sensible starting point. From there, the right time for you is a matter of matching those patterns to your strategy and your schedule.

## The busiest window: the London-New York overlap

If there's one answer to when the market is most active, it's the London-New York overlap. For the four hours from about **13:00 to 17:00 GMT**, London and New York, the two largest FX centres in the world, are open at the same time. Their order flow combines, liquidity hits its daily peak, spreads on the major pairs are usually at their tightest, and price movement tends to be at its most sustained.

The dominance of these two centres is measured, not anecdotal. The **BIS Triennial Central Bank Survey**, from the Bank for International Settlements, consistently shows the United Kingdom and the United States handling the two largest shares of global FX turnover. You can read it at https://www.bis.org/statistics/rpfx22.htm. When both are open together, a very large fraction of the day's trading happens in this one window, which is why so many traders build their day around it. We cover it in detail in our guide to the [London-New York overlap](/en/blog/london-new-york-overlap).

## How each session compares for activity

Activity isn't evenly spread across the trading day. Each session has a distinct level of liquidity and a distinct character, and knowing the pattern helps you pick your moment.

| Session | Hours (GMT, standard) | Activity level |
| --- | --- | --- |
| Sydney | 22:00 - 07:00 | Light; opens the week, narrow ranges |
| Tokyo | 00:00 - 09:00 | Moderate; often range-bound, yen focus |
| London | 08:00 - 17:00 | Highest single-session volume |
| New York | 13:00 - 22:00 | High early, thins after London closes |
| London-NY overlap | 13:00 - 17:00 | Peak of the entire day |

The **London session** on its own carries the largest turnover of any single session, so the London open around 08:00 GMT is a high-activity moment in its own right. The **New York morning** is lively too, especially where it overlaps London. The **Tokyo session** is more moderate and tends to trade in ranges, while **Sydney** is the quietest, opening the week on light liquidity. The clear low point is the late New York afternoon after London closes, from about 17:00 to 22:00 GMT, when volume drains toward the daily lull.

For deeper looks at the individual sessions, see our guides to the [London session open](/en/blog/what-time-does-the-london-session-open), the [New York session](/en/blog/new-york-forex-session), the [Tokyo session](/en/blog/tokyo-asian-forex-session), and the [Sydney session](/en/blog/sydney-forex-session).

## Best days of the week to trade

Just as activity varies through the day, it varies through the week. The broad pattern is that the **middle of the week is the most active**, and the edges are quieter.

**Monday** starts slowly. The market reopens on Sunday evening in light Asia-Pacific liquidity, and it often takes until the London session for volume to build properly. Early Monday can lack clear direction as the week finds its footing.

**Tuesday, Wednesday, and Thursday** are typically the busiest and most liquid days. This is when the major scheduled economic releases cluster, when institutional flow is at its fullest, and when trends tend to be cleanest. If you're looking for the heart of the trading week, it's here.

**Friday** is active in its first half, especially around any US data in the morning, but it tends to thin out in the afternoon as traders close positions ahead of the weekend. The market shuts at 5 PM New York time, and liquidity fades into that close. Some traders avoid the late-Friday session because of that thinning and the gap risk that comes with holding through the weekend.

For more on the weekly open and close, and which days carry holiday liquidity risk, see our guide to whether the [forex market is open today](/en/blog/is-the-forex-market-open-today).

## When volatility is highest, and why more isn't always better

High activity usually means high volatility, and it's worth being clear that this is not automatically a good thing. Volatility is movement, and movement is opportunity and risk in equal measure.

Volatility peaks around the session opens and during the London-New York overlap, and it spikes hardest around scheduled news: the US non-farm payrolls report, inflation data, and central-bank decisions from the [Federal Reserve](https://www.federalreserve.gov) and the [Bank of England](https://www.bankofengland.co.uk). These moments produce the largest, fastest moves of the week, which is exactly why some traders seek them out and others deliberately avoid them.

The thing to hold onto is that more movement isn't the same as better trading. A volatile market throws up false starts and sharp reversals just as readily as clean trends, and a wide swing can take out a stop as fast as it can run a trade into profit. Quieter sessions trade in smaller ranges that plenty of people find easier to handle. Neither is better in the abstract; they just suit different temperaments. All of this describes when the market moves, and stops there. What you make of those moments is your call.

## Finding the best time for you

The "best" time to trade is ultimately personal, and it comes down to three things: your pairs, your timezone, and your style.

**Your pairs.** Each currency is most active when its home market is open. Euro and pound pairs trade best during the London session; dollar pairs peak in the New York morning; yen pairs are liveliest in Tokyo hours; and the Australian and New Zealand dollars are most active in the Sydney-Tokyo window. Trading a pair when its markets are awake usually means tighter spreads and better liquidity.

**Your timezone.** You have to trade at hours you can actually be present for. The London-New York overlap is the most active window, but if it falls in the middle of your night, forcing yourself to trade it isn't sensible. Many traders do better following a session that lines up with their own waking hours, even if it's quieter.

**Your style.** If you want fast movement and are set up to manage it, the overlaps and session opens are where the action is. If you prefer calmer, more contained conditions, the Asian session or the quieter hours may suit you better.

The practical way to match all three is to see the sessions in your own local time rather than converting GMT in your head. The [live forex market hours tool](/) shows every session's status in your timezone in real time and adjusts automatically for daylight saving, so you can see at a glance which window is open when you are.

## Frequently asked questions

**What is the best time of day to trade forex?**
The most active window is the London-New York overlap, roughly 13:00 to 17:00 GMT, when both major centres are open and liquidity peaks. Whether it's the "best" time for you also depends on your pairs, your timezone, and your strategy.

**What is the best day of the week to trade forex?**
Tuesday, Wednesday, and Thursday are typically the most active and liquid, with the major data releases and the fullest institutional flow. Monday starts slowly and Friday thins out in the afternoon ahead of the weekend close.

**Is higher volatility better for trading?**
Not necessarily. Higher volatility means larger moves in both directions, which is as much risk as opportunity. Quieter sessions offer smaller, more contained ranges. The right level depends on your approach, not on a single rule.

**When should I avoid trading forex?**
Many traders are cautious during the thinnest hours, the late New York afternoon after London closes, the Sunday open, and major holidays, when wider spreads and low liquidity can make conditions poor. This is general information, not advice.

**How do I know which session is open in my timezone?**
Use a live tool that converts the sessions to your local time and adjusts for daylight saving, rather than converting GMT by hand. The forexmarkethours.app tool shows each session's current status wherever you are.

*This article is for general information only and is not financial advice.*`,
      es: `El momento más activo para operar en forex es el **solapamiento Londres-Nueva York**, aproximadamente de las **13:00 a las 17:00 GMT** en horario estándar, cuando los dos mayores centros financieros del mundo están abiertos a la vez y la liquidez toca su punto más profundo. Dicho esto, la "mejor" hora no es la misma para todos: depende de los pares que sigas, de tu propia zona horaria y de si buscas mucha actividad o condiciones más tranquilas. Esta guía repasa las sesiones más movidas, las más tranquilas, los mejores días de la semana y cómo encontrar la ventana que de verdad te conviene.

No hay una única hora mágica que funcione para todos los operadores. Lo que sí muestran con claridad los datos del mercado es cuándo el volumen y la volatilidad son más altos, y ese es un punto de partida sensato. A partir de ahí, la hora adecuada para ti es cuestión de ajustar esos patrones a tu estrategia y tu horario.

## La ventana más movida: el solapamiento Londres-Nueva York

Si hay una respuesta a cuándo está más activo el mercado, es el solapamiento Londres-Nueva York. Durante las cuatro horas de aproximadamente las **13:00 a las 17:00 GMT**, Londres y Nueva York, los dos mayores centros de forex del mundo, están abiertos a la vez. Su flujo de órdenes se combina, la liquidez alcanza su máximo diario, los diferenciales de los pares principales suelen estar en su punto más estrecho y el movimiento del precio tiende a ser el más sostenido.

El dominio de estos dos centros está medido, no es anecdótico. La **Encuesta Trienal de Bancos Centrales del BIS**, del Banco de Pagos Internacionales, muestra una y otra vez que el Reino Unido y Estados Unidos gestionan las dos mayores cuotas del volumen mundial de divisas. Puedes leerla en https://www.bis.org/statistics/rpfx22.htm. Cuando ambos están abiertos juntos, una fracción muy grande de la negociación del día ocurre en esta única ventana, y por eso tantos operadores organizan su jornada en torno a ella. La analizamos en detalle en nuestra guía sobre el [solapamiento Londres-Nueva York](/es/blog/solapamiento-londres-nueva-york).

## Cómo se comparan las sesiones en actividad

La actividad no se reparte de forma uniforme a lo largo de la jornada. Cada sesión tiene un nivel de liquidez y un carácter distintos, y conocer el patrón ayuda a elegir tu momento.

| Sesión | Horario (GMT, estándar) | Nivel de actividad |
| --- | --- | --- |
| Sídney | 22:00 - 07:00 | Bajo; abre la semana, rangos estrechos |
| Tokio | 00:00 - 09:00 | Moderado; a menudo lateral, foco en el yen |
| Londres | 08:00 - 17:00 | El mayor volumen de una sola sesión |
| Nueva York | 13:00 - 22:00 | Alto al principio, se adelgaza tras cerrar Londres |
| Solapamiento Londres-NY | 13:00 - 17:00 | Máximo de toda la jornada |

La **sesión de Londres** por sí sola concentra el mayor volumen de cualquier sesión individual, así que la apertura de Londres en torno a las 08:00 GMT es un momento de alta actividad por derecho propio. La **mañana de Nueva York** también es animada, sobre todo donde se solapa con Londres. La **sesión de Tokio** es más moderada y tiende a negociar en rangos, mientras que **Sídney** es la más tranquila, abriendo la semana con liquidez ligera. El punto bajo claro es la tarde tardía de Nueva York tras cerrar Londres, de aproximadamente las 17:00 a las 22:00 GMT, cuando el volumen se drena hacia la calma diaria.

Para miradas más profundas a cada sesión, consulta nuestras guías sobre la [apertura de la sesión de Londres](/es/blog/a-que-hora-abre-la-sesion-de-londres), la [sesión de Nueva York](/es/blog/sesion-forex-de-nueva-york), la [sesión de Tokio](/es/blog/sesion-forex-asiatica-tokio) y la [sesión de Sídney](/es/blog/sesion-forex-de-sidney).

## Mejores días de la semana para operar

Igual que la actividad varía a lo largo del día, varía a lo largo de la semana. El patrón general es que el **centro de la semana es el más activo**, y los extremos son más tranquilos.

El **lunes** empieza despacio. El mercado reabre el domingo por la tarde con liquidez ligera de Asia-Pacífico, y a menudo hay que esperar a la sesión de Londres para que el volumen se forme como es debido. El lunes temprano puede carecer de dirección clara mientras la semana toma impulso.

El **martes, miércoles y jueves** son normalmente los días más movidos y líquidos. Es cuando se concentran las grandes publicaciones económicas programadas, cuando el flujo institucional está en su punto más pleno y cuando las tendencias tienden a ser más limpias. Si buscas el corazón de la semana de trading, está aquí.

El **viernes** es activo en su primera mitad, sobre todo en torno a cualquier dato estadounidense de la mañana, pero tiende a adelgazarse por la tarde a medida que los operadores cierran posiciones antes del fin de semana. El mercado cierra a las 5 PM hora de Nueva York, y la liquidez se desvanece hacia ese cierre. Algunos operadores evitan la sesión del viernes tardío por ese adelgazamiento y por el riesgo de hueco que conlleva mantener posiciones durante el fin de semana.

Para saber más sobre la apertura y el cierre semanales, y qué días conllevan riesgo de liquidez por festivos, consulta nuestra guía sobre si el [mercado forex está abierto hoy](/es/blog/esta-abierto-el-mercado-forex-hoy).

## Cuándo es más alta la volatilidad, y por qué más no siempre es mejor

Mucha actividad suele significar mucha volatilidad, y conviene tener claro que eso no es automáticamente algo bueno. La volatilidad es movimiento, y el movimiento es oportunidad y riesgo a partes iguales.

La volatilidad toca su máximo en torno a las aperturas de sesión y durante el solapamiento Londres-Nueva York, y se dispara con más fuerza en torno a las noticias programadas: el informe de nóminas no agrícolas de EE. UU., los datos de inflación y las decisiones de los bancos centrales de la [Reserva Federal](https://www.federalreserve.gov) y el [Banco de Inglaterra](https://www.bankofengland.co.uk). Esos momentos producen los movimientos más grandes y rápidos de la semana, y por eso mismo algunos operadores los buscan y otros los evitan deliberadamente.

Lo que conviene retener es que más movimiento no equivale a mejor trading. Un mercado volátil deja arranques en falso y reversiones bruscas con la misma facilidad que tendencias limpias, y una oscilación amplia puede saltarte un stop tan rápido como llevar una operación a ganancias. Las sesiones más tranquilas se mueven en rangos más pequeños que a mucha gente le resultan más fáciles de manejar. Ninguna es mejor en abstracto; sencillamente convienen a temperamentos distintos. Todo esto describe cuándo se mueve el mercado y se queda ahí; qué haces con esos momentos es cosa tuya.

## Encontrar la mejor hora para ti

La "mejor" hora para operar es en última instancia personal, y se reduce a tres cosas: tus pares, tu zona horaria y tu estilo.

**Tus pares.** Cada divisa está más activa cuando su mercado de origen está abierto. Los pares con euro y libra se negocian mejor durante la sesión de Londres; los pares con dólar tocan su máximo en la mañana de Nueva York; los pares con yen están más animados en el horario de Tokio; y los dólares australiano y neozelandés son más activos en la ventana Sídney-Tokio. Operar un par cuando sus mercados están despiertos suele implicar diferenciales más estrechos y mejor liquidez.

**Tu zona horaria.** Tienes que operar a horas en las que realmente puedas estar presente. El solapamiento Londres-Nueva York es la ventana más activa, pero si te cae en mitad de la noche, forzarte a operarla no es sensato. A muchos operadores les va mejor seguir una sesión que coincida con sus propias horas de vigilia, aunque sea más tranquila.

**Tu estilo.** Si quieres movimiento rápido y estás preparado para gestionarlo, los solapamientos y las aperturas de sesión son donde está la acción. Si prefieres condiciones más tranquilas y contenidas, la sesión asiática o las horas más calmadas pueden convenirte mejor.

La forma práctica de ajustar las tres cosas es ver las sesiones en tu propia hora local en lugar de convertir el GMT mentalmente. La [herramienta de horarios del mercado forex en vivo](/es) muestra el estado de cada sesión en tu zona horaria en tiempo real y se ajusta automáticamente al horario de verano, para que veas de un vistazo qué ventana está abierta cuando tú lo estás.

## Preguntas frecuentes

**¿Cuál es la mejor hora del día para operar en forex?**
La ventana más activa es el solapamiento Londres-Nueva York, aproximadamente de las 13:00 a las 17:00 GMT, cuando ambos centros principales están abiertos y la liquidez toca su máximo. Si es la "mejor" hora para ti depende además de tus pares, tu zona horaria y tu estrategia.

**¿Cuál es el mejor día de la semana para operar en forex?**
El martes, el miércoles y el jueves son normalmente los más activos y líquidos, con las grandes publicaciones de datos y el flujo institucional más pleno. El lunes empieza despacio y el viernes se adelgaza por la tarde antes del cierre del fin de semana.

**¿Es mejor para operar una volatilidad más alta?**
No necesariamente. Una mayor volatilidad significa movimientos más grandes en ambas direcciones, que son tanto riesgo como oportunidad. Las sesiones más tranquilas ofrecen rangos más pequeños y contenidos. El nivel adecuado depende de tu enfoque, no de una única regla.

**¿Cuándo debería evitar operar en forex?**
Muchos operadores son cautelosos durante las horas más delgadas, la tarde tardía de Nueva York tras cerrar Londres, la apertura del domingo y los grandes festivos, cuando los diferenciales amplios y la baja liquidez pueden empeorar las condiciones. Esto es información general, no un consejo.

**¿Cómo sé qué sesión está abierta en mi zona horaria?**
Usa una herramienta en vivo que convierta las sesiones a tu hora local y se ajuste al horario de verano, en lugar de convertir el GMT a mano. La herramienta de forexmarkethours.app muestra el estado actual de cada sesión estés donde estés.

*Este artículo es solo informativo y no constituye asesoramiento financiero.*`,
      fr: `Le moment le plus actif pour trader le forex est le **chevauchement Londres-New York**, approximativement de **13:00 à 17:00 GMT** en heure standard, quand les deux plus grandes places financières du monde sont ouvertes en même temps et que la liquidité est à son maximum. Cela dit, le « meilleur » moment n’est pas le même pour tout le monde : il dépend des paires que vous suivez, de votre propre fuseau horaire, et de votre préférence pour une forte activité ou pour des conditions plus calmes. Ce guide parcourt les séances les plus animées, les plus calmes, les meilleurs jours de la semaine, et la manière de trouver la fenêtre qui vous convient réellement.

Il n’existe pas d’heure magique unique qui fonctionne pour chaque trader. Ce que les données de marché montrent clairement, en revanche, c’est à quel moment le volume et la volatilité sont les plus élevés, et c’est un point de départ raisonnable. À partir de là, le bon moment pour vous consiste à faire correspondre ces schémas à votre stratégie et à votre emploi du temps.

## La fenêtre la plus animée : le chevauchement Londres-New York

S’il fallait une seule réponse à la question du moment où le marché est le plus actif, ce serait le chevauchement Londres-New York. Pendant les quatre heures allant d’environ **13:00 à 17:00 GMT**, Londres et New York, les deux plus grandes places de change au monde, sont ouvertes en même temps. Leurs flux d’ordres se combinent, la liquidité atteint son sommet quotidien, les spreads sur les paires majeures sont généralement au plus serré, et les mouvements de prix tendent à être les plus soutenus.

La domination de ces deux places est mesurée, pas anecdotique. L’**enquête triennale des banques centrales de la BRI**, de la Banque des règlements internationaux, montre systématiquement que le Royaume-Uni et les États-Unis traitent les deux plus grandes parts du volume mondial des changes. Vous pouvez la consulter sur https://www.bis.org/statistics/rpfx22.htm. Quand les deux sont ouvertes ensemble, une très large fraction des échanges de la journée se concentre dans cette seule fenêtre, ce qui explique pourquoi tant de traders organisent leur journée autour d’elle. Nous la détaillons dans notre guide du [chevauchement Londres-New York](/fr/blog/chevauchement-londres-new-york).

## Comment chaque séance se compare en termes d’activité

L’activité n’est pas répartie uniformément sur la journée de trading. Chaque séance a un niveau de liquidité et un caractère distincts, et connaître ce schéma aide à choisir son moment.

| Séance | Horaires (GMT, standard) | Niveau d’activité |
| --- | --- | --- |
| Sydney | 22:00 - 07:00 | Faible ; ouvre la semaine, amplitudes étroites |
| Tokyo | 00:00 - 09:00 | Modéré ; souvent en range, focus yen |
| Londres | 08:00 - 17:00 | Le plus gros volume d’une séance isolée |
| New York | 13:00 - 22:00 | Élevé au début, s’amenuise après la clôture de Londres |
| Chevauchement Londres-NY | 13:00 - 17:00 | Sommet de toute la journée |

La **séance de Londres** porte à elle seule le plus gros volume de toutes les séances : l’ouverture londonienne vers 08:00 GMT est donc en soi un moment de forte activité. La **matinée new-yorkaise** est animée elle aussi, surtout là où elle chevauche Londres. La **séance de Tokyo** est plus modérée et évolue souvent en range, tandis que **Sydney** est la plus calme et ouvre la semaine sur une liquidité légère. Le point bas manifeste est la fin d’après-midi new-yorkaise après la clôture de Londres, d’environ 17:00 à 22:00 GMT, quand le volume se retire vers le creux quotidien.

Pour un examen plus approfondi de chaque séance, voyez nos guides sur [l’ouverture de la séance de Londres](/fr/blog/a-quelle-heure-ouvre-la-seance-de-londres), la [séance de New York](/fr/blog/seance-forex-de-new-york), la [séance de Tokyo](/fr/blog/seance-forex-de-tokyo-asie) et la [séance de Sydney](/fr/blog/seance-forex-de-sydney). Notre guide [séances de trading forex expliquées](/fr/blog/seances-de-trading-forex-expliquees) resitue l’ensemble du relais.

## Les meilleurs jours de la semaine pour trader

De même que l’activité varie au cours de la journée, elle varie au cours de la semaine. Le schéma général est que le **milieu de semaine est le plus actif**, et que les extrémités sont plus calmes.

**Le lundi** démarre lentement. Le marché rouvre le dimanche soir dans la liquidité légère de l’Asie-Pacifique, et il faut souvent attendre la séance de Londres pour que le volume se construise vraiment. Le début du lundi peut manquer de direction nette, le temps que la semaine trouve son assise.

**Le mardi, le mercredi et le jeudi** sont généralement les jours les plus actifs et les plus liquides. C’est là que se concentrent les grandes publications économiques programmées, que le flux institutionnel est le plus fourni, et que les tendances sont le plus souvent les plus nettes. Si vous cherchez le cœur de la semaine de trading, il est ici.

**Le vendredi** est actif dans sa première moitié, en particulier autour des données américaines du matin, mais il tend à s’amenuiser l’après-midi à mesure que les traders soldent leurs positions avant le week-end. Le marché ferme à 17h00 heure de New York, et la liquidité s’efface vers cette clôture. Certains traders évitent la fin de séance du vendredi à cause de cet assèchement et du risque de gap lié à une position conservée pendant le week-end.

Pour en savoir plus sur l’ouverture et la clôture hebdomadaires, et sur les jours porteurs d’un risque de liquidité lié aux jours fériés, voyez notre guide pour savoir si le [marché du forex est ouvert aujourd’hui](/fr/blog/le-marche-du-forex-est-il-ouvert-aujourd-hui) et notre article sur [l’heure d’ouverture du marché du forex](/fr/blog/a-quelle-heure-ouvre-le-marche-du-forex).

## Quand la volatilité est la plus forte, et pourquoi « plus » ne vaut pas toujours « mieux »

Une forte activité signifie généralement une forte volatilité, et il faut être clair : ce n’est pas automatiquement une bonne chose. La volatilité, c’est du mouvement, et le mouvement est à parts égales une opportunité et un risque.

La volatilité culmine autour des ouvertures de séance et pendant le chevauchement Londres-New York, et elle s’envole surtout autour des annonces programmées : le rapport américain sur l’emploi non agricole, les données d’inflation, et les décisions de la [Réserve fédérale](https://www.federalreserve.gov) et de la [Banque d’Angleterre](https://www.bankofengland.co.uk). Ces moments produisent les mouvements les plus amples et les plus rapides de la semaine, ce qui explique précisément pourquoi certains traders les recherchent et d’autres les évitent délibérément.

Ce qu’il faut retenir, c’est que davantage de mouvement n’équivaut pas à un meilleur trading. Un marché volatil génère de faux départs et des retournements brusques aussi facilement que des tendances propres, et une large oscillation peut faire sauter un stop aussi vite qu’elle peut porter une position en profit. Les séances plus calmes évoluent dans des amplitudes plus réduites, que beaucoup trouvent plus faciles à gérer. Aucune n’est meilleure dans l’absolu ; elles conviennent simplement à des tempéraments différents. Tout ceci décrit quand le marché bouge, et s’arrête là. Ce que vous faites de ces moments ne dépend que de vous.

## Trouver le meilleur moment pour vous

Le « meilleur » moment pour trader est en fin de compte personnel, et il se résume à trois choses : vos paires, votre fuseau horaire et votre style.

**Vos paires.** Chaque devise est la plus active quand son marché d’origine est ouvert. Les paires en euro et en livre s’échangent le mieux pendant la séance de Londres ; les paires en dollar culminent dans la matinée new-yorkaise ; les paires en yen sont les plus animées aux heures de Tokyo ; et les dollars australien et néo-zélandais sont les plus actifs dans la fenêtre Sydney-Tokyo. Trader une paire quand ses marchés sont éveillés signifie généralement des spreads plus serrés et une meilleure liquidité.

**Votre fuseau horaire.** Vous devez trader à des heures où vous pouvez réellement être présent. Le chevauchement Londres-New York est la fenêtre la plus active, mais s’il tombe au milieu de votre nuit, vous forcer à le trader n’a pas de sens. Beaucoup de traders réussissent mieux en suivant une séance qui correspond à leurs propres heures d’éveil, même si elle est plus calme. Notre guide des [horaires du forex par fuseau horaire](/fr/blog/horaires-du-forex-par-fuseau-horaire) donne les conversions ville par ville.

**Votre style.** Si vous voulez des mouvements rapides et que vous êtes organisé pour les gérer, les chevauchements et les ouvertures de séance sont là où se joue l’action. Si vous préférez des conditions plus calmes et plus contenues, la séance asiatique ou les heures plus tranquilles vous conviendront peut-être mieux.

La façon pratique de faire correspondre ces trois éléments est de voir les séances à votre heure locale plutôt que de convertir le GMT de tête. L’[outil des horaires du marché forex en direct](/) affiche l’état de chaque séance dans votre fuseau en temps réel et s’ajuste automatiquement à l’heure d’été : vous voyez donc d’un coup d’œil quelle fenêtre est ouverte quand vous l’êtes.

## Questions fréquentes

**Quel est le meilleur moment de la journée pour trader le forex ?**
La fenêtre la plus active est le chevauchement Londres-New York, approximativement de 13:00 à 17:00 GMT, quand les deux grandes places sont ouvertes et que la liquidité culmine. Qu’il s’agisse ou non du « meilleur » moment pour vous dépend aussi de vos paires, de votre fuseau horaire et de votre stratégie.

**Quel est le meilleur jour de la semaine pour trader le forex ?**
Le mardi, le mercredi et le jeudi sont généralement les plus actifs et les plus liquides, avec les grandes publications de données et le flux institutionnel le plus fourni. Le lundi démarre lentement et le vendredi s’amenuise l’après-midi avant la clôture du week-end.

**Une volatilité plus forte est-elle préférable pour trader ?**
Pas nécessairement. Une volatilité plus forte signifie des mouvements plus amples dans les deux sens, ce qui représente autant de risque que d’opportunité. Les séances plus calmes offrent des amplitudes plus réduites et plus contenues. Le bon niveau dépend de votre approche, pas d’une règle unique.

**Quand faut-il éviter de trader le forex ?**
Beaucoup de traders sont prudents pendant les heures les plus minces : la fin d’après-midi new-yorkaise après la clôture de Londres, l’ouverture du dimanche et les grands jours fériés, où des spreads plus larges et une faible liquidité peuvent dégrader les conditions. Il s’agit d’une information générale et non d’un conseil.

**Comment savoir quelle séance est ouverte dans mon fuseau horaire ?**
Utilisez un outil en direct qui convertit les séances à votre heure locale et s’ajuste à l’heure d’été, plutôt que de convertir le GMT à la main. L’outil forexmarkethours.app affiche l’état actuel de chaque séance où que vous soyez.

*Cet article est fourni à titre d’information générale uniquement et ne constitue pas un conseil financier.*`,
    },
  },
  {
    slug: {
      en: "daylight-saving-time-forex",
      es: "horario-de-verano-y-el-mercado-forex",
    },
    title: {
      en: "How Daylight Saving Time Shifts Forex Market Hours",
      es: "Cómo el horario de verano cambia el horario del mercado forex",
    },
    description: {
      en: "Daylight saving time shifts forex session hours by an hour twice a year. See why the London and New York opens move in GMT and how to stay on the right time.",
      es: "El horario de verano cambia las horas de las sesiones forex una hora dos veces al año. Ve por qué se mueven las aperturas y cómo estar siempre en la hora correcta.",
    },
    date: "2026-08-01",
    authorSlug: "author",
    tags: {
      en: ["Timezones", "Basics"],
      es: ["Zonas horarias", "Fundamentos"],
    },
    cover: "/blog/daylight-saving-time-forex.svg",
    body: {
      en: `Daylight saving time shifts the forex session hours by an hour twice a year, which is why a session that "always" opens at a fixed GMT time can suddenly seem to move. The sessions themselves don't change: each stays anchored to local time in its own city. What changes is that city's offset from GMT when its clocks spring forward or fall back. This guide explains exactly why the London and New York opens move in GMT, when the changeovers happen, and how to keep your session times correct all year.

If you've ever found a printed table of forex hours to be an hour off, daylight saving is almost always the reason. Understanding the mechanism clears up one of the most common sources of confusion about when the market is actually open.

## Why sessions are anchored to local time, not GMT

The key idea is that each forex session follows the business day in its own financial centre, and business days run on local time. The London session opens when London's banks and traders start work, at about 08:00 London time. The New York session opens at about 08:00 New York time. Tokyo opens at about 09:00 Japan time. None of these are defined in GMT; they're defined by the local clock in each city.

GMT is just the common reference the whole market uses to line those local times up. When we say the London session runs 08:00 to 17:00 GMT, that's only true while London's clock happens to match GMT, which is during the northern-hemisphere winter. The moment London's local time diverges from GMT, because the clocks have changed, the GMT figure for the same local session moves too.

This is why the sessions appear to shift even though nothing about the trading day has actually changed. London still opens at 08:00 London time every weekday of the year. It's the translation into GMT, and therefore into your timezone, that moves when the clocks change. For the full session breakdown, see our [forex trading sessions explained](/en/blog/forex-trading-sessions-explained) guide.

## How the London and New York opens move in GMT

Take London first. For part of the year the United Kingdom is on Greenwich Mean Time, so London local time and GMT are identical, and the 08:00 local open is **08:00 GMT**. On the last Sunday of March, UK clocks move forward one hour to British Summer Time (BST), which is GMT+1. The market still opens at 08:00 London time, but because the clock has jumped ahead, that same moment is now **07:00 GMT**. On the last Sunday of October, the clocks go back, the UK returns to GMT, and the open returns to 08:00 GMT.

New York works the same way in the opposite hemisphere-independent direction. In winter New York is on Eastern Standard Time, and the 08:00 New York open is **13:00 GMT**. When the US switches to daylight time on the second Sunday of March, New York moves to GMT-4, so the same 08:00 local open becomes **12:00 GMT**. It returns to 13:00 GMT on the first Sunday of November.

The table below summarises how the two big opens read in GMT across the year.

| Session open | Local time | Winter (GMT) | Summer / DST (GMT) |
| --- | --- | --- | --- |
| London open | 08:00 UK | 08:00 GMT | 07:00 GMT (BST) |
| London close | 17:00 UK | 17:00 GMT | 16:00 GMT (BST) |
| New York open | 08:00 ET | 13:00 GMT | 12:00 GMT (EDT) |
| New York close | 17:00 ET | 22:00 GMT | 21:00 GMT (EDT) |

For a fuller picture of the London open specifically, including how it lands across many timezones, see our guide to [what time the London session opens](/en/blog/what-time-does-the-london-session-open).

## When the changeovers happen, and why they don't line up

The complication is that different regions change their clocks on different dates, so for short windows each year the usual gap between two cities is off by an hour.

The main northern-hemisphere schedules are:

- **United Kingdom and European Union:** clocks forward on the last Sunday of March, back on the last Sunday of October.
- **United States and Canada:** clocks forward on the second Sunday of March, back on the first Sunday of November.
- **Australia (southern hemisphere):** clocks the opposite way, forward around the first Sunday of October, back around the first Sunday of April.

Because the US springs forward about two weeks before the UK, there's a short period in March when New York has already changed but London hasn't. During that window the usual London-New York gap is an hour different from normal, so a table built for the settled part of the year is briefly wrong. The same happens for a few days around the autumn changeovers. Australia's opposite calendar means the gap between Sydney and the northern centres swings by two hours across the year rather than one.

Some places don't observe daylight saving at all. Japan keeps the same offset year-round, which is why the Tokyo session's GMT window is stable while London and New York move around it. Turkey and the Gulf states also stay on a fixed offset. The IANA time zone database, the authoritative record of these rules, is maintained at https://www.iana.org/time-zones, and a clear reference for changeover dates is available at https://www.timeanddate.com/time/dst/. The UK's official dates are published at https://www.gov.uk/when-do-the-clocks-change.

## Why a live tool beats a printed table

The practical upshot of all this is simple: any static list of forex hours in GMT is correct for only part of the year. Print a table in January and it will be an hour off through the summer for London and New York; it can't account for the two-week gaps around the changeovers; and it certainly can't convert to your own timezone if your country changes clocks on yet another date.

A live tool sidesteps every one of these problems. It reads the current date, applies the correct daylight-saving rules for each city and for wherever you are, and shows each session at the right time automatically. There's no mental arithmetic and no risk of using last season's offsets. The [live forex market hours tool](/) does exactly this: it converts all four sessions into your local time in real time and adjusts for daylight saving on every side, so the hours you see are always current. For fixed reference tables across zones, our [forex market hours by timezone](/en/blog/forex-market-hours-by-timezone) guide lays out the common cases.

## Frequently asked questions

**Does daylight saving time change forex market hours?**
In local terms, no: each session still opens at the same local time in its own city all year. In GMT terms, yes: when a city's clocks change, its offset from GMT changes, so the session's GMT window shifts by an hour. That also moves the hours in your own timezone.

**Why is the London open 07:00 GMT in summer and 08:00 GMT in winter?**
Because the UK is on GMT in winter, so 08:00 local is 08:00 GMT, but switches to British Summer Time (GMT+1) in summer, so the same 08:00 local open reads as 07:00 GMT.

**Do all countries change their clocks on the same day?**
No. The US and Canada change about two weeks before the UK and EU in spring, Australia changes the opposite way in the southern hemisphere, and places like Japan and the Gulf states don't change at all. This is why the gap between cities can be briefly off by an hour.

**Which forex session doesn't move with daylight saving?**
Tokyo. Japan doesn't observe daylight saving, so the Tokyo session's GMT window stays stable all year while London and New York shift around it.

**How can I always see the correct session times?**
Use a live tool that applies current daylight-saving rules and converts to your local time, rather than a static GMT table. The forexmarkethours.app tool does this automatically for all four sessions.

*This article is for general information only and is not financial advice.*`,
      es: `El horario de verano cambia las horas de las sesiones forex una hora dos veces al año, y por eso una sesión que "siempre" abre a una hora fija en GMT puede parecer de pronto que se mueve. Las sesiones en sí no cambian: cada una permanece anclada a la hora local de su propia ciudad. Lo que cambia es el desfase de esa ciudad respecto al GMT cuando sus relojes se adelantan o se atrasan. Esta guía explica exactamente por qué se mueven las aperturas de Londres y Nueva York en GMT, cuándo ocurren los cambios y cómo mantener tus horarios de sesión correctos todo el año.

Si alguna vez has encontrado una tabla impresa de horarios forex desfasada una hora, el horario de verano es casi siempre la razón. Entender el mecanismo despeja una de las fuentes de confusión más habituales sobre cuándo está realmente abierto el mercado.

## Por qué las sesiones se anclan a la hora local y no al GMT

La idea clave es que cada sesión de forex sigue la jornada laboral de su propio centro financiero, y las jornadas laborales van con la hora local. La sesión de Londres abre cuando los bancos y operadores de Londres empiezan a trabajar, hacia las 08:00 hora de Londres. La sesión de Nueva York abre hacia las 08:00 hora de Nueva York. Tokio abre hacia las 09:00 hora de Japón. Ninguna de estas se define en GMT; se definen por el reloj local de cada ciudad.

El GMT es solo la referencia común que usa todo el mercado para alinear esas horas locales. Cuando decimos que la sesión de Londres va de las 08:00 a las 17:00 GMT, eso solo es cierto mientras el reloj de Londres coincide con el GMT, es decir, durante el invierno del hemisferio norte. En cuanto la hora local de Londres se separa del GMT, porque los relojes han cambiado, la cifra en GMT de esa misma sesión local también se mueve.

Por eso las sesiones parecen desplazarse aunque nada de la jornada de trading haya cambiado en realidad. Londres sigue abriendo a las 08:00 hora de Londres cada día laborable del año. Es la traducción a GMT, y por tanto a tu zona horaria, lo que se mueve cuando cambian los relojes. Para el desglose completo de sesiones, consulta nuestra guía de [sesiones de trading forex explicadas](/es/blog/sesiones-de-trading-forex-explicadas).

## Cómo se mueven las aperturas de Londres y Nueva York en GMT

Tomemos primero Londres. Durante parte del año el Reino Unido está en hora de Greenwich, así que la hora local de Londres y el GMT son idénticos, y la apertura a las 08:00 locales son las **08:00 GMT**. El último domingo de marzo, los relojes del Reino Unido se adelantan una hora al horario de verano británico (BST), que es GMT+1. El mercado sigue abriendo a las 08:00 hora de Londres, pero como el reloj ha saltado hacia delante, ese mismo momento son ahora las **07:00 GMT**. El último domingo de octubre, los relojes se atrasan, el Reino Unido vuelve al GMT y la apertura regresa a las 08:00 GMT.

Nueva York funciona igual en la otra dirección. En invierno Nueva York está en hora estándar del Este, y la apertura a las 08:00 de Nueva York son las **13:00 GMT**. Cuando EE. UU. pasa al horario de verano el segundo domingo de marzo, Nueva York se mueve a GMT-4, así que esa misma apertura a las 08:00 locales pasa a ser las **12:00 GMT**. Regresa a las 13:00 GMT el primer domingo de noviembre.

La tabla siguiente resume cómo se leen en GMT las dos grandes aperturas a lo largo del año.

| Apertura de sesión | Hora local | Invierno (GMT) | Verano / DST (GMT) |
| --- | --- | --- | --- |
| Apertura de Londres | 08:00 UK | 08:00 GMT | 07:00 GMT (BST) |
| Cierre de Londres | 17:00 UK | 17:00 GMT | 16:00 GMT (BST) |
| Apertura de Nueva York | 08:00 ET | 13:00 GMT | 12:00 GMT (EDT) |
| Cierre de Nueva York | 17:00 ET | 22:00 GMT | 21:00 GMT (EDT) |

Para una imagen más completa de la apertura de Londres en concreto, incluida cómo cae en muchas zonas horarias, consulta nuestra guía sobre [a qué hora abre la sesión de Londres](/es/blog/a-que-hora-abre-la-sesion-de-londres).

## Cuándo ocurren los cambios, y por qué no coinciden

La complicación es que distintas regiones cambian sus relojes en fechas distintas, así que durante periodos breves de cada año la diferencia habitual entre dos ciudades queda desfasada una hora.

Los principales calendarios del hemisferio norte son:

- **Reino Unido y Unión Europea:** relojes adelante el último domingo de marzo, atrás el último domingo de octubre.
- **Estados Unidos y Canadá:** relojes adelante el segundo domingo de marzo, atrás el primer domingo de noviembre.
- **Australia (hemisferio sur):** relojes al revés, adelante en torno al primer domingo de octubre, atrás en torno al primer domingo de abril.

Como EE. UU. se adelanta unas dos semanas antes que el Reino Unido, hay un periodo breve en marzo en que Nueva York ya ha cambiado pero Londres no. Durante esa ventana la diferencia habitual Londres-Nueva York es una hora distinta a la normal, así que una tabla hecha para la parte estable del año queda brevemente equivocada. Lo mismo ocurre unos días en torno a los cambios de otoño. El calendario opuesto de Australia hace que la diferencia entre Sídney y los centros del norte oscile en dos horas a lo largo del año en lugar de una.

Algunos lugares no observan el horario de verano en absoluto. Japón mantiene el mismo desfase todo el año, y por eso la ventana GMT de la sesión de Tokio es estable mientras Londres y Nueva York se mueven a su alrededor. Turquía y los estados del Golfo también se mantienen en un desfase fijo. La base de datos de zonas horarias de IANA, el registro autorizado de estas reglas, se mantiene en https://www.iana.org/time-zones, y una referencia clara de las fechas de cambio está disponible en https://www.timeanddate.com/time/dst/. Las fechas oficiales del Reino Unido se publican en https://www.gov.uk/when-do-the-clocks-change.

## Por qué una herramienta en vivo supera a una tabla impresa

La conclusión práctica de todo esto es sencilla: cualquier lista estática de horarios forex en GMT solo es correcta durante parte del año. Imprime una tabla en enero y estará desfasada una hora todo el verano para Londres y Nueva York; no puede tener en cuenta los periodos de dos semanas en torno a los cambios; y desde luego no puede convertir a tu propia zona horaria si tu país cambia los relojes en otra fecha distinta.

Una herramienta en vivo esquiva cada uno de estos problemas. Lee la fecha actual, aplica las reglas correctas de horario de verano para cada ciudad y para donde te encuentres, y muestra cada sesión a la hora adecuada de forma automática. No hay aritmética mental ni riesgo de usar los desfases de la temporada pasada. La [herramienta de horarios del mercado forex en vivo](/es) hace exactamente esto: convierte las cuatro sesiones a tu hora local en tiempo real y se ajusta al horario de verano en todos los lados, para que las horas que ves estén siempre al día. Para tablas de referencia fijas por zonas, nuestra guía sobre el [horario del mercado forex por zona horaria](/es/blog/horario-del-mercado-forex-por-zona-horaria) expone los casos comunes.

## Preguntas frecuentes

**¿Cambia el horario de verano las horas del mercado forex?**
En términos locales, no: cada sesión sigue abriendo a la misma hora local en su propia ciudad todo el año. En términos de GMT, sí: cuando los relojes de una ciudad cambian, su desfase respecto al GMT cambia, así que la ventana GMT de la sesión se desplaza una hora. Eso también mueve las horas en tu propia zona horaria.

**¿Por qué la apertura de Londres son las 07:00 GMT en verano y las 08:00 GMT en invierno?**
Porque el Reino Unido está en GMT en invierno, así que las 08:00 locales son las 08:00 GMT, pero pasa al horario de verano británico (GMT+1) en verano, de modo que esa misma apertura a las 08:00 locales se lee como las 07:00 GMT.

**¿Todos los países cambian los relojes el mismo día?**
No. EE. UU. y Canadá cambian unas dos semanas antes que el Reino Unido y la UE en primavera, Australia cambia al revés en el hemisferio sur, y lugares como Japón y los estados del Golfo no cambian en absoluto. Por eso la diferencia entre ciudades puede quedar brevemente desfasada una hora.

**¿Qué sesión de forex no se mueve con el horario de verano?**
Tokio. Japón no observa el horario de verano, así que la ventana GMT de la sesión de Tokio se mantiene estable todo el año mientras Londres y Nueva York se desplazan a su alrededor.

**¿Cómo puedo ver siempre los horarios de sesión correctos?**
Usa una herramienta en vivo que aplique las reglas actuales de horario de verano y convierta a tu hora local, en lugar de una tabla estática en GMT. La herramienta de forexmarkethours.app lo hace automáticamente para las cuatro sesiones.

*Este artículo es solo informativo y no constituye asesoramiento financiero.*`,
    },
  },
  {
    slug: {
      en: "frankfurt-european-forex-session",
      es: "sesion-forex-europea-de-frankfurt",
    },
    title: {
      en: "The Frankfurt & European Forex Session: Hours and Pairs",
      es: "La sesión forex europea de Fráncfort: horario y pares",
    },
    description: {
      en: "The European forex session opens in Frankfurt around 07:00 GMT, an hour before London. See its hours in your timezone, the best euro pairs and why it matters.",
      es: "La sesión forex europea abre en Fráncfort hacia las 07:00 GMT, una hora antes que Londres. Ve su horario en tu zona, los mejores pares en euros y por qué importa.",
    },
    date: "2026-08-02",
    authorSlug: "author",
    tags: {
      en: ["Sessions", "Europe"],
      es: ["Sesiones", "Europa"],
    },
    cover: "/blog/frankfurt-european-forex-session.svg",
    body: {
      en: `The European forex session opens in **Frankfurt at around 07:00 GMT** in standard time, roughly an hour before London. It's the session that wakes up continental Europe, brings the euro to life, and quietly sets the stage for the busiest part of the trading day. Most traders lump it in with London and call the whole thing the London session, but Frankfurt gets there first, and that early hour has a character of its own. This guide covers when the European session runs in your own timezone, why Frankfurt opens ahead of London, and which pairs come alive once continental desks are staffed.

If you've ever noticed the euro start to move before the London crowd arrives, Frankfurt is usually the reason. Germany is the largest economy in the eurozone, and its financial centre is where a lot of European currency trading is priced first thing in the morning.

## European session hours in your timezone

Frankfurt trades to central European time, so in standard time its window runs from about **07:00 to 16:00 GMT**, which is **08:00 to 17:00 in Frankfurt local time** (Central European Time, GMT+1). Continental Europe puts its clocks forward to Central European Summer Time in the warmer months, exactly when the UK moves to British Summer Time, so Frankfurt and London keep their one-hour gap all year even as both shift against GMT.

Here's how the Frankfurt open lands across a spread of common zones, using the winter case when Europe is on standard time.

| Your city / zone | Frankfurt open (winter) | Frankfurt close (winter) |
| --- | --- | --- |
| Frankfurt (CET) | 08:00 | 17:00 |
| London (UK, GMT) | 07:00 | 16:00 |
| New York (ET) | 02:00 | 11:00 |
| Istanbul (TRT) | 10:00 | 19:00 |
| Dubai (GST) | 11:00 | 20:00 |
| Mumbai (IST) | 12:30 | 21:30 |
| Singapore (SGT) | 15:00 | 00:00 (next day) |
| Sydney (AEST) | 18:00 | 03:00 (next day) |

Because Europe, the UK, and the US all change clocks on their own dates, these figures drift by an hour for a week or two in spring and autumn. The [live forex market hours tool](/) sidesteps that entirely, showing the European session in your own timezone and following every daylight-saving change automatically.

## Why Frankfurt opens before London

The reason the European session begins in Frankfurt rather than London is simply geography and the working day. Frankfurt sits in the Central European time zone, one hour ahead of the UK, so German banks and traders are at their desks an hour before their London counterparts. When they start pricing the euro and other European currencies, the session is effectively underway.

Frankfurt is also home to serious financial weight. It hosts the European Central Bank, whose interest-rate decisions and policy statements move the euro across every pair it touches; you can find the ECB's calendar at https://www.ecb.europa.eu. It's also the seat of Germany's Deutsche Bundesbank and the Deutsche Börse exchange group. So the early European hour isn't just a warm-up act. It carries real order flow, and any euro-area data that lands first thing, German inflation or sentiment surveys, for instance, can set the tone before London has fully arrived.

That said, London still dwarfs Frankfurt by sheer turnover. The Bank for International Settlements, in its Triennial Central Bank Survey, puts the United Kingdom at the top of global FX turnover by a wide margin, with Germany much further down the list; the survey is at https://www.bis.org/statistics/rpfx22.htm. This is exactly why the combined European session is usually named after London. Frankfurt opens it; London makes it the heavyweight it is. For the London side of the story, see our guide on [what time the London session opens](/en/blog/what-time-does-the-london-session-open).

## The best pairs in the European session

Unsurprisingly, the European session shines a light on the euro and its neighbours, since those are the markets that have just come online.

Top of the list is **EUR/USD**, the most traded pair anywhere. From the Frankfurt open onward, European order flow builds steadily, and by the time London joins, the pair is trading with deep liquidity and tight spreads. A great deal of its daily range gets shaped during these hours.

Then there's **EUR/GBP**, a purely European cross that lives almost entirely inside these hours. With both the euro and the pound in their home session, it's the cleanest way to weigh one against the other, though it usually keeps to a tighter range than the dollar pairs.

The Swiss franc joins in through **EUR/CHF** and **USD/CHF**, since Zurich runs on the same clock as Frankfurt. And euro crosses against the yen and the Swedish and Norwegian currencies, **EUR/JPY**, **EUR/SEK**, **EUR/NOK**, pick up noticeably too. If a pair has the euro on one side, the odds are its liveliest, best-priced hours begin right here in the European morning.

## Frankfurt into London: the handover

The most useful way to think about Frankfurt is as the front edge of a bigger wave. It opens the European session, and within an hour London arrives and turnover steps up sharply. From there the momentum keeps building toward the afternoon, when New York opens and the two giants overlap.

That progression, Frankfurt first, then London, then the London-New York overlap, is the spine of the trading day for European and dollar pairs. The early Frankfurt hour often establishes an initial direction or range; London deepens it; and the overlap tends to be where the day's decisive moves happen. Traders who follow the euro closely watch that Frankfurt open partly for its own sake and partly as an early read on where London might take things.

To see how this fits into the full round-the-clock picture, our [forex trading sessions explained](/en/blog/forex-trading-sessions-explained) guide walks through all four centres, and the [London-New York overlap](/en/blog/london-new-york-overlap) piece covers where the day peaks.

## Frequently asked questions

**What time does the Frankfurt forex session open?**
Around 07:00 GMT in standard time, which is 08:00 local time in Frankfurt (Central European Time). In summer, when Europe is on Central European Summer Time, that same local open reads as 06:00 GMT. It opens roughly an hour before London.

**Is the European session the same as the London session?**
Not quite. The European session opens in Frankfurt about an hour before London, but because London handles far more turnover, the combined block is usually just called the London session. Frankfurt is the opener; London is the heavyweight.

**Which pairs are best in the European session?**
Euro pairs above all: EUR/USD, EUR/GBP, EUR/CHF and euro crosses like EUR/JPY. These are the markets whose home desks are open and most active during European hours.

**Why does Frankfurt open before London?**
Frankfurt is in the Central European time zone, an hour ahead of the UK, so German banks and traders start their day an hour earlier. When they begin pricing the euro, the European session is effectively live.

**When does the European session close?**
Frankfurt winds down around 16:00 GMT in winter (17:00 local), an hour before London's 17:00 GMT close. In summer both shift an hour earlier in GMT terms.

*This article is for general information only and is not financial advice.*`,
      es: `La sesión forex europea abre en **Fráncfort hacia las 07:00 GMT** en horario estándar, aproximadamente una hora antes que Londres. Es la sesión que despierta a la Europa continental, da vida al euro y prepara en silencio el escenario para la parte más movida de la jornada. La mayoría de los operadores la meten en el mismo saco que Londres y llaman a todo el conjunto sesión de Londres, pero Fráncfort llega primero, y esa hora temprana tiene un carácter propio. Esta guía explica cuándo se desarrolla la sesión europea en tu propia zona horaria, por qué Fráncfort abre antes que Londres y qué pares cobran vida en cuanto las mesas continentales están operativas.

Si alguna vez has notado que el euro empieza a moverse antes de que llegue la gente de Londres, Fráncfort suele ser la razón. Alemania es la mayor economía de la eurozona, y su centro financiero es donde buena parte de la negociación europea de divisas se cotiza a primera hora de la mañana.

## Horario de la sesión europea en tu zona horaria

Fráncfort opera con la hora de Europa central, así que en horario estándar su ventana va de aproximadamente las **07:00 a las 16:00 GMT**, que son las **08:00 a las 17:00 hora local de Fráncfort** (hora de Europa central, GMT+1). La Europa continental adelanta sus relojes a la hora de verano de Europa central en los meses cálidos, justo cuando el Reino Unido pasa al horario de verano británico, de modo que Fráncfort y Londres mantienen su diferencia de una hora todo el año aunque ambos se desplacen respecto al GMT.

Así cae la apertura de Fráncfort en varias zonas comunes, usando el caso de invierno, cuando Europa está en horario estándar.

| Tu ciudad / zona | Apertura Fráncfort (invierno) | Cierre Fráncfort (invierno) |
| --- | --- | --- |
| Fráncfort (CET) | 08:00 | 17:00 |
| Londres (UK, GMT) | 07:00 | 16:00 |
| Nueva York (ET) | 02:00 | 11:00 |
| Estambul (TRT) | 10:00 | 19:00 |
| Dubái (GST) | 11:00 | 20:00 |
| Bombay (IST) | 12:30 | 21:30 |
| Singapur (SGT) | 15:00 | 00:00 (día siguiente) |
| Sídney (AEST) | 18:00 | 03:00 (día siguiente) |

Como Europa, el Reino Unido y EE. UU. cambian los relojes en fechas propias, estas cifras se desplazan una hora durante una o dos semanas en primavera y otoño. La [herramienta de horarios del mercado forex en vivo](/es) esquiva eso por completo: muestra la sesión europea en tu propia zona horaria y sigue cada cambio de horario de verano de forma automática.

## Por qué Fráncfort abre antes que Londres

La razón por la que la sesión europea empieza en Fráncfort y no en Londres es sencillamente la geografía y la jornada laboral. Fráncfort está en la zona horaria de Europa central, una hora por delante del Reino Unido, así que los bancos y operadores alemanes están en sus mesas una hora antes que sus homólogos de Londres. Cuando empiezan a cotizar el euro y otras divisas europeas, la sesión está en marcha de hecho.

Fráncfort alberga además un peso financiero serio. Es sede del Banco Central Europeo, cuyas decisiones de tipos y declaraciones de política mueven el euro en todos los pares que toca; puedes consultar el calendario del BCE en https://www.ecb.europa.eu. También es la sede del Deutsche Bundesbank alemán y del grupo bursátil Deutsche Börse. Así que la hora europea temprana no es solo un telonero. Lleva flujo de órdenes real, y cualquier dato de la zona euro que caiga a primera hora, la inflación alemana o las encuestas de confianza, por ejemplo, puede marcar el tono antes de que Londres haya llegado del todo.

Dicho esto, Londres sigue empequeñeciendo a Fráncfort por puro volumen. El Banco de Pagos Internacionales, en su Encuesta Trienal de Bancos Centrales, sitúa al Reino Unido en lo alto del volumen mundial de divisas por amplio margen, con Alemania mucho más abajo en la lista; la encuesta está en https://www.bis.org/statistics/rpfx22.htm. Es justo por eso que la sesión europea combinada suele llevar el nombre de Londres. Fráncfort la abre; Londres la convierte en el peso pesado que es. Para la parte de Londres de la historia, consulta nuestra guía sobre [a qué hora abre la sesión de Londres](/es/blog/a-que-hora-abre-la-sesion-de-londres).

## Los mejores pares en la sesión europea

Como era de esperar, la sesión europea pone el foco en el euro y sus vecinos, ya que son los mercados que acaban de entrar en línea.

En lo alto de la lista está **EUR/USD**, el par más negociado de cualquier lugar. Desde la apertura de Fráncfort en adelante, el flujo de órdenes europeo se va formando, y para cuando Londres se incorpora, el par se negocia con liquidez profunda y diferenciales estrechos. Buena parte de su rango diario se moldea durante estas horas.

Luego está **EUR/GBP**, un cruce puramente europeo que vive casi por completo dentro de estas horas. Con el euro y la libra en su sesión de origen, es la forma más limpia de sopesar uno frente a otro, aunque suele mantenerse en un rango más estrecho que los pares con dólar.

El franco suizo se suma a través de **EUR/CHF** y **USD/CHF**, ya que Zúrich funciona con el mismo reloj que Fráncfort. Y los cruces del euro contra el yen y las divisas sueca y noruega, **EUR/JPY**, **EUR/SEK**, **EUR/NOK**, también se animan de forma notable. Si un par tiene el euro en un lado, lo más probable es que sus horas más animadas y mejor cotizadas empiecen justo aquí, en la mañana europea.

## De Fráncfort a Londres: el relevo

La forma más útil de pensar en Fráncfort es como el borde delantero de una ola mayor. Abre la sesión europea, y en una hora llega Londres y el volumen sube con fuerza. A partir de ahí el impulso sigue creciendo hacia la tarde, cuando Nueva York abre y los dos gigantes se solapan.

Esa progresión, primero Fráncfort, luego Londres, luego el solapamiento Londres-Nueva York, es la columna vertebral de la jornada para los pares europeos y con dólar. La hora temprana de Fráncfort suele establecer una dirección o un rango inicial; Londres lo profundiza; y el solapamiento tiende a ser donde ocurren los movimientos decisivos del día. Los operadores que siguen de cerca el euro vigilan esa apertura de Fráncfort en parte por sí misma y en parte como una lectura anticipada de hacia dónde podría llevar las cosas Londres.

Para ver cómo encaja esto en la imagen completa de las 24 horas, nuestra guía de [sesiones de trading forex explicadas](/es/blog/sesiones-de-trading-forex-explicadas) repasa los cuatro centros, y el artículo sobre el [solapamiento Londres-Nueva York](/es/blog/solapamiento-londres-nueva-york) cubre dónde toca techo la jornada.

## Preguntas frecuentes

**¿A qué hora abre la sesión forex de Fráncfort?**
Hacia las 07:00 GMT en horario estándar, que son las 08:00 hora local de Fráncfort (hora de Europa central). En verano, cuando Europa está en la hora de verano de Europa central, esa misma apertura local se lee como las 06:00 GMT. Abre aproximadamente una hora antes que Londres.

**¿Es la sesión europea lo mismo que la sesión de Londres?**
No del todo. La sesión europea abre en Fráncfort alrededor de una hora antes que Londres, pero como Londres gestiona mucho más volumen, al bloque combinado se le suele llamar simplemente sesión de Londres. Fráncfort es la que abre; Londres es el peso pesado.

**¿Qué pares son mejores en la sesión europea?**
Los pares en euros por encima de todo: EUR/USD, EUR/GBP, EUR/CHF y cruces del euro como EUR/JPY. Son los mercados cuyas mesas de origen están abiertas y más activas durante el horario europeo.

**¿Por qué abre Fráncfort antes que Londres?**
Fráncfort está en la zona horaria de Europa central, una hora por delante del Reino Unido, así que los bancos y operadores alemanes empiezan su día una hora antes. Cuando comienzan a cotizar el euro, la sesión europea está de hecho en marcha.

**¿Cuándo cierra la sesión europea?**
Fráncfort se apaga hacia las 16:00 GMT en invierno (17:00 local), una hora antes del cierre de Londres a las 17:00 GMT. En verano ambos se desplazan una hora antes en términos de GMT.

*Este artículo es solo informativo y no constituye asesoramiento financiero.*`,
    },
  },
  {
    slug: {
      en: "most-traded-currency-pairs",
      es: "pares-de-divisas-mas-negociados",
    },
    title: {
      en: "The Most Traded Currency Pairs and When to Trade Them",
      es: "Los pares de divisas más negociados y cuándo operarlos",
    },
    description: {
      en: "The most traded currency pairs are EUR/USD, USD/JPY and GBP/USD. See the top forex pairs by turnover and the session hours when each one is most active.",
      es: "Los pares de divisas más negociados son EUR/USD, USD/JPY y GBP/USD. Ve los principales pares por volumen y las horas de sesión en que cada uno es más activo.",
    },
    date: "2026-08-03",
    authorSlug: "author",
    tags: {
      en: ["Pairs", "Basics"],
      es: ["Pares", "Fundamentos"],
    },
    cover: "/blog/most-traded-currency-pairs.svg",
    body: {
      en: `The most traded currency pairs in forex are **EUR/USD**, **USD/JPY** and **GBP/USD**, followed by the other dollar majors like USD/CHF, AUD/USD and USD/CAD. Between them, the majors account for the overwhelming share of daily turnover, and the US dollar sits on one side of nearly all of it. But knowing which pairs trade the most is only half the picture. Each one has certain hours when it's at its most liquid, and lining up a pair with its home session is one of the simplest ideas in forex. This guide runs through the top pairs by volume and, just as importantly, when each tends to move.

None of this is about telling you what to buy or sell. It's about which pairs carry the deepest markets and at what times of day they do it, so the hours you trade actually match the pairs you're watching.

## What makes a pair "major"

A **major** currency pair is one that pairs the US dollar with another heavily traded currency: the euro, the yen, the pound, the Swiss franc, the Canadian dollar, and the Australian and New Zealand dollars. These are the pairs with the most participants, the deepest liquidity, and generally the tightest spreads, which is why the vast majority of retail and institutional trading concentrates in them.

The reason the dollar is everywhere comes down to its role as the world's reserve and settlement currency. The Bank for International Settlements, in its Triennial Central Bank Survey, measures the US dollar on one side of close to nine in ten of all trades. The euro is a distant second, the yen third. You can read the survey at https://www.bis.org/statistics/rpfx22.htm. Pairs that don't involve the dollar, like EUR/GBP or EUR/JPY, are known as **crosses**, and while some of them are very actively traded, they still sit below the dollar majors by volume.

## The most traded pairs by turnover

The rough pecking order below follows the BIS turnover figures. Exact percentages shift a little from one survey to the next, but the top of the list is remarkably stable year after year.

| Pair | Nickname | Most active session |
| --- | --- | --- |
| EUR/USD | "Fiber" | London, London-NY overlap |
| USD/JPY | "Ninja" / "the yen" | Tokyo and New York |
| GBP/USD | "Cable" | London, London-NY overlap |
| USD/CHF | "Swissy" | London / European hours |
| AUD/USD | "Aussie" | Sydney-Tokyo hours |
| USD/CAD | "Loonie" | New York hours |
| NZD/USD | "Kiwi" | Sydney-Tokyo hours |

**EUR/USD** is the single most traded pair on earth, and it isn't close. It combines the world's two largest economies, trades with razor-tight spreads, and is most active through the European and overlap hours. **USD/JPY** comes next, sensitive to both US interest rates and Japanese flows. **GBP/USD**, long nicknamed "cable" after the transatlantic telegraph line, is famously more volatile than EUR/USD and just as tied to the London session.

## Matching pairs to the right session

Here's the idea that ties turnover to the clock: a currency is usually most active when its home market is open. Trade a pair during the overlap of its two home sessions and you'll typically find deeper liquidity and tighter spreads than at any other time.

The euro and the pound come alive in the **London session** and the European hours before it. EUR/USD and GBP/USD both trade heavily from the Frankfurt and London opens onward, and they hit peak activity during the **London-New York overlap** in the early afternoon GMT. If those are your pairs, the European morning and that overlap are the natural windows. Our [London-New York overlap](/en/blog/london-new-york-overlap) guide digs into why.

Dollar-driven pairs such as USD/CAD lean toward the **New York session**, when US and Canadian data land together; the [New York session](/en/blog/new-york-forex-session) guide covers that in detail. USD/JPY straddles two worlds, active in the **Tokyo session** on Japanese flows and again in New York on US yields. And the Australian and New Zealand dollars do their liveliest trading during the **Sydney-Tokyo** window in the Asian morning, which the [Tokyo session](/en/blog/tokyo-asian-forex-session) guide explores.

## Majors, minors and crosses

It helps to keep three categories straight. **Majors** pair the dollar with a top currency and dominate turnover. **Crosses** pair two majors without the dollar, EUR/GBP, EUR/JPY, GBP/JPY, and several of these are still very liquid, especially within their home European or Asian hours. **Minors** and **exotics** pair a major with a smaller or emerging-market currency, and they tend to have thinner liquidity and wider spreads.

For most people starting out, the majors are the sensible focus precisely because they're so deeply traded. Tight spreads lower the cost of each trade, and deep liquidity means orders fill cleanly. The crosses open up once you want to express a view between two non-dollar currencies, say the euro against the pound, but they reward paying attention to when their home markets are actually awake.

## Liquidity, spreads and timing

Two pairs can look similar on a chart and behave very differently depending on the hour. A major traded in its home session offers tight spreads and steady depth. The same pair traded in the dead hours, the late New York afternoon, say, or the quiet stretch before Frankfurt opens, can show wider spreads and choppier moves on thinner volume.

This is why timing matters as much as pair selection. Picking a heavily traded major is a good start, but trading it when its market is asleep gives up much of the advantage. The most efficient conditions come from putting the two together: a deep, liquid pair, traded during the session when its home desks are busiest. To line that up without doing timezone arithmetic in your head, the [live forex market hours tool](/) shows which sessions are open right now in your own local time, and our [best time to trade forex](/en/blog/best-time-to-trade-forex) guide maps the busiest windows in more detail.

## Frequently asked questions

**What is the most traded currency pair?**
EUR/USD, by a wide margin. It pairs the world's two largest economies, carries the deepest liquidity and tightest spreads of any pair, and is most active during the European and London-New York overlap hours.

**What are the seven major currency pairs?**
The majors are usually listed as EUR/USD, USD/JPY, GBP/USD, USD/CHF, AUD/USD, USD/CAD and NZD/USD. Each pairs the US dollar with another heavily traded currency.

**When is the best time to trade EUR/USD and GBP/USD?**
During the London session and especially the London-New York overlap, roughly 13:00 to 17:00 GMT in standard time, when European and US participation combine and spreads are usually tightest.

**What's the difference between a major and a cross?**
A major pairs the US dollar with another top currency. A cross pairs two major currencies without the dollar, such as EUR/GBP or EUR/JPY. Majors carry the most turnover; some crosses are still very liquid within their home hours.

**Do currency pairs trade all day?**
The market runs 24 hours on weekdays, so you can trade a pair at any time, but each pair has hours when it's far more liquid. Trading a pair during its home session usually means tighter spreads and smoother execution.

*This article is for general information only and is not financial advice.*`,
      es: `Los pares de divisas más negociados en forex son **EUR/USD**, **USD/JPY** y **GBP/USD**, seguidos por los demás pares principales con dólar como USD/CHF, AUD/USD y USD/CAD. Entre todos, los principales acaparan la inmensa mayoría del volumen diario, y el dólar estadounidense figura en un lado de casi todo. Pero saber qué pares se negocian más es solo la mitad de la imagen. Cada uno tiene ciertas horas en las que está en su punto más líquido, y ajustar un par a su sesión de origen es una de las ideas más sencillas del forex. Esta guía repasa los principales pares por volumen y, no menos importante, cuándo tiende a moverse cada uno.

Nada de esto va de decirte qué comprar o vender. Va de qué pares tienen los mercados más profundos y a qué horas del día lo hacen, para que las horas en que operas encajen de verdad con los pares que sigues.

## Qué hace que un par sea "principal"

Un par de divisas **principal** (major) es el que empareja el dólar estadounidense con otra divisa muy negociada: el euro, el yen, la libra, el franco suizo, el dólar canadiense y los dólares australiano y neozelandés. Son los pares con más participantes, la liquidez más profunda y, por lo general, los diferenciales más estrechos, y por eso la gran mayoría de la negociación minorista e institucional se concentra en ellos.

La razón por la que el dólar está en todas partes se reduce a su papel de divisa de reserva y liquidación del mundo. El Banco de Pagos Internacionales, en su Encuesta Trienal de Bancos Centrales, mide el dólar estadounidense en un lado de casi nueve de cada diez operaciones. El euro es un segundo lejano, el yen el tercero. Puedes leer la encuesta en https://www.bis.org/statistics/rpfx22.htm. Los pares que no incluyen el dólar, como EUR/GBP o EUR/JPY, se conocen como **cruces**, y aunque algunos se negocian con mucha actividad, siguen por debajo de los principales con dólar en volumen.

## Los pares más negociados por volumen

El orden aproximado de abajo sigue las cifras de volumen del BIS. Los porcentajes exactos varían un poco de una encuesta a la siguiente, pero la parte alta de la lista es notablemente estable año tras año.

| Par | Apodo | Sesión más activa |
| --- | --- | --- |
| EUR/USD | "Fiber" | Londres, solapamiento Londres-NY |
| USD/JPY | "Ninja" / "el yen" | Tokio y Nueva York |
| GBP/USD | "Cable" | Londres, solapamiento Londres-NY |
| USD/CHF | "Swissy" | Londres / horario europeo |
| AUD/USD | "Aussie" | Horario Sídney-Tokio |
| USD/CAD | "Loonie" | Horario de Nueva York |
| NZD/USD | "Kiwi" | Horario Sídney-Tokio |

**EUR/USD** es el par más negociado del planeta, y por mucho. Combina las dos mayores economías del mundo, se negocia con diferenciales finísimos y es más activo durante las horas europeas y de solapamiento. **USD/JPY** viene después, sensible tanto a los tipos de interés de EE. UU. como a los flujos japoneses. **GBP/USD**, apodado desde hace mucho "cable" por la línea telegráfica transatlántica, es célebre por ser más volátil que EUR/USD y estar igual de ligado a la sesión de Londres.

## Ajustar los pares a la sesión adecuada

Aquí está la idea que une el volumen con el reloj: una divisa suele estar más activa cuando su mercado de origen está abierto. Opera un par durante el solapamiento de sus dos sesiones de origen y normalmente encontrarás una liquidez más profunda y diferenciales más estrechos que en cualquier otro momento.

El euro y la libra cobran vida en la **sesión de Londres** y las horas europeas previas. EUR/USD y GBP/USD se negocian con fuerza desde las aperturas de Fráncfort y Londres en adelante, y tocan su actividad máxima durante el **solapamiento Londres-Nueva York** a primera hora de la tarde en GMT. Si esos son tus pares, la mañana europea y ese solapamiento son las ventanas naturales. Nuestra guía sobre el [solapamiento Londres-Nueva York](/es/blog/solapamiento-londres-nueva-york) profundiza en el porqué.

Los pares impulsados por el dólar, como USD/CAD, se inclinan hacia la **sesión de Nueva York**, cuando los datos de EE. UU. y Canadá caen juntos; la guía de la [sesión de Nueva York](/es/blog/sesion-forex-de-nueva-york) lo cubre en detalle. USD/JPY vive a caballo entre dos mundos, activo en la **sesión de Tokio** por los flujos japoneses y de nuevo en Nueva York por los rendimientos estadounidenses. Y los dólares australiano y neozelandés hacen su negociación más animada durante la ventana **Sídney-Tokio** en la mañana asiática, que explora la guía de la [sesión de Tokio](/es/blog/sesion-forex-asiatica-tokio).

## Principales, menores y cruces

Ayuda tener claras tres categorías. Los **principales** emparejan el dólar con una divisa de primer nivel y dominan el volumen. Los **cruces** emparejan dos divisas principales sin el dólar, EUR/GBP, EUR/JPY, GBP/JPY, y varios de estos siguen siendo muy líquidos, sobre todo dentro de su horario de origen europeo o asiático. Los **menores** y **exóticos** emparejan una divisa principal con otra más pequeña o de mercado emergente, y tienden a tener una liquidez más delgada y diferenciales más amplios.

Para la mayoría de quienes empiezan, los principales son el foco sensato precisamente porque se negocian con tanta profundidad. Unos diferenciales estrechos reducen el coste de cada operación, y una liquidez profunda hace que las órdenes se ejecuten con limpieza. Los cruces se abren en cuanto quieres expresar una postura entre dos divisas sin dólar, digamos el euro frente a la libra, pero recompensan estar atento a cuándo están realmente despiertos sus mercados de origen.

## Liquidez, diferenciales y momento

Dos pares pueden parecer similares en un gráfico y comportarse de forma muy distinta según la hora. Un principal negociado en su sesión de origen ofrece diferenciales estrechos y una profundidad estable. El mismo par negociado en las horas muertas, la tarde tardía de Nueva York, por ejemplo, o el tramo tranquilo antes de que abra Fráncfort, puede mostrar diferenciales más amplios y movimientos más entrecortados con menos volumen.

Por eso el momento importa tanto como la elección del par. Escoger un principal muy negociado es un buen comienzo, pero operarlo cuando su mercado duerme renuncia a gran parte de la ventaja. Las condiciones más eficientes surgen al juntar las dos cosas: un par profundo y líquido, negociado durante la sesión en que sus mesas de origen están más ocupadas. Para cuadrar eso sin hacer aritmética de zonas horarias mentalmente, la [herramienta de horarios del mercado forex en vivo](/es) muestra qué sesiones están abiertas ahora mismo en tu propia hora local, y nuestra guía sobre la [mejor hora para operar en forex](/es/blog/mejor-hora-para-operar-en-forex) traza las ventanas más movidas con más detalle.

## Preguntas frecuentes

**¿Cuál es el par de divisas más negociado?**
EUR/USD, por amplio margen. Empareja las dos mayores economías del mundo, tiene la liquidez más profunda y los diferenciales más estrechos de cualquier par, y es más activo durante las horas europeas y del solapamiento Londres-Nueva York.

**¿Cuáles son los siete pares de divisas principales?**
Los principales se suelen listar como EUR/USD, USD/JPY, GBP/USD, USD/CHF, AUD/USD, USD/CAD y NZD/USD. Cada uno empareja el dólar estadounidense con otra divisa muy negociada.

**¿Cuál es la mejor hora para operar EUR/USD y GBP/USD?**
Durante la sesión de Londres y sobre todo el solapamiento Londres-Nueva York, aproximadamente de las 13:00 a las 17:00 GMT en horario estándar, cuando la participación europea y estadounidense se combinan y los diferenciales suelen estar en su punto más estrecho.

**¿Cuál es la diferencia entre un principal y un cruce?**
Un principal empareja el dólar estadounidense con otra divisa de primer nivel. Un cruce empareja dos divisas principales sin el dólar, como EUR/GBP o EUR/JPY. Los principales concentran el mayor volumen; algunos cruces siguen siendo muy líquidos dentro de su horario de origen.

**¿Los pares de divisas se negocian todo el día?**
El mercado funciona 24 horas entre semana, así que puedes operar un par en cualquier momento, pero cada par tiene horas en las que es mucho más líquido. Operar un par durante su sesión de origen suele implicar diferenciales más estrechos y una ejecución más fluida.

*Este artículo es solo informativo y no constituye asesoramiento financiero.*`,
    },
  },
  {
    slug: {
      en: "what-time-does-the-forex-market-open",
      es: "a-que-hora-abre-el-mercado-forex",
      fr: "a-quelle-heure-ouvre-le-marche-du-forex",
    },
    title: {
      en: "What Time Does the Forex Market Open in Your Timezone?",
      es: "¿A qué hora abre el mercado forex en tu zona horaria?",
      fr: "À quelle heure ouvre le marché du forex ? Horaires GMT",
    },
    description: {
      en: "The forex market opens Sunday at 5 PM New York time, 22:00 GMT in winter. See the weekly open in your timezone, why it's anchored to New York and the Sydney start.",
      es: "El mercado forex abre el domingo a las 5 PM hora de Nueva York, 22:00 GMT en invierno. Ve la apertura semanal en tu zona y por qué se ancla a Nueva York.",
      fr: "Le marché du forex ouvre le dimanche à 17h00 heure de New York (22:00 GMT). Voyez l’ouverture hebdomadaire dans votre fuseau horaire et pourquoi elle se décale.",
    },
    date: "2026-08-04",
    authorSlug: "author",
    tags: {
      en: ["Basics", "Sessions"],
      es: ["Fundamentos", "Sesiones"],
      fr: ["Horaires", "Bases"],
    },
    cover: "/blog/what-time-does-the-forex-market-open.svg",
    body: {
      en: `The forex market opens for the week on **Sunday at 5 PM New York time**, which is 22:00 GMT in the northern-hemisphere winter and 21:00 GMT while the United States is on daylight saving time. That's the moment the Sydney session comes online and trading restarts after the weekend. Because the open is pinned to New York's clock rather than a fixed GMT time, the exact hour it lands in your own timezone depends on the season. This guide shows the weekly open across the major zones and explains why it works the way it does.

It's worth being precise about this, because a lot of confusion comes from quoting the open as a single GMT time. The market doesn't open at "22:00 GMT" in any permanent sense; it opens at 5 PM in New York, and 22:00 GMT is just what that happens to be for part of the year.

## When the forex week opens and closes

The trading week runs continuously from **Sunday 5 PM New York time** to **Friday 5 PM New York time**. For those five days the market never closes overnight; it simply hands off from one financial centre to the next as the working day travels around the globe. Then, at 5 PM New York time on Friday, the last major centre closes and the market goes quiet until Sunday.

Anchoring both the open and the close to New York's 5 PM is the clean way to state it, because it stays correct all year. In GMT terms the open is 22:00 in winter and 21:00 during US daylight time, and the Friday close mirrors it. If you only remember one thing, remember 5 PM New York, and let a tool handle the conversion into your own clock.

## The Sunday open in your timezone

The table below shows the Sunday open across a range of common zones, using the northern-hemisphere winter case, when New York is on standard time and the open is 22:00 GMT.

| Your city / zone | Sunday open (winter) |
| --- | --- |
| New York (ET) | 17:00 (5 PM) Sunday |
| London (UK, GMT) | 22:00 Sunday |
| Frankfurt / Paris (CET) | 23:00 Sunday |
| Istanbul (TRT) | 01:00 Monday |
| Dubai (GST) | 02:00 Monday |
| Mumbai (IST) | 03:30 Monday |
| Singapore (SGT) | 06:00 Monday |
| Tokyo (JST) | 07:00 Monday |
| Sydney (AEST) | 08:00 Monday |

Notice that for much of Asia and the Pacific, the "Sunday" open actually falls on Monday morning local time. That's normal: the open is a single instant, and which calendar day it lands on just depends on where you are. During US daylight saving time each of these figures moves an hour earlier. To skip the arithmetic and the seasonal shifts, the [live forex market hours tool](/) shows the exact open in your own timezone and keeps up with daylight saving automatically.

## Why the open is anchored to New York

It might seem odd that a market which opens in Sydney is timed by New York's clock. The reason is convention: the forex trading week is universally defined by the New York close at 5 PM, so the reopening 48 hours later is naturally described the same way. New York is the last major centre to trade before the weekend and the reference point the whole market settles around.

When the clock ticks past 5 PM in New York on Sunday, it's early Monday morning in Sydney and Wellington, and those Asia-Pacific desks are the first to come back. So the week opens in the Pacific but is timed from New York, which is why the GMT figure shifts with the US daylight-saving calendar rather than Australia's. For how the whole relay unfolds from there, our [forex trading sessions explained](/en/blog/forex-trading-sessions-explained) guide follows the day from Sydney through to New York.

## Why the Sunday open is quiet

The first hours of the week are the thinnest stretch of trading you'll normally see. Only the Asia-Pacific centres are active, the big pools of London and New York liquidity are still many hours away, and relatively few participants are quoting prices. Two things follow from that.

First, spreads tend to be wider than during peak hours, because fewer institutions are making markets. Second, price can move more sharply on modest orders, since there's less depth to absorb them. The Sunday open is also where any **weekend gap** shows up: if major news broke while the market was closed, the first prices can appear at a different level than Friday's close, leaving a visible jump on the chart. Plenty of traders wait for the early thinness to pass and for spreads to settle before doing much. Our [Sydney session](/en/blog/sydney-forex-session) guide looks more closely at how these opening hours behave.

## Open time versus "is it open right now"

There's a difference between knowing the scheduled open and knowing whether the market is actually trading at this moment. The schedule is fixed, Sunday 5 PM New York to Friday 5 PM New York, but on any given day you may also want to account for holidays, when the market stays technically open yet liquidity in a given currency thins out because that country's banks are closed.

So two questions sit side by side. "What time does forex open?" has the steady answer above. "Is forex open today?" depends on the day of the week and the holiday calendar, which we cover in our guide to whether the [forex market is open today](/en/blog/is-the-forex-market-open-today). For the live answer in your own timezone, the [forexmarkethours.app tool](/) shows the current status of every session at a glance.

## Frequently asked questions

**What time does the forex market open on Sunday?**
At 5 PM New York time, which is 22:00 GMT in the northern-hemisphere winter and 21:00 GMT during US daylight saving time. That's when the Sydney session opens and the trading week begins.

**What time does the forex market open in GMT?**
22:00 GMT in winter and 21:00 GMT in summer, because the open is anchored to 5 PM in New York rather than a fixed GMT time. The GMT figure shifts by an hour when the US changes its clocks.

**Why is the forex open time based on New York?**
By convention the trading week is defined by the New York close at 5 PM on Friday, so the reopening on Sunday is timed the same way. New York is the last major centre to trade each week and the market's common reference point.

**Is the Sunday forex open a good time to trade?**
It's the thinnest part of the week, with wider spreads and possible weekend gaps, so many traders treat it with caution and wait for liquidity to build. This is general information, not advice about your situation.

**What time does the forex market close?**
At 5 PM New York time on Friday, which is 22:00 GMT in winter and 21:00 GMT during US daylight saving time. It then stays closed until the Sunday reopen.

*This article is for general information only and is not financial advice.*`,
      es: `El mercado forex abre la semana el **domingo a las 5 PM hora de Nueva York**, que son las 22:00 GMT en el invierno del hemisferio norte y las 21:00 GMT mientras Estados Unidos está en horario de verano. Ese es el momento en que la sesión de Sídney entra en línea y la negociación se reanuda tras el fin de semana. Como la apertura está fijada al reloj de Nueva York y no a una hora fija en GMT, la hora exacta a la que cae en tu propia zona horaria depende de la estación. Esta guía muestra la apertura semanal en las principales zonas y explica por qué funciona como lo hace.

Conviene ser preciso con esto, porque buena parte de la confusión viene de expresar la apertura como una única hora en GMT. El mercado no abre a las "22:00 GMT" en ningún sentido permanente; abre a las 5 PM en Nueva York, y las 22:00 GMT son solo lo que eso resulta ser durante parte del año.

## Cuándo abre y cierra la semana de forex

La semana de negociación transcurre de forma continua desde el **domingo a las 5 PM hora de Nueva York** hasta el **viernes a las 5 PM hora de Nueva York**. Durante esos cinco días el mercado nunca cierra por la noche; simplemente cede el relevo de un centro financiero al siguiente a medida que la jornada laboral viaja por el planeta. Luego, a las 5 PM hora de Nueva York del viernes, el último centro importante cierra y el mercado queda en silencio hasta el domingo.

Anclar tanto la apertura como el cierre a las 5 PM de Nueva York es la forma limpia de expresarlo, porque se mantiene correcta todo el año. En términos de GMT, la apertura son las 22:00 en invierno y las 21:00 durante el horario de verano de EE. UU., y el cierre del viernes lo refleja. Si solo recuerdas una cosa, recuerda las 5 PM de Nueva York, y deja que una herramienta se ocupe de la conversión a tu propio reloj.

## La apertura del domingo en tu zona horaria

La tabla siguiente muestra la apertura del domingo en varias zonas comunes, usando el caso del invierno del hemisferio norte, cuando Nueva York está en horario estándar y la apertura son las 22:00 GMT.

| Tu ciudad / zona | Apertura del domingo (invierno) |
| --- | --- |
| Nueva York (ET) | 17:00 (5 PM) domingo |
| Londres (UK, GMT) | 22:00 domingo |
| Fráncfort / París (CET) | 23:00 domingo |
| Estambul (TRT) | 01:00 lunes |
| Dubái (GST) | 02:00 lunes |
| Bombay (IST) | 03:30 lunes |
| Singapur (SGT) | 06:00 lunes |
| Tokio (JST) | 07:00 lunes |
| Sídney (AEST) | 08:00 lunes |

Fíjate en que para buena parte de Asia y el Pacífico, la apertura del "domingo" cae en realidad el lunes por la mañana en hora local. Es normal: la apertura es un único instante, y en qué día del calendario cae solo depende de dónde estés. Durante el horario de verano de EE. UU. cada una de estas cifras se adelanta una hora. Para saltarte la aritmética y los cambios estacionales, la [herramienta de horarios del mercado forex en vivo](/es) muestra la apertura exacta en tu propia zona horaria y se mantiene al día con el horario de verano de forma automática.

## Por qué la apertura se ancla a Nueva York

Puede parecer raro que un mercado que abre en Sídney se cronometre por el reloj de Nueva York. La razón es la convención: la semana de negociación de forex se define universalmente por el cierre de Nueva York a las 5 PM, así que la reapertura 48 horas después se describe de forma natural igual. Nueva York es el último centro importante en negociar antes del fin de semana y el punto de referencia en torno al cual se ordena todo el mercado.

Cuando el reloj pasa de las 5 PM en Nueva York el domingo, es la madrugada del lunes en Sídney y Wellington, y esas mesas de Asia-Pacífico son las primeras en volver. Así que la semana abre en el Pacífico pero se cronometra desde Nueva York, y por eso la cifra en GMT se desplaza con el calendario de horario de verano de EE. UU. y no con el de Australia. Para ver cómo se despliega todo el relevo a partir de ahí, nuestra guía de [sesiones de trading forex explicadas](/es/blog/sesiones-de-trading-forex-explicadas) sigue la jornada desde Sídney hasta Nueva York.

## Por qué la apertura del domingo es tranquila

Las primeras horas de la semana son el tramo más delgado de negociación que verás normalmente. Solo los centros de Asia-Pacífico están activos, los grandes focos de liquidez de Londres y Nueva York quedan aún a muchas horas, y relativamente pocos participantes cotizan precios. De ahí se desprenden dos cosas.

Primero, los diferenciales tienden a ser más amplios que en las horas punta, porque menos instituciones hacen mercado. Segundo, el precio puede moverse con más brusquedad ante órdenes modestas, ya que hay menos profundidad para absorberlas. La apertura del domingo es también donde aparece cualquier **hueco del fin de semana**: si surgieron noticias importantes mientras el mercado estaba cerrado, los primeros precios pueden aparecer en un nivel distinto al cierre del viernes, dejando un salto visible en el gráfico. Muchos operadores esperan a que pase la delgadez inicial y a que los diferenciales se asienten antes de hacer gran cosa. Nuestra guía de la [sesión de Sídney](/es/blog/sesion-forex-de-sidney) analiza más de cerca cómo se comportan estas horas de apertura.

## Hora de apertura frente a "¿está abierto ahora mismo?"

Hay una diferencia entre conocer la apertura programada y saber si el mercado está realmente negociando en este momento. El horario es fijo, domingo 5 PM de Nueva York a viernes 5 PM de Nueva York, pero en un día cualquiera quizá quieras tener en cuenta los festivos, cuando el mercado sigue técnicamente abierto pero la liquidez de una divisa concreta se adelgaza porque los bancos de ese país están cerrados.

Así que hay dos preguntas una al lado de la otra. "¿A qué hora abre el forex?" tiene la respuesta estable de arriba. "¿Está abierto el forex hoy?" depende del día de la semana y del calendario de festivos, algo que cubrimos en nuestra guía sobre si el [mercado forex está abierto hoy](/es/blog/esta-abierto-el-mercado-forex-hoy). Para la respuesta en vivo en tu propia zona horaria, la [herramienta de forexmarkethours.app](/es) muestra el estado actual de cada sesión de un vistazo.

## Preguntas frecuentes

**¿A qué hora abre el mercado forex el domingo?**
A las 5 PM hora de Nueva York, que son las 22:00 GMT en el invierno del hemisferio norte y las 21:00 GMT durante el horario de verano de EE. UU. Es cuando abre la sesión de Sídney y comienza la semana de negociación.

**¿A qué hora abre el mercado forex en GMT?**
A las 22:00 GMT en invierno y a las 21:00 GMT en verano, porque la apertura está anclada a las 5 PM de Nueva York y no a una hora fija en GMT. La cifra en GMT se desplaza una hora cuando EE. UU. cambia sus relojes.

**¿Por qué la hora de apertura del forex se basa en Nueva York?**
Por convención, la semana de negociación se define por el cierre de Nueva York a las 5 PM del viernes, así que la reapertura del domingo se cronometra igual. Nueva York es el último centro importante en negociar cada semana y el punto de referencia común del mercado.

**¿Es la apertura del domingo un buen momento para operar?**
Es la parte más delgada de la semana, con diferenciales más amplios y posibles huecos del fin de semana, así que muchos operadores la tratan con cautela y esperan a que se forme la liquidez. Esto es información general, no un consejo sobre tu situación.

**¿A qué hora cierra el mercado forex?**
A las 5 PM hora de Nueva York del viernes, que son las 22:00 GMT en invierno y las 21:00 GMT durante el horario de verano de EE. UU. Después permanece cerrado hasta la reapertura del domingo.

*Este artículo es solo informativo y no constituye asesoramiento financiero.*`,
      fr: `Le marché du forex ouvre pour la semaine le **dimanche à 17h00 heure de New York**, soit 22:00 GMT pendant l’hiver de l’hémisphère nord et 21:00 GMT lorsque les États-Unis sont à l’heure d’été. C’est le moment où la séance de Sydney entre en scène et où les échanges reprennent après le week-end. Comme l’ouverture est arrimée à l’horloge de New York plutôt qu’à une heure GMT fixe, l’heure exacte à laquelle elle tombe dans votre propre fuseau dépend de la saison. Ce guide montre l’ouverture hebdomadaire dans les principaux fuseaux et explique pourquoi elle fonctionne ainsi.

Il vaut la peine d’être précis sur ce point, car une bonne part de la confusion vient du fait de citer l’ouverture comme une heure GMT unique. Le marché n’ouvre pas à « 22:00 GMT » de façon permanente ; il ouvre à 17h00 à New York, et 22:00 GMT n’est que ce que cela représente pendant une partie de l’année.

## Quand la semaine du forex ouvre et ferme

La semaine de trading se déroule sans interruption du **dimanche 17h00 heure de New York** au **vendredi 17h00 heure de New York**. Pendant ces cinq jours, le marché ne ferme jamais la nuit ; il passe simplement le relais d’une place financière à l’autre à mesure que la journée de travail fait le tour du globe. Puis, le vendredi à 17h00 heure de New York, la dernière grande place ferme et le marché se met en sommeil jusqu’au dimanche.

Arrimer l’ouverture et la clôture au 17h00 new-yorkais est la manière propre de l’exprimer, parce qu’elle reste exacte toute l’année. En GMT, l’ouverture est à 22:00 en hiver et à 21:00 pendant l’heure d’été américaine, et la clôture du vendredi suit la même logique. Si vous ne retenez qu’une chose, retenez 17h00 à New York, et laissez un outil se charger de la conversion vers votre propre horloge.

## L’ouverture du dimanche dans votre fuseau horaire

Le tableau ci-dessous montre l’ouverture du dimanche dans une série de fuseaux courants, dans le cas de l’hiver de l’hémisphère nord, quand New York est à l’heure standard et que l’ouverture se situe à 22:00 GMT.

| Votre ville / fuseau | Ouverture du dimanche (hiver) |
| --- | --- |
| New York (ET) | 17:00 dimanche |
| Londres (Royaume-Uni, GMT) | 22:00 dimanche |
| Francfort / Paris (CET) | 23:00 dimanche |
| Istanbul (TRT) | 01:00 lundi |
| Dubaï (GST) | 02:00 lundi |
| Bombay (IST) | 03:30 lundi |
| Singapour (SGT) | 06:00 lundi |
| Tokyo (JST) | 07:00 lundi |
| Sydney (AEST) | 08:00 lundi |

Remarquez que pour une grande partie de l’Asie et du Pacifique, l’ouverture « du dimanche » tombe en réalité le lundi matin en heure locale. C’est normal : l’ouverture est un instant unique, et le jour calendaire sur lequel elle tombe dépend simplement de l’endroit où vous êtes. Pendant l’heure d’été américaine, chacun de ces horaires avance d’une heure. Nous détaillons ces conversions fuseau par fuseau dans notre guide des [horaires du forex par fuseau horaire](/fr/blog/horaires-du-forex-par-fuseau-horaire). Pour éviter le calcul et les décalages saisonniers, l’[outil des horaires du marché forex en direct](/) affiche l’ouverture exacte dans votre propre fuseau et suit automatiquement l’heure d’été.

## Pourquoi l’ouverture est arrimée à New York

Il peut sembler curieux qu’un marché qui ouvre à Sydney soit cadencé par l’horloge de New York. La raison tient à la convention : la semaine de trading forex est universellement définie par la clôture de New York à 17h00, si bien que la réouverture 48 heures plus tard se décrit naturellement de la même façon. New York est la dernière grande place à négocier avant le week-end et le point de référence autour duquel tout le marché s’organise.

Quand l’horloge dépasse 17h00 à New York le dimanche, il est déjà tôt le lundi matin à Sydney et à Wellington, et ce sont ces salles de marché d’Asie-Pacifique qui reviennent les premières. La semaine s’ouvre donc dans le Pacifique mais se compte depuis New York, et c’est pourquoi le chiffre GMT se décale avec le calendrier d’heure d’été américain plutôt qu’avec celui de l’Australie. Pour comprendre comment tout le relais se déroule ensuite, notre guide [séances de trading forex expliquées](/fr/blog/seances-de-trading-forex-expliquees) suit la journée de Sydney jusqu’à New York.

## Pourquoi l’ouverture du dimanche est calme

Les premières heures de la semaine constituent la plage d’échanges la plus mince que vous verrez normalement. Seules les places d’Asie-Pacifique sont actives, les grands réservoirs de liquidité de Londres et de New York sont encore à plusieurs heures, et relativement peu de participants affichent des prix. Deux conséquences en découlent.

D’abord, les spreads ont tendance à être plus larges qu’aux heures de pointe, parce que moins d’institutions animent le marché. Ensuite, le prix peut bouger plus brusquement sur des ordres modestes, puisqu’il y a moins de profondeur pour les absorber. L’ouverture du dimanche est aussi le moment où apparaît un éventuel **gap de week-end** : si une actualité majeure est tombée pendant la fermeture, les premiers prix peuvent s’afficher à un niveau différent de la clôture du vendredi, laissant un saut visible sur le graphique. Beaucoup de traders attendent que cette minceur initiale se dissipe et que les spreads se normalisent avant d’agir. Notre guide de la [séance forex de Sydney](/fr/blog/seance-forex-de-sydney) examine de plus près le comportement de ces heures d’ouverture.

## Heure d’ouverture et « est-il ouvert en ce moment »

Il y a une différence entre connaître l’heure d’ouverture programmée et savoir si le marché négocie réellement à cet instant. Le calendrier est fixe, du dimanche 17h00 à New York au vendredi 17h00 à New York, mais un jour donné vous voudrez peut-être aussi tenir compte des jours fériés, où le marché reste techniquement ouvert alors que la liquidité d’une devise donnée s’amenuise parce que les banques du pays concerné sont fermées.

Deux questions coexistent donc. « À quelle heure ouvre le forex ? » a la réponse stable donnée plus haut. « Le forex est-il ouvert aujourd’hui ? » dépend du jour de la semaine et du calendrier des jours fériés, que nous traitons dans notre guide pour savoir si le [marché du forex est ouvert aujourd’hui](/fr/blog/le-marche-du-forex-est-il-ouvert-aujourd-hui). Pour la réponse en direct dans votre propre fuseau, l’[outil forexmarkethours.app](/) affiche l’état actuel de chaque séance d’un coup d’œil.

## Questions fréquentes

**À quelle heure le marché du forex ouvre-t-il le dimanche ?**
À 17h00 heure de New York, soit 22:00 GMT pendant l’hiver de l’hémisphère nord et 21:00 GMT pendant l’heure d’été américaine. C’est le moment où la séance de Sydney ouvre et où la semaine de trading commence.

**À quelle heure le marché du forex ouvre-t-il en GMT ?**
22:00 GMT en hiver et 21:00 GMT en été, parce que l’ouverture est arrimée à 17h00 à New York plutôt qu’à une heure GMT fixe. Le chiffre GMT se décale d’une heure quand les États-Unis changent d’horloge.

**Pourquoi l’heure d’ouverture du forex est-elle calée sur New York ?**
Par convention, la semaine de trading est définie par la clôture de New York à 17h00 le vendredi, si bien que la réouverture du dimanche se compte de la même façon. New York est la dernière grande place à négocier chaque semaine et le point de référence commun du marché.

**L’ouverture du dimanche est-elle un bon moment pour trader ?**
C’est la partie la plus mince de la semaine, avec des spreads plus larges et de possibles gaps de week-end : beaucoup de traders l’abordent donc avec prudence et attendent que la liquidité se construise. Il s’agit d’une information générale et non d’un conseil adapté à votre situation.

**À quelle heure le marché du forex ferme-t-il ?**
À 17h00 heure de New York le vendredi, soit 22:00 GMT en hiver et 21:00 GMT pendant l’heure d’été américaine. Il reste ensuite fermé jusqu’à la réouverture du dimanche.

*Cet article est fourni à titre d’information générale uniquement et ne constitue pas un conseil financier.*`,
    },
  },
  {
    slug: {
      en: "forex-economic-calendar-and-news-times",
      es: "calendario-economico-y-horas-de-noticias-forex",
    },
    title: {
      en: "Forex News Times: When the Economic Calendar Hits Sessions",
      es: "Horas de noticias forex: cuándo el calendario económico llega",
    },
    description: {
      en: "Most big forex news lands in the London and New York sessions. See when NFP, CPI and rate decisions are released and how the economic calendar lines up with hours.",
      es: "La mayor parte de las grandes noticias forex caen en las sesiones de Londres y Nueva York. Ve cuándo se publican NFP, IPC y decisiones de tipos y cómo encajan.",
    },
    date: "2026-08-05",
    authorSlug: "author",
    tags: {
      en: ["News", "Strategy"],
      es: ["Noticias", "Estrategia"],
    },
    cover: "/blog/forex-economic-calendar-and-news-times.svg",
    body: {
      en: `Most of the market-moving economic news in forex lands during the **London and New York sessions**, and the single biggest releases, US payrolls, inflation reports and central-bank rate decisions, cluster in the New York morning while London is still open. That's no accident: news is scheduled for when the relevant market is awake and liquidity is deepest. If you understand when the economic calendar fires and how it lines up with the trading sessions, a lot of the day's sudden moves stop looking random. This guide maps the main release times to the sessions they hit.

The goal here is timing, not tips. Knowing that a big number is due at a particular hour explains why volatility spikes then, and why the minutes around it behave differently from the rest of the session. What you do with that is a separate question entirely.

## Why news is timed to sessions

Economic data is released on official schedules, and those schedules are built around each country's own working day. A US jobs report comes out in the American morning. UK inflation figures come out in the British morning. Eurozone data lands in continental European hours. So the news naturally follows the same relay as the sessions themselves, because both are anchored to local business hours.

This matters because a release hits hardest when its home market is liquid and active. A US number dropped into the deep liquidity of the New York morning moves the dollar sharply and cleanly. The same number released into a thin, sleepy market would still move price, but more erratically. Scheduling data for peak local hours is part of why the biggest releases and the busiest sessions line up so neatly. For the sessions themselves, our [forex trading sessions explained](/en/blog/forex-trading-sessions-explained) guide sets out the full timetable.

## The heavyweight releases and when they land

A handful of releases move the market more than all the others combined. The table below lists them with their usual release time, converted to GMT for the standard-time (winter) case. Remember these are pinned to local time, so they shift by an hour when the relevant country changes its clocks.

| Release | Country | Usual time (GMT, winter) | Session |
| --- | --- | --- | --- |
| Non-farm payrolls | US | 13:30 | New York (London still open) |
| CPI inflation | US | 13:30 | New York (London still open) |
| Fed rate decision | US | 19:00 | New York afternoon |
| Bank of England decision | UK | 12:00 | London |
| ECB rate decision | Eurozone | 12:45 | European / London |
| UK CPI / jobs | UK | 07:00 | London open |
| GDP releases | Various | Local morning | Home session |

**Non-farm payrolls**, the monthly US employment report, is the classic example: released at 8:30 AM in New York, it lands right in the London-New York overlap and can move dollar pairs within seconds. US **CPI** inflation shares that slot. **Central-bank decisions** from the [Federal Reserve](https://www.federalreserve.gov), the [Bank of England](https://www.bankofengland.co.uk) and the [European Central Bank](https://www.ecb.europa.eu) are scheduled events too, published on calendars you can check in advance, and they routinely produce the largest moves of the month.

## Why the overlap is where news bites hardest

Look at that table again and a pattern jumps out: the heaviest US releases at 13:30 GMT fall squarely inside the **London-New York overlap**. That's the window, roughly 13:00 to 17:00 GMT, when both major centres trade at once and liquidity peaks. Dropping a major data surprise into the deepest, busiest part of the day is what produces the sharpest volatility of the week.

There's a compounding effect here. The overlap is already the most active window on its own, and then the calendar loads its biggest events into it. So the same hours deliver both the tightest spreads and the largest news-driven moves. Our [London-New York overlap](/en/blog/london-new-york-overlap) guide covers why that window matters, and the [New York session](/en/blog/new-york-forex-session) guide looks at the US releases specifically.

The UK morning has its own smaller version of this. British inflation and jobs data often come out around 07:00 GMT, right at the [London open](/en/blog/what-time-does-the-london-session-open), which is part of why the pound can move sharply just as the session gets going.

## Reading the calendar around the sessions

An economic calendar lists upcoming releases with a date, a time, and usually an importance rating. The practical skill is reading it in your own timezone and against the session clock, so you know not just what's coming but whether it'll land in a liquid, active market or a quiet one.

A high-importance release during the overlap is the setup most likely to produce a big, fast move. The same release during a thin session can still cause a jump, but often a messier one. And a day with no major releases scheduled tends to trade more calmly, driven by flow and technicals rather than headline surprises. None of this tells you how to position; it just frames what kind of session to expect. Many traders check the calendar first thing precisely so they aren't caught off guard by a scheduled number.

To line the calendar up with live session status, the [forexmarkethours.app tool](/) shows which sessions are open in your timezone right now, and the [best time to trade forex](/en/blog/best-time-to-trade-forex) guide maps the busiest hours the news tends to hit.

## A note on holidays

The flip side of scheduled news is scheduled quiet. On major bank holidays, the market stays technically open but the relevant country's data flow dries up and liquidity thins, so the calendar goes light and moves can turn erratic on low volume. It's worth knowing which holidays affect which currencies; our guide to whether the [forex market is open today](/en/blog/is-the-forex-market-open-today) lists the days when conditions tend to be poor. For official holiday schedules, the UK publishes bank holidays at [gov.uk](https://www.gov.uk/bank-holidays).

## Frequently asked questions

**What time is non-farm payrolls released?**
At 8:30 AM New York time, which is 13:30 GMT in the northern-hemisphere winter and 12:30 GMT during US daylight saving time. It lands inside the London-New York overlap, the busiest window of the day.

**When are the biggest forex news events?**
Most cluster in the New York morning while London is still open, roughly 13:00 to 17:00 GMT. That's when US payrolls, inflation and Fed decisions land, alongside the deepest liquidity of the day.

**Why does the market move so much on news?**
A scheduled release drops fresh information into a deep, active market all at once, and participants reprice instantly. Because the biggest releases hit during peak liquidity, the reaction is fast and often large.

**How do I know when news is due?**
Check an economic calendar, which lists each release with its date, time and importance. Read the times in your own timezone and against the session clock so you know whether a release will hit a busy or a quiet market.

**Does forex news come out on weekends?**
Rarely, and the market is closed anyway from Friday 5 PM New York time to Sunday 5 PM. Occasional weekend developments show up as a price gap at the Sunday open rather than as live trading.

*This article is for general information only and is not financial advice.*`,
      es: `La mayor parte de las noticias económicas que mueven el mercado forex caen durante las **sesiones de Londres y Nueva York**, y las publicaciones más grandes, las nóminas de EE. UU., los informes de inflación y las decisiones de tipos de los bancos centrales, se concentran en la mañana de Nueva York mientras Londres sigue abierto. No es casualidad: las noticias se programan para cuando el mercado relevante está despierto y la liquidez es más profunda. Si entiendes cuándo se dispara el calendario económico y cómo encaja con las sesiones de negociación, muchos de los movimientos repentinos del día dejan de parecer aleatorios. Esta guía relaciona las principales horas de publicación con las sesiones a las que llegan.

El objetivo aquí es el momento, no los consejos. Saber que un dato importante sale a una hora concreta explica por qué la volatilidad se dispara entonces, y por qué los minutos en torno a ese dato se comportan de forma distinta al resto de la sesión. Qué haces con eso es una cuestión aparte por completo.

## Por qué las noticias se cronometran según las sesiones

Los datos económicos se publican en calendarios oficiales, y esos calendarios se construyen en torno a la jornada laboral de cada país. Un informe de empleo de EE. UU. sale en la mañana estadounidense. Las cifras de inflación del Reino Unido salen en la mañana británica. Los datos de la eurozona caen en el horario de la Europa continental. Así que las noticias siguen de forma natural el mismo relevo que las propias sesiones, porque ambos están anclados a las horas laborales locales.

Esto importa porque una publicación golpea con más fuerza cuando su mercado de origen está líquido y activo. Un dato de EE. UU. soltado en la liquidez profunda de la mañana de Nueva York mueve el dólar con brusquedad y limpieza. El mismo dato publicado en un mercado delgado y adormecido también movería el precio, pero de forma más errática. Programar los datos para las horas locales punta es parte de por qué las mayores publicaciones y las sesiones más movidas encajan con tanta precisión. Para las sesiones en sí, nuestra guía de [sesiones de trading forex explicadas](/es/blog/sesiones-de-trading-forex-explicadas) expone el horario completo.

## Las publicaciones de peso y cuándo caen

Un puñado de publicaciones mueve el mercado más que todas las demás juntas. La tabla siguiente las enumera con su hora habitual de publicación, convertida a GMT para el caso de horario estándar (invierno). Recuerda que están fijadas a la hora local, así que se desplazan una hora cuando el país correspondiente cambia sus relojes.

| Publicación | País | Hora habitual (GMT, invierno) | Sesión |
| --- | --- | --- | --- |
| Nóminas no agrícolas | EE. UU. | 13:30 | Nueva York (Londres aún abierto) |
| Inflación IPC | EE. UU. | 13:30 | Nueva York (Londres aún abierto) |
| Decisión de tipos de la Fed | EE. UU. | 19:00 | Tarde de Nueva York |
| Decisión del Banco de Inglaterra | Reino Unido | 12:00 | Londres |
| Decisión de tipos del BCE | Eurozona | 12:45 | Europea / Londres |
| IPC / empleo del Reino Unido | Reino Unido | 07:00 | Apertura de Londres |
| Publicaciones de PIB | Varios | Mañana local | Sesión de origen |

Las **nóminas no agrícolas**, el informe mensual de empleo de EE. UU., son el ejemplo clásico: publicadas a las 8:30 de la mañana en Nueva York, caen justo en el solapamiento Londres-Nueva York y pueden mover los pares con dólar en cuestión de segundos. El **IPC** de inflación de EE. UU. comparte esa franja. Las **decisiones de los bancos centrales** de la [Reserva Federal](https://www.federalreserve.gov), el [Banco de Inglaterra](https://www.bankofengland.co.uk) y el [Banco Central Europeo](https://www.ecb.europa.eu) también son eventos programados, publicados en calendarios que puedes consultar con antelación, y producen habitualmente los mayores movimientos del mes.

## Por qué el solapamiento es donde más muerden las noticias

Mira otra vez esa tabla y salta un patrón: las publicaciones estadounidenses más pesadas de las 13:30 GMT caen de lleno dentro del **solapamiento Londres-Nueva York**. Esa es la ventana, aproximadamente de las 13:00 a las 17:00 GMT, en que ambos centros principales negocian a la vez y la liquidez toca su máximo. Soltar una gran sorpresa de datos en la parte más profunda y movida del día es lo que produce la volatilidad más brusca de la semana.

Aquí hay un efecto acumulativo. El solapamiento ya es la ventana más activa por sí solo, y entonces el calendario carga en él sus mayores eventos. Así que las mismas horas ofrecen a la vez los diferenciales más estrechos y los mayores movimientos impulsados por noticias. Nuestra guía sobre el [solapamiento Londres-Nueva York](/es/blog/solapamiento-londres-nueva-york) cubre por qué importa esa ventana, y la guía de la [sesión de Nueva York](/es/blog/sesion-forex-de-nueva-york) analiza las publicaciones estadounidenses en concreto.

La mañana del Reino Unido tiene su propia versión más pequeña de esto. Los datos británicos de inflación y empleo suelen salir en torno a las 07:00 GMT, justo en la [apertura de Londres](/es/blog/a-que-hora-abre-la-sesion-de-londres), lo que en parte explica por qué la libra puede moverse con brusquedad justo cuando arranca la sesión.

## Leer el calendario junto a las sesiones

Un calendario económico enumera las próximas publicaciones con una fecha, una hora y normalmente una calificación de importancia. La habilidad práctica es leerlo en tu propia zona horaria y frente al reloj de sesiones, para saber no solo qué viene, sino si caerá en un mercado líquido y activo o en uno tranquilo.

Una publicación de alta importancia durante el solapamiento es la situación con más probabilidad de producir un movimiento grande y rápido. La misma publicación durante una sesión delgada aún puede causar un salto, pero a menudo más desordenado. Y un día sin publicaciones importantes programadas tiende a negociarse con más calma, impulsado por el flujo y lo técnico más que por sorpresas de titulares. Nada de esto te dice cómo posicionarte; solo enmarca qué tipo de sesión esperar. Muchos operadores consultan el calendario a primera hora precisamente para que un dato programado no les pille desprevenidos.

Para alinear el calendario con el estado en vivo de las sesiones, la [herramienta de forexmarkethours.app](/es) muestra qué sesiones están abiertas en tu zona horaria ahora mismo, y la guía sobre la [mejor hora para operar en forex](/es/blog/mejor-hora-para-operar-en-forex) traza las horas más movidas en las que suelen caer las noticias.

## Una nota sobre los festivos

La otra cara de las noticias programadas es la calma programada. En los grandes festivos bancarios, el mercado sigue técnicamente abierto pero el flujo de datos del país correspondiente se seca y la liquidez se adelgaza, así que el calendario queda ligero y los movimientos pueden volverse erráticos con poco volumen. Conviene saber qué festivos afectan a qué divisas; nuestra guía sobre si el [mercado forex está abierto hoy](/es/blog/esta-abierto-el-mercado-forex-hoy) enumera los días en que las condiciones tienden a ser malas. Para calendarios oficiales de festivos, el Reino Unido publica sus festivos bancarios en [gov.uk](https://www.gov.uk/bank-holidays).

## Preguntas frecuentes

**¿A qué hora se publican las nóminas no agrícolas?**
A las 8:30 de la mañana hora de Nueva York, que son las 13:30 GMT en el invierno del hemisferio norte y las 12:30 GMT durante el horario de verano de EE. UU. Caen dentro del solapamiento Londres-Nueva York, la ventana más movida del día.

**¿Cuándo son los mayores eventos de noticias forex?**
La mayoría se concentran en la mañana de Nueva York mientras Londres sigue abierto, aproximadamente de las 13:00 a las 17:00 GMT. Es cuando caen las nóminas de EE. UU., la inflación y las decisiones de la Fed, junto con la liquidez más profunda del día.

**¿Por qué se mueve tanto el mercado con las noticias?**
Una publicación programada suelta información nueva en un mercado profundo y activo de golpe, y los participantes revalorizan al instante. Como las mayores publicaciones caen durante la liquidez punta, la reacción es rápida y a menudo grande.

**¿Cómo sé cuándo hay noticias previstas?**
Consulta un calendario económico, que enumera cada publicación con su fecha, hora e importancia. Lee las horas en tu propia zona horaria y frente al reloj de sesiones para saber si una publicación caerá en un mercado movido o tranquilo.

**¿Salen noticias de forex los fines de semana?**
Rara vez, y el mercado está cerrado de todos modos desde el viernes a las 5 PM hora de Nueva York hasta el domingo a las 5 PM. Los acontecimientos ocasionales del fin de semana aparecen como un hueco de precio en la apertura del domingo en lugar de como negociación en vivo.

*Este artículo es solo informativo y no constituye asesoramiento financiero.*`,
    },
  },
  {
    slug: {
      en: "why-forex-is-open-24-hours",
      es: "por-que-el-mercado-forex-abre-24-horas",
    },
    title: {
      en: "Why the Forex Market Is Open 24 Hours a Day",
      es: "Por qué el mercado forex está abierto 24 horas al día",
    },
    description: {
      en: "Forex is open 24 hours a day, five days a week, because it has no central exchange. See how the sessions relay round the clock and why it still closes on weekends.",
      es: "El forex está abierto 24 horas al día, cinco días a la semana, porque no tiene bolsa central. Ve cómo las sesiones se relevan y por qué cierra los fines de semana.",
    },
    date: "2026-08-06",
    authorSlug: "author",
    tags: {
      en: ["Basics", "Sessions"],
      es: ["Fundamentos", "Sesiones"],
    },
    cover: "/blog/why-forex-is-open-24-hours.svg",
    body: {
      en: `The forex market is open 24 hours a day, five days a week, because it has **no central exchange**. Instead of one building with fixed opening hours, currency trading happens over the counter through a worldwide network of banks and institutions, and that network is always awake somewhere. As one financial centre closes for the evening, another is just starting its day, so trading passes around the globe without a pause from the Sunday open to the Friday close. This guide explains how that round-the-clock structure actually works, and why, despite running 24 hours, the market still shuts down every weekend.

It's one of the first things that sets forex apart from stocks. A share trades on an exchange with a bell at each end of the day. A currency has no such home, and that single difference is what makes 24-hour trading possible.

## No central exchange, no closing bell

A stock exchange is a single venue. It opens in the morning, closes in the afternoon, and everything trades in between at that one place on that one clock. Forex has nothing like it. There's no central marketplace and no official opening or closing time for the market as a whole. Trades are agreed directly between participants, banks, brokers, funds and companies, in what's called an over-the-counter market.

Because there's no single venue, there's no single set of hours. The market is simply "open" wherever banks are actively quoting and settling currency trades, and somewhere in the world, on any weekday, they are. That decentralised structure is the whole reason forex can run continuously. The Bank for International Settlements, which surveys this market, describes it as the largest and most liquid financial market in the world, spread across financial centres rather than housed in one; its research is at https://www.bis.org/statistics/rpfx22.htm.

## How the sessions relay around the clock

The 24-hour day is best understood as a relay of regional sessions, each tied to the working hours of a major financial centre. As one hands off, the next picks up.

| Session | Hours (GMT, standard time) |
| --- | --- |
| Sydney | 22:00 - 07:00 |
| Tokyo | 00:00 - 09:00 |
| London (Frankfurt from 07:00) | 08:00 - 17:00 |
| New York | 13:00 - 22:00 |

The week starts when **Sydney** comes online on Sunday evening GMT. A couple of hours later **Tokyo** joins, deepening the Asian session. As Asia winds down, **Frankfurt and London** open and Europe takes over, carrying the largest share of the day's volume. Then **New York** arrives in the early afternoon GMT, overlaps London for a few hours, and eventually closes the loop at 22:00 GMT, just as the next Sydney session is ready to begin. The handovers are seamless because the sessions overlap at the edges, so liquidity is passed on rather than switched off. Our [forex trading sessions explained](/en/blog/forex-trading-sessions-explained) guide walks through each session in detail.

## Why it still closes on weekends

If the market never needs a single centre to be awake, why does it close at all on Saturday and Sunday? The answer is that the banking system underneath it takes the weekend off. Spot currency trades are ultimately settled through the interbank system, and the banks in every major centre close for the weekend. With no banks settling trades or making prices, there's no functioning market to trade in, even though it's daytime somewhere.

So the market shuts at **5 PM New York time on Friday**, when the last major centre closes, and reopens at **5 PM New York time on Sunday**, when Sydney comes back. That's a genuine closure, not just a quiet patch: you can't trade over the weekend. It also creates the **weekend gap**, where prices can reopen on Sunday at a different level than Friday's close if news broke while the market was shut. For the full detail on the weekly open, see our guide on [what time the forex market opens](/en/blog/what-time-does-the-forex-market-open), and for holidays and closures, our guide to whether the [forex market is open today](/en/blog/is-the-forex-market-open-today).

## 24 hours open doesn't mean 24 hours equal

Running around the clock is not the same as being uniformly busy. Liquidity rises and falls dramatically through the 24-hour day, and the difference between the peak and the quiet hours is enormous.

The high point is the **London-New York overlap** in the early afternoon GMT, when the two largest centres trade together and volume is deepest. The low point is the late New York afternoon after London closes, when only a thinning American market is left before Sydney restarts the cycle. Between those extremes, each session has its own tempo, from the calm Sydney open to the heavy European morning. So while you can technically trade at 3 AM in your local time, the conditions then may be nothing like those at midday. Which hours suit you depends on your pairs and your schedule, something our [best time to trade forex](/en/blog/best-time-to-trade-forex) guide unpacks.

The practical way to use a 24-hour market is to know which part of it is live when you are. The [forexmarkethours.app tool](/) shows the current status of every session in your own timezone, so you can see at a glance whether you're looking at a peak window or a quiet one.

## Frequently asked questions

**Why is the forex market open 24 hours?**
Because it has no central exchange. Currency trades happen over the counter through a global network of banks, and as one financial centre closes another opens, so trading continues around the clock on weekdays without any single venue needing to stay awake.

**Is forex really open 24 hours a day?**
Yes, on weekdays. The market runs continuously from Sunday 5 PM New York time to Friday 5 PM New York time. It's closed on weekends because the banks that settle trades are shut.

**Why does forex close on weekends if it never sleeps?**
Because the interbank banking system that settles currency trades closes for the weekend. Without banks quoting and settling, there's no working market, even though it's daytime somewhere in the world.

**Are all 24 hours equally good to trade?**
No. Liquidity peaks during the London-New York overlap and thins out in the late New York hours. The market runs continuously, but conditions vary a lot between the busy and quiet parts of the day.

**Which markets keep forex open overnight?**
As Europe and America close, the Asia-Pacific centres, Sydney and Tokyo, take over, and later Europe reopens before the Americas. The relay of these regional sessions is what keeps the market running through the night in any one location.

*This article is for general information only and is not financial advice.*`,
      es: `El mercado forex está abierto 24 horas al día, cinco días a la semana, porque **no tiene una bolsa central**. En lugar de un edificio con horarios fijos, la negociación de divisas ocurre de forma extrabursátil a través de una red mundial de bancos e instituciones, y esa red siempre está despierta en algún lugar. Cuando un centro financiero cierra por la tarde, otro apenas está empezando su jornada, así que la negociación pasa por todo el planeta sin pausa desde la apertura del domingo hasta el cierre del viernes. Esta guía explica cómo funciona de verdad esa estructura ininterrumpida y por qué, pese a operar 24 horas, el mercado sigue cerrando cada fin de semana.

Es una de las primeras cosas que distinguen al forex de las acciones. Una acción se negocia en una bolsa con una campana en cada extremo del día. Una divisa no tiene tal hogar, y esa única diferencia es lo que hace posible la negociación de 24 horas.

## Sin bolsa central, sin campana de cierre

Una bolsa de valores es un único recinto. Abre por la mañana, cierra por la tarde, y todo se negocia en medio en ese único lugar con ese único reloj. El forex no tiene nada parecido. No hay un mercado central ni una hora oficial de apertura o cierre para el mercado en su conjunto. Las operaciones se acuerdan directamente entre participantes, bancos, brókeres, fondos y empresas, en lo que se llama un mercado extrabursátil (over the counter).

Como no hay un único recinto, no hay un único horario. El mercado simplemente está "abierto" allí donde los bancos cotizan y liquidan activamente operaciones de divisas, y en algún lugar del mundo, cualquier día laborable, lo hacen. Esa estructura descentralizada es la razón entera por la que el forex puede funcionar de forma continua. El Banco de Pagos Internacionales, que estudia este mercado, lo describe como el mercado financiero más grande y líquido del mundo, repartido entre centros financieros en lugar de alojado en uno solo; su investigación está en https://www.bis.org/statistics/rpfx22.htm.

## Cómo se relevan las sesiones a lo largo del día

El día de 24 horas se entiende mejor como un relevo de sesiones regionales, cada una ligada a las horas laborales de un centro financiero importante. Cuando una cede el testigo, la siguiente lo recoge.

| Sesión | Horario (GMT, hora estándar) |
| --- | --- |
| Sídney | 22:00 - 07:00 |
| Tokio | 00:00 - 09:00 |
| Londres (Fráncfort desde 07:00) | 08:00 - 17:00 |
| Nueva York | 13:00 - 22:00 |

La semana arranca cuando **Sídney** entra en línea el domingo por la tarde en GMT. Un par de horas después se suma **Tokio**, profundizando la sesión asiática. A medida que Asia reduce su actividad, **Fráncfort y Londres** abren y Europa toma el relevo, cargando con la mayor parte del volumen del día. Luego **Nueva York** llega a primera hora de la tarde en GMT, se solapa con Londres unas horas y finalmente cierra el círculo a las 22:00 GMT, justo cuando la siguiente sesión de Sídney está lista para empezar. Los traspasos son fluidos porque las sesiones se solapan en los bordes, así que la liquidez se transmite en lugar de apagarse. Nuestra guía de [sesiones de trading forex explicadas](/es/blog/sesiones-de-trading-forex-explicadas) repasa cada sesión en detalle.

## Por qué aun así cierra los fines de semana

Si el mercado nunca necesita que un único centro esté despierto, ¿por qué cierra los sábados y domingos? La respuesta es que el sistema bancario que hay debajo se toma el fin de semana libre. Las operaciones de divisas al contado se liquidan en última instancia a través del sistema interbancario, y los bancos de todos los centros importantes cierran el fin de semana. Sin bancos que liquiden operaciones o formen precios, no hay un mercado funcional en el que operar, aunque sea de día en algún lugar.

Así que el mercado cierra a las **5 PM hora de Nueva York del viernes**, cuando cierra el último centro importante, y reabre a las **5 PM hora de Nueva York del domingo**, cuando Sídney regresa. Es un cierre genuino, no solo un tramo tranquilo: no puedes operar durante el fin de semana. También crea el **hueco del fin de semana**, en el que los precios pueden reabrir el domingo en un nivel distinto al cierre del viernes si surgieron noticias mientras el mercado estaba cerrado. Para todo el detalle sobre la apertura semanal, consulta nuestra guía sobre [a qué hora abre el mercado forex](/es/blog/a-que-hora-abre-el-mercado-forex), y para festivos y cierres, nuestra guía sobre si el [mercado forex está abierto hoy](/es/blog/esta-abierto-el-mercado-forex-hoy).

## 24 horas abierto no significa 24 horas iguales

Funcionar sin parar no es lo mismo que estar uniformemente movido. La liquidez sube y baja de forma drástica a lo largo del día de 24 horas, y la diferencia entre las horas punta y las tranquilas es enorme.

El punto alto es el **solapamiento Londres-Nueva York** a primera hora de la tarde en GMT, cuando los dos mayores centros negocian juntos y el volumen es más profundo. El punto bajo es la tarde tardía de Nueva York tras cerrar Londres, cuando solo queda un mercado americano cada vez más delgado antes de que Sídney reinicie el ciclo. Entre esos extremos, cada sesión tiene su propio tempo, desde la tranquila apertura de Sídney hasta la cargada mañana europea. Así que, aunque técnicamente puedas operar a las 3 de la madrugada en tu hora local, las condiciones entonces pueden no parecerse en nada a las del mediodía. Qué horas te convienen depende de tus pares y tu horario, algo que desgrana nuestra guía sobre la [mejor hora para operar en forex](/es/blog/mejor-hora-para-operar-en-forex).

La forma práctica de usar un mercado de 24 horas es saber qué parte de él está en vivo cuando tú lo estás. La [herramienta de forexmarkethours.app](/es) muestra el estado actual de cada sesión en tu propia zona horaria, para que veas de un vistazo si estás ante una ventana punta o una tranquila.

## Preguntas frecuentes

**¿Por qué el mercado forex está abierto 24 horas?**
Porque no tiene una bolsa central. Las operaciones de divisas ocurren de forma extrabursátil a través de una red global de bancos, y cuando un centro financiero cierra otro abre, así que la negociación continúa sin parar entre semana sin que ningún recinto tenga que permanecer despierto.

**¿De verdad está el forex abierto 24 horas al día?**
Sí, entre semana. El mercado funciona de forma continua desde el domingo a las 5 PM hora de Nueva York hasta el viernes a las 5 PM hora de Nueva York. Cierra los fines de semana porque los bancos que liquidan las operaciones están cerrados.

**¿Por qué cierra el forex los fines de semana si nunca duerme?**
Porque el sistema bancario interbancario que liquida las operaciones de divisas cierra el fin de semana. Sin bancos que coticen y liquiden, no hay un mercado funcional, aunque sea de día en algún lugar del mundo.

**¿Son igual de buenas para operar las 24 horas?**
No. La liquidez toca su máximo durante el solapamiento Londres-Nueva York y se adelgaza en las últimas horas de Nueva York. El mercado funciona sin parar, pero las condiciones varían mucho entre las partes movidas y tranquilas del día.

**¿Qué mercados mantienen el forex abierto de noche?**
A medida que Europa y América cierran, los centros de Asia-Pacífico, Sídney y Tokio, toman el relevo, y más tarde Europa reabre antes que las Américas. El relevo de estas sesiones regionales es lo que mantiene el mercado en marcha durante la noche en cualquier ubicación.

*Este artículo es solo informativo y no constituye asesoramiento financiero.*`,
    },
  },
];

/** Rough reading time in minutes (~200 words/min). */
export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * True when this post is fully written in `locale`. Tags are not part of the
 * test: they are decorative badges, so a missing set degrades to no badges
 * rather than hiding an otherwise complete translation.
 */
export function hasTranslation(post: Post, locale: BlogLocale): boolean {
  return Boolean(
    post.slug[locale] &&
      post.title[locale] &&
      post.description[locale] &&
      post.body[locale],
  );
}

/** Flatten a post to one locale, or `null` when it is not translated there. */
function resolve(post: Post, locale: BlogLocale): ResolvedPost | null {
  const slug = post.slug[locale];
  const title = post.title[locale];
  const description = post.description[locale];
  const body = post.body[locale];
  if (!slug || !title || !description || !body) return null;

  return {
    slug,
    slugs: post.slug,
    title,
    description,
    date: post.date,
    updated: post.updated,
    authorSlug: post.authorSlug,
    tags: post.tags[locale] ?? [],
    cover: post.cover,
    body,
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

/** Published posts that are translated into `locale`, newest first. */
export function getAllPosts(locale: BlogLocale): ResolvedPost[] {
  return [...POSTS]
    .filter((p) => isPublished(p))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => resolve(p, locale))
    .filter((p): p is ResolvedPost => p !== null);
}

/** Find a post by its slug in the given locale (only if published + translated). */
export function getPost(slug: string, locale: BlogLocale): ResolvedPost | undefined {
  const post = POSTS.find((p) => p.slug[locale] === slug);
  if (!post || !isPublished(post)) return undefined;
  return resolve(post, locale) ?? undefined;
}

export function getPostsByAuthor(authorSlug: string, locale: BlogLocale): ResolvedPost[] {
  return getAllPosts(locale).filter((p) => p.authorSlug === authorSlug);
}
