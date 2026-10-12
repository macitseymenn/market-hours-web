# Dil Ekleme Handbook - Forex Market Hours

Bu dosya, siteye yeni bir dil eklerken tek referanstir. Blog yazisi uretimi icin
`SEO-GUIDELINES.md`'e bak; bu dosya bir DILIN nasil eklendigini anlatir.

> Hedef tempo: 10 gunde bir dil. Sistem bunu destekleyecek sekilde kuruldu,
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
     availableFrom: "2026-09-17",   // bir sonraki Persembe
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
| 404 sayfasi (baslik, metin, onerilen rehberler) | `notFound` mesaj namespace'i + o dilde yayinda olan yazilar |

---
---

# BOLUM 6: DIL BASINA YAYIN KAPSAMI

Bir dil su kapsamla acilir:

- [ ] `messages/<code>.json` %100 (245 anahtar, `notFound` namespace'i dahil)
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

# BOLUM 10: TARIHLER VE TAZELIK SINYALI (SEO)

Google'a "bu site surekli yenileniyor" mesajini vermek istiyoruz, ama tarih
spam'i yapmadan. Kural tek cumleyle: **her tarih gercek bir editoryal olguyu
gostermeli.**

## 10.1 Temel ilke

Bir cevirinin yayinlandigi gun, o URL icin GERCEKTEN yeni icerik demektir.
Ingilizce orijinali Temmuz'da yazilmis olabilir, ama `/fr/blog/...` adresi o
gune kadar var degildi. Dolayisiyla:

- Ceviri, **kendi yayin tarihini** tasir (`localeDate`), orijinalinkini degil.
- Orijinal dildeki sayfanin tarihi, yeni bir dil ciktiginda **DEGISMEZ**.

Ikisi de dogru oldugu icin bu spam degil. Tersi ikisi de yanlis olurdu:
orijinalin tarihini devralmak yepyeni bir URL'i geriye tarihler ve gercek
tazelik sinyalini cope atar; degismemis Ingilizce sayfaya bugunun tarihini
yazmak ise Google'in tam olarak degersizlestirdigi sahte sinyaldir.

## 10.2 Alanlar

| Alan | Anlami |
|---|---|
| `date` | Orijinal (varsayilan dil) surumunun yayin tarihi |
| `updated` | Orijinal surumun son anlamli guncelleme tarihi |
| `localeDate` | Dil basina ILK yayin tarihi. Ceviri icin doldur |
| `localeUpdated` | Dil basina son anlamli guncelleme tarihi |

`localeDate` verilen bir dilde `updated`, orijinalin duzenleme gecmisini DEVRALMAZ,
cunku o gecmis bu cevirinin oncesine aittir. Sadece `localeUpdated` gecerlidir.

## 10.3 Bu alanlar neyi besliyor

| Cikti | Kaynak |
|---|---|
| JSON-LD `datePublished` / `dateModified` | O dilin kendi tarihi |
| Sayfada gorunen tarih ve "Derniere mise a jour" | O dilin kendi tarihi |
| Sitemap `lastmod` | `max(icerigin kendi degisim tarihi, o dilin yayin tarihi)` |
| Blog listesi sirasi | O dilin kendi tarihine gore, yeniden eskiye |

## 10.4 Sitemap `lastmod` politikasi

**Build zamani ASLA kullanilmaz.** Google `lastmod`'a yalnizca gercek degisimle
tutarli kaldigi surece guvenir; her yeniden derlemede oynayan bir dosyada tum
`lastmod` degerlerini toptan yok sayar. Bu da gercekten yeni olan URL'leri
degismeyenlerin arasinda gomerdi.

Yeni dil ciktiginda sitemap'in gorunumu (fr, 2026-09-10):

```
14 URL  2026-09-10   <- sadece Fransizca, hepsi o gun gercekten yeni
16 URL  2026-07-22   <- degismemis legal sayfalar, kipirdamadi
 2 URL  2026-07-29   <- Ingilizce/Ispanyolca blog arsivi, kipirdamadi
```

Legal sayfalarin `updated` tarihi `src/lib/site.ts` icindeki `LEGAL_NAV`'dadir.
Sayfayi yeniden yazdiginda elle bump et; yeni dil ciktigi icin ASLA bump etme.

## 10.5 Zamanlanmis ceviri yayini

`isPublished` artik dil-farkindadir: bir cevirinin `localeDate`'ine ileri tarih
verirsen, o yazi **sadece o dilde** gizli kalir, orijinali yayinda kalmaya devam
eder. Kapi acilinca ceviri kendi dogru tarihiyle canliya cikar.

Gizli kaldigi surece o dil, yazinin hreflang kumesinden de dusulur; yani hicbir
zaman 404'e giden bir alternate uretilmez (bu, tum hreflang kumesinin Google
tarafindan atilmasina yol acardi).

