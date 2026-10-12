import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { Link, getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { sharedAlternates } from "@/i18n/alternates";

// ISR: re-render daily. The page's own copy is static, but the shared chrome
// (header language switcher, footer) lists the locales that are currently live,
// so a scheduled locale reaching its date must be able to appear here without a
// deploy. See @/i18n/locales.
export const revalidate = 86400;

const LAST_UPDATED = "2026-07-22";

const COPY = {
  en: {
    metaTitle: "Terms of Use",
    metaDescription:
      "The terms governing use of the Forex Market Hours web tool and mobile apps.",
    breadcrumb: "Terms of Use",
    h1: "Terms of Use",
    lead: (
      <>
        These terms govern your use of the {PRODUCT.name} web tool at {SITE_URL}{" "}
        and its companion iOS and Android apps, published by{" "}
        {PUBLISHER.displayName}.
      </>
    ),
    lastUpdated: (date: string) => <>Last updated: {date}.</>,
    body: (
      <>
        <blockquote>
          This is a general terms-of-use template intended to describe how the
          service actually works. It is not a substitute for legal advice, please
          have it reviewed by qualified counsel before relying on it for any dispute
          or compliance purpose.
        </blockquote>

        <h2>1. Acceptance of these terms</h2>
        <p>
          By accessing or using {PRODUCT.name} (the &quot;Service&quot;), you agree
          to these Terms of Use. If you do not agree, please do not use the Service.
        </p>

        <h2>2. Description of the service</h2>
        <p>
          {PRODUCT.name} is a market-hours utility that displays the open, close and
          overlap times of the major forex trading sessions, converted to your local
          timezone, along with related informational content. The Service is
          provided free of charge, with no account required for the web tool.
        </p>

        <h2>3. Not financial advice</h2>
        <p>
          The Service is provided for general, informational purposes only. It is
          not financial, investment, trading, tax or legal advice, and nothing in
          the Service should be treated as a recommendation to buy, sell, or hold any
          instrument. See our full{" "}
          <Link href="/disclaimer">risk and trading disclaimer</Link>.
        </p>

        <h2>4. No warranty of accuracy for trading decisions</h2>
        <p>
          While we make reasonable efforts to keep session times and associated
          content accurate (see our <Link href="/methodology">methodology</Link> and{" "}
          <Link href="/editorial-policy">editorial policy</Link>), the Service is
          provided &quot;as is&quot; and &quot;as available,&quot; without
          warranties of any kind, express or implied, including accuracy,
          completeness, or fitness for a particular purpose. You should independently
          verify any time-sensitive information before acting on it.
        </p>

        <h2>5. Acceptable use</h2>
        <p>
          You agree not to misuse the Service, including by attempting to disrupt it,
          scraping it at a disproportionate rate, reverse engineering the app beyond
          what applicable law permits, or using it for any unlawful purpose.
        </p>

        <h2>6. Intellectual property</h2>
        <p>
          The Service, including its design, text, graphics, and underlying code, is
          owned by {PUBLISHER.displayName} or its licensors and is protected by
          applicable intellectual-property laws. You may use the Service for
          personal, non-commercial purposes; you may not reproduce, redistribute, or
          create derivative products from it without our written permission.
        </p>

        <h2>7. Third-party links and app stores</h2>
        <p>
          The Service links to the Apple App Store and Google Play, and to
          third-party sources cited in our content. Your use of those platforms is
          governed by their own terms, which we do not control.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {PUBLISHER.displayName} shall not
          be liable for any indirect, incidental, or consequential damages, including
          trading losses, arising from your use of, or inability to use, the Service.
        </p>

        <h2>9. Governing entity</h2>
        <p>
          The Service is published by {PUBLISHER.displayName} ({PUBLISHER.legalName}).
        </p>

        <h2>10. Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the Service
          after a change constitutes acceptance of the updated terms.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
        </p>
      </>
    ),
  },
  es: {
    metaTitle: "Términos de uso",
    metaDescription:
      "Los términos que rigen el uso de la herramienta web y las apps para móvil de Horario del Mercado Forex.",
    breadcrumb: "Términos de uso",
    h1: "Términos de uso",
    lead: (
      <>
        Estos términos rigen tu uso de la herramienta web {PRODUCT.name} en{" "}
        {SITE_URL} y de sus apps para iOS y Android, publicadas por{" "}
        {PUBLISHER.displayName}.
      </>
    ),
    lastUpdated: (date: string) => <>Última actualización: {date}.</>,
    body: (
      <>
        <blockquote>
          Esta es una plantilla general de términos de uso destinada a describir cómo
          funciona realmente el servicio. No sustituye al asesoramiento jurídico:
          conviene que la revise un abogado cualificado antes de basar en ella
          cualquier disputa o cumplimiento normativo.
        </blockquote>

        <h2>1. Aceptación de estos términos</h2>
        <p>
          Al acceder a {PRODUCT.name} (el «Servicio») o utilizarlo, aceptas estos
          Términos de uso. Si no estás de acuerdo, te rogamos que no utilices el
          Servicio.
        </p>

        <h2>2. Descripción del servicio</h2>
        <p>
          {PRODUCT.name} es una utilidad de horarios de mercado que muestra las horas
          de apertura, cierre y solapamiento de las principales sesiones de trading
          forex, convertidas a tu zona horaria local, junto con contenido informativo
          relacionado. El Servicio se ofrece de forma gratuita y no requiere cuenta
          para la herramienta web.
        </p>

        <h2>3. No es asesoramiento financiero</h2>
        <p>
          El Servicio se ofrece únicamente con fines informativos generales. No es
          asesoramiento financiero, de inversión, de trading, fiscal o legal, y nada
          en el Servicio debe interpretarse como una recomendación para comprar,
          vender o mantener ningún instrumento. Consulta nuestro{" "}
          <Link href="/disclaimer">aviso de riesgo y trading</Link> completo.
        </p>

        <h2>4. Sin garantía de precisión para decisiones de trading</h2>
        <p>
          Aunque hacemos esfuerzos razonables por mantener la precisión de los
          horarios de sesión y del contenido relacionado (consulta nuestra{" "}
          <Link href="/methodology">metodología</Link> y nuestra{" "}
          <Link href="/editorial-policy">política editorial</Link>), el Servicio se
          ofrece «tal cual» y «según disponibilidad», sin garantías de ningún tipo,
          expresas o implícitas, incluidas la precisión, la integridad o la
          idoneidad para un fin concreto. Deberías verificar de forma independiente
          cualquier información sensible al tiempo antes de actuar en función de ella.
        </p>

        <h2>5. Uso aceptable</h2>
        <p>
          Te comprometes a no hacer un uso indebido del Servicio, lo que incluye
          intentar interrumpirlo, extraer datos a un ritmo desproporcionado, aplicar
          ingeniería inversa a la app más allá de lo que permita la ley aplicable o
          utilizarlo para cualquier fin ilícito.
        </p>

        <h2>6. Propiedad intelectual</h2>
        <p>
          El Servicio, incluidos su diseño, texto, gráficos y código subyacente, es
          propiedad de {PUBLISHER.displayName} o de sus licenciantes y está protegido
          por las leyes de propiedad intelectual aplicables. Puedes usar el Servicio
          con fines personales y no comerciales; no puedes reproducirlo,
          redistribuirlo ni crear productos derivados de él sin nuestro permiso por
          escrito.
        </p>

        <h2>7. Enlaces de terceros y tiendas de aplicaciones</h2>
        <p>
          El Servicio enlaza a la App Store de Apple y a Google Play, y a las fuentes
          de terceros citadas en nuestro contenido. Tu uso de esas plataformas se
          rige por sus propios términos, que no controlamos.
        </p>

        <h2>8. Limitación de responsabilidad</h2>
        <p>
          En la máxima medida permitida por la ley, {PUBLISHER.displayName} no será
          responsable de daños indirectos, incidentales o consecuentes, incluidas las
          pérdidas por operaciones, derivados de tu uso del Servicio o de la
          imposibilidad de usarlo.
        </p>

        <h2>9. Entidad responsable</h2>
        <p>
          El Servicio está publicado por {PUBLISHER.displayName} ({PUBLISHER.legalName}).
        </p>

        <h2>10. Cambios en estos términos</h2>
        <p>
          Podemos actualizar estos términos de vez en cuando. El uso continuado del
          Servicio tras un cambio constituye la aceptación de los términos
          actualizados.
        </p>

        <h2>11. Contacto</h2>
        <p>
          Las preguntas sobre estos términos pueden enviarse a{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
        </p>
      </>
    ),
  },
  fr: {
    metaTitle: "Conditions d’utilisation",
    metaDescription:
      "Les conditions régissant l’utilisation de l’outil web Forex Market Hours et de ses applications mobiles.",
    breadcrumb: "Conditions d’utilisation",
    h1: "Conditions d’utilisation",
    lead: (
      <>
        Les présentes conditions régissent votre utilisation de l’outil web{" "}
        {PRODUCT.name} disponible sur {SITE_URL} et des applications iOS et Android
        qui l’accompagnent, publiées par {PUBLISHER.displayName}.
      </>
    ),
    lastUpdated: (date: string) => <>Dernière mise à jour : {date}.</>,
    body: (
      <>
        <blockquote>
          Il s’agit d’un modèle général de conditions d’utilisation destiné à
          décrire le fonctionnement réel du service. Il ne remplace pas un conseil
          juridique : faites-le relire par un conseil qualifié avant de vous y fier
          à des fins contentieuses ou de conformité.
        </blockquote>

        <h2>1. Acceptation des présentes conditions</h2>
        <p>
          En accédant à {PRODUCT.name} (le « Service ») ou en l’utilisant, vous
          acceptez les présentes conditions d’utilisation. Si vous ne les acceptez
          pas, veuillez ne pas utiliser le Service.
        </p>

        <h2>2. Description du service</h2>
        <p>
          {PRODUCT.name} est un utilitaire d’horaires de marché qui affiche les
          heures d’ouverture, de fermeture et de chevauchement des grandes séances
          de trading forex, converties dans votre fuseau horaire local, ainsi que
          des contenus informatifs associés. Le Service est fourni gratuitement et
          l’outil web ne nécessite aucun compte.
        </p>

        <h2>3. Aucun conseil financier</h2>
        <p>
          Le Service est fourni à des fins d’information générale uniquement. Il ne
          constitue ni un conseil financier, d’investissement, de trading, fiscal ou
          juridique, et rien dans le Service ne doit être considéré comme une
          recommandation d’acheter, de vendre ou de conserver un instrument. Voir
          notre <Link href="/disclaimer">avertissement complet sur les risques</Link>.
        </p>

        <h2>4. Aucune garantie d’exactitude pour vos décisions de trading</h2>
        <p>
          Bien que nous fassions des efforts raisonnables pour maintenir l’exactitude
          des horaires de séance et des contenus associés (voir notre{" "}
          <Link href="/methodology">méthodologie</Link> et notre{" "}
          <Link href="/editorial-policy">politique éditoriale</Link>), le Service est
          fourni « en l’état » et « selon disponibilité », sans garantie d’aucune
          sorte, expresse ou implicite, y compris quant à l’exactitude, à
          l’exhaustivité ou à l’adéquation à un usage particulier. Il vous appartient
          de vérifier de manière indépendante toute information sensible au temps
          avant d’agir en conséquence.
        </p>

        <h2>5. Utilisation acceptable</h2>
        <p>
          Vous vous engagez à ne pas détourner l’usage du Service, notamment en
          tentant de le perturber, en l’extrayant à un rythme disproportionné, en
          procédant à une ingénierie inverse de l’application au-delà de ce que la
          loi applicable autorise, ou en l’utilisant à des fins illicites.
        </p>

        <h2>6. Propriété intellectuelle</h2>
        <p>
          Le Service, y compris son design, ses textes, ses graphismes et son code
          sous-jacent, appartient à {PUBLISHER.displayName} ou à ses concédants de
          licence et est protégé par les lois applicables en matière de propriété
          intellectuelle. Vous pouvez utiliser le Service à des fins personnelles et
          non commerciales ; vous ne pouvez ni le reproduire, ni le redistribuer, ni
          en tirer des produits dérivés sans notre autorisation écrite.
        </p>

        <h2>7. Liens tiers et boutiques d’applications</h2>
        <p>
          Le Service renvoie vers l’App Store d’Apple et Google Play, ainsi que vers
          les sources tierces citées dans nos contenus. Votre utilisation de ces
          plateformes est régie par leurs propres conditions, que nous ne
          contrôlons pas.
        </p>

        <h2>8. Limitation de responsabilité</h2>
        <p>
          Dans toute la mesure permise par la loi, {PUBLISHER.displayName} ne saurait
          être tenue responsable de tout dommage indirect, accessoire ou consécutif,
          y compris les pertes de trading, résultant de votre utilisation du Service
          ou de l’impossibilité de l’utiliser.
        </p>

        <h2>9. Entité éditrice</h2>
        <p>
          Le Service est publié par {PUBLISHER.displayName} ({PUBLISHER.legalName}).
        </p>

        <h2>10. Modification des présentes conditions</h2>
        <p>
          Nous pouvons mettre à jour ces conditions de temps à autre. La poursuite de
          l’utilisation du Service après une modification vaut acceptation des
          conditions mises à jour.
        </p>

        <h2>11. Contact</h2>
        <p>
          Les questions relatives aux présentes conditions peuvent être envoyées à{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
        </p>
      </>
    ),
  },
  pt: {
    metaTitle: "Termos de Uso",
    metaDescription:
      "Os termos que regem o uso da ferramenta web Forex Market Hours e dos seus apps para celular.",
    breadcrumb: "Termos de Uso",
    h1: "Termos de Uso",
    lead: (
      <>
        Estes termos regem o seu uso da ferramenta web {PRODUCT.name} em {SITE_URL}{" "}
        e dos apps complementares para iOS e Android, publicados pela{" "}
        {PUBLISHER.displayName}.
      </>
    ),
    lastUpdated: (date: string) => <>Última atualização: {date}.</>,
    body: (
      <>
        <blockquote>
          Este é um modelo geral de termos de uso destinado a descrever como o
          serviço realmente funciona. Ele não substitui uma orientação jurídica;
          peça que um advogado qualificado o revise antes de se basear nele para
          qualquer disputa ou finalidade de conformidade.
        </blockquote>

        <h2>1. Aceitação destes termos</h2>
        <p>
          Ao acessar ou usar o {PRODUCT.name} (o “Serviço”), você concorda com
          estes Termos de Uso. Se não concordar, por favor, não use o Serviço.
        </p>

        <h2>2. Descrição do serviço</h2>
        <p>
          O {PRODUCT.name} é um utilitário de horários de mercado que exibe os
          horários de abertura, fechamento e sobreposição das principais sessões de
          negociação do forex, convertidos para o seu fuso horário local, junto com
          conteúdo informativo relacionado. O Serviço é oferecido gratuitamente, e a
          ferramenta web não exige conta.
        </p>

        <h2>3. Não é aconselhamento financeiro</h2>
        <p>
          O Serviço é fornecido apenas para fins gerais e informativos. Ele não é
          aconselhamento financeiro, de investimentos, de trading, tributário ou
          jurídico, e nada no Serviço deve ser tratado como recomendação para
          comprar, vender ou manter qualquer instrumento. Veja nosso{" "}
          <Link href="/disclaimer">aviso completo sobre riscos e trading</Link>.
        </p>

        <h2>4. Sem garantia de precisão para decisões de trading</h2>
        <p>
          Embora façamos esforços razoáveis para manter precisos os horários das
          sessões e o conteúdo relacionado (veja nossa{" "}
          <Link href="/methodology">metodologia</Link> e nossa{" "}
          <Link href="/editorial-policy">política editorial</Link>), o Serviço é
          fornecido “no estado em que se encontra” e “conforme disponível”, sem
          garantias de qualquer tipo, expressas ou implícitas, incluindo precisão,
          integridade ou adequação a uma finalidade específica. Você deve verificar
          de forma independente qualquer informação sensível ao tempo antes de agir
          com base nela.
        </p>

        <h2>5. Uso aceitável</h2>
        <p>
          Você concorda em não fazer mau uso do Serviço, incluindo tentar
          interrompê-lo, extrair dados dele em um ritmo desproporcional, fazer
          engenharia reversa do app além do que a lei aplicável permite ou usá-lo
          para qualquer finalidade ilegal.
        </p>

        <h2>6. Propriedade intelectual</h2>
        <p>
          O Serviço, incluindo seu design, textos, gráficos e código subjacente,
          pertence à {PUBLISHER.displayName} ou aos seus licenciadores e é protegido
          pelas leis de propriedade intelectual aplicáveis. Você pode usar o Serviço
          para fins pessoais e não comerciais; não pode reproduzi-lo, redistribuí-lo
          nem criar produtos derivados dele sem nossa autorização por escrito.
        </p>

        <h2>7. Links de terceiros e lojas de apps</h2>
        <p>
          O Serviço contém links para a App Store da Apple e para o Google Play,
          além de fontes de terceiros citadas no nosso conteúdo. O seu uso dessas
          plataformas é regido pelos termos delas, que não controlamos.
        </p>

        <h2>8. Limitação de responsabilidade</h2>
        <p>
          Na máxima extensão permitida por lei, a {PUBLISHER.displayName} não será
          responsável por quaisquer danos indiretos, incidentais ou consequentes,
          incluindo perdas em operações, decorrentes do seu uso, ou da
          impossibilidade de uso, do Serviço.
        </p>

        <h2>9. Entidade responsável</h2>
        <p>
          O Serviço é publicado pela {PUBLISHER.displayName} ({PUBLISHER.legalName}).
        </p>

        <h2>10. Alterações nestes termos</h2>
        <p>
          Podemos atualizar estes termos de tempos em tempos. Continuar usando o
          Serviço após uma alteração significa aceitar os termos atualizados.
        </p>

        <h2>11. Contato</h2>
        <p>
          Dúvidas sobre estes termos podem ser enviadas para{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
        </p>
      </>
    ),
  },
  it: {
    metaTitle: "Termini di utilizzo",
    metaDescription:
      "I termini che regolano l’utilizzo dello strumento web Forex Market Hours e delle relative app mobili.",
    breadcrumb: "Termini di utilizzo",
    h1: "Termini di utilizzo",
    lead: (
      <>
        I presenti termini regolano l’utilizzo dello strumento web {PRODUCT.name}{" "}
        disponibile su {SITE_URL} e delle app per iOS e Android che lo
        accompagnano, pubblicati da {PUBLISHER.displayName}.
      </>
    ),
    lastUpdated: (date: string) => <>Ultimo aggiornamento: {date}.</>,
    body: (
      <>
        <blockquote>
          Questo è un modello generale di termini di utilizzo pensato per descrivere
          il funzionamento effettivo del servizio. Non sostituisce una consulenza
          legale: fallo esaminare da un legale qualificato prima di farvi
          affidamento per qualsiasi controversia o finalità di conformità.
        </blockquote>

        <h2>1. Accettazione dei presenti termini</h2>
        <p>
          Accedendo a {PRODUCT.name} (il «Servizio») o utilizzandolo, accetti i
          presenti Termini di utilizzo. Se non li accetti, ti preghiamo di non
          utilizzare il Servizio.
        </p>

        <h2>2. Descrizione del servizio</h2>
        <p>
          {PRODUCT.name} è un’utility per gli orari di mercato che mostra gli orari
          di apertura, chiusura e sovrapposizione delle principali sessioni di
          trading forex, convertiti nel tuo fuso orario locale, insieme a contenuti
          informativi correlati. Il Servizio è fornito gratuitamente e lo strumento
          web non richiede alcun account.
        </p>

        <h2>3. Non è consulenza finanziaria</h2>
        <p>
          Il Servizio è fornito esclusivamente a scopo informativo generale. Non
          costituisce consulenza finanziaria, d’investimento, di trading, fiscale o
          legale, e nulla nel Servizio deve essere considerato una raccomandazione
          ad acquistare, vendere o detenere alcuno strumento. Consulta le nostre{" "}
          <Link href="/disclaimer">avvertenze complete su rischi e trading</Link>.
        </p>

        <h2>4. Nessuna garanzia di accuratezza per le decisioni di trading</h2>
        <p>
          Pur impegnandoci in modo ragionevole per mantenere accurati gli orari
          delle sessioni e i contenuti correlati (consulta la nostra{" "}
          <Link href="/methodology">metodologia</Link> e la nostra{" "}
          <Link href="/editorial-policy">politica editoriale</Link>), il Servizio è
          fornito «così com’è» e «come disponibile», senza garanzie di alcun tipo,
          esplicite o implicite, incluse quelle di accuratezza, completezza o
          idoneità a uno scopo particolare. Ti invitiamo a verificare in modo
          indipendente qualsiasi informazione legata agli orari prima di agire di
          conseguenza.
        </p>

        <h2>5. Uso consentito</h2>
        <p>
          Ti impegni a non fare un uso improprio del Servizio, ad esempio tentando
          di interromperne il funzionamento, estraendone i contenuti in modo
          automatizzato con una frequenza sproporzionata, decompilando l’app oltre
          quanto consentito dalla legge applicabile o utilizzandolo per scopi
          illeciti.
        </p>

        <h2>6. Proprietà intellettuale</h2>
        <p>
          Il Servizio, compresi il design, i testi, la grafica e il codice
          sottostante, è di proprietà di {PUBLISHER.displayName} o dei suoi
          licenzianti ed è tutelato dalle leggi applicabili in materia di proprietà
          intellettuale. Puoi utilizzare il Servizio per scopi personali e non
          commerciali; non puoi riprodurlo, ridistribuirlo o crearne prodotti
          derivati senza la nostra autorizzazione scritta.
        </p>

        <h2>7. Link di terze parti e app store</h2>
        <p>
          Il Servizio contiene link all’Apple App Store e a Google Play, oltre che a
          fonti di terze parti citate nei nostri contenuti. L’utilizzo di queste
          piattaforme è regolato dai rispettivi termini, sui quali non abbiamo alcun
          controllo.
        </p>

        <h2>8. Limitazione di responsabilità</h2>
        <p>
          Nella misura massima consentita dalla legge, {PUBLISHER.displayName} non
          sarà responsabile di alcun danno indiretto, incidentale o consequenziale,
          incluse le perdite di trading, derivante dall’utilizzo del Servizio o
          dall’impossibilità di utilizzarlo.
        </p>

        <h2>9. Soggetto responsabile</h2>
        <p>
          Il Servizio è pubblicato da {PUBLISHER.displayName} ({PUBLISHER.legalName}).
        </p>

        <h2>10. Modifiche ai presenti termini</h2>
        <p>
          Possiamo aggiornare questi termini di tanto in tanto. L’uso continuato del
          Servizio dopo una modifica costituisce accettazione dei termini
          aggiornati.
        </p>

        <h2>11. Contatti</h2>
        <p>
          Puoi inviare domande su questi termini all’indirizzo{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>.
        </p>
      </>
    ),
  },
  de: {
    metaTitle: "Nutzungsbedingungen",
    metaDescription:
      "Die Bedingungen für die Nutzung des Web-Tools Forex Market Hours und der zugehörigen mobilen Apps.",
    breadcrumb: "Nutzungsbedingungen",
    h1: "Nutzungsbedingungen",
    lead: (
      <>
        Diese Bedingungen regeln Ihre Nutzung des Web-Tools {PRODUCT.name} unter{" "}
        {SITE_URL} und der begleitenden Apps für iOS und Android, herausgegeben
        von {PUBLISHER.displayName}.
      </>
    ),
    lastUpdated: (date: string) => <>Zuletzt aktualisiert: {date}.</>,
    body: (
      <>
        <blockquote>
          Dies ist eine allgemeine Vorlage für Nutzungsbedingungen, die
          beschreiben soll, wie der Dienst tatsächlich funktioniert. Sie ersetzt
          keine Rechtsberatung. Bitte lassen Sie sie von einem qualifizierten
          Rechtsbeistand prüfen, bevor Sie sich bei einem Streitfall oder für
          Compliance-Zwecke darauf stützen.
        </blockquote>

        <h2>1. Annahme dieser Bedingungen</h2>
        <p>
          Indem Sie {PRODUCT.name} (den „Dienst“) aufrufen oder nutzen, stimmen
          Sie diesen Nutzungsbedingungen zu. Wenn Sie nicht einverstanden sind,
          nutzen Sie den Dienst bitte nicht.
        </p>

        <h2>2. Beschreibung des Dienstes</h2>
        <p>
          {PRODUCT.name} ist ein Tool für Handelszeiten, das die Öffnungs-,
          Schließungs- und Überschneidungszeiten der großen Forex-Handelssitzungen
          umgerechnet in Ihre lokale Zeitzone anzeigt, zusammen mit zugehörigen
          informativen Inhalten. Der Dienst wird kostenlos bereitgestellt, und für
          das Web-Tool ist kein Konto erforderlich.
        </p>

        <h2>3. Keine Finanzberatung</h2>
        <p>
          Der Dienst dient ausschließlich allgemeinen Informationszwecken. Er
          stellt keine Finanz-, Anlage-, Handels-, Steuer- oder Rechtsberatung dar,
          und nichts im Dienst sollte als Empfehlung verstanden werden, ein
          Instrument zu kaufen, zu verkaufen oder zu halten. Siehe unseren
          vollständigen <Link href="/disclaimer">Risiko- und Handelshinweis</Link>.
        </p>

        <h2>4. Keine Gewähr für die Genauigkeit bei Handelsentscheidungen</h2>
        <p>
          Wir unternehmen zwar angemessene Anstrengungen, um Session-Zeiten und
          zugehörige Inhalte genau zu halten (siehe unsere{" "}
          <Link href="/methodology">Methodik</Link> und unsere{" "}
          <Link href="/editorial-policy">redaktionellen Richtlinien</Link>), doch
          der Dienst wird „wie besehen“ und „wie verfügbar“ bereitgestellt, ohne
          ausdrückliche oder stillschweigende Gewährleistung jeglicher Art,
          einschließlich Genauigkeit, Vollständigkeit oder Eignung für einen
          bestimmten Zweck. Sie sollten zeitkritische Informationen unabhängig
          überprüfen, bevor Sie danach handeln.
        </p>

        <h2>5. Zulässige Nutzung</h2>
        <p>
          Sie verpflichten sich, den Dienst nicht zu missbrauchen, etwa indem Sie
          versuchen, ihn zu stören, ihn in unverhältnismäßigem Umfang automatisiert
          auszulesen, die App über das gesetzlich zulässige Maß hinaus
          zurückzuentwickeln oder ihn für rechtswidrige Zwecke zu verwenden.
        </p>

        <h2>6. Geistiges Eigentum</h2>
        <p>
          Der Dienst, einschließlich Design, Texten, Grafiken und zugrunde
          liegendem Code, ist Eigentum von {PUBLISHER.displayName} oder seinen
          Lizenzgebern und durch die geltenden Gesetze zum Schutz des geistigen
          Eigentums geschützt. Sie dürfen den Dienst für persönliche,
          nichtkommerzielle Zwecke nutzen; ohne unsere schriftliche Genehmigung
          dürfen Sie ihn weder vervielfältigen noch weiterverbreiten noch
          abgeleitete Produkte daraus erstellen.
        </p>

        <h2>7. Links zu Dritten und App-Stores</h2>
        <p>
          Der Dienst verlinkt auf den Apple App Store und Google Play sowie auf
          Quellen Dritter, die in unseren Inhalten zitiert werden. Ihre Nutzung
          dieser Plattformen unterliegt deren eigenen Bedingungen, auf die wir
          keinen Einfluss haben.
        </p>

        <h2>8. Haftungsbeschränkung</h2>
        <p>
          Soweit gesetzlich zulässig, haftet {PUBLISHER.displayName} nicht für
          indirekte, zufällige oder Folgeschäden, einschließlich Handelsverlusten,
          die aus Ihrer Nutzung des Dienstes oder der Unmöglichkeit seiner Nutzung
          entstehen.
        </p>

        <h2>9. Verantwortliche Stelle</h2>
        <p>
          Der Dienst wird herausgegeben von {PUBLISHER.displayName} ({PUBLISHER.legalName}).
        </p>

        <h2>10. Änderungen dieser Bedingungen</h2>
        <p>
          Wir können diese Bedingungen von Zeit zu Zeit aktualisieren. Wenn Sie
          den Dienst nach einer Änderung weiter nutzen, gilt dies als Annahme der
          aktualisierten Bedingungen.
        </p>

        <h2>11. Kontakt</h2>
        <p>
          Fragen zu diesen Bedingungen können Sie an{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          senden.
        </p>
      </>
    ),
  },
  tr: {
    metaTitle: "Kullanım Koşulları",
    metaDescription:
      "Forex Market Hours web aracının ve mobil uygulamalarının kullanımına ilişkin koşullar.",
    breadcrumb: "Kullanım Koşulları",
    h1: "Kullanım Koşulları",
    lead: (
      <>
        Bu koşullar, {PUBLISHER.displayName} tarafından yayımlanan, {SITE_URL}{" "}
        adresindeki {PRODUCT.name} web aracını ve ona eşlik eden iOS ve Android
        uygulamalarını kullanımınızı düzenler.
      </>
    ),
    lastUpdated: (date: string) => <>Son güncelleme: {date}.</>,
    body: (
      <>
        <blockquote>
          Bu metin, hizmetin fiilen nasıl işlediğini açıklamayı amaçlayan genel bir
          kullanım koşulları şablonudur. Hukuki danışmanlığın yerini tutmaz; herhangi
          bir uyuşmazlık veya mevzuata uyum amacıyla bu metne dayanmadan önce
          lütfen yetkin bir hukuk danışmanına inceletin.
        </blockquote>

        <h2>1. Bu koşulların kabulü</h2>
        <p>
          {PRODUCT.name} hizmetine (“Hizmet”) erişerek veya Hizmeti kullanarak bu
          Kullanım Koşullarını kabul etmiş olursunuz. Kabul etmiyorsanız lütfen
          Hizmeti kullanmayın.
        </p>

        <h2>2. Hizmetin tanımı</h2>
        <p>
          {PRODUCT.name}, başlıca forex işlem seanslarının açılış, kapanış ve
          çakışma saatlerini yerel saat diliminize çevrilmiş olarak gösteren ve
          bunlarla ilgili bilgilendirici içerikler sunan bir piyasa saatleri
          aracıdır. Hizmet ücretsiz olarak sunulur; web aracı için hesap gerekmez.
        </p>

        <h2>3. Finansal tavsiye değildir</h2>
        <p>
          Hizmet yalnızca genel bilgilendirme amacıyla sunulmaktadır. Finansal,
          yatırım, işlem, vergi veya hukuki tavsiye niteliği taşımaz ve Hizmetteki
          hiçbir içerik herhangi bir aracın alınması, satılması veya elde tutulması
          yönünde bir öneri olarak değerlendirilmemelidir. Ayrıntılar için{" "}
          <Link href="/disclaimer">risk ve işlem sorumluluk reddi</Link> metninin
          tamamına bakın.
        </p>

        <h2>4. İşlem kararları için doğruluk garantisi verilmez</h2>
        <p>
          Seans saatlerini ve ilgili içeriği doğru tutmak için makul çabayı
          göstermemize rağmen (bkz. <Link href="/methodology">metodolojimiz</Link> ve{" "}
          <Link href="/editorial-policy">yayın ilkelerimiz</Link>), Hizmet doğruluk,
          eksiksizlik veya belirli bir amaca uygunluk dahil olmak üzere açık ya da
          zımni hiçbir garanti verilmeksizin “olduğu gibi” ve “mevcut olduğu
          şekliyle” sunulur. Zamana duyarlı herhangi bir bilgiye dayanarak hareket
          etmeden önce bu bilgiyi bağımsız olarak doğrulamanız gerekir.
        </p>

        <h2>5. Kabul edilebilir kullanım</h2>
        <p>
          Hizmeti kötüye kullanmamayı kabul edersiniz; buna Hizmeti aksatmaya
          çalışmak, orantısız bir hızla veri kazımak, uygulamada yürürlükteki
          mevzuatın izin verdiği sınırın ötesinde tersine mühendislik yapmak veya
          Hizmeti hukuka aykırı herhangi bir amaçla kullanmak dahildir.
        </p>

        <h2>6. Fikri mülkiyet</h2>
        <p>
          Tasarımı, metinleri, grafikleri ve altyapı kodu dahil olmak üzere Hizmet,{" "}
          {PUBLISHER.displayName} veya lisans verenlerinin mülkiyetindedir ve
          yürürlükteki fikri mülkiyet mevzuatıyla korunur. Hizmeti kişisel ve ticari
          olmayan amaçlarla kullanabilirsiniz; yazılı iznimiz olmadan Hizmeti
          çoğaltamaz, yeniden dağıtamaz veya Hizmetten türev ürünler oluşturamazsınız.
        </p>

        <h2>7. Üçüncü taraf bağlantıları ve uygulama mağazaları</h2>
        <p>
          Hizmet, Apple App Store’a ve Google Play’e ve içeriğimizde atıf yapılan
          üçüncü taraf kaynaklara bağlantı verir. Bu platformları kullanımınız,
          kontrolümüzde olmayan kendi koşullarına tabidir.
        </p>

        <h2>8. Sorumluluğun sınırlandırılması</h2>
        <p>
          Yürürlükteki hukukun izin verdiği azami ölçüde, {PUBLISHER.displayName},
          Hizmeti kullanmanızdan veya kullanamamanızdan doğan, işlem zararları dahil
          hiçbir dolaylı, arızi veya netice kabilinden zarardan sorumlu tutulamaz.
        </p>

        <h2>9. Hizmeti sunan kuruluş</h2>
        <p>
          Hizmet, {PUBLISHER.displayName} ({PUBLISHER.legalName}) tarafından
          yayımlanmaktadır.
        </p>

        <h2>10. Bu koşullarda yapılacak değişiklikler</h2>
        <p>
          Bu koşulları zaman zaman güncelleyebiliriz. Bir değişiklikten sonra
          Hizmeti kullanmaya devam etmeniz, güncellenmiş koşulları kabul ettiğiniz
          anlamına gelir.
        </p>

        <h2>11. İletişim</h2>
        <p>
          Bu koşullarla ilgili sorularınızı{" "}
          <a href="mailto:info@forexmarkethours.app">info@forexmarkethours.app</a>{" "}
          adresine gönderebilirsiniz.
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
  const href = "/terms";

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

export default async function TermsPage({
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
        item: `${SITE_URL}${getPathname({ locale: l, href: "/terms" })}`,
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
        {c.body}
      </div>
    </article>
  );
}
