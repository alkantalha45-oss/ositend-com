import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Eyebrow, Reveal, Section } from "./bits";
import {
  ANNUAL_DISCOUNT,
  billing,
  monthlyFor,
  pilot,
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

/*
 * ALTI MADDE, ON DEĞİL.
 *
 * Önceki liste on maddeydi ve "sınırsız ekip kullanıcısı" ile "kurulum
 * bizden" gibi kalemler ayrı satırlardı. Fiyat kartında uzun liste okunmuyor;
 * gözü yoruyor ve kararı kolaylaştırmak yerine zorlaştırıyor. Yakın kalemler
 * birleştirildi, kararı değiştirmeyenler düşürüldü.
 */
const includes = [
  `${pilot.clients} aktif müşteri, ${pilot.sources} veri kaynağına kadar`,
  "Google Ads, Meta Ads ve GA4 bağlantısı",
  "Otomatik aylık PDF raporu + canlı müşteri linki",
  "Tam beyaz etiket — kendi logonuz ve renkleriniz",
  "Anomali uyarıları ve aksiyon önerileri",
  "Kurulum ve şablon hazırlığı bizden, sınırsız ekip kullanıcısı",
];

/*
 * Aboneliğin kapsamı ve kapsam DIŞI — tek cümlede.
 *
 * Bu bilgi önceden iki ayrı kutuydu (beş maddelik "neyi kapsıyor" listesi +
 * kapsam dışı paragrafı) ve fiyat kartının yarısını kaplıyordu. Kapsam dışını
 * yazmaktan vazgeçmiyoruz — sınırsız destek taahhüdü vermemek için gerekli —
 * ama bir cümle yetiyor.
 */
const scopeNote =
  "Aylık ücret sunucu, reklam platformu API güncellemeleri, rapor üretimi ve teknik desteği kapsar. Yeni bir platform entegrasyonu ya da müşteriye özel rapor tasarımı ayrıca fiyatlanır.";

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
/*
 * tnum (tabular-nums) FİYAT SAYILARINDAN KALDIRILDI.
 *
 * Schibsted Grotesk'in tablo rakamlarında binlik ayracı tam bir rakam
 * genişliği kaplıyor; "9.900 TL" ekranda "9 . 900 TL" gibi, ayracın iki
 * yanı boşluklu çıkıyordu ve 4xl puntoda bu bozuk duruyordu. Saygın bir
 * fiyat sayfasında okuyanın durakladığı yer fiyatın kendisi olmamalı.
 *
 * tnum, gerçekten hizalama gereken yerlerde DURUYOR: telefon numarası,
 * telif satırı ve CountUp sayacı (sayacın her karede genişlik değiştirmemesi
 * için orada zorunlu).
 */
function Price({ monthly, cycle }: { monthly: number; cycle: BillingCycle }) {
  const shown = monthlyFor(monthly, cycle);
  const yearly = cycle === "yearly";

  return (
    <>
      <p className="mt-1.5 font-display text-4xl font-semibold">
        {tl(shown)}
        <span className="text-base font-medium text-muted-ink"> /ay</span>
      </p>
      {yearly && (
        <p className="mt-1.5 text-sm text-muted-ink">
          <span className="line-through">{tl(monthly)}</span> yerine · yıllık{" "}
          <span className="font-medium text-ink">{tl(yearlyTotal(monthly))}</span> peşin
        </p>
      )}
    </>
  );
}

/**
 * İlk ödeme ile sonraki ödemelerin AÇIK matematiği.
 *
 * NEDEN VAR: kart iki kutuda "9.900 TL kurulum" ve "4.900 TL /ay" yazıyordu
 * ama ikisinin nasıl toplandığını hiçbir yerde söylemiyordu. Okuyan
 * "şimdi ben ne ödeyeceğim" sorusunu kafasında hesaplamak zorunda kalıyordu
 * — fiyat sayfasında cevaplanmamış tek soru bu olmamalı. Şimdi ilk ödeme ve
 * sonraki ödeme ayrı ayrı, toplamı alınmış halde yazıyor.
 */
function PriceMath({ cycle }: { cycle: BillingCycle }) {
  const yearly = cycle === "yearly";
  const recurring = yearly ? yearlyTotal(pilot.monthly) : pilot.monthly;
  const first = pilot.setup + recurring;
  const period = yearly ? "yıl" : "ay";

  return (
    <div className="mx-auto mt-5 max-w-lg rounded-xl bg-brand-tint/60 px-6 py-5 text-left">
      <dl className="space-y-2 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-muted-ink">
            İlk ödeme <span className="text-ink">(kurulum + ilk {period})</span>
          </dt>
          <dd className="font-display text-base font-semibold whitespace-nowrap">{tl(first)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-t border-brand/15 pt-2">
          <dt className="text-muted-ink">Sonraki her {period}</dt>
          <dd className="font-display text-base font-semibold whitespace-nowrap">
            {tl(recurring)}
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-ink">
        Kurulum ücreti bir kez alınır, tekrar etmez.{" "}
        {yearly
          ? `Yıllık peşin ödemede %${ANNUAL_DISCOUNT} indirim uygulanır.`
          : `Asgari ${pilot.commitmentMonths} aylık pilot; sonrasında istediğiniz ay bırakırsınız.`}{" "}
        Kurucu fiyatınız {pilot.priceLockMonths} ay sabit kalır.
      </p>
    </div>
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
              <p className="mt-1.5 font-display text-3xl font-semibold">{tl(pilot.setup)}</p>
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
              <p className="mt-2 text-sm text-muted-ink">İşletim, bakım ve destek dahil</p>
            </div>
          </div>

          <PriceMath cycle={cycle} />

          <Link
            to="/iletisim"
            className="group mt-7 inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.9375rem] font-medium text-white shadow-[0_1px_2px_oklch(0.2_0.01_265/0.12),0_10px_26px_-12px_oklch(0.55_0.212_258/0.65)] transition-[background-color,transform] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:bg-brand-deep active:translate-y-px"
          >
            Hadi konuşalım
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/*
          KART ALTI KISALTILDI. Önceden burada on maddelik "Pakete dahil"
          listesi, beş maddelik "aylık abonelik neyi kapsıyor" kutusu ve bir de
          "pilot ajanstan beklediğimiz" kutusu vardı — kartın üçte ikisi
          fiyattan sonra geliyordu. Şimdi altı madde ve tek cümlelik kapsam notu.
        */}
        <div className="p-8 sm:p-10">
          <p className="text-sm font-medium">Pakete dahil</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {includes.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                <span className="leading-relaxed text-muted-ink">{f}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.8125rem] leading-relaxed text-muted-ink">{scopeNote}</p>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-ink">
            Tüm fiyatlar KDV hariçtir. Sözleşme ve fatura {billing.name} üzerinden düzenlenir.
          </p>
        </div>
      </article>
    </Reveal>
  );
}

/*
 * PLANLANAN PAKETLER BÖLÜMÜ KALDIRILDI (2026-08-30).
 *
 * "Pilot sonrası planlanan paketler" üç fiyat kartı gösteriyordu ve
 * "henüz satışta değil" etiketi taşıyordu. Satış sayfasında BUGÜN
 * satılmayan bir şey göstermek, ziyaretretin karar vermesi gereken tek
 * teklifin üzerine üç rakam daha koyuyordu; üstelik hepsi pilot fiyatından
 * yüksek olduğu için teklifi güçlendirmiyor, kararı ağırlaştırıyordu.
 *
 * "Pilot bitince fiyat nereye gidiyor" sorusu cevapsız kalmıyor: fiyat
 * kartı kurucu fiyatın {priceLockMonths} ay sabit kaldığını söylüyor.
 * plannedPlans ve extraClientPrice site.ts'te DURUYOR — geri getirilmek
 * istenirse veri hazır.
 */

export function Pricing() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const headingId = useId();

  return (
    <Section className="pb-20 sm:pb-28">
      <Reveal className="text-center">
        <Eyebrow>Fiyatlandırma</Eyebrow>
        <h2 id={headingId} className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,4.8vw,3.25rem)]">
          Tek panel. <span className="text-brand">Dürüst fiyat.</span>
        </h2>
        <p className="lede mx-auto mt-6 max-w-2xl">
          Kurulumu biz yapıyoruz ve bir kez ödüyorsunuz. Aylık ücret, sistemin her ay çalışmaya
          devam etmesinin karşılığı: sunucular, reklam platformu API güncellemeleri, rapor üretimi
          ve destek. Fiyatlar KDV hariçtir.
        </p>
      </Reveal>

      <Reveal delay={0.04}>
        <CycleToggle cycle={cycle} onChange={setCycle} />
      </Reveal>

      <PilotOffer cycle={cycle} />
    </Section>
  );
}
