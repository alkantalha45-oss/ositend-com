import { useState } from "react";
import {
  Bell,
  BarChart3,
  Building2,
  CalendarCheck,
  Check,
  Clock,
  FileText,
  Layers,
  LineChart,
  Link2,
  Lock,
  Minus,
  Palette,
  Phone,
  PieChart,
  Plug,
  Plus,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import {
  Button,
  ClosingCta,
  CountUp,
  Eyebrow,
  Reveal,
  ScrollFillText,
  Section,
} from "../components/bits";
import { Pricing } from "../components/Pricing";
import { platforms } from "../components/PlatformMarks";
import { bookingUrl, contact, panelUrl, pilot, tl } from "../lib/site";
import { useSeo } from "../lib/seo";

/*
 * SAYFA OMURGASI — Panora düzeni, Panora içeriği, Ositend gerçeği.
 *
 * Bölüm sırası ve metinler Panora'nın localhost:3000'de çalışan açılış
 * sayfasından alındı: şerit → sayı bandı → problem → modüller (özellikler)
 * → adımlar (nasıl çalışır) → interaktif demo (canlı dene) → kimin için →
 * rapor anatomisi → entegrasyonlar → güven & güvenlik → karşılaştırma →
 * önce/sonra → pilot → veri sözü (sessiz söz) → randevu → fiyat → SSS →
 * dene 60 saniye → kapanış. Kahraman da artık Panora'nın kısa/staccato
 * kalıbında ("Üç platform. Onlarca sekme. Tek dürüst rapor.").
 *
 * İki şey kasten kopyalanmadı — Panora'nın metni birebir alınsa bile
 * ÜÇÜNCÜ bir kural her ikisini de eziyor: uydurma sayı ya da uydurma kişi
 * yazmayız.
 *
 * 1) MÜŞTERİ YORUMLARI ("Ajanslar Panora'yı neden seviyor"). Panora'da
 *    altı isimli referans var; bizim henüz sıfır müşterimiz var. O slotta
 *    kurucu pilot programı duruyor: doğrulanabilir ve erken alıcı için
 *    gerçekten cazip.
 *
 * 2) ÖLÇÜM İDDİALARI. Panora'nın sayı bandı ve "önce/sonra" bloğu kendi
 *    kullanım telemetrisini gösteriyor ("haftada 9 saat", "%18 ROAS
 *    artışı", "$182.4K izlenen harcama"). Bizde ölçülmüş böyle bir şey
 *    yok — sıfır müşteriyle "%18 artış" ölçmüş olamayız. Bandın ve
 *    önce/sonra kartının yerinde, aynı görsel ağırlıkta, doğruluğu bize
 *    bağlı olan taahhütler var (bkz. Ribbon, Problem, Workflow).
 *
 * Kanal aç-kapat demosu ("Canlı deneyin") Panora'da Meta/Google/TikTok
 * üzerinden çalışıyor; bizde de üçü listelenir ama TikTok henüz bağlı
 * olmadığı için devre dışı ve "yakında" etiketli — olmayan bir bağlantıyı
 * çalışıyormuş gibi göstermiyoruz (bkz. ReportBuilder).
 */

/* ── Bölüm başlığı — Panora'nın mono etiketi + iki tonlu başlık ────────── */
function SectionHead({
  kicker,
  icon: Icon,
  lead,
  accent,
  body,
  center = false,
  className = "",
}: {
  kicker: string;
  icon?: typeof Zap;
  lead: string;
  accent?: string;
  body?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={`${center ? "mx-auto max-w-xl text-center" : "max-w-2xl"} ${className}`}>
      <p className={`kicker ${center ? "justify-center" : ""}`}>
        {Icon ? <Icon className="size-3" /> : <span className="h-px w-7 bg-brand" />}
        {kicker}
      </p>
      <h2 className="mt-4 text-[clamp(1.875rem,4.5vw,3.25rem)]">
        {lead} {accent && <span className="text-brand">{accent}</span>}
      </h2>
      {body && (
        <p
          className={`mt-5 max-w-xl text-base leading-relaxed text-muted-ink ${center ? "mx-auto" : ""}`}
        >
          {body}
        </p>
      )}
    </div>
  );
}

/* ── Kahraman — Panora'nın koyu, iki kolonlu hero'su ────────────────────── *
 *
 * Önceki hâl ışık temalı, ortalanmış, altında büyük bir panel ekran
 * görüntüsü olan bir kahramandı. Bu istek üzerine tamamen değişti:
 * Panora'nınki koyu zeminde iki kolon — solda kısa/staccato başlık ve
 * CTA'lar, sağda küçük, kendiliğinden çalışan bir "blended ROAS" widget
 * kartı. Renk mor değil marka mavisi; efekt aynı, palet bizim.
 *
 * Widget kartındaki rakamlar ReportBuilder'daki (Canlı deneyin bölümü)
 * Google Ads + Meta Ads birlikte açıkken çıkan tam sonuç — sayfa boyunca
 * aynı örnek senaryo tekrar ediyor, farklı yerlerde farklı uydurma sayı
 * yok. Kart altında "Örnek veri" notu duruyor.
 * ----------------------------------------------------------------------- */

function HeroWidget() {
  return (
    <div className="glow-brand relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7">
      <span
        aria-hidden
        className="blob blob-drift -top-14 -right-10 size-48"
        style={{ background: "var(--color-brand)" }}
      />
      {/* Sağ üstte süzülen "değişim" rozeti — Panora'nın "ROAS +6.4%" çipi. */}
      <span className="absolute top-5 right-5 z-10 inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-[0.6875rem] font-medium text-success ring-1 ring-success/25 sm:top-6 sm:right-6">
        <TrendingUp className="size-3" /> Harcama +11%
      </span>

      <div className="relative">
        <div className="flex items-center justify-between pr-24">
          <p className="kicker text-night-muted">Blended ROAS</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2 py-0.5 text-[0.625rem] font-medium text-success">
            <span className="pulse-dot size-1.5 rounded-full bg-success" /> Canlı
          </span>
        </div>
        <p className="mt-1 font-display text-5xl leading-none font-semibold text-night-ink">
          4.31×
        </p>

        <svg viewBox="0 0 320 108" className="mt-5 h-24 w-full" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="hero-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--color-brand-glow)" stopOpacity="0.4" />
              <stop offset="1" stopColor="var(--color-brand-glow)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M6 78 L52 66 L98 70 L144 50 L190 54 L236 32 L282 24 L314 12 L314 108 L6 108 Z"
            fill="url(#hero-fill)"
          />
          <path
            d="M6 90 L52 84 L98 86 L144 76 L190 72 L236 64 L282 58 L314 48"
            fill="none"
            stroke="oklch(0.72 0.01 265 / 0.4)"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
          <path
            d="M6 78 L52 66 L98 70 L144 50 L190 54 L236 32 L282 24 L314 12"
            fill="none"
            stroke="var(--color-brand-glow)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="mt-1 grid grid-cols-2 gap-2.5">
          <div className="rounded-2xl bg-white/6 p-3.5 ring-1 ring-white/10">
            <p className="kicker text-night-muted">Toplam harcama</p>
            <p className="mt-1 font-display text-lg font-semibold text-night-ink">139.600 TL</p>
          </div>
          <div className="rounded-2xl bg-white/6 p-3.5 ring-1 ring-white/10">
            <p className="kicker text-night-muted">Dönüşüm</p>
            <p className="mt-1 font-display text-lg font-semibold text-night-ink">1.636</p>
          </div>
        </div>

        <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-white/8">
          <span className="w-[44%]" style={{ background: "oklch(0.62 0.19 258)" }} />
          <span className="w-[56%]" style={{ background: "oklch(0.62 0.19 293)" }} />
        </div>
        <div className="mt-2.5 flex items-center gap-4 text-[0.6875rem] text-night-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: "oklch(0.62 0.19 258)" }} />
            Google Ads
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: "oklch(0.62 0.19 293)" }} />
            Meta Ads
          </span>
        </div>

        {/* Panora'nın "TikTok CPA yüksek" rozetinin karşılığı — kanala özel
            bir iddia yerine ürünün gerçekten yaptığı genel eşik uyarısı
            özelliğini yazıyor. Legend satırıyla çakışmasın diye akış
            içinde, ayrı bir satırda. */}
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-night-soft px-3 py-2 text-[0.6875rem] font-medium text-night-ink ring-1 ring-white/10">
          <Bell className="size-3.5 text-brand-glow" /> Eşik uyarısı tetiklendi
        </span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-night">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 70% at 18% 0%, oklch(0.55 0.212 258 / 0.4), transparent 70%), radial-gradient(40% 60% at 96% 100%, color-mix(in oklch, var(--color-violet) 20%, transparent), transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.1] [mask-image:radial-gradient(70%_70%_at_50%_30%,black,transparent)]"
        style={{
          backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <Section className="relative py-20 sm:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Reveal>
              <p className="kicker text-brand-glow">Ajanslar için raporlama otomasyonu</p>
            </Reveal>

            <Reveal delay={0.08}>
              {/*
                Satır kırılımı ELLE kontrol ediliyor. Panora'nın kahramanı üç
                kısa tümceden kuruluyor ("Dört platform. Beş sekme. Tek dürüst
                rapor."); bizimki de aynı ritimde ama gerçek sayılarımızla —
                üç platform, onlarca sekme (birkaç müşteri × üç platform),
                tek rapor.
              */}
              <h1 className="mt-6 text-[clamp(2.5rem,5.2vw,4.25rem)] text-night-ink">
                Üç platform. Onlarca sekme.
                <br />
                <span className="hl-brand text-brand-glow">Tek dürüst rapor.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-night-muted">
                Ositend, Google Ads, Meta Ads ve GA4'ü saniyeler içinde tek panoya toplar —
                harcamayı, ROAS'ı ve dönüşümü kanal ve müşteri bazında blendler. Ay başı rapor
                telaşına son.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href={`${panelUrl}/giris`} size="lg">
                  Demoyu aç
                </Button>
                <a
                  href="#nasil-calisir"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[0.9375rem] font-medium text-night-ink transition-colors hover:bg-white/10"
                >
                  Nasıl çalışır
                </a>
              </div>
              <p className="mt-4 text-[0.8125rem] text-night-muted">
                Kurucu pilot programı · {pilot.clients} ajans kontenjanı · Kurulumu birlikte
                yapıyoruz
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.32}>
            <HeroWidget />
          </Reveal>
        </div>
      </Section>
    </section>
  );
}

