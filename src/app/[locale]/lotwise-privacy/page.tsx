import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PUBLISHER, SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { sharedAlternates } from "@/i18n/alternates";
import { analyticsEnabled, hasCookieAnalytics } from "@/lib/analytics";

// ISR: re-render daily. The page's own copy is static, but the shared chrome
// (header language switcher, footer) lists the locales that are currently live,
// so a scheduled locale reaching its date must be able to appear here without a
// deploy. See @/i18n/locales.
export const revalidate = 86400;

const LAST_UPDATED = "2026-08-03";

/** Full store name, plus the short name used throughout the prose. */
const LOTWISE = {
  name: "FX Lot Size Calculator:Lotwise",
  shortName: "Lotwise",
} as const;

// Honest, env-driven data-handling section for THIS web page (the app itself
// collects nothing either way). With no analytics configured the site is
// genuinely tracking-free; when analytics is enabled the wording below switches
// to describe exactly what runs and how consent works.
const DATA_SECTION: Record<Locale, ReactNode> = {
  en: analyticsEnabled ? (
    <>
      <h2>Analytics on this website</h2>
      <p>
        This policy page is hosted on our website, which uses privacy-respecting
        analytics to understand aggregate usage, which pages are popular and
        roughly where visitors come from. The {LOTWISE.shortName} app itself
        contains no analytics SDK. We never run advertising trackers and never
        sell or share your data.
      </p>
      {hasCookieAnalytics ? (
        <p>
          The analytics we use on the website may set cookies. They load{" "}
          <strong>only after you accept</strong> the consent banner; if you
          decline, no analytics cookies are set. Google Analytics, where used, is
          configured to anonymise IP addresses. You can change your choice any time
          by clearing this site&apos;s data in your browser.
        </p>
      ) : (
        <p>
          Our website analytics is cookieless and does not use any persistent
          identifier or track you across sites, so no consent banner is required.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>We collect no personal data</h2>
      <p>
        {LOTWISE.shortName} runs no analytics, no advertising trackers, and no
        third-party SDKs. We do not collect names, email addresses, IP addresses,
        device identifiers, or any account, broker or trading data. There is no
        sign-up and no user account, so we have nothing of yours to sell or share.
      </p>
    </>
  ),
  es: analyticsEnabled ? (
    <>
      <h2>Analítica en este sitio web</h2>
      <p>
        Esta página de política está alojada en nuestro sitio web, que usa
        analítica respetuosa con la privacidad para entender el uso agregado, qué
        páginas son populares y, de forma aproximada, de dónde vienen los
        visitantes. La app {LOTWISE.shortName} no incluye ningún SDK de analítica.
        Nunca usamos rastreadores publicitarios ni vendemos o compartimos tus
        datos.
      </p>
      {hasCookieAnalytics ? (
        <p>
          La analítica que usamos en el sitio web puede instalar cookies. Se
          cargan <strong>solo después de que aceptes</strong> el aviso de
          consentimiento; si lo rechazas, no se instala ninguna cookie de
          analítica. Google Analytics, cuando se usa, está configurado para
          anonimizar las direcciones IP. Puedes cambiar tu elección en cualquier
          momento borrando los datos de este sitio en tu navegador.
        </p>
      ) : (
        <p>
          La analítica de nuestro sitio web no usa cookies ni ningún
          identificador persistente, ni te rastrea entre sitios, por lo que no se
          requiere aviso de consentimiento.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>No recopilamos datos personales</h2>
      <p>
        {LOTWISE.shortName} no usa analíticas, ni rastreadores publicitarios, ni
        SDK de terceros. No recopilamos nombres, direcciones de correo
        electrónico, direcciones IP, identificadores de dispositivo ni ningún dato
        de cuenta, bróker o trading. No hay registro ni cuenta de usuario, así que
        no tenemos nada tuyo que vender ni compartir.
      </p>
    </>
  ),
  fr: analyticsEnabled ? (
    <>
      <h2>Analyse d’audience sur ce site web</h2>
      <p>
        Cette page de politique est hébergée sur notre site web, qui utilise une
        analyse d’audience respectueuse de la vie privée pour comprendre l’usage
        agrégé, quelles pages sont populaires et, de façon approximative, d’où
        viennent les visiteurs. L’application {LOTWISE.shortName} elle-même ne
        contient aucun SDK d’analyse. Nous n’utilisons jamais de traqueurs
        publicitaires et ne vendons ni ne partageons jamais vos données.
      </p>
      {hasCookieAnalytics ? (
        <p>
          L’analyse d’audience que nous utilisons sur le site web peut déposer des
          cookies. Ils ne se chargent{" "}
          <strong>qu’après votre acceptation</strong> de la bannière de
          consentement ; si vous refusez, aucun cookie d’analyse n’est déposé.
          Google Analytics, lorsqu’il est utilisé, est configuré pour anonymiser les
          adresses IP. Vous pouvez modifier votre choix à tout moment en effaçant les
          données de ce site dans votre navigateur.
        </p>
      ) : (
        <p>
          L’analyse d’audience de notre site web n’utilise ni cookie ni identifiant
          persistant et ne vous suit pas d’un site à l’autre : aucune bannière de
          consentement n’est donc nécessaire.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>Nous ne collectons aucune donnée personnelle</h2>
      <p>
        {LOTWISE.shortName} n’utilise aucune analyse d’audience, aucun traqueur
        publicitaire et aucun SDK tiers. Nous ne collectons ni noms, ni adresses
        e-mail, ni adresses IP, ni identifiants d’appareil, ni aucune donnée de
        compte, de courtier ou de trading. Il n’y a ni inscription ni compte
        utilisateur : nous n’avons donc rien de vous à vendre ou à partager.
      </p>
    </>
  ),
  pt: analyticsEnabled ? (
    <>
      <h2>Análises de uso neste site</h2>
      <p>
        Esta página de política está hospedada no nosso site, que usa análises que
        respeitam a privacidade para entender o uso de forma agregada, quais
        páginas são mais populares e, de modo aproximado, de onde vêm os
        visitantes. O app {LOTWISE.shortName} em si não contém nenhum SDK de
        análise. Nunca usamos rastreadores de publicidade e nunca vendemos nem
        compartilhamos seus dados.
      </p>
      {hasCookieAnalytics ? (
        <p>
          As análises que usamos no site podem definir cookies. Elas são
          carregadas{" "}
          <strong>somente depois que você aceita</strong> o banner de
          consentimento; se você recusar, nenhum cookie de análise é definido. O
          Google Analytics, quando usado, é configurado para anonimizar endereços
          IP. Você pode mudar sua escolha a qualquer momento limpando os dados
          deste site no seu navegador.
        </p>
      ) : (
        <p>
          As análises do nosso site não usam cookies nem qualquer identificador
          persistente e não rastreiam você entre sites, então nenhum banner de
          consentimento é necessário.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>Não coletamos nenhum dado pessoal</h2>
      <p>
        O {LOTWISE.shortName} não usa ferramentas de análise, rastreadores de
        publicidade nem SDKs de terceiros. Não coletamos nomes, endereços de
        e-mail, endereços IP, identificadores de dispositivo nem qualquer dado de
        conta, de corretora ou de trading. Não há cadastro nem conta de usuário,
        então não temos nada seu para vender ou compartilhar.
      </p>
    </>
  ),
  it: analyticsEnabled ? (
    <>
      <h2>Statistiche di utilizzo su questo sito web</h2>
      <p>
        Questa informativa è ospitata sul nostro sito web, che usa strumenti di
        analisi rispettosi della privacy per capire l’utilizzo in forma aggregata,
        quali pagine sono più visitate e, in modo approssimativo, da dove arrivano i
        visitatori. L’app {LOTWISE.shortName} non contiene alcun SDK di analisi.
        Non usiamo mai tracker pubblicitari e non vendiamo né condividiamo mai i
        tuoi dati.
      </p>
      {hasCookieAnalytics ? (
        <p>
          Gli strumenti di analisi che usiamo sul sito web possono impostare dei
          cookie. Vengono caricati{" "}
          <strong>solo dopo che hai accettato</strong> il banner di consenso; se
          rifiuti, non viene impostato alcun cookie di analisi. Google Analytics,
          dove utilizzato, è configurato per anonimizzare gli indirizzi IP. Puoi
          modificare la tua scelta in qualsiasi momento cancellando i dati di
          questo sito nel tuo browser.
        </p>
      ) : (
        <p>
          Gli strumenti di analisi del nostro sito web non usano cookie né
          identificatori persistenti e non ti tracciano da un sito all’altro,
          quindi non è necessario alcun banner di consenso.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>Non raccogliamo dati personali</h2>
      <p>
        {LOTWISE.shortName} non usa strumenti di analisi, tracker pubblicitari né
        SDK di terze parti. Non raccogliamo nomi, indirizzi email, indirizzi IP,
        identificatori del dispositivo né alcun dato relativo ad account, broker o
        trading. Non c’è alcuna registrazione né account utente, quindi non
        abbiamo nulla di tuo da vendere o condividere.
      </p>
    </>
  ),
  de: analyticsEnabled ? (
    <>
      <h2>Analyse auf dieser Website</h2>
      <p>
        Diese Datenschutzseite wird auf unserer Website gehostet, die eine
        datenschutzfreundliche Analyse nutzt, um die Nutzung in zusammengefasster
        Form zu verstehen, also welche Seiten beliebt sind und ungefähr, woher
        die Besucher kommen. Die App {LOTWISE.shortName} selbst enthält kein
        Analyse-SDK. Wir setzen niemals Werbetracker ein und verkaufen oder
        teilen Ihre Daten niemals.
      </p>
      {hasCookieAnalytics ? (
        <p>
          Die Analyse, die wir auf der Website nutzen, kann Cookies setzen. Sie
          wird{" "}
          <strong>erst geladen, nachdem Sie</strong> im Einwilligungsbanner
          zugestimmt haben; wenn Sie ablehnen, werden keine Analyse-Cookies
          gesetzt. Google Analytics ist, sofern verwendet, so konfiguriert, dass
          IP-Adressen anonymisiert werden. Sie können Ihre Entscheidung jederzeit
          ändern, indem Sie die Daten dieser Website in Ihrem Browser löschen.
        </p>
      ) : (
        <p>
          Die Analyse unserer Website kommt ohne Cookies aus, verwendet keine
          dauerhafte Kennung und verfolgt Sie nicht über verschiedene Websites
          hinweg. Ein Einwilligungsbanner ist daher nicht erforderlich.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>Wir erfassen keine personenbezogenen Daten</h2>
      <p>
        {LOTWISE.shortName} verwendet keine Analyse, keine Werbetracker und keine
        SDKs von Drittanbietern. Wir erfassen weder Namen noch E-Mail-Adressen,
        IP-Adressen, Gerätekennungen oder Konto-, Broker- oder Handelsdaten. Es
        gibt keine Registrierung und kein Benutzerkonto, wir haben also nichts
        von Ihnen, das wir verkaufen oder weitergeben könnten.
      </p>
    </>
  ),
  tr: analyticsEnabled ? (
    <>
      <h2>Bu web sitesindeki analiz</h2>
      <p>
        Bu politika sayfası, genel kullanımı, yani hangi sayfaların popüler
        olduğunu ve ziyaretçilerin kabaca nereden geldiğini toplu olarak anlamak
        için gizliliğe saygılı analiz araçları kullanan web sitemizde
        barındırılmaktadır. {LOTWISE.shortName} uygulamasının kendisi hiçbir analiz
        SDK’sı içermez. Hiçbir zaman reklam izleyicisi çalıştırmayız ve
        verilerinizi asla satmayız veya paylaşmayız.
      </p>
      {hasCookieAnalytics ? (
        <p>
          Web sitesinde kullandığımız analiz araçları çerez yerleştirebilir. Bu
          araçlar yalnızca onay bannerını{" "}
          <strong>kabul etmenizin ardından</strong> yüklenir; reddederseniz hiçbir
          analiz çerezi yerleştirilmez. Google Analytics, kullanıldığı durumlarda IP
          adreslerini anonimleştirecek şekilde yapılandırılmıştır. Tercihinizi,
          tarayıcınızda bu sitenin verilerini temizleyerek dilediğiniz zaman
          değiştirebilirsiniz.
        </p>
      ) : (
        <p>
          Web sitemizdeki analiz aracı çerez kullanmaz, kalıcı bir tanımlayıcı
          kullanmaz ve sizi siteler arasında izlemez; bu nedenle bir onay bannerı
          gerekmez.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>Hiçbir kişisel veri toplamıyoruz</h2>
      <p>
        {LOTWISE.shortName} hiçbir analiz aracı, reklam izleyicisi veya üçüncü taraf
        SDK’sı çalıştırmaz. Ad, e-posta adresi, IP adresi, cihaz tanımlayıcısı ya da
        herhangi bir hesap, aracı kurum veya işlem verisi toplamayız. Kayıt ve
        kullanıcı hesabı yoktur; dolayısıyla satacak veya paylaşacak hiçbir
        verinize sahip değiliz.
      </p>
    </>
  ),
};

const COPY = {
  en: {
    metaTitle: `${LOTWISE.name} — Privacy Policy`,
    metaDescription: analyticsEnabled
      ? `How ${LOTWISE.name} handles data: every calculation runs on your device, the app uses no analytics SDK, shows no ads and never sells your data.`
      : `How ${LOTWISE.name} handles data. Every calculation runs on your device; we collect no personal or trading data.`,
    breadcrumb: "Lotwise Privacy Policy",
    h1: "Privacy Policy",
    lead: analyticsEnabled ? (
      <>
        Short version: {LOTWISE.name} runs entirely on your device, shows no ads,
        and never sells your data.
      </>
    ) : (
      <>
        Short version: {LOTWISE.name} runs entirely on your device, collects no
        personal data, and does not track you.
      </>
    ),
    lastUpdated: (date: string) => <>Last updated: {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>The app runs on your device</h2>
        <p>
          {LOTWISE.name} is an offline-first calculator: position size, lot size,
          pip value, risk and margin are all computed locally on your own phone or
          tablet. We do not operate any backend that receives your account
          balance, risk percentage, stop loss, currency pair or any other input
          you type into the app.
        </p>

        {dataSection}

        <h2>Data stored on your device only</h2>
        <p>
          The only data {LOTWISE.shortName} stores is kept in the app&apos;s own
          storage on your device and is never sent to us:
        </p>
        <ul>
          <li>your account currency, balance and default risk settings;</li>
          <li>your preferred instruments, units and appearance settings; and</li>
          <li>
            any saved calculations or history you choose to keep, so they persist
            between sessions.
          </li>
        </ul>
        <p>
          Deleting the app removes this information completely. It never leaves
          your device.
        </p>

        <h2>Notifications and permissions</h2>
        <p>
          {LOTWISE.shortName} asks for no location, contacts, photos, microphone
          or camera access. If a future version offers optional notifications,
          they use your device&apos;s native permission, only activate if you
          explicitly opt in, and are generated locally, no notification data is
          transmitted anywhere.
        </p>

        <h2>Purchases</h2>
        <p>
          If the app offers a paid version or in-app purchase, the transaction is
          handled entirely by Apple or Google. We never see or store your payment
          details; we only receive the anonymous receipt status the platform
          provides so the app can unlock what you bought.
        </p>

        <h2>Children</h2>
        <p>
          {LOTWISE.shortName} is a general-audience utility, not directed at
          children, and because it collects no data it knowingly collects nothing
          from anyone under 13.
        </p>

        <h2>Third-party links</h2>
        <p>
          This site links to the Apple App Store and Google Play to download the
          app, and to external sources we cite. Those third-party sites have their
          own privacy policies, which we encourage you to review; we are not
          responsible for their content or practices.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If this policy changes, we will update this page and the &quot;last
          updated&quot; date above.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.{" "}
          {LOTWISE.name} is published by {PUBLISHER.displayName}.
        </p>
      </>
    ),
  },
  es: {
    metaTitle: `${LOTWISE.name} — Política de privacidad`,
    metaDescription: analyticsEnabled
      ? `Cómo gestiona los datos ${LOTWISE.name}: todos los cálculos se hacen en tu dispositivo, la app no usa SDK de analítica, sin anuncios y sin vender tus datos.`
      : `Cómo gestiona los datos ${LOTWISE.name}. Todos los cálculos se hacen en tu dispositivo; no recopilamos datos personales ni de trading.`,
    breadcrumb: "Política de privacidad de Lotwise",
    h1: "Política de privacidad",
    lead: analyticsEnabled ? (
      <>
        Versión breve: {LOTWISE.name} funciona por completo en tu dispositivo, no
        muestra anuncios y nunca vende tus datos.
      </>
    ) : (
      <>
        Versión breve: {LOTWISE.name} funciona por completo en tu dispositivo, no
        recopila datos personales y no te rastrea.
      </>
    ),
    lastUpdated: (date: string) => <>Última actualización: {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>La app funciona en tu dispositivo</h2>
        <p>
          {LOTWISE.name} es una calculadora que funciona sin conexión: el tamaño
          de posición, el tamaño del lote, el valor del pip, el riesgo y el margen
          se calculan localmente en tu propio teléfono o tablet. No operamos
          ningún servidor que reciba el saldo de tu cuenta, tu porcentaje de
          riesgo, tu stop loss, el par de divisas ni ningún otro dato que escribas
          en la app.
        </p>

        {dataSection}

        <h2>Datos guardados solo en tu dispositivo</h2>
        <p>
          Los únicos datos que guarda {LOTWISE.shortName} se almacenan en el
          propio almacenamiento de la app en tu dispositivo y nunca se nos envían:
        </p>
        <ul>
          <li>
            la divisa de tu cuenta, el saldo y tus ajustes de riesgo por defecto;
          </li>
          <li>
            tus instrumentos preferidos, las unidades y los ajustes de apariencia;
            y
          </li>
          <li>
            los cálculos o el historial que decidas guardar, para que se mantengan
            entre sesiones.
          </li>
        </ul>
        <p>
          Desinstalar la app elimina esta información por completo. Nunca sale de
          tu dispositivo.
        </p>

        <h2>Notificaciones y permisos</h2>
        <p>
          {LOTWISE.shortName} no solicita acceso a tu ubicación, contactos, fotos,
          micrófono ni cámara. Si una versión futura ofrece notificaciones
          opcionales, usarán el permiso nativo de tu dispositivo, solo se activarán
          si das tu consentimiento expreso y se generan de forma local: no se
          transmite ningún dato de notificación a ninguna parte.
        </p>

        <h2>Compras</h2>
        <p>
          Si la app ofrece una versión de pago o compras dentro de la aplicación,
          la transacción la gestionan íntegramente Apple o Google. Nunca vemos ni
          almacenamos tus datos de pago; solo recibimos el estado anónimo del
          recibo que proporciona la plataforma para que la app desbloquee lo que
          has comprado.
        </p>

        <h2>Menores</h2>
        <p>
          {LOTWISE.shortName} es una utilidad para público general, no está
          dirigida a menores y, al no recopilar datos, no recopila conscientemente
          nada de personas menores de 13 años.
        </p>

        <h2>Enlaces de terceros</h2>
        <p>
          Este sitio enlaza a la App Store de Apple y a Google Play para descargar
          la app, y a las fuentes externas que citamos. Esos sitios de terceros
          tienen sus propias políticas de privacidad, que te animamos a revisar; no
          somos responsables de su contenido ni de sus prácticas.
        </p>

        <h2>Cambios en esta política</h2>
        <p>
          Si esta política cambia, actualizaremos esta página y la fecha de «última
          actualización» de arriba.
        </p>

        <h2>Contacto</h2>
        <p>
          Las preguntas sobre esta política pueden enviarse a{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.{" "}
          {LOTWISE.name} está publicado por {PUBLISHER.displayName}.
        </p>
      </>
    ),
  },
  fr: {
    metaTitle: `${LOTWISE.name} : politique de confidentialité`,
    metaDescription: analyticsEnabled
      ? `Comment ${LOTWISE.name} traite les données : chaque calcul s’exécute sur votre appareil, l’application n’utilise aucun SDK d’analyse, n’affiche aucune publicité et ne vend jamais vos données.`
      : `Comment ${LOTWISE.name} traite les données. Chaque calcul s’exécute sur votre appareil ; nous ne collectons aucune donnée personnelle ni de trading.`,
    breadcrumb: "Politique de confidentialité de Lotwise",
    h1: "Politique de confidentialité",
    lead: analyticsEnabled ? (
      <>
        En bref : {LOTWISE.name} fonctionne entièrement sur votre appareil,
        n’affiche aucune publicité et ne vend jamais vos données.
      </>
    ) : (
      <>
        En bref : {LOTWISE.name} fonctionne entièrement sur votre appareil, ne
        collecte aucune donnée personnelle et ne vous suit pas.
      </>
    ),
    lastUpdated: (date: string) => <>Dernière mise à jour : {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>L’application fonctionne sur votre appareil</h2>
        <p>
          {LOTWISE.name} est une calculatrice qui fonctionne hors ligne : la taille
          de position, la taille de lot, la valeur du pip, le risque et la marge sont
          tous calculés localement sur votre propre téléphone ou tablette. Nous
          n’exploitons aucun serveur qui recevrait le solde de votre compte, votre
          pourcentage de risque, votre stop loss, votre paire de devises ou toute
          autre donnée que vous saisissez dans l’application.
        </p>

        {dataSection}

        <h2>Données conservées uniquement sur votre appareil</h2>
        <p>
          Les seules données que {LOTWISE.shortName} conserve sont stockées dans
          l’espace de stockage propre à l’application sur votre appareil et ne nous
          sont jamais envoyées :
        </p>
        <ul>
          <li>la devise de votre compte, votre solde et vos réglages de risque par défaut ;</li>
          <li>vos instruments préférés, vos unités et vos réglages d’apparence ; et</li>
          <li>
            les calculs ou l’historique que vous choisissez de conserver, afin qu’ils
            persistent d’une session à l’autre.
          </li>
        </ul>
        <p>
          Désinstaller l’application supprime complètement ces informations. Elles ne
          quittent jamais votre appareil.
        </p>

        <h2>Notifications et autorisations</h2>
        <p>
          {LOTWISE.shortName} ne demande aucun accès à votre localisation, à vos
          contacts, à vos photos, à votre microphone ni à votre caméra. Si une
          future version propose des notifications facultatives, elles utiliseront
          l’autorisation native de votre appareil, ne s’activeront que si vous y
          consentez explicitement et seront générées localement : aucune donnée de
          notification n’est transmise où que ce soit.
        </p>

        <h2>Achats</h2>
        <p>
          Si l’application propose une version payante ou des achats intégrés, la
          transaction est entièrement gérée par Apple ou Google. Nous ne voyons ni ne
          stockons jamais vos informations de paiement ; nous recevons uniquement
          l’état anonyme du reçu fourni par la plateforme afin que l’application
          débloque ce que vous avez acheté.
        </p>

        <h2>Mineurs</h2>
        <p>
          {LOTWISE.shortName} est un utilitaire tout public, non destiné aux enfants,
          et comme il ne collecte aucune donnée, il ne collecte sciemment rien auprès
          de personnes de moins de 13 ans.
        </p>

        <h2>Liens de tiers</h2>
        <p>
          Ce site renvoie vers l’App Store d’Apple et Google Play pour télécharger
          l’application, ainsi que vers les sources externes que nous citons. Ces
          sites tiers ont leurs propres politiques de confidentialité, que nous vous
          encourageons à consulter ; nous ne sommes pas responsables de leur contenu
          ni de leurs pratiques.
        </p>

        <h2>Modification de cette politique</h2>
        <p>
          Si cette politique change, nous mettrons à jour cette page ainsi que la
          date de « dernière mise à jour » ci-dessus.
        </p>

        <h2>Contact</h2>
        <p>
          Les questions relatives à cette politique peuvent être envoyées à{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.{" "}
          {LOTWISE.name} est publié par {PUBLISHER.displayName}.
        </p>
      </>
    ),
  },
  pt: {
    metaTitle: `${LOTWISE.name}: Política de Privacidade`,
    metaDescription: analyticsEnabled
      ? `Como o ${LOTWISE.name} trata os dados: todos os cálculos rodam no seu dispositivo, o app não usa nenhum SDK de análise, não exibe anúncios e nunca vende seus dados.`
      : `Como o ${LOTWISE.name} trata os dados. Todos os cálculos rodam no seu dispositivo; não coletamos nenhum dado pessoal ou de trading.`,
    breadcrumb: "Política de Privacidade do Lotwise",
    h1: "Política de Privacidade",
    lead: analyticsEnabled ? (
      <>
        Em resumo: o {LOTWISE.name} roda inteiramente no seu dispositivo, não
        exibe anúncios e nunca vende seus dados.
      </>
    ) : (
      <>
        Em resumo: o {LOTWISE.name} roda inteiramente no seu dispositivo, não
        coleta nenhum dado pessoal e não rastreia você.
      </>
    ),
    lastUpdated: (date: string) => <>Última atualização: {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>O app roda no seu dispositivo</h2>
        <p>
          O {LOTWISE.name} é uma calculadora que funciona prioritariamente offline:
          tamanho de posição, tamanho de lote, valor do pip, risco e margem são
          todos calculados localmente no seu próprio celular ou tablet. Não
          operamos nenhum servidor que receba o saldo da sua conta, o seu
          percentual de risco, o seu stop loss, o seu par de moedas ou qualquer
          outra informação que você digite no app.
        </p>

        {dataSection}

        <h2>Dados armazenados apenas no seu dispositivo</h2>
        <p>
          Os únicos dados que o {LOTWISE.shortName} armazena ficam no espaço de
          armazenamento do próprio app no seu dispositivo e nunca são enviados para
          nós:
        </p>
        <ul>
          <li>a moeda da sua conta, o saldo e as configurações de risco padrão;</li>
          <li>seus instrumentos preferidos, unidades e configurações de aparência; e</li>
          <li>
            os cálculos salvos ou o histórico que você decidir manter, para que
            continuem disponíveis entre uma sessão e outra.
          </li>
        </ul>
        <p>
          Excluir o app apaga essas informações por completo. Elas nunca saem do
          seu dispositivo.
        </p>

        <h2>Notificações e permissões</h2>
        <p>
          O {LOTWISE.shortName} não pede acesso a localização, contatos, fotos,
          microfone ou câmera. Se uma versão futura oferecer notificações
          opcionais, elas usarão a permissão nativa do seu dispositivo, só serão
          ativadas se você optar por elas explicitamente e serão geradas
          localmente; nenhum dado de notificação é transmitido para lugar nenhum.
        </p>

        <h2>Compras</h2>
        <p>
          Se o app oferecer uma versão paga ou compras dentro do app, a transação é
          processada inteiramente pela Apple ou pelo Google. Nunca vemos nem
          armazenamos seus dados de pagamento; recebemos apenas o status anônimo do
          recibo fornecido pela plataforma, para que o app possa liberar o que você
          comprou.
        </p>

        <h2>Crianças</h2>
        <p>
          O {LOTWISE.shortName} é um utilitário para o público em geral, não
          direcionado a crianças, e como não coleta nenhum dado, não coleta
          intencionalmente nada de menores de 13 anos.
        </p>

        <h2>Links de terceiros</h2>
        <p>
          Este site contém links para a App Store da Apple e para o Google Play,
          para baixar o app, e para fontes externas que citamos. Esses sites de
          terceiros têm suas próprias políticas de privacidade, que recomendamos
          que você leia; não somos responsáveis pelo conteúdo nem pelas práticas
          deles.
        </p>

        <h2>Alterações nesta política</h2>
        <p>
          Se esta política mudar, atualizaremos esta página e a data de “última
          atualização” acima.
        </p>

        <h2>Contato</h2>
        <p>
          Dúvidas sobre esta política podem ser enviadas para{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.{" "}
          O {LOTWISE.name} é publicado pela {PUBLISHER.displayName}.
        </p>
      </>
    ),
  },
  it: {
    metaTitle: `${LOTWISE.name}: informativa sulla privacy`,
    metaDescription: analyticsEnabled
      ? `Come ${LOTWISE.name} tratta i dati: ogni calcolo avviene sul tuo dispositivo, l’app non usa SDK di analisi, non mostra pubblicità e non vende mai i tuoi dati.`
      : `Come ${LOTWISE.name} tratta i dati. Ogni calcolo avviene sul tuo dispositivo; non raccogliamo dati personali né di trading.`,
    breadcrumb: "Informativa sulla privacy di Lotwise",
    h1: "Informativa sulla privacy",
    lead: analyticsEnabled ? (
      <>
        In breve: {LOTWISE.name} funziona interamente sul tuo dispositivo, non
        mostra pubblicità e non vende mai i tuoi dati.
      </>
    ) : (
      <>
        In breve: {LOTWISE.name} funziona interamente sul tuo dispositivo, non
        raccoglie dati personali e non ti traccia.
      </>
    ),
    lastUpdated: (date: string) => <>Ultimo aggiornamento: {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>L’app funziona sul tuo dispositivo</h2>
        <p>
          {LOTWISE.name} è una calcolatrice pensata per funzionare offline:
          dimensione della posizione, dimensione del lotto, valore del pip, rischio
          e margine vengono calcolati localmente sul tuo telefono o tablet. Non
          gestiamo alcun backend che riceva il saldo del tuo conto, la percentuale
          di rischio, lo stop loss, la coppia di valute o qualsiasi altro dato che
          inserisci nell’app.
        </p>

        {dataSection}

        <h2>Dati memorizzati solo sul tuo dispositivo</h2>
        <p>
          Gli unici dati che {LOTWISE.shortName} memorizza sono conservati
          nell’archivio interno dell’app sul tuo dispositivo e non ci vengono mai
          inviati:
        </p>
        <ul>
          <li>la valuta del conto, il saldo e le impostazioni di rischio predefinite;</li>
          <li>gli strumenti preferiti, le unità e le impostazioni di aspetto; e</li>
          <li>
            gli eventuali calcoli salvati o la cronologia che scegli di conservare,
            così restano disponibili tra una sessione e l’altra.
          </li>
        </ul>
        <p>
          Eliminando l’app, queste informazioni vengono cancellate del tutto. Non
          lasciano mai il tuo dispositivo.
        </p>

        <h2>Notifiche e autorizzazioni</h2>
        <p>
          {LOTWISE.shortName} non chiede l’accesso a posizione, contatti, foto,
          microfono o fotocamera. Se una versione futura offrirà notifiche
          facoltative, useranno l’autorizzazione nativa del tuo dispositivo, si
          attiveranno solo se dai esplicitamente il tuo consenso e verranno generate
          in locale: nessun dato delle notifiche viene trasmesso altrove.
        </p>

        <h2>Acquisti</h2>
        <p>
          Se l’app offre una versione a pagamento o acquisti in-app, la transazione
          è gestita interamente da Apple o Google. Non vediamo né memorizziamo mai i
          tuoi dati di pagamento; riceviamo solo lo stato anonimo della ricevuta
          fornito dalla piattaforma, così l’app può sbloccare ciò che hai acquistato.
        </p>

        <h2>Minori</h2>
        <p>
          {LOTWISE.shortName} è un’utility per il pubblico generale, non rivolta ai
          minori, e poiché non raccoglie alcun dato non raccoglie consapevolmente
          nulla da persone di età inferiore ai 13 anni.
        </p>

        <h2>Link di terze parti</h2>
        <p>
          Questo sito contiene link all’Apple App Store e a Google Play per scaricare
          l’app, e a fonti esterne che citiamo. Questi siti di terze parti hanno le
          proprie informative sulla privacy, che ti invitiamo a leggere; non siamo
          responsabili dei loro contenuti né delle loro pratiche.
        </p>

        <h2>Modifiche a questa informativa</h2>
        <p>
          Se questa informativa cambia, aggiorneremo questa pagina e la data di
          «ultimo aggiornamento» indicata sopra.
        </p>

        <h2>Contatti</h2>
        <p>
          Puoi inviare domande su questa informativa all’indirizzo{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.{" "}
          {LOTWISE.name} è pubblicato da {PUBLISHER.displayName}.
        </p>
      </>
    ),
  },
  de: {
    metaTitle: `${LOTWISE.name}: Datenschutzerklärung`,
    metaDescription: analyticsEnabled
      ? `Wie ${LOTWISE.name} mit Daten umgeht: Jede Berechnung läuft auf Ihrem Gerät, die App nutzt kein Analyse-SDK, zeigt keine Werbung und verkauft nie Ihre Daten.`
      : `Wie ${LOTWISE.name} mit Daten umgeht. Jede Berechnung läuft auf Ihrem Gerät; wir erfassen keine personenbezogenen Daten und keine Handelsdaten.`,
    breadcrumb: "Lotwise Datenschutzerklärung",
    h1: "Datenschutzerklärung",
    lead: analyticsEnabled ? (
      <>
        Kurz gesagt: {LOTWISE.name} läuft vollständig auf Ihrem Gerät, zeigt
        keine Werbung und verkauft niemals Ihre Daten.
      </>
    ) : (
      <>
        Kurz gesagt: {LOTWISE.name} läuft vollständig auf Ihrem Gerät, erfasst
        keine personenbezogenen Daten und verfolgt Sie nicht.
      </>
    ),
    lastUpdated: (date: string) => <>Zuletzt aktualisiert: {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>Die App läuft auf Ihrem Gerät</h2>
        <p>
          {LOTWISE.name} ist ein Offline-first-Rechner: Positionsgröße,
          Lotgröße, Pip-Wert, Risiko und Margin werden alle lokal auf Ihrem
          eigenen Smartphone oder Tablet berechnet. Wir betreiben kein Backend,
          das Ihren Kontostand, Ihren Risikoprozentsatz, Ihren Stop-Loss, Ihr
          Währungspaar oder andere Eingaben in der App empfängt.
        </p>

        {dataSection}

        <h2>Daten werden nur auf Ihrem Gerät gespeichert</h2>
        <p>
          Die einzigen Daten, die {LOTWISE.shortName} speichert, liegen im
          eigenen Speicher der App auf Ihrem Gerät und werden nie an uns
          gesendet:
        </p>
        <ul>
          <li>Ihre Kontowährung, Ihr Kontostand und Ihre Standard-Risikoeinstellungen;</li>
          <li>Ihre bevorzugten Instrumente, Einheiten und Darstellungseinstellungen; und</li>
          <li>
            alle gespeicherten Berechnungen oder Verläufe, die Sie behalten
            möchten, damit sie zwischen den Sitzungen erhalten bleiben.
          </li>
        </ul>
        <p>
          Wenn Sie die App löschen, werden diese Informationen vollständig
          entfernt. Sie verlassen Ihr Gerät nie.
        </p>

        <h2>Benachrichtigungen und Berechtigungen</h2>
        <p>
          {LOTWISE.shortName} fordert keinen Zugriff auf Standort, Kontakte,
          Fotos, Mikrofon oder Kamera an. Falls eine künftige Version optionale
          Benachrichtigungen anbietet, nutzen diese die native Berechtigung Ihres
          Geräts, werden nur aktiv, wenn Sie ausdrücklich zustimmen, und werden
          lokal erzeugt; es werden keinerlei Benachrichtigungsdaten übertragen.
        </p>

        <h2>Käufe</h2>
        <p>
          Falls die App eine kostenpflichtige Version oder In-App-Käufe anbietet,
          wird die Transaktion vollständig von Apple oder Google abgewickelt. Wir
          sehen oder speichern Ihre Zahlungsdaten nie; wir erhalten lediglich den
          anonymen Kaufbeleg-Status, den die Plattform bereitstellt, damit die App
          freischalten kann, was Sie gekauft haben.
        </p>

        <h2>Kinder</h2>
        <p>
          {LOTWISE.shortName} ist ein Tool für ein allgemeines Publikum, das sich
          nicht an Kinder richtet. Da es keine Daten erfasst, erhebt es
          wissentlich auch keine Daten von Personen unter 13 Jahren.
        </p>

        <h2>Links zu Dritten</h2>
        <p>
          Diese Website verlinkt auf den Apple App Store und Google Play, um die
          App herunterzuladen, sowie auf externe Quellen, die wir zitieren. Diese
          Websites Dritter haben eigene Datenschutzerklärungen, die Sie sich
          ansehen sollten; für deren Inhalte oder Praktiken sind wir nicht
          verantwortlich.
        </p>

        <h2>Änderungen dieser Erklärung</h2>
        <p>
          Wenn sich diese Erklärung ändert, aktualisieren wir diese Seite und das
          Datum „Zuletzt aktualisiert“ oben.
        </p>

        <h2>Kontakt</h2>
        <p>
          Fragen zu dieser Erklärung können Sie an{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          senden.{" "}
          {LOTWISE.name} wird von {PUBLISHER.displayName} herausgegeben.
        </p>
      </>
    ),
  },
  tr: {
    metaTitle: `${LOTWISE.name} Gizlilik Politikası`,
    metaDescription: analyticsEnabled
      ? `${LOTWISE.name} verileri nasıl işler: tüm hesaplamalar cihazınızda yapılır, uygulama hiçbir analiz SDK’sı kullanmaz, reklam göstermez ve verilerinizi asla satmaz.`
      : `${LOTWISE.name} verileri nasıl işler: tüm hesaplamalar cihazınızda yapılır; hiçbir kişisel veri veya işlem verisi toplamayız.`,
    breadcrumb: "Lotwise Gizlilik Politikası",
    h1: "Gizlilik Politikası",
    lead: analyticsEnabled ? (
      <>
        Kısaca: {LOTWISE.name} tamamen cihazınızda çalışır, reklam göstermez ve
        verilerinizi asla satmaz.
      </>
    ) : (
      <>
        Kısaca: {LOTWISE.name} tamamen cihazınızda çalışır, hiçbir kişisel veri
        toplamaz ve sizi izlemez.
      </>
    ),
    lastUpdated: (date: string) => <>Son güncelleme: {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>Uygulama cihazınızda çalışır</h2>
        <p>
          {LOTWISE.name}, çevrimdışı öncelikli bir hesap makinesidir: pozisyon
          büyüklüğü, lot büyüklüğü, pip değeri, risk ve teminat (marjin) tamamen
          kendi telefonunuzda veya tabletinizde yerel olarak hesaplanır. Hesap
          bakiyenizi, risk yüzdenizi, zarar durdur (stop loss) seviyenizi, işlem
          yaptığınız pariteyi veya uygulamaya girdiğiniz diğer herhangi bir veriyi alan bir
          sunucu altyapısı işletmiyoruz.
        </p>

        {dataSection}

        <h2>Yalnızca cihazınızda saklanan veriler</h2>
        <p>
          {LOTWISE.shortName} uygulamasının sakladığı tek veri, cihazınızda
          uygulamanın kendi depolama alanında tutulur ve bize asla gönderilmez:
        </p>
        <ul>
          <li>hesap para biriminiz, bakiyeniz ve varsayılan risk ayarlarınız;</li>
          <li>tercih ettiğiniz enstrümanlar, birimler ve görünüm ayarlarınız ve</li>
          <li>
            oturumlar arasında korunması için saklamayı seçtiğiniz kayıtlı
            hesaplamalar veya geçmiş.
          </li>
        </ul>
        <p>
          Uygulamayı silmek bu bilgileri tamamen kaldırır. Bu bilgiler cihazınızdan
          hiçbir zaman dışarı çıkmaz.
        </p>

        <h2>Bildirimler ve izinler</h2>
        <p>
          {LOTWISE.shortName} konum, kişiler, fotoğraflar, mikrofon veya kamera
          erişimi istemez. İlerideki bir sürüm isteğe bağlı bildirimler sunarsa, bu
          bildirimler cihazınızın yerleşik iznini kullanır, yalnızca açıkça izin
          verdiğinizde devreye girer ve yerel olarak oluşturulur; hiçbir bildirim
          verisi herhangi bir yere iletilmez.
        </p>

        <h2>Satın alımlar</h2>
        <p>
          Uygulama ücretli bir sürüm veya uygulama içi satın alma sunarsa, işlem
          tamamen Apple veya Google tarafından yürütülür. Ödeme bilgilerinizi hiçbir
          zaman görmeyiz veya saklamayız; yalnızca uygulamanın satın aldığınız
          özelliğin kilidini açabilmesi için platformun sağladığı anonim makbuz
          durumunu alırız.
        </p>

        <h2>Çocuklar</h2>
        <p>
          {LOTWISE.shortName}, çocuklara yönelik olmayan, genel kitleye hitap eden
          bir araçtır ve hiçbir veri toplamadığı için 13 yaşından küçük hiç kimseden
          bilerek herhangi bir veri toplamaz.
        </p>

        <h2>Üçüncü taraf bağlantıları</h2>
        <p>
          Bu site, uygulamayı indirmeniz için Apple App Store’a ve Google Play’e,
          ayrıca atıf yaptığımız dış kaynaklara bağlantı verir. Bu üçüncü taraf
          sitelerin kendi gizlilik politikaları vardır ve bunları incelemenizi
          öneririz; söz konusu sitelerin içeriğinden veya uygulamalarından sorumlu
          değiliz.
        </p>

        <h2>Bu politikada yapılacak değişiklikler</h2>
        <p>
          Bu politika değişirse bu sayfayı ve yukarıdaki “son güncelleme” tarihini
          güncelleriz.
        </p>

        <h2>İletişim</h2>
        <p>
          Bu politikayla ilgili sorularınızı{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          adresine gönderebilirsiniz. {LOTWISE.name},{" "}
          {PUBLISHER.displayName} tarafından yayımlanmaktadır.
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
  const href = "/lotwise-privacy";

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

export default async function LotwisePrivacyPage({
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
        item: `${SITE_URL}${getPathname({ locale: l, href: "/lotwise-privacy" })}`,
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
        <p className="mt-2 text-sm font-medium uppercase tracking-wide text-emerald">
          {LOTWISE.name}
        </p>
        <p className="mt-4 text-lg text-fog">{c.lead}</p>
      </header>

      <div className="article-prose mt-8">
        <p>{c.lastUpdated(formatDate(LAST_UPDATED, l))}</p>
        {c.body(DATA_SECTION[l])}
      </div>
    </article>
  );
}
