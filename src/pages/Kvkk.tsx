import { Link } from "react-router-dom";
import { DataControllerBlock, H2, LI, LegalDoc, P, TableWrap, UL } from "../components/LegalDoc";
import { useSeo } from "../lib/seo";
import { billing, contact } from "../lib/site";

/*
 * KVKK m.10 aydınlatma metni.
 *
 * İletişim formunun altındaki iki cümlelik not ("verilerinizi üçüncü
 * taraflarla paylaşmıyoruz") aydınlatma yükümlülüğünü karşılamıyordu.
 * Kanun açıkça altı unsuru istiyor: veri sorumlusunun kimliği, işlenen
 * veriler, işleme amacı, hukuki sebep, aktarım (varsa yurt dışı) ve
 * ilgili kişinin m.11 hakları. Altısı da aşağıda ayrı başlık.
 *
 * Ayrıca demo talebi ile pazarlama izni AYRI tutuluyor: birincisi meşru
 * menfaate/sözleşme öncesi görüşmeye dayanıyor ve rıza gerektirmiyor,
 * ikincisi 6563 sayılı kanun kapsamında ayrı açık rıza istiyor.
 *
 * NOT: bu metin bir avukat tarafından gözden geçirilmelidir; teknik
 * gerçekliği doğru anlatıyor ama hukuki denetimin yerini tutmaz.
 */

const transfers = [
  {
    who: `${billing.name} (${billing.url.replace("https://", "")})`,
    what: billing.what,
    where: billing.where,
  },
  {
    who: "Cloudflare, Inc.",
    what: "Site barındırma, alan adı ve güvenlik",
    where: "ABD / küresel uç sunucular",
  },
  {
    who: "Google Ireland Ltd. (Google Analytics)",
    what: "Site kullanım istatistikleri — yalnızca çerez izni verilirse",
    where: "AB / ABD",
  },
  {
    who: "Resend, Inc.",
    what: "Form ve bildirim e-postalarının iletilmesi",
    where: "ABD",
  },
  {
    who: "Google LLC / Meta Platforms",
    what: "Yalnızca reklam hesabınızı bağladığınızda, raporlanacak verinin okunması",
    where: "AB / ABD",
  },
];

