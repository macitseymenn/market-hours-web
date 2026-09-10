# Dil Ekleme Handbook - Forex Market Hours

Bu dosya, siteye yeni bir dil eklerken tek referanstir. Blog yazisi uretimi icin
`SEO-GUIDELINES.md`'e bak; bu dosya bir DILIN nasil eklendigini anlatir.

> Hedef tempo: haftada bir dil. Sistem bunu destekleyecek sekilde kuruldu,
> yani mekanizma otomatik, is yuku ceviridir.

**Temel gercekler:**
- Dil kayitlari `src/i18n/locales.ts` icindeki `LOCALES` dizisindedir. Tek kaynak orasidir.
- Bir dil `availableFrom` gununde 00:00 UTC'de kendiliginden canliya cikar. Deploy gerekmez (Bolum 3).
- Routing, hreflang, sitemap, dil secici, llms.txt hepsi bu registry'den turer. Elle duzenlenmez (Bolum 5).
- Derleyici, o dilin eksik cevirilerini tek tek listeler. Checklist odur (Bolum 4).
- Blog yazilari kismi cevrilebilir; cevrilmemis yazi o dilde hic gorunmez (Bolum 6).

---
---

# BOLUM 1: BIR DIL NASIL EKLENIR (workflow)

1. **Registry'ye ekle.** `src/i18n/locales.ts` icindeki `LOCALES` dizisine yeni
   bir kayit koy. `availableFrom` degerini yayina cikmasini istedigin gune ver
   (ileri tarih):

   ```ts
   {
     code: "fr",
     name: "Francais",          // endonym, dil secicide bu gorunur
     intl: "fr-FR",             // tarih/liste bicimlendirme
     intlClock: "fr-FR",        // canli saat (en disinda intl ile ayni)
     ogLocale: "fr_FR",
     dir: "ltr",
     availableFrom: "2026-09-17",
   },
   ```

2. **Derleyiciyi calistir:** `npx tsc --noEmit`. Cikan her hata, o dilin eksik
   bir cevirisidir. Liste Bolum 4'te.

3. **Mesaj katalogunu olustur.** `messages/en.json`'u `messages/fr.json` olarak
   kopyala ve her degeri cevir. Anahtarlari DEGISTIRME.

4. **Sayfa metinlerini cevir.** Bolum 4'teki dosyalarin her birindeki
   `Record<Locale, ...>` objelerine yeni dilin girisini ekle.

5. **Localized slug'lari ekle.** `src/i18n/routing.ts` icindeki `pathnames`
   girdilerine o dilin dogal slug'larini yaz (ornek `"/about": { ..., fr: "/a-propos" }`).
   Slug vermezsen o rota Ingilizce yolu kullanir, bu kabul edilebilir ama SEO
   acisindan zayiftir.

6. **Blog yazilarini cevir.** En az 5 yazi (Bolum 6). Her yazinin `slug`,
   `title`, `description`, `tags`, `body` alanlarina yeni dili ekle.

7. **Kontrol et:** `npm run check:locales`. Rapor temiz olmali.

8. **Dogrula:** `npx tsc --noEmit`, `npm run lint`, `npm run build` uculu temiz
   gecmeli. Taslagi gormek icin `LOCALE_SHOW_DRAFTS=1 npm run dev`.

9. **Commit et.** Tarih gelene kadar dil gorunmez. Kendi gununde acilir.

---
---

# BOLUM 2: REGISTRY ALANLARI

| Alan | Ne ise yarar |
|---|---|
| `code` | URL prefix'i ve hreflang kodu (`/fr/...`, `hreflang="fr"`) |
| `name` | Dil secicide gorunen ad. **Endonym yaz** ("Francais", "French" degil) |
| `intl` | Blog tarihleri, "verified {ay}" satiri, piyasa durumu listesi icin BCP-47 etiketi |
| `intlClock` | Canli seans saatinin etiketi. `en` disinda `intl` ile ayni yaz |
| `ogLocale` | OpenGraph `og:locale` degeri (`fr_FR`) |
| `dir` | `ltr` veya `rtl`. `<html dir>` buradan gelir |
| `availableFrom` | Yayin gunu (ISO). Bastan beri canli diller icin alani hic yazma |

