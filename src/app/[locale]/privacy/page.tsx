import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
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

const LAST_UPDATED = "2026-10-15";

// Honest, env-driven data-handling section. With no analytics configured the
// site is genuinely tracking-free; when analytics is enabled the wording below
// switches to describe exactly what runs and how consent works.
const DATA_SECTION: Record<Locale, ReactNode> = {
  en: analyticsEnabled ? (
    <>
      <h2>Analytics</h2>
      <p>
        We use privacy-respecting analytics to understand aggregate usage, which
        pages are popular and roughly where visitors come from, so we can improve
        the tool. We never run advertising trackers and never sell or share your
        data.
      </p>
      {hasCookieAnalytics ? (
        <p>
          The analytics we use may set cookies. They load{" "}
          <strong>only after you accept</strong> the consent banner; if you
          decline, no analytics cookies are set. Google Analytics, where used, is
          configured to anonymise IP addresses. You can change your choice any time
          by clearing this site&apos;s data in your browser.
        </p>
      ) : (
        <p>
          Our analytics is cookieless and does not use any persistent identifier or
          track you across sites, so no consent banner is required.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>No tracking</h2>
      <p>
        We run no analytics, no advertising trackers, and set no tracking cookies
        on this site. We do not collect names, email addresses, IP addresses, or
        any other personal or trading data through the web tool, and we have
        nothing of yours to sell or share.
      </p>
    </>
  ),
  es: analyticsEnabled ? (
    <>
      <h2>Analítica</h2>
      <p>
        Usamos analítica respetuosa con la privacidad para entender el uso
        agregado, qué páginas son populares y, de forma aproximada, de dónde vienen
        los visitantes, y así mejorar la herramienta. Nunca usamos rastreadores
        publicitarios ni vendemos o compartimos tus datos.
      </p>
      {hasCookieAnalytics ? (
        <p>
          La analítica que usamos puede instalar cookies. Se cargan{" "}
          <strong>solo después de que aceptes</strong> el aviso de consentimiento;
          si lo rechazas, no se instala ninguna cookie de analítica. Google
          Analytics, cuando se usa, está configurado para anonimizar las direcciones
          IP. Puedes cambiar tu elección en cualquier momento borrando los datos de
          este sitio en tu navegador.
        </p>
      ) : (
        <p>
          Nuestra analítica no usa cookies ni ningún identificador persistente, ni
          te rastrea entre sitios, por lo que no se requiere aviso de
          consentimiento.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>Sin seguimiento</h2>
      <p>
        No usamos analíticas, ni rastreadores publicitarios, ni instalamos cookies
        de seguimiento en este sitio. No recopilamos nombres, direcciones de correo
        electrónico, direcciones IP ni ningún otro dato personal o de trading a
        través de la herramienta web, y no tenemos nada tuyo que vender ni
        compartir.
      </p>
    </>
  ),
  fr: analyticsEnabled ? (
    <>
      <h2>Analyse d’audience</h2>
      <p>
        Nous utilisons une analyse d’audience respectueuse de la vie privée pour
        comprendre l’usage agrégé, quelles pages sont populaires et, de façon
        approximative, d’où viennent les visiteurs, afin d’améliorer l’outil. Nous
        n’utilisons jamais de traqueurs publicitaires et ne vendons ni ne partageons
        jamais vos données.
      </p>
      {hasCookieAnalytics ? (
        <p>
          L’analyse d’audience que nous utilisons peut déposer des cookies. Ils ne
          se chargent <strong>qu’après votre acceptation</strong> de la bannière de
          consentement ; si vous refusez, aucun cookie d’analyse n’est déposé.
          Google Analytics, lorsqu’il est utilisé, est configuré pour anonymiser les
          adresses IP. Vous pouvez modifier votre choix à tout moment en effaçant
          les données de ce site dans votre navigateur.
        </p>
      ) : (
        <p>
          Notre analyse d’audience n’utilise ni cookie ni identifiant persistant et
          ne vous suit pas d’un site à l’autre : aucune bannière de consentement
          n’est donc nécessaire.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>Aucun suivi</h2>
      <p>
        Nous n’utilisons aucune analyse d’audience, aucun traqueur publicitaire et
        ne déposons aucun cookie de suivi sur ce site. Nous ne collectons ni noms,
        ni adresses e-mail, ni adresses IP, ni aucune autre donnée personnelle ou de
        trading via l’outil web, et nous n’avons donc rien de vous à vendre ou à
        partager.
      </p>
    </>
  ),
  pt: analyticsEnabled ? (
    <>
      <h2>Análises de uso</h2>
      <p>
        Usamos análises que respeitam a privacidade para entender o uso de forma
        agregada, quais páginas são mais populares e, de modo aproximado, de onde
        vêm os visitantes, para podermos melhorar a ferramenta. Nunca usamos
        rastreadores de publicidade e nunca vendemos nem compartilhamos seus dados.
      </p>
      {hasCookieAnalytics ? (
        <p>
          As análises que usamos podem definir cookies. Elas são carregadas{" "}
          <strong>somente depois que você aceita</strong> o banner de
          consentimento; se você recusar, nenhum cookie de análise é definido. O
          Google Analytics, quando usado, é configurado para anonimizar endereços
          IP. Você pode mudar sua escolha a qualquer momento limpando os dados
          deste site no seu navegador.
        </p>
      ) : (
        <p>
          Nossas análises não usam cookies nem qualquer identificador persistente e
          não rastreiam você entre sites, então nenhum banner de consentimento é
          necessário.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>Sem rastreamento</h2>
      <p>
        Não usamos ferramentas de análise nem rastreadores de publicidade, e não
        definimos cookies de rastreamento neste site. Não coletamos nomes,
        endereços de e-mail, endereços IP ou qualquer outro dado pessoal ou de
        trading por meio da ferramenta web, e não temos nada seu para vender ou
        compartilhar.
      </p>
    </>
  ),
  it: analyticsEnabled ? (
    <>
      <h2>Statistiche di utilizzo</h2>
      <p>
        Usiamo strumenti di analisi rispettosi della privacy per capire l’utilizzo
        in forma aggregata, quali pagine sono più visitate e, in modo
        approssimativo, da dove arrivano i visitatori, così da poter migliorare lo
        strumento. Non usiamo mai tracker pubblicitari e non vendiamo né
        condividiamo mai i tuoi dati.
      </p>
      {hasCookieAnalytics ? (
        <p>
          Gli strumenti di analisi che usiamo possono impostare dei cookie. Vengono
          caricati <strong>solo dopo che hai accettato</strong> il banner di
          consenso; se rifiuti, non viene impostato alcun cookie di analisi. Google
          Analytics, dove utilizzato, è configurato per anonimizzare gli indirizzi
          IP. Puoi modificare la tua scelta in qualsiasi momento cancellando i dati
          di questo sito nel tuo browser.
        </p>
      ) : (
        <p>
          I nostri strumenti di analisi non usano cookie né identificatori
          persistenti e non ti tracciano da un sito all’altro, quindi non è
          necessario alcun banner di consenso.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>Nessun tracciamento</h2>
      <p>
        Su questo sito non usiamo strumenti di analisi né tracker pubblicitari e non
        impostiamo cookie di tracciamento. Tramite lo strumento web non raccogliamo
        nomi, indirizzi email, indirizzi IP né altri dati personali o di trading, e
        non abbiamo nulla di tuo da vendere o condividere.
      </p>
    </>
  ),
  de: analyticsEnabled ? (
    <>
      <h2>Analyse</h2>
      <p>
        Wir nutzen eine datenschutzfreundliche Analyse, um die Nutzung in
        zusammengefasster Form zu verstehen, also welche Seiten beliebt sind und
        ungefähr, woher die Besucher kommen, damit wir das Tool verbessern können.
        Wir setzen niemals Werbetracker ein und verkaufen oder teilen Ihre Daten
        niemals.
      </p>
      {hasCookieAnalytics ? (
        <p>
          Die von uns genutzte Analyse kann Cookies setzen. Sie wird{" "}
          <strong>erst geladen, nachdem Sie</strong> im Einwilligungsbanner
          zugestimmt haben; wenn Sie ablehnen, werden keine Analyse-Cookies
          gesetzt. Google Analytics ist, sofern verwendet, so konfiguriert, dass
          IP-Adressen anonymisiert werden. Sie können Ihre Entscheidung jederzeit
          ändern, indem Sie die Daten dieser Website in Ihrem Browser löschen.
        </p>
      ) : (
        <p>
          Unsere Analyse kommt ohne Cookies aus, verwendet keine dauerhafte
          Kennung und verfolgt Sie nicht über verschiedene Websites hinweg. Ein
          Einwilligungsbanner ist daher nicht erforderlich.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>Kein Tracking</h2>
      <p>
        Wir betreiben auf dieser Website keine Analyse, keine Werbetracker und
        setzen keine Tracking-Cookies. Über das Web-Tool erfassen wir weder
        Namen noch E-Mail-Adressen, IP-Adressen oder andere personenbezogene oder
        handelsbezogene Daten, und wir haben nichts von Ihnen, das wir verkaufen
        oder weitergeben könnten.
      </p>
    </>
  ),
  tr: analyticsEnabled ? (
    <>
      <h2>Analiz</h2>
      <p>
        Aracı geliştirebilmek için genel kullanımı, yani hangi sayfaların popüler
        olduğunu ve ziyaretçilerin kabaca nereden geldiğini toplu olarak anlamak
        amacıyla gizliliğe saygılı analiz araçları kullanıyoruz. Hiçbir zaman reklam
        izleyicisi çalıştırmayız ve verilerinizi asla satmayız veya paylaşmayız.
      </p>
      {hasCookieAnalytics ? (
        <p>
          Kullandığımız analiz araçları çerez yerleştirebilir. Bu araçlar yalnızca
          onay bannerını <strong>kabul etmenizin ardından</strong> yüklenir;
          reddederseniz hiçbir analiz çerezi yerleştirilmez. Google Analytics,
          kullanıldığı durumlarda IP adreslerini anonimleştirecek şekilde
          yapılandırılmıştır. Tercihinizi, tarayıcınızda bu sitenin verilerini
          temizleyerek dilediğiniz zaman değiştirebilirsiniz.
        </p>
      ) : (
        <p>
          Analiz aracımız çerez kullanmaz, kalıcı bir tanımlayıcı kullanmaz ve sizi
          siteler arasında izlemez; bu nedenle bir onay bannerı gerekmez.
        </p>
      )}
    </>
  ) : (
    <>
      <h2>İzleme yok</h2>
      <p>
        Bu sitede hiçbir analiz aracı veya reklam izleyicisi çalıştırmıyoruz ve
        izleme çerezi yerleştirmiyoruz. Web aracı üzerinden ad, e-posta adresi, IP
        adresi veya başka herhangi bir kişisel ya da işlem verisi toplamıyoruz;
        dolayısıyla satacak veya paylaşacak hiçbir verinize sahip değiliz.
      </p>
    </>
  ),
};

// What the contact form collects. Submissions go through Netlify Forms (the
// site host) and on to our inbox; see src/components/ContactForm.tsx.
const CONTACT_FORM_SECTION: Record<Locale, ReactNode> = {
  en: (
    <>
      <h2>Contact form</h2>
      <p>
        If you write to us through the contact form, we receive the name, email
        address, subject and message you enter. The form is processed by our
        hosting provider, Netlify, and delivered to our inbox. We use these
        details only to reply to you and keep them no longer than needed for that
        conversation. Ask us at any time to delete them.
      </p>
    </>
  ),
  es: (
    <>
      <h2>Formulario de contacto</h2>
      <p>
        Si nos escribes a través del formulario de contacto, recibimos el nombre,
        el correo electrónico, el asunto y el mensaje que introduces. El formulario
        lo procesa nuestro proveedor de alojamiento, Netlify, y llega a nuestra
        bandeja de entrada. Usamos estos datos solo para responderte y no los
        conservamos más tiempo del necesario para esa conversación. Puedes pedirnos
        en cualquier momento que los eliminemos.
      </p>
    </>
  ),
  fr: (
    <>
      <h2>Formulaire de contact</h2>
      <p>
        Si vous nous écrivez via le formulaire de contact, nous recevons le nom,
        l’adresse e-mail, l’objet et le message que vous saisissez. Le formulaire
        est traité par notre hébergeur, Netlify, puis transmis à notre boîte de
        réception. Nous utilisons ces informations uniquement pour vous répondre et
        ne les conservons pas au-delà de cet échange. Vous pouvez nous demander à
        tout moment de les supprimer.
      </p>
    </>
  ),
  pt: (
    <>
      <h2>Formulário de contato</h2>
      <p>
        Se você nos escrever pelo formulário de contato, recebemos o nome, o
        e-mail, o assunto e a mensagem que você informar. O formulário é processado
        pelo nosso provedor de hospedagem, a Netlify, e entregue à nossa caixa de
        entrada. Usamos esses dados apenas para responder a você e não os
        guardamos por mais tempo do que essa conversa exige. Você pode pedir a
        exclusão a qualquer momento.
      </p>
    </>
  ),
  it: (
    <>
      <h2>Modulo di contatto</h2>
      <p>
        Se ci scrivi tramite il modulo di contatto, riceviamo il nome, l’indirizzo
        email, l’oggetto e il messaggio che inserisci. Il modulo è gestito dal
        nostro provider di hosting, Netlify, e recapitato alla nostra casella di
        posta. Usiamo questi dati solo per risponderti e non li conserviamo oltre
        il tempo necessario per quella conversazione. Puoi chiederci in qualsiasi
        momento di cancellarli.
      </p>
    </>
  ),
  de: (
    <>
      <h2>Kontaktformular</h2>
      <p>
        Wenn Sie uns über das Kontaktformular schreiben, erhalten wir den Namen,
        die E-Mail-Adresse, den Betreff und die Nachricht, die Sie eingeben. Das
        Formular wird von unserem Hosting-Anbieter Netlify verarbeitet und an unser
        Postfach zugestellt. Wir verwenden diese Angaben nur, um Ihnen zu antworten,
        und bewahren sie nicht länger auf, als diese Korrespondenz es erfordert.
        Sie können jederzeit die Löschung verlangen.
      </p>
    </>
  ),
  tr: (
    <>
      <h2>İletişim formu</h2>
      <p>
        İletişim formu üzerinden bize yazarsanız, girdiğiniz adı, e-posta adresini,
        konuyu ve mesajı alırız. Form, barındırma sağlayıcımız Netlify tarafından
        işlenir ve e-posta kutumuza iletilir. Bu bilgileri yalnızca size yanıt
        vermek için kullanır, o yazışmanın gerektirdiğinden daha uzun süre
        saklamayız. İstediğiniz zaman silinmelerini talep edebilirsiniz.
      </p>
    </>
  ),
};

const COPY = {
  en: {
    metaTitle: "Privacy Policy",
    metaDescription: analyticsEnabled
      ? "How Forex Market Hours handles data: the web tool runs in your browser, uses privacy-friendly analytics, shows no ads and never sells your data."
      : "How Forex Market Hours handles data. The web tool runs in your browser; we collect no personal trading data.",
    breadcrumb: "Privacy Policy",
    h1: "Privacy Policy",
    lead: analyticsEnabled ? (
      <>
        Short version: {PRODUCT.name} runs in your browser, uses privacy-friendly
        analytics, shows no ads, and never sells your data.
      </>
    ) : (
      <>
        Short version: {PRODUCT.name} runs in your browser, collects no personal
        data, and does not track you. We only see what you choose to send
        us through the contact form.
      </>
    ),
    lastUpdated: (date: string) => <>Last updated: {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>The web tool runs in your browser</h2>
        <p>
          {PRODUCT.name} at {SITE_URL} is a client-side tool: the live session
          clock, timezone conversion and calculations all run on your own device.
          We do not operate any backend that logs which sessions you view, what
          timezone you use, or how you use the site.
        </p>

        {dataSection}

        <h2>Local storage: theme and alarms only</h2>
        <p>
          The only data the site stores is kept in your own browser&apos;s{" "}
          <code>localStorage</code> and never sent to us:
        </p>
        <ul>
          <li>your light/dark theme preference; and</li>
          <li>
            any session alarms you choose to set, so they persist between visits.
          </li>
        </ul>
        <p>
          Clearing your browser&apos;s site data removes this information
          completely. It never leaves your device.
        </p>

        <h2>Notifications and audio</h2>
        <p>
          If you enable a session alarm, the site uses your browser&apos;s native
          Notifications permission and Web Audio API to alert you locally. These
          only activate if you explicitly opt in, and no alarm data is transmitted
          anywhere.
        </p>

        <h2>The mobile app</h2>
        <p>
          The {PRODUCT.name} iOS and Android app, per its App Store and Google Play
          listings, collects no data from its users.
        </p>

        <h2>Third-party links</h2>
        <p>
          This site links to the Apple App Store and Google Play to download the
          app, and to external sources we cite in our articles. Those third-party
          sites have their own privacy policies, which we encourage you to review;
          we are not responsible for their content or practices.
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
          {PRODUCT.name} is published by {PUBLISHER.displayName}.
        </p>
      </>
    ),
  },
  es: {
    metaTitle: "Política de privacidad",
    metaDescription: analyticsEnabled
      ? "Cómo gestiona los datos Horario del Mercado Forex: la herramienta funciona en tu navegador, usa analítica respetuosa con la privacidad, sin anuncios y sin vender tus datos."
      : "Cómo gestiona los datos Horario del Mercado Forex. La herramienta web funciona en tu navegador; no recopilamos datos personales de trading.",
    breadcrumb: "Política de privacidad",
    h1: "Política de privacidad",
    lead: analyticsEnabled ? (
      <>
        Versión breve: {PRODUCT.name} funciona en tu navegador, usa analítica
        respetuosa con la privacidad, no muestra anuncios y nunca vende tus datos.
      </>
    ) : (
      <>
        Versión breve: {PRODUCT.name} funciona en tu navegador, no recopila datos
        personales y no te rastrea. Solo vemos lo que decidas enviarnos a
        través del formulario de contacto.
      </>
    ),
    lastUpdated: (date: string) => <>Última actualización: {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>La herramienta web funciona en tu navegador</h2>
        <p>
          {PRODUCT.name} en {SITE_URL} es una herramienta del lado del cliente: el
          reloj de sesiones en vivo, la conversión de zona horaria y los cálculos
          se ejecutan por completo en tu propio dispositivo. No operamos ningún
          servidor que registre qué sesiones consultas, qué zona horaria usas o
          cómo utilizas el sitio.
        </p>

        {dataSection}

        <h2>Almacenamiento local: solo tema y alarmas</h2>
        <p>
          Los únicos datos que guarda el sitio se almacenan en el{" "}
          <code>localStorage</code> de tu propio navegador y nunca se nos envían:
        </p>
        <ul>
          <li>tu preferencia de tema claro/oscuro; y</li>
          <li>
            las alarmas de sesión que decidas configurar, para que se mantengan
            entre visitas.
          </li>
        </ul>
        <p>
          Borrar los datos del sitio en tu navegador elimina esta información por
          completo. Nunca sale de tu dispositivo.
        </p>

        <h2>Notificaciones y audio</h2>
        <p>
          Si activas una alarma de sesión, el sitio usa el permiso de
          Notificaciones nativo de tu navegador y la API Web Audio para avisarte de
          forma local. Solo se activan si das tu consentimiento expreso, y no se
          transmite ningún dato de alarma a ninguna parte.
        </p>

        <h2>La app para móvil</h2>
        <p>
          La app de {PRODUCT.name} para iOS y Android, según sus fichas en la App
          Store y en Google Play, no recopila ningún dato de sus usuarios.
        </p>

        <h2>Enlaces de terceros</h2>
        <p>
          Este sitio enlaza a la App Store de Apple y a Google Play para descargar
          la app, y a las fuentes externas que citamos en nuestros artículos. Esos
          sitios de terceros tienen sus propias políticas de privacidad, que te
          animamos a revisar; no somos responsables de su contenido ni de sus
          prácticas.
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
          {PRODUCT.name} está publicado por {PUBLISHER.displayName}.
        </p>
      </>
    ),
  },
  fr: {
    metaTitle: "Politique de confidentialité",
    metaDescription: analyticsEnabled
      ? "Comment Forex Market Hours traite les données : l’outil web s’exécute dans votre navigateur, utilise une analyse respectueuse de la vie privée et ne vend jamais vos données."
      : "Comment Forex Market Hours traite les données. L’outil web s’exécute dans votre navigateur ; nous ne collectons aucune donnée personnelle de trading.",
    breadcrumb: "Politique de confidentialité",
    h1: "Politique de confidentialité",
    lead: analyticsEnabled ? (
      <>
        En bref : {PRODUCT.name} s’exécute dans votre navigateur, utilise une
        analyse d’audience respectueuse de la vie privée, n’affiche aucune publicité
        et ne vend jamais vos données.
      </>
    ) : (
      <>
        En bref : {PRODUCT.name} s’exécute dans votre navigateur, ne collecte aucune
        donnée personnelle et ne vous suit pas. Nous ne voyons que ce que vous
        choisissez de nous envoyer via le formulaire de contact.
      </>
    ),
    lastUpdated: (date: string) => <>Dernière mise à jour : {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>L’outil web s’exécute dans votre navigateur</h2>
        <p>
          {PRODUCT.name}, sur {SITE_URL}, est un outil côté client : l’horloge de
          séance en direct, la conversion de fuseau horaire et les calculs
          s’exécutent tous sur votre propre appareil. Nous n’exploitons aucun serveur
          qui enregistrerait les séances que vous consultez, le fuseau horaire que
          vous utilisez ou la façon dont vous naviguez sur le site.
        </p>

        {dataSection}

        <h2>Stockage local : thème et alarmes uniquement</h2>
        <p>
          Les seules données stockées par le site restent dans le{" "}
          <code>localStorage</code> de votre propre navigateur et ne nous sont jamais
          transmises :
        </p>
        <ul>
          <li>votre préférence de thème clair ou sombre ; et</li>
          <li>
            les alarmes de séance que vous choisissez de régler, afin qu’elles
            persistent d’une visite à l’autre.
          </li>
        </ul>
        <p>
          Effacer les données de site de votre navigateur supprime complètement ces
          informations. Elles ne quittent jamais votre appareil.
        </p>

        <h2>Notifications et audio</h2>
        <p>
          Si vous activez une alarme de séance, le site utilise l’autorisation native
          de notifications de votre navigateur et l’API Web Audio pour vous alerter
          localement. Cela ne s’active que si vous y consentez explicitement, et
          aucune donnée d’alarme n’est transmise où que ce soit.
        </p>

        <h2>L’application mobile</h2>
        <p>
          L’application {PRODUCT.name} pour iOS et Android, conformément à ses fiches
          App Store et Google Play, ne collecte aucune donnée de ses utilisateurs.
        </p>

        <h2>Liens de tiers</h2>
        <p>
          Ce site renvoie vers l’App Store d’Apple et Google Play pour télécharger
          l’application, ainsi que vers les sources externes que nous citons dans nos
          articles. Ces sites tiers ont leurs propres politiques de confidentialité,
          que nous vous encourageons à consulter ; nous ne sommes pas responsables de
          leur contenu ni de leurs pratiques.
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
          {PRODUCT.name} est publié par {PUBLISHER.displayName}.
        </p>
      </>
    ),
  },
  pt: {
    metaTitle: "Política de Privacidade",
    metaDescription: analyticsEnabled
      ? "Como o Forex Market Hours trata os dados: a ferramenta web roda no seu navegador, usa análises que respeitam a privacidade, não exibe anúncios e nunca vende seus dados."
      : "Como o Forex Market Hours trata os dados. A ferramenta web roda no seu navegador; não coletamos nenhum dado pessoal de trading.",
    breadcrumb: "Política de Privacidade",
    h1: "Política de Privacidade",
    lead: analyticsEnabled ? (
      <>
        Em resumo: o {PRODUCT.name} roda no seu navegador, usa análises que
        respeitam a privacidade, não exibe anúncios e nunca vende seus dados.
      </>
    ) : (
      <>
        Em resumo: o {PRODUCT.name} roda no seu navegador, não coleta nenhum dado
        pessoal e não rastreia você. Só vemos o que você decidir nos enviar
        pelo formulário de contato.
      </>
    ),
    lastUpdated: (date: string) => <>Última atualização: {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>A ferramenta web roda no seu navegador</h2>
        <p>
          O {PRODUCT.name}, em {SITE_URL}, é uma ferramenta do lado do cliente: o
          relógio de sessões ao vivo, a conversão de fuso horário e os cálculos
          rodam todos no seu próprio dispositivo. Não operamos nenhum servidor que
          registre quais sessões você consulta, qual fuso horário você usa ou como
          você usa o site.
        </p>

        {dataSection}

        <h2>Armazenamento local: apenas tema e alarmes</h2>
        <p>
          Os únicos dados que o site armazena ficam no{" "}
          <code>localStorage</code> do seu próprio navegador e nunca são enviados
          para nós:
        </p>
        <ul>
          <li>sua preferência de tema claro ou escuro; e</li>
          <li>
            os alarmes de sessão que você decidir configurar, para que continuem
            salvos entre uma visita e outra.
          </li>
        </ul>
        <p>
          Limpar os dados do site no seu navegador apaga essas informações por
          completo. Elas nunca saem do seu dispositivo.
        </p>

        <h2>Notificações e áudio</h2>
        <p>
          Se você ativar um alarme de sessão, o site usa a permissão nativa de
          notificações do seu navegador e a API Web Audio para avisar você
          localmente. Esses recursos só são ativados se você optar por eles
          explicitamente, e nenhum dado de alarme é transmitido para lugar nenhum.
        </p>

        <h2>O app para celular</h2>
        <p>
          O app {PRODUCT.name} para iOS e Android, conforme suas páginas na App
          Store e no Google Play, não coleta nenhum dado dos seus usuários.
        </p>

        <h2>Links de terceiros</h2>
        <p>
          Este site contém links para a App Store da Apple e para o Google Play,
          para baixar o app, e para fontes externas que citamos nos nossos artigos.
          Esses sites de terceiros têm suas próprias políticas de privacidade, que
          recomendamos que você leia; não somos responsáveis pelo conteúdo nem pelas
          práticas deles.
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
          O {PRODUCT.name} é publicado pela {PUBLISHER.displayName}.
        </p>
      </>
    ),
  },
  it: {
    metaTitle: "Informativa sulla privacy",
    metaDescription: analyticsEnabled
      ? "Come Forex Market Hours tratta i dati: lo strumento web funziona nel tuo browser, usa analisi rispettose della privacy, non mostra pubblicità e non vende mai i tuoi dati."
      : "Come Forex Market Hours tratta i dati. Lo strumento web funziona nel tuo browser; non raccogliamo dati personali di trading.",
    breadcrumb: "Informativa sulla privacy",
    h1: "Informativa sulla privacy",
    lead: analyticsEnabled ? (
      <>
        In breve: {PRODUCT.name} funziona nel tuo browser, usa strumenti di analisi
        rispettosi della privacy, non mostra pubblicità e non vende mai i tuoi
        dati.
      </>
    ) : (
      <>
        In breve: {PRODUCT.name} funziona nel tuo browser, non raccoglie dati
        personali e non ti traccia. Vediamo solo ciò che scegli di inviarci
        tramite il modulo di contatto.
      </>
    ),
    lastUpdated: (date: string) => <>Ultimo aggiornamento: {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>Lo strumento web funziona nel tuo browser</h2>
        <p>
          {PRODUCT.name} su {SITE_URL} è uno strumento lato client: l’orologio delle
          sessioni in tempo reale, la conversione dei fusi orari e i calcoli
          avvengono tutti sul tuo dispositivo. Non gestiamo alcun backend che
          registri quali sessioni visualizzi, quale fuso orario usi o come utilizzi
          il sito.
        </p>

        {dataSection}

        <h2>Archiviazione locale: solo tema e sveglie</h2>
        <p>
          Gli unici dati che il sito memorizza sono conservati nel{" "}
          <code>localStorage</code> del tuo browser e non ci vengono mai inviati:
        </p>
        <ul>
          <li>la tua preferenza per il tema chiaro o scuro; e</li>
          <li>
            le eventuali sveglie di sessione che scegli di impostare, così restano
            salvate tra una visita e l’altra.
          </li>
        </ul>
        <p>
          Cancellando i dati del sito nel tuo browser, queste informazioni vengono
          eliminate del tutto. Non lasciano mai il tuo dispositivo.
        </p>

        <h2>Notifiche e audio</h2>
        <p>
          Se attivi una sveglia di sessione, il sito usa l’autorizzazione nativa per
          le notifiche del tuo browser e la Web Audio API per avvisarti in locale.
          Si attivano solo se dai esplicitamente il tuo consenso, e nessun dato
          delle sveglie viene trasmesso altrove.
        </p>

        <h2>L’app mobile</h2>
        <p>
          L’app {PRODUCT.name} per iOS e Android, come indicato nelle relative
          schede su App Store e Google Play, non raccoglie alcun dato dai suoi
          utenti.
        </p>

        <h2>Link di terze parti</h2>
        <p>
          Questo sito contiene link all’Apple App Store e a Google Play per scaricare
          l’app, e a fonti esterne che citiamo nei nostri articoli. Questi siti di
          terze parti hanno le proprie informative sulla privacy, che ti invitiamo a
          leggere; non siamo responsabili dei loro contenuti né delle loro pratiche.
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
          {PRODUCT.name} è pubblicato da {PUBLISHER.displayName}.
        </p>
      </>
    ),
  },
  de: {
    metaTitle: "Datenschutzerklärung",
    metaDescription: analyticsEnabled
      ? "Wie Forex Market Hours mit Daten umgeht: Das Web-Tool läuft in Ihrem Browser, nutzt datenschutzfreundliche Analysen, zeigt keine Werbung und verkauft nie Ihre Daten."
      : "Wie Forex Market Hours mit Daten umgeht. Das Web-Tool läuft in Ihrem Browser; wir erfassen keine personenbezogenen Handelsdaten.",
    breadcrumb: "Datenschutzerklärung",
    h1: "Datenschutzerklärung",
    lead: analyticsEnabled ? (
      <>
        Kurz gesagt: {PRODUCT.name} läuft in Ihrem Browser, nutzt
        datenschutzfreundliche Analysen, zeigt keine Werbung und verkauft
        niemals Ihre Daten.
      </>
    ) : (
      <>
        Kurz gesagt: {PRODUCT.name} läuft in Ihrem Browser, erfasst keine
        personenbezogenen Daten und verfolgt Sie nicht. Wir sehen nur, was Sie
        uns über das Kontaktformular senden.
      </>
    ),
    lastUpdated: (date: string) => <>Zuletzt aktualisiert: {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>Das Web-Tool läuft in Ihrem Browser</h2>
        <p>
          {PRODUCT.name} unter {SITE_URL} ist ein clientseitiges Tool: Die
          Live-Sessionuhr, die Umrechnung der Zeitzonen und alle Berechnungen
          laufen auf Ihrem eigenen Gerät. Wir betreiben kein Backend, das
          protokolliert, welche Sessions Sie ansehen, welche Zeitzone Sie
          verwenden oder wie Sie die Website nutzen.
        </p>

        {dataSection}

        <h2>Lokaler Speicher: nur Design und Alarme</h2>
        <p>
          Die einzigen Daten, die die Website speichert, liegen im{" "}
          <code>localStorage</code> Ihres eigenen Browsers und werden nie an uns
          gesendet:
        </p>
        <ul>
          <li>Ihre Einstellung für helles oder dunkles Design; und</li>
          <li>
            alle Session-Alarme, die Sie stellen, damit sie zwischen Ihren
            Besuchen erhalten bleiben.
          </li>
        </ul>
        <p>
          Wenn Sie die Websitedaten in Ihrem Browser löschen, werden diese
          Informationen vollständig entfernt. Sie verlassen Ihr Gerät nie.
        </p>

        <h2>Benachrichtigungen und Audio</h2>
        <p>
          Wenn Sie einen Session-Alarm aktivieren, nutzt die Website die native
          Benachrichtigungsberechtigung und die Web Audio API Ihres Browsers, um
          Sie lokal zu benachrichtigen. Diese werden nur aktiv, wenn Sie
          ausdrücklich zustimmen, und es werden keinerlei Alarmdaten übertragen.
        </p>

        <h2>Die mobile App</h2>
        <p>
          Die App {PRODUCT.name} für iOS und Android erfasst laut ihren Einträgen
          im App Store und bei Google Play keine Daten ihrer Nutzer.
        </p>

        <h2>Links zu Dritten</h2>
        <p>
          Diese Website verlinkt auf den Apple App Store und Google Play, um die
          App herunterzuladen, sowie auf externe Quellen, die wir in unseren
          Artikeln zitieren. Diese Websites Dritter haben eigene
          Datenschutzerklärungen, die Sie sich ansehen sollten; für deren Inhalte
          oder Praktiken sind wir nicht verantwortlich.
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
          {PRODUCT.name} wird von {PUBLISHER.displayName} herausgegeben.
        </p>
      </>
    ),
  },
  tr: {
    metaTitle: "Gizlilik Politikası",
    metaDescription: analyticsEnabled
      ? "Forex Market Hours verileri nasıl işler: web aracı tarayıcınızda çalışır, gizlilik dostu analiz kullanır, reklam göstermez ve verilerinizi asla satmaz."
      : "Forex Market Hours verileri nasıl işler: web aracı tarayıcınızda çalışır; kişisel işlem verisi toplamayız.",
    breadcrumb: "Gizlilik Politikası",
    h1: "Gizlilik Politikası",
    lead: analyticsEnabled ? (
      <>
        Kısaca: {PRODUCT.name} tarayıcınızda çalışır, gizlilik dostu analiz
        kullanır, reklam göstermez ve verilerinizi asla satmaz.
      </>
    ) : (
      <>
        Kısaca: {PRODUCT.name} tarayıcınızda çalışır, hiçbir kişisel veri toplamaz
        ve sizi izlemez. Yalnızca iletişim formu üzerinden bize göndermeyi
        seçtiğiniz bilgileri görürüz.
      </>
    ),
    lastUpdated: (date: string) => <>Son güncelleme: {date}.</>,
    body: (dataSection: ReactNode) => (
      <>
        <h2>Web aracı tarayıcınızda çalışır</h2>
        <p>
          {SITE_URL} adresindeki {PRODUCT.name}, istemci tarafında çalışan bir
          araçtır: canlı seans saati, saat dilimi dönüşümü ve hesaplamaların tamamı
          kendi cihazınızda çalışır. Hangi seansları görüntülediğinizi, hangi saat
          dilimini kullandığınızı veya siteyi nasıl kullandığınızı kaydeden herhangi
          bir sunucu altyapısı işletmiyoruz.
        </p>

        {dataSection}

        <h2>Yerel depolama: yalnızca tema ve alarmlar</h2>
        <p>
          Sitenin sakladığı tek veri, kendi tarayıcınızın{" "}
          <code>localStorage</code> alanında tutulur ve bize asla gönderilmez:
        </p>
        <ul>
          <li>açık/karanlık tema tercihiniz ve</li>
          <li>
            ziyaretleriniz arasında korunması için kurmayı seçtiğiniz seans
            alarmları.
          </li>
        </ul>
        <p>
          Tarayıcınızdaki site verilerini temizlemek bu bilgileri tamamen siler. Bu
          bilgiler cihazınızdan hiçbir zaman dışarı çıkmaz.
        </p>

        <h2>Bildirimler ve ses</h2>
        <p>
          Bir seans alarmını etkinleştirirseniz site, sizi yerel olarak uyarmak için
          tarayıcınızın yerleşik Bildirimler iznini ve Web Audio API’sini kullanır.
          Bunlar yalnızca açıkça izin verdiğinizde devreye girer ve hiçbir alarm
          verisi herhangi bir yere iletilmez.
        </p>

        <h2>Mobil uygulama</h2>
        <p>
          {PRODUCT.name} iOS ve Android uygulaması, App Store ve Google Play
          sayfalarında belirtildiği üzere kullanıcılarından hiçbir veri toplamaz.
        </p>

        <h2>Üçüncü taraf bağlantıları</h2>
        <p>
          Bu site, uygulamayı indirmeniz için Apple App Store’a ve Google Play’e,
          ayrıca makalelerimizde atıf yaptığımız dış kaynaklara bağlantı verir. Bu
          üçüncü taraf sitelerin kendi gizlilik politikaları vardır ve bunları
          incelemenizi öneririz; söz konusu sitelerin içeriğinden veya
          uygulamalarından sorumlu değiliz.
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
          adresine gönderebilirsiniz. {PRODUCT.name},{" "}
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
  const href = "/privacy";

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

export default async function PrivacyPage({
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
        item: `${SITE_URL}${getPathname({ locale: l, href: "/privacy" })}`,
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
        {c.body(
          <>
            {DATA_SECTION[l]}
            {CONTACT_FORM_SECTION[l]}
          </>,
        )}
      </div>
    </article>
  );
}
