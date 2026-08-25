import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Eyebrow, Reveal, Section } from "./bits";
import { annualDiscount, extraClientPrice, pilot, plannedPlans, tl } from "../lib/site";

/*
 * TEK SEFERLİK ÜCRET MODELİ KALDIRILDI.
 *
 * Önceki hali 5.999 TL tek seferlik ödemeydi ve açıkça "aylık ücret yok,
 * sınırsız müşteri" diyordu. Bu model sürdürülemezdi:
 *
 *  - Ürün teslim edilip biten bir yazılım değil. Sunucu, zamanlanmış
 *    görevler, PDF üretimi (Playwright), e-posta gönderimi ve OAuth
 *    token yenileme müşteri kaldığı sürece çalışıyor; hepsinin aylık
 *    maliyeti var.
 *  - Google Ads API sürümleri yaklaşık bir yıl içinde kapanıyor. Her
 *    kapanış, isteğe bağlı değil ZORUNLU bir geliştirme demek. Tek
 *    seferlik ücretle bu iş süresiz olarak bedava taahhüt edilmiş oluyordu.
 *  - "Sınırsız müşteri" maliyeti müşteri sayısıyla doğrusal artan bir
 *    üründe sabit fiyata bağlanamaz.
 *
 * DİL: "aylık bakım ücreti" DEĞİL, "platform aboneliği ve işletim desteği".
 * Müşteri hata düzeltmesi için para ödemiyor; sunucu, izleme, yedekleme,
 * API güncellemeleri ve destek için ödüyor. "Bakım" kelimesi ödediği şeyi
 * yanlış tarif ediyor ve haklı olarak "neden bozuk şeyin parasını
 * ödüyorum" sorusunu doğuruyor.
 */

const includes = [
  `${pilot.clients} aktif müşteri, ${pilot.sources} veri kaynağına kadar`,
  "Google Ads, Meta Ads ve GA4 hesaplarının bağlanması",
  "Otomatik aylık PDF raporu",
  `${pilot.templates} adet ajans markalı rapor şablonu`,
  "Tam beyaz etiket — kendi logonuz ve renkleriniz",
  "Canlı müşteri portalı ve paylaşılabilir link",
  "Anomali uyarıları + aksiyon önerileri",
  "Haftalık portföy özeti e-postası",
  "Sınırsız ekip kullanıcısı",
  "Kurulum, marka tanımı ve şablon hazırlığı bizden",
];

const subscriptionCovers = [
  "Sunucu, izleme ve yedekleme",
  "Reklam platformu API güncellemeleri",
  "Bağlantı kopmalarının giderilmesi",
  "PDF üretimi ve e-posta gönderimi",
  "Standart teknik destek",
];

/** Abonelik dışında kalan, ayrı fiyatlanan işler — sınırsız destek taahhüdü vermemek için. */
const outOfScope =
  "Yeni bir platform entegrasyonu, müşteriye özel KPI tanımı, ek rapor tasarımı veya yol haritasında olmayan bir özellik talebi ayrıca fiyatlanır.";

