# Blog Uretim Handbook - Forex Market Hours - Selam

Bu dosya, `forexmarkethours.app` projesinde blog yazisi ureten kisi/AI icin
tek referanstir. Amaci: her yeni yazinin bu projedeki sisteme dogru sekilde
oturmasi ve SEO/E-E-A-T sinyallerinin bozulmamasi.

> Site YMYL (Your Money Your Life) bir finans konusundadir. Dogruluk ve
> durustluk her seyin onundedir: uydurma yazar, uydurma istatistik veya finansal
> tavsiye YOK. Site yalnizca "market saatleri" bilgisi verir, yatirim tavsiyesi vermez.

**Temel gercekler:**
- Blog dosya-tabanlidir: tum yazilar `src/content/blog.ts` icindeki `POSTS` dizisinde. DB, admin panel veya CMS YOK.
- Coklu dil: aktif diller `src/i18n/locales.ts` registry'sinde. `en` zorunlu, digerleri kismi olabilir (Bolum 10).
- Metadata, JSON-LD, hreflang, sitemap, reading time OTOMATIK uretilir. Elle yazilmaz (Bolum 8).
- Yayin zamanlanmis: yazi `date` gununde 00:00 UTC'de canliya cikar (Bolum 7).

---
---

# BOLUM 1: YENI YAZI EKLEME (workflow)

Yeni yazi = `src/content/blog.ts` icindeki `POSTS` dizisine bir `Post` objesi eklemek. Baska hicbir yer duzenlenmez.

**Adim adim:**
1. `src/content/blog.ts` ac, `POSTS` dizisinin sonuna yeni `Post` objesi ekle.
2. Her lokalize alani en azindan `en` icin doldur (slug, title, description, tags, body); mevcut diger diller icin de doldurabildigin kadar doldur.
3. `date`'i ISO ver (`YYYY-MM-DD`). Ileri tarih verirsen yazi o gune kadar gizli kalir (Bolum 7).
4. `authorSlug: "author"` birak (Bolum 6). `cover`'i `/blog/<en-slug>.svg` yap (Bolum 5).
5. Kaydet. Body'yi taslak halinde gormek icin `BLOG_SHOW_DRAFTS=1` ile calistir.
6. Yayindan once Bolum 9 checklist'ini bitir.

**Post tipi (referans):**
```ts
type Post = {
  slug: Localized<string>;         // dil basina dogal slug
  title: Localized<string>;        // H1 buradan gelir, markdown'da # KULLANMA
  description: Localized<string>;  // meta description = SERP snippet
  date: string;                    // ISO "YYYY-MM-DD", orijinalin yayin gunu
  updated?: string;                // ISO, orijinal guncellenirse
  localeDate?: Localized<string>;  // ceviri basina yayin gunu (Bolum 2.4)
  localeUpdated?: Localized<string>;
  authorSlug: string;              // "author" (team atif, Bolum 6)
  tags: Localized<string[]>;       // dil basina
  cover: string;                   // /blog/<slug>.svg (tek, dile bagli degil)
  body: Localized<string>;         // Markdown, dil basina
};
// Localized<T> = Partial<Record<LocaleCode, T>>
// Bir dil eksikse yazi o dilde hic gorunmez (404 + sitemap disi), Ingilizce'ye
// DUSMEZ. Yani kismi ceviri guvenli, yanlis dilde icerik olusmaz.
```

---
---

# BOLUM 2: ALAN ALAN KURALLAR

## 2.1 slug (localized)
- Her dil icin dogal, o dile ozgu slug. Ingilizce Ingilizce, Ispanyolca Ispanyolca.
  Ornek: `en: "what-time-does-the-london-session-open"`, `es: "a-que-hora-abre-la-sesion-de-londres"`.
- Ana hedef keyword'u icersin, 60 karakter alti, kucuk harf + tire.
- Yayinlandiktan sonra slug DEGISTIRME (URL kirilir). Zorunluysa eski URL'i yonlendir.

