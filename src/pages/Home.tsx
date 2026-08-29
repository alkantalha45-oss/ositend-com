import { Link } from "react-router-dom";
import { ArrowUpRight, Bell, CalendarCheck, FileText, LineChart, Phone } from "lucide-react";
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
import { bookingUrl, contact, pilot } from "../lib/site";
import { useSeo } from "../lib/seo";

/*
 * SAHTE SOSYAL KANIT KALDIRILDI.
 *
 * Bu sayfada daha önce sekiz uydurma müşteri logosu, "Türkiye'de 120'den
 * fazla ajans" cümlesi, ayda 4.800 rapor üretildiği iddiası ve isimli bir
 * müşteri yorumu (Selin Aydın / Formet Dijital) vardı. Hiçbiri gerçek değildi.
 *
 * İlk müşterisini arayan bir ürünün kendini yerleşik bir SaaS gibi
 * göstermesi, karşı taraf bunu fark ettiği anda -- ki referans istendiğinde
 * ilk görüşmede fark edilir -- yalnızca o iddiayı değil, ürünle ilgili
 * söylenen her şeyi şüpheli hale getirir. Yerine geçen anlatım kurucu pilot
 * programı: doğrulanabilir, ve erken alıcı için gerçekten cazip.
 */

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
      {platforms.map(({ name, Mark, status }, i) => {
        const s = spots[i]!;
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
              {/* Hazır olmayan entegrasyonun simgesi soluk: rozet metnini
                  okumadan da "bu henüz farklı" ayrımı görünsün. */}
              <Mark className={`size-6 ${status === "soon" ? "opacity-45" : ""}`} />
              <span className="text-[0.8125rem] font-medium whitespace-nowrap text-ink">
                {name}
              </span>
              {status === "soon" && (
                <span className="rounded-full bg-ink/8 px-1.5 py-0.5 text-[0.625rem] font-medium tracking-wide text-muted-ink uppercase">
                  yakında
                </span>
              )}
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
          {/*
            Satır kırılımı ELLE kontrol ediliyor. Otomatik dengelemede
            "bırakın, büyümeye" aynı satıra düşüyor ve cümle virgülün
            ortasında bölünmüş gibi okunuyor. İki bağımsız yargıyı kendi
            satırına ayırmak, büyük puntoda anlamı da ritmi de düzeltiyor.
            Dar ekranda kırılım kaldırılıyor; orada zaten doğal sarıyor.
          */}
          <h1 className="mx-auto mt-6 max-w-4xl text-[clamp(2.5rem,6.2vw,4.75rem)] text-balance">
            Rapor hazırlamayı bırakın,
            <br className="hidden sm:block" />{" "}
            <span className="text-brand">büyümeye odaklanın.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="lede mx-auto mt-7 max-w-2xl">
            Google Ads, Meta Ads ve GA4 hesaplarınızı bir kez bağlayın. Ositend her ay markalı PDF
            raporunu ve paylaşılabilir canlı linki sizin yerinize üretsin.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button to="/iletisim" size="lg">
              Hadi konuşalım
            </Button>
            <Button to="/hizmetler" variant="secondary" size="lg">
              Nasıl çalışıyor
            </Button>
          </div>
          {/*
            Önceki alt satır "14 gün ücretsiz · Kredi kartı gerekmez · Kurulum
            4 dakika" idi. Üçü de doğru değildi: ücretsiz deneme altyapısı yok,
            ödeme sayfası yok, kurulumu biz yapıyoruz ve dört dakika sürmüyor.
          */}
          <p className="mt-4 text-[0.8125rem] text-muted-ink">
            Kurucu pilot programı · {pilot.clients} ajans kontenjanı · Kurulumu birlikte yapıyoruz
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

/**
 * Uydurma müşteri logolarının yerini alan şerit.
 *
 * Aynı görsel boşluğu dolduruyor ama doğrulanabilir bir şey gösteriyor:
 * bugün hangi veri kaynağından okuyabildiğimizi. Hazır olmayanlar açıkça
 * "yakında" etiketli.
 */
function Integrations() {
  return (
    <div className="border-y border-line-soft bg-surface py-10">
      <Section>
        <p className="text-center text-[0.8125rem] text-muted-ink">
          Bugün bağlanabilen veri kaynakları
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {platforms.map(({ name, Mark, status }) => (
            <li key={name} className="flex items-center gap-2.5">
              <Mark className={`size-6 ${status === "soon" ? "opacity-40" : ""}`} />
              <span
                className={`text-sm font-medium ${status === "soon" ? "text-muted-ink/70" : "text-ink"}`}
              >
                {name}
              </span>
              {status === "soon" && (
                <span className="rounded-full border border-line px-2 py-0.5 text-[0.6875rem] text-muted-ink">
                  yakında
                </span>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

/**
 * Randevu bölümü.
 *
 * Gerçek bir rezervasyon adresi (VITE_BOOKING_URL) tanımlıysa tek ve net bir
 * buton çıkıyor. Tanımlı değilse buton HİÇ çıkmıyor; yerine gerçekten çalışan
 * iki kanal veriliyor. Eski hali iki buton gösteriyordu ama ikisi de bize
 * davet göndermiyordu: "Google Takvim'de oluştur" ziyaretçinin kendi
 * takviminde bir etkinlik açıyor, "Zoom'da planla" Zoom'un genel toplantı
 * kurma sayfasına gidiyordu. Ziyaretçi randevu aldığını sanıp bekliyordu.
 */
function ScheduleMeeting() {
  return (
    <Section className="pt-2 pb-4 sm:pt-4 sm:pb-6">
      <Reveal>
        <div className="glass-strong relative overflow-hidden rounded-[1.75rem] px-6 py-14 text-center sm:px-14 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            /*
              Üç ayrı renkten (mavi + mor + camgöbeği) tek bir maviye
              indirildi. Önceki hâli kartın içinde soldan sağa maviden
              yeşile, oradan pembeye geçiyordu; sayfadaki tek "renkli"
              yüzey olduğu için de bütün bölümü şablon gibi gösteriyordu.
              Şimdi tek ışık kaynağı var, mor yalnızca kenarda derinlik
              için ve çok düşük oranda.
            */
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

/**
 * Uydurma kullanım istatistiklerinin yerini alan şerit.
 *
 * Aynı sayısal vurguyu koruyor ama gösterdiği üç sayı da bizim taahhüdümüz —
 * yani doğruluğu bize bağlı, ölçüme değil.
 */
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
    <Section className="pb-20 sm:pb-28">
      <Reveal className="text-center">
        <Eyebrow>Kurucu pilot programı</Eyebrow>
        <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,4.8vw,3.25rem)]">
          Ürünü ilk beş ajansla birlikte kuruyoruz.
        </h2>
        <p className="lede mx-auto mt-6 max-w-2xl">
          Sitede müşteri logosu ya da müşteri yorumu görmüyorsunuz, çünkü henüz yok. Ositend çalışan
          bir ürün ama vitrine koyacağımız referansları pilot ajanslarla birlikte yazacağız — bu
          yüzden erken girene kalıcı bir fiyat avantajı ve yol haritasında söz hakkı veriyoruz.
        </p>
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

function Features() {
  return (
    <Section className="pb-20 sm:pb-28">
      <Reveal className="text-center">
        <Eyebrow>Ajans odaklı özellikler</Eyebrow>
        <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,4.8vw,3.25rem)]">
          Raporlamanın her adımı, tek yerde.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.06} className={f.wide ? "md:col-span-2" : undefined}>
            <article className="card group h-full overflow-hidden">
              <div className="shot-frame m-2 overflow-hidden rounded-xl border-0 p-0 sm:m-3">
                <img
                  src={f.shot}
                  alt=""
                  loading="lazy"
                  className={`w-full border-b border-line-soft bg-white transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-[1.02] ${
                    f.wide
                      ? "max-h-[420px] object-cover object-top"
                      : "max-h-[260px] object-cover object-top"
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
        <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,4.8vw,3.25rem)]">
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

/**
 * Uydurma müşteri yorumunun yerini alan kurucu notu.
 *
 * Bir müşteri ağzından cümle kuramayız; kendi taahhüdümüzü kurabiliriz.
 * Referans bölümü, gerçek bir pilot ajans izin verdiğinde geri gelecek.
 */
/*
 * "KURUCUDAN" BÖLÜMÜ KALDIRILDI (2026-08-30, kullanıcı isteği).
 *
 * Müşteri yorumunun yerini tutan, kurucunun kendi ağzından yazılmış uzun
 * bir nottu. İçindeki iki bilgi başka yerde zaten var: pilot programın
 * ne olduğu fiyat kartında, iletişim kanalları hem üst menüde hem
 * iletişim sayfasında. Sayfayı kısaltmak için düşürüldü.
 */

/*
 * SSS — ana sayfa sürümü (2026-08-30'da eklendi, öncesinde ana sayfada
 * hiç SSS yoktu).
 *
 * İletişim sayfasındaki SSS fatura, taahhüt ve fiyat sorularını yanıtlıyor.
 * Buradaki bilinçli olarak ÜRÜN sorularını yanıtlıyor: soğuk e-postadan
 * gelen biri önce "bu bende çalışır mı ve verim güvende mi" diye soruyor,
 * faturayı sonra sorar. İki liste birbirini tekrar ETMEMELİ.
 */
const faqs = [
  {
    q: "Hangi platformlar bağlanıyor?",
    /*
     * ⚠️ BU CEVAP ENTEGRASYON ŞERİDİYLE AYNI ŞEYİ SÖYLEMEK ZORUNDA.
     * Şerit (PlatformMarks.tsx) üç kaynağı "live" işaretliyor; cevap onu
     * tekrar ediyor, ÜSTÜNE yeni bir iddia eklemiyor. Şeritteki durum
     * değişirse burası da değişmeli.
     */
    a: "Bugün Google Ads, Meta Ads ve GA4. Search Console, LinkedIn Ads ve TikTok Ads sırada; sayfanın üstündeki şeritte hangisinin hazır hangisinin yolda olduğunu açıkça etiketliyoruz.",
  },
  {
    q: "Rapor tamamen bizim markamızla mı çıkıyor?",
    a: "Evet. Logo, renk ve kapak metni sizin; müşteriye giden PDF'te ve canlı linkte Ositend adı geçmez. Beyaz etiket sonradan eklenen bir özellik değil, ürünün varsayılanı.",
  },
  {
    q: "Müşterimize canlı link verebiliyor muyuz?",
    a: "Verebilirsiniz. Her rapor hem PDF olarak indiriliyor hem de paylaşılabilir bir bağlantı olarak açılıyor. Müşteri linke girip veriyi kendi zamanında inceleyebiliyor.",
  },
  {
    q: "Rapor müşteriye gitmeden önce kontrol edebiliyor muyuz?",
    a: "Evet, ve bu bilinçli bir tasarım kararı. Rapor üretiliyor, siz görüyorsunuz, yönetici özetini kendi cümlelerinizle yazıyorsunuz, sonra gönderiliyor. Otomasyon veriyi topluyor; müşteriyle konuşan taraf yine siz oluyorsunuz.",
  },
  {
    q: "Verilerimiz güvende mi?",
    a: "Reklam hesaplarınıza yalnızca salt-okunur erişim istiyoruz — hiçbir kampanyaya, bütçeye ya da reklama dokunamıyoruz, teknik olarak da yetkimiz yok. Şifrenizi istemiyoruz. Veriyi üçüncü taraflarla paylaşmıyor, model eğitiminde kullanmıyoruz. Bağlantıyı istediğiniz an koparabilirsiniz.",
  },
  {
    q: "Kurulum ne kadar sürüyor?",
    a: "Kurulumu sizin yerinize biz yapıyoruz. 30 dakikalık bir görüşmede kendi hesaplarınızı bağlıyoruz ve ekranda gerçek verinizle ilk raporunuzu birlikte çıkarıyoruz.",
  },
  {
    q: "Özel bir otomasyon ihtiyacımız var, onu da yapıyor musunuz?",
    a: "Yapıyoruz. Raporlama çekirdek ürünümüz ama ajansa özel otomasyon taleplerinde de çalışıyoruz — tekrar eden ne varsa konuşalım.",
  },
  {
    q: "Kaç müşteriyle başlayabiliriz?",
    a: `Tek müşteriyle bile. Kurucu pilot paketi ${pilot.clients} aktif müşteri ve ${pilot.sources} veri kaynağına kadar; ekip kullanıcı sayısında sınır yok.`,
  },
];

function Faq() {
  return (
    <Section className="py-20 sm:py-28">
      <Reveal className="text-center">
        <Eyebrow>Sık sorulanlar</Eyebrow>
        <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,4.8vw,3.25rem)]">
          Görüşmeden önce merak edilenler.
        </h2>
      </Reveal>

      <dl className="mx-auto mt-12 max-w-3xl">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <div className="grid gap-2 border-t border-line py-7 sm:grid-cols-[1fr_1.3fr] sm:gap-10">
              <dt className="font-display text-lg font-medium">{f.q}</dt>
              <dd className="text-[0.9375rem] leading-relaxed text-muted-ink">{f.a}</dd>
            </div>
          </Reveal>
        ))}
      </dl>
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
      <Integrations />
      <ScheduleMeeting />
      <Statement />
      <PilotTerms />
      <Features />
      <Steps />
      <Pricing />
      <Faq />
      <ClosingCta />
    </>
  );
}
