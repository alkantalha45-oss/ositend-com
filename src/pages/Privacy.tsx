import { Link } from "react-router-dom";
import { DataControllerBlock, H2, LI, LegalDoc, P, UL } from "../components/LegalDoc";
import { cerezTercihleriniAc } from "../components/CookieConsent";
import { useSeo } from "../lib/seo";
import { contact } from "../lib/site";

/*
 * Gizlilik Politikası.
 *
 * KVKK aydınlatma metniyle kasıtlı olarak AYRI: aydınlatma metni kanunun
 * saydığı unsurları maddeler hâlinde karşılıyor, bu metin ise günlük
 * soruların cevabı (çerez kullanıyor musunuz, veriyi eğitimde kullanıyor
 * musunuz, hesabımı silersem ne oluyor). İkisini tek metne sıkıştırmak,
 * ikisini de kötü yapıyordu.
 *
 * Google OAuth doğrulama süreci de erişilebilir bir gizlilik politikası
 * URL'i istiyor; Ads API başvurusunda verilecek adres burası.
 */

export function Privacy() {
  useSeo({
    title: "Gizlilik Politikası — Ositend",
    description:
      "Ositend hangi verileri topluyor, nerede saklıyor, kimlerle paylaşıyor ve ne kadar süreyle tutuyor. Reklam hesabı erişimi, çerezler ve veri silme talepleri.",
    path: "/gizlilik",
  });

  return (
    <LegalDoc
      title="Gizlilik Politikası"
      lede="Hangi veriyi neden topladığımızı, nerede tuttuğumuzu ve nasıl sildiğimizi sade bir dille anlatıyoruz. Hukuki karşılığı KVKK Aydınlatma Metni'ndedir."
    >
      <H2>Kim olduğumuz</H2>
      <P>
        Ositend, dijital pazarlama ajanslarının müşteri raporlamasını otomatikleştiren bir yazılım
        hizmetidir. Bu politika ositend.com sitesi ile Ositend panelini kapsar.
      </P>
      <DataControllerBlock />

      <H2>Kısaca: yapmadığımız şeyler</H2>
      <UL>
        <LI>Kişisel verinizi veya reklam verinizi satmıyoruz.</LI>
        <LI>Verinizi yapay zekâ modeli eğitmek için kullanmıyoruz.</LI>
        <LI>Reklam hesaplarınızda hiçbir değişiklik yapmıyoruz — erişimimiz salt-okunurdur.</LI>
        <LI>Reklam kişiselleştirme veya yeniden pazarlama çerezi çalıştırmıyoruz.</LI>
        <LI>
          Bir ajansın verisini başka bir ajansa göstermiyoruz; her hesabın verisi ayrı tutulur.
        </LI>
      </UL>

      <H2>Sitede toplanan veriler</H2>
      <P>
        Siteyi yalnızca gezdiğinizde bize kimliğinizi belirleyen bir veri gitmez. İki istisna
        vardır:
      </P>
      <UL>
        <LI>
          <strong>İletişim formu:</strong> yazdığınız bilgiler bize e-posta olarak iletilir. Spam
          filtrelemesi için gönderim anındaki IP adresi ve tarayıcı bilgisi de e-postaya eklenir.
        </LI>
        <LI>
          <strong>Analitik:</strong> Google Analytics yalnızca çerez bandında &quot;Kabul et&quot;
          derseniz çalışır. Varsayılan durum reddir ve izin verilmeden analitik çerez yazılmaz.
          Kararınızı istediğiniz an{" "}
          <button onClick={cerezTercihleriniAc} className="text-brand underline">
            çerez tercihlerinden
          </button>{" "}
          değiştirebilirsiniz.
        </LI>
      </UL>
      <P>
        Reklam depolama, reklam kullanıcı verisi ve reklam kişiselleştirme izinleri, siz kabul etseniz
        bile kapalı tutulur — bu verilere ihtiyacımız yok.
      </P>

      <H2>Reklam hesabı erişimi</H2>
      <P>
        Google Ads, Meta Ads veya Google Analytics hesabınızı bağladığınızda ilgili platformun kendi
        yetkilendirme ekranına yönlendirilirsiniz. Şifrenizi biz görmeyiz, saklamayız ve isteyemeyiz.
      </P>
      <UL>
        <LI>
          <strong>Yalnızca okuma:</strong> talep ettiğimiz izinler raporlanacak veriyi okumakla
          sınırlıdır. Kampanya, bütçe veya reklam üzerinde değişiklik yapma yetkisi istemiyoruz.
        </LI>
        <LI>
          <strong>Şifreli saklama:</strong> platformun verdiği erişim jetonları sunucumuzda
          şifrelenerek saklanır; günlüklere ve hata kayıtlarına yazılmaz.
        </LI>
        <LI>
          <strong>İstediğiniz an kesme:</strong> panelden bağlantıyı koparabilir veya erişimi
          doğrudan Google/Meta hesap ayarlarından iptal edebilirsiniz. Bağlantı koptuğunda jetonlar
          silinir.
        </LI>
      </UL>

      <H2>Müşteri portalı linkleri</H2>
      <P>
        Ajans, bir müşterisiyle canlı rapor linki paylaşabilir. Bu link tahmin edilmesi pratikte
        imkânsız rastgele bir kimlik taşır ve yalnızca o müşterinin verisini gösterir. Linki
        istediğiniz an panelden yenileyebilirsiniz; yenilendiğinde eski link geçersiz olur.
      </P>
      <P>
        <strong>Açıkça belirtelim:</strong> link şu anda süresizdir ve parola sormaz. Linke sahip
        olan herkes o raporu görebilir. Son kullanma tarihi, isteğe bağlı parola ve erişim kaydı yol
        haritamızda; hazır olana kadar linki yalnızca güvendiğiniz kişilerle paylaşın.
      </P>

      <H2>Verinin nerede tutulduğu</H2>
      <P>
        Site Cloudflare altyapısında yayınlanır. Rapor verisi ve hesap bilgileri, hizmet
        sağlayıcılarımızın Avrupa Birliği ve Amerika Birleşik Devletleri&apos;ndeki sunucularında
        işlenir. E-posta gönderimi Resend üzerinden yapılır. Bu aktarımların KVKK karşılığı{" "}
        <Link to="/kvkk-aydinlatma" className="text-brand underline">
          Aydınlatma Metni&apos;nin 6. maddesinde
        </Link>{" "}
        tablo hâlinde verilmiştir.
      </P>

      <H2>Saklama ve silme</H2>
      <P>
        Verileri yalnızca amacı için gereken süre boyunca tutarız. Süreler Aydınlatma Metni&apos;nin
        7. maddesinde listelenmiştir. Hesabınızı kapattığınızda:
      </P>
      <UL>
        <LI>Reklam platformu erişim jetonları derhal silinir.</LI>
        <LI>Rapor verisi ve yüklediğiniz marka varlıkları 30 gün içinde silinir.</LI>
        <LI>
          Fatura ve sözleşme kayıtları, vergi mevzuatı gereği yasal saklama süresi boyunca tutulur.
        </LI>
      </UL>
      <P>
        Daha erken silinmesini isterseniz{" "}
        <a href={`mailto:${contact.email}`} className="text-brand underline">
          {contact.email}
        </a>{" "}
        adresine yazmanız yeterli.
      </P>

      <H2>Çocukların verileri</H2>
      <P>
        Ositend işletmelere yönelik bir hizmettir; 18 yaşından küçüklere yönelik değildir ve bilerek
        onlara ait veri toplamayız.
      </P>

      <H2>Bu politikadaki değişiklikler</H2>
      <P>
        Politikayı güncellediğimizde bu sayfadaki &quot;son güncelleme&quot; tarihi değişir. Esaslı
        bir değişiklik olduğunda panel kullanıcılarını e-posta ile bilgilendiririz.
      </P>

      <H2>Sorularınız için</H2>
      <P>
        <a href={`mailto:${contact.email}`} className="text-brand underline">
          {contact.email}
        </a>{" "}
        · <span className="tnum">{contact.phone}</span> ({contact.hours})
      </P>
    </LegalDoc>
  );
}
