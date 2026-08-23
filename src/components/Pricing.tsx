import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Eyebrow, Reveal, Section } from "./bits";

const try_ = (n: number) => `₺${n.toLocaleString("tr-TR")}`;

// TEK PAKET, TEK ÜCRET: Önceden üç kademe (Başlangıç/Profesyonel/Kurumsal) ve
// müşteri başına aylık bakım vardı. İlk müşteriyi kazanma aşamasında kademe
// karşılaştırması karar felci yaratıyor — tek seferlik tek fiyata indirildi.
// Abonelik modeline sonra geçilecek; o zaman bu bileşen tekrar kademelenecek.
const SETUP_PRICE = 5999;

const includes = [
  "Google Ads, Meta Ads ve GA4 hesaplarının bağlanması",
  "Otomatik aylık PDF raporu",
  "Tam beyaz etiket — kendi logonuz ve renkleriniz",
  "Canlı müşteri portalı ve paylaşılabilir link",
  "Anomali uyarıları + aksiyon önerileri",
  "Haftalık portföy özeti e-postası",
  "Tüm rapor şablonları",
  "Sınırsız ekip kullanıcısı",
  "Marka kurulumu ve şablon hazırlığı bizden",
  "Kurulum sonrası destek",
];

export function Pricing() {
  return (
    <Section className="pb-20 sm:pb-28">
      <Reveal className="text-center">
        <Eyebrow>Fiyatlandırma</Eyebrow>
        <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(1.875rem,4.4vw,2.875rem)]">
          Tek seferlik kurulum. Aylık ücret yok.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-ink">
          Hesaplarınızı bağlama, marka kurulumu ve şablon hazırlığını biz yapıyoruz. Bir kez
          ödersiniz, sistem her ay raporlarınızı kendiliğinden üretmeye devam eder — abonelik,
          müşteri başına ücret veya sürpriz kalem yok.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <article className="relative mx-auto mt-12 max-w-3xl rounded-2xl border-2 border-brand bg-white shadow-[0_18px_50px_-24px_oklch(0.48_0.15_257.3/0.55)]">
          <div className="border-b border-line-soft p-8 text-center sm:p-10">
            <div className="mx-auto max-w-sm rounded-xl bg-surface p-6">
              <p className="text-xs font-medium tracking-wide text-muted-ink uppercase">
                Tek seferlik kurulum
              </p>
              <p className="tnum mt-1.5 font-display text-5xl font-semibold">
                {try_(SETUP_PRICE)}
              </p>
              <p className="mt-2 text-sm text-muted-ink">Sonrasında aylık ödeme yok</p>
            </div>

            <Link
              to="/iletisim"
              className="group mt-7 inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-colors duration-200 hover:bg-brand-ink"
            >
              Kuruluma başlayalım
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="p-8 sm:p-10">
            <p className="text-sm font-medium">Her şey dahil:</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {includes.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span className="leading-relaxed text-muted-ink">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-ink">
          İlk 14 gün ücretsiz; kurulum ücreti deneme sonunda tahsil edilir. Fiyata KDV dahil
          değildir.
        </p>
      </Reveal>
    </Section>
  );
}
