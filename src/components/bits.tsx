import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "motion/react";

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

/** Fade + rise on scroll-in. The site's baseline motion — used once per block, never per element. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Counts up when scrolled into view — AgencyAnalytics' signature stat motion. */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1600,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast start, long settle, reads as "counting up"
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className="tnum">
      {prefix}
      {value.toLocaleString("tr-TR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/**
 * Scroll-linked word fill: text starts muted and turns to ink word by word as the
 * block travels through the viewport. Lifted from AgencyAnalytics' mid-page statement.
 */
export function ScrollFillText({ text, className = "" }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });
  const words = text.split(" ");

  if (reduce) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={`flex flex-wrap justify-center gap-x-[0.28em] ${className}`}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const color = useTransform(
    progress,
    range,
    ["oklch(0.78 0.006 264)", "oklch(0.21 0.006 285.9)"],
  );
  return <motion.span style={{ color }}>{children}</motion.span>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="size-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}

export function Button({
  to,
  href,
  children,
  variant = "primary",
  className = "",
  size = "md",
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  size?: "md" | "lg";
}) {
  /*
   * HAP FORM (rounded-full).
   *
   * Kartlar 20px köşeli dikdörtgen; butonlar tam yuvarlak. Bu karşıtlık
   * bilinçli — Apple'ın pazarlama sayfalarındaki en tanınabilir biçim
   * kararı ve rakibin 12px köşeli düğmelerinden de net şekilde ayrışıyor.
   *
   * hover:bg-brand-ink yazıyordu ve BÖYLE BİR TOKEN YOKTU: Tailwind sınıfı
   * hiç üretmiyor, yani sitedeki bütün birincil butonların hover durumu
   * ölüydü (başlıktaki "Demo alın" ve fiyat kartının CTA'sı dahil).
   * Doğru token brand-deep.
   *
   * transform geçişi ease-out-soft ile: basıldığında hızla oturuyor,
   * bırakıldığında yavaşça geri geliyor.
   */
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,color,transform,box-shadow] duration-200 ease-[var(--ease-out-soft)] active:translate-y-px";
  const sizes = size === "lg" ? "px-6 py-3.5 text-[0.9375rem]" : "px-5 py-2.5 text-sm";
  const variants = {
    primary:
      "bg-brand text-white shadow-[0_1px_2px_oklch(0.2_0.01_265/0.12),0_8px_20px_-10px_oklch(0.55_0.212_258/0.6)] hover:bg-brand-deep hover:-translate-y-0.5",
    secondary: "border border-line bg-white text-ink hover:bg-surface hover:-translate-y-0.5",
    ghost: "text-muted-ink hover:text-ink",
  }[variant];

  const content = (
    <>
      {children}
      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${sizes} ${variants} ${className}`}
      >
        {content}
      </a>
    );
  }
  return (
    <Link to={to ?? "/"} className={`${base} ${sizes} ${variants} ${className}`}>
      {content}
    </Link>
  );
}

/**
 * Product screenshot in the tinted frame.
 * `zoom` gives it the Apple-style scroll-in: starts small and slightly pushed
 * back, settles to full size as it enters the viewport.
 */
export function Shot({
  src,
  alt,
  className = "",
  zoom = false,
}: {
  src: string;
  alt: string;
  className?: string;
  zoom?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.35"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.55], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 0.55], [36, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.28], [0.55, 1]);

  return (
    <motion.div
      ref={ref}
      style={zoom && !reduce ? { scale, y, opacity } : undefined}
      className={`shot-frame overflow-hidden p-2 sm:p-2.5 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full rounded-[1.125rem] border border-white/70 bg-white shadow-[0_2px_10px_-4px_oklch(0.4_0.1_258/0.25)]"
      />
    </motion.div>
  );
}

/**
 * Full-bleed colour cloud + dot texture behind hero-class sections.
 * Renders its own clipping wrapper, so the layers can bleed past the content
 * container without ever widening the document.
 */
export function AtmosphereBand({
  children,
  dots = true,
  className = "",
}: {
  children: ReactNode;
  dots?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora absolute -top-40 -right-24 -left-24 h-[680px] opacity-[0.32]" />
        {dots && (
          <div className="dots absolute inset-x-0 top-0 h-[620px] opacity-[0.55] [mask-image:radial-gradient(65%_58%_at_50%_6%,black,transparent_78%)]" />
        )}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white" />
      </div>
      {children}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <AtmosphereBand>
      <Section className="pt-14 pb-12 text-center sm:pt-20 sm:pb-16">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-6 max-w-3xl text-[clamp(2.375rem,5.8vw,4.25rem)]">{title}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="lede mx-auto mt-6 max-w-2xl">{lede}</p>
        </Reveal>
        {children && <Reveal delay={0.24}>{children}</Reveal>}
      </Section>
    </AtmosphereBand>
  );
}

/**
 * Kapanış bandı — her sayfanın sonunda.
 *
 * Önceki hali koyu mavi zemin üzerinde mavi + mor + camgöbeği üç ayrı
 * radial gradyandı. Üç renk aynı karede yarışınca sonuç "renkli" değil
 * "bulanık" oluyordu ve marka mavisi kendi bandında bile kaybolmuştu.
 *
 * Yeni hâli neredeyse siyah, tek bir mavi ışık kaynağıyla. Sayfanın
 * geri kalanı beyaz olduğu için bu bant tek başına bir ritim kırılması
 * yaratıyor — beyaz → koyu → beyaz. Apple'ın ürün sayfalarını "pahalı"
 * gösteren şeylerin başında bu geliyor ve rakipte hiç yok.
 */
export function ClosingCta() {
  return (
    <Section className="pb-20 sm:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-night px-6 py-20 text-center sm:px-12 sm:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 80% at 50% -10%, oklch(0.55 0.212 258 / 0.55), transparent 70%)",
            }}
          />
          {/* Kömürün üstünde çok soluk bir nokta dokusu: yüzeyin düz
              boyanmış değil, dokulu olduğunu hissettiriyor. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.14] [mask-image:radial-gradient(70%_70%_at_50%_40%,black,transparent)]"
            style={{
              backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-[clamp(1.875rem,4.4vw,3rem)] text-night-ink">
              Bu ayın raporlarını elle mi hazırlayacaksınız?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed tracking-[-0.011em] text-night-muted">
              30 dakikalık demoda kendi hesaplarınızı bağlayıp ilk markalı raporunuzu birlikte
              üretelim.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/iletisim"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[0.9375rem] font-medium text-night transition-transform duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-0.5"
              >
                Pilot programa başvurun
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/hizmetler"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-[0.9375rem] font-medium text-night-ink transition-colors hover:bg-white/10"
              >
                Neler yapıyoruz
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
