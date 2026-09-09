import { Link } from "react-router-dom";
import { DataControllerBlock, H2, LI, LegalDoc, P, TableWrap, UL } from "../components/LegalDoc";
import { useSeo } from "../lib/seo";
import { billing, contact } from "../lib/site";

/*
 * Veri İşleme Sözleşmesi (DPA).
 *
 * Ajansların satın alma sürecinde en sık istediği belge bu: kendi
 * müşterilerinin verisini bir yazılıma verirken, veri sorumlusu sıfatı
 * kendilerinde kaldığı için tedarikçiden yazılı taahhüt almak zorundalar.
 * Belge olmadığında satış, hukuk onayında takılıyor.
 *
 * Alt işleyen tablosu gerçek tedarikçi listesiyle aynı olmalı; KVKK
 * aydınlatma metnindeki aktarım tablosuyla tutarlı tutuldu.
 */

const subprocessors = [
  { who: billing.name, what: billing.what, where: billing.where },
  { who: "Cloudflare, Inc.", what: "Barındırma, CDN ve güvenlik katmanı", where: "ABD / küresel" },
  { who: "Vercel, Inc.", what: "Panel uygulamasının çalıştırılması", where: "AB / ABD" },
  { who: "Resend, Inc.", what: "İşlemsel e-posta gönderimi", where: "ABD" },
  {
    who: "Google Ireland Ltd.",
    what: "Google Ads ve Analytics API'lerinden veri okuma",
    where: "AB / ABD",
  },
  { who: "Meta Platforms Ireland Ltd.", what: "Meta Ads API'sinden veri okuma", where: "AB / ABD" },
  { who: "TikTok Pte. Ltd.", what: "TikTok Ads API'sinden veri okuma", where: "Singapur" },
];

