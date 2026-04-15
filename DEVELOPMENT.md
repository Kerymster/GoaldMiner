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

## API katmanı

- HTTP istekleri `fetchJson` üzerinden (`src/api/client.ts`); taban URL `VITE_API_URL` / `src/api/config.ts`.
- Yol önekleri (`/api/players`, `/api/teams`, `/api/leagues`) **`src/api/endpoints.ts`** içinde toplanır; yeni endpoint eklerken önce buraya, sonra ilgili `*.ts` modülüne eklenir.
- Ham path string’leri API modülleri dışında tekrarlanmaz.
- **Veri çekme ve hook’lar:** İstekler, yükleme/hata durumu ve türetilmiş state mümkün olduğunca **`src/hooks/`** içindeki custom hook’larda toplanır; sayfa ve görünüm bileşenleri mümkün olduğunca sadece hook çıktısını kullanır ve olayları iletir. API fonksiyonları (`src/api/*.ts`) doğrudan bileşen içinde çağrılmak yerine bu hook’lar üzerinden kullanılmayı hedefler. İstisnalar (çok lokal, tek seferlik arama vb.) makul olduğunda kabul edilir; yine de önce mevcut hook’lara ekleme veya genelleştirme düşünülür.
- **Önce Redux:** Aşağıdaki **Redux** maddesine uygun olarak, istek atmadan önce verinin store’da zaten yüklü olup olmadığı göz önünde bulundurulur.

## Bileşen ve sayfa organizasyonu

- **Önce kontrol:** Yeni bileşen, ikon, yardımcı fonksiyon veya hook eklemeden önce `src/components/`, `src/components/icons/`, `src/hooks/` ve ilgili `src/pages/` altında mevcut çözümlere bakın; aynı ihtiyacı karşılayan parça varsa yeniden kullanın veya genişletin.
- Paylaşılan parçalar `src/components/`; route sayfaları `src/pages/<alan>/`.
- **İkonlar:** SVG ikonlar `src/components/icons/` altında toplanır (ör. `index.tsx` içinde export); sayfa veya özellik dosyasına gömülü yeni `<svg>` eklemek yerine önce bu klasörde aynı sembol var mı bakın.
- **Küçük ve odaklı bileşenler:** Mümkün olduğunca tek sorumluluk; dosya uzadıkça veya okunurluk düştükçe mantıklı sınırlarla alt bileşenlere / alt klasörlere ayrılır (ör. `src/components/top-bar/`). Aşırı parçalamadan kaçının: birlikte anlam taşıyan UI bir arada kalsın.
- Liste satırları ve kartlar mümkünse `Link` ile yönlendirme kullanır; gereksiz `div` + `onClick` kaçınılır.

## Etkileşim ve UX

- Gerçek `<button>` öğelerinde imleç: `cursor-pointer`; `disabled` durumunda `disabled:cursor-not-allowed` tercih edilir.
- Tam ekran overlay / arka plan tıklaması gibi “görünmez” kontrollerde `cursor-default` bilinçli kullanılabilir.
- Form kontrolleri (`select`, vb.) için proje genelinde aynı imleç tutarlılığı isteniyorsa ortak input sınıflarına `cursor-pointer` eklenebilir.

## Redux

- Slice’lar `src/features/<özellik>/`; selector’lar `src/store/selectors/` altında tutulabilir.
- Sayfa bileşenleri mümkün olduğunca ince kalır; veri yükleme ve türetilmiş state uygun yerde hook veya selector ile çözülür.
- **Tekrar istekten kaçınma:** Lig listesi, takım meta bilgisi gibi paylaşılan ve Redux’ta tutulan genel verilere ihtiyaç varsa önce ilgili **selector** ve slice durumu (`loaded`, `status`, vb.) kontrol edilir; veri zaten uygun şekilde duruyorsa aynı kaynak için yeni API isteği atılmaz. Yalnızca eksik, eski veya sayfa özelinde detay gerekiyorsa (ör. tek kayıt detayı) hedefe uygun istek yapılır.

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
