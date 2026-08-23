import { useState, type FormEvent } from "react";
import { Check, Loader2, Mail, Phone } from "lucide-react";
import { Eyebrow, PageHero, Reveal, Section } from "../components/bits";

const channels = [
  {
    icon: Mail,
    label: "E-posta",
    value: "info@ositend.com",
    href: "mailto:info@ositend.com",
    note: "Aynı iş günü içinde yanıtlıyoruz",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+90 552 250 05 45",
    href: "tel:+905522500545",
    note: "Hafta içi 09:00 – 18:00",
  },
];

const faqs = [
  {
    q: "Demo ne kadar sürüyor?",
    a: "Yaklaşık 30 dakika. Kendi reklam hesaplarınızı bağlayıp ilk markalı raporunuzu görüşme sırasında canlı üretiyoruz.",
  },
  {
    q: "Sözleşme veya taahhüt var mı?",
    a: "Yok. Aylık ödeme yaparsınız, istediğiniz ay bırakırsınız. İlk 14 gün ücretsizdir ve kredi kartı istemiyoruz.",
  },
  {
    q: "Kaç müşteriden başlayabilirim?",
    a: "Tek müşteriyle bile başlayabilirsiniz. Fiyat müşteri başınadır, ekip kullanıcı sayısı sınırsızdır.",
  },
  {
    q: "Verilerime ne oluyor?",
    a: "Reklam hesaplarınıza yalnızca salt-okunur erişim isteriz. Veriyi üçüncü taraflarla paylaşmaz, model eğitiminde kullanmayız; bağlantıyı istediğiniz an koparabilirsiniz.",
  },
];

type Status = "idle" | "sending" | "sent";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 900);
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
              {status === "sent" ? (
                <div className="py-6 text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-tint">
                    <Check className="size-5 text-brand" />
                  </div>
                  <h2 className="mt-6 text-2xl">Talebiniz bize ulaştı.</h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-ink">
                    Aynı iş günü içinde size dönüp uygun bir demo saati belirleyeceğiz. Acelesi varsa{" "}
                    <a href="tel:+905522500545" className="font-medium text-brand">
                      +90 552 250 05 45
                    </a>{" "}
                    numarasından ulaşabilirsiniz.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-7 rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface"
                  >
                    Yeni bir talep gönder
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={label}>
                        Ad soyad
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        className={`${field} mt-2`}
                        placeholder="Selin Aydın"
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
                        className={`${field} mt-2`}
                        placeholder="Formet Dijital"
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
                        className={`${field} mt-2`}
                        placeholder="selin@formetdijital.com"
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

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-colors duration-200 hover:bg-brand-ink disabled:opacity-70"
                  >
                    {status === "sending" && <Loader2 className="size-4 animate-spin" />}
                    {status === "sending" ? "Gönderiliyor" : "Demo talebi gönder"}
                  </button>

                  <p className="text-xs leading-relaxed text-muted-ink">
                    Formu göndererek yalnızca bu talep için sizinle iletişime geçmemize izin
                    verirsiniz. Verilerinizi üçüncü taraflarla paylaşmıyoruz.
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
                  <li key={c.label} className="border-t border-line-soft py-5 first:border-t-0 first:pt-0">
                    <div className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand">
                        <c.icon className="size-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-ink">{c.label}</p>
                        {c.href ? (
                          <a
                            href={c.href}
                            className="mt-1 block text-[0.9375rem] text-brand transition-colors hover:text-brand-ink"
                          >
                            {c.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-[0.9375rem] text-ink">{c.value}</p>
                        )}
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
            <h2 className="mx-auto mt-6 max-w-2xl text-[clamp(1.875rem,4.4vw,2.875rem)]">
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
