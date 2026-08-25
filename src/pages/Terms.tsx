import { Link } from "react-router-dom";
import { DataControllerBlock, H2, LI, LegalDoc, P, UL } from "../components/LegalDoc";
import { useSeo } from "../lib/seo";
import { annualDiscount, contact, extraClientPrice, pilot, tl } from "../lib/site";

/*
 * Kullanım Koşulları.
 *
 * Fiyat ve kapsam maddeleri src/lib/site.ts'ten okunuyor — sözleşme
 * metninin fiyatlandırma sayfasından farklı bir rakam söylemesi, hukuki
 * metinlerde yapılabilecek en kötü hatalardan biri.
 *
 * "Sınırsız destek" taahhüdünden kaçınmak bilinçli: abonelik neyi kapsıyor
 * ve neyi kapsamıyor, 5. ve 6. maddede açıkça ayrılmış durumda.
 */

export function Terms() {
  useSeo({
    title: "Kullanım Koşulları — Ositend",
    description:
      "Ositend hizmetinin kapsamı, abonelik ve ücretlendirme, tarafların yükümlülükleri, hizmet seviyesi, fesih ve sorumluluk sınırlarına ilişkin koşullar.",
    path: "/kosullar",
  });

  return (
    <LegalDoc
      title="Kullanım Koşulları"
      lede="Ositend'i kullanan ajans ile Ositend arasındaki ilişkinin çerçevesi. Ayrı bir hizmet sözleşmesi imzalanması hâlinde o sözleşme hükümleri önce gelir."
    >
      <H2>1. Taraflar</H2>
      <P>
        Bu koşullar, aşağıda künyesi verilen hizmet sağlayıcı ile Ositend hesabı açan veya hizmeti
        kullanan gerçek/tüzel kişi (&quot;Ajans&quot;) arasında geçerlidir.
      </P>
      <DataControllerBlock />

      <H2>2. Hizmetin tanımı</H2>
      <P>
        Ositend; Ajans&apos;ın bağladığı reklam ve analitik hesaplarından salt-okunur veri çekerek
        Ajans&apos;ın markasıyla periyodik raporlar üreten, bu raporları PDF ve paylaşılabilir canlı
        link olarak sunan, eşik aşımlarında uyarı üreten bir yazılım hizmetidir.
      </P>
      <P>
        Ositend bir reklam ajansı değildir; kampanya yönetmez, reklam performansı taahhüt etmez ve
        rapordaki verilere dayanarak alınan ticari kararlardan sorumlu değildir. Veriler ilgili
        reklam platformlarının API&apos;lerinden geldiği gibi aktarılır.
      </P>

      <H2>3. Hesap ve erişim</H2>
      <UL>
        <LI>
          Ajans, hesabına tanımlı kullanıcıların işlemlerinden ve giriş bilgilerinin gizliliğinden
          sorumludur.
        </LI>
        <LI>
          Ajans, bağladığı reklam hesapları üzerinde yetkili olduğunu ve müşterilerinin verisini
          Ositend&apos;e işletme hakkına sahip olduğunu beyan eder.
        </LI>
        <LI>
          Hizmetin tersine mühendisliği, otomatik araçlarla kötüye kullanımı veya üçüncü kişilere
          yeniden satılması yazılı izin olmadan yapılamaz.
        </LI>
      </UL>

      <H2>4. Ücretlendirme</H2>
      <P>Kurucu pilot programı koşulları:</P>
      <UL>
        <LI>
          Tek seferlik kurulum ücreti <strong>{tl(pilot.setup)}</strong> (hesap bağlama, marka
          tanımı ve şablon hazırlığını kapsar).
        </LI>
        <LI>
          Aylık platform aboneliği <strong>{tl(pilot.monthly)}</strong>; {pilot.clients} aktif
          müşteri ve {pilot.sources} veri kaynağına kadar.
        </LI>
        <LI>
          Paket limitini aşan her aktif müşteri için aylık {tl(extraClientPrice.min)}–
          {tl(extraClientPrice.max)} ek ücret uygulanır.
        </LI>
        <LI>
          Asgari kullanım süresi <strong>{pilot.commitmentMonths} ay</strong>&apos;dır; sonrasında
          abonelik aylık olarak devam eder.
        </LI>
        <LI>
          Pilot fiyatı, sözleşme tarihinden itibaren <strong>{pilot.priceLockMonths} ay</strong>{" "}
          boyunca artırılmaz.
        </LI>
        <LI>
          Yıllık peşin ödemede %{annualDiscount.min}–{annualDiscount.max} indirim uygulanabilir.
        </LI>
        <LI>Tüm bedeller KDV hariçtir. Faturalar aylık düzenlenir.</LI>
      </UL>
      <P>
        Ödemenin vadesinde yapılmaması hâlinde, yazılı bildirim ve makul bir ek süre sonrasında
        hizmet askıya alınabilir.
      </P>

      <H2>5. Aboneliğin kapsamı</H2>
      <P>Aylık abonelik bedeli şunları kapsar:</P>
      <UL>
        <LI>Sunucu, altyapı, izleme ve düzenli yedekleme</LI>
        <LI>
          Reklam platformlarının API sürüm değişikliklerine uyum — bu güncellemeler zorunludur ve
          Ositend tarafından yapılır
        </LI>
        <LI>Bağlantı kopmalarının giderilmesi ve hata düzeltmeleri</LI>
        <LI>Rapor üretimi, PDF çıktısı ve e-posta gönderimi</LI>
        <LI>İş günleri içinde standart teknik destek</LI>
      </UL>

      <H2>6. Abonelik kapsamı dışındaki işler</H2>
      <P>
        Aşağıdaki talepler ayrıca fiyatlandırılır ve tarafların yazılı mutabakatıyla yapılır:
      </P>
      <UL>
        <LI>Yol haritasında bulunmayan yeni bir platform entegrasyonu</LI>
        <LI>Ajansa veya tek bir müşteriye özel KPI/metrik tanımı</LI>
        <LI>Standart şablonlar dışında özel rapor tasarımı</LI>
        <LI>Veri taşıma, toplu içe aktarma ve özel eğitim/danışmanlık</LI>
      </UL>

      <H2>7. Hizmet sürekliliği</H2>
      <P>
        Hizmeti kesintisiz sunmayı hedefleriz ancak bu aşamada sayısal bir çalışma süresi (uptime)
        taahhüdü vermiyoruz — veremeyeceğimiz bir taahhüdü sözleşmeye yazmaktansa bunu açıkça
        belirtmeyi tercih ediyoruz. Planlı bakımları önceden duyururuz. Reklam platformlarının
        API&apos;lerinde yaşanan kesinti veya kota kısıtlarından kaynaklanan gecikmeler Ositend&apos;in
        kontrolü dışındadır.
      </P>

      <H2>8. Fikri mülkiyet</H2>
      <P>
        Yazılım, arayüz ve şablonlara ilişkin haklar Ositend&apos;e aittir. Ajans&apos;ın yüklediği
        logo, renk, metin ve müşteri verisi Ajans&apos;a aittir; Ositend bunları yalnızca hizmeti
        sunmak için kullanır. Ositend, Ajans&apos;ın adını veya logosunu referans olarak yalnızca
        yazılı onay alarak yayınlar.
      </P>

      <H2>9. Fesih</H2>
      <UL>
        <LI>
          Asgari {pilot.commitmentMonths} aylık süre dolduktan sonra Ajans, dönem sonundan en az 15
          gün önce bildirerek aboneliği sonlandırabilir.
        </LI>
        <LI>
          Fesih hâlinde ödenmiş kurulum ücreti iade edilmez; kullanılmamış abonelik dönemleri
          faturalanmaz.
        </LI>
        <LI>
          Fesihten sonra veriler{" "}
          <Link to="/gizlilik" className="text-brand underline">
            Gizlilik Politikası
          </Link>
          &apos;nda belirtilen süreler içinde silinir. Talep hâlinde, silme öncesinde raporlarınızın
          bir kopyasını size sunarız.
        </LI>
      </UL>

      <H2>10. Sorumluluğun sınırı</H2>
      <P>
        Ositend&apos;in bir zarardan doğan toplam sorumluluğu, zararın doğduğu tarihten önceki 12 ay
        içinde Ajans tarafından ödenen bedelle sınırlıdır. Dolaylı zararlar, kâr kaybı ve veri
        kaybından doğan dolaylı sonuçlardan sorumluluk kabul edilmez. Bu sınırlar, kasıt veya ağır
        kusur hâllerinde uygulanmaz.
      </P>

      <H2>11. Kişisel verilerin korunması</H2>
      <P>
        Ajans&apos;ın müşterilerine ait kişisel veriler bakımından Ajans veri sorumlusu, Ositend veri
        işleyen sıfatını taşır. Tarafların bu kapsamdaki yükümlülükleri{" "}
        <Link to="/veri-isleme-sozlesmesi" className="text-brand underline">
          Veri İşleme Sözleşmesi
        </Link>
        &apos;nde düzenlenmiştir ve bu koşulların ayrılmaz parçasıdır.
      </P>

      <H2>12. Değişiklikler ve uygulanacak hukuk</H2>
      <P>
        Koşullarda yapılacak esaslı değişiklikler yürürlüğe girmeden en az 30 gün önce e-posta ile
        bildirilir; Ajans bu süre içinde aboneliği sonlandırabilir. Bu koşullara Türkiye Cumhuriyeti
        hukuku uygulanır ve İstanbul mahkemeleri ile icra daireleri yetkilidir.
      </P>

      <H2>13. İletişim</H2>
      <P>
        <a href={`mailto:${contact.email}`} className="text-brand underline">
          {contact.email}
        </a>{" "}
        · <span className="tnum">{contact.phone}</span> ({contact.hours})
      </P>
    </LegalDoc>
  );
}
