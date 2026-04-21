# Geliştirme kuralları

Bu dosya projede tutarlılık için referans niteliğindedir. Yeni kurallar veya team kararları geldikçe buraya ekleyin. Kişisel taslaklar için repoda izlenmeyen `DEVELOPMENT.local.md` kullanılabilir (bkz. `.gitignore`).

## Genel ilkeler

- İstek dışında kapsam genişletme; gereksiz refactor veya “temizlik” yapılmaz.
- Mevcut kod stiline (isimlendirme, import düzeni, Tailwind kullanımı) uyulur.
- Anlamlı commit mesajları; PR açıklamaları net ve tam cümlelerle yazılır.

## Mimari özeti

- **UI:** React, React Router, Tailwind CSS v4 (`src/index.css` içinde `@theme`).
- **Durum:** Redux Toolkit (`src/store/`, `src/features/`).
- **Veri:** API çağrıları `src/api/` altında; sayfalar ve hook’lar bu fonksiyonları kullanır.

## UI ve tema

### Marka ve varlıklar

- Ürün adı **ScoutLedger**; sekme başlığı `index.html`, paket adı `scout-ledger`.
- **Favicon:** `public/favicon.svg` — sidebar üstündeki marka alanında da aynı dosya (`/favicon.svg`) kullanılır.
- API alan adları değişmeden kalabilir (ör. `underratedScore`); kullanıcıya dönük metinlerde metrik için **Ledger** / **Ledger score** diline uyulur.

### Renk ve Tailwind

- Palet `src/index.css` içindeki `@theme` ile tanımlı: nötrler `fume-*`, birincil vurgu `gold-*`, ikincil vurgu `sea-*`, açık mod sayfa zemini `shell`.
- **Karanlık mod:** Yüzey değişkenleri `@media (prefers-color-scheme: dark)` altında güncellenir (Tailwind varsayılanı ile uyumlu). İleride `<html class="dark">` kullanılırsa aynı `--surface-*` atamaları `.dark` kuralına da yansıtılmalıdır.

### Semantik yüzeyler (`surface-*`)

Tek kaynak: `src/index.css` içindeki `--surface-*` değişkenleri; bileşenlerde mümkün olduğunca **`bg-surface-*` / `border-surface-*` / `divide-surface-*`** yardımcı sınıfları kullanılır. Sayfa zemini (`fume-950` / `shell`) ile içerik blokları arasındaki kontrast buradan yönetilir.

| Yardımcı sınıf (ör.) | Amaç |
|----------------------|------|
| `surface-panel` / `surface-panel-border` | Kartlar, listeler, tablo sarmalayıcıları, sayfa üstü filtre alanlarındaki kontroller (select/input) |
| `surface-panel-hover` | Liste satırı hover vb. bir ton içeri |
| `surface-inset` / `surface-inset-border` | Sekme şeridi, açılır menü gövdesi gibi çukur krom |
| `surface-field` / `surface-field-border` | Form alanı; koyu modda panel ile aynı yükselti (tek tip kontrast) |
| `surface-divider` / `surface-list-divider` | İç ayırıcılar, `divide-y` |

Yeni bir “içerik kutusu” eklerken **`dark:bg-fume-900/45`** gibi tekil tonlar yerine bu token’lara bağlanın.

### Tailwind sınıf token’ları (`*Styles.ts`)

Tekrar eden veya anlam taşıyan Tailwind utility zincirleri, `detailStyles.ts` örüntüsüyle **isimlendirilmiş sabitlere** taşınır:

- **Dosya yeri:** Mümkünse özellikle birlikte kullanılan sınıflar **o özelliğin yanında** (örn. `detail/detailStyles.ts`, `create/reportFormStyles.ts`, `players/playerListStyles.ts`). Birden fazla alan paylaşıyorsa `src/components/pageChromeStyles.ts`, `pageHeaderStyles.ts`, `layoutStyles.ts`, `breadcrumbStyles.ts`, `authFormStyles.ts`, `top-bar/topBarStyles.ts` gibi ortak modüller kullanılır.
- **İçerik:** Her export için kısa bir **`/** … */` JSDoc** (ne zaman kullanılır, hangi bileşenle eşleşir) yazılır. Sınıf dizgisi JSX’te **birebir aynı** kalmalıdır; “yaklaşık” birleştirme yapılmaz.
- **İsimlendirme:** `pageStack`, `proseMutedSm`, `detailSectionCard` gibi **bağlamı okuyunca anlaşılır** sabit isimleri; gerektiğinde özellik öneki (`detail*`, `report*`, `topBar*`).
- **Ne zaman çıkarmalı:** Aynı zincir **iki veya daha fazla** dosyada geçiyorsa veya tek dosyada bile uzun bileşik bir blok tekrarlanıyorsa. Tek satırlık, bir daha kullanılmayacak sınıflar JSX’te kalabilir.
- **Referans:** `src/pages/player-reports/detail/detailStyles.ts` — proje içi örnek “altın standart” modül.

