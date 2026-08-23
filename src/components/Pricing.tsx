import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Minus } from "lucide-react";
import { Eyebrow, Reveal, Section } from "./bits";

const try_ = (n: number) => `₺${n.toLocaleString("tr-TR")}`;

type Tier = {
  id: string;
  name: string;
  pitch: string;
  setup: number;
  monthly: number;
  maxClients: number | null;
  maxLabel: string;
  featured?: boolean;
  badge?: string;
  cta: string;
  includes: string[];
  excludes?: string[];
};

const tiers: Tier[] = [
  {
    id: "baslangic",
    name: "Başlangıç",
    pitch: "Tek kişilik ekipler ve ilk müşterilerini raporlayan yeni ajanslar için.",
    setup: 3815,
    monthly: 1415,
    maxClients: 3,
    maxLabel: "3 müşteriye kadar",
    cta: "Başlangıç ile devam et",
    includes: [
      "Otomatik aylık PDF raporu",
      "Google Ads + GA4 entegrasyonu",
      "1 hazır rapor şablonu",
      "2 ekip kullanıcısı",
      "E-posta desteği (48 saat)",
    ],
    excludes: [
      "Beyaz etiket yok — rapor Ositend logosuyla çıkar",
      "Canlı müşteri portalı yok",
      "Anomali uyarıları yok",
      "Meta Ads entegrasyonu yok",
    ],
  },
  {
    id: "profesyonel",
    name: "Profesyonel",
    pitch: "Portföyünü büyüten, müşterisine kendi markasıyla rapor sunan ajanslar için.",
    setup: 5215,
    monthly: 1715,
    maxClients: 25,
    maxLabel: "25 müşteriye kadar",
    featured: true,
    badge: "En çok tercih edilen",
    cta: "Profesyonel ile başla",
    includes: [
      "Başlangıç'taki her şey, artı:",
      "Tam beyaz etiket — kendi logonuz ve renkleriniz",
      "Meta Ads entegrasyonu (3 kanal birden)",
      "Canlı müşteri portalı ve paylaşılabilir link",
      "Anomali uyarıları + aksiyon önerileri",
      "Haftalık portföy özeti e-postası",
      "Sınırsız ekip kullanıcısı",
      "Tüm rapor şablonları",
      "Öncelikli destek (aynı iş günü)",
    ],
  },
  {
    id: "kurumsal",
    name: "Kurumsal",
    pitch: "Çok sayıda müşteriyi yöneten, kendi altyapısına bağlanmak isteyen ajanslar için.",
    setup: 14850,
    monthly: 2940,
    maxClients: null,
    maxLabel: "Sınırsız müşteri",
    cta: "Satışla görüşün",
    includes: [
      "Profesyonel'deki her şey, artı:",
      "Kendi alan adınız (rapor.ajansiniz.com)",
      "API erişimi ve veri dışa aktarım",
      "Size özel rapor şablonu tasarımı",
      "SSO ile ekip girişi",
      "Adanmış müşteri temsilcisi",
      "%99,9 SLA garantisi",
      "Ekibinize canlı onboarding eğitimi",
    ],
  },
];

const clientOptions = [3, 5, 10, 20];

