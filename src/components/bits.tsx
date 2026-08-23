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
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200";
  const sizes = size === "lg" ? "px-6 py-3.5 text-[0.9375rem]" : "px-5 py-2.5 text-sm";
  const variants = {
    primary: "bg-brand text-white hover:bg-brand-ink",
    secondary: "border border-line bg-white text-ink hover:bg-surface",
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
        <div className="aurora absolute -top-40 -right-24 -left-24 h-[680px] opacity-[0.6]" />
        {dots && (
          <div className="dots absolute inset-x-0 top-0 h-[620px] opacity-[0.9] [mask-image:radial-gradient(65%_58%_at_50%_6%,black,transparent_78%)]" />
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
          <h1 className="mx-auto mt-6 max-w-3xl text-[clamp(2.25rem,5.4vw,3.5rem)]">{title}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-ink sm:text-lg">
            {lede}
          </p>
        </Reveal>
        {children && <Reveal delay={0.24}>{children}</Reveal>}
      </Section>
    </AtmosphereBand>
  );
}

/** Closing CTA — deep blue band, reused on every page. */
export function ClosingCta() {
  return (
    <Section className="pb-20 sm:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[1.75rem] bg-brand-deep px-6 py-16 text-center sm:px-12 sm:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(45% 70% at 15% 0%, oklch(0.68 0.19 252 / 0.75), transparent 68%), radial-gradient(40% 65% at 88% 100%, oklch(0.6 0.21 293 / 0.6), transparent 66%), radial-gradient(35% 55% at 60% 8%, oklch(0.78 0.13 205 / 0.35), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="dots pointer-events-none absolute inset-0 opacity-[0.22] [mask-image:radial-gradient(75%_75%_at_50%_50%,black,transparent)]"
            style={{ backgroundImage: "radial-gradient(circle at center, white 1px, transparent 1px)" }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-[clamp(1.75rem,4.2vw,2.75rem)] text-white">
              Bu ayın raporlarını elle mi hazırlayacaksınız?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75">
              30 dakikalık demoda kendi hesaplarınızı bağlayıp ilk markalı raporunuzu birlikte
              üretelim. Kredi kartı istemiyoruz.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/iletisim"
                className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-[0.9375rem] font-medium text-brand transition-colors hover:bg-brand-tint"
              >
                Ücretsiz demo alın
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/hizmetler"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-white/10"
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
