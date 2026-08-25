/*
 * Cloudflare Worker — statik varlıklar + iletişim formu uç noktası.
 *
 * NEDEN VAR: Contact.tsx formu, gönderildiğinde 900 ms bekleyip
 * "Talebiniz bize ulaştı" yazıyordu. Hiçbir yere istek gitmiyordu. Site
 * canlı olduğu için bugüne kadar doldurulan her demo talebi kayboldu ve
 * gönderen kişi yanıt beklemeye devam etti. Bu, sitedeki en pahalı hataydı.
 *
 * TASARIM KURALI: bu uç nokta ASLA gönderemediği bir mesaj için başarı
 * dönmez. E-posta anahtarı tanımlı değilse veya sağlayıcı hata verirse
 * hatayı olduğu gibi döner; arayüz de kullanıcıyı doğrudan e-posta/telefona
 * yönlendirir. Sessizce yutulan bir hata, en baştaki sahte başarının aynısı
 * olurdu.
 */

type Env = {
  /** Statik varlık binding'i — wrangler.jsonc içinde tanımlı. */
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  /** `npx wrangler secret put RESEND_API_KEY` ile tanımlanır. */
  RESEND_API_KEY?: string;
  /** Formun düşeceği kutu. Tanımsızsa info@ositend.com. */
  CONTACT_TO?: string;
  /** Gönderen adresi — Resend'de DOĞRULANMIŞ bir alan adı olmalı. */
  CONTACT_FROM?: string;
};

const MAX = { name: 120, agency: 160, email: 254, clients: 20, message: 4000 } as const;

type Submission = {
  name: string;
  agency: string;
  email: string;
  clients: string;
  message: string;
  /** Bot tuzağı — insanlar bu alanı göremez, dolu gelirse istek sessizce yutulur. */
  website?: string;
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

/** Basit alan doğrulama. Hata mesajı Türkçe döner, doğrudan kullanıcıya gösterilir. */
function validate(data: Partial<Submission>): { ok: true; value: Submission } | { ok: false; error: string } {
  const trim = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const value: Submission = {
    name: trim(data.name),
    agency: trim(data.agency),
    email: trim(data.email),
    clients: trim(data.clients),
    message: trim(data.message),
    website: trim(data.website),
  };

  if (!value.name || !value.agency || !value.email || !value.clients) {
    return { ok: false, error: "Zorunlu alanlar eksik." };
  }
  // Kasıtlı olarak gevşek: e-postanın gerçekten teslim edilip edilmeyeceğini
  // regex bilemez. Amaç yalnızca kaba yazım hatalarını yakalamak.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
    return { ok: false, error: "E-posta adresi geçerli görünmüyor." };
  }
  for (const [key, limit] of Object.entries(MAX)) {
    if (value[key as keyof typeof MAX].length > limit) {
      return { ok: false, error: "Gönderdiğiniz metin fazla uzun." };
    }
  }
  return { ok: true, value };
}

function renderEmail(v: Submission, meta: { ip: string; ua: string }): string {
  return [
    `Ad soyad   : ${v.name}`,
    `Ajans      : ${v.agency}`,
    `E-posta    : ${v.email}`,
    `Müşteri    : ${v.clients}`,
    "",
    "Mesaj:",
    v.message || "(boş)",
    "",
    "—",
    `Gönderim   : ${new Date().toISOString()}`,
    `IP         : ${meta.ip}`,
    `Tarayıcı   : ${meta.ua}`,
  ].join("\n");
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return json({ ok: false, error: "Yalnızca POST." }, 405);
  }

  let payload: Partial<Submission>;
  try {
    payload = (await request.json()) as Partial<Submission>;
  } catch {
    return json({ ok: false, error: "İstek okunamadı." }, 400);
  }

  const result = validate(payload);
  if (!result.ok) return json({ ok: false, error: result.error }, 400);
  const v = result.value;

  // Tuzak alan doluysa bot: gönderene başarı gösteriyoruz ki hangi alanın
  // tuzak olduğunu deneyerek bulamasın, ama e-posta göndermiyoruz.
  if (v.website) return json({ ok: true }, 200);

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    // Kritik: burada `ok: true` dönmek, düzeltmek için uğraştığımız hatanın
    // sunucu tarafında yeniden üretilmesi olurdu.
    console.error("İletişim formu: RESEND_API_KEY tanımlı değil, mesaj gönderilemedi.");
    return json({ ok: false, error: "yapilandirilmamis" }, 503);
  }

  const body = renderEmail(v, {
    ip: request.headers.get("cf-connecting-ip") ?? "bilinmiyor",
    ua: request.headers.get("user-agent") ?? "bilinmiyor",
  });

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM ?? "Ositend Site <site@ositend.com>",
        to: [env.CONTACT_TO ?? "info@ositend.com"],
        // Yanıtla dendiğinde doğrudan başvurana gitsin.
        reply_to: v.email,
        subject: `Demo talebi — ${v.agency} (${v.name})`,
        text: body,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error(`Resend hata verdi (${res.status}): ${detail}`);
      return json({ ok: false, error: "gonderilemedi" }, 502);
    }
  } catch (error) {
    console.error("Resend isteği başarısız:", error);
    return json({ ok: false, error: "gonderilemedi" }, 502);
  }

  return json({ ok: true }, 200);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/iletisim") {
      return handleContact(request, env);
    }
    // Diğer her şey statik varlık katmanına gider; bulunamayan yollar
    // wrangler.jsonc'taki single-page-application kuralıyla index.html'e düşer.
    return env.ASSETS.fetch(request);
  },
};
