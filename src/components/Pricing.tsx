import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Eyebrow, Reveal, Section } from "./bits";
import {
  ANNUAL_DISCOUNT,
  billing,
  extraClientPrice,
  monthlyFor,
  pilot,
  plannedPlans,
  tl,
  yearlyTotal,
  type BillingCycle,
} from "../lib/site";

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
 * API güncellemeleri ve destek için ödüyor.
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

/**
 * Aylık / yıllık anahtarı.
 *
 * radiogroup olarak işaretlendi, iki buton olarak DEĞİL: ekran okuyucuya
 * "iki seçenekten biri" diye duyurulması gerekiyor, "iki ayrı düğme" diye
 * değil. Ok tuşlarıyla gezinme de bu sayede beklendiği gibi çalışıyor.
 */
function CycleToggle({
  cycle,
  onChange,
}: {
  cycle: BillingCycle;
  onChange: (c: BillingCycle) => void;
}) {
  const options: { value: BillingCycle; label: string }[] = [
    { value: "monthly", label: "Aylık" },
    { value: "yearly", label: "Yıllık" },
  ];

  return (
    <div className="mt-8 flex flex-col items-center gap-2.5">
      <div
        role="radiogroup"
        aria-label="Ödeme dönemi"
        className="inline-flex rounded-full border border-line bg-white p-1"
      >
        {options.map((o) => {
          const active = cycle === o.value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                active ? "bg-brand text-white" : "text-muted-ink hover:text-ink"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      <p className="text-[0.8125rem] text-muted-ink">
        Yıllık peşin ödemede{" "}
        <span className="font-medium text-brand">%{ANNUAL_DISCOUNT} indirim</span>
      </p>
    </div>
  );
}

/**
 * Fiyat gösterimi.
 *
 * Yıllık seçildiğinde de ekrandaki büyük sayı AYLIK KARŞILIK olarak
 * kalıyor, yıllık toplam altına yazılıyor. Bir paketi aylık, diğerini
 * yıllık toplamla göstermek karşılaştırmayı imkânsız kılan klasik hata —
 * ziyaretçi 4.900 ile 47.040'ı yan yana görüp kafası karışıyor.
 */
function Price({ monthly, cycle }: { monthly: number; cycle: BillingCycle }) {
  const shown = monthlyFor(monthly, cycle);
  const yearly = cycle === "yearly";

  return (
    <>
      <p className="tnum mt-1.5 font-display text-4xl font-semibold">
        {tl(shown)}
        <span className="text-base font-medium text-muted-ink"> /ay</span>
      </p>
      {yearly && (
        <p className="mt-1.5 text-sm text-muted-ink">
          <span className="tnum line-through">{tl(monthly)}</span> yerine · yıllık{" "}
          <span className="tnum font-medium text-ink">{tl(yearlyTotal(monthly))}</span> peşin
        </p>
      )}
    </>
  );
}

function PilotOffer({ cycle }: { cycle: BillingCycle }) {
  return (
    <Reveal delay={0.08}>
      <article className="relative mx-auto mt-10 max-w-3xl rounded-2xl border-2 border-brand bg-white shadow-[0_18px_50px_-24px_oklch(0.48_0.15_257.3/0.55)]">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3.5 py-1 text-xs font-medium whitespace-nowrap text-white">
          Kurucu pilot · {pilot.clients} ajans kontenjanı
        </span>

        <div className="border-b border-line-soft p-8 pt-10 text-center sm:p-10 sm:pt-12">
          <div className="mx-auto grid max-w-lg gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft sm:grid-cols-2">
            <div className="bg-surface p-6">
              <p className="text-xs font-medium tracking-wide text-muted-ink uppercase">
                Tek seferlik kurulum
              </p>
              <p className="tnum mt-1.5 font-display text-4xl font-semibold">{tl(pilot.setup)}</p>
              {/* Kurulum ücreti dönemden bağımsız: yapılan iş bir kez yapılıyor. */}
              <p className="mt-2 text-sm text-muted-ink">
                Hesap bağlama, marka tanımı, şablon hazırlığı
              </p>
            </div>
            <div className="bg-surface p-6">
              <p className="text-xs font-medium tracking-wide text-muted-ink uppercase">
                Platform aboneliği
              </p>
              <Price monthly={pilot.monthly} cycle={cycle} />
              <p className="mt-2 text-sm text-muted-ink">İşletim ve destek dahil</p>
            </div>
          </div>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-ink">
            {cycle === "yearly" ? (
              <>
                Yıllık peşin ödemede %{ANNUAL_DISCOUNT} indirim uygulanır ve dönem 12 ay olarak
                işler. Kurucu fiyatınız {pilot.priceLockMonths} ay boyunca sabit kalır — kontenjan
                dolup liste fiyatına geçilse bile.
              </>
            ) : (
              <>
                Asgari {pilot.commitmentMonths} aylık ücretli pilot. Bu süre dolduktan sonra aylık
                devam eder, istediğiniz ay bırakırsınız. Kurucu fiyatınız {pilot.priceLockMonths} ay
                boyunca sabit kalır — kontenjan dolup liste fiyatına geçilse bile.
              </>
            )}
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
 * gidiyor" sorusunun cevabını görmeden taahhüde girmez.
 */
function PlannedPlans({ cycle }: { cycle: BillingCycle }) {
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
                <span className="tnum font-display text-3xl font-semibold">
                  {tl(monthlyFor(p.monthly, cycle))}
                </span>
                <span className="text-sm text-muted-ink"> /ay</span>
                {cycle === "yearly" && (
                  <p className="tnum mt-1 text-xs text-muted-ink">
                    <span className="line-through">{tl(p.monthly)}</span> · yıllık{" "}
                    {tl(yearlyTotal(p.monthly))}
                  </p>
                )}
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
          <li>Yıllık peşin ödemede %{ANNUAL_DISCOUNT} indirim.</li>
          <li>
            Tüm fiyatlar KDV hariçtir. Sözleşme ve fatura {billing.name} üzerinden düzenlenir.
          </li>
        </ul>
      </div>
    </Reveal>
  );
}

export function Pricing() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const headingId = useId();

  return (
    <Section className="pb-20 sm:pb-28">
      <Reveal className="text-center">
        <Eyebrow>Fiyatlandırma</Eyebrow>
        <h2 id={headingId} className="mx-auto mt-6 max-w-2xl text-[clamp(1.875rem,4.4vw,2.875rem)]">
          Kurulum bir kez, platform aylık.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-ink">
          Kurulumu biz yapıyoruz ve bir kez ödüyorsunuz. Aylık ücret, sistemin her ay çalışmaya
          devam etmesinin karşılığı: sunucular, reklam platformu API güncellemeleri, rapor üretimi
          ve destek. Fiyatlar KDV hariçtir.
        </p>
      </Reveal>

      <Reveal delay={0.04}>
        <CycleToggle cycle={cycle} onChange={setCycle} />
      </Reveal>

      <PilotOffer cycle={cycle} />
      <PlannedPlans cycle={cycle} />
    </Section>
  );
}
