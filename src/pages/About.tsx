import { Building2, Lock, Sparkles, Target } from "lucide-react";
import { ClosingCta, Eyebrow, PageHero, Reveal, Section, Shot } from "../components/bits";
import { useSeo } from "../lib/seo";

const principles = [
  {
    icon: Target,
    title: "Tek bir problem",
    body: "Ositend bir 'her şey platformu' değil. Ajansın müşteriye gönderdiği aylık raporu otomatikleştiriyoruz — ve sadece onu.",
  },
  {
    icon: Sparkles,
    title: "Ajansın markası, bizimki değil",
    body: "Müşterinizin gördüğü her sayfada sizin logonuz var. Ositend adı raporun hiçbir yerinde geçmez.",
  },
  {
    icon: Lock,
    title: "Veri sizin kalır",
    body: "Reklam hesaplarınıza salt-okunur erişim isteriz. Veriyi satmayız, model eğitiminde kullanmayız, istediğiniz an bağlantıyı koparırsınız.",
  },
  {
    icon: Building2,
    title: "Türkiye'de, Türkçe",
    body: "Destek ekibiyle Türkçe konuşursunuz, faturayı TL alırsınız, raporlar Türk müşteriye sunulacak dille yazılır.",
  },
];

/*
 * UYDURMA GEÇMİŞ KALDIRILDI.
 *
 * Burada "ilk ay 900'den fazla rapor otomatik üretildi" ve "120 ajansı
 * geçtik" yazıyordu; ikisi de doğru değildi. Bölümün başlığı zaten
 * "Yol haritası" — o yüzden gerçekten yol haritası yapıldı: neyin bugün
 * çalıştığı, neyin sırada olduğu. Bu liste doğrulanabilir ve satış
 * görüşmesinde savunulabilir.
 */
const roadmap = [
  {
    phase: "Hazır",
    body: "Google Ads, Meta Ads ve GA4 bağlantısı; markalı PDF raporu; paylaşılabilir canlı müşteri portalı; anomali uyarıları; haftalık portföy özeti; ekip ve rol yönetimi.",
  },
  {
    phase: "Sırada",
    body: "Google Ads API üzerinden tam otomatik veri çekimi (Basic Access başvurumuz Google'da değerlendirmede), Search Console entegrasyonu ve rapor şablonu düzenleyicisi.",
  },
  {
    phase: "Sonra",
    body: "LinkedIn Ads ve TikTok Ads kaynakları, müşteriye özel KPI tanımları, portal linkleri için son kullanma tarihi ve isteğe bağlı parola.",
  },
];

export function About() {
  useSeo({
    title: "Hakkımızda — Ositend",
    description:
      "Ositend'i kendi ajansımızda her ay rapor hazırlarken kaybettiğimiz zamanı geri almak için yazdık. Nasıl çalıştığımız, ilkelerimiz ve ürün yol haritası.",
    path: "/hakkimizda",
  });

  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title={
          <>
            Biz de bir ajanstan <span className="text-brand">çıktık.</span>
          </>
        }
        lede="Ositend'i kuran ekip, yıllarca kendi müşterileri için elle rapor hazırladı. Ürünü, o gecelerin bir daha yaşanmaması için yaptık."
      />

      <Section className="pb-20 sm:pb-28">
        <Reveal>
          <Shot
            src="/shots/panel-raporlar.png"
            alt="Ositend panelinde rapor arşivi görünümü"
            zoom
          />
        </Reveal>
      </Section>

      <Section className="pb-20 sm:pb-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Hikâye</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-5 text-base leading-relaxed text-muted-ink sm:text-lg">
              <p>
                2024'ün bir kasım gecesi, on bir müşterinin aylık raporunu yetiştirmek için ofiste
                kalan üç kişiydik. Excel'de birleşmeyen sütunlar, slaytta kayan grafikler, sabaha
                karşı yazılan yorumlar.
              </p>
              <p>
                O gece şunu fark ettik: müşterilerimize sattığımız şey analizdi, ama zamanımızın
                neredeyse tamamını kopyala-yapıştıra harcıyorduk. Değer yaratan kısım, mekanik kısmın
                altında kalmıştı.
              </p>
              <p className="font-medium text-ink">
                Ositend bu ayrımı geri kurmak için var: mekanik kısmı yazılım yapsın, analiz kısmını
                siz yapın.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <div className="border-y border-line-soft bg-surface">
        <Section className="py-20 sm:py-28">
          <Reveal className="text-center">
            <Eyebrow>İlkeler</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,4.8vw,3.25rem)]">
              Nasıl çalıştığımıza dair dört karar.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <article className="card h-full p-7">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-brand-tint text-brand">
                    <p.icon className="size-[1.125rem]" />
                  </span>
                  <h3 className="mt-5 text-lg font-medium">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-ink">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      <Section className="py-20 sm:py-28">
        <Reveal className="text-center">
          <Eyebrow>Yol haritası</Eyebrow>
        </Reveal>
        <ol className="mx-auto mt-12 max-w-3xl">
          {roadmap.map((r, i) => (
            <Reveal key={r.phase} delay={i * 0.08}>
              <li className="grid gap-2 border-t border-line-soft py-7 sm:grid-cols-[8rem_1fr] sm:gap-8">
                <span className="font-display text-2xl font-semibold text-brand">{r.phase}</span>
                <p className="text-base leading-relaxed text-muted-ink">{r.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <ClosingCta />
    </>
  );
}
