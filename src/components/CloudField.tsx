import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type Blob = {
  color: string;
  size: number;
  top: string;
  left: string;
  /** px of vertical parallax per 1000px scrolled — negative drifts up as the page scrolls. */
  speed: number;
  duration: string;
  delay: string;
};

const blobs: Blob[] = [
  { color: "var(--color-brand)", size: 620, top: "-8%", left: "2%", speed: -180, duration: "32s", delay: "0s" },
  { color: "var(--color-violet)", size: 500, top: "12%", left: "82%", speed: 150, duration: "38s", delay: "-8s" },
  { color: "var(--color-cyan)", size: 560, top: "40%", left: "-8%", speed: -130, duration: "34s", delay: "-16s" },
  { color: "var(--color-brand)", size: 460, top: "62%", left: "72%", speed: 210, duration: "29s", delay: "-4s" },
  { color: "var(--color-violet)", size: 520, top: "86%", left: "14%", speed: -170, duration: "36s", delay: "-12s" },
  { color: "var(--color-cyan)", size: 440, top: "110%", left: "88%", speed: 140, duration: "31s", delay: "-20s" },
  { color: "var(--color-brand)", size: 500, top: "134%", left: "36%", speed: -190, duration: "33s", delay: "-24s" },
];

function CloudBlob({
  blob,
  scrollY,
  reduce,
}: {
  blob: Blob;
  scrollY: ReturnType<typeof useScroll>["scrollY"];
  reduce: boolean;
}) {
  const y = useTransform(scrollY, (v) => (reduce ? 0 : -(v / 1000) * blob.speed));

  return (
    <motion.div
      className="absolute"
      style={{ top: blob.top, left: blob.left, width: blob.size, height: blob.size, y }}
    >
      <div
        className={`size-full rounded-full opacity-[0.34] ${reduce ? "" : "cloud-drift"}`}
        style={{
          background: `radial-gradient(circle, color-mix(in oklch, ${blob.color} 62%, transparent), transparent 72%)`,
          filter: "blur(64px)",
          animationDuration: blob.duration,
          animationDelay: blob.delay,
        }}
      />
    </motion.div>
  );
}

/**
 * Global renk bulutu katmanı — tüm sayfanın arkasında sabit durur, kendi
 * içinde yavaşça süzülür ve sayfa kaydırıldıkça bulutların her biri farklı
 * hızda paralaks yapar. Cam yüzeylerin (sticky header, .glass* kartlar)
 * saydamlığı ancak arkada geçen bir şey varsa görünür hale gelir — bu katman
 * o "şey": tüm sayfa boyunca kaydırırken hep orada, hep hareket halinde.
 */
export function CloudField() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {blobs.map((b, i) => (
        <CloudBlob key={i} blob={b} scrollY={scrollY} reduce={!!reduce} />
      ))}
    </div>
  );
}
