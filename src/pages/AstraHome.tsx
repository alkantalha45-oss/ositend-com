import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  CircleHelp,
  FileText,
  Layers,
  LayoutDashboard,
  Link2,
  LockKeyhole,
  MousePointer2,
  Plus,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { ANNUAL_DISCOUNT, monthlyFor, panelUrl, pilot, tl, yearlyTotal } from "../lib/site";
import { useSeo } from "../lib/seo";
import "./astra.css";

const channels = [
  {
    name: "Google Ads",
    short: "G",
    spend: 61200,
    revenue: 312800,
    conversions: 812,
    color: "#2668e8",
  },
  {
    name: "Meta Ads",
    short: "∞",
    spend: 78400,
    revenue: 289200,
    conversions: 824,
    color: "#99baff",
  },
];
const format = (n: number) => n.toLocaleString("tr-TR");

function Dashboard() {
  const [channel, setChannel] = useState("all");
  const [period, setPeriod] = useState("30");
  const selected = channel === "all" ? channels : channels.filter((c) => c.name === channel);
  const ratio = period === "7" ? 0.25 : 1;
  const spend = Math.round(selected.reduce((sum, c) => sum + c.spend, 0) * ratio);
  const revenue = Math.round(selected.reduce((sum, c) => sum + c.revenue, 0) * ratio);
  const conversions = Math.round(selected.reduce((sum, c) => sum + c.conversions, 0) * ratio);
  const roas = (revenue / spend).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const line =
    channel === "Meta Ads"
      ? "M0 119 C28 115 33 146 60 137 S100 85 130 102 S173 68 205 87 S249 93 280 65 S322 92 350 58 S395 74 425 41 S470 65 500 29 S555 45 600 15"
      : channel === "Google Ads"
        ? "M0 143 C30 145 39 103 65 110 S105 126 135 91 S175 106 210 67 S250 98 285 63 S327 49 360 69 S399 42 430 52 S477 10 505 26 S550 19 600 4"
        : "M0 145 C25 142 38 128 65 133 S102 87 133 101 S171 69 205 86 S242 94 275 61 S317 78 350 54 S390 66 425 33 S473 49 502 21 S550 30 600 4";
  return (
    <div className="a-product" id="canli-dene">
      <div className="a-windowbar">
        <span>
          <i />
          <i />
          <i />
        </span>
        <span>
          <LockKeyhole size={11} /> app.ositend.com / genel-bakis
        </span>
        <span className="a-sample">
          <i /> Örnek veri
        </span>
      </div>
      <div className="a-app">
        <aside className="a-sidebar" aria-label="Önizleme bölümleri">
          <div className="a-workspace">
            <span className="a-workspace-icon">o.</span>
            <div>
              Stüdyo Ajans<small>Ajans çalışma alanı</small>
            </div>
            <ChevronDown size={14} />
          </div>
          <p>ÇALIŞMA ALANI</p>
          <span className="a-sidebar-active">
            <LayoutDashboard /> Genel bakış
          </span>
          <a href="#ozellikler">
            <Users /> Müşteriler <small>5</small>
          </a>
          <a href="#raporlar">
            <FileText /> Raporlar
          </a>
          <a href="#uyarilar">
            <Bell /> Uyarılar <i />
          </a>
          <a href="#nasil-calisir">
            <Link2 /> Bağlantılar
          </a>
          <div className="a-sidebar-bottom">
            <span className="a-mini-avatar">SA</span>
            <div>
              Stüdyo Ajans<small>Kurucu pilot</small>
            </div>
            <Settings2 size={15} />
          </div>
        </aside>
        <div className="a-app-main">
          <div className="a-app-toolbar">
            <span>
              Çalışma alanı <span>/</span> <b>Genel bakış</b>
            </span>
            <span>
              <span className="a-live-dot" /> Demo görünümü <CircleHelp size={15} />
            </span>
          </div>
          <div className="a-app-content">
            <div className="a-dashboard-heading">
              <div>
                <p>DAHA AZ OPERASYON. DAHA NET KARARLAR.</p>
                <h2>Her şey yolunda, kontrol sizde.</h2>
              </div>
              <label className="a-date">
                <CalendarDays size={14} />
                <select
                  aria-label="Rapor dönemi"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value="30">Son 30 gün</option>
                  <option value="7">Son 7 gün</option>
                </select>
              </label>
            </div>
            <div className="a-channel-tabs" aria-label="Rapor kanalı">
              {["all", ...channels.map((c) => c.name)].map((c) => (
                <button key={c} aria-pressed={channel === c} onClick={() => setChannel(c)}>
                  {c === "all" ? (
                    <>
                      <Layers size={13} /> Tüm kanallar
                    </>
                  ) : (
                    <>
                      <span className={c === "Google Ads" ? "a-google-dot" : "a-meta-dot"} />
                      {c}
                    </>
                  )}
                </button>
              ))}
            </div>
            <div className="a-metrics" aria-live="polite">
              {[
                { label: "Toplam harcama", value: tl(spend), note: "Seçili kanalların toplamı" },
                { label: "Toplam gelir", value: tl(revenue), note: "Örnek dönüşüm değeri" },
                { label: "Blended ROAS", value: `${roas}×`, note: "Gelir / reklam harcaması" },
                { label: "Dönüşümler", value: format(conversions), note: "Seçili dönem toplamı" },
              ].map((m, i) => (
                <div className={i === 2 ? "a-metric a-metric-blue" : "a-metric"} key={m.label}>
                  <span>
                    {m.label}
                    <ArrowUpRight size={13} />
                  </span>
                  <strong>{m.value}</strong>
                  <small>{m.note}</small>
                </div>
              ))}
            </div>
            <div className="a-chart-grid">
              <div className="a-chart">
                <div className="a-chart-title">
                  <b>Performansa bir bakış</b>
                  <span>
                    <i /> Göreli gelir eğilimi
                  </span>
                </div>
                <div className="a-graph">
                  <div className="a-y-axis">
                    <span>%100</span>
                    <span>%67</span>
                    <span>%33</span>
                    <span>%0</span>
                  </div>
                  <div className="a-plot">
                    <svg
                      viewBox="0 0 600 175"
                      role="img"
                      aria-label={`${channel === "all" ? "Tüm kanallar" : channel}: örnek normalize gelir eğilimi`}
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="astra-chart-fill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#2668e8" stopOpacity=".19" />
                          <stop offset="100%" stopColor="#2668e8" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {[12, 62, 112, 165].map((y) => (
                        <path key={y} d={`M0 ${y} H600`} stroke="#edf0f5" strokeDasharray="4 5" />
                      ))}
                      <path d={`${line} L600 175 L0 175 Z`} fill="url(#astra-chart-fill)" />
                      <path
                        d={line}
                        fill="none"
                        stroke="#2668e8"
                        strokeWidth="2.7"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                    <div className="a-x-axis">
                      <span>1. gün</span>
                      <span>{period === "30" ? "10. gün" : "3. gün"}</span>
                      <span>{period === "30" ? "20. gün" : "5. gün"}</span>
                      <span>{period}. gün</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="a-channel-breakdown">
                <b>Kanal dağılımı</b>
                <small>Reklam harcaması</small>
                <div
                  className="a-donut"
                  style={{
                    background:
                      channel === "all"
                        ? "conic-gradient(#2668e8 0% 43.84%, #99baff 43.84% 100%)"
                        : selected[0].color,
                  }}
                >
                  <div>
                    <strong>{selected.length}</strong>
                    <span>kanal</span>
                  </div>
                </div>
                <div className="a-channel-legend">
                  {selected.map((c) => (
                    <span key={c.name}>
                      <i style={{ background: c.color }} />
                      {c.name}
                      <b>%{Math.round(((c.spend * ratio) / spend) * 100)}</b>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="a-report-status">
              <span>
                <CheckCheck size={16} />
                <b>Veriden rapora, tek akış.</b>
                <span>Kontrol ve yorum sizde.</span>
              </span>
              <a href="#raporlar">
                Raporu keşfet <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="a-demo-caption">
        <MousePointer2 size={13} /> Bu bir tasarım önizlemesidir. Kanal ve tarih filtrelerini
        deneyin; tüm rakamlar örnektir.
      </div>
    </div>
  );
}

function PriceSection() {
  const [yearly, setYearly] = useState(false);
  const recurring = yearly ? yearlyTotal(pilot.monthly) : pilot.monthly;
  return (
    <section className="a-section a-pricing" id="fiyatlar">
      <div className="a-price-intro">
        <p className="a-eyebrow">BİRLİKTE BAŞLAYALIM</p>
        <h2>
          Ajansınız büyüsün.
          <br />
          <span>Rapor yükünüz değil.</span>
        </h2>
        <p>
          Birlikte kuruyor, ilk raporunuzu birlikte hazırlıyoruz. Sonrasında sistem çalışıyor, siz
          işinize odaklanıyorsunuz.
        </p>
        <div className="a-price-benefits">
          <span>
            <Check /> {pilot.clients} aktif müşteri · {pilot.sources} veri kaynağı
          </span>
          <span>
            <Check /> Kendi logonuz, kendi renkleriniz
          </span>
          <span>
            <Check /> PDF rapor ve canlı müşteri linki
          </span>
          <span>
            <Check /> Sınırsız ekip kullanıcısı
          </span>
          <span>
            <Check /> Kurulum, bakım ve teknik destek
          </span>
        </div>
        <Link to="/iletisim" className="a-text-link">
          Ajansınıza uygun mu? Birlikte bakalım <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="a-price-card">
        <div className="a-price-top">
          <span>Kurucu pilot</span>
          <span>Birlikte kurulum</span>
        </div>
        <div className="a-billing-switch" role="group" aria-label="Ödeme dönemi">
          <button aria-pressed={!yearly} onClick={() => setYearly(false)}>
            Aylık
          </button>
          <button aria-pressed={yearly} onClick={() => setYearly(true)}>
            Yıllık <span>−%{ANNUAL_DISCOUNT}</span>
          </button>
        </div>
        <p className="a-price-number">
          {tl(monthlyFor(pilot.monthly, yearly ? "yearly" : "monthly"))}
          <span>/ ay</span>
        </p>
        <p className="a-price-sub">
          {yearly ? `${tl(recurring)} yıllık peşin ödeme` : "Platform aboneliği ve işletim desteği"}
        </p>
        <dl className="a-price-math">
          <div>
            <dt>Tek seferlik kurulum</dt>
            <dd>{tl(pilot.setup)}</dd>
          </div>
          <div>
            <dt>
              İlk ödeme <small>(kurulum + ilk {yearly ? "yıl" : "ay"})</small>
            </dt>
            <dd>{tl(pilot.setup + recurring)}</dd>
          </div>
          <div>
            <dt>Sonraki her {yearly ? "yıl" : "ay"}</dt>
            <dd>{tl(recurring)}</dd>
          </div>
        </dl>
        <Link className="a-button a-button-primary" to="/iletisim">
          Hadi konuşalım <ArrowRight size={17} />
        </Link>
        <p className="a-price-terms">
          {yearly ? "Yıllık peşin ödeme." : `Asgari ${pilot.commitmentMonths} aylık pilot.`} Kurucu
          fiyatınız {pilot.priceLockMonths} ay sabit. Fiyatlar KDV hariçtir. Sözleşme ve fatura Ruul
          üzerinden düzenlenir.
        </p>
        <p className="a-price-scope">
          Yeni platform entegrasyonları ve özel rapor tasarımları ayrıca fiyatlanır. Kaynakların
          bağlantı kapsamını kurulum öncesinde birlikte netleştiriyoruz.
        </p>
      </div>
    </section>
  );
}

const questions = [
  [
    "Denemek için hesap bağlamam gerekiyor mu?",
    "Hayır. Bu sayfadaki önizleme örnek verilerle çalışır. Demo panelini de kendi reklam hesabınızı bağlamadan inceleyebilirsiniz. Kendi verilerinizle kurulum için birlikte ilerliyoruz.",
  ],
  [
    "Müşterim raporda Ositend'i görecek mi?",
    "Raporlar ajansınızın logosu ve renkleriyle hazırlanır. Müşteriye kendi markanızla bir PDF rapor veya paylaşılabilir rapor bağlantısı sunabilirsiniz.",
  ],
  [
    "Hangi veri kaynaklarını bağlayabilirim?",
    "Google Ads, Meta Ads ve GA4 raporlama kapsamındadır. Hesabınıza uygun bağlantıların erişim ve kullanılabilirlik durumunu kurulum öncesinde birlikte doğruluyoruz.",
  ],
  [
    "Rapor gönderilmeden önce kontrol edebilir miyim?",
    "Evet. Raporu kontrol edip kendi yorumunuzu ekleyebilirsiniz. Gönderim planını ve onay adımını ajansınızın çalışma biçimine göre birlikte belirliyoruz.",
  ],
  [
    "Kurulum ücretine ne dahil?",
    "Hesap bağlantıları, ajansınızın marka tanımı ve rapor şablonunun hazırlanması dahildir. İlk raporu birlikte kontrol ediyoruz. Müşteriye özel yeni tasarımlar ve yeni platform entegrasyonları ayrıca fiyatlanır.",
  ],
];

export function AstraHome() {
  useSeo({
    title: "Ositend — Raporlar hazır. Sıra büyümede.",
    description:
      "Ajansınızın rapor yükünü hafifletin. Reklam verileri, markalı raporlar ve müşteri takibi tek bir çalışma alanında.",
    path: "/",
  });
  return (
    <div className="astra">
      <section className="a-hero">
        <div className="a-hero-grid" aria-hidden="true" />
        <div className="a-hero-copy">
          <Link to="/iletisim" className="a-pilot-badge">
            <span /> AJANSLAR İÇİN TASARLANDI <i /> Kurucu pilot <ArrowUpRight size={13} />
          </Link>
          <h1>
            Raporlar hazır.
            <br />
            <span>Sıra büyümede.</span>
          </h1>
          <p>
            Onlarca sekme, bitmeyen tablolar, tekrar eden işler.
            <br className="a-desktop-break" /> Hepsini tek bir akışa bağlayın. Zamanınız ajansınıza
            kalsın.
          </p>
          <div className="a-hero-actions">
            <a href="#canli-dene" className="a-button a-button-primary">
              Paneli keşfedin <ArrowRight size={17} />
            </a>
            <Link to="/iletisim" className="a-button a-button-secondary">
              Hadi konuşalım <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="a-hero-notes">
            <span>
              <Check size={13} /> Kendi markanızla raporlama
            </span>
            <span>
              <Check size={13} /> Kurulumu birlikte yapıyoruz
            </span>
          </div>
        </div>
        <div className="a-product-wrap">
          <div className="a-product-label">
            <span>
              <span className="a-live-dot" /> AJANSINIZIN YENİ ÇALIŞMA ALANI
            </span>
            <span>DAHA AZ SEKME. DAHA FAZLA NETLİK.</span>
          </div>
          <Dashboard />
        </div>
      </section>
      <section className="a-platforms" aria-label="Raporlama kaynakları">
        <p>
          Farklı kaynaklar.
          <br />
          <b>Aynı büyük resim.</b>
        </p>
        <div>
          <span className="a-platform-google">G</span> Google Ads
        </div>
        <div>
          <span className="a-platform-meta">∞</span> Meta Ads
        </div>
        <div>
          <BarChart3 color="#da8a18" /> Google Analytics
        </div>
        <span className="a-platform-note">
          Bağlantı kapsamı
          <br />
          kurulumda netleştirilir.
        </span>
      </section>
      <section className="a-section a-features" id="ozellikler">
        <div className="a-section-heading">
          <div>
            <p className="a-eyebrow">RAPORLAMANIN ÖTESİNDE</p>
            <h2>
              Operasyon hafiflesin.
              <br />
              <span>İyi işler öne çıksın.</span>
            </h2>
          </div>
          <p>
            Veriyi toplamak, tabloyu düzeltmek, raporu yeniden göndermek… Ekibinizin zamanı
            bunlardan daha değerli.
          </p>
        </div>
        <div className="a-feature-grid">
          <article className="a-feature a-feature-report" id="raporlar">
            <div className="a-feature-copy">
              <span className="a-feature-icon">
                <FileText />
              </span>
              <h3>
                Sizin işiniz.
                <br />
                Sizin imzanız.
              </h3>
              <p>
                Müşteriniz yalnızca sonuçları ve sizin markanızı görsün. PDF veya canlı link; her
                rapor ajansınızın dilinde.
              </p>
            </div>
            <div className="a-paper-scene" aria-label="Örnek markalı rapor">
              <div className="a-paper-back" />
              <div className="a-paper">
                <div className="a-paper-header">
                  <span>
                    stüdyo<span>®</span>
                  </span>
                  <small>AYLIK PERFORMANS</small>
                </div>
                <p>
                  Büyük resim,
                  <br />
                  <b>net sonuçlar.</b>
                </p>
                <span className="a-paper-date">Örnek müşteri · Aylık rapor</span>
                <div className="a-paper-kpis">
                  <span>
                    Toplam gelir<b>602.000 TL</b>
                  </span>
                  <span>
                    ROAS<b>4,31×</b>
                  </span>
                </div>
                <div className="a-paper-bars">
                  {[25, 40, 33, 52, 42, 62, 55, 76, 66, 86, 80, 100].map((height, i) => (
                    <i key={i} style={{ height: `${height}%` }} />
                  ))}
                </div>
                <div className="a-paper-footer">
                  Sizin logonuz. Sizin renkleriniz.
                  <CheckCheck size={14} />
                </div>
              </div>
              <span className="a-paper-stamp">
                <Check size={14} /> Markanızla hazır
              </span>
            </div>
          </article>
          <article className="a-feature a-feature-overview">
            <span className="a-feature-icon">
              <Layers />
            </span>
            <h3>
              Her müşteri,
              <br />
              aynı netlik.
            </h3>
            <p>
              Hesapları tek çalışma alanında toplayın. Hangi müşterinin ilgi beklediğini kolayca
              görün.
            </p>
            <div className="a-client-list">
              {[
                { name: "Mavi Store", letter: "m", color: "blue", tag: "Rapor hazır" },
                { name: "Forma Studio", letter: "f", color: "sand", tag: "Kontrol bekliyor" },
                { name: "Nova Coffee", letter: "n", color: "pink", tag: "Rapor hazır" },
              ].map((c) => (
                <div key={c.name}>
                  <span className={`a-client-logo ${c.color}`}>{c.letter}</span>
                  <span>
                    {c.name}
                    <small>Örnek müşteri</small>
                  </span>
                  <span className="a-client-tag">{c.tag}</span>
                </div>
              ))}
            </div>
          </article>
          <article className="a-feature a-feature-alert" id="uyarilar">
            <div>
              <span className="a-feature-icon">
                <Bell />
              </span>
              <h3>
                Müşteriniz sormadan,
                <br />
                siz fark edin.
              </h3>
              <p>
                Eşik uyarılarıyla dikkat isteyen değişimleri görün. Analize ve bir sonraki aksiyona
                odaklanın.
              </p>
            </div>
            <div className="a-notification">
              <span className="a-alert-icon">
                <Bell size={20} />
              </span>
              <div>
                <b>Bir göz atmak isteyebilirsiniz.</b>
                <p>Örnek kampanya · CPA belirlediğiniz eşiği aştı.</p>
                <span>
                  Kampanyayı inceleyin <ArrowUpRight size={13} />
                </span>
              </div>
              <small>ÖRNEK</small>
            </div>
          </article>
        </div>
      </section>
      <section className="a-section a-process" id="nasil-calisir">
        <div className="a-section-heading">
          <div>
            <p className="a-eyebrow">KARMAŞIK KURULUMLARA SON</p>
            <h2>
              Bir kez kurun.
              <br />
              <span>Her ay rahat edin.</span>
            </h2>
          </div>
          <Link to="/iletisim" className="a-text-link">
            İlk raporu birlikte hazırlayalım <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="a-steps">
          {[
            {
              number: "01",
              icon: Link2,
              title: "Hesapları bağlayın",
              body: "Veri kaynaklarını ve müşterileri eşleştirin. Bağlantıların kurulumunda yanınızdayız.",
            },
            {
              number: "02",
              icon: Sparkles,
              title: "İmzanızı ekleyin",
              body: "Logonuzu, renklerinizi ve rapor şablonunuzu belirleyin. Yorumunuzla raporu tamamlayın.",
            },
            {
              number: "03",
              icon: CalendarDays,
              title: "Akışa bırakın",
              body: "Raporlama takvimini belirleyin. Her döngüde aynı düzen, her müşteride aynı özen.",
            },
          ].map((s) => (
            <article key={s.number}>
              <div>
                <span>{s.number}</span>
                <s.icon size={24} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
        <div className="a-security-strip">
          <ShieldCheck size={24} />
          <p>
            <b>Veriniz sizin. Kontrol de öyle.</b>
            <span>Hesap erişimi ve veri güvenliği yaklaşımımızı inceleyin.</span>
          </p>
          <Link to="/guvenlik">
            Güvenliği inceleyin <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <div className="a-pricing-bg">
        <PriceSection />
      </div>
      <section className="a-section a-faq">
        <div>
          <p className="a-eyebrow">AKLINIZDA KALMASIN</p>
          <h2>
            İyi sorular.
            <br />
            <span>Net cevaplar.</span>
          </h2>
          <p>Başka bir sorunuz mu var?</p>
          <Link className="a-text-link" to="/iletisim">
            Bize yazın <ArrowUpRight size={16} />
          </Link>
        </div>
        <div>
          {questions.map(([q, a], i) => (
            <details key={q} open={i === 0 || undefined}>
              <summary>
                {q}
                <Plus size={18} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="a-closing">
        <div className="a-closing-orbit" aria-hidden="true" />
        <div>
          <p className="a-eyebrow">DAHA İYİ BİR ÇALIŞMA BİÇİMİ</p>
          <h2>
            Bir sonraki ay başı,
            <br />
            <span>başka türlü olsun.</span>
          </h2>
          <p>
            Daha az rapor telaşı. Daha çok strateji, daha çok yaratıcılık.
            <br />
            Ajansınıza kalan daha çok zaman.
          </p>
          <div className="a-hero-actions">
            <Link to="/iletisim" className="a-button a-button-white">
              Hadi konuşalım <ArrowRight size={17} />
            </Link>
            <a href={`${panelUrl}/giris`} className="a-closing-demo">
              Demo panelini aç <ArrowUpRight size={17} />
            </a>
          </div>
          <span className="a-closing-note">İlk adım, ajansınızı tanıdığımız kısa bir görüşme.</span>
        </div>
      </section>
    </div>
  );
}
