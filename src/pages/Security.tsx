import { Link } from "react-router-dom";
import { Check, Clock, KeyRound, Link2, Lock, Server, ShieldCheck, Users } from "lucide-react";
import { Button, ClosingCta, Eyebrow, PageHero, Reveal, Section } from "../components/bits";
import { useSeo } from "../lib/seo";
import { contact } from "../lib/site";

/*
 * Güvenlik sayfası.
 *
 * İki işi birden görüyor:
 *  1) Satış — ajansın hukuk/BT onayında ilk sorulan sorular burada yanıtlı.
 *  2) Google OAuth doğrulaması — Ads API başvurusu, izin kapsamının ve veri
 *     kullanımının kamuya açık bir adreste anlatılmasını istiyor.
 *
 * "HENÜZ HAZIR DEĞİL" bölümü bilinçli olarak var. Bir güvenlik sayfasının
 * yalnızca güçlü yanları listelemesi, okuyan teknik kişide "peki
 * yazmadıkları ne" sorusunu doğurur. Eksikleri kendimiz söylemek, satış
 * görüşmesinde savunmaya düşmekten iyi.
 */

const measures = [
  {
    icon: KeyRound,
    title: "Şifrenizi hiç görmüyoruz",
    body: "Reklam hesaplarına bağlantı, Google ve Meta'nın kendi OAuth ekranları üzerinden yapılır. Kullanıcı adı ve şifreniz bize ulaşmaz, bizden istenmez.",
  },
  {
    icon: Lock,
    title: "Yalnızca okuma izni",
    body: "İstediğimiz yetkiler, raporlanacak veriyi okumakla sınırlıdır. Kampanya durdurma, bütçe değiştirme veya reklam yayınlama yetkisi talep etmiyoruz — teknik olarak da yapamayız.",
  },
  {
    icon: ShieldCheck,
    title: "Jetonlar şifreli saklanır",
    body: "Platformların verdiği erişim jetonları, veritabanına yazılmadan önce AES-256-GCM ile şifrelenir. Günlüklere, hata kayıtlarına ve rapor çıktılarına asla yazılmaz.",
  },
  {
    icon: Users,
    title: "Hesaplar birbirinden ayrı",
    body: "Her ajansın verisi kendi hesabına bağlıdır; bir ajansın kullanıcısı başka bir ajansın müşterisini, raporunu veya bağlantısını sorgulayamaz.",
  },
  {
    icon: Server,
    title: "Aktarımda şifreleme",
    body: "Site ve panel dahil tüm trafik TLS ile şifrelenir. Bağlantı kurulan reklam platformlarına yapılan istekler de aynı şekilde şifrelidir.",
  },
  {
    icon: Clock,
    title: "İstediğiniz an kesersiniz",
    body: "Bağlantıyı panelden koparabilir ya da doğrudan Google/Meta hesap ayarlarınızdan erişimi iptal edebilirsiniz. Bağlantı koptuğunda jetonlar silinir.",
  },
];

const dataUse = [
  "Reklam ve analitik verinizi yalnızca sizin raporlarınızı üretmek için kullanırız.",
  "Verinizi satmayız, kiralamayız, reklam ağlarıyla paylaşmayız.",
  "Verinizi yapay zekâ modeli eğitmek için kullanmayız.",
  "Ositend personeli, yalnızca sizin açtığınız bir destek talebini çözmek için ve gerektiği kadar veriye bakar.",
  "Hesabınızı kapattığınızda jetonlar derhal, rapor verisi 30 gün içinde silinir.",
];

/*
 * Kapatılmamış boşluklar. Bu liste, ürün ilerledikçe küçülmeli — bir madde
 * hazır olduğunda yukarıdaki `measures` dizisine taşınır.
 */
