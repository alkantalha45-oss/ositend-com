import { Link } from "react-router-dom";
import { ArrowUpRight, Bell, CalendarPlus, FileText, LineChart, Video } from "lucide-react";
import {
  AtmosphereBand,
  Button,
  ClosingCta,
  CountUp,
  Eyebrow,
  Reveal,
  ScrollFillText,
  Section,
  Shot,
} from "../components/bits";
import { ConnectDoodle, BrandDoodle, ScheduleDoodle } from "../components/Doodles";
import { Pricing } from "../components/Pricing";
import { platforms } from "../components/PlatformMarks";

const logos = [
  "Formet Dijital",
  "Marla Kozmetik",
  "Nordica Mobilya",
  "Vestra Klinik",
  "Kaptan Turizm",
  "Delmain",
  "Softline",
  "Clickslice",
];

const stats = [
  { to: 38, suffix: " saat", label: "Ajans başına her ay kazanılan süre" },
  { to: 4, suffix: " dk", label: "Hesap bağlamadan ilk rapora geçen süre" },
  { to: 4800, suffix: "", label: "Platformda her ay otomatik üretilen rapor" },
];

const features = [
  {
    icon: FileText,
    title: "Rapor kendi kendine üretilir",
    body: "Google Ads, Meta Ads ve GA4 verisi her ayın başında toplanır, sizin logonuz ve renklerinizle PDF'e dönüşür.",
    shot: "/shots/panel-raporlar.png",
    wide: true,
  },
  {
    icon: Bell,
    title: "Sorunu müşteriden önce görün",
    body: "Harcama sıçraması ya da dönüşüm düşüşü aynı gün uyarıya dönüşür — her uyarıda somut aksiyon önerisiyle.",
    shot: "/shots/panel-uyarilar.png",
  },
  {
    icon: LineChart,
    title: "Tüm portföy tek ekranda",
    body: "Hangi müşteri sektör ortalamasının üstünde, hangisi geride — ay sonunu beklemeden görürsünüz.",
    shot: "/shots/panel-musteriler.png",
  },
];

const steps = [
  {
    doodle: ConnectDoodle,
    title: "Hesapları bağlayın",
    body: "Google, Meta ve GA4 hesaplarınıza güvenli OAuth ile tek seferlik salt-okunur erişim verirsiniz.",
  },
  {
    doodle: BrandDoodle,
    title: "Markanızı tanımlayın",
    body: "Logo, renk ve kapak metnini bir kez girersiniz; bundan sonraki her rapor bu kimlikle çıkar.",
  },
  {
    doodle: ScheduleDoodle,
    title: "Takvimi kurun, unutun",
    body: "Her müşteri için gönderim gününü seçersiniz. Rapor üretilir, kontrol edersiniz, müşteriye gider.",
  },
];