## 2.2 title (localized)
- Bu string sayfada `<h1>` olarak ve `<title>`/OG title olarak render edilir. Markdown body'ye AYRICA `# ` H1 EKLEME.
- 55-60 karakter (SERP 60'ta truncate eder). Ana keyword one yakin.
- Kalip: "Ana Keyword: Aciklayici Kuyruk". Ornek: `"Forex Trading Sessions Explained: The Four Major Markets"`.

## 2.3 description (localized)
- Google SERP snippet'i budur. 140-160 karakter.
- Ana keyword + 1-2 secondary + kullanicinin sorusuna dogrudan cevap ipucu.
- Ornek: `"Forex trading sessions explained: Sydney, Tokyo, London and New York hours in GMT, how they overlap, and how to see each session in your own timezone."`

## 2.4 date & updated & localeDate
- `date`: ORIJINAL surumun yayin gunu (ISO). Zamanlanmis rollout icin ileri tarih verilebilir (Bolum 7).
- `updated`: orijinal icerik anlamli sekilde guncellenince ekle. Kucuk typo icin ekleme.
- `localeDate`: **ceviri eklerken doldur.** Cevirinin yayinlandigi gun, ornek
  `localeDate: { fr: "2026-09-10" }`. Ceviri o URL icin yeni icerik oldugundan
  kendi tarihini tasir; orijinalin tarihini devralmak yepyeni bir sayfayi
  geriye tarihler ve tazelik sinyalini yok eder.
- `localeUpdated`: bir cevirinin kendisi guncellenince.
- **Yeni bir dil ciktiginda mevcut dillerin tarihlerine DOKUNMA.** Onlarin
  icerigi degismedi; degismemis sayfaya yeni tarih yazmak Google'in
  degersizlestirdigi tarih spam'idir. Detay: `LOCALIZATION.md` Bolum 10.

## 2.5 tags (localized)
- Her dilde 2-4 tag. Ingilizce `["Sessions", "Basics"]`, Ispanyolca karsiligi `["Sesiones", "Fundamentos"]`. Tag eksikse yazi gizlenmez, sadece rozet gorunmez.
- Tag'ler JSON-LD `keywords` alanina gider ve sayfada rozet olarak gorunur. Konu ile alakali tut.

## 2.6 cover
- Tek path (dile bagli degil): `/blog/<en-slug>.svg`. Dosya `public/blog/` altinda olmali.
- Su an SVG placeholder'lar var. Gercek foto/gorsel ile degistirilmeli (JSON-LD `image` ve OG bunu kullanir).

## 2.7 authorSlug
- Su an tek yazar: `"author"` (organizasyon-seviyesi "team" atif). Bolum 6'ya bak, sahte kisi UYDURMA.

---
---

# BOLUM 3: BODY (Markdown) KURALLARI

Body markdown'dir, `react-markdown` + `remark-gfm` ile render edilir (GFM tablolar, otomatik link vb. calisir).

## 3.1 Yapi
- **H1 YOK.** Sayfa H1'i `title`'dan gelir. Body dogrudan giris paragrafiyla baslar.
- Bolum basliklari `##` (H2), alt basliklar `###` (H3). Atlama yapma.
- Giris paragrafi (ilk 2-3 cumle) konuyu/soruyu DOGRUDAN yanitlamali. AI arama motorlari ilk cumleleri alintilar.
- Uzunluk hedefi: 1200+ kelime, kapsamli konularda 1500+.

## 3.2 Zengin ogeler (GFM)
- Saat/oturum karsilastirmalari icin **tablo** kullan (GFM markdown tablosu). Mevcut yazilarda oturum saatleri tablosu standart.
- Sayilabilir icerikte numarali/isaretli liste.
- Onemli terimleri **bold** ile vurgula (ornek: **BIS Triennial Central Bank Survey**).

## 3.3 Dogruluk (YMYL kritik)
- Her saat/veri birincil kaynaga dayanmali (Bolum 4). Saatler yaz saati (DST) ile kayar, "GMT standard time" oldugunu belirt.
- Finansal tavsiye verme ("su an al/sat" YOK). Yalnizca market saatleri + nasil calistigi.
- Uydurma istatistik YOK. Sayi veriyorsan kaynagi olsun.

---
---

# BOLUM 4: KAYNAK LINKLERI & E-E-A-T

Otoriter kaynaklara giden dis linkler bu sitede bilincli bir guvenilirlik (E-E-A-T) sinyalidir, dekorasyon degil.

## 4.1 Dis (external) linkler
- Markdown link olarak yaz. Render katmani `http`/`https` ile baslayanlara otomatik `target="_blank" rel="noopener noreferrer"` ekler (elle ekleme).
- Kullanilan/tercih edilen birincil kaynaklar:
  - **BIS** (BIS Triennial Central Bank Survey) - FX turnover otoritesi: `bis.org`
  - Merkez bankalari: `bankofengland.co.uk`, `federalreserve.gov`, `boj.or.jp`
  - Zaman/takvim: `iana.org` (IANA tz database), `timeanddate.com`
  - Borsalar: `jpx.co.jp`
  - Genel referans: `gov.uk`, `babypips.com`
- **Kural:** Her yazida en az 1-2 otoriter kaynak. Iddia (ozellikle sayi/saat) kaynaksiz kalmasin.
- URL'yi cumle icinde noktalama isaretinden onceki net URL olarak yaz (sonuna virgul/nokta yapisirsa linke dahil olmasin).

## 4.2 Ic (internal) cross-linkler
- Locale-prefixli relative path kullan: `/en/blog/<en-slug>` veya `/es/blog/<es-slug>`. Full URL kullanma.
- **Body'nin dilinin slug'ina link ver:** Ingilizce body `/en/blog/...`, Ispanyolca body `/es/blog/...`.
- Hub-and-spoke: ana rehber (ornek "Forex Trading Sessions Explained") diger yazilara, detay yazilar ana rehbere link verir. Her yazida en az 2-3 ic link.
- **Ileri tarihli yaziya link vermek guvenli:** hedef henuz yayinlanmamissa render katmani linki otomatik duz metne cevirir (404 olmaz), yayinlaninca link geri gelir. Yani gelecekte cikacak yaziya bugunden link verebilirsin.

---
---

# BOLUM 5: COVER GORSELLERI

- Her yazi icin `public/blog/<en-slug>.svg` (veya gercek foto). `cover` alani buna isaret eder.
- Tek gorsel iki dilde de kullanilir (`cover` lokalize degil).
- JSON-LD `image` ve OpenGraph gorseli otomatik bu path'ten uretilir, yani cover dosyasi MUTLAKA var olmali.
- Placeholder SVG'ler zamanla gercek gorseller ile degistirilmeli.

---
---

# BOLUM 6: YAZAR / BYLINE (E-E-A-T, durustluk)

Yazar profilleri `src/content/authors.ts` icinde. Byline, `/author/[slug]` sayfasi ve Person JSON-LD'yi besler.

## 6.1 Mevcut durum: "team" atif
- Tek entry var (`slug: "author"`, `kind: "team"`): organizasyon-seviyesi durust atif. Bu BILINCLI ve dogru bir durum.
- Bu durumda: byline "Forex Market Hours Editorial Team", Person JSON-LD YOK, author page noindex, BlogPosting `author` = Organization.

## 6.2 Altin kural: sahte kisi UYDURMA
- YMYL bir konuda uydurma yazar/kimlik/kredensiyal ciddi bir guven ihlalidir. `authors.ts` yorumlari da bunu vurgular.
- Gercek, dogrulanabilir bir kisi eklenecekse: `authors.ts`'e `kind: "person"` + gercek ad/foto/LinkedIn-X (`sameAs`) ile ekle. `isPlaceholderAuthor()` false olunca site otomatik acilir (Person JSON-LD + indexli author sayfasi + isimli byline). Kod degisikligi gerekmez.
- Gercek veri gelene kadar organizasyon atifi DOGRU ve durust haldir. Elleme.

---
---

# BOLUM 7: ZAMANLANMIS YAYIN (scheduled publishing)

- Bir yazi `date` gununde **00:00 UTC**'de canliya cikar. O ana kadar: listeleme, anasayfa onizleme, sitemap, author sayfasi ve kendi URL'i dahil HER YERDEN gizli (URL 404 doner).
- Bu, gun-be-gun otomatik rollout saglar: ileri tarihli yazilari bugunden commit edersin, kendi gunlerinde gorunurler.
- Mekanizma ISR ile calisir (`export const revalidate = 3600`, saatlik). Deploy veya harici cron gerekmez, site yeniden render olunca kapi acilir.
- **Taslak gorme:** `BLOG_SHOW_DRAFTS=1` ortam degiskeni ile (ornek Netlify deploy preview) yayinlanmamis yazilar gorunur.

---
---

# BOLUM 8: OTOMATIK URETILENLER (elle yazma)

Asagidakiler `Post` alanlarindan kod tarafindan uretilir. Bunlari elle yazmaya CALISMA, sadece kaynak alanlari dogru doldur.

| Cikti | Nereden | Not |
|---|---|---|
| `<title>`, meta description | `title`, `description` | `generateMetadata()` |
| Canonical + hreflang (`en`, `es`, `x-default`) | per-locale `slug` | Iki dil de dolu olmali yoksa alternate kirilir |
| OpenGraph (article, publishedTime, modifiedTime, tags) | `date`, `updated`, `tags` | |
| `<h1>` | `title` | Body'de `# ` KULLANMA |
| BlogPosting JSON-LD | tum alanlar (headline, description, inLanguage, dates, image=cover, wordCount, keywords=tags, author, publisher) | `src/lib/jsonld.ts` guvenli serialize eder |
| BreadcrumbList JSON-LD | otomatik | Home > Blog > post |
| Reading time | `body` kelime sayisi / 200 | `readingMinutes()` |
| Sitemap girisi | yayinlanmis postlar | `isPublished` gate |
| Dis link `target/rel` | markdown `http(s)` linkleri | `noopener noreferrer` otomatik |

**Sonuc:** Kaliteyi belirleyen tek sey `Post` alanlarinin dogrulugu. Teknik SEO iskeleti zaten hazir.

---
---

# BOLUM 9: YAYIN ONCESI CHECKLIST

Her iki dil (`en` + `es`) icin ayri ayri kontrol et:

**Alanlar**
- [ ] `slug` iki dilde, dogal, keyword'lu, 60 karakter alti, benzersiz
- [ ] `title` 55-60 karakter, ana keyword one yakin (bu H1 olacak)
- [ ] `description` 140-160 karakter, soruya cevap ipucu
- [ ] `date` ISO ve dogru (ileri tarih bilincli mi?)
- [ ] `tags` iki dilde 2-4 adet
- [ ] `cover` dosyasi `public/blog/` altinda gercekten var
- [ ] `authorSlug: "author"` (sahte kisi eklenmedi)

**Body**
- [ ] Markdown'da `# ` H1 YOK (title zaten H1)
- [ ] `##`/`###` hiyerarsisi dogru, atlanmamis
- [ ] Giris ilk 2-3 cumlede soruyu dogrudan yanitliyor
- [ ] 1200+ kelime, en az bir tablo/liste
- [ ] Saatler "GMT standard time" olarak, DST notu var
- [ ] En az 1-2 otoriter kaynak linki (BIS / merkez bankasi / IANA)
- [ ] En az 2-3 ic link, locale-prefixli relative (`/en/blog/...` veya `/es/blog/...`), body diliyle eslesen slug
- [ ] Finansal tavsiye yok, uydurma istatistik yok

**Iki dil paritesi**
- [ ] `en` ve `es` icerik ayni bilgi/yapida (biri eksik/ozet degil)
- [ ] Ispanyolca ic linkler `/es/...` slug'larina gidiyor (Ingilizce'ye degil)