### Primary / Secondary CTA butonları

Tek kaynak: **`src/components/pageChromeStyles.ts`** içindeki **`primaryCtaButtonClass`** ve **`secondaryCtaButtonClass`**. Yeni ana / yardımcı aksiyon eklerken önce bunları kullanın; aynı iş için yeni altın `border` / `bg` zinciri yazmayın.

| Token | Ne zaman | Örnek kullanım |
|-------|----------|----------------|
| **`primaryCtaButtonClass`** | Bir ekranda veya satırda **birincil** eylem: kaydet, oluştur, onayla, listeye ekle, rapora git. Görsel referans oyuncu formundaki **Create / Update player** ile aynıdır (`border-gold-600/80`, `bg-gold-600/15`, …). | Add player, View reports, rapor sihirbazında Save/Update, tab altı **Edit report** (sağa hizalı), onay modalinde **Confirm** (`variant === 'confirmation'`), login/register submit, `playerFormSubmitClass` / `playerListAddActionClass` / `playerDetailReportsLinkClass` bu token’e bağlıdır. |
| **`secondaryCtaButtonClass`** | **İkincil** eylem: vazgeç, geri, adım atla, modal **Cancel**. Primary ile yan yanaysa hiyerarşi net kalsın diye outlined / nötr yüzey. | Oyuncu formu Cancel, rapor sihirbazı Back ve **Next**, modal iptal. |

**Hizalama:** Form veya kart altındaki aksiyon şeridinde primary genelde **sağda** (ör. `justify-end`, sağ kümede en sağdaki primary). Rapor detayında tabların altındaki **Edit report** primary ve **sağa** hizalıdır (`detailTabActionsRowClass`).

**Özellik stilleri:** Yerel `*Styles.ts` dosyalarında bu token’lere **alias** verilebilir (ör. `playerFormSubmitClass = primaryCtaButtonClass`); yeni isimle aynı görseli çoğaltmayın.

### Sayfa başlığı ve rotalar

- Rota sayfalarında mümkünse **`PageHeader`** (`src/components/PageHeader.tsx`) kullanılır: breadcrumb, başlık, açıklama, isteğe bağlı `eyebrow` ve `metaLine`. Kabuk sınıfları `pageHeaderStyles.ts` üzerinden tutulur.
- Liste veya detay için özel “hero” gerekiyorsa `PageHeader` genişletilir; kart stili ve tipografi tek yerde kalmalıdır.

### Rapor detayı

- Üst bant: **`DetailReportHero`** (`src/pages/player-reports/detail/`).
- Rapor gövdesi bölümleri: **`DetailSection` / `DetailSubheading`** ve `detailStyles.ts` — ana başlıkta dikey altın çubuk; alt başlıklarda yatay çizgi kullanılmaz.

### Etkileşim (UI ile ilgili)

- Aşağıdaki **Etkileşim ve UX (imleç)** bölümündeki kurallar geçerlidir.

## API katmanı

- HTTP istekleri `fetchJson` üzerinden (`src/api/client.ts`); taban URL `VITE_API_URL` / `src/api/config.ts`.
- **Kimlik doğrulama:** Korumalı backend rotalarına Supabase `access_token` merkezi olarak `Authorization: Bearer …` ile eklenir (`client.ts`). **`GET /api/nationalities`** herkese açık olduğu için bu path’te Bearer gönderilmez. 401 yanıtları `ApiUnauthorizedBridge` + `notifyUnauthorized` ile oturumu kapatıp `/login`’e yönlendirir.
- Yol önekleri (`/api/players`, `/api/scout-reports`, `/api/nationalities`) **`src/api/endpoints.ts`** içinde toplanır; yeni endpoint eklerken önce buraya, sonra ilgili `*.ts` modülüne eklenir. Yeni **public** GET path’leri `client.ts` içindeki `PUBLIC_API_PATHS` kümesine eklenmelidir; aksi halde Bearer beklenir.
- Ham path string’leri API modülleri dışında tekrarlanmaz.
- **Veri çekme ve hook’lar:** İstekler, yükleme/hata durumu ve türetilmiş state mümkün olduğunca **`src/hooks/`** içindeki custom hook’larda toplanır; sayfa ve görünüm bileşenleri mümkün olduğunca sadece hook çıktısını kullanır ve olayları iletir. API fonksiyonları (`src/api/*.ts`) doğrudan bileşen içinde çağrılmak yerine bu hook’lar üzerinden kullanılmayı hedefler. İstisnalar (çok lokal, tek seferlik arama vb.) makul olduğunda kabul edilir; yine de önce mevcut hook’lara ekleme veya genelleştirme düşünülür.
- **Önce Redux:** Aşağıdaki **Redux** maddesine uygun olarak, istek atmadan önce verinin store’da zaten yüklü olup olmadığı göz önünde bulundurulur.

