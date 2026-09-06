import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { CloudField } from "./CloudField";
import { CookieConsent, cerezTercihleriniAc } from "./CookieConsent";
import { contact, panelUrl } from "../lib/site";

/*
 * Panora'nın üst menüsü sayfa içi bağlantılardan kuruluyor (Özellikler,
 * Canlı dene, Nasıl çalışır, Fiyatlar) çünkü tek sayfalık bir site. Bizim
 * sitemiz çok sayfalı, o yüzden bu dört madde ana sayfadaki bölümlere
 * `#çapa` ile gidiyor — Layout aşağıdaki hash-kaydırma efektiyle bunu
 * her sayfadan çalıştırıyor. Hizmetler/Hakkımızda/İletişim üst menüden
 * kalktı ama alt bilgide (Footer) ve CTA butonlarında duruyor.
 */
const nav = [
  { to: "/#ozellikler", label: "Özellikler" },
  { to: "/#canli-dene", label: "Canlı dene" },
  { to: "/#nasil-calisir", label: "Nasıl çalışır" },
  { to: "/#fiyatlar", label: "Fiyatlar" },
];



/** Ositend işareti — iki üst üste binen daireden (XOR) doğan yaprak/göz formu, kasıtlı olarak bulanıklaştırılmış. */
function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden focusable="false">
      <defs>
        <filter id="ositend-logo-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6.5" />
        </filter>
      </defs>
      <path
        fillRule="evenodd"
        d="M11 50 A30 30 0 1 0 71 50 A30 30 0 1 0 11 50 Z M29 50 A30 30 0 1 0 89 50 A30 30 0 1 0 29 50 Z"
        fill="currentColor"
        filter="url(#ositend-logo-blur)"
      />
    </svg>
  );
}

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-3.5 ${className}`} aria-label="Ositend — Ana sayfa">
      <LogoMark className="size-10 shrink-0 text-ink" />
      <span className="font-display text-[1.0625rem] font-semibold tracking-tight text-ink">
        Ositend
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/*
        Önceki metin "Ağustos raporlama döngüsü başladı — ilk raporunuzu bu
        hafta kurun" idi: sabit yazılmış bir ay adı, yani eylülde yanlış
        olacak uydurma bir aciliyet. Yerine gerçekten doğru olan ve gerçekten
        acil olan şey yazıldı: kontenjanlı bir pilot program.
      */}
      {pathname !== "/" && <div className="bg-ink px-4 py-2.5 text-center text-[0.8125rem] text-white/85">
        Kurucu pilot programı açık —{" "}
        <Link to="/iletisim" className="font-medium text-white underline underline-offset-4">
          ilk beş ajans arasına katılın
        </Link>
      </div>}

      <header className="sticky top-0 z-50 border-b border-white/50 bg-white/55 backdrop-blur-[28px] backdrop-saturate-200">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <Wordmark />

          {/*
            Sayfa içi çapa bağlantıları — NavLink DEĞİL, düz Link. NavLink'in
            "aktif" karşılaştırması pathname üzerinden çalışıyor ve dördü de
            "/" sayfasına gittiği için hepsi aynı anda "aktif" görünürdü.
          */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-3.5 py-2 text-sm text-muted-ink transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {panelUrl && (
              <a
                href={panelUrl}
                className="rounded-lg px-3.5 py-2 text-sm text-muted-ink transition-colors hover:text-ink"
              >
                Panele giriş
              </a>
            )}
            <Link
              to="/#canli-dene"
              className="group inline-flex items-center gap-1.5 rounded-full bg-brand px-4.5 py-2.5 text-sm font-medium text-white shadow-[0_1px_2px_oklch(0.2_0.01_265/0.12),0_8px_20px_-10px_oklch(0.55_0.212_258/0.55)] transition-[background-color,transform] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:bg-brand-deep active:translate-y-px"
            >
              Paneli keşfedin
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="-mr-2.5 rounded-lg p-2.5 text-ink md:hidden"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {open && (
        <div className={`${pathname === "/" ? "astra-mobile-menu" : ""} fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-white md:hidden`}>
          <nav className="flex-1 px-5 pt-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block border-b border-line-soft py-4 text-lg text-muted-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="space-y-3 border-t border-line-soft px-5 py-5">
            <Link
              to="/#canli-dene"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-[0.9375rem] font-medium text-white"
            >
              Paneli keşfedin
              <ArrowRight className="size-4" />
            </Link>
            {panelUrl && (
              <a
                href={panelUrl}
                className="flex items-center justify-center rounded-full border border-line py-3.5 text-[0.9375rem] font-medium text-ink"
              >
                Panele giriş
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const footerCols = [
  {
    title: "Ürün",
    links: [
      { label: "Hizmetler", to: "/hizmetler" },
      { label: "Otomatik raporlama", to: "/hizmetler" },
      { label: "Canlı müşteri portalı", to: "/hizmetler" },
      { label: "Anomali uyarıları", to: "/hizmetler" },
    ],
  },
  {
    title: "Şirket",
    links: [
      { label: "Hakkımızda", to: "/hakkimizda" },
      { label: "Güvenlik", to: "/guvenlik" },
      { label: "İletişim", to: "/iletisim" },
    ],
  },
  {
    title: "Yasal",
    links: [
      { label: "Gizlilik Politikası", to: "/gizlilik" },
      { label: "KVKK Aydınlatma Metni", to: "/kvkk-aydinlatma" },
      { label: "Kullanım Koşulları", to: "/kosullar" },
      { label: "Veri İşleme Sözleşmesi", to: "/veri-isleme-sozlesmesi" },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-line-soft bg-surface">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1.2fr_1fr] md:gap-8 md:py-16">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-ink">
              Dijital pazarlama ajansları için otomatik müşteri raporlaması. Hesaplarınızı bir kez
              bağlayın, raporu her ay biz üretelim.
            </p>
          </div>

          {footerCols.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-medium text-ink">{col.title}</p>
              <ul className="mt-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="inline-block py-2.5 text-muted-ink transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-sm font-medium text-ink">İletişim</p>
            <ul className="mt-2 text-sm text-muted-ink">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-block py-2.5 transition-colors hover:text-ink"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.phoneHref}
                  className="tnum inline-block py-2.5 transition-colors hover:text-ink"
                >
                  {contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line-soft py-6 text-[0.8125rem] text-muted-ink sm:flex-row sm:items-center sm:justify-between">
          <p className="tnum">© 2026 Ositend. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4">
            {/* İzin, verildiği kadar kolay geri alınabilmeli — bandı buradan yeniden açıyoruz. */}
            <button
              onClick={cerezTercihleriniAc}
              className="transition-colors hover:text-ink"
            >
              Çerez tercihleri
            </button>
            <p>İstanbul'da geliştirildi.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Layout() {
  const { pathname, hash } = useLocation();
  /*
   * Üst menüdeki dört madde artık `/#ozellikler` gibi çapa bağlantıları
   * (bkz. Layout.tsx nav dizisi). Bu efekt eskiden her sayfa geçişinde
   * koşulsuz en üste kaydırıyordu — hash varken de öyle yapsaydı, tıklanan
   * bağlantı hiç işe yaramazdı. Hash varsa o elemana kaydırıyoruz, yoksa
   * eskisi gibi en üste.
   */
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      el?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    // NOT: burada bg-white YOK — zemin body'de. Sarmalayıcıya arka plan
    // verilirse -z-10 katmanındaki dokular tamamen görünmez oluyor.
    <div className={`min-h-screen ${pathname === "/" ? "astra-layout" : ""}`}>
      {pathname !== "/" && <CloudField />}
      <a className="a-skip-link" href="#main-content">İçeriğe geç</a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
