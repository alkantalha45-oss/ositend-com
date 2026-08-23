/*
 * Kalın, tek kalınlıkta mürekkep çizgisiyle çizilmiş küçük karakterler —
 * Dropbox "Spirit of Joy" ve Notion şablon satıcılarının kullandığı türden:
 * sade orantılı insan figürü, TEK sıcak vurgu rengi (giysi üzerinde),
 * küçük sparkle detayları. Üçü de aynı "karakteri" (aynı kafa/vücut kalıbı)
 * farklı poz ve objeyle kullanır, böylece seri tutarlı bir dil konuşur.
 */

type DoodleProps = { className?: string };

const INK = "currentColor";
const WARM = "var(--color-warning)";
const STROKE = 3;

function Sparkle({ x, y, size = 7 }: { x: number; y: number; size?: number }) {
  const d = `M${x} ${y - size} L${x + size * 0.28} ${y - size * 0.28} L${x + size} ${y} L${
    x + size * 0.28
  } ${y + size * 0.28} L${x} ${y + size} L${x - size * 0.28} ${y + size * 0.28} L${x - size} ${y} L${
    x - size * 0.28
  } ${y - size * 0.28} Z`;
  return <path d={d} fill={INK} opacity="0.45" />;
}

/** Ortak kafa — sade saç taraması, nokta gözler, kısa gülümseme. */
function Head({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <path
        d={`M${cx - 14} ${cy - 4} Q${cx - 15} ${cy - 17} ${cx - 1} ${cy - 18} Q${cx + 16} ${
          cy - 19
        } ${cx + 14} ${cy - 2} Q${cx + 9} ${cy - 11} ${cx} ${cy - 11} Q${cx - 9} ${cy - 11} ${
          cx - 14
        } ${cy - 4} Z`}
        fill={INK}
      />
      <circle cx={cx} cy={cy} r="14" fill="white" stroke={INK} strokeWidth={STROKE} />
      <circle cx={cx - 5} cy={cy + 1} r="1.7" fill={INK} />
      <circle cx={cx + 5} cy={cy + 1} r="1.7" fill={INK} />
      <path
        d={`M${cx - 4} ${cy + 7} Q${cx} ${cy + 10} ${cx + 4} ${cy + 7}`}
        stroke={INK}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

/** Gövde + bacaklar. Kollar sahneye göre ayrı çizilir (bkz. Arm). */
function Torso({ cx, top }: { cx: number; top: number }) {
  return (
    <g>
      <rect
        x={cx - 17}
        y={top + 40}
        width="15"
        height="40"
        rx="7.5"
        fill="white"
        stroke={INK}
        strokeWidth={STROKE}
        transform={`rotate(-6 ${cx - 9} ${top + 40})`}
      />
      <rect
        x={cx + 2}
        y={top + 40}
        width="15"
        height="40"
        rx="7.5"
        fill="white"
        stroke={INK}
        strokeWidth={STROKE}
        transform={`rotate(6 ${cx + 9} ${top + 40})`}
      />
      <rect
        x={cx - 25}
        y={top + 74}
        width="22"
        height="11"
        rx="5.5"
        fill={INK}
        transform={`rotate(-8 ${cx - 14} ${top + 79})`}
      />
      <rect
        x={cx + 3}
        y={top + 74}
        width="22"
        height="11"
        rx="5.5"
        fill={INK}
        transform={`rotate(8 ${cx + 14} ${top + 79})`}
      />
      <rect x={cx - 20} y={top} width="40" height="46" rx="18" fill={WARM} stroke={INK} strokeWidth={STROKE} />
    </g>
  );
}

/** Omuzdan ele kalın, tek parça bir kavis — dönüş matrisi yerine doğrudan iki uç nokta. */
function Arm({
  from,
  control,
  to,
}: {
  from: [number, number];
  control: [number, number];
  to: [number, number];
}) {
  const d = `M${from[0]} ${from[1]} Q${control[0]} ${control[1]} ${to[0]} ${to[1]}`;
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth={16} strokeLinecap="round" fill="none" />
      <path d={d} stroke={WARM} strokeWidth={12.5} strokeLinecap="round" fill="none" />
      <circle cx={to[0]} cy={to[1]} r="7.5" fill="white" stroke={INK} strokeWidth={STROKE} />
    </g>
  );
}

/** Adım 1 — dizüstünü bağlayan karakter, etrafında platform noktaları. */
export function ConnectDoodle({ className = "" }: DoodleProps) {
  const cx = 78;
  const top = 46;
  return (
    <svg viewBox="0 0 200 170" className={className} fill="none" aria-hidden focusable="false">
      <circle cx="150" cy="40" r="28" fill={WARM} opacity="0.22" />

      <g transform="rotate(-3 118 100)">
        <rect x="92" y="94" width="56" height="8" rx="3" fill={INK} />
        <path
          d="M96 94 L100 64 Q100 60 104 60 L138 60 Q142 60 142 64 L146 94 Z"
          fill="white"
          stroke={INK}
          strokeWidth={STROKE}
        />
        <rect x="107" y="68" width="27" height="17" rx="2" fill={WARM} opacity="0.85" />
      </g>

      <Torso cx={cx} top={top} />
      <Arm from={[cx - 15, top + 8]} control={[cx - 24, top + 26]} to={[cx - 20, top + 46]} />
      <Arm from={[cx + 15, top + 8]} control={[cx + 30, top + 34]} to={[104, 90]} />
      <Head cx={cx} cy={top - 14} />

      <circle cx="164" cy="66" r="6.5" fill="#4285F4" />
      <circle cx="172" cy="88" r="5.5" fill="#0A66C2" />
      <circle cx="160" cy="102" r="5" fill="#F9AB00" />
      <path d="M148 74 Q158 70 163 67" stroke={INK} strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" />

      <Sparkle x={34} y={38} size={6} />
      <Sparkle x={26} y={116} size={5} />
    </svg>
  );
}

/** Adım 2 — raporu iki eliyle gururla tutan karakter. */
export function BrandDoodle({ className = "" }: DoodleProps) {
  const cx = 76;
  const top = 48;
  return (
    <svg viewBox="0 0 200 170" className={className} fill="none" aria-hidden focusable="false">
      <circle cx="152" cy="42" r="30" fill={WARM} opacity="0.22" />

      <g transform="rotate(-5 130 82)">
        <rect x="104" y="48" width="52" height="66" rx="6" fill="white" stroke={INK} strokeWidth={STROKE} />
        <path d="M114 64 H146" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M114 73 H138" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        <rect x="113" y="84" width="8" height="18" fill={WARM} />
        <rect x="125" y="78" width="8" height="24" fill={INK} opacity="0.8" />
        <rect x="137" y="90" width="8" height="12" fill={WARM} />
      </g>

      <Torso cx={cx} top={top} />
      <Arm from={[cx - 15, top + 8]} control={[cx - 24, top + 26]} to={[cx - 20, top + 48]} />
      <Arm from={[cx + 15, top + 8]} control={[cx + 30, top + 42]} to={[112, 100]} />
      <Head cx={cx} cy={top - 16} />

      <Sparkle x={32} y={34} size={6} />
      <Sparkle x={24} y={118} size={5} />
    </svg>
  );
}

/** Adım 3 — takvimdeki tarihi işaretleyen karakter. */
export function ScheduleDoodle({ className = "" }: DoodleProps) {
  const cx = 64;
  const top = 46;
  return (
    <svg viewBox="0 0 200 170" className={className} fill="none" aria-hidden focusable="false">
      <circle cx="160" cy="34" r="26" fill={WARM} opacity="0.22" />

      <rect x="106" y="30" width="78" height="86" rx="12" fill="white" stroke={INK} strokeWidth={STROKE} />
      <path d="M106 54 H184" stroke={INK} strokeWidth="2.5" />
      <circle cx="130" cy="22" r="6" stroke={INK} strokeWidth="2.5" fill="white" />
      <circle cx="162" cy="22" r="6" stroke={INK} strokeWidth="2.5" fill="white" />
      <circle cx="145" cy="86" r="15" fill={WARM} />
      <text x="145" y="91" textAnchor="middle" fontSize="15" fontWeight="700" fill="#3a2c0f">
        18
      </text>

      <Torso cx={cx} top={top} />
      <Arm from={[cx - 15, top + 8]} control={[cx - 26, top + 24]} to={[cx - 20, top + 48]} />
      <Arm from={[cx + 15, top + 6]} control={[cx + 34, top + 4]} to={[112, 66]} />
      <Head cx={cx} cy={top - 14} />

      <Sparkle x={24} y={40} size={6} />
      <Sparkle x={198} y={104} size={5} />
    </svg>
  );
}
