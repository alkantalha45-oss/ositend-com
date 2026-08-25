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

/*
 * PALET BİLİNÇLİ OLARAK KISILDI.
 *
 * Önceki hali yedi buluttu: mavi, mor ve camgöbeği eşit ağırlıkta, %62
 * renk karışımı ve 0.34 opaklıkla. Sonuç, her bölümün arkasında dönen
 * pastel bir gökkuşağıydı — üretilmiş SaaS şablonlarının en tanıdık
 * işareti ve marka renginin ne olduğunu belirsizleştiren şey.
 *
 * Yeni kural: MAVİ hâkim, mor yalnızca derinlik için ve sayfanın altında,
 * camgöbeği yok. Opaklık yarısından fazla düşürüldü. Bulut artık
 * ziyaretçinin BAKTIĞI bir şey değil, cam yüzeylerin arkasında geçtiğini
 * hissettiren bir şey — zaten işi buydu.
 */
const blobs: Blob[] = [
  { color: "var(--color-brand)", size: 720, top: "-14%", left: "-4%", speed: -180, duration: "34s", delay: "0s" },
  { color: "var(--color-brand)", size: 560, top: "26%", left: "78%", speed: 150, duration: "38s", delay: "-12s" },
  { color: "var(--color-brand)", size: 620, top: "68%", left: "-10%", speed: -140, duration: "32s", delay: "-20s" },
  { color: "var(--color-violet)", size: 520, top: "104%", left: "70%", speed: 190, duration: "36s", delay: "-6s" },
  { color: "var(--color-brand)", size: 580, top: "142%", left: "8%", speed: -170, duration: "33s", delay: "-26s" },
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
        className={`size-full rounded-full opacity-[0.15] ${reduce ? "" : "cloud-drift"}`}
        style={{
          background: `radial-gradient(circle, color-mix(in oklch, ${blob.color} 55%, transparent), transparent 70%)`,
          filter: "blur(80px)",
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