/* ── Kaynak şeridi — Panora'nın kayan marquee'si ───────────────────────── */

function SourceMarquee() {
  const items = [...platforms, ...platforms];
  return (
    <div className="overflow-hidden border-y border-line-soft py-7">
      <p className="kicker mb-5 flex justify-center">Raporun beslendiği kaynaklar</p>
      <div className="marquee-track flex w-max items-center gap-10">
        {items.map(({ name, Mark, status }, i) => (
          <span
            key={`${name}-${i}`}
            className={`flex items-center gap-3 px-2 whitespace-nowrap ${
              status === "soon" ? "opacity-45" : ""
            }`}
          >
            <Mark className="size-7" />
            <span className="font-display text-2xl font-medium text-muted-ink">{name}</span>
            {status === "soon" && (
              <span className="rounded-full border border-line px-2 py-0.5 text-[0.625rem] text-muted-ink">
                yakında
              </span>
            )}
            <span className="ml-6 text-brand">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Sayı bandı ────────────────────────────────────────────────────────── */

const ribbon = [
  { v: "3", l: "bugün canlı bağlanan veri kaynağı: Google Ads, Meta Ads, GA4" },
  { v: `${pilot.clients}`, l: "kurucu pilot programındaki ajans kontenjanı" },
  { v: `${pilot.priceLockMonths} ay`, l: "kurucu fiyatının sabit kalacağı süre" },
  { v: "%100", l: "müşteriye giden raporda yalnızca sizin markanız" },
];

function Ribbon() {
  return (
    <div className="border-b border-line-soft bg-surface py-10">
      <Section>
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {ribbon.map((r) => (
            <div key={r.l} className="text-center md:text-left">
              <dd className="tnum font-display text-[2.125rem] leading-none font-semibold text-brand lg:text-[2.5rem]">
                {r.v}
              </dd>
              <dt className="mt-2.5 text-[0.75rem] leading-relaxed text-muted-ink">{r.l}</dt>
            </div>
          ))}
        </dl>
      </Section>
    </div>
  );
}

/* ── Problem ───────────────────────────────────────────────────────────── */

/*
 * Buradaki dört sayı bir ÖLÇÜM değil, elle raporlamanın aritmetiği:
 * üç platform gerçekten üç sekme, aylık rapor gerçekten yılda on iki kez
 * tekrar ediyor. Telemetri iddiası içeren bir sayı bu listeye girmemeli.
 */
const problemStats = [
  { n: "3", l: "her müşteri için ayrı ayrı girilen platform" },
  { n: "×12", l: "aynı raporu yıl içinde tekrar hazırlama sayısı" },
  { n: "1 gün", l: "her ay yalnızca veri derlemeye giden zaman" },
  { n: "0", l: "hepsinin buluştuğu tek doğru kaynak" },
];

function Problem() {
  return (
    <Section className="py-20 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        <Reveal>
          <p className="kicker">
            <span className="h-px w-7 bg-brand" />
            Tanıdık geldi mi
          </p>
          <h2 className="mt-4 text-[clamp(1.875rem,4.5vw,3.25rem)]">
            Rapor günü hep <span className="text-brand">aynı yere çıkıyor.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-ink">
            Üç platformda üç ayrı sekme. Birbirini tutmayan tanımlar. Excel'e kopyala-yapıştır,
            formülü düzelt, PDF'e bas, gönder, bir hata bul, yeniden gönder. Ositend bu zincirin
            mekanik kısmını devralıyor — sizde kalan tek adım, rapordaki yorumu yazmak.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {problemStats.map((s, i) => (
              <div
                key={s.l}
                className="card shadow-soft p-6"
                style={{ transform: `rotate(${i % 2 ? 1.4 : -1.4}deg)` }}
              >
                <p className="tnum font-display text-[2.375rem] leading-none font-semibold text-brand">
                  {s.n}
                </p>
                <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-muted-ink">{s.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Statement() {
  return (
    <Section className="pb-20 sm:pb-28">
      <ScrollFillText
        text="Ajansınız analiz sattığını söylüyor ama zamanının çoğu kopyala-yapıştıra gidiyor. Ositend mekanik kısmı devralır, analiz kısmı size kalır."
        className="mx-auto max-w-4xl text-center font-display text-[clamp(1.375rem,3.4vw,2.25rem)] leading-[1.32] font-medium tracking-[-0.02em]"
      />
    </Section>
  );
}

/* ── Modüller ──────────────────────────────────────────────────────────── */

const modules = [
  {
    icon: FileText,
    title: "Rapor kendi kendine üretilir",
    body: "Google Ads, Meta Ads ve GA4 verisi her ayın başında toplanır, sizin logonuz ve renklerinizle PDF'e dönüşür.",
  },
  {
    icon: Palette,
    title: "Beyaz etiket, varsayılan",
    body: "Logo, renk ve kapak metni bir kez girilir. Müşteriye giden PDF'te ve canlı linkte Ositend adı hiç geçmez.",
  },
  {
    icon: Link2,
    title: "Paylaşılabilir canlı link",
    body: "Her rapor aynı anda bir bağlantı olarak da açılır; müşteri veriyi kendi zamanında, kendi ekranında inceler.",
  },
  {
    icon: Bell,
    title: "Sorunu müşteriden önce görün",
    body: "Harcama sıçraması ya da dönüşüm düşüşü aynı gün uyarıya dönüşür — her uyarıda somut aksiyon önerisiyle.",
  },
  {
    icon: LineChart,
    title: "Tüm portföy tek ekranda",
    body: "Hangi müşteri hedefin üstünde, hangisi geride — ay sonunu beklemeden, tek bakışta görürsünüz.",
  },
  {
    icon: ShieldCheck,
    title: "Salt-okunur bağlantı",
    body: "OAuth ile tek seferlik, yalnızca okuma yetkisi. Kampanyaya ve bütçeye teknik olarak dokunamıyoruz.",
  },
];

function Modules() {
  return (
    <div id="ozellikler" className="border-t border-line-soft bg-surface/60 py-20 sm:py-28">
      <Section>
        <Reveal>
          <SectionHead kicker="Ne yapıyor" lead="Altı iş," accent="tek panelde." />
        </Reveal>
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 0.06}>
              <article className="card shadow-soft group h-full p-7 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-pop">
                <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110">
                  <m.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-medium">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-ink">{m.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ── Adımlar ───────────────────────────────────────────────────────────── *
 *
 * Panora'nın "Üç adımda canlı" bölümü — el çizimi doodle YOK, sade
 * numaralandırılmış kartlar. Önceki hâlde üç özel SVG doodle vardı ve
 * tasarımı zayıflatıyordu; Panora'nın kendisi de bu bölümde hiç illüstrasyon
 * kullanmıyor, yalnızca büyük soluk numara + başlık + gövde metni.
 * ----------------------------------------------------------------------- */

const steps = [
  {
    title: "Kanalları bağlayın",
    body: "Google Ads, Meta Ads ve GA4'ü salt-okunur OAuth ile dakikalar içinde bağlarsınız.",
  },
  {
    title: "Müşterileri eşleyin",
    body: "Bağlı hesapları müşteri çalışma alanlarına atarsınız; logo ve renk bir kez girilir.",
  },
  {
    title: "Raporu planlayın",
    body: "Gönderim gününü seçin; markalı PDF ya da canlı link o günden sonra kendiliğinden gider.",
  },
];

function Steps() {
  return (
    <Section id="nasil-calisir" className="py-20 sm:py-28">
      <Reveal>
        <SectionHead kicker="Nasıl çalışır" lead="Üç adımda" accent="canlı." />
      </Reveal>

      <ol className="mt-12 grid gap-3 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <li className="card shadow-soft h-full p-7">
              <p className="tnum font-display text-4xl leading-none font-semibold text-brand/25">
                0{i + 1}
              </p>
              <h3 className="mt-4 text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-ink">{s.body}</p>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-surface">
                <div
                  className="h-full rounded-full bg-brand"
                  style={{ width: `${[40, 72, 100][i]}%` }}
                />
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ── İnteraktif rapor kurucu ───────────────────────────────────────────── *
 *
 * Panora'nın sayfa ortasındaki en güçlü hamlesi: ziyaretçi KANALLARI açıp
 * kapatıyor, blended ROAS/harcama/dönüşüm anında yeniden hesaplanıyor.
 * Burası artık aynı mekanikle, KANAL üzerinden çalışıyor. Google Ads ve
 * Meta Ads bugün canlı, o yüzden anahtarlanabilir; TikTok Ads henüz
 * bağlanamıyor, o yüzden listede duruyor ama devre dışı ve "yakında"
 * etiketli — olmayan bir bağlantıyı çalışıyormuş gibi göstermiyoruz.
 *
 * Sayılar örnek; kartın altında da açıkça öyle yazıyor.
 * ----------------------------------------------------------------------- */

type DemoChannel = {
  key: string;
  name: string;
  spend: number;
  revenue: number;
  conv: number;
  hue: number;
  series: number[];
  soon?: boolean;
};

const DEMO_CHANNELS: DemoChannel[] = [
  {
    key: "google",
    name: "Google Ads",
    spend: 61200,
    revenue: 312700,
    conv: 612,
    hue: 258,
    series: [22, 26, 25, 30, 34, 38, 36, 41],
  },
  {
    key: "meta",
    name: "Meta Ads",
    spend: 78400,
    revenue: 289300,
    conv: 1024,
    hue: 293,
    series: [30, 32, 35, 33, 40, 44, 46, 50],
  },
  {
    key: "tiktok",
    name: "TikTok Ads",
    spend: 0,
    revenue: 0,
    conv: 0,
    hue: 205,
    series: [0, 0, 0, 0, 0, 0, 0, 0],
    soon: true,
  },
];

function ReportBuilder() {
  const [on, setOn] = useState<Record<string, boolean>>({ google: true, meta: true });
  const active = DEMO_CHANNELS.filter((c) => on[c.key] && !c.soon);
  const spend = active.reduce((s, c) => s + c.spend, 0);
  const revenue = active.reduce((s, c) => s + c.revenue, 0);
  const conv = active.reduce((s, c) => s + c.conv, 0);
  const roas = spend ? revenue / spend : 0;

  const W = 320;
  const H = 120;
  const pad = 6;
  const weeks = 8;
  const blended = Array.from({ length: weeks }, (_, i) =>
    active.reduce((s, c) => s + (c.series[i] ?? 0), 0),
  );
  const maxV = Math.max(1, ...blended) * 1.12;
  const x = (i: number) => pad + (i / (weeks - 1)) * (W - pad * 2);
  const y = (v: number) => H - pad - (v / maxV) * (H - pad * 2);
  const line = blended
    .map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(" ");

  return (
    <div className="grid gap-3 lg:grid-cols-[0.85fr_1.15fr]">
      {/* Anahtarlar */}
      <div className="card shadow-soft p-6">
        <p className="kicker">Kanallar</p>
        <ul className="mt-4 space-y-2.5">
          {DEMO_CHANNELS.map((c) => {
            const isOn = on[c.key];
            if (c.soon) {
              return (
                <li key={c.key}>
                  <div className="flex w-full cursor-not-allowed items-center gap-3 rounded-2xl border border-line bg-surface/40 px-4 py-3.5 text-left opacity-60">
                    <span
                      className="size-3 shrink-0 rounded-full"
                      style={{ background: `oklch(0.6 0.19 ${c.hue})`, opacity: 0.35 }}
                    />
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{c.name}</span>
                      <span className="block text-[0.6875rem] text-muted-ink">
                        Bağlantı henüz yok
                      </span>
                    </span>
                    <span className="rounded-full border border-line px-2 py-0.5 text-[0.625rem] text-muted-ink">
                      yakında
                    </span>
                  </div>
                </li>
              );
            }
            return (
              <li key={c.key}>
                <button
                  type="button"
                  aria-pressed={isOn}
                  onClick={() => setOn((p) => ({ ...p, [c.key]: !p[c.key] }))}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition duration-200 ease-[var(--ease-out-soft)] ${
                    isOn
                      ? "border-brand/35 bg-brand/6"
                      : "border-line bg-surface/60 opacity-60 hover:opacity-100"
                  }`}
                >
                  <span
                    className="size-3 shrink-0 rounded-full"
                    style={{
                      background: `oklch(0.6 0.19 ${c.hue})`,
                      opacity: isOn ? 1 : 0.4,
                    }}
                  />
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{c.name}</span>
                    <span className="block text-[0.6875rem] text-muted-ink">
                      {tl(c.spend)} · {(c.revenue / c.spend).toFixed(2)}×
                    </span>
                  </span>
                  <span
                    className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${
                      isOn ? "bg-brand" : "bg-line"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 size-4 rounded-full bg-white shadow-sm transition-all duration-200 ${
                        isOn ? "left-[1.125rem]" : "left-0.5"
                      }`}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-[0.6875rem] leading-relaxed text-muted-ink">
          Örnek veri · gerçek panelinizde bu rakamların yerinde kendi kanallarınız olur.
        </p>
      </div>

      {/* Canlı yeniden hesaplanan rapor */}
      <div className="glow-brand relative overflow-hidden rounded-[1.75rem] bg-night p-6 text-night-ink sm:p-7">
        <span
          aria-hidden
          className="blob blob-drift -top-12 -right-10 size-44"
          style={{ background: "var(--color-brand)" }}
        />
        {active.length === 0 ? (
          <div className="grid h-[19rem] place-items-center text-center text-sm text-night-muted">
            En az bir kanal seçin.
          </div>
        ) : (
          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="kicker text-night-muted">Blended ROAS</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2 py-0.5 text-[0.625rem] font-medium text-success">
                <span className="pulse-dot size-1.5 rounded-full bg-success" /> Canlı
              </span>
            </div>
            {/*
              tnum BİLİNÇLİ OLARAK YOK. Schibsted Grotesk'te tablo rakamları
              açıkken nokta da tam genişlikte bir figüre dönüşüyor ve
              "3.48×" ekranda "3 . 48×" gibi okunuyor. Tablo rakamı bir
              SÜTUNDA hizalama içindir; tek başına duran bu sayının
              hizalanacağı bir şey yok. Aynı gerekçeyle bu kartın harcama /
              gelir / dönüşüm rakamlarında ve soldaki müşteri listesinin
              alt satırlarında da tnum kapalı — binlik ayıracı olan her
              sayı aynı boşluk artefaktını üretiyor.
            */}
            <p className="mt-1 font-display text-5xl leading-none font-semibold">
              {roas.toFixed(2)}×
            </p>

            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="mt-4 h-[7.5rem] w-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="rb-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="var(--color-brand-glow)" stopOpacity="0.42" />
                  <stop offset="1" stopColor="var(--color-brand-glow)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`${line} L${x(weeks - 1)} ${H} L${x(0)} ${H} Z`} fill="url(#rb-fill)" />
              <path
                d={line}
                fill="none"
                stroke="var(--color-brand-glow)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {[
                { l: "Harcama", v: tl(spend) },
                { l: "Gelir", v: tl(revenue) },
                { l: "Dönüşüm", v: conv.toLocaleString("tr-TR") },
              ].map((k) => (
                <div key={k.l} className="rounded-2xl bg-white/6 p-3.5 ring-1 ring-white/10">
                  <p className="kicker text-night-muted">{k.l}</p>
                  <p className="mt-1 font-display text-[0.9375rem] font-semibold sm:text-lg">
                    {k.v}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-white/8">
              {active.map((c) => (
                <span
                  key={c.key}
                  style={{
                    width: `${(c.spend / spend) * 100}%`,
                    background: `oklch(0.62 0.19 ${c.hue})`,
                  }}
                />
              ))}
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.6875rem] text-night-muted">
              {active.map((c) => (
                <span key={c.key} className="inline-flex items-center gap-1.5">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: `oklch(0.62 0.19 ${c.hue})` }}
                  />
                  {c.name} · %{((c.spend / spend) * 100).toFixed(0)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LiveDemo() {
  return (
    <div id="canli-dene" className="relative overflow-hidden border-t border-line-soft py-20 sm:py-28">
      <span
        aria-hidden
        className="blob blob-drift top-10 -left-24 size-72 opacity-25"
        style={{ background: "var(--color-brand)" }}
      />
      <Section>
        <Reveal>
          <SectionHead
            kicker="Canlı deneyin"
            icon={Zap}
            lead="Raporu canlı görün,"
            accent="kanalları aç-kapat."
            body="Kanalları aç-kapat: blended ROAS, harcama ve dönüşüm aynı anda yeniden hesaplanır. Ositend panelindeki canlı görünüm tam olarak böyle çalışıyor."
            className="mb-10"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <ReportBuilder />
        </Reveal>
      </Section>
    </div>
  );
}

/* ── Kimin için ────────────────────────────────────────────────────────── */

const personas = [
  {
    icon: Building2,
    tag: "Çok müşterili",
    t: "Dijital ajanslar",
    b: "Beş müşteri, üç kanal, tek markalı rapor. Ay sonu telaşı yok; her hesabın durumu tek bakışta.",
  },
  {
    icon: ShoppingCart,
    tag: "DTC & mağaza",
    t: "E-ticaret markaları",
    b: "Reklam harcamasını GA4 gelir verisiyle birleştirin; gerçek ROAS'ı kanal kırılımında görün.",
  },
  {
    icon: Rocket,
    tag: "Solo & serbest",
    t: "Performans uzmanları",
    b: "Devredecek bir junior yoksa raporlamayı otomasyona devredin. Analiz sizde kalsın, derleme bizde.",
  },
  {
    icon: Users,
    tag: "Marka içi ekip",
    t: "In-house pazarlama",
    b: "Yönetime giden tek doğru rapor. Herkes aynı sayıya bakar, tanım tartışması biter.",
  },
];

function Personas() {
  return (
    <div className="border-t border-line-soft bg-surface/60 py-20 sm:py-28">
      <Section>
        <Reveal>
          <SectionHead kicker="Kimin için" lead="Tek panel," accent="her ekibin işine yarıyor." />
        </Reveal>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {personas.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06}>
              <article className="card shadow-soft group flex h-full flex-col p-7 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-pop">
                <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110">
                  <p.icon className="size-5" />
                </span>
                <p className="kicker mt-5 text-muted-ink">{p.tag}</p>
                <h3 className="mt-1.5 text-lg font-medium">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-ink">{p.b}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ── Raporun anatomisi — soyut kartlar, ekran görüntüsü yok ────────────── *
 *
 * Önceki hâlde burada üç panel ekran görüntüsü vardı. Panel Panora'nın
 * tasarımına geçtiğinde bu ekran görüntüleri güncel olmaktan çıktı; ayrıca
 * panel görselini sayfanın her yerinde tekrarlamak istemiyoruz — hero'da
 * zaten bir tane var, o yeter. Panora'nın kendisi de burada ekran görüntüsü
 * değil, soyut ikon kartları kullanıyor; aynı yola geçtik.
 * ----------------------------------------------------------------------- */

const widgets = [
  {
    ic: FileText,
    t: "Rapor kendi kendine üretilir",
    b: "Google Ads, Meta Ads ve GA4 verisi her ayın başında toplanır, logonuz ve renklerinizle PDF'e dönüşür.",
  },
  {
    ic: Bell,
    t: "Sorunu müşteriden önce görün",
    b: "Harcama sıçraması ya da dönüşüm düşüşü aynı gün uyarıya dönüşür.",
  },
  {
    ic: LineChart,
    t: "Tüm portföy tek ekranda",
    b: "Hangi müşteri hedefin üstünde, hangisi geride — tek bakışta görürsünüz.",
  },
  {
    ic: PieChart,
    t: "Kanal dağılımı",
    b: "Hangi kanal bütçenin ne kadarını aldı, karşılığında ne getirdi.",
  },
  {
    ic: BarChart3,
    t: "Dönüşüm hunisi",
    b: "Gösterimden dönüşüme adım adım oran ve kayıp noktaları.",
  },
  { ic: Layers, t: "Kampanya tablosu", b: "Sıralanabilir kampanya kırılımı; en iyiler ve dipler." },
];

function ReportAnatomy() {
  return (
    <Section className="py-20 sm:py-28">
      <Reveal>
        <SectionHead
          kicker="Raporun içinde"
          lead="Müşteriye giden raporda"
          accent="ne var?"
          body="Panelde gördüğünüz her kırılım rapora da giriyor — kendi ekranınızı hero'daki önizlemede zaten gördünüz."
        />
      </Reveal>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {widgets.map((w, i) => (
          <Reveal key={w.t} delay={(i % 3) * 0.06}>
            <article className="card shadow-soft group h-full overflow-hidden p-6 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-pop">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-110">
                  <w.ic className="size-5" />
                </span>
                <h3 className="text-[0.9375rem] font-medium">{w.t}</h3>
              </div>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-ink">{w.b}</p>
              <div aria-hidden className="mt-4 flex h-9 items-end gap-1 opacity-70">
                {[40, 65, 50, 80, 60, 95, 72].map((h, k) => (
                  <span
                    key={k}
                    className="flex-1 rounded-t bg-brand/25"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── Entegrasyonlar ────────────────────────────────────────────────────── */

const sourceNotes: Record<string, string> = {
  "Google Ads": "Arama, PMax, görüntülü",
  "Meta Ads": "Facebook ve Instagram",
  GA4: "Oturum, dönüşüm, gelir",
  "Search Console": "Organik arama",
  "LinkedIn Ads": "B2B kampanya",
  "TikTok Ads": "Video kampanya",
};

function Integrations() {
  return (
    <div className="border-y border-line-soft bg-surface/60 py-20 sm:py-28">
      <Section>
        <Reveal>
          <SectionHead
            kicker="Bağlantılar"
            icon={Plug}
            lead="Bir kez bağlayın,"
            accent="gerisini Ositend halletsin."
            body="Salt-okunur OAuth ile dakikalar içinde bağlanır. Veri ambarı kurmanız ya da SQL yazmanız gerekmez."
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {platforms.map(({ name, Mark, status }, i) => (
            <Reveal key={name} delay={(i % 6) * 0.04}>
              <div
                className={`card shadow-soft group flex h-full flex-col items-center gap-2.5 p-6 text-center transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-brand/30 ${
                  status === "soon" ? "opacity-70" : ""
                }`}
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-surface transition-transform duration-300 group-hover:scale-110">
                  <Mark className={`size-7 ${status === "soon" ? "opacity-50" : ""}`} />
                </span>
                <p className="text-[0.8125rem] font-medium">{name}</p>
                <p className="text-[0.6875rem] leading-snug text-muted-ink">{sourceNotes[name]}</p>
                <span
                  className={`mt-auto rounded-full px-2 py-0.5 text-[0.625rem] font-medium ${
                    status === "soon"
                      ? "border border-line text-muted-ink"
                      : "bg-success/10 text-success"
                  }`}
                >
                  {status === "soon" ? "yakında" : "canlı"}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ── Güven & güvenlik ──────────────────────────────────────────────────── *
 *
 * Panora'nın "GÜVEN & GÜVENLİK" dört kartı — salt-okunur OAuth, tek tıkla
 * iptal, veri satılmaz, müşteri izolasyonu. "Sessiz söz" kartında da benzer
 * maddeler var ama bu, Panora'da olduğu gibi ayrı ve daha erken bir vurgu.
 * ----------------------------------------------------------------------- */

const trustPoints = [
  {
    icon: ShieldCheck,
    t: "Salt-okunur OAuth",
    b: "Kampanyaya, bütçeye asla yazmaz.",
  },
  {
    icon: Zap,
    t: "Tek tıkla iptal",
    b: "Erişimi istediğiniz an geri alırsınız.",
  },
  {
    icon: Lock,
    t: "Veri satılmaz",
    b: "Ne reklamcıya, ne modele.",
  },
  {
    icon: Users,
    t: "Müşteri izolasyonu",
    b: "Her çalışma alanı ayrı tutulur.",
  },
];

function TrustSecurity() {
  return (
    <Section className="pb-20 sm:pb-28">
      <Reveal>
        <SectionHead kicker="Güven & güvenlik" lead="Erişim sizin elinizde," accent="her zaman." />
      </Reveal>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {trustPoints.map((p, i) => (
          <Reveal key={p.t} delay={i * 0.06}>
            <div className="card shadow-soft h-full p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
                <p.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-[0.9375rem] font-medium">{p.t}</h3>
              <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-ink">{p.b}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── Karşılaştırma ─────────────────────────────────────────────────────── */

const cmpCols = ["Elle / Excel", "Her platform ayrı", "Ositend"];
const cmpRows: { f: string; cells: (boolean | string)[] }[] = [
  { f: "Tüm kaynaklar tek görünümde", cells: [false, false, true] },
  { f: "Markalı PDF, otomatik", cells: [false, false, true] },
  { f: "Paylaşılabilir canlı müşteri linki", cells: [false, "Kısmen", true] },
  { f: "Aylık rapor için ayrılan süre", cells: ["Yarım gün", "2-3 saat", "Yorumu yazacak kadar"] },
  { f: "Harcama ve dönüşüm uyarısı", cells: [false, "Kısmen", true] },
  { f: "Müşteri başına ayrı çalışma alanı", cells: ["Ayrı dosya", false, true] },
  { f: "Gönderim öncesi sizin kontrolünüz", cells: ["Elle", false, true] },
];

function Comparison() {
  return (
    <Section className="py-20 sm:py-28">
      <Reveal>
        <SectionHead
          kicker="Neden Ositend"
          lead="Elle rapor mu,"
          accent="tek panel mi?"
          className="mb-10"
        />
      </Reveal>
      <Reveal delay={0.08}>
        <div className="card shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="px-5 py-4 text-left" />
                  {cmpCols.map((col, i) => (
                    <th
                      key={col}
                      className={`px-4 py-4 text-center text-[0.75rem] font-medium ${
                        i === 2 ? "bg-brand/6 text-brand" : "text-muted-ink"
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cmpRows.map((row) => (
                  <tr key={row.f} className="border-b border-line-soft last:border-0">
                    <td className="px-5 py-3.5 text-[0.8125rem] font-medium">{row.f}</td>
                    {row.cells.map((cell, i) => (
                      <td
                        key={i}
                        className={`px-4 py-3.5 text-center ${i === 2 ? "bg-brand/4" : ""}`}
                      >
                        {cell === true ? (
                          <Check className="mx-auto size-4 text-success" />
                        ) : cell === false ? (
                          <X className="mx-auto size-4 text-muted-ink/40" />
                        ) : (
                          <span
                            className={`text-[0.75rem] ${
                              i === 2 ? "font-medium text-brand" : "text-muted-ink"
                            }`}
                          >
                            {cell}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── Önce / sonra ──────────────────────────────────────────────────────── */

const wfSteps = [
  {
    before: "Üç platformda üç sekme aç, her birine ayrı gir.",
    after: "Hesaplar bir kez bağlı; veri kendiliğinden gelir.",
  },
  {
    before: "Sayıları Excel'e kopyala, bozulan formülü tamir et.",
    after: "Kırılımlar hazır gelir; kopyala-yapıştır adımı yok.",
  },
  {
    before: "Şablonu aç, logoyu değiştir, elle PDF'e bas.",
    after: "Rapor doğrudan sizin logonuz ve renklerinizle çıkar.",
  },
  {
    before: "Gönder, bir hata fark et, düzelt, yeniden gönder.",
    after: "Önce siz kontrol edip yorumu yazarsınız, sonra gider.",
  },
];

function Workflow() {
  return (
    <div className="border-t border-line-soft bg-surface/60 py-20 sm:py-28">
      <Section>
        <Reveal>
          <SectionHead
            kicker="Akışınız"
            icon={Clock}
            lead="Ay başı,"
            accent="yeniden kurgulandı."
            body="Eski akış: üç sekme, bir Excel, iki düzeltme. Yeni akış: tek panel, tek kontrol, tek gönderim. Adım adım neyin değiştiğine bakın."
          />
        </Reveal>
        <div className="mt-12 grid gap-3 lg:grid-cols-2">
          <Reveal>
            <div className="card shadow-soft h-full bg-surface/80 p-7">
              <p className="kicker mb-5 text-muted-ink">
                <X className="size-3.5" /> Önce
              </p>
              <ul className="space-y-3.5">
                {wfSteps.map((s, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[0.84375rem] leading-relaxed text-muted-ink"
                  >
                    <span className="tnum mt-0.5 font-display text-xs font-semibold text-muted-ink/50">
                      0{i + 1}
                    </span>
                    {s.before}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="glow-brand h-full rounded-[1.25rem] border border-brand/25 bg-white p-7">
              <p className="kicker mb-5">
                <Check className="size-3.5" /> Ositend ile
              </p>
              <ul className="space-y-3.5">
                {wfSteps.map((s, i) => (
                  <li key={i} className="flex gap-3 text-[0.84375rem] leading-relaxed font-medium">
                    <span className="tnum mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/12 font-display text-[0.625rem] font-semibold text-brand">
                      {i + 1}
                    </span>
                    {s.after}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}

/* ── Kurucu pilot programı ─────────────────────────────────────────────── */

function PilotTerms() {
  const terms = [
    {
      to: pilot.clients,
      suffix: " ajans",
      label: "Kurucu pilot kontenjanı — dolduğunda liste fiyatına geçilir",
    },
    {
      to: pilot.priceLockMonths,
      suffix: " ay",
      label: "Kurucu fiyatının sabit kalacağı süre",
    },
    {
      to: pilot.commitmentMonths,
      suffix: " ay",
      label: "Asgari pilot süresi — sonrasında aylık, istediğiniz ay bırakırsınız",
    },
  ];

  return (
    <Section className="py-20 sm:py-28">
      <Reveal>
        <SectionHead
          kicker="Kurucu pilot programı"
          icon={Sparkles}
          lead="Ürünü ilk beş ajansla"
          accent="birlikte kuruyoruz."
          body="Sitede müşteri logosu ya da müşteri yorumu görmüyorsunuz, çünkü henüz yok. Ositend çalışan bir ürün ama vitrine koyacağımız referansları pilot ajanslarla birlikte yazacağız — bu yüzden erken girene kalıcı bir fiyat avantajı ve yol haritasında söz hakkı veriyoruz."
          center
        />
      </Reveal>

      <Reveal delay={0.08}>
        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line-soft bg-line-soft sm:grid-cols-3">
          {terms.map((t) => (
            <div key={t.label} className="bg-white px-6 py-9 text-center sm:px-8 sm:py-11">
              <dd className="font-display text-[2.75rem] leading-none font-semibold text-ink sm:text-5xl">
                <CountUp to={t.to} suffix={t.suffix} />
              </dd>
              <dt className="mx-auto mt-3 max-w-[18rem] text-sm leading-relaxed text-muted-ink">
                {t.label}
              </dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}

/* ── Veri sözü — sayfanın tek doygun renkli yüzeyi ─────────────────────── *
 *
 * Panora'nın "sessiz söz" kartı, mor gradyan yerine marka mavisiyle.
 * Gradyanın uzak ucundaki mor, sitedeki aurora/CloudField ile aynı
 * oranda: renk göstermek için değil, derinlik için.
 * ----------------------------------------------------------------------- */

const promiseBullets = [
  "Salt-okunur erişim: kampanyaya, bütçeye, reklama yazma yetkimiz yok.",
  "Tek tıkla iptal: bağlantıyı istediğiniz an koparabilirsiniz.",
  "Şifrenizi istemiyoruz; bağlantı OAuth ile kuruluyor.",
  "Veri üçüncü taraflarla paylaşılmıyor, model eğitiminde kullanılmıyor.",
];

function DataPromise() {
  return (
    <Section className="pb-20 sm:pb-28">
      <Reveal>
        <div className="grad-brand relative overflow-hidden rounded-[2rem] p-10 text-white sm:p-14">
          <span aria-hidden className="blob blob-drift -top-12 right-10 size-64 bg-white/25" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <p className="kicker text-white/70">
                <ShieldCheck className="size-3.5" /> Sessiz söz
              </p>
              <h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] text-white">
                Veriniz sizin. <span className="text-white/70">Biz yalnızca okuyoruz.</span>
              </h2>
              <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-white/85">
                Reklam hesaplarınıza salt-okunur OAuth ile bağlanıyoruz. Kampanyaya, bütçeye ya da
                reklama teknik olarak dokunamıyoruz — yetkimiz yok.
              </p>
            </div>
            <ul className="space-y-3">
              {promiseBullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 rounded-2xl bg-white/12 px-4 py-3.5 ring-1 ring-white/20 backdrop-blur-sm"
                >
                  <Check className="mt-0.5 size-4 shrink-0" />
                  <p className="text-[0.84375rem] leading-relaxed text-white/95">{b}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── Randevu ───────────────────────────────────────────────────────────── *
 *
 * Gerçek bir rezervasyon adresi (VITE_BOOKING_URL) tanımlıysa tek ve net
 * bir buton çıkıyor. Tanımlı değilse buton HİÇ çıkmıyor; yerine gerçekten
 * çalışan iki kanal veriliyor.
 * ----------------------------------------------------------------------- */

function ScheduleMeeting() {
  return (
    <Section className="pb-20 sm:pb-24">
      <Reveal>
        <div className="glass-strong relative overflow-hidden rounded-[1.75rem] px-6 py-14 text-center sm:px-14 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 95% at 10% 0%, color-mix(in oklch, var(--color-brand) 34%, transparent), transparent 70%), radial-gradient(45% 70% at 92% 100%, color-mix(in oklch, var(--color-violet) 14%, transparent), transparent 72%)",
            }}
          />
          <Eyebrow>Görüşme planlayın</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-xl text-[clamp(1.875rem,4.4vw,2.875rem)]">
            30 dakika ayırın, ilk raporu birlikte üretelim.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-muted-ink">
            Görüşmede kendi reklam hesaplarınızı bağlıyoruz ve ekranda gerçek verinizle bir rapor
            çıkarıyoruz. Sunum yok, slayt yok.
          </p>

          {bookingUrl ? (
            <div className="mt-8">
              <Button href={bookingUrl} size="lg">
                <CalendarCheck className="size-4" />
                Uygun saati seçin
              </Button>
              <p className="mt-3 text-[0.8125rem] text-muted-ink">
                Takvimimizdeki boş saatleri görürsünüz; seçtiğiniz an davet e-postası gelir.
              </p>
            </div>
          ) : (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button to="/iletisim" size="lg">
                Formu doldurun
              </Button>
              <Button href={contact.phoneHref} variant="secondary" size="lg">
                <Phone className="size-4" />
                {contact.phone}
              </Button>
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  );
}

/* ── SSS ───────────────────────────────────────────────────────────────── *
 *
 * İletişim sayfasındaki SSS fatura, taahhüt ve fiyat sorularını yanıtlıyor.
 * Buradaki bilinçli olarak ÜRÜN sorularını yanıtlıyor: soğuk e-postadan
 * gelen biri önce "bu bende çalışır mı ve verim güvende mi" diye soruyor,
 * faturayı sonra sorar. İki liste birbirini tekrar ETMEMELİ.
 * ----------------------------------------------------------------------- */
/*
 * Soru seti Panora'nın "Merak edilenler" bölümünden alındı — sekiz soru,
 * aynı sırada. Cevaplar Panora'nınkiler DEĞİL: her biri Ositend'in bugün
 * gerçekten yapabildiğiyle sınırlı. İki soru (teknoloji, veri dışa aktarma)
 * Panora'da onların altyapısını anlatıyordu; burada bizimkini ya da
 * "henüz yok" gerçeğini anlatıyor.
 */
const faqs = [
  {
    q: "Denemek için reklam hesabı bağlamam gerekiyor mu?",
    a: "Hayır. Panelin demo modunda örnek bir ajans portföyüyle gezinebilirsiniz — harcama, ROAS, kanallar, kampanyalar. Kendi hesaplarınızı yalnızca siz hazır olduğunuzda bağlarsınız.",
  },
  {
    q: "Reklam verim güvende mi?",
    a: "Ositend yalnızca salt-okunur OAuth erişimi ister. Kampanyaya ya da bütçeye asla dokunamıyoruz — teknik olarak yetkimiz yok — ve erişimi tek tıkla iptal edebilirsiniz.",
  },
  {
    q: "Blended ROAS nasıl hesaplanır?",
    a: "Bağladığınız kanalların toplam gelirini toplam harcamaya böleriz. Kanal bazlı ROAS'ı da yan yana, ayrı ayrı görürsünüz.",
  },
  {
    q: "Teknoloji nedir?",
    a: "React, Vite ve Tailwind CSS — herhangi bir sunucuya taşınabilecek standart bir web uygulaması.",
  },
  {
    q: "Markalı rapor müşterime nasıl gidiyor?",
    a: "Logonuzu ve renklerinizi bir kez girersiniz, gönderim gününü seçersiniz — Ositend PDF ya da canlı link olarak otomatik gönderir.",
  },
  {
    q: "Kaç müşteri ve kanal bağlayabilirim?",
    /*
     * ⚠️ BU CEVAP pilot.clients / pilot.sources İLE AYNI ŞEYİ SÖYLEMEK
     * ZORUNDA — sayı site.ts'te değişirse burası da otomatik değişir.
     */
    a: `Tek müşteriyle bile başlayabilirsiniz. Kurucu pilot paketi ${pilot.clients} aktif müşteri ve ${pilot.sources} veri kaynağına kadar kapsıyor; ekip kullanıcı sayısında sınır yok.`,
  },
  {
    q: "Eşik uyarıları nasıl çalışır?",
    a: "ROAS, harcama ya da dönüşüm için eşik belirlersiniz. Bir kampanya bu eşiğin dışına çıktığında aynı gün e-posta ile haber veririz — müşteri sormadan önce.",
  },
  {
    q: "Verimi dışa aktarabilir miyim?",
    a: "Şu an için hayır — CSV ve API ile dışa aktarma yol haritamızda. Bugün raporunuz PDF ve paylaşılabilir canlı link olarak elinizde oluyor.",
  },
];

function Faq() {
  /*
   * Akordiyon — Panora'da olduğu gibi ilki açık. Önceki hâli sekiz soruyu
   * ve sekiz uzun cevabı aynı anda gösteren bir tanım listesiydi; sayfanın
   * en uzun bloğuydu ve hiçbiri okunmuyordu.
   */
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-y border-line-soft bg-surface/60 py-20 sm:py-28">
      <Section>
        <Reveal>
          <SectionHead
            kicker="Sık sorulanlar"
            lead="Görüşmeden önce"
            accent="merak edilenler."
            center
          />
        </Reveal>

        <ul className="mx-auto mt-12 max-w-3xl space-y-2.5">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 4) * 0.04}>
              <li className="card overflow-hidden">
                <button
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-[0.9375rem] font-medium">{f.q}</span>
                  {open === i ? (
                    <Minus className="size-4 shrink-0 text-muted-ink" />
                  ) : (
                    <Plus className="size-4 shrink-0 text-muted-ink" />
                  )}
                </button>
                {open === i && (
                  <p className="px-5 pb-4 text-[0.84375rem] leading-relaxed text-muted-ink">
                    {f.a}
                  </p>
                )}
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>
    </div>
  );
}

/* ── Dene, 60 saniye ───────────────────────────────────────────────────── *
 *
 * Panora'nın kapanıştan hemen önceki bölümü: kart bilgisi istemeden, gerçek
 * bir demoya bağlanan tek bir buton. Bizim panelimiz zaten Panora'nın
 * birebir kopyası olduğu için bu iddiayı gerçekten karşılayabiliyoruz —
 * `/giris` ekranındaki demo hesabı gerçekten çalışıyor, uydurma değil.
 * ----------------------------------------------------------------------- */

function TryLiveDemo() {
  return (
    <Section className="pb-20 sm:pb-28">
      <Reveal>
        <div className="card shadow-pop overflow-hidden rounded-[1.75rem] p-10 text-center sm:p-14">
          <p className="kicker justify-center">
            <Zap className="size-3" /> Dene · 60 saniye
          </p>
          <h2 className="mx-auto mt-4 max-w-lg text-[clamp(1.75rem,4vw,2.75rem)]">
            Tüm panoyu <span className="text-brand">tek ekranda görün.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted-ink">
            Önceden doldurulmuş, gerçekten çalışan bir demo — her ekran tıklanabilir. Kart bilgisi
            yok, bağlantı gerekmez.
          </p>
          <div className="mt-8">
            <Button href={`${panelUrl}/giris`} size="lg">
              Demoyu aç
            </Button>
          </div>
          <p className="mt-5 text-[0.8125rem] text-muted-ink">
            Panelin demo verisi · $182.4K harcama · 3.92× ROAS · 9.840 dönüşüm
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

export function Home() {
  useSeo({
    title: "Ositend — Ajanslar için otomatik müşteri raporlaması",
    description:
      "Google Ads, Meta Ads ve GA4 verinizi her ay elle toplamayı bırakın. Ositend hesaplarınızı bir kez bağlar; markalı PDF raporu ve canlı müşteri linkini otomatik üretir.",
    path: "/",
  });

  return (
    <>
      <Hero />
      <SourceMarquee />
      <Ribbon />
      <Problem />
      <Statement />
      <Modules />
      <Steps />
      <LiveDemo />
      <Personas />
      <ReportAnatomy />
      <Integrations />
      <TrustSecurity />
      <Comparison />
      <Workflow />
      <PilotTerms />
      <DataPromise />
      <ScheduleMeeting />
      <div id="fiyatlar">
        <Pricing />
      </div>
      <Faq />
      <TryLiveDemo />
      <ClosingCta />
    </>
  );
}
