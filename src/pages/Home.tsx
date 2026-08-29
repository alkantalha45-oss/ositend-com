import { Bell, FileText, LineChart } from "lucide-react";
import {
  AtmosphereBand,
  Button,
  ClosingCta,
  Eyebrow,
  Reveal,
  Section,
  Shot,
} from "../components/bits";
import { ConnectDoodle, BrandDoodle, ScheduleDoodle } from "../components/Doodles";
import { Pricing } from "../components/Pricing";
import { platforms } from "../components/PlatformMarks";
import { pilot } from "../lib/site";
import { useSeo } from "../lib/seo";

/*
 * SAYFA OMURGASI (2026-08-30'da kullanıcı tarafından belirlendi):
 *
 *   Hero → Problem → Çözüm/Değer → Nasıl çalışıyor (1-2-3) → Fiyat → SSS → CTA
 *
 * Bu, soğuk e-postadan gelen ziyaretçi için kurulmuş bir sıra. Instantly
 * kampanyasındaki mail "her ay rapor hazırlamak ekibinizin zamanını almıyor"
 * diyor; ziyaretçi buraya o cümlenin karşılığını görmeye geliyor. Sayfa
 * önce acıyı adıyla anıyor, sonra ne değiştiğini, sonra mekanizmayı
 * gösteriyor. Sıra bozulursa "ne satıyorsunuz" sorusu cevapsız kalıyor.
 *
 * METİN KAYNAĞI: Instantly Copilot memory (business description + 3 teklif +
 * 2 ICP) ve ilk e-posta taslağının tonu. Ton kuralı: profesyonel ama samimi —
 * "biz" diliyle, abartısız, somut. Hiçbir cümle ölçmediğimiz bir şey iddia
 * etmiyor.
 *
 * SAHTE SOSYAL KANIT KALDIRILDI (önceki revizyon, hâlâ geçerli):
 * Bu sayfada bir zamanlar sekiz uydurma müşteri logosu, "120'den fazla ajans"
 * cümlesi ve isimli bir müşteri yorumu vardı. Hiçbiri gerçek değildi. İlk
 * müşterisini arayan bir ürünün kendini yerleşik bir SaaS gibi göstermesi,
 * karşı taraf fark ettiği anda ürünle ilgili söylenen her şeyi şüpheli
 * hale getirir. Yerine kurucu pilot programı geçti: doğrulanabilir.
 */

/** Hero'nun altındaki üç madde. Sırasıyla: zaman, uyarı, portföy görünürlüğü. */
const heroPoints = [
  "Ekibiniz ayın ilk haftasını tablo doldurarak değil, kampanya yöneterek geçirir.",
  "Harcama sıçraması ya da dönüşüm düşüşü, müşteriniz fark etmeden size bildirilir.",
  "Bütün portföyünüz tek ekranda — hangi müşteri önde, hangisi geride.",
];

/** Problem bölümü. Üçü de ajans sahibinin kendi ağzından tanıyacağı durumlar. */
const problems = [
  {
    title: "Her müşteri, her ay, baştan",
    body: "Google Ads'ten bir ekran görüntüsü, Meta'dan bir tablo, GA4'ten bir başkası. Sonra hepsini tek bir sunuma taşımak. On beş müşteride bu, bir kişinin haftası.",
  },
  {
    title: "Rapor gecikince konu değişir",
    body: "Ayın ilk haftası yoğunsa rapor kayar. Müşteri sormaya başladığında görüşme artık performansı değil, raporun nerede kaldığını konuşur.",
  },
  {
    title: "Sorunu müşteriden sonra öğrenmek",
    body: "Dönüşüm düşüşünü ay sonu raporunu hazırlarken fark ederseniz, kaybedilen üç haftayı geri getiremezsiniz.",
  },
];

const features = [
  {
    icon: FileText,
    title: "Rapor kendi kendine üretilir",
    body: "Google Ads, Meta Ads ve GA4 verisi her ayın başında toplanır, sizin logonuz ve renklerinizle PDF'e dönüşür. Müşteriye giden dosyada bizim adımız geçmez.",
    shot: "/shots/panel-raporlar.png",
    wide: true,
  },
  {
    icon: Bell,
    title: "Sorunu müşteriden önce görün",
    body: "Harcama sıçraması ya da dönüşüm düşüşü aynı gün uyarıya dönüşür — her uyarıda somut bir aksiyon önerisiyle.",
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
    body: "Google Ads, Meta Ads ve GA4 hesaplarınıza güvenli OAuth ile tek seferlik salt-okunur erişim verirsiniz. Şifrenizi istemiyoruz, hiçbir zaman görmüyoruz.",
  },
  {
    doodle: BrandDoodle,
    title: "Markanızı tanımlayın",
    body: "Logo, renk ve kapak metnini bir kez girersiniz. Bundan sonraki her rapor bu kimlikle çıkar — müşteriniz sizin ajansınızın raporunu görür.",
  },
  {
    doodle: ScheduleDoodle,
    title: "Takvimi kurun, unutun",
    body: "Her müşteri için gönderim gününü seçersiniz. Rapor üretilir, siz kontrol edip yorumunuzu eklersiniz, müşteriye gider.",
  },
];