**Istikrarli tazelik icin onerilen kullanim:** bir dilin kalan cevirilerini tek
seferde degil, haftaya yayarak yayinla. Her hafta gercekten yeni URL'ler,
gercekten yeni tarihlerle cikar. Google'a "surekli yenilenen site" sinyalini
veren sey tarih oynatmak degil, gercek yayin temposudur.

---
---

# EK A: DIL KUYRUGU

Tempo: **10 gunde bir dil**.

| Sira | Dil | Kod | Yayin | Durum |
|---|---|---|---|---|
| 1 | Francais | `fr` | 2026-09-10 | CANLI (UI + legal + 15 yazi) |
| 2 | Portugues | `pt` | 2026-10-12 | hazir (UI + legal + 15 yazi, 5'i acilista) |
| 3 | Turkce | `tr` | 2026-10-22 | hazir (UI + legal + 15 yazi, 5'i acilista) |
| 4 | Deutsch | `de` | 2026-11-01 | hazir (UI + legal + 15 yazi, 5'i acilista) |
| 5 | Italiano | `it` | 2026-11-11 | hazir (UI + legal + 15 yazi, 5'i acilista) |
| 6 | - | - | 2026-11-21 | belirlenecek |

**Onemli:** mekanizma dili otomatik YAYINLAR, otomatik URETMEZ. Bir dilin
kendi gununde acilip dil secicide gorunmesi icin icerigi o tarihten ONCE commit
edilmis ve deploy edilmis olmali. Kuyrukta "belirlenecek" kalan bir slot
hicbir sey yapmaz (Eylul 2026'da `pt` bu yuzden 17 Eylul'de acilmadi).

Her dil, kendisinden bir onceki dilin yayin gununden 10 gun sonrasina
`availableFrom` alir. Kuyruk bitmeden en az bir sonraki dili hazirla.

`public/screenshots/<code>/` henuz `fr`, `pt`, `tr`, `de`, `it` icin yok; hepsi
Ingilizce sete dusuyor (Bolum 9).

`pt` icin not: tek Portekizce surum planlandigi icin kod `pt` (Brezilya +
Portekiz'i birlikte kapsar). Ileride ayri bir Portekiz surumu istenirse
`pt-BR` / `pt-PT` olarak bolunur ve eski `pt` URL'leri yonlendirilir.

---
---

# EK B: FRANSIZCA SLUG'LAR VE YAYIN TAKVIMI

Fransizca'nin 15 yazisi da yazildi. Ilk 5'i 10 Eylul'de canli; kalan 10'u haftada
2 (Pazartesi + Persembe) kendi tarihlerinde otomatik acilir. Yazilar birbirine
bugunden link veriyor: henuz cikmamis bir hedefe giden link duz metin olarak
render edilir ve hedef yayinlandigi an kendiliginden aktiflesir.

| Yayin | Ingilizce slug | Fransizca slug | Kelime |
|---|---|---|---|
| 2026-09-10 | `forex-trading-sessions-explained` | `seances-de-trading-forex-expliquees` | 2354 |
| 2026-09-10 | `forex-market-hours-by-timezone` | `horaires-du-forex-par-fuseau-horaire` | 2313 |
| 2026-09-10 | `london-new-york-overlap` | `chevauchement-londres-new-york` | 1749 |
| 2026-09-10 | `best-time-to-trade-forex` | `meilleur-moment-pour-trader-le-forex` | 1773 |
| 2026-09-10 | `what-time-does-the-forex-market-open` | `a-quelle-heure-ouvre-le-marche-du-forex` | 1331 |
| 2026-09-14 | `what-time-does-the-london-session-open` | `a-quelle-heure-ouvre-la-seance-de-londres` | 2334 |
| 2026-09-17 | `is-the-forex-market-open-today` | `le-marche-du-forex-est-il-ouvert-aujourd-hui` | 2385 |
| 2026-09-21 | `new-york-forex-session` | `seance-forex-de-new-york` | 1734 |
| 2026-09-24 | `sydney-forex-session` | `seance-forex-de-sydney` | 1766 |
| 2026-09-28 | `tokyo-asian-forex-session` | `seance-forex-de-tokyo-asie` | 2525 |
| 2026-10-01 | `daylight-saving-time-forex` | `heure-d-ete-et-forex` | 1463 |
| 2026-10-05 | `forex-economic-calendar-and-news-times` | `calendrier-economique-forex-et-horaires-des-annonces` | 1424 |
| 2026-10-08 | `frankfurt-european-forex-session` | `seance-forex-de-francfort-europe` | 1358 |
| 2026-10-12 | `most-traded-currency-pairs` | `paires-de-devises-les-plus-tradees` | 1371 |
| 2026-10-15 | `why-forex-is-open-24-hours` | `pourquoi-le-forex-est-ouvert-24h-24` | 1263 |

Toplam 27.143 Fransizca kelime.

**Siralama neden bu:** en cok ic link alan yazi en erken cikar, boylece mevcut
yazilardaki uyuyan linkler mumkun olan en kisa surede aktiflesir. Yeni bir dil
icin ayni mantigi uygula.

**Sonraki diller icin ayni disiplin:** ilk parti yazilirken kalan yazilarin
slug'larini burada rezerve et ve tarihlerini haftaya yay. Slug'lar baglayicidir;
farkli bir slug kullanilirsa mevcut yazilardaki linkler sessizce olu kalir.

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

---
---

# EK D: PT / TR / DE / IT SLUG'LARI VE YAYIN TAKVIMI

Dort dilin 15 yazisi da yazildi. Her dilde ilk 5 yazi dilin acildigi gun, kalan
10 yazi haftada 2 (Pazartesi + Persembe) kendi `localeDate` tarihinde acilir.
Siralama EK B ile ayni (en cok ic link alan yazi en once). Slug'lar baglayicidir.

## PORTEKIZCE (`pt`), dil yayini 2026-10-12

| Yayin | Ingilizce slug | Slug |
|---|---|---|
| 2026-10-12 | `forex-trading-sessions-explained` | `sessoes-de-negociacao-forex-explicadas` |
| 2026-10-12 | `forex-market-hours-by-timezone` | `horario-do-forex-por-fuso-horario` |
| 2026-10-12 | `london-new-york-overlap` | `sobreposicao-londres-nova-york` |
| 2026-10-12 | `best-time-to-trade-forex` | `melhor-horario-para-operar-forex` |
| 2026-10-12 | `what-time-does-the-forex-market-open` | `que-horas-abre-o-mercado-forex` |
| 2026-10-15 | `what-time-does-the-london-session-open` | `que-horas-abre-a-sessao-de-londres` |
| 2026-10-19 | `is-the-forex-market-open-today` | `o-mercado-forex-esta-aberto-hoje` |
| 2026-10-22 | `new-york-forex-session` | `sessao-forex-de-nova-york` |
| 2026-10-26 | `sydney-forex-session` | `sessao-forex-de-sydney` |
| 2026-10-29 | `tokyo-asian-forex-session` | `sessao-forex-de-toquio-asia` |
| 2026-11-02 | `daylight-saving-time-forex` | `horario-de-verao-e-forex` |
| 2026-11-05 | `forex-economic-calendar-and-news-times` | `calendario-economico-forex-e-horarios-das-noticias` |
| 2026-11-09 | `frankfurt-european-forex-session` | `sessao-forex-de-frankfurt-europa` |
| 2026-11-12 | `most-traded-currency-pairs` | `pares-de-moedas-mais-negociados` |
| 2026-11-16 | `why-forex-is-open-24-hours` | `por-que-o-forex-funciona-24-horas` |

## TURKCE (`tr`), dil yayini 2026-10-22

| Yayin | Ingilizce slug | Slug |
|---|---|---|
| 2026-10-22 | `forex-trading-sessions-explained` | `forex-islem-seanslari-rehberi` |
| 2026-10-22 | `forex-market-hours-by-timezone` | `saat-dilimine-gore-forex-piyasa-saatleri` |
| 2026-10-22 | `london-new-york-overlap` | `londra-new-york-cakismasi` |
| 2026-10-22 | `best-time-to-trade-forex` | `forex-islem-yapmak-icin-en-iyi-saat` |
| 2026-10-22 | `what-time-does-the-forex-market-open` | `forex-piyasasi-saat-kacta-acilir` |
| 2026-10-26 | `what-time-does-the-london-session-open` | `londra-seansi-saat-kacta-acilir` |
| 2026-10-29 | `is-the-forex-market-open-today` | `forex-piyasasi-bugun-acik-mi` |
| 2026-11-02 | `new-york-forex-session` | `new-york-forex-seansi` |
| 2026-11-05 | `sydney-forex-session` | `sidney-forex-seansi` |
| 2026-11-09 | `tokyo-asian-forex-session` | `tokyo-asya-forex-seansi` |
| 2026-11-12 | `daylight-saving-time-forex` | `yaz-saati-uygulamasi-ve-forex` |
| 2026-11-16 | `forex-economic-calendar-and-news-times` | `forex-ekonomik-takvim-ve-haber-saatleri` |
| 2026-11-19 | `frankfurt-european-forex-session` | `frankfurt-avrupa-forex-seansi` |
| 2026-11-23 | `most-traded-currency-pairs` | `en-cok-islem-goren-pariteler` |
| 2026-11-26 | `why-forex-is-open-24-hours` | `forex-neden-24-saat-acik` |

## ALMANCA (`de`), dil yayini 2026-11-01

| Yayin | Ingilizce slug | Slug |
|---|---|---|
| 2026-11-01 | `forex-trading-sessions-explained` | `forex-handelssitzungen-erklaert` |
| 2026-11-01 | `forex-market-hours-by-timezone` | `forex-handelszeiten-nach-zeitzone` |
| 2026-11-01 | `london-new-york-overlap` | `ueberschneidung-london-new-york` |
| 2026-11-01 | `best-time-to-trade-forex` | `beste-zeit-fuer-forex-trading` |
| 2026-11-01 | `what-time-does-the-forex-market-open` | `wann-oeffnet-der-forex-markt` |
| 2026-11-02 | `what-time-does-the-london-session-open` | `wann-oeffnet-die-london-session` |
| 2026-11-05 | `is-the-forex-market-open-today` | `ist-der-forex-markt-heute-geoeffnet` |
| 2026-11-09 | `new-york-forex-session` | `forex-session-new-york` |
| 2026-11-12 | `sydney-forex-session` | `forex-session-sydney` |
| 2026-11-16 | `tokyo-asian-forex-session` | `forex-session-tokio-asien` |
| 2026-11-19 | `daylight-saving-time-forex` | `sommerzeit-und-forex` |
| 2026-11-23 | `forex-economic-calendar-and-news-times` | `forex-wirtschaftskalender-und-nachrichtenzeiten` |
| 2026-11-26 | `frankfurt-european-forex-session` | `forex-session-frankfurt-europa` |
| 2026-11-30 | `most-traded-currency-pairs` | `meistgehandelte-waehrungspaare` |
| 2026-12-03 | `why-forex-is-open-24-hours` | `warum-forex-24-stunden-geoeffnet-ist` |

## ITALYANCA (`it`), dil yayini 2026-11-11

| Yayin | Ingilizce slug | Slug |
|---|---|---|
| 2026-11-11 | `forex-trading-sessions-explained` | `sessioni-di-trading-forex-spiegate` |
| 2026-11-11 | `forex-market-hours-by-timezone` | `orari-del-forex-per-fuso-orario` |
| 2026-11-11 | `london-new-york-overlap` | `sovrapposizione-londra-new-york` |
| 2026-11-11 | `best-time-to-trade-forex` | `miglior-orario-per-fare-trading-forex` |
| 2026-11-11 | `what-time-does-the-forex-market-open` | `a-che-ora-apre-il-mercato-forex` |
| 2026-11-12 | `what-time-does-the-london-session-open` | `a-che-ora-apre-la-sessione-di-londra` |
| 2026-11-16 | `is-the-forex-market-open-today` | `il-mercato-forex-e-aperto-oggi` |
| 2026-11-19 | `new-york-forex-session` | `sessione-forex-di-new-york` |
| 2026-11-23 | `sydney-forex-session` | `sessione-forex-di-sydney` |
| 2026-11-26 | `tokyo-asian-forex-session` | `sessione-forex-di-tokyo-asia` |
| 2026-11-30 | `daylight-saving-time-forex` | `ora-legale-e-forex` |
| 2026-12-03 | `forex-economic-calendar-and-news-times` | `calendario-economico-forex-e-orari-delle-notizie` |
| 2026-12-07 | `frankfurt-european-forex-session` | `sessione-forex-di-francoforte-europa` |
| 2026-12-10 | `most-traded-currency-pairs` | `coppie-di-valute-piu-scambiate` |
| 2026-12-14 | `why-forex-is-open-24-hours` | `perche-il-forex-e-aperto-24-ore` |