/** Glass chips carrying the platform marks, drifting around the hero shot. */
function FloatingPlatforms() {
  // left/right column positions so they frame the screenshot without covering it
  const spots = [
    { side: "left", top: "8%", offset: "-3.5rem", delay: "0s", dur: "7s" },
    { side: "left", top: "40%", offset: "-6.5rem", delay: "1.4s", dur: "8.5s" },
    { side: "left", top: "72%", offset: "-2.5rem", delay: "2.6s", dur: "7.8s" },
    { side: "right", top: "12%", offset: "-4.5rem", delay: "0.8s", dur: "8.2s" },
    { side: "right", top: "46%", offset: "-7rem", delay: "2s", dur: "7.2s" },
    { side: "right", top: "76%", offset: "-3rem", delay: "3.1s", dur: "9s" },
  ] as const;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      {platforms.map(({ name, Mark }, i) => {
        const s = spots[i];
        return (
          <div
            key={name}
            className="float absolute"
            style={{
              top: s.top,
              [s.side]: s.offset,
              animationDelay: s.delay,
              animationDuration: s.dur,
            }}
          >
            <div className="glass-chip flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5">
              <Mark className="size-6" />
              <span className="text-[0.8125rem] font-medium whitespace-nowrap text-ink">{name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Hero() {
  return (
    <AtmosphereBand>
      <Section className="pt-14 pb-16 text-center sm:pt-20 sm:pb-24">
      <Reveal>
        <Eyebrow>Ajanslar için raporlama otomasyonu</Eyebrow>
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="mx-auto mt-6 max-w-3xl text-[clamp(2.25rem,5.2vw,3.75rem)]">
          Rapor hazırlamayı bırakın,{" "}
          <span className="text-brand">büyümeye odaklanın.</span>
        </h1>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-ink sm:text-lg">
          Google Ads, Meta Ads ve GA4 hesaplarınızı bir kez bağlayın. Ositend her ay markalı PDF
          raporunu ve paylaşılabilir canlı linki sizin yerinize üretsin.
        </p>
      </Reveal>

      <Reveal delay={0.24}>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button to="/iletisim" size="lg">
            Ücretsiz demo alın
          </Button>
          <Button to="/hizmetler" variant="secondary" size="lg">
            Nasıl çalışıyor
          </Button>
        </div>
        <p className="mt-4 text-[0.8125rem] text-muted-ink">
          14 gün ücretsiz · Kredi kartı gerekmez · Kurulum 4 dakika
        </p>
      </Reveal>

      <Reveal delay={0.32} className="relative mt-14 sm:mt-20">
        <FloatingPlatforms />
        <div className="lg:mx-24 xl:mx-28">
          <Shot
            src="/shots/panel-dashboard.png"
            alt="Ositend panelinde portföy görünümü: hazır rapor sayısı, kazanılan süre, yönetilen bütçe ve harcama trendi"
            zoom
          />
        </div>
      </Reveal>
      </Section>
    </AtmosphereBand>
  );
}

function ScheduleMeeting() {
  const gcalUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ositend+Demo+Görüşmesi&details=Ositend+paneli+üzerinden+30+dakikalık+demo+görüşmesi.&location=Google+Meet";
  const zoomUrl = "https://zoom.us/meeting/schedule";

  return (
    <Section className="pt-2 pb-4 sm:pt-4 sm:pb-6">
      <Reveal>
        <div className="glass-strong relative overflow-hidden rounded-[1.75rem] px-6 py-14 text-center sm:px-14 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(55% 90% at 12% 8%, color-mix(in oklch, var(--color-brand) 42%, transparent), transparent 72%), radial-gradient(50% 80% at 90% 96%, color-mix(in oklch, var(--color-violet) 36%, transparent), transparent 70%), radial-gradient(40% 60% at 60% 0%, color-mix(in oklch, var(--color-cyan) 30%, transparent), transparent 70%)",
            }}
          />
          <Eyebrow>Görüşme planlayın</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-xl text-[clamp(1.75rem,4vw,2.5rem)]">
            Formu beklemeyin — takviminizi açın, saati siz seçin.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-muted-ink">
            Google Takvim veya Zoom'da 30 dakikalık demo için uygun bir saat seçin, biz o saatte
            hazır olalım — kendi hesaplarınızla ilk raporu birlikte üretelim.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={gcalUrl} size="lg">
              <CalendarPlus className="size-4" />
              Google Takvim'de oluştur
            </Button>
            <Button href={zoomUrl} variant="secondary" size="lg">
              <Video className="size-4" />
              Zoom'da planla
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function LogoRow() {
  const row = [...logos, ...logos];
  return (
    <div className="border-y border-line-soft bg-surface py-8">
      <Section>
        <p className="text-center text-[0.8125rem] text-muted-ink">
          Türkiye'de 120'den fazla ajans raporlamasını Ositend'e bıraktı
        </p>
      </Section>
      <div className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-12">
          {row.map((name, i) => (
            <span
              key={i}
              className="shrink-0 font-display text-lg font-medium whitespace-nowrap text-muted-ink/60"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Statement() {
  return (
    <Section className="py-20 sm:py-28">
      <ScrollFillText
        text="Ajansınız analiz sattığını söylüyor ama zamanının çoğu kopyala-yapıştıra gidiyor. Ositend mekanik kısmı devralır, analiz kısmı size kalır."
        className="mx-auto max-w-4xl text-center font-display text-[clamp(1.375rem,3.4vw,2.25rem)] leading-[1.32] font-medium tracking-[-0.02em]"
      />
    </Section>
  );
}

function Stats() {
  return (
    <Section className="pb-20 sm:pb-28">
      <Reveal>
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-line-soft bg-line-soft sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-9 text-center sm:px-8 sm:py-11">
              <dd className="font-display text-[2.75rem] leading-none font-semibold text-ink sm:text-5xl">
                <CountUp to={s.to} suffix={s.suffix} />
              </dd>
              <dt className="mx-auto mt-3 max-w-[16rem] text-sm leading-relaxed text-muted-ink">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}

function Features() {
  return (
    <Section className="pb-20 sm:pb-28">
      <Reveal className="text-center">
        <Eyebrow>Ajans odaklı özellikler</Eyebrow>
        <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(1.875rem,4.4vw,2.875rem)]">
          Raporlamanın her adımı, tek yerde.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {features.map((f, i) => (
          <Reveal
            key={f.title}
            delay={i * 0.06}
            className={f.wide ? "md:col-span-2" : undefined}
          >
            <article className="card group h-full overflow-hidden">
              <div className="shot-frame m-2 overflow-hidden rounded-xl border-0 p-0 sm:m-3">
                <img
                  src={f.shot}
                  alt=""
                  loading="lazy"
                  className={`w-full border-b border-line-soft bg-white transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.02] ${
                    f.wide ? "max-h-[420px] object-cover object-top" : "max-h-[260px] object-cover object-top"
                  }`}
                />
              </div>
              <div className="flex items-start justify-between gap-6 p-6 pt-4 sm:p-7 sm:pt-5">
                <div>
                  <div className="flex items-center gap-2.5">
                    <f.icon className="size-4 text-brand" />
                    <h3 className="text-xl font-medium">{f.title}</h3>
                  </div>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-ink">{f.body}</p>
                </div>
                <Link
                  to="/hizmetler"
                  aria-label={`${f.title} — detaylar`}
                  className="hidden size-10 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform duration-200 group-hover:-translate-y-0.5 sm:flex"
                >
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Steps() {
  return (
    <Section className="py-20 sm:py-28">
      <Reveal className="text-center">
        <Eyebrow>Kurulum</Eyebrow>
        <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(1.875rem,4.4vw,2.875rem)]">
          Üç adım, tek seferlik.
        </h2>
      </Reveal>

      <ol className="mt-12 grid gap-8 sm:gap-10 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <li>
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-surface p-6">
                <s.doodle className="h-full w-full max-w-[15rem] text-ink/80" />
              </div>
              <h3 className="mt-6 text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-ink">{s.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function Testimonial() {
  return (
    <Section className="py-20 sm:py-28">
      <Reveal>
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="font-display text-[clamp(1.375rem,3.2vw,2rem)] leading-[1.35] font-medium tracking-[-0.02em]">
            “Beş müşteri için ayda iki tam gün rapor hazırlıyorduk. Şimdi o iki günü yeni iş
            görüşmelerine ayırıyoruz.”
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
            <span className="font-medium text-ink">Selin Aydın</span>
            <span className="size-1 rounded-full bg-line" />
            <span className="text-muted-ink">Kurucu Ortak, Formet Dijital</span>
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <LogoRow />
      <ScheduleMeeting />
      <Statement />
      <Stats />
      <Features />
      <Steps />
      <Testimonial />
      <Pricing />
      <ClosingCta />
    </>
  );
}