/*
 * SSS — ana sayfa sürümü.
 *
 * İletişim sayfasındaki SSS fatura, taahhüt ve fiyat sorularını yanıtlıyor.
 * Buradaki bilinçli olarak ÜRÜN sorularını yanıtlıyor: soğuk e-postadan gelen
 * biri önce "bu bende çalışır mı ve verim güvende mi" diye soruyor, faturayı
 * sonra sorar. İki liste birbirini tekrar etmiyor.
 */
const faqs = [
  {
    q: "Hangi platformlar bağlanıyor?",
    /*
     * ⚠️ BU CEVAP YUKARIDAKİ ENTEGRASYON ŞERİDİYLE AYNI ŞEYİ SÖYLEMEK
     * ZORUNDA. Şerit (PlatformMarks.tsx) üç kaynağı "live" işaretliyor;
     * cevap da onu tekrar ediyor, ÜSTÜNE yeni bir iddia eklemiyor.
     * Şeritteki durum değişirse burası da değişmeli — bir SSS'in en kötü
     * hali, sayfanın geri kalanının aksini söylemesidir.
     */
    a: "Bugün Google Ads, Meta Ads ve GA4. Search Console, LinkedIn Ads ve TikTok Ads sırada; sayfanın üstündeki şeritte hangisinin hazır hangisinin yolda olduğunu açıkça etiketliyoruz.",
  },
  {
    q: "Rapor tamamen bizim markamızla mı çıkıyor?",
    a: "Evet. Logo, renk ve kapak metni sizin; müşteriye giden PDF'te ve canlı linkte Ositend adı geçmez. Beyaz etiket, sonradan eklenen bir özellik değil, ürünün varsayılanı.",
  },
  {
    q: "Müşterimize canlı link verebiliyor muyuz?",
    a: "Verebilirsiniz. Her rapor hem PDF olarak indirilebiliyor hem de paylaşılabilir bir bağlantı olarak açılıyor. Müşteri linke girip veriyi kendi zamanında inceleyebiliyor; PDF'i eke koyup göndermek zorunda değilsiniz.",
  },
  {
    q: "Rapor müşteriye gitmeden önce kontrol edebiliyor muyuz?",
    a: "Evet, ve bu bilinçli bir tasarım kararı. Rapor üretiliyor, siz görüyorsunuz, yönetici özetini kendi cümlelerinizle yazıyorsunuz, sonra gönderiliyor. Otomasyon veriyi topluyor; müşteriyle konuşan taraf yine siz oluyorsunuz.",
  },
  {
    q: "Verilerimiz güvende mi?",
    a: "Reklam hesaplarınıza yalnızca salt-okunur erişim istiyoruz — hiçbir kampanyaya, bütçeye ya da reklama dokunamayız, teknik olarak da yetkimiz yok. Şifrenizi istemiyoruz. Veriyi üçüncü taraflarla paylaşmıyor, model eğitiminde kullanmıyoruz. Bağlantıyı istediğiniz an koparabilirsiniz.",
  },
  {
    q: "Kurulum ne kadar sürüyor?",
    a: "Kurulumu sizin yerinize biz yapıyoruz. 30 dakikalık bir görüşmede kendi hesaplarınızı bağlıyoruz ve ekranda gerçek verinizle ilk raporunuzu birlikte çıkarıyoruz. Sunum yok, slayt yok.",
  },
  {
    q: "Özel bir otomasyon ihtiyacımız var, onu da yapıyor musunuz?",
    a: "Yapıyoruz. Raporlama çekirdek ürünümüz ama ajansa özel otomasyon taleplerinde de çalışıyoruz — tekrar eden ne varsa konuşalım, çoğu zaman çözülebiliyor.",
  },
  {
    q: "Kaç müşteriyle başlayabiliriz?",
    a: `Tek müşteriyle bile. Kurucu pilot paketi ${pilot.clients} aktif müşteri ve ${pilot.sources} veri kaynağına kadar; ekip kullanıcı sayısında sınır yok.`,
  },
];

