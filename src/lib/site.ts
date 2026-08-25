/*
 * Sitenin tek gerçeklik kaynağı: künye, fiyat, dış bağlantılar.
 *
 * Bu dosya bilinçli olarak tek bir yerde topluyor — fiyatlar daha önce
 * Pricing.tsx içinde, iletişim bilgileri Layout ve Contact içinde ayrı ayrı
 * duruyordu; fiyat değiştiğinde SSS cevabı eski fiyatı anlatmaya devam
 * ediyordu. Bir sayı iki yerde yazılıysa er ya da geç ikisi ayrışır.
 */

/* ------------------------------------------------------------------ *
 * KÜNYE
 *
 * ŞU AN TÜZEL KİŞİLİK YOK. Hizmet, gerçek kişi olarak serbest çalışan
 * sıfatıyla veriliyor; tahsilat ve faturalama Ruul (ruul.io) üzerinden
 * yapılıyor. Bu, hukuki metinlerde uydurulacak bir şey değil — KVKK m.10
 * "veri sorumlusunun kimliği"ni istiyor ve gerçek kişide bu kimlik, ticaret
 * unvanı değil kişinin adı ile iletişim bilgisidir.
 *
 * Türkiye'de 2-3 müşteri sonrası İngiltere üzerinden şirket kurulması
 * planlanıyor. O gün geldiğinde burası ticaret unvanı + sicil numarası ile
 * güncellenecek; hukuki sayfaların tamamı bu dosyadan okuduğu için başka
 * hiçbir yeri değiştirmeye gerek kalmayacak.
 * ------------------------------------------------------------------ */
export const legalEntity = {
  /** Veri sorumlusu — gerçek kişi. */
  name: "Talha Alkan",
  status: "Serbest çalışan (gerçek kişi), Türkiye",
  /**
   * Tebligata elverişli açık adres. BOŞ bırakılabilir: gerçek kişide
   * kimliği ad + iletişim kanalı karşılıyor. Doldurulursa künye tablosunda
   * kendiliğinden görünür.
   */
  address: "",
} as const;

/**
 * Tahsilat ve faturalama aracısı.
 *
 * Ruul, serbest çalışan adına sözleşme ve fatura düzenleyip ödemeyi tahsil
 * ediyor. Yani müşterinin fatura/ödeme bilgileri Ruul üzerinden geçiyor —
 * bu bir veri aktarımı ve hukuki metinlerde açıkça yazılması gerekiyor.
 *
 * NOT: Ruul'un tabi olduğu tüzel kişilik ve ülke, kendi sözleşmelerinde
 * yer alıyor; buraya doğrulamadan bir ülke adı yazmıyoruz.
 */
export const billing = {
  name: "Ruul",
  url: "https://ruul.io",
  what: "Sözleşme, fatura ve ödeme tahsilatı",
  where: "Yurt dışı",
} as const;

export const contact = {
  email: "info@ositend.com",
  phone: "+90 552 250 05 45",
  phoneHref: "tel:+905522500545",
  hours: "Hafta içi 09:00 – 18:00",
} as const;

export const siteUrl = "https://ositend.com";

/* ------------------------------------------------------------------ *
 * DIŞ BAĞLANTILAR
 * ------------------------------------------------------------------ */

/**
 * Gerçek rezervasyon sayfası (Cal.com / Calendly / Google Randevu Takvimi).
 *
 * Buraya bir şey yazılana kadar site randevu BUTONU GÖSTERMEZ. Önceki hali
 * Google Takvim'in "etkinlik oluştur" şablonuna ve zoom.us/meeting/schedule
 * adresine gidiyordu: ikisi de ziyaretçinin kendi takviminde bir kayıt
 * açıyordu, bize hiçbir davet gelmiyordu. Çalışmayan bir randevu butonu,
 * hiç buton olmamasından daha çok güven kaybettirir.
 */
export const bookingUrl: string = import.meta.env["VITE_BOOKING_URL"] ?? "";

/**
 * Panelin herkese açık adresi. Panel deploy edilene kadar boş; boşken
 * "Panele giriş" bağlantısı hiç render edilmiyor.
 */
export const panelUrl: string = import.meta.env["VITE_PANEL_URL"] ?? "";

/* ------------------------------------------------------------------ *
 * FİYATLANDIRMA
 *
 * Tek seferlik 5.999 TL modeli kaldırıldı. Ürün teslim edilip unutulacak
 * bir yazılım değil: sunucu, zamanlanmış görevler, PDF üretimi, e-posta
 * gönderimi ve OAuth bağlantıları sürekli çalışıyor. Google Ads API
 * sürümleri yaklaşık bir yıl içinde kapanıyor ve her kapanış zorunlu
 * geliştirme demek. Tek seferlik ücret bu maliyeti karşılamıyordu.
 * ------------------------------------------------------------------ */

/** Yıllık peşin ödeme indirimi (yüzde). */
export const ANNUAL_DISCOUNT = 20;

export type BillingCycle = "monthly" | "yearly";

export const pilot = {
  setup: 9900,
  monthly: 4900,
  clients: 5,
  sources: 15,
  templates: 1,
  /** Asgari ücretli pilot süresi (ay). */
  commitmentMonths: 3,
  /** Pilot fiyatının sabit kalacağı süre (ay). */
  priceLockMonths: 12,
} as const;

/**
 * Pilot sonrası planlanan liste fiyatları. Sitede AÇIKÇA "planlanan" diye
 * etiketleniyor — henüz bu paketlerle satış yapılmıyor ve satılmayan bir
 * paketi satılıyormuş gibi göstermek, kaldırdığımız sahte sosyal kanıtla
 * aynı hatanın fiyat tarafındaki hali olurdu.
 */
export const plannedPlans = [
  { name: "Stüdyo", clients: 5, monthly: 5900 },
  { name: "Ajans", clients: 15, monthly: 11900 },
  { name: "Ölçek", clients: 30, monthly: 19900 },
] as const;

/** Paket limitini aşan her müşteri için ek ücret aralığı. */
export const extraClientPrice = { min: 750, max: 1000 } as const;

/**
 * Yıllık peşin ödemede aylık karşılık.
 *
 * Ekranda gösterilen sayı DAİMA aylık karşılıktır; yıllık toplam ayrıca
 * yazılır. İki paketi "biri aylık biri yıllık" fiyatla yan yana koymak,
 * karşılaştırmayı imkânsız hale getiren klasik fiyat sayfası hatası.
 */
export function monthlyFor(monthly: number, cycle: BillingCycle): number {
  return cycle === "yearly" ? Math.round((monthly * (100 - ANNUAL_DISCOUNT)) / 100) : monthly;
}

/** Yıllık peşin ödemede bir yılda ödenecek toplam. */
export function yearlyTotal(monthly: number): number {
  return monthlyFor(monthly, "yearly") * 12;
}

export const tl = (n: number) => `₺${n.toLocaleString("tr-TR")}`;