export function Kvkk() {
  useSeo({
    title: "KVKK Aydınlatma Metni — Ositend",
    description:
      "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Ositend'in veri sorumlusu sıfatıyla yaptığı aydınlatma: işlenen veriler, amaçlar, hukuki sebepler, aktarımlar ve haklarınız.",
    path: "/kvkk-aydinlatma",
  });

  return (
    <LegalDoc
      title="KVKK Aydınlatma Metni"
      lede="6698 sayılı Kişisel Verilerin Korunması Kanunu'nun 10. maddesi uyarınca, kişisel verilerinizi hangi amaçla ve hangi hukuki sebeple işlediğimizi açıklıyoruz."
    >
      <H2>1. Veri sorumlusunun kimliği</H2>
      <P>
        Kişisel verileriniz, aşağıda künyesi verilen veri sorumlusu tarafından işlenmektedir.
      </P>
      <DataControllerBlock />

      <H2>2. İşlenen kişisel veriler</H2>
      <P>Sizinle kurduğumuz ilişkinin türüne göre şu veriler işlenir:</P>
      <UL>
        <LI>
          <strong>Demo/iletişim formunu doldurduğunuzda:</strong> ad soyad, ajans adı, e-posta
          adresi, yönettiğiniz müşteri sayısı aralığı, formda yazdığınız mesaj; ayrıca talebin
          gönderildiği IP adresi, tarayıcı bilgisi ve gönderim zamanı.
        </LI>
        <LI>
          <strong>Hizmeti satın aldığınızda:</strong> sözleşme ve fatura için gereken ad/unvan,
          adres, vergi bilgisi ve ödeme kayıtları. Bu süreç {billing.name} üzerinden yürütülür ve
          ödeme kartı bilgileriniz bize hiçbir aşamada ulaşmaz.
        </LI>
        <LI>
          <strong>Panel kullanıcısı olduğunuzda:</strong> hesap e-posta adresi, rol bilgisi, oturum
          kayıtları ve panelde yaptığınız işlemlere ilişkin teknik kayıtlar.
        </LI>
        <LI>
          <strong>Reklam hesaplarınızı bağladığınızda:</strong> ilgili platformun size verdiği
          yetkilendirme jetonları ile hesap ve kampanya kimlikleri. Bu jetonlar sunucumuzda
          şifrelenerek saklanır.
        </LI>
        <LI>
          <strong>Siteyi ziyaret ettiğinizde:</strong> yalnızca çerez izni verirseniz, Google
          Analytics aracılığıyla toplanan sayfa görüntüleme ve oturum verileri. İzin vermezseniz
          analitik çerez yazılmaz.
        </LI>
      </UL>
      <P>
        Özel nitelikli kişisel veri (sağlık, biyometri, din, üyelik vb.) talep etmiyoruz ve
        işlemiyoruz. Formda bu tür bilgiler paylaşmamanızı rica ederiz.
      </P>

      <H2>3. İşleme amaçları</H2>
      <UL>
        <LI>Demo ve bilgi taleplerinizi değerlendirmek, size geri dönmek</LI>
        <LI>Sözleşme öncesi görüşmeleri yürütmek, teklif hazırlamak</LI>
        <LI>Hizmeti sunmak: rapor üretmek, uyarı ve özet e-postalarını göndermek</LI>
        <LI>Teknik destek sağlamak, hata ve bağlantı sorunlarını gidermek</LI>
        <LI>Sistem güvenliğini sağlamak, kötüye kullanımı ve bot trafiğini engellemek</LI>
        <LI>Yalnızca ayrıca izin vermeniz hâlinde, ürün güncellemeleri ve tanıtım göndermek</LI>
      </UL>

      <H2>4. Hukuki sebepler</H2>
      <UL>
        <LI>
          <strong>Sözleşmenin kurulması veya ifası (m.5/2-c):</strong> demo talebiniz üzerine
          sizinle iletişime geçilmesi, hizmetin sunulması ve faturalandırma.
        </LI>
        <LI>
          <strong>Hukuki yükümlülük (m.5/2-ç):</strong> vergi ve ticaret mevzuatı kapsamında
          belgelerin saklanması.
        </LI>
        <LI>
          <strong>Meşru menfaat (m.5/2-f):</strong> sistem güvenliği, kötüye kullanımın önlenmesi ve
          hizmet kalitesinin iyileştirilmesi.
        </LI>
        <LI>
          <strong>Açık rıza (m.5/1):</strong> yalnızca analitik çerezler ve ticari elektronik ileti
          gönderimi için alınır; ikisini de vermeden hizmeti kullanabilirsiniz ve ikisini de
          istediğiniz an geri çekebilirsiniz.
        </LI>
      </UL>

      <H2>5. Toplama yöntemi</H2>
      <P>
        Veriler; site üzerindeki formlar, panel arayüzü, e-posta ve telefon görüşmeleri ile —
        izniniz varsa — çerezler aracılığıyla elektronik ortamda toplanır.
      </P>

      <H2>6. Aktarım ve yurt dışına aktarım</H2>
      <P>
        Kişisel verilerinizi satmıyoruz ve pazarlama amacıyla üçüncü taraflara devretmiyoruz.
        Hizmetin çalışması için aşağıdaki tedarikçileri kullanıyoruz; bu tedarikçilerin sunucuları
        yurt dışında bulunduğundan aktarım KVKK m.9 kapsamındadır ve bu metinle bilginize sunulur.
      </P>
      <TableWrap>
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="py-3 pr-4 font-medium text-ink">Alıcı</th>
              <th className="py-3 pr-4 font-medium text-ink">Amaç</th>
              <th className="py-3 font-medium text-ink">Konum</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((t) => (
              <tr key={t.who} className="border-b border-line-soft align-top">
                <td className="py-3 pr-4 text-ink">{t.who}</td>
                <td className="py-3 pr-4 text-muted-ink">{t.what}</td>
                <td className="py-3 text-muted-ink">{t.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
      <P>
        Faturalama ve tahsilat, serbest çalışan olarak hizmet verdiğimiz için {billing.name}{" "}
        platformu üzerinden yapılır; sözleşme ve fatura süreçlerinde paylaştığınız bilgiler bu
        platformda da işlenir. {billing.name}&apos;un tabi olduğu tüzel kişilik ve veri işleme
        koşulları{" "}
        <a href={billing.url} target="_blank" rel="noreferrer" className="text-brand underline">
          {billing.url.replace("https://", "")}
        </a>{" "}
        üzerindeki kendi sözleşmelerinde yer alır.
      </P>
      <P>
        Ayrıca yetkili kamu kurum ve kuruluşlarına, yalnızca mevzuatın zorunlu kıldığı hâllerde ve
        talep edilen kapsamla sınırlı olarak aktarım yapılabilir.
      </P>

      <H2>7. Saklama süresi</H2>
      <UL>
        <LI>
          Sonuçlanmayan demo/iletişim talepleri: son yazışmadan itibaren <strong>2 yıl</strong>.
        </LI>
        <LI>
          Müşteri ilişkisine dönüşen kayıtlar: sözleşme süresince ve sona ermesinden itibaren{" "}
          <strong>10 yıl</strong> (Türk Ticaret Kanunu ve Vergi Usul Kanunu saklama süreleri).
        </LI>
        <LI>
          Reklam platformu yetkilendirme jetonları: bağlantıyı kopardığınız anda{" "}
          <strong>silinir</strong>.
        </LI>
        <LI>
          Analitik veriler: Google Analytics üzerinde <strong>14 ay</strong>.
        </LI>
      </UL>
      <P>
        Süre dolduğunda veriler silinir, yok edilir veya anonim hâle getirilir.
      </P>

      <H2>8. Haklarınız (KVKK m.11)</H2>
      <P>Veri sorumlusuna başvurarak şu haklarınızı kullanabilirsiniz:</P>
      <UL>
        <LI>Kişisel verinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme</LI>
        <LI>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</LI>
        <LI>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</LI>
        <LI>Eksik veya yanlış işlenmişse düzeltilmesini isteme</LI>
        <LI>Kanundaki şartlar çerçevesinde silinmesini veya yok edilmesini isteme</LI>
        <LI>Düzeltme, silme ve yok etme işlemlerinin aktarılan üçüncü kişilere bildirilmesini isteme</LI>
        <LI>
          Münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonuç doğmasına
          itiraz etme
        </LI>
        <LI>Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</LI>
      </UL>

      <H2>9. Başvuru yolu</H2>
      <P>
        Başvurunuzu{" "}
        <a href={`mailto:${contact.email}`} className="text-brand underline">
          {contact.email}
        </a>{" "}
        adresine iletebilir veya yukarıdaki adrese yazılı olarak gönderebilirsiniz. Başvurunuz en geç{" "}
        <strong>30 gün</strong> içinde sonuçlandırılır. Kimliğinizi doğrulayamadığımız başvurularda
        ek bilgi isteyebiliriz. Talebinizin reddi veya süresinde yanıt alamamanız hâlinde Kişisel
        Verileri Koruma Kurulu&apos;na şikâyette bulunma hakkınız saklıdır.
      </P>

      <H2>10. İlgili diğer metinler</H2>
      <P>
        Verinin teknik olarak nasıl korunduğu{" "}
        <Link to="/guvenlik" className="text-brand underline">
          Güvenlik
        </Link>{" "}
        sayfasında, genel veri uygulamaları{" "}
        <Link to="/gizlilik" className="text-brand underline">
          Gizlilik Politikası
        </Link>
        &apos;nda, ajans müşterilerinin verisine ilişkin taraf yükümlülükleri{" "}
        <Link to="/veri-isleme-sozlesmesi" className="text-brand underline">
          Veri İşleme Sözleşmesi
        </Link>
        &apos;nde açıklanmıştır.
      </P>
    </LegalDoc>
  );
}