/* ------------------------------------------------------------------ *
 * 1 · HERO
 *
 * SOLA HİZALI, İKİ SÜTUN. Önceki hali ortalanmış tek sütundu ve altında
 * dev bir ekran görüntüsü vardı: başlık "Rapor hazırlamayı bırakın,
 * büyümeye odaklanın" diyordu — her raporlama ürününün söyleyebileceği,
 * dolayısıyla hiçbir şey söylemeyen bir cümle.
 *
 * Yeni başlık ürünün mekanizmasını söylüyor: üç kaynak → tek rapor → elle
 * iş yok. Ziyaretçi ne satıldığını ilk saniyede anlıyor. Altındaki üç madde
 * de süslemek için değil; Instantly memory'sindeki üç değer önermesinin
 * (zaman kazancı, anomali uyarısı, portföy panosu) birebir karşılığı.
 * ------------------------------------------------------------------ */
function Hero() {
  return (
    <AtmosphereBand>
      <Section className="pt-12 pb-16 sm:pt-16 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.12fr] lg:gap-14">
          {/* Sol sütun — söz */}
          <div>
            <Reveal>
              <Eyebrow>Ajanslar için raporlama otomasyonu</Eyebrow>
            </Reveal>

            <Reveal delay={0.08}>
              {/*
                PUNTO İKİ SÜTUNA GÖRE AYARLI. Ortalanmış tek sütundaki 4rem
                üst sınır burada çalışmıyor: sol sütun dar olduğu için başlık
                dört satıra taşıyor ve maddeler de butonlar da fold'un altında
                kalıyor — yani hero'nun asıl işini yapan kısım hiç görünmüyor.
                3.25rem'de başlık iki satıra oturuyor ve CTA ekranda kalıyor.
              */}
              <h1 className="mt-5 text-[clamp(2.125rem,3.9vw,3.25rem)] text-balance">
                Üç platform. Tek markalı rapor.{" "}
                <span className="text-brand">Sıfır kopyala-yapıştır.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="lede mt-6 max-w-xl">
                Google Ads, Meta Ads ve GA4 hesaplarınızı bir kez bağlıyorsunuz. Ositend her ayın
                başında müşterilerinizin raporunu sizin logonuz ve renklerinizle üretiyor — hem PDF
                hem paylaşılabilir canlı link olarak.
              </p>
            </Reveal>

            {/* Üç madde: nokta + cümle. Kullanıcının istediği biçim. */}
            <Reveal delay={0.22}>
              <ul className="mt-7 space-y-3.5">
                {heroPoints.map((point) => (
                  <li key={point} className="flex gap-3.5">
                    <span
                      aria-hidden
                      className="mt-[0.5625rem] size-1.5 shrink-0 rounded-full bg-brand"
                    />
                    <span className="text-[1.0625rem] leading-relaxed text-muted-ink">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button to="/iletisim" size="lg">
                  Pilot programa başvurun
                </Button>
                <Button to="/hizmetler" variant="secondary" size="lg">
                  15 dakikalık tanışma
                </Button>
              </div>
              {/*
                Önceki alt satır "14 gün ücretsiz · Kredi kartı gerekmez ·
                Kurulum 4 dakika" idi. Üçü de doğru değildi: ücretsiz deneme
                altyapısı yok, ödeme sayfası yok, kurulumu biz yapıyoruz ve
                dört dakika sürmüyor.
              */}
              <p className="mt-4 text-[0.8125rem] text-muted-ink">
                Kurucu pilot programı · {pilot.clients} ajans kontenjanı · Kurulumu birlikte
                yapıyoruz
              </p>
            </Reveal>
          </div>

          {/*
            Sağ sütun — görsel.

            SAĞA TAŞIYOR (lg:-mr-*). Kap içinde durduğunda panel görseli sol
            sütundaki metinden belirgin şekilde kısa kalıyor ve maddelerin
            hizasında kocaman bir boşluk oluşuyordu. Taşırınca görsel büyüyor,
            boşluk kapanıyor ve ekranın kenarından devam ediyormuş hissi
            veriyor. AtmosphereBand zaten overflow-hidden, yatay kaydırma
            oluşmuyor.
          */}
          <Reveal delay={0.24} className="lg:-mr-10 xl:-mr-20">
            <Shot
              src="/shots/panel-dashboard.png"
              alt="Ositend panelinde portföy görünümü: hazır rapor sayısı, kazanılan süre, yönetilen bütçe ve harcama trendi"
            />
          </Reveal>
        </div>
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

/* ------------------------------------------------------------------ *
 * 2 · PROBLEM
 *
 * Ürünü anlatmadan önce acıyı adıyla anmak. Üç kart da ajans sahibinin
 * kendi yaşadığı bir sahneyi tarif ediyor; hiçbiri istatistik uydurmuyor
 * ("ajansların %73'ü..." türü cümleler bilerek yok).
 * ------------------------------------------------------------------ */
function Problem() {
  return (
    <Section className="py-20 sm:py-28">
      <Reveal>
        <div className="max-w-3xl">
          <Eyebrow>Tanıdık geliyorsa</Eyebrow>
          <h2 className="mt-6 text-[clamp(1.875rem,4.4vw,3rem)] text-balance">
            Ajansınız analiz satıyor. Ama zamanının çoğu kopyala-yapıştıra gidiyor.
          </h2>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {problems.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="card h-full p-7 sm:p-8">
              <h3 className="font-display text-lg font-medium">{p.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-ink">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 3 · ÇÖZÜM / DEĞER
 *
 * Bölümün ilk cümlesi sınırı da çiziyor: Ositend raporu YAZMIYOR, veriyi
 * getiriyor. Bunu açıkça söylemek satışta işe yarıyor — ajans sahibinin
 * ilk refleksi "yapay zeka benim yorumumu mu yazacak" endişesi oluyor ve
 * o endişe cevaplanmazsa geri kalan her şey şüpheli duruyor.
 * ------------------------------------------------------------------ */
function SolutionValue() {
  return (
    <Section className="py-20 sm:py-28">
      <Reveal>
        <div className="max-w-3xl">
          <Eyebrow>Ositend ne değiştiriyor</Eyebrow>
          <h2 className="mt-6 text-[clamp(1.875rem,4.4vw,3rem)] text-balance">
            Mekanik kısmı devralıyoruz. Analiz kısmı sizde kalıyor.
          </h2>
          <p className="lede mt-6">
            Ositend raporu sizin yerinize yorumlamıyor — veriyi toplayıp önünüze hazır getiriyor.
            Yorum, öneri ve müşteri ilişkisi sizin işiniz. Kopyala-yapıştır bizim.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08} className={f.wide ? "lg:col-span-2" : ""}>
            <div className="card h-full overflow-hidden">
              <div className="p-7 sm:p-9">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-tint text-brand">
                  <f.icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-medium">{f.title}</h3>
                <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-muted-ink">
                  {f.body}
                </p>
              </div>
              <div className="px-7 pb-7 sm:px-9 sm:pb-9">
                <Shot src={f.shot} alt={f.title} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 4 · NASIL ÇALIŞIYOR — 01 / 02 / 03
 *
 * Numaralar görünür: kullanıcının açık isteği ("bir, iki, üç şeklinde
 * altında açıklamalı"). Numarasız üç kart, sıralı bir kurulum akışı değil
 * birbirinden bağımsız üç özellik gibi okunuyordu.
 * ------------------------------------------------------------------ */
function HowItWorks() {
  return (
    <Section className="py-20 sm:py-28">
      <Reveal>
        <div className="max-w-3xl">
          <Eyebrow>Nasıl çalışıyor</Eyebrow>
          <h2 className="mt-6 text-[clamp(1.875rem,4.4vw,3rem)] text-balance">
            Üç adım. Sonrası kendiliğinden.
          </h2>
        </div>
      </Reveal>

      <ol className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <li className="h-full">
              <s.doodle className="h-28 w-auto" />
              <div className="mt-6 flex items-baseline gap-3">
                <span className="tnum font-display text-[0.9375rem] font-medium text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-medium">{s.title}</h3>
              </div>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-ink">{s.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * 5 · SSS
 * ------------------------------------------------------------------ */
function Faq() {
  return (
    <Section className="py-20 sm:py-28">
      <Reveal>
        <div className="max-w-3xl">
          <Eyebrow>Sık sorulanlar</Eyebrow>
          <h2 className="mt-6 text-[clamp(1.875rem,4.4vw,3rem)] text-balance">
            Görüşmeden önce merak edilenler.
          </h2>
        </div>
      </Reveal>

      <dl className="mt-12 max-w-4xl">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <div className="grid gap-2 border-t border-line py-7 sm:grid-cols-[1fr_1.4fr] sm:gap-10">
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
      <Problem />
      <SolutionValue />
      <HowItWorks />
      <Pricing />
      <Faq />
      <ClosingCta />
    </>
  );
}
