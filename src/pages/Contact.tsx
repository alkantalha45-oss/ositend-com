import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Check, Loader2, Mail, Phone } from "lucide-react";
import { Eyebrow, PageHero, Reveal, Section } from "../components/bits";
import { useSeo } from "../lib/seo";
import { ANNUAL_DISCOUNT, billing, contact, extraClientPrice, pilot, tl, yearlyTotal } from "../lib/site";

const channels = [
  {
    icon: Mail,
    label: "E-posta",
    value: contact.email,
    href: `mailto:${contact.email}`,
    note: "Aynı iş günü içinde yanıtlıyoruz",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: contact.phone,
    href: contact.phoneHref,
    note: contact.hours,
  },
];

/*
 * SSS, yeni fiyat modeline göre yeniden yazıldı. Eski cevaplar "abonelik
 * veya aylık bakım bedeli yok" ve "kurulum ücreti müşteri sayısından
 * bağımsızdır" diyordu; ikisi de artık geçerli değil ve bir SSS'in en kötü
 * hali, sayfanın geri kalanının aksini söylemesidir.
 */
const faqs = [
  {
    q: "Demo ne kadar sürüyor?",
    a: "Yaklaşık 30 dakika. Kendi reklam hesaplarınızı bağlayıp ilk markalı raporunuzu görüşme sırasında canlı üretiyoruz.",
  },
  {
    q: "Taahhüt var mı?",
    a: `Kurucu pilotta asgari ${pilot.commitmentMonths} aylık ücretli kullanım var — ürünü gerçek bir portföyde oturtmak için gereken süre bu. Sonrasında aylık devam eder, istediğiniz ay bırakırsınız. Kurucu fiyatınız ${pilot.priceLockMonths} ay boyunca artmaz.`,
  },
  {
    q: "Kurulum işime yaramazsa ne olur?",
    a: `İlk 30 gün risk bizde: kurduğumuz rapor işinize yaramazsa ${tl(pilot.setup)} kurulum ücretini iade ederiz. Aylık abonelik ayrıca dilediğiniz an durur.`,
  },
  {
    q: "Yıllık ödeme avantajı var mı?",
    a: `Var: yıllık peşin ödemede %${ANNUAL_DISCOUNT} indirim uygulanıyor. Pilot aboneliğinde aylık ${tl(pilot.monthly)} yerine aylık karşılığı ${tl(Math.round(yearlyTotal(pilot.monthly) / 12))}, yıllık toplam ${tl(yearlyTotal(pilot.monthly))} oluyor. Kurulum ücreti her iki durumda da aynı.`,
  },
  {
    q: "Fatura nasıl kesiliyor?",
    a: `Hizmeti şu anda serbest çalışan olarak veriyoruz; sözleşme, fatura ve tahsilat ${billing.name} platformu üzerinden yürüyor. Kart bilgileriniz bize ulaşmıyor. Türkiye'de birkaç müşteriden sonra şirketleşme planımız var; o geçiş mevcut sözleşmeleri etkilemeyecek.`,
  },
  {
    q: "Aylık ücreti neye ödüyorum?",
    a: "Sunucu ve izlemeye, yedeklemeye, reklam platformlarının API güncellemelerine, bağlantı kopmalarının giderilmesine, rapor üretimi ile e-posta gönderimine ve teknik desteğe. Google Ads API sürümleri yaklaşık bir yıl içinde kapanıyor; sistemin çalışmaya devam etmesi sürekli bakım gerektiriyor.",
  },
  {
    q: "Kaç müşteriyle başlayabilirim?",
    a: `Tek müşteriyle bile başlayabilirsiniz. Kurucu pilot paketi ${pilot.clients} aktif müşteri ve ${pilot.sources} veri kaynağına kadar; üstüne çıkarsanız müşteri başına ${tl(extraClientPrice.min)}–${tl(extraClientPrice.max)} aylık ek ücret. Ekip kullanıcı sayısında sınır yok.`,
  },
  {
    q: "Verilerime ne oluyor?",
    a: "Reklam hesaplarınıza yalnızca salt-okunur erişim isteriz. Veriyi üçüncü taraflarla paylaşmaz, model eğitiminde kullanmayız; bağlantıyı istediğiniz an koparabilirsiniz. Ayrıntısı Güvenlik ve Gizlilik Politikası sayfalarında.",
  },
  {
    q: "Kaç ajans alıyorsunuz?",
    a: `Kurucu pilot kontenjanı ${pilot.clients} ajans. Bunun sebebi her pilot ajansla doğrudan çalışmak istememiz — kurulumu biz yapıyoruz ve ayda bir görüşüyoruz. İlk ${pilot.clients} ajans ürünün yol haritasını da birlikte belirliyor: hangi entegrasyon ve hangi rapor tasarımı öncelikli, o ajanslarla kararlaştırılıyor. Kontenjan dolduğunda liste fiyatlarına geçilir.`,
  },
];

