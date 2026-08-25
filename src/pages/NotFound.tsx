import { Button, Section } from "../components/bits";
import { useSeo } from "../lib/seo";

/**
 * 404 sayfası.
 *
 * Sunucu tarafında SPA kuralı bilinmeyen her yolu index.html'e düşürüyor;
 * eşleşen bir rota olmadığı için ziyaretçi başlık ve altbilgi arasında BOŞ
 * bir sayfa görüyordu. Arama motoru açısından da kötü: var olmayan bir
 * adres 200 dönüyor ve içerik boş görünüyor.
 *
 * noindex bu yüzden önemli — SPA'da 404 için gerçek bir HTTP durum kodu
 * döndüremiyoruz, en azından bu sayfaların dizine girmesini engelliyoruz.
 */
export function NotFound() {
  useSeo({
    title: "Sayfa bulunamadı — Ositend",
    description: "Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.",
    path: "/404",
    noindex: true,
  });

  return (
    <Section className="py-24 text-center sm:py-32">
      <p className="tnum font-display text-6xl font-semibold text-brand">404</p>
      <h1 className="mx-auto mt-6 max-w-lg text-[clamp(1.5rem,3.4vw,2.25rem)]">
        Bu sayfayı bulamadık.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-ink">
        Adres taşınmış ya da yanlış yazılmış olabilir. Aşağıdaki bağlantılardan devam edebilirsiniz.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/">Ana sayfa</Button>
        <Button to="/hizmetler" variant="secondary">
          Hizmetler
        </Button>
        <Button to="/iletisim" variant="secondary">
          İletişim
        </Button>
      </div>
    </Section>
  );
}
