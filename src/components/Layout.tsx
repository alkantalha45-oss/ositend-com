import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { CloudField } from "./CloudField";
import { CookieConsent, cerezTercihleriniAc } from "./CookieConsent";

const nav = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/hizmetler", label: "Hizmetler" },
  { to: "/hakkimizda", label: "Hakkımızda" },
  { to: "/iletisim", label: "İletişim" },
];

/**
 * Panelin herkese açık adresi. Panel henüz deploy edilmediği için
 * varsayılan olarak BOŞ — bu durumda "Panele giriş" bağlantısı hiç
 * render edilmez.
 *
 * Daha önce buraya "http://localhost:8080" sabitlenmişti; site yayına
 * çıkınca bu bağlantı ziyaretçinin KENDİ bilgisayarına gitmeye çalışıyor
 * ve kırık görünüyordu. Panel yayına alındığında .env içine
 * VITE_PANEL_URL=https://panel.ositend.com yazmak yeterli.
 */
const PANEL_URL: string = import.meta.env["VITE_PANEL_URL"] ?? "";

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
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="bg-ink px-4 py-2.5 text-center text-[0.8125rem] text-white/85">
        Ağustos raporlama döngüsü başladı —{" "}
        <Link to="/iletisim" className="font-medium text-white underline underline-offset-4">
          ilk raporunuzu bu hafta kurun
        </Link>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/50 bg-white/55 backdrop-blur-[28px] backdrop-saturate-200">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <Wordmark />

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-2 text-sm transition-colors duration-200 ${
                    isActive ? "text-ink" : "text-muted-ink hover:text-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {PANEL_URL && (
              <a
                href={PANEL_URL}
                className="rounded-lg px-3.5 py-2 text-sm text-muted-ink transition-colors hover:text-ink"
              >
                Panele giriş
              </a>
            )}
            <Link
              to="/iletisim"
              className="group inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-ink"
            >
              Demo alın
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
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-white md:hidden">
          <nav className="flex-1 px-5 pt-2">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `block border-b border-line-soft py-4 text-lg ${
                    isActive ? "font-medium text-ink" : "text-muted-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="space-y-3 border-t border-line-soft px-5 py-5">
            <Link
              to="/iletisim"
              className="flex items-center justify-center gap-2 rounded-lg bg-brand py-3.5 text-[0.9375rem] font-medium text-white"
            >
              Demo alın
              <ArrowRight className="size-4" />
            </Link>
            {PANEL_URL && (
              <a
                href={PANEL_URL}
                className="flex items-center justify-center rounded-lg border border-line py-3.5 text-[0.9375rem] font-medium text-ink"
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
      { label: "İletişim", to: "/iletisim" },
      { label: "Demo talebi", to: "/iletisim" },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-line-soft bg-surface">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-10 py-14 md:grid-cols-[1.6fr_1fr_1fr_1.2fr] md:gap-8 md:py-16">
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
                  href="mailto:info@ositend.com"
                  className="inline-block py-2.5 transition-colors hover:text-ink"
                >
                  info@ositend.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+905522500545"
                  className="tnum inline-block py-2.5 transition-colors hover:text-ink"
                >
                  +90 552 250 05 45
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
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    // NOT: burada bg-white YOK — zemin body'de. Sarmalayıcıya arka plan
    // verilirse -z-10 katmanındaki dokular tamamen görünmez oluyor.
    <div className="min-h-screen">
      <CloudField />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
