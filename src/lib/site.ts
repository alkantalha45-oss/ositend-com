/*
 * Sitenin tek gerçeklik kaynağı: künye, fiyat, dış bağlantılar.
 *
 * Bu dosya bilinçli olarak tek bir yerde topluyor — fiyatlar daha önce
 * Pricing.tsx içinde, iletişim bilgileri Layout ve Contact içinde ayrı ayrı
 * duruyordu; fiyat değiştiğinde SSS cevabı eski fiyatı anlatmaya devam
 * ediyordu. Bir sayı iki yerde yazılıysa er ya da geç ikisi ayrışır.
 */

/* ------------------------------------------------------------------ *
 * KÜNYE — YAYINA ALMADAN ÖNCE DOLDURULMASI ZORUNLU
 *
 * KVKK m.10 aydınlatma yükümlülüğü "veri sorumlusunun kimliği"ni açıkça
 * istiyor; e-posta adresi tek başına bunu karşılamıyor. Aşağıdaki üç alan
 * TODO olduğu sürece hukuki sayfalar eksik sayılır ve bu sayfalarda
 * ziyaretçiye görünür bir uyarı çıkar (bkz. src/pages/Legal.tsx).
 * ------------------------------------------------------------------ */
export const legalEntity = {
  /** Ticaret sicilindeki tam unvan, ör. "Ositend Yazılım Anonim Şirketi". */
  title: "TODO_TICARI_UNVAN",
  /** Tebligata elverişli açık adres. */
  address: "TODO_ACIK_ADRES",
  /** MERSİS numarası veya şahıs şirketiyse vergi kimlik numarası. */
  registryNo: "TODO_MERSIS_VEYA_VKN",
} as const;

/** Künye tamam mı — hukuki sayfalar bunu kontrol edip uyarı basıyor. */
export const legalEntityReady = !Object.values(legalEntity).some((v) =>
  v.startsWith("TODO_"),
);

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

/** Yıllık peşin ödeme indirimi (yüzde). */
export const annualDiscount = { min: 15, max: 20 } as const;

export const tl = (n: number) => `₺${n.toLocaleString("tr-TR")}`;