function PilotOffer() {
  return (
    <Reveal delay={0.08}>
      <article className="relative mx-auto mt-12 max-w-3xl rounded-2xl border-2 border-brand bg-white shadow-[0_18px_50px_-24px_oklch(0.48_0.15_257.3/0.55)]">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3.5 py-1 text-xs font-medium text-white">
          Kurucu pilot · {pilot.clients} ajans kontenjanı
        </span>

        <div className="border-b border-line-soft p-8 pt-10 text-center sm:p-10 sm:pt-12">
          <div className="mx-auto grid max-w-lg gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft sm:grid-cols-2">
            <div className="bg-surface p-6">
              <p className="text-xs font-medium tracking-wide text-muted-ink uppercase">
                Tek seferlik kurulum
              </p>
              <p className="tnum mt-1.5 font-display text-4xl font-semibold">{tl(pilot.setup)}</p>
              <p className="mt-2 text-sm text-muted-ink">
                Hesap bağlama, marka tanımı, şablon hazırlığı
              </p>
            </div>
            <div className="bg-surface p-6">
              <p className="text-xs font-medium tracking-wide text-muted-ink uppercase">
                Platform aboneliği
              </p>
              <p className="tnum mt-1.5 font-display text-4xl font-semibold">
                {tl(pilot.monthly)}
                <span className="text-base font-medium text-muted-ink"> /ay</span>
              </p>
              <p className="mt-2 text-sm text-muted-ink">İşletim ve destek dahil</p>
            </div>
          </div>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-ink">
            Asgari {pilot.commitmentMonths} aylık ücretli pilot. Bu süre dolduktan sonra aylık devam
            eder, istediğiniz ay bırakırsınız. Kurucu fiyatınız {pilot.priceLockMonths} ay boyunca
            sabit kalır — kontenjan dolup liste fiyatına geçilse bile.
          </p>

          <Link
            to="/iletisim"
            className="group mt-7 inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-colors duration-200 hover:bg-brand-ink"
          >
            Pilot programa başvurun
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="p-8 sm:p-10">
          <p className="text-sm font-medium">Pakete dahil:</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {includes.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                <span className="leading-relaxed text-muted-ink">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl bg-surface p-6">
            <p className="text-sm font-medium">Aylık abonelik neyi kapsıyor?</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {subscriptionCovers.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-muted-ink">
                  <span aria-hidden className="size-1 rounded-full bg-brand" />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted-ink">{outOfScope}</p>
          </div>

          <div className="mt-6 rounded-xl border border-line-soft p-6">
            <p className="text-sm font-medium">Pilot ajanstan beklediğimiz</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-ink">
              İndirimli fiyatın karşılığı düzenli geri bildirim: ayda bir kısa görüşme ve ürünü
              gerçek portföyünüzde kullanmanız. İşe yararsa referans olmanızı ve bir vaka çalışması
              yayınlamamızı rica ediyoruz — ikisi de sizin onayınıza bağlı, zorunlu değil.
            </p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/**
 * Pilot sonrası planlanan paketler.
 *
 * "Planlanan" etiketi kozmetik değil: bu paketlerle bugün satış
 * yapmıyoruz. Satılmayan bir paketi satılıyormuş gibi göstermek,
 * siteden temizlediğimiz sahte sosyal kanıtın fiyat tarafındaki hali
 * olurdu. Yine de gösteriyoruz, çünkü ajans "pilot bitince fiyat nereye
 * gidiyor" sorusunun cevabını görmeden üç aylık taahhüde girmez.
 */
function PlannedPlans() {
  return (
    <Reveal delay={0.16}>
      <div className="mx-auto mt-16 max-w-3xl">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-medium">Pilot sonrası planlanan paketler</h3>
          <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted-ink">
            henüz satışta değil
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-ink">
          Ürün birkaç ajansla doğrulandıktan sonra geçmeyi planladığımız liste fiyatları. Pilot
          ajanslar bu geçişten {pilot.priceLockMonths} ay boyunca etkilenmez.
        </p>

        <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line-soft bg-line-soft sm:grid-cols-3">
          {plannedPlans.map((p) => (
            <div key={p.name} className="bg-white px-6 py-7 text-center">
              <dt className="text-sm font-medium text-ink">{p.name}</dt>
              <dd className="mt-3">
                <span className="tnum font-display text-3xl font-semibold">{tl(p.monthly)}</span>
                <span className="text-sm text-muted-ink"> /ay</span>
                <p className="mt-2 text-sm text-muted-ink">{p.clients} aktif müşteriye kadar</p>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-5 space-y-1.5 text-sm text-muted-ink">
          <li>
            Paket limitini aşan her müşteri için {tl(extraClientPrice.min)}–
            {tl(extraClientPrice.max)} aylık ek ücret.
          </li>
          <li>
            Yıllık peşin ödemede %{annualDiscount.min}–{annualDiscount.max} indirim.
          </li>
          <li>Tüm fiyatlar KDV hariçtir.</li>
        </ul>
      </div>
    </Reveal>
  );
}

export function Pricing() {
  return (
    <Section className="pb-20 sm:pb-28">
      <Reveal className="text-center">
        <Eyebrow>Fiyatlandırma</Eyebrow>
        <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(1.875rem,4.4vw,2.875rem)]">
          Kurulum bir kez, platform aylık.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-ink">
          Kurulumu biz yapıyoruz ve bir kez ödüyorsunuz. Aylık ücret, sistemin her ay çalışmaya devam
          etmesinin karşılığı: sunucular, reklam platformu API güncellemeleri, rapor üretimi ve
          destek. Fiyatlar KDV hariçtir.
        </p>
      </Reveal>

      <PilotOffer />
      <PlannedPlans />
    </Section>
  );
}