## Bileşen ve sayfa organizasyonu

- **Önce kontrol:** Yeni bileşen, ikon, yardımcı fonksiyon veya hook eklemeden önce `src/components/`, `src/components/icons/`, `src/hooks/` ve ilgili `src/pages/` altında mevcut çözümlere bakın; aynı ihtiyacı karşılayan parça varsa yeniden kullanın veya genişletin.
- Paylaşılan parçalar `src/components/`; route sayfaları `src/pages/<alan>/`.
- **İkonlar:** SVG ikonlar `src/components/icons/` altında toplanır (ör. `index.tsx` içinde export); sayfa veya özellik dosyasına gömülü yeni `<svg>` eklemek yerine önce bu klasörde aynı sembol var mı bakın.
- **Küçük ve odaklı bileşenler:** Mümkün olduğunca tek sorumluluk; dosya uzadıkça veya okunurluk düştükçe mantıklı sınırlarla alt bileşenlere / alt klasörlere ayrılır (ör. `src/components/top-bar/`). Aşırı parçalamadan kaçının: birlikte anlam taşıyan UI bir arada kalsın.
- Liste satırları ve kartlar mümkünse `Link` ile yönlendirme kullanır; gereksiz `div` + `onClick` kaçınılır.

## Etkileşim ve UX (imleç)

- **Tıklanabilir kontroller:** Aşağıdaki native öğelerde imleç **`pointer`** olmalı; **`disabled`** iken **`not-allowed`** (istisna: yükleme vb. için bileşende `disabled:cursor-wait` gibi utility ile override).
  - `button`, `input[type="button" | "submit" | "reset"]`, `select`, tarih/saat seçiciler (`date`, `datetime-local`, `month`, `week`, `time`), `checkbox`, `radio`, `file`, `details` / `summary`.
  - İleride `role="button"` ile özel widget’lar eklenirse aynı mantık geçerli; mümkünse gerçek `<button>` tercih edilir.
- **Uygulama kaynağı:** Bu davranış `src/index.css` içindeki **`@layer base`** kurallarıyla merkezi verilir; her bileşende tekrar `cursor-pointer` yazmak gerekmez. Aksini isteyen yerlerde Tailwind utility ile override edilir.
- **Metin alanları:** `text`, `email`, `number`, `search`, `url`, `textarea` vb. için imleç metin girişine uygun kalmalıdır; bu tiplere `cursor-pointer` eklenmez.
- **Örtü / backdrop:** Tam ekran overlay veya “görünmez” tıklama alanında bilinçli olarak `cursor-default` kullanılabilir (utility, base kuralından sonra gelir ve baskın gelir).

## Redux

- Slice’lar `src/features/<özellik>/`; selector’lar `src/store/selectors/` altında tutulabilir.
- Sayfa bileşenleri mümkün olduğunca ince kalır; veri yükleme ve türetilmiş state uygun yerde hook veya selector ile çözülür.
- **Tekrar istekten kaçınma:** Uyruk listesi gibi paylaşılan ve Redux’ta tutulan verilere ihtiyaç varsa önce ilgili slice durumu (`status`, vb.) kontrol edilir; veri zaten yüklüyse aynı kaynak için yeni istek atılmaz. Yalnızca eksik veya sayfa özelinde detay gerekiyorsa hedefe uygun istek yapılır.

## Ortam

- Örnek ve dokümantasyon için `.env.example` güncel tutulur; gizli değerler repoya konmaz.

## Kalite kontrol

- Değişiklik sonrası yerelde:

  ```bash
  npm run lint
  npm run build
  ```

- Mümkün olduğunda lint ve TypeScript hataları merge öncesi giderilir.

## İsteğe bağlı: kişisel notlar

- `DEVELOPMENT.local.md` dosyası `.gitignore` içindedir; sadece kendi makinenizde tutmak istediğiniz notlar için kullanın.
