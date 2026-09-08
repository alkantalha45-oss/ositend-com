import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Eyebrow, Reveal, Section } from "./bits";
import {
  ANNUAL_DISCOUNT,
  billing,
  bookingUrl,
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

/** Aylık abonelik neyi somut olarak karşılıyor — kartın "destek kapsamı" bölümü. */
const support = [
  "Teknik düzeltme geri bildirimleri",
  "Haftalık kontrol",
  "Geri dönüşe göre otomasyon güncelleme",
  "Haftalık Q&A destek",
  "7/24 WhatsApp iletişim",
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
  "Yeni bir platform entegrasyonu ya da müşteriye özel rapor tasarımı ayrıca fiyatlanır.";

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
  return (
    <div
      role="radiogroup"
      aria-label="Ödeme dönemi"
      className="mt-7 inline-flex w-full rounded-full border border-line bg-surface p-1"
    >
      {(
        [
          { value: "monthly", label: "Aylık" },
          { value: "yearly", label: `Yıllık −%${ANNUAL_DISCOUNT}` },
        ] as { value: BillingCycle; label: string }[]
      ).map((o) => {
        const active = cycle === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
              active ? "bg-white text-ink shadow-sm" : "text-muted-ink hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
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
      <p className="mt-6 font-display text-4xl font-semibold">
        {tl(shown)}
        <span className="text-base font-medium text-muted-ink"> /ay</span>
      </p>
      <p className="mt-1.5 text-sm text-muted-ink">
        {yearly ? (
          <>
            <span className="line-through">{tl(monthly)}</span> yerine · yıllık{" "}
            <span className="font-medium text-ink">{tl(yearlyTotal(monthly))}</span> peşin
          </>
        ) : (
          "Platform aboneliği ve işletim desteği"
        )}
      </p>
    </>
  );
}

/**
 * İlk ödeme ile sonraki ödemelerin AÇIK matematiği.
 *
 * NEDEN VAR: kart "9.900 TL kurulum" ve "4.900 TL /ay" yazıyordu ama
 * ikisinin nasıl toplandığını hiçbir yerde söylemiyordu. Okuyan "şimdi ben
 * ne ödeyeceğim" sorusunu kafasında hesaplamak zorunda kalıyordu — fiyat
 * sayfasında cevaplanmamış tek soru bu olmamalı. Şimdi ilk ödeme ve
 * sonraki ödeme ayrı ayrı, toplamı alınmış halde yazıyor; tek seferlik
 * kurulum kalemiyle birlikte dikey bir dökümde, sınırlı çizgilerin
 * arasında.
 */
function PriceMath({ cycle }: { cycle: BillingCycle }) {
  const yearly = cycle === "yearly";
  const recurring = yearly ? yearlyTotal(pilot.monthly) : pilot.monthly;
  const first = pilot.setup + recurring;
  const period = yearly ? "yıl" : "ay";

  return (
    <dl className="mt-6 flex flex-col gap-2.5 border-y border-line-soft py-5 text-sm">
      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-muted-ink">Tek seferlik kurulum</dt>
        <dd className="font-display font-semibold whitespace-nowrap">{tl(pilot.setup)}</dd>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-muted-ink">
          İlk ödeme <span className="text-ink">(kurulum + ilk {period})</span>
        </dt>
        <dd className="font-display font-semibold whitespace-nowrap">{tl(first)}</dd>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-muted-ink">Sonraki her {period}</dt>
        <dd className="font-display font-semibold whitespace-nowrap">{tl(recurring)}</dd>
      </div>
    </dl>
  );
}

function PilotCard({ cycle, onChange }: { cycle: BillingCycle; onChange: (c: BillingCycle) => void }) {
  const yearly = cycle === "yearly";

  return (
    <Reveal delay={0.08}>
      <article className="card p-8 sm:p-9">
        <div className="flex items-center justify-between gap-3">
          <span className="font-display text-lg font-semibold">Kurucu pilot</span>
          <span className="rounded-full bg-brand-tint px-3 py-1 text-xs font-medium whitespace-nowrap text-brand">
            {pilot.clients} ajans kontenjanı
          </span>
        </div>

        <CycleToggle cycle={cycle} onChange={onChange} />
        <Price monthly={pilot.monthly} cycle={cycle} />
        <PriceMath cycle={cycle} />

        {bookingUrl ? (
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.9375rem] font-medium text-white shadow-[0_1px_2px_oklch(0.2_0.01_265/0.12),0_10px_26px_-12px_oklch(0.55_0.212_258/0.65)] transition-[background-color,transform] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:bg-brand-deep active:translate-y-px"
          >
            Hadi konuşalım
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        ) : (
          <Link
            to="/iletisim"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.9375rem] font-medium text-white shadow-[0_1px_2px_oklch(0.2_0.01_265/0.12),0_10px_26px_-12px_oklch(0.55_0.212_258/0.65)] transition-[background-color,transform] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:bg-brand-deep active:translate-y-px"
          >
            Hadi konuşalım
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        )}

        <p className="mt-5 text-[0.8125rem] leading-relaxed text-muted-ink">
          {yearly
            ? `Yıllık peşin ödemede %${ANNUAL_DISCOUNT} indirim uygulanır.`
            : `Asgari ${pilot.commitmentMonths} aylık pilot; sonrasında istediğiniz ay bırakırsınız.`}{" "}
          Kurucu fiyatınız {pilot.priceLockMonths} ay sabit kalır. Tüm fiyatlar KDV hariçtir.
          Sözleşme ve fatura {billing.name} üzerinden düzenlenir.
        </p>
        <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-ink">{scopeNote}</p>

        <div className="mt-6 border-t border-line-soft pt-6">
          <p className="text-sm font-medium">Destek kapsamı</p>
          <ul className="mt-4 flex flex-col gap-3">
            {support.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                <span className="leading-relaxed text-muted-ink">{f}</span>
              </li>
            ))}
          </ul>
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

/*
 * İKİ SÜTUNLU DÜZEN (2026-09-07).
 *
 * Kart tek başına ortalanmış hâldeyken hem tanıtım metnini hem fiyatı
 * taşıyordu ve dikeyde çok uzuyordu. Şimdi sol sütun "neden" (başlık, özet,
 * pakete dahil olanlar), sağ sütun "ne kadar" (fiyat kartı) sorusuna
 * cevap veriyor — ikisi yan yana okunuyor.
 */
export function Pricing() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const headingId = useId();

  return (
    <Section id="fiyatlar" className="pb-20 sm:pb-28">
      <div className="grid gap-14 lg:grid-cols-[1fr_460px] lg:items-center lg:gap-20">
        <Reveal>
          <Eyebrow>Fiyatlandırma</Eyebrow>
          <h2 id={headingId} className="mt-6 text-[clamp(2rem,4.2vw,3rem)]">
            Tek panel. <span className="text-brand">Dürüst fiyat.</span>
          </h2>
          <p className="lede mt-6 max-w-md">
            Kurulumu biz yapıyoruz ve bir kez ödüyorsunuz. Aylık ücret, sistemin her ay çalışmaya
            devam etmesinin karşılığı: sunucular, reklam platformu API güncellemeleri, rapor
            üretimi ve destek.
          </p>
          <ul className="mt-7 flex flex-col gap-3">
            {includes.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                <span className="leading-relaxed text-muted-ink">{f}</span>
              </li>
            ))}
          </ul>
          {bookingUrl ? (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-brand"
            >
              Ajansınıza uygun mu? Birlikte bakalım
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <Link
              to="/iletisim"
              className="group mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-brand"
            >
              Ajansınıza uygun mu? Birlikte bakalım
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </Reveal>

        <PilotCard cycle={cycle} onChange={setCycle} />
      </div>
    </Section>
  );
}