**Yayin sonrasi (opsiyonel dogrulama)**
- [ ] Canliya cikinca `/en/blog/<slug>` ve `/es/blog/<slug>` 200 donuyor, H1 tek
- [ ] hreflang alternate'leri iki dili de gosteriyor

---
---

# BOLUM 10: LOKALIZASYON NOTLARI

> Yeni bir DIL eklemek icin `LOCALIZATION.md`'e bak. Bu bolum mevcut dillerde
> yazi uretirken gecerli kurallardir.

- Site coklu dil. Aktif dil listesi `src/i18n/locales.ts` icindeki registry'dedir.
- **Her yazi en azindan `en` icin zorunlu.** Diger diller kismi olabilir: bir dile
  cevrilmemis yazi o dilde listelenmez, URL'i 404 doner, sitemap'e girmez ve
  hreflang alternatifi uretilmez. Yani eksik ceviri hreflang'i BOZMAZ, sadece o
  yaziyi o dilde yok sayar.
- **Eksik ceviriyi Ingilizce'ye dusurme.** Bir dilde yayinlanan her URL gercekten
  o dilde olmali (YMYL + Google'in ince ceviri politikasi).
- Ceviri ozet degil, tam parite olmali (ayni bolumler, ayni tablolar, ayni kaynaklar).
- Slug'lar per-locale ve dogal: hedef dilin slug'i Ingilizce kelime icermez
  (ornek `sesiones-de-trading-forex-explicadas`).
- Ic linkler dil icinde kalir: `es` body sadece `/es/blog/...` slug'larina link verir.
- Sayfa yollari da lokalize (`/en/about` vs `/es/acerca-de`) ama blog post yolu ortak (`/blog/[slug]`), lokalizasyon slug'da.
- Bir yazinin hangi dillerde hazir oldugunu gormek icin: `npm run check:locales`.

---
---

# EK: PROJE KUNYESI

| Alan | Deger |
|---|---|
| Site URL | `https://forexmarkethours.app` |
| Publisher | HUNTERS GROUP SOFTWARE LIMITED SIRKETI |
| Diller | en (default), es |
| Blog kaynagi | `src/content/blog.ts` (`POSTS`) |
| Yazarlar | `src/content/authors.ts` |
| Render | `src/app/[locale]/blog/[slug]/page.tsx` (react-markdown + remark-gfm) |
| JSON-LD serialize | `src/lib/jsonld.ts` |
| Site config | `src/lib/site.ts` |
| ISR | blog detay `revalidate = 3600` (saatlik) |
| Taslak onizleme | `BLOG_SHOW_DRAFTS=1` |
| Dil registry | `src/i18n/locales.ts` (`LOCALES`) |
| Dil ekleme rehberi | `LOCALIZATION.md` |
| Dil kapsama kontrolu | `npm run check:locales` |

> Not: Bu dosyanin onceki hali baska bir projeye (bir pet shop e-ticaret sitesi, Prisma + admin panel) aitti ve bu repoyla ilgisi yoktu. Tamamen bu projenin gercek blog sistemine gore yeniden yazildi.
