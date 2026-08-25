import { useEffect } from "react";
import { siteUrl } from "./site";

/*
 * Rota başına başlık / açıklama / canonical.
 *
 * Site bir SPA: dört rotanın dördü de index.html'deki tek <title> ve tek
 * açıklamayla servis ediliyordu. Arama sonucunda dört sayfa da aynı
 * görünüyor, canonical hiç yok, sosyal paylaşımda hepsi aynı kartı
 * gösteriyordu.
 *
 * SINIR — BİLEREK KABUL EDİLDİ: bu hook etiketleri JavaScript çalıştıktan
 * SONRA yazıyor. Googlebot sayfayı render ettiği için arama tarafında sorun
 * yok. Ama sosyal medya kartı üreticileri (LinkedIn, WhatsApp, X) JS
 * çalıştırmıyor; onlar index.html'deki VARSAYILAN og etiketlerini görür.
 * Yani her URL için doğru arama sonucu, ana sayfa kartıyla paylaşım.
 * Rota başına doğru paylaşım kartı istendiğinde çözüm prerender/SSR;
 * o iş bu turun kapsamı dışında bırakıldı.
 */

type Seo = {
  title: string;
  description: string;
  /** Kök göreli yol, ör. "/hizmetler". Canonical bunun üzerine kurulur. */
  path: string;
  /** 404 gibi dizine girmemesi gereken sayfalar için. */
  noindex?: boolean;
};

/** İsimli meta etiketini bulur, yoksa oluşturur; sonra içeriğini yazar. */
function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeo({ title, description, path, noindex = false }: Seo) {
  useEffect(() => {
    const url = `${siteUrl}${path}`;

    document.title = title;
    setMeta("name", "description", description);

    // Canonical: Cloudflare hem ositend.com hem www.ositend.com'a yanıt
    // veriyor ve SPA olduğu için her yol aynı HTML'i döndürüyor. Canonical
    // olmadan bu, aynı içeriğin çok sayıda adreste kopyalanması demek.
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;

    /*
     * robots etiketi yalnızca gerektiğinde EKLENİYOR ve rotadan çıkarken
     * KALDIRILIYOR. Kalıcı bırakılsaydı, 404'ten ana sayfaya geçen bir
     * ziyaretçinin oturumunda ana sayfa da noindex görünürdü — ve bu tam
     * olarak arama motoru render'ının gördüğü durum olabilir.
     */
    const robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (noindex) {
      setMeta("name", "robots", "noindex, follow");
    } else if (robots) {
      robots.remove();
    }

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
  }, [title, description, path, noindex]);
}
