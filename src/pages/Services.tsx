import { Bell, Check, FileText, LayoutDashboard, Mail } from "lucide-react";
import { Button, ClosingCta, Eyebrow, PageHero, Reveal, Section, Shot } from "../components/bits";
import { useSeo } from "../lib/seo";
import { pilot } from "../lib/site";

const services = [
  {
    icon: FileText,
    title: "Otomatik aylık rapor",
    lede: "Reklam hesaplarınızı bir kez bağlayın; her ayın başında markalı PDF hazır olsun.",
    points: [
      "Google Ads, Meta Ads ve GA4 tek raporda birleşir",
      "Kendi logonuz, renkleriniz ve kapak sayfanız",
      "Kampanya kırılımı, ROAS, CPL ve dönüşüm trendi",
      "Rapor takvimini müşteri bazında siz belirlersiniz",
    ],
    shot: "/shots/panel-raporlar.png",
  },
  {
    icon: LayoutDashboard,
    title: "Canlı müşteri portalı",
    lede: "Müşteriniz ay sonunu beklemesin — paylaşılabilir link her zaman güncel veriyi gösterir.",
    /*
     * İKİ İDDİA DÜZELTİLDİ:
     *
     * 1) "Tek linkle paylaşım, giriş şifresi gerekmez" bir ÖZELLİK gibi
     *    yazılmıştı; oysa tahmin edilemez ama süresiz ve iptal edilemez bir
     *    link, güvenlik tarafında bir eksik. Kurumsal bir ajansın satın alma
     *    sürecinde ilk sorulacak şeylerden biri. Olduğu gibi anlatılıyor.
     *
     * 2) "İsterseniz kendi alan adınız altında yayınlanır" doğru değildi:
     *    panelde alan adı alanı ve bir "doğrula" düğmesi var ama düğme
     *    hiçbir DNS kontrolü yapmadan kaydı doğrulanmış işaretliyor, trafiği
     *    yönlendiren bir şey yok. "Yakında" olarak işaretlendi.
     */
    points: [
      "Tek linkle paylaşım — müşterinizin hesap açmasına gerek yok",
      "Mobilde de okunabilir, sunuma hazır düzen",
      "Müşteri sadece kendi verisini görür",
      "Linki istediğiniz an yenileyip eskisini geçersiz kılarsınız",
      "Yakında: link için son kullanma tarihi, isteğe bağlı parola ve erişim kaydı",
      "Yakında: raporların kendi alan adınız altında yayınlanması",
    ],
    shot: "/shots/panel-musteriler.png",
  },
  {
    icon: Bell,
    title: "Anomali uyarıları",
    lede: "Harcama fırladığında ya da dönüşüm düştüğünde ay sonunu beklemeyin.",
    points: [
      "Kampanya seviyesinde harcama sıçraması tespiti",
      "Dönüşüm ve ROAS düşüşünde eşik tabanlı uyarı",
      "Her uyarıya somut aksiyon önerisi eşlik eder",
      "Bağlantı koptuğunda anında haber alırsınız",
    ],
    shot: "/shots/panel-uyarilar.png",
  },
];

const extras = [
  {
    icon: Mail,
    title: "Haftalık özet e-postası",
    body: "Portföyünüzün tamamı için okunması 30 saniye süren tek sayfalık özet. En çok dikkat gerektiren üç madde öne çıkar, gönderim gününü siz seçersiniz.",
  },
  {
    icon: LayoutDashboard,
    title: "Ekip ve rol yönetimi",
    body: `Ekibinize sınırsız kullanıcı ekleyin — paket limiti müşteri sayısında, ekipte değil. Salt-okunur rolle müşterilerinizi de panele davet edebilirsiniz.`,
  },
];

export function Services() {
  useSeo({
    title: "Hizmetler — Otomatik rapor, canlı portal, anomali uyarıları | Ositend",
    description:
      "Ositend ajansınızın müşteri raporlamasını uçtan uca otomatikleştirir: markalı aylık PDF, paylaşılabilir canlı müşteri portalı ve aynı gün anomali uyarıları.",
    path: "/hizmetler",
  });

  return (
    <>
      <PageHero
        eyebrow="Hizmetler"
        title={
          <>
            Raporlamanın tamamı, <span className="text-brand">otomatik.</span>
          </>
        }
        lede="Ositend tek bir işi çok iyi yapar: ajansınızın müşterilerine gönderdiği raporu, sizin markanızla, siz uğraşmadan üretir."
      >
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/iletisim" size="lg">
            Demo planlayın
          </Button>
        </div>
        <p className="mt-4 text-center text-[0.8125rem] text-muted-ink">
          Kurucu pilot paketi {pilot.clients} aktif müşteri ve {pilot.sources} veri kaynağına kadar
        </p>
      </PageHero>

      <Section className="pb-20 sm:pb-28">
        <div className="space-y-5">
          {services.map((s, i) => (
            <Reveal key={s.title}>
              <article className="card overflow-hidden">
                <div
                  className={`grid items-center gap-8 p-6 sm:p-9 lg:grid-cols-2 lg:gap-12 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <span className="flex size-10 items-center justify-center rounded-lg bg-brand-tint text-brand">
                      <s.icon className="size-[1.125rem]" />
                    </span>
                    <h2 className="mt-5 text-[clamp(1.5rem,3vw,2rem)]">{s.title}</h2>
                    <p className="mt-3 max-w-md text-base leading-relaxed text-muted-ink">
                      {s.lede}
                    </p>
                    <ul className="mt-7 space-y-3 border-t border-line-soft pt-6">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                          <span className="leading-relaxed text-muted-ink">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Shot src={s.shot} alt={`${s.title} — Ositend panelinden görünüm`} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <div className="border-y border-line-soft bg-surface">
        <Section className="py-20 sm:py-28">
          <Reveal className="text-center">
            <Eyebrow>Dahası</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,4.8vw,3.25rem)]">
              Ajans gününüzü kolaylaştıran detaylar.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {extras.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08}>
                <article className="card h-full p-7">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-brand-tint text-brand">
                    <e.icon className="size-[1.125rem]" />
                  </span>
                  <h3 className="mt-5 text-lg font-medium">{e.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-ink">{e.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      <div className="pt-20 sm:pt-28">
        <ClosingCta />
      </div>
    </>
  );
}
