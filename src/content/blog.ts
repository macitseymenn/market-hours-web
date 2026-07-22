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
      en: "best-time-to-trade-forex",
      es: "mejor-hora-para-operar-forex",
    },
    title: {
      en: "Best Time to Trade Forex (by Session)",
      es: "Mejor hora para operar en forex (por sesión)",
    },
    description: {
      en: "The best time to trade forex is the London–New York overlap, 13:00–17:00 GMT. Compare all four sessions and find the best hours for your pairs.",
      es: "La mejor hora para operar en forex es el solapamiento Londres–Nueva York, de 13:00 a 17:00 GMT. Compara las cuatro sesiones y encuentra las mejores horas para tus pares.",
    },
    date: "2026-07-15",
    authorSlug: "author",
    tags: {
      en: ["Basics", "Sessions"],
      es: ["Fundamentos", "Sesiones"],
    },
    cover: "/blog/best-time-to-trade-forex.svg",
    body: {
      en: `The best time to trade forex is during the **London–New York overlap**, roughly **13:00–17:00 GMT**, when the world's two largest financial centres are both open at once. That single window sees the deepest liquidity, the tightest spreads and the sharpest price moves of the entire 24-hour trading day — but it isn't the only window worth knowing, and it isn't automatically the best time for every trader or every pair.

## Why "best time" depends on liquidity, not just hours

Forex trades 24 hours a day, five days a week, but volume is not spread evenly across that time. It follows the sun through four regional sessions — Sydney, Tokyo, Frankfurt/London and New York — and activity concentrates wherever two of those sessions overlap. More participants trading at once generally means tighter spreads and easier order execution; fewer participants means thinner, choppier conditions. That trade-off between liquidity, spreads and volatility is what "best time to trade" really comes down to.

## Comparing the four sessions

In standard (winter) time, the four major sessions run roughly:

- **Sydney** — 22:00–07:00 GMT. Opens the trading week and sets an early tone for AUD and NZD pairs, but overall volume is the lightest of the four.
- **Tokyo** — 00:00–09:00 GMT. The main Asian session, most active for JPY crosses like USD/JPY and EUR/JPY.
- **Frankfurt/London** — 07:00–17:00 GMT. London alone is the largest forex centre in the world by trading volume — global average daily FX turnover reached $7.5 trillion in April 2022, and UK desks handled the largest share of it, according to the Bank for International Settlements' [Triennial Central Bank Survey](https://www.bis.org/statistics/rpfx22.htm) — so the London open often sets the tone for the rest of the day.
- **New York** — 13:00–22:00 GMT. The second-largest session, driving USD volatility and home to major U.S. data releases.

Each session alone offers reasonable liquidity for its regional currencies. But the real activity spikes happen at the **overlaps**, where two sessions run simultaneously.

## The best hours for major pairs

Which hours matter most depends on which pairs you follow:

- **EUR/USD, GBP/USD, EUR/GBP** — the London–New York overlap (13:00–17:00 GMT) is the standout window, since it's the only time both the eurozone/UK and U.S. sessions are live together.
- **USD/JPY, EUR/JPY, GBP/JPY** — the Tokyo–London overlap, roughly 07:00–09:00 GMT, plus the tail end of the Tokyo session, tends to matter most for yen pairs.
- **AUD/USD, NZD/USD** — the Sydney–Tokyo overlap, around 00:00–07:00 GMT, is the relevant window for Australian and New Zealand dollar pairs.
- **USD/CAD** — most active during the New York session itself, particularly around U.S. and Canadian data releases.

## Best time to trade by day of the week

Liquidity isn't just an hour-of-day question — it also shifts across the trading week:

- **Monday** is typically the quietest day. Asian markets are still catching up on news from the weekend, and European and U.S. desks often wait for the week's first data releases before committing to size.
- **Tuesday through Thursday** carry the heaviest volume overall, since every major session is running at full staffing and most scheduled economic data — central-bank decisions, employment figures, inflation prints — is released midweek.
- **Friday afternoon**, especially once the New York session passes its own midday, volume tends to thin out again as desks square positions ahead of the weekend close at 22:00 GMT.

None of this changes which hours a session is open — only how much volume typically shows up during them.

## A worked example: the London–New York overlap in practice

To see why the overlap matters, walk through a typical Tuesday in GMT:

1. **07:00–08:00 GMT** — Frankfurt opens. EUR pairs start seeing steady, moderate volume.
2. **08:00 GMT** — London opens. Liquidity across GBP and EUR pairs increases noticeably; this is often where the day's initial directional bias forms.
3. **13:00 GMT** — New York opens while London is still five hours into its session. This is the start of the overlap: EUR/USD, GBP/USD and USD/JPY volume typically climbs sharply, spreads tighten, and any scheduled 13:30 GMT (8:30 a.m. ET) U.S. data release — non-farm payrolls, CPI, retail sales — lands right at the start of this window.
4. **17:00 GMT** — London closes. New York continues alone for a few more hours, and volume gradually eases off.

The concrete takeaway: if you only have a narrow window to watch the market each day, the 13:00–17:00 GMT stretch is where the largest share of the day's volume, and the sessions' own overlap, both land at once.

## Liquidity, spreads and volatility: the trade-off

Higher liquidity generally means lower spreads, which is one reason the London–New York overlap gets so much attention. But that same period also tends to bring the sharpest volatility, especially around scheduled U.S. economic releases such as the monthly non-farm payrolls report. Tighter spreads and easier execution are a benefit; larger, faster price swings are a risk that cuts both ways. Trading outside the overlaps, during a single quieter session, usually means wider spreads and slower price action — sometimes preferable if you want calmer conditions, sometimes simply less opportunity.

## Finding the overlap in your own timezone

All of the hours above are quoted in GMT for consistency, but what actually matters is the time on your own clock — and that shifts twice a year as different countries move on and off daylight saving at different dates. Rather than converting each session by hand, the [live session clock on our homepage](/) shows exactly which sessions are open right now, in your own local timezone, with the overlaps highlighted automatically.

## Frequently asked questions

**Is the London–New York overlap always the best time to trade?**
It's the highest-liquidity window overall, but "best" depends on the pair. Yen and Pacific-dollar pairs often see more relevant activity during the Tokyo–London and Sydney–Tokyo overlaps instead.

**Does trading during the overlap guarantee better results?**
No. Higher liquidity typically means tighter spreads, but the same window often brings sharper volatility, which increases risk as well as opportunity.

**Do these hours change with daylight saving?**
Yes. Session times are anchored to each city's local trading hours, so their GMT equivalents shift when a country moves its clocks. Use a live, timezone-aware tool rather than a fixed table to stay accurate.

*This article is for general information only and is not financial advice. Forex Market Hours does not provide trading signals or recommendations; trading foreign exchange carries risk.*`,
      es: `La mejor hora para operar en forex es durante el **solapamiento Londres–Nueva York**, aproximadamente de **13:00 a 17:00 GMT**, cuando los dos mayores centros financieros del mundo están abiertos a la vez. Esa única ventana concentra la mayor liquidez, los spreads más estrechos y los movimientos de precio más bruscos de toda la jornada de 24 horas, pero no es la única ventana que conviene conocer ni es automáticamente la mejor para cada operador o cada par.

## Por qué la "mejor hora" depende de la liquidez, no solo del horario

El forex se opera las 24 horas del día, cinco días a la semana, pero el volumen no se reparte de forma uniforme a lo largo de ese tiempo. Sigue al sol a través de cuatro sesiones regionales —Sídney, Tokio, Fráncfort/Londres y Nueva York— y la actividad se concentra allí donde dos de esas sesiones se solapan. Más participantes operando a la vez suele significar spreads más estrechos y una ejecución de órdenes más fácil; menos participantes implica condiciones más finas y erráticas. Ese equilibrio entre liquidez, spreads y volatilidad es en lo que realmente consiste la "mejor hora para operar".

## Comparación de las cuatro sesiones

En horario estándar (de invierno), las cuatro grandes sesiones funcionan aproximadamente así:

- **Sídney** — 22:00–07:00 GMT. Abre la semana de negociación y marca un tono temprano para los pares del AUD y el NZD, pero su volumen es el más ligero de las cuatro.
- **Tokio** — 00:00–09:00 GMT. La principal sesión asiática, la más activa para los cruces del JPY como el USD/JPY y el EUR/JPY.
- **Fráncfort/Londres** — 07:00–17:00 GMT. Londres por sí solo es el mayor centro forex del mundo por volumen de negociación — el volumen medio diario de negociación de forex alcanzó los 7,5 billones de dólares en abril de 2022, y las mesas del Reino Unido gestionaron la mayor cuota de ese volumen, según la [Encuesta Trienal de Bancos Centrales](https://www.bis.org/statistics/rpfx22.htm) del Banco de Pagos Internacionales — por lo que la apertura de Londres suele marcar el tono del resto del día.
- **Nueva York** — 13:00–22:00 GMT. La segunda sesión más grande, que impulsa la volatilidad del USD y alberga las principales publicaciones de datos de EE. UU.

Cada sesión por separado ofrece una liquidez razonable para sus divisas regionales. Pero los verdaderos picos de actividad se producen en los **solapamientos**, donde dos sesiones funcionan simultáneamente.

## Las mejores horas para los pares principales

Qué horas importan más depende de qué pares sigas:

- **EUR/USD, GBP/USD, EUR/GBP** — el solapamiento Londres–Nueva York (13:00–17:00 GMT) es la ventana destacada, ya que es el único momento en que las sesiones de la eurozona/Reino Unido y de EE. UU. están activas a la vez.
- **USD/JPY, EUR/JPY, GBP/JPY** — el solapamiento Tokio–Londres, aproximadamente de 07:00 a 09:00 GMT, junto con el tramo final de la sesión de Tokio, suele ser lo más relevante para los pares del yen.
- **AUD/USD, NZD/USD** — el solapamiento Sídney–Tokio, en torno a las 00:00–07:00 GMT, es la ventana relevante para los pares del dólar australiano y neozelandés.
- **USD/CAD** — más activo durante la propia sesión de Nueva York, especialmente en torno a las publicaciones de datos de EE. UU. y Canadá.

## Mejor hora para operar según el día de la semana

La liquidez no depende solo de la hora del día: también varía a lo largo de la semana de negociación:

- **El lunes** suele ser el día más tranquilo. Los mercados asiáticos todavía están asimilando las noticias del fin de semana, y las mesas europeas y estadounidenses suelen esperar a las primeras publicaciones de datos de la semana antes de operar con volumen.
- **De martes a jueves** se concentra el mayor volumen general, ya que todas las sesiones principales funcionan a pleno rendimiento y la mayoría de los datos económicos programados —decisiones de bancos centrales, cifras de empleo, datos de inflación— se publican a mitad de semana.
- **El viernes por la tarde**, sobre todo una vez que la sesión de Nueva York supera su propio mediodía, el volumen tiende a reducirse de nuevo a medida que las mesas cierran posiciones antes del cierre del fin de semana a las 22:00 GMT.

Nada de esto cambia las horas en que una sesión está abierta; solo cuánto volumen suele aparecer durante ellas.

## Un ejemplo práctico: el solapamiento Londres–Nueva York en acción

Para entender por qué importa el solapamiento, sigamos un martes típico en GMT:

1. **07:00–08:00 GMT** — Abre Fráncfort. Los pares del EUR empiezan a registrar un volumen constante y moderado.
2. **08:00 GMT** — Abre Londres. La liquidez en los pares de la GBP y el EUR aumenta notablemente; a menudo aquí se forma el sesgo direccional inicial del día.
3. **13:00 GMT** — Abre Nueva York mientras Londres lleva ya cinco horas de sesión. Aquí empieza el solapamiento: el volumen de EUR/USD, GBP/USD y USD/JPY suele subir con fuerza, los spreads se estrechan, y cualquier publicación de datos de EE. UU. programada para las 13:30 GMT (8:30 a. m. hora del Este) —nóminas no agrícolas, IPC, ventas minoristas— cae justo al inicio de esta ventana.
4. **17:00 GMT** — Cierra Londres. Nueva York continúa sola unas horas más y el volumen se va reduciendo gradualmente.

La conclusión concreta: si solo dispones de una ventana estrecha para seguir el mercado cada día, el tramo de 13:00 a 17:00 GMT es donde coinciden a la vez la mayor parte del volumen del día y el propio solapamiento de las sesiones.

## Liquidez, spreads y volatilidad: el equilibrio

Una mayor liquidez suele traducirse en spreads más bajos, lo que es una de las razones por las que el solapamiento Londres–Nueva York recibe tanta atención. Pero ese mismo periodo también tiende a traer la volatilidad más brusca, sobre todo en torno a publicaciones económicas programadas de EE. UU., como el informe mensual de nóminas no agrícolas. Spreads más estrechos y una ejecución más fácil son una ventaja; las oscilaciones de precio más amplias y rápidas son un riesgo que corta en ambos sentidos. Operar fuera de los solapamientos, durante una única sesión más tranquila, suele implicar spreads más amplios y un movimiento de precios más lento: a veces preferible si buscas condiciones más calmadas, a veces simplemente menos oportunidades.

## Encontrar el solapamiento en tu propia zona horaria

Todas las horas anteriores se indican en GMT por coherencia, pero lo que de verdad importa es la hora en tu propio reloj, y esa cambia dos veces al año, a medida que los distintos países entran y salen del horario de verano en fechas diferentes. En lugar de convertir cada sesión a mano, el [reloj de sesiones en vivo de nuestra página de inicio](/es) muestra exactamente qué sesiones están abiertas ahora mismo, en tu propia zona horaria local, con los solapamientos resaltados automáticamente.

## Preguntas frecuentes

**¿El solapamiento Londres–Nueva York es siempre la mejor hora para operar?**
Es la ventana de mayor liquidez en general, pero "la mejor" depende del par. Los pares del yen y del dólar del Pacífico a menudo registran una actividad más relevante durante los solapamientos Tokio–Londres y Sídney–Tokio.

**¿Operar durante el solapamiento garantiza mejores resultados?**
No. Una mayor liquidez suele significar spreads más estrechos, pero esa misma ventana trae a menudo una volatilidad más brusca, que aumenta tanto el riesgo como la oportunidad.

**¿Estos horarios cambian con el horario de verano?**
Sí. Los horarios de las sesiones están anclados a las horas locales de negociación de cada ciudad, de modo que sus equivalentes en GMT cambian cuando un país ajusta sus relojes. Usa una herramienta en vivo que tenga en cuenta la zona horaria, en lugar de una tabla fija, para mantener la precisión.

*Este artículo es solo informativo y no constituye asesoramiento financiero. Horario del Mercado Forex no ofrece señales de trading ni recomendaciones; operar en el mercado de divisas conlleva riesgo.*`,
    },
  },
  {
    slug: {
      en: "when-does-the-forex-market-open-and-close",
      es: "cuando-abre-y-cierra-el-mercado-forex",
    },
    title: {
      en: "When does the forex market open and close?",
      es: "¿Cuándo abre y cierra el mercado forex?",
    },
    description: {
      en: "Forex opens Sunday 5pm ET and closes Friday 5pm ET. See the four sessions — Sydney, Tokyo, London, New York — and the hours that matter.",
      es: "El forex abre el domingo a las 17:00 ET y cierra el viernes a las 17:00 ET. Conoce las cuatro sesiones —Sídney, Tokio, Londres, Nueva York— y los horarios que importan.",
    },
    date: "2026-06-22",
    updated: "2026-07-10",
    authorSlug: "author",
    tags: {
      en: ["Basics", "Sessions"],
      es: ["Fundamentos", "Sesiones"],
    },
    cover: "/blog/when-does-the-forex-market-open-and-close.svg",
    body: {
      en: `The foreign-exchange market runs 24 hours a day, five days a week — but it is not equally busy at all hours. Trading follows the sun around the globe through four major regional **sessions**, and knowing when each opens is the first step to trading at the right time.

## The four sessions

Activity is concentrated in four financial centres. In standard (winter) time, their approximate hours in GMT are:

- **Sydney** — 22:00 to 07:00
- **Tokyo** — 00:00 to 09:00
- **London** — 08:00 to 17:00
- **New York** — 13:00 to 22:00

The market "opens" for the week when Sydney comes online on Sunday evening (GMT) and effectively closes when New York shuts on Friday.

## Why London dominates

London is the single largest trading centre by volume. According to the Bank for International Settlements' [Triennial Central Bank Survey](https://www.bis.org/statistics/rpfx22.htm), the United Kingdom accounts for the biggest share of global FX turnover — which is why the London open often sets the tone for the trading day.

## The hours that matter most

Liquidity — and volatility — peaks when two sessions are open at once. The **London–New York overlap** (roughly 13:00–17:00 GMT) is the busiest window of the day, because the world's two largest markets are trading simultaneously.

## A note on your timezone

Every time above is quoted in GMT for consistency, but what matters is the hour on *your* clock. Sessions also shift with daylight saving. The [live timeline on our homepage](/) converts every session to your local timezone automatically, so you never have to do the maths by hand.

*This article is for general information only and is not financial advice.*`,
      es: `El mercado de divisas funciona las 24 horas del día, cinco días a la semana, pero no tiene la misma actividad a todas horas. La negociación sigue al sol alrededor del planeta a través de cuatro grandes **sesiones** regionales, y saber cuándo abre cada una es el primer paso para operar en el momento adecuado.

## Las cuatro sesiones

La actividad se concentra en cuatro centros financieros. En horario estándar (de invierno), sus horas aproximadas en GMT son:

- **Sídney** — de 22:00 a 07:00
- **Tokio** — de 00:00 a 09:00
- **Londres** — de 08:00 a 17:00
- **Nueva York** — de 13:00 a 22:00

El mercado "abre" la semana cuando Sídney se pone en marcha el domingo por la noche (GMT) y cierra de facto cuando Nueva York termina el viernes.

## Por qué domina Londres

Londres es, por sí solo, el mayor centro de negociación por volumen. Según la [Encuesta Trienal de Bancos Centrales](https://www.bis.org/statistics/rpfx22.htm) del Banco de Pagos Internacionales, el Reino Unido concentra la mayor parte del volumen mundial de divisas, y por eso la apertura de Londres suele marcar el tono de la jornada.

## Los horarios que más importan

La liquidez —y la volatilidad— alcanza su punto máximo cuando dos sesiones están abiertas a la vez. El **solapamiento Londres–Nueva York** (aproximadamente de 13:00 a 17:00 GMT) es la ventana de mayor actividad del día, porque los dos mayores mercados del mundo operan simultáneamente.

## Una nota sobre tu zona horaria

Todas las horas anteriores se indican en GMT por coherencia, pero lo que importa es la hora en *tu* reloj. Las sesiones también cambian con el horario de verano. La [línea de tiempo en vivo de nuestra página de inicio](/es) convierte cada sesión a tu zona horaria local de forma automática, para que nunca tengas que hacer los cálculos a mano.

*Este artículo es solo informativo y no constituye asesoramiento financiero.*`,
    },
  },
  {
    slug: {
      en: "london-new-york-overlap",
      es: "solapamiento-londres-nueva-york",
    },
    title: {
      en: "The London–New York overlap: the busiest hours in forex",
      es: "El solapamiento Londres–Nueva York: las horas de mayor actividad en forex",
    },
    description: {
      en: "The London–New York overlap (13:00–17:00 GMT) is forex's deepest-liquidity window. Why it matters and how to trade the busiest hours.",
      es: "El solapamiento Londres–Nueva York (13:00–17:00 GMT) es la ventana de mayor liquidez del forex. Por qué importa y cómo operar en las horas de más actividad.",
    },
    date: "2026-07-01",
    authorSlug: "author",
    tags: {
      en: ["Sessions", "Strategy"],
      es: ["Sesiones", "Estrategia"],
    },
    cover: "/blog/london-new-york-overlap.svg",
    body: {
      en: `If there is one window most active traders watch, it is the **London–New York overlap** — the part of the afternoon (GMT) when the world's two largest financial centres are open at the same time.

## When it happens

In standard time the overlap runs from about **13:00 to 17:00 GMT**, when New York's morning meets London's afternoon. Because both centres handle enormous volume, the combined liquidity is greater than at any other point in the 24-hour cycle.

## Why it matters

Two things tend to rise during the overlap:

1. **Liquidity** — more participants means tighter spreads and easier order execution.
2. **Volatility** — major economic releases from the United States (such as the monthly non-farm payrolls report) often land at the start of this window, moving prices quickly.

For a primer on how session overlaps concentrate activity, [Investopedia's overview of forex trading sessions](https://www.investopedia.com/articles/forex/08/3-market-sessions.asp) is a useful reference.

## Pairs to watch

The overlap is especially relevant for pairs that involve the US dollar, the euro and the pound — **EUR/USD**, **GBP/USD** and **EUR/GBP** among them — since the underlying economies are the ones actively trading.

## Using it well

The overlap is an opportunity, not a guarantee. Higher volatility cuts both ways. Many traders use our [live market-hours tool](/) to see exactly when the overlap begins in their own timezone, and set an alert a few minutes before.

*This article is for general information only and is not financial advice. Trading foreign exchange carries risk.*`,
      es: `Si hay una ventana que la mayoría de los operadores activos vigilan, es el **solapamiento Londres–Nueva York**: la parte de la tarde (GMT) en la que los dos mayores centros financieros del mundo están abiertos al mismo tiempo.

## Cuándo ocurre

En horario estándar, el solapamiento va aproximadamente de **13:00 a 17:00 GMT**, cuando la mañana de Nueva York se encuentra con la tarde de Londres. Como ambos centros manejan un volumen enorme, la liquidez combinada es mayor que en cualquier otro momento del ciclo de 24 horas.

## Por qué importa

Dos cosas tienden a aumentar durante el solapamiento:

1. **Liquidez** — más participantes significan spreads más estrechos y una ejecución de órdenes más fácil.
2. **Volatilidad** — las principales publicaciones económicas de Estados Unidos (como el informe mensual de nóminas no agrícolas) suelen producirse al inicio de esta ventana, moviendo los precios con rapidez.

Para una introducción a cómo los solapamientos de sesiones concentran la actividad, el [resumen de Investopedia sobre las sesiones de trading forex](https://www.investopedia.com/articles/forex/08/3-market-sessions.asp) es una referencia útil.

## Pares a vigilar

El solapamiento es especialmente relevante para los pares que involucran al dólar estadounidense, el euro y la libra —entre ellos el **EUR/USD**, el **GBP/USD** y el **EUR/GBP**—, ya que las economías subyacentes son las que están operando activamente.

## Aprovecharlo bien

El solapamiento es una oportunidad, no una garantía. Una mayor volatilidad corta en ambos sentidos. Muchos operadores usan nuestra [herramienta de horarios de mercado en vivo](/es) para ver exactamente cuándo empieza el solapamiento en su propia zona horaria y programar una alerta unos minutos antes.

*Este artículo es solo informativo y no constituye asesoramiento financiero. Operar en el mercado de divisas conlleva riesgo.*`,
    },
  },
  {
    slug: {
      en: "daylight-saving-forex-hours",
      es: "horario-de-verano-sesiones-forex",
    },
    title: {
      en: "How daylight saving time shifts forex session hours",
      es: "Cómo el horario de verano modifica las horas de las sesiones forex",
    },
    description: {
      en: "London, New York and Sydney all change their clocks — on different dates. Here's why your session times move twice a year, and how to stay accurate.",
      es: "Londres, Nueva York y Sídney cambian sus relojes, en fechas distintas. Esto explica por qué tus horarios de sesión se mueven dos veces al año y cómo mantener la precisión.",
    },
    date: "2026-07-09",
    authorSlug: "author",
    tags: {
      en: ["Basics", "Timezones"],
      es: ["Fundamentos", "Zonas horarias"],
    },
    cover: "/blog/daylight-saving-forex-hours.svg",
    body: {
      en: `A common source of confusion for new traders is that session times seem to "move" a few times each year. The cause is **daylight saving time (DST)** — and because different regions change their clocks on different dates, the effect can be surprisingly messy.

## Why the hours change

Session hours are anchored to *local* time in each financial centre. London trades roughly 08:00–17:00 **local** time all year. But relative to GMT, that window shifts by an hour when the UK moves from GMT to British Summer Time. The [UK government's guidance on clock changes](https://www.gov.uk/when-do-the-clocks-change) sets the exact dates.

## The tricky part: everyone changes on different dates

- The UK and the EU spring forward on the **last Sunday of March**.
- The US springs forward earlier, on the **second Sunday of March**.
- Australia, in the southern hemisphere, does the opposite — its clocks go *back* around early April.

For a couple of weeks each spring and autumn, the usual gap between, say, London and New York is off by an hour compared with the rest of the year. That is enough to make a manually-built session chart wrong.

## How to stay accurate

The reliable approach is to compute every session from its own timezone's rules rather than from a fixed GMT table. That is exactly what our [live timeline](/) does: it reads each city's current DST state and shows the correct, up-to-the-minute hours in your own timezone — so you never trade off a stale chart.

*This article is for general information only and is not financial advice.*`,
      es: `Una fuente habitual de confusión para los operadores nuevos es que los horarios de las sesiones parecen "moverse" unas cuantas veces al año. La causa es el **horario de verano (DST)** y, como las distintas regiones cambian sus relojes en fechas diferentes, el efecto puede ser sorprendentemente enrevesado.

## Por qué cambian las horas

Las horas de las sesiones están ancladas a la hora *local* de cada centro financiero. Londres opera aproximadamente de 08:00 a 17:00 hora **local** durante todo el año. Pero, respecto al GMT, esa ventana se desplaza una hora cuando el Reino Unido pasa del GMT al horario de verano británico (BST). La [guía del Gobierno del Reino Unido sobre los cambios de hora](https://www.gov.uk/when-do-the-clocks-change) fija las fechas exactas.

## La parte complicada: cada uno cambia en fechas distintas

- El Reino Unido y la UE adelantan sus relojes el **último domingo de marzo**.
- Estados Unidos lo hace antes, el **segundo domingo de marzo**.
- Australia, en el hemisferio sur, hace lo contrario: sus relojes se *atrasan* hacia principios de abril.

Durante un par de semanas cada primavera y cada otoño, la diferencia habitual entre, por ejemplo, Londres y Nueva York se descuadra en una hora respecto al resto del año. Eso basta para que una tabla de sesiones hecha a mano quede equivocada.

## Cómo mantener la precisión

El enfoque fiable es calcular cada sesión a partir de las reglas de su propia zona horaria, en lugar de una tabla fija en GMT. Eso es exactamente lo que hace nuestra [línea de tiempo en vivo](/es): lee el estado actual del horario de verano de cada ciudad y muestra las horas correctas y al minuto en tu propia zona horaria, para que nunca operes con una tabla desactualizada.

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

export function getAllPosts(locale: BlogLocale): ResolvedPost[] {
  return [...POSTS]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((p) => resolve(p, locale));
}

/** Find a post by its slug in the given locale. */
export function getPost(slug: string, locale: BlogLocale): ResolvedPost | undefined {
  const post = POSTS.find((p) => p.slug[locale] === slug);
  return post ? resolve(post, locale) : undefined;
}

export function getPostsByAuthor(authorSlug: string, locale: BlogLocale): ResolvedPost[] {
  return getAllPosts(locale).filter((p) => p.authorSlug === authorSlug);
}