`intlClock` neden ayri: Ingilizce prose tarihleri Britanya sirasinda ("22 Jul"),
canli saat ise ABD sirasinda ("Jul 22") render ediyor. Bu mevcut davranis, ikisi
birlestirilirse ekrandaki cikti degisir. Diger her dilde iki alan ayni.

---
---

# BOLUM 3: ZAMANLANMIS DIL YAYINI

Blog'un `date` kapisiyla ayni mantik, bir seviye yukarisi.

- Dil `availableFrom` gununde **00:00 UTC**'de acilir.
- O ana kadar dil `routing.locales` icinde YOKTUR. Bunun sonucu:
  - URL'leri 404 doner (layout `hasLocale` uzerinden `notFound()` cagirir),
  - `localeDetection` ziyaretciyi oraya yonlendirmez (Fransiz tarayici `/fr`'ye dusmez),
  - dil secicide, sitemap'te, hreflang alternatiflerinde ve alternate-links
    header'inda gorunmez.
- Yani yarim kalmis bir dil guvenle commit edilebilir. Ziyaretci ve crawler icin
  o dil henuz mevcut degildir.

**Deploy gerekmemesinin sebebi:** her sayfa ISR ile yeniden render oluyor.
Anasayfa 5 dakika, blog/yazar/sitemap/llms.txt saatlik, legal sayfalar gunluk.
Kapi acildiktan sonra en gec 24 saat icinde tum yuzeyler yeni dili gosterir.
Aninda gorunmesini istersen bir deploy tetiklemen yeterli.

**Taslak onizleme:** `LOCALE_SHOW_DRAFTS=1` ortam degiskeni (ornek Netlify deploy
preview) tarihi gelmemis dilleri de acar.

---
---

# BOLUM 4: DERLEYICI = CEVIRI CHECKLIST'I

`LocaleCode` tipi dogrudan `LOCALES` dizisinden turetilir. Registry'ye bir kayit
ekledigin an, koddaki her `Record<LocaleCode, T>` objesi eksik kalir ve TypeScript
tam olarak neyin cevrilmesi gerektigini soyler.

`fr` eklendiginde cikan liste (9 dosya, 21 hata):

| Dosya | Ne isteniyor |
|---|---|
| `src/app/[locale]/layout.tsx` | `HOME_META`: anasayfa title + description |
| `src/app/[locale]/about/page.tsx` | `COPY`: tum sayfa metni |
| `src/app/[locale]/methodology/page.tsx` | `COPY` + `SOURCES` bolumu |
| `src/app/[locale]/editorial-policy/page.tsx` | `COPY` |
| `src/app/[locale]/privacy/page.tsx` | `COPY` + `DATA_SECTION` |
| `src/app/[locale]/terms/page.tsx` | `COPY` |
| `src/app/[locale]/disclaimer/page.tsx` | `COPY` |
| `src/app/[locale]/contact/page.tsx` | `COPY` |
| `src/app/[locale]/lotwise-privacy/page.tsx` | `COPY` + `DATA_SECTION` |

Derleyicinin GOREMEDIGI iki sey var, onlari `npm run check:locales` raporlar:
- `messages/<code>.json` parite durumu (JSON tipli degil),
- blog yazisi kapsamasi.

Routing, sitemap, hreflang, dil secici hata VERMEZ, cunku bunlar registry'den
otomatik turer. Yeni dil icin bu dosyalara dokunmana gerek yok.

---
---

# BOLUM 5: OTOMATIK URETILENLER (elle yazma)

| Cikti | Nereden |
|---|---|
| `routing.locales` | `liveLocaleCodes()`, tarih kapisindan gecen diller |
| Canonical + hreflang (tum sayfalar) | `alternatesFor()` / `sharedAlternates()`, canli diller uzerinden |
| `x-default` | Varsayilan dil (`en`) surumu, yoksa render edilen dil |
| Sitemap `<url>` + `xhtml:link` ciftleri | Sadece o URL'in GERCEKTEN var oldugu diller |
| Dil secici | `routing.locales` + registry `name` (endonym) |
| `<html lang>` / `<html dir>` | Aktif locale + registry `dir` |
| `og:locale` | Registry `ogLocale` |
| Tarih/saat/liste bicimi | Registry `intl` / `intlClock` |
| Ekran goruntusu klasoru | O dilin kendi seti varsa o, yoksa `en` |
| `llms.txt` dil listesi | Canli diller |

---
---

# BOLUM 6: DIL BASINA YAYIN KAPSAMI

Bir dil su kapsamla acilir:

- [ ] `messages/<code>.json` %100 (238 anahtar)
- [ ] 9 sayfanin `COPY` objesi (Bolum 4)
- [ ] `routing.ts` icinde lokalize slug'lar
- [ ] **En az 5 blog yazisi** cevrilmis

Kalan 10 yazi sonraki haftalarda doldurulur. Bu guvenlidir cunku blog icerigi
`Partial<Record<BlogLocale, T>>` tipinde ve yazi bazinda kapi var:

- Cevrilmemis yazi o dilde listelenmez, URL'i 404 doner, sitemap'e girmez.
- O yazinin hreflang alternatifleri sadece cevrildigi dilleri gosterir.
- Ana sayfadaki ilgili-okuma linkleri, hedef o dilde yoksa gizlenir.

Yani hicbir zaman baska dilde icerik gosteren bir sayfa ya da 404'e giden bir
hreflang olusmaz. Google'in ince/otomatik ceviri politikasina takilmamak icin
kural: **eksik yaziyi Ingilizce'ye dusurme, hic gosterme.**

Ilk 5 yazi secimi: hub yazisi (`forex-trading-sessions-explained`) + o pazarda
en yuksek hacimli 4 sorgu.

---
---

# BOLUM 7: KONTROL SCRIPTI

```bash
npm run check:locales             # rapor, CANLI bir dil eksikse exit 1
node scripts/check-locales.mjs --strict   # zamanlanmis diller icin de exit 1
```

Ornek cikti:

```
ok    en     LIVE                 messages 238/238  posts 15/15  screenshots own
ok    es     LIVE                 messages 238/238  posts 15/15  screenshots own
MISS  fr     scheduled 2026-09-17 messages 201/238  posts 3/15   screenshots falls back to en
        · 37 untranslated message keys
        · only 3 translated posts (want 5+)
          missing key: home.faq.items
          ...
```

`availableFrom` tarihini vermeden once ve tarih gelmeden once calistir.

---
---

# BOLUM 8: CEVIRI KALITE KURALLARI (YMYL)

Site finans konusunda, yani Google'in YMYL standartlari gecerli.

- Ceviri **ozet degil, tam parite** olmali: ayni bolumler, ayni tablolar, ayni
  kaynaklar, ayni sayilar.
- Saat verileri her dilde ayni: "GMT standard time" ibaresi ve DST notu korunur.
- Otoriter dis kaynaklar (BIS, merkez bankalari, IANA) her dilde ayni URL'lere
  gider. Yerel dilde resmi bir karsiligi varsa (ornek BoJ'un kendi dili) o tercih
  edilebilir.
- Ic linkler dil icinde kalir: `fr` body sadece `/fr/blog/...` slug'larina link
  verir.
- Finansal tavsiye yok, uydurma istatistik yok, uydurma yazar yok.
- Slug'lar per-locale ve dogal olmali; Ingilizce kelime tasima
  (`sesiones-de-trading-forex-explicadas`, `forex-trading-sessions-explicadas` degil).

---
---

# BOLUM 9: EKRAN GORUNTULERI (opsiyonel)

`public/screenshots/<code>/` altina o dilin setini koyarsan site otomatik
kullanir; koymazsan Ingilizce sete duser ve site yine calisir. Dosya adlari
`src/components/Screenshots.tsx` icindeki `SHOTS` haritasindan gelir ve
keyword-zengin olmali (o dildeki arama terimleri).

Dil ilk acildiginda Ingilizce sete dusmesi kabul edilebilir; kendi setini
sonradan eklemek dili bozmaz.

---
---

# EK A: DIL KUYRUGU

| Sira | Dil | Kod | Yayin | Durum |
|---|---|---|---|---|
| 1 | Francais | `fr` | 2026-09-17 | UI + legal + 5 yazi hazir, tarih bekliyor |
| 2 | Portugues | `pt` | 2026-09-24 | siradaki |
| 3+ | - | - | - | belirlenecek |

`pt` icin not: tek Portekizce surum planlandigi icin kod `pt` (Brezilya +
Portekiz'i birlikte kapsar). Ileride ayri bir Portekiz surumu istenirse
`pt-BR` / `pt-PT` olarak bolunur ve eski `pt` URL'leri yonlendirilir.

---
---

# EK B: REZERVE EDILMIS FRANSIZCA SLUG'LAR

Yayindaki 5 Fransizca yazi, henuz cevrilmemis 10 yaziya bugunden link veriyor.
Render katmani bu linkleri simdilik duz metne ceviriyor; hedef yazi cevrildigi
an link kendiliginden aktiflesir. **Bu yuzden asagidaki slug'lar baglayicidir:**
kalan 10 yaziyi Fransizca'ya cevirirken TAM OLARAK bu slug'lari kullan, yoksa
mevcut yazilardaki ic linkler sessizce olu kalir.

| Ingilizce slug | Rezerve Fransizca slug | Durum |
|---|---|---|
| `forex-trading-sessions-explained` | `seances-de-trading-forex-expliquees` | ✅ cevrildi |
| `what-time-does-the-forex-market-open` | `a-quelle-heure-ouvre-le-marche-du-forex` | ✅ cevrildi |
| `best-time-to-trade-forex` | `meilleur-moment-pour-trader-le-forex` | ✅ cevrildi |
| `london-new-york-overlap` | `chevauchement-londres-new-york` | ✅ cevrildi |
| `forex-market-hours-by-timezone` | `horaires-du-forex-par-fuseau-horaire` | ✅ cevrildi |
| `what-time-does-the-london-session-open` | `a-quelle-heure-ouvre-la-seance-de-londres` | rezerve (4 yaziden link aliyor) |
| `tokyo-asian-forex-session` | `seance-forex-de-tokyo-asie` | rezerve (2 yaziden link aliyor) |
| `sydney-forex-session` | `seance-forex-de-sydney` | rezerve (2 yaziden link aliyor) |
| `new-york-forex-session` | `seance-forex-de-new-york` | rezerve (2 yaziden link aliyor) |
| `is-the-forex-market-open-today` | `le-marche-du-forex-est-il-ouvert-aujourd-hui` | rezerve (2 yaziden link aliyor) |
| `daylight-saving-time-forex` | `heure-d-ete-et-forex` | rezerve |
| `frankfurt-european-forex-session` | `seance-forex-de-francfort-europe` | rezerve |
| `most-traded-currency-pairs` | `paires-de-devises-les-plus-tradees` | rezerve |
| `forex-economic-calendar-and-news-times` | `calendrier-economique-forex-et-horaires-des-annonces` | rezerve |
| `why-forex-is-open-24-hours` | `pourquoi-le-forex-est-ouvert-24h-24` | rezerve |

Ayni disiplini her yeni dil icin uygula: ilk parti yazilirken kalan yazilarin
slug'larini burada rezerve et, sonraki partiler o slug'lari kullansin.

---
---

# EK C: FRANSIZCA TIPOGRAFI NOTU

- Kesme isareti olarak **typographic apostrophe `’` (U+2019)** kullaniliyor, duz
  `'` degil. Iki sebep: JSX'te duz `'` `react/no-unescaped-entities` lint hatasi
  veriyor, ve ICU MessageFormat'ta duz `'` kacis karakteri (`'{` bir placeholder'i
  bozabilir). `’` iki sorunu da ortadan kaldiriyor ve dogru Fransiz tipografisi.
- Tirnak icin `« »` kullaniliyor.
- Iki nokta/soru/unlem oncesi su an normal bosluk var. Tam Fransiz tipografisi
  ince bagsiz bosluk ister; istenirse sonradan toplu uygulanabilir.

`pt` icin not: tek Portekizce surum planlandigi icin kod `pt` (Brezilya +
Portekiz'i birlikte kapsar). Ileride ayri bir Portekiz surumu istenirse
`pt-BR` / `pt-PT` olarak bolunur ve eski `pt` URL'leri yonlendirilir.