export function Dpa() {
  useSeo({
    title: "Veri İşleme Sözleşmesi — Ositend",
    description:
      "Ajans (veri sorumlusu) ile Ositend (veri işleyen) arasındaki KVKK ve GDPR uyumlu veri işleme koşulları: işleme kapsamı, alt işleyenler, güvenlik tedbirleri ve ihlal bildirimi.",
    path: "/veri-isleme-sozlesmesi",
  });

  return (
    <LegalDoc
      title="Veri İşleme Sözleşmesi"
      lede="Ajans'ın kendi müşterilerine ait kişisel verileri Ositend üzerinden işlemesi hâlinde tarafların yükümlülükleri. Kullanım Koşulları'nın ayrılmaz parçasıdır."
    >
      <H2>1. Taraflar ve sıfatlar</H2>
      <P>
        Ajans, kendi müşterilerine ait kişisel veriler bakımından <strong>veri sorumlusu</strong>;
        Ositend ise bu verileri yalnızca Ajans&apos;ın talimatı doğrultusunda işleyen{" "}
        <strong>veri işleyen</strong> sıfatını taşır. Ositend, kendi web sitesi ziyaretçileri ve
        panel kullanıcıları bakımından ise veri sorumlusudur.
      </P>
      <DataControllerBlock />

      <H2>2. İşlemenin konusu ve süresi</H2>
      <UL>
        <LI>
          <strong>Konu:</strong> Ajans&apos;ın bağladığı reklam ve analitik hesaplarından okunan
          verinin rapora dönüştürülmesi, saklanması ve Ajans&apos;ın belirlediği alıcılara
          iletilmesi.
        </LI>
        <LI>
          <strong>Süre:</strong> Ajans&apos;ın aboneliği boyunca; sona ermesinden sonra Gizlilik
          Politikası&apos;nda belirtilen silme süreleriyle sınırlı olarak.
        </LI>
        <LI>
          <strong>Veri kategorileri:</strong> ağırlıklı olarak kişisel veri niteliği taşımayan toplu
          kampanya ve performans metrikleri; ayrıca Ajans&apos;ın müşteri kaydına girdiği iletişim
          kişisi adı ve e-posta adresi.
        </LI>
        <LI>
          <strong>İlgili kişi grupları:</strong> Ajans&apos;ın müşterilerinin yetkilileri ve rapor
          alıcıları.
        </LI>
      </UL>
      <P>
        Ositend, reklam platformlarından son kullanıcı düzeyinde kişisel veri (kişi listeleri,
        e-posta eşleştirme kitleleri, çerez kimlikleri) çekmez ve bu tür verileri talep eden izinleri
        istemez.
      </P>

      <H2>3. Ositend&apos;in yükümlülükleri</H2>
      <UL>
        <LI>Kişisel verileri yalnızca Ajans&apos;ın talimatı ve bu sözleşme kapsamında işlemek</LI>
        <LI>Veriye erişimi, işin gerektirdiği personelle sınırlamak ve gizlilik yükümlülüğüne bağlamak</LI>
        <LI>4. maddedeki teknik ve idari tedbirleri uygulamak</LI>
        <LI>
          İlgili kişilerden gelen talepleri doğrudan yanıtlamamak; Ajans&apos;a yönlendirmek ve
          Ajans&apos;ın yanıt verebilmesi için makul desteği sağlamak
        </LI>
        <LI>Talep hâlinde uyumluluğu göstermek için gerekli bilgileri sunmak</LI>
        <LI>Sözleşme sonunda verileri silmek veya Ajans&apos;a iade etmek</LI>
      </UL>

      <H2>4. Teknik ve idari tedbirler</H2>
      <UL>
        <LI>Tüm trafiğin aktarım sırasında TLS ile şifrelenmesi</LI>
        <LI>
          Reklam platformu erişim jetonlarının, uygulama seviyesinde şifrelenerek (AES-256-GCM)
          saklanması ve günlüklere yazılmaması
        </LI>
        <LI>Panelde rol tabanlı erişim; salt-okunur kullanıcı rolü</LI>
        <LI>Her ajansın verisinin mantıksal olarak ayrılması</LI>
        <LI>Düzenli yedekleme ve yedeklerin şifreli tutulması</LI>
        <LI>Reklam hesaplarına yalnızca okuma izniyle bağlanılması</LI>
      </UL>
      <P>
        Tedbirlerin ayrıntısı{" "}
        <Link to="/guvenlik" className="text-brand underline">
          Güvenlik
        </Link>{" "}
        sayfasında, hazır olmayan kontroller de dâhil olmak üzere açıkça listelenmiştir.
      </P>

      <H2>5. Alt işleyenler</H2>
      <P>
        Ajans, hizmetin sunulabilmesi için aşağıdaki alt işleyenlerin kullanılmasına onay verir.
        Listeye yeni bir alt işleyen eklenmeden önce Ajans en az 30 gün önceden bilgilendirilir ve
        haklı gerekçeyle itiraz edebilir.
      </P>
      <TableWrap>
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="py-3 pr-4 font-medium text-ink">Alt işleyen</th>
              <th className="py-3 pr-4 font-medium text-ink">İşlev</th>
              <th className="py-3 font-medium text-ink">Konum</th>
            </tr>
          </thead>
          <tbody>
            {subprocessors.map((s) => (
              <tr key={s.who} className="border-b border-line-soft align-top">
                <td className="py-3 pr-4 text-ink">{s.who}</td>
                <td className="py-3 pr-4 text-muted-ink">{s.what}</td>
                <td className="py-3 text-muted-ink">{s.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>

      <H2>6. Yurt dışına aktarım</H2>
      <P>
        Alt işleyenlerin sunucuları Türkiye dışında bulunduğundan aktarım, KVKK m.9 ve GDPR Bölüm V
        kapsamındadır. Aktarımlar, ilgili sağlayıcılarla akdedilen standart sözleşme hükümleri ve
        eşdeğer güvenceler çerçevesinde yapılır.
      </P>

      <H2>7. İhlal bildirimi</H2>
      <P>
        Kişisel veri ihlali tespit edilmesi hâlinde Ositend, durumu öğrendikten sonra{" "}
        <strong>gecikmeksizin ve en geç 24 saat içinde</strong> Ajans&apos;a bildirir. Bildirim;
        ihlalin niteliğini, etkilenen veri kategorilerini, tahmini etkiyi ve alınan tedbirleri
        içerir. Kurul&apos;a ve ilgili kişilere bildirim yükümlülüğü, veri sorumlusu sıfatıyla
        Ajans&apos;a aittir; Ositend gerekli bilgi ve desteği sağlar.
      </P>

      <H2>8. Denetim</H2>
      <P>
        Ajans, yılda bir kez ve makul bir bildirim süresiyle, bu sözleşmeye uyumu denetleyebilir.
        Denetim öncelikle Ositend&apos;in sunacağı bilgi ve belgeler üzerinden yürütülür; yerinde
        denetim gerekmesi hâlinde taraflar kapsam ve zamanlama üzerinde önceden mutabık kalır.
      </P>

      <H2>9. Sözleşmenin sona ermesi</H2>
      <P>
        Abonelik sona erdiğinde Ositend, Ajans&apos;ın tercihine göre verileri siler veya iade eder.
        Mevzuatın saklanmasını zorunlu kıldığı veriler, saklama süresi boyunca yalnızca bu amaçla ve
        erişimi kısıtlanmış şekilde tutulur.
      </P>

      <H2>10. Yürürlük</H2>
      <P>
        Bu sözleşme, Ajans&apos;ın Ositend hesabını kullanmaya başlamasıyla yürürlüğe girer. Islak
        veya elektronik imzalı bir nüsha isterseniz{" "}
        <a href={`mailto:${contact.email}`} className="text-brand underline">
          {contact.email}
        </a>{" "}
        adresine yazın, hazırlayıp gönderelim.
      </P>
    </LegalDoc>
  );
}