type Payload = {
  name: string;
  agency: string;
  email: string;
  clients: string;
  message: string;
};

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string; payload: Payload };

/** Gönderim başarısızsa hazır doldurulmuş e-posta — talep kaybolmasın. */
function mailtoFallback(p: Payload): string {
  const body = [
    `Ad soyad: ${p.name}`,
    `Ajans: ${p.agency}`,
    `E-posta: ${p.email}`,
    `Müşteri sayısı: ${p.clients}`,
    "",
    p.message,
  ].join("\n");
  return `mailto:${contact.email}?subject=${encodeURIComponent(
    `Demo talebi — ${p.agency}`,
  )}&body=${encodeURIComponent(body)}`;
}

export function Contact() {
  useSeo({
    title: "İletişim — Kurucu pilot programına başvurun | Ositend",
    description:
      "30 dakikalık demo için form doldurun ya da doğrudan arayın. Görüşmede kendi reklam hesaplarınızı bağlayıp ilk markalı raporunuzu canlı üretiyoruz.",
    path: "/iletisim",
  });

  const [status, setStatus] = useState<Status>({ kind: "idle" });

  /*
   * GERÇEK GÖNDERİM.
   *
   * Bu fonksiyon önceden şuydu:
   *   setStatus("sending");
   *   window.setTimeout(() => setStatus("sent"), 900);
   *
   * Yani form hiçbir yere gitmiyor, 900 ms sonra "ulaştı" diyordu. Site
   * canlı olduğu için doldurulan her talep kayboldu. Artık /api/iletisim
   * uç noktasına POST ediliyor (bkz. src/worker.ts) ve BAŞARI YALNIZCA
   * sunucu gerçekten gönderdiğini söylediğinde gösteriliyor.
   */
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Payload = {
      name: String(data.get("name") ?? ""),
      agency: String(data.get("agency") ?? ""),
      email: String(data.get("email") ?? ""),
      clients: String(data.get("clients") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...payload,
          // Bot tuzağı; gerçek kullanıcıda her zaman boş.
          website: String(data.get("website") ?? ""),
          newsletter: data.get("newsletter") === "on",
        }),
      });
      const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

      if (res.ok && body?.ok) {
        setStatus({ kind: "sent" });
        form.reset();
        return;
      }

      setStatus({
        kind: "error",
        payload,
        message:
          body?.error === "yapilandirilmamis"
            ? "Form şu anda gönderilemiyor — e-posta servisimiz henüz bağlı değil."
            : "Talebiniz gönderilemedi.",
      });
    } catch {
      setStatus({
        kind: "error",
        payload,
        message: "Talebiniz gönderilemedi — bağlantı kurulamadı.",
      });
    }
  };

  const field =
    "w-full rounded-lg border border-line bg-white px-3.5 py-3 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-muted-ink/60 focus:border-brand focus:ring-2 focus:ring-brand/15";
  const label = "block text-sm font-medium text-ink";

  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title={
          <>
            Bir sonraki raporu <span className="text-brand">birlikte</span> üretelim.
          </>
        }
        lede="Formu doldurun, 30 dakikalık bir demo planlayalım. Ya da doğrudan arayın — telefonu gerçekten biz açıyoruz."
      />

      <Section className="pb-20 sm:pb-28">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <Reveal>
            <div className="card p-6 sm:p-9">
              {status.kind === "sent" ? (
                <div className="py-6 text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-tint">
                    <Check className="size-5 text-brand" />
                  </div>
                  <h2 className="mt-6 text-2xl">Talebiniz bize ulaştı.</h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-ink">
                    Aynı iş günü içinde size dönüp uygun bir demo saati belirleyeceğiz. Acelesi varsa{" "}
                    <a href={contact.phoneHref} className="font-medium text-brand">
                      {contact.phone}
                    </a>{" "}
                    numarasından ulaşabilirsiniz.
                  </p>
                  <button
                    onClick={() => setStatus({ kind: "idle" })}
                    className="mt-7 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface"
                  >
                    Yeni bir talep gönder
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  {status.kind === "error" && (
                    <div className="rounded-lg border border-warning/40 bg-warning/10 p-4">
                      <p className="flex items-start gap-2.5 text-sm font-medium text-ink">
                        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                        {status.message}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-ink">
                        Talebinizi kaybetmeyelim: aşağıdaki bağlantı yazdıklarınızı hazır bir
                        e-postaya doldurur, ya da doğrudan{" "}
                        <a href={contact.phoneHref} className="tnum font-medium text-brand">
                          {contact.phone}
                        </a>{" "}
                        numarasını arayın.
                      </p>
                      <a
                        href={mailtoFallback(status.payload)}
                        className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white"
                      >
                        <Mail className="size-4" />
                        E-posta ile gönder
                      </a>
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={label}>
                        Ad soyad
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        className={`${field} mt-2`}
                        placeholder="Adınız ve soyadınız"
                      />
                    </div>
                    <div>
                      <label htmlFor="agency" className={label}>
                        Ajans adı
                      </label>
                      <input
                        id="agency"
                        name="agency"
                        required
                        autoComplete="organization"
                        className={`${field} mt-2`}
                        placeholder="Ajansınızın adı"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className={label}>
                        E-posta
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className={`${field} mt-2`}
                        placeholder="ad@ajansiniz.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="clients" className={label}>
                        Müşteri sayısı
                      </label>
                      <select
                        id="clients"
                        name="clients"
                        defaultValue=""
                        required
                        className={`${field} mt-2`}
                      >
                        <option value="" disabled>
                          Seçin
                        </option>
                        <option value="1-5">1 – 5</option>
                        <option value="6-15">6 – 15</option>
                        <option value="16-40">16 – 40</option>
                        <option value="40+">40+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={label}>
                      Mesajınız <span className="font-normal text-muted-ink">(opsiyonel)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className={`${field} mt-2 resize-y`}
                      placeholder="Şu anda raporlamayı nasıl yapıyorsunuz?"
                    />
                  </div>

                  {/*
                    Bot tuzağı. Ekran okuyucudan ve klavye sırasından da
                    çıkarılıyor; yalnızca formu körlemesine dolduran botlar
                    buraya yazar, sunucu da o istekleri sessizce eler.
                  */}
                  <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="website">Web siteniz</label>
                    <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  {/*
                    KVKK ayrımı bilinçli:
                    — Aydınlatma metnini okuduğunun teyidi ZORUNLU (m.10).
                    — Ticari elektronik ileti izni AYRI ve İSTEĞE BAĞLI.
                    İkisini tek kutuda birleştirmek, demo talebi için verilen
                    onayı pazarlama iznine dönüştürmek olurdu; 6563 sayılı
                    kanun bu izni ayrı ve açık istiyor.
                  */}
                  <div className="space-y-3 rounded-lg bg-surface p-4">
                    <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-ink">
                      <input
                        type="checkbox"
                        name="kvkk"
                        required
                        className="mt-0.5 size-4 shrink-0 accent-[var(--color-brand)]"
                      />
                      <span>
                        Kişisel verilerimin demo talebimin değerlendirilmesi amacıyla işlenmesine
                        ilişkin{" "}
                        <Link to="/kvkk-aydinlatma" className="font-medium text-brand underline">
                          KVKK Aydınlatma Metni
                        </Link>
                        &apos;ni okudum.
                      </span>
                    </label>
                    <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-ink">
                      <input
                        type="checkbox"
                        name="newsletter"
                        className="mt-0.5 size-4 shrink-0 accent-[var(--color-brand)]"
                      />
                      <span>
                        Ositend&apos;den ürün güncellemeleri ve kampanyalar hakkında e-posta almak
                        istiyorum. <span className="text-muted-ink/70">(isteğe bağlı)</span>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={status.kind === "sending"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-[background-color,transform] duration-200 ease-[var(--ease-out-soft)] hover:bg-brand-deep active:translate-y-px disabled:opacity-70"
                  >
                    {status.kind === "sending" && <Loader2 className="size-4 animate-spin" />}
                    {status.kind === "sending" ? "Gönderiliyor" : "Demo talebi gönder"}
                  </button>

                  <p className="text-xs leading-relaxed text-muted-ink">
                    Verdiğiniz bilgileri yalnızca bu talebi değerlendirmek ve size dönmek için
                    kullanırız; üçüncü taraflarla paylaşmayız. Ayrıntı için{" "}
                    <Link to="/gizlilik" className="underline">
                      Gizlilik Politikası
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card h-full p-6 sm:p-8">
              <Eyebrow>Doğrudan ulaşın</Eyebrow>
              <ul className="mt-6">
                {channels.map((c) => (
                  <li
                    key={c.label}
                    className="border-t border-line-soft py-5 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand">
                        <c.icon className="size-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-ink">{c.label}</p>
                        <a
                          href={c.href}
                          className="mt-1 block text-[0.9375rem] text-brand transition-colors hover:text-brand-deep"
                        >
                          {c.value}
                        </a>
                        <p className="mt-0.5 text-sm text-muted-ink">{c.note}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <div className="border-t border-line-soft bg-surface">
        <Section className="py-20 sm:py-28">
          <Reveal className="text-center">
            <Eyebrow>Sık sorulanlar</Eyebrow>
            <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(2rem,4.8vw,3.25rem)]">
              Demo öncesi merak edilenler.
            </h2>
          </Reveal>

          <dl className="mx-auto mt-12 max-w-3xl">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06}>
                <div className="grid gap-2 border-t border-line py-7 sm:grid-cols-[1fr_1.3fr] sm:gap-10">
                  <dt className="font-display text-lg font-medium">{f.q}</dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-muted-ink">{f.a}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Section>
      </div>
    </>
  );
}
