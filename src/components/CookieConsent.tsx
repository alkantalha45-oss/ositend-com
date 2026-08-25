import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";

/**
 * Çerez izni bandı — KVKK m.5 ve GDPR m.6/7 için.
 *
 * Sitedeki tek çerez kaynağı Google Analytics 4. Reklam depolaması index.html'de
 * zaten kalıcı olarak KAPALI; burada yönetilen tek şey `analytics_storage`.
 *
 * İzin ALINMADAN analytics çerezi yazılmaz: index.html Consent Mode varsayılanını
 * "denied" olarak kuruyor ve gtag'i `wait_for_update` ile bekletiyor. Ziyaretçi
 * "Kabul et" derse buradan `consent update` gönderiliyor.
 *
 * Reddetmek kabul etmek kadar kolay olmak ZORUNDA (CNIL/EDPB); iki düğme aynı
 * boyutta ve ikisi de ilk bakışta görünür. "Kapat" ile geçiştirme yok — karar
 * verilene kadar bant kalıyor, ama sayfayı da kilitlemiyor.
 */

const KEY = "ositend-cerez-izni";
const CHANGED = "ositend:cerez-izni-degisti";

type Karar = "kabul" | "ret";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Kayıtlı karar. Gizli sekmede localStorage erişimi patlayabilir — sessizce yok say. */
function kayitliKarar(): Karar | null {
  try {
    const ham = localStorage.getItem(KEY);
    if (!ham) return null;
    return ham.startsWith("kabul") ? "kabul" : "ret";
  } catch {
    return null;
  }
}

/**
 * Kararı yazar. Tarihi de saklıyoruz: KVKK'da izni ispat yükü veri sorumlusunda,
 * "kabul" tek başına ne zaman alındığını söylemiyor.
 */
function kararYaz(karar: Karar) {
  try {
    localStorage.setItem(KEY, `${karar}:${new Date().toISOString()}`);
  } catch {
    /* depolama kapalıysa karar yalnızca bu oturum için geçerli olur */
  }
}

/** Footer'daki "Çerez tercihleri" bağlantısı bandı yeniden açmak için bunu çağırır. */
export function cerezTercihleriniAc() {
  window.dispatchEvent(new CustomEvent(CHANGED));
}

export function CookieConsent() {
  // Karar ilk render'da okunuyor: effect'ten sonra göstermek bandın bir kare
  // gecikmeyle "zıplamasına" yol açıyordu.
  const [gorunur, setGorunur] = useState(() => kayitliKarar() === null);
  const azHareket = useReducedMotion();

  useEffect(() => {
    const yenidenAc = () => setGorunur(true);
    window.addEventListener(CHANGED, yenidenAc);
    return () => window.removeEventListener(CHANGED, yenidenAc);
  }, []);

  if (!gorunur) return null;

  const karar = (secim: Karar) => {
    kararYaz(secim);
    // Consent Mode güncellemesi: yalnızca analytics. Reklam alanları index.html'de
    // "denied" ve öyle kalıyor — kullanıcı kabul etse bile reklam çerezi yazmıyoruz.
    window.gtag?.("consent", "update", {
      analytics_storage: secim === "kabul" ? "granted" : "denied",
    });
    setGorunur(false);
  };

  return (
    <motion.div
      role="region"
      aria-label="Çerez izni"
      initial={azHareket ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-5 sm:pb-5"
    >
      <div className="mx-auto flex max-w-[820px] flex-col gap-4 rounded-2xl border border-line-soft bg-white/90 p-5 shadow-[0_18px_50px_-18px_rgba(16,20,40,0.35)] backdrop-blur-[28px] backdrop-saturate-200 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <p className="text-[0.875rem] leading-relaxed text-muted-ink">
          <span className="font-medium text-ink">Çerezler.</span> Siteyi nasıl kullandığınızı
          anlamak için Google Analytics kullanıyoruz. Reklam ya da profilleme çerezi
          kullanmıyoruz. Reddederseniz yalnızca sitenin çalışması için gerekenler kalır —{" "}
          <Link to="/iletisim" className="underline underline-offset-4 hover:text-ink">
            sorularınız için bize yazın
          </Link>
          .
        </p>

        <div className="flex shrink-0 gap-2.5">
          <button
            onClick={() => karar("ret")}
            className="flex-1 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface sm:flex-none"
          >
            Reddet
          </button>
          <button
            onClick={() => karar("kabul")}
            className="flex-1 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-deep sm:flex-none"
          >
            Kabul et
          </button>
        </div>
      </div>
    </motion.div>
  );
}