export function Pricing() {
  const [clients, setClients] = useState(5);

  // Başlangıç → Profesyonel aylık farkı; yalnızca Başlangıç'ın kapasitesi yettiğinde anlamlı.
  const basic = tiers[0];
  const target = tiers[1];
  const basicFits = basic.maxClients !== null && clients <= basic.maxClients;
  const upgradeDelta = basicFits ? (target.monthly - basic.monthly) * clients : null;

  return (
    <Section className="pb-20 sm:pb-28">
      <Reveal className="text-center">
        <Eyebrow>Fiyatlandırma</Eyebrow>
        <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(1.875rem,4.4vw,2.875rem)]">
          Kurulum bir kez. Sonrası aylık bakım.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-ink">
          Hesaplarınızı bağlama, marka kurulumu ve şablon hazırlığını biz yapıyoruz — bu tek seferlik
          kurulum ücreti. Sonrasında yalnızca raporladığınız müşteri başına aylık bakım ödersiniz.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-sm text-muted-ink">Kaç müşteri raporluyorsunuz?</p>
          <div
            role="radiogroup"
            aria-label="Müşteri sayısı"
            className="inline-flex rounded-lg border border-line bg-white p-1"
          >
            {clientOptions.map((n) => (
              <button
                key={n}
                role="radio"
                aria-checked={clients === n}
                onClick={() => setClients(n)}
                className={`tnum rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  clients === n ? "bg-brand text-white" : "text-muted-ink hover:text-ink"
                }`}
              >
                {n === 20 ? "20+" : n}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid items-start gap-5 lg:grid-cols-3">
        {tiers.map((t, i) => {
          const overCap = t.maxClients !== null && clients > t.maxClients;
          const monthlyTotal = t.monthly * clients;

          return (
            <Reveal
              key={t.id}
              delay={i * 0.07}
              className={`h-full ${t.featured ? "order-first lg:order-none" : ""}`}
            >
              <article
                className={`relative flex h-full flex-col rounded-2xl border bg-white ${
                  t.featured
                    ? "border-2 border-brand shadow-[0_18px_50px_-24px_oklch(0.48_0.15_257.3/0.55)] lg:-mt-4"
                    : "border-line-soft"
                }`}
              >
                {t.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3.5 py-1 text-xs font-medium whitespace-nowrap text-white">
                    {t.badge}
                  </span>
                )}

                <div className={`border-b border-line-soft p-7 ${t.featured ? "pt-9" : ""}`}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold">{t.name}</h3>
                    <span className="text-xs font-medium text-muted-ink">{t.maxLabel}</span>
                  </div>
                  <p className="mt-2.5 min-h-[3.25rem] text-sm leading-relaxed text-muted-ink">
                    {t.pitch}
                  </p>

                  <div className="mt-6 rounded-xl bg-surface p-4">
                    <p className="text-xs font-medium tracking-wide text-muted-ink uppercase">
                      Tek seferlik kurulum
                    </p>
                    <p className="tnum mt-1 font-display text-3xl font-semibold">{try_(t.setup)}</p>
                  </div>

                  <div className="mt-3 rounded-xl bg-surface p-4">
                    <p className="text-xs font-medium tracking-wide text-muted-ink uppercase">
                      Aylık bakım
                    </p>
                    <p className="mt-1 flex items-baseline gap-1.5">
                      <span className="tnum font-display text-3xl font-semibold">
                        {try_(t.monthly)}
                      </span>
                      <span className="text-sm text-muted-ink">/ müşteri / ay</span>
                    </p>
                    {overCap ? (
                      <p className="mt-2 text-xs leading-relaxed font-medium text-danger">
                        {clients} müşteri bu pakete sığmıyor — {t.maxLabel.toLowerCase()}.
                      </p>
                    ) : (
                      <p className="tnum mt-2 text-xs text-muted-ink">
                        {clients} müşteri için aylık {try_(monthlyTotal)}
                      </p>
                    )}

                    {t.featured && upgradeDelta !== null && (
                      <p className="tnum mt-2.5 rounded-lg bg-brand-tint px-3 py-2 text-xs leading-relaxed font-medium text-brand-ink">
                        Başlangıç'tan yalnızca {try_(upgradeDelta)} / ay fazlası — beyaz etiket,
                        Meta Ads ve anomali uyarıları dahil.
                      </p>
                    )}
                  </div>

                  <Link
                    to="/iletisim"
                    className={`group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-[0.9375rem] font-medium transition-colors duration-200 ${
                      t.featured
                        ? "bg-brand text-white hover:bg-brand-ink"
                        : "border border-line bg-white text-ink hover:bg-surface"
                    }`}
                  >
                    {t.cta}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <ul className="space-y-3">
                    {t.includes.map((f, idx) => {
                      const isLeadIn = f.endsWith("artı:");
                      return (
                        <li
                          key={f}
                          className={`flex items-start gap-3 text-sm ${
                            isLeadIn ? "pb-1 font-medium text-ink" : ""
                          }`}
                        >
                          {isLeadIn ? null : (
                            <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                          )}
                          <span
                            className={`leading-relaxed ${
                              isLeadIn ? "" : "text-muted-ink"
                            } ${idx === 0 && !isLeadIn ? "" : ""}`}
                          >
                            {f}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {t.excludes && (
                    <ul className="mt-5 space-y-3 border-t border-line-soft pt-5">
                      {t.excludes.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <Minus className="mt-0.5 size-4 shrink-0 text-muted-ink/50" />
                          <span className="leading-relaxed text-muted-ink/70">{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.2}>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted-ink">
          Tüm paketlerde ilk 14 gün ücretsiz, kurulum ücreti deneme sonunda tahsil edilir. Taahhüt
          yok, istediğiniz ay bırakabilirsiniz. Fiyatlara KDV dahil değildir.
        </p>
      </Reveal>
    </Section>
  );
}