const gaps = [
  {
    title: "Müşteri portalı linkleri süresiz",
    body: "Paylaşılan canlı rapor linki tahmin edilemez rastgele bir kimlik taşır ve yalnızca o müşterinin verisini gösterir. Ancak süresi dolmaz ve parola sormaz: linke sahip olan herkes raporu açabilir. Panelden linki yenileyerek eskisini geçersiz kılabilirsiniz.",
    planned: "Son kullanma tarihi, isteğe bağlı parola ve erişim kaydı yol haritasında.",
  },
  {
    title: "Bağımsız güvenlik denetimi yapılmadı",
    body: "SOC 2 veya ISO 27001 belgemiz yok ve üçüncü taraf sızma testi yaptırmadık. Bu aşamada böyle bir belgeye sahipmiş gibi davranmak yanıltıcı olurdu.",
    planned: "İlk ücretli müşterilerden sonra bağımsız sızma testi planlanıyor.",
  },
  {
    title: "İki adımlı doğrulama henüz yok",
    body: "Panele giriş şu anda e-posta ve parola ile yapılıyor; ikinci bir doğrulama adımı bulunmuyor.",
    planned: "TOTP tabanlı iki adımlı doğrulama geliştirme sırasında.",
  },
];

export function Security() {
  useSeo({
    title: "Güvenlik — Verileriniz nasıl korunuyor | Ositend",
    description:
      "Ositend hangi izinleri istiyor, erişim jetonlarını nasıl saklıyor, verileri nerede tutuyor ve ne zaman siliyor. Hazır olan ve henüz olmayan güvenlik kontrolleri.",
    path: "/guvenlik",
  });

  return (
    <>
      <PageHero
        eyebrow="Güvenlik"
        title={
          <>
            Erişim <span className="text-brand">salt-okunur</span>, veri sizin.
          </>
        }
        lede="Ajansınız bize kendi müşterilerinin verisini emanet ediyor. Hangi izinleri istediğimizi, veriyi nerede tuttuğumuzu ve neyi henüz yapamadığımızı olduğu gibi yazdık."
      />

      <Section className="pb-20 sm:pb-28">
        <div className="grid gap-5 md:grid-cols-2">
          {measures.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.05}>
              <article className="card h-full p-7">
                <span className="flex size-10 items-center justify-center rounded-lg bg-brand-tint text-brand">
                  <m.icon className="size-[1.125rem]" />
                </span>
                <h2 className="mt-5 text-lg font-medium">{m.title}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-ink">{m.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <div className="border-y border-line-soft bg-surface">
        <Section className="py-20 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <Eyebrow>Veri kullanımı</Eyebrow>
              <h2 className="mt-6 text-[clamp(1.5rem,3vw,2rem)]">Veriyle ne yapıyoruz?</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="space-y-4">
                {dataUse.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span className="text-[0.9375rem] leading-relaxed text-muted-ink">{d}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted-ink">
                Saklama süreleri ve yurt dışına aktarım tablosu için{" "}
                <Link to="/kvkk-aydinlatma" className="text-brand underline">
                  KVKK Aydınlatma Metni
                </Link>
                , tedarikçi listesi için{" "}
                <Link to="/veri-isleme-sozlesmesi" className="text-brand underline">
                  Veri İşleme Sözleşmesi
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </Section>
      </div>

      <Section className="py-20 sm:py-28">
        <Reveal className="text-center">
          <Eyebrow>Açık konuşalım</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,4.8vw,3.25rem)]">
            Henüz hazır olmayanlar.
          </h2>
          <p className="lede mx-auto mt-6 max-w-2xl">
            Bu maddeleri satış görüşmesinde sormanızı beklemek yerine buraya yazıyoruz. Biri
            tamamlandığında yukarıdaki listeye taşınacak.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl">
          {gaps.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06}>
              <div className="border-t border-line py-7">
                <h3 className="flex items-start gap-2.5 font-display text-lg font-medium">
                  <Link2 className="mt-1 size-4 shrink-0 text-muted-ink" />
                  {g.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-ink">{g.body}</p>
                <p className="mt-2 text-sm text-brand">{g.planned}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pb-20 sm:pb-28">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-2xl border border-line-soft bg-surface p-8 text-center sm:p-10">
            <h2 className="text-xl font-medium">Güvenlik açığı bildirimi</h2>
            <p className="mx-auto mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-muted-ink">
              Bir güvenlik zafiyeti fark ederseniz lütfen kamuya duyurmadan önce bize yazın. Aynı iş
              günü içinde dönüş yapıyor, doğrulanan bildirimlerde bulan kişiyi — isterse — teşekkür
              listemizde anıyoruz.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href={`mailto:${contact.email}?subject=Güvenlik%20bildirimi`}>
                {contact.email}
              </Button>
              <Button to="/iletisim" variant="secondary">
                İletişim
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      <ClosingCta />
    </>
  );
}
