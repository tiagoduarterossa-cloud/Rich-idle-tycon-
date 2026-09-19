import type { ReactElement } from 'react';

export type CoinTier = 'copper' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'mythic';
export type WatchStyle = 'digital' | 'diver' | 'chrono' | 'classic' | 'tank' | 'skeleton' | 'tonneau';
export type RarityTier = 'basic' | 'fine' | 'rare' | 'exquisite' | 'legendary' | 'mythic';
export type ArtworkKey =
  | 'street'
  | 'watercolor'
  | 'engraving'
  | 'sculpture'
  | 'pearlearring'
  | 'scream'
  | 'starrynight'
  | 'lasmeninas'
  | 'guernica'
  | 'creationofadam'
  | 'monalisa';

const COIN_COLORS: Record<CoinTier, [string, string]> = {
  copper: ['#f0a875', '#92400e'],
  silver: ['#e2e8f0', '#64748b'],
  gold: ['#fde68a', '#b45309'],
  platinum: ['#f1f5f9', '#475569'],
  diamond: ['#bae6fd', '#0369a1'],
  mythic: ['#f0abfc', '#7e22ce'],
};

export function CoinArt({ tier }: { tier: CoinTier }) {
  const [from, to] = COIN_COLORS[tier] ?? COIN_COLORS.copper;
  const gradId = `coin-${tier}`;
  const sparkly = tier === 'mythic' || tier === 'diamond';
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%">
      <defs>
        <radialGradient id={gradId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="46" fill={`url(#${gradId})`} stroke="rgba(0,0,0,0.25)" strokeWidth="2" />
      <circle cx="60" cy="60" r="36" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeDasharray="4 3" />
      <text x="60" y="72" textAnchor="middle" fontSize="34" fontWeight="800" fill="rgba(0,0,0,0.35)" fontFamily="Georgia, serif">
        $
      </text>
      {sparkly &&
        [[24, 26], [96, 30], [90, 96], [22, 90]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y - 5} L${x + 2} ${y} L${x} ${y + 5} L${x - 2} ${y} Z`} fill="white" opacity="0.9" />
        ))}
    </svg>
  );
}

function WatchHands({ hourAngle = -35, minAngle = 70 }: { hourAngle?: number; minAngle?: number }) {
  const hr = (hourAngle * Math.PI) / 180;
  const mr = (minAngle * Math.PI) / 180;
  return (
    <>
      <line x1="60" y1="70" x2={60 + Math.sin(hr) * 16} y2={70 - Math.cos(hr) * 16} stroke="#0f172a" strokeWidth="2.6" strokeLinecap="round" />
      <line x1="60" y1="70" x2={60 + Math.sin(mr) * 24} y2={70 - Math.cos(mr) * 24} stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      <circle cx="60" cy="70" r="3" fill="#0f172a" />
    </>
  );
}

function WatchTicks({ count, r1, r2, color = '#334155' }: { count: number; r1: number; r2: number; color?: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={60 + Math.sin(angle) * r1}
            y1={70 - Math.cos(angle) * r1}
            x2={60 + Math.sin(angle) * r2}
            y2={70 - Math.cos(angle) * r2}
            stroke={color}
            strokeWidth="1.6"
          />
        );
      })}
    </>
  );
}

export function WatchArt({ style }: { style: WatchStyle }) {
  const gradId = `watch-${style}`;

  if (style === 'digital') {
    return (
      <svg viewBox="0 0 120 140" width="100%" height="100%">
        <rect x="42" y="4" width="36" height="20" rx="4" fill="#1e293b" />
        <rect x="42" y="116" width="36" height="20" rx="4" fill="#1e293b" />
        <rect x="26" y="42" width="68" height="56" rx="10" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
        <rect x="36" y="54" width="48" height="30" rx="3" fill="#84cc16" opacity="0.85" />
        <text x="60" y="76" textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="monospace" fill="#0f172a">
          12:45
        </text>
        <circle cx="24" cy="60" r="4" fill="#334155" />
        <circle cx="24" cy="80" r="4" fill="#334155" />
        <circle cx="96" cy="70" r="4" fill="#334155" />
      </svg>
    );
  }

  if (style === 'diver') {
    return (
      <svg viewBox="0 0 120 140" width="100%" height="100%">
        <rect x="48" y="6" width="24" height="26" rx="6" fill="#1e293b" />
        <rect x="48" y="108" width="24" height="26" rx="6" fill="#1e293b" />
        <circle cx="60" cy="70" r="42" fill="#0f172a" stroke="#000" strokeWidth="2" />
        <circle cx="60" cy="70" r="36" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="2 4" />
        <circle cx="60" cy="70" r="28" fill="#0f172a" stroke="#1e293b" strokeWidth="1.5" />
        <WatchTicks count={12} r1={26} r2={22} color="#e2e8f0" />
        <path d="M60 44 L64 50 L56 50 Z" fill="#facc15" />
        <WatchHands hourAngle={-20} minAngle={110} />
        <circle cx="60" cy="70" r="3" fill="#facc15" />
      </svg>
    );
  }

  if (style === 'chrono') {
    return (
      <svg viewBox="0 0 120 140" width="100%" height="100%">
        <rect x="48" y="6" width="24" height="26" rx="6" fill="#334155" />
        <rect x="48" y="108" width="24" height="26" rx="6" fill="#334155" />
        <circle cx="60" cy="70" r="42" fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
        <circle cx="60" cy="70" r="36" fill="#f8fafc" />
        <WatchTicks count={60} r1={35} r2={33} color="#94a3b8" />
        <WatchTicks count={12} r1={35} r2={30} color="#1e293b" />
        <circle cx="60" cy="58" r="8" fill="none" stroke="#1e293b" strokeWidth="1.2" />
        <circle cx="48" cy="78" r="8" fill="none" stroke="#1e293b" strokeWidth="1.2" />
        <circle cx="72" cy="78" r="8" fill="none" stroke="#1e293b" strokeWidth="1.2" />
        <WatchHands hourAngle={20} minAngle={140} />
      </svg>
    );
  }

  if (style === 'classic') {
    return (
      <svg viewBox="0 0 120 140" width="100%" height="100%">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
        </defs>
        <rect x="48" y="6" width="24" height="26" rx="6" fill="#1e293b" />
        <rect x="48" y="108" width="24" height="26" rx="6" fill="#1e293b" />
        <circle cx="60" cy="70" r="42" fill={`url(#${gradId})`} stroke="rgba(0,0,0,0.35)" strokeWidth="2.5" />
        <circle cx="60" cy="70" r="42" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeDasharray="1.5 3" />
        <circle cx="60" cy="70" r="31" fill="#0f172a" />
        <WatchTicks count={12} r1={28} r2={24} color="#fde68a" />
        <rect x="72" y="67" width="7" height="6" fill="#0f172a" stroke="#fde68a" strokeWidth="0.6" />
        <WatchHands hourAngle={-60} minAngle={30} />
      </svg>
    );
  }

  if (style === 'tank') {
    return (
      <svg viewBox="0 0 120 140" width="100%" height="100%">
        <rect x="50" y="6" width="20" height="24" rx="4" fill="#78350f" />
        <rect x="50" y="110" width="20" height="24" rx="4" fill="#78350f" />
        <rect x="34" y="36" width="52" height="68" rx="6" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
        <rect x="42" y="44" width="36" height="52" fill="none" stroke="#334155" strokeWidth="1" />
        {['XII', 'III', 'VI', 'IX'].map((num, i) => {
          const positions = [
            [60, 50],
            [72, 70],
            [60, 90],
            [48, 70],
          ];
          const [x, y] = positions[i];
          return (
            <text key={num} x={x} y={y + 3} textAnchor="middle" fontSize="8" fill="#1e293b" fontFamily="serif">
              {num}
            </text>
          );
        })}
        <line x1="60" y1="70" x2="60" y2="56" stroke="#1e3a8a" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="60" y1="70" x2="72" y2="70" stroke="#1e3a8a" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="60" cy="70" r="2.2" fill="#1e3a8a" />
      </svg>
    );
  }

  if (style === 'skeleton') {
    return (
      <svg viewBox="0 0 120 140" width="100%" height="100%">
        <rect x="48" y="6" width="24" height="26" rx="6" fill="#1e293b" />
        <rect x="48" y="108" width="24" height="26" rx="6" fill="#1e293b" />
        <circle cx="60" cy="70" r="42" fill="#0f172a" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="60" cy="70" r="34" fill="none" stroke="#cbd5e1" strokeWidth="1" />
        <circle cx="52" cy="62" r="9" fill="none" stroke="#94a3b8" strokeWidth="1.4" />
        <circle cx="70" cy="78" r="6" fill="none" stroke="#94a3b8" strokeWidth="1.4" />
        <circle cx="70" cy="58" r="5" fill="none" stroke="#94a3b8" strokeWidth="1.4" />
        <line x1="52" y1="62" x2="70" y2="78" stroke="#94a3b8" strokeWidth="1" />
        <line x1="52" y1="62" x2="70" y2="58" stroke="#94a3b8" strokeWidth="1" />
        <WatchTicks count={12} r1={34} r2={30} color="#e2e8f0" />
        <WatchHands hourAngle={80} minAngle={200} />
      </svg>
    );
  }

  // tonneau (Richard Mille style)
  return (
    <svg viewBox="0 0 120 140" width="100%" height="100%">
      <rect x="46" y="4" width="28" height="20" rx="8" fill="#0f172a" />
      <rect x="46" y="116" width="28" height="20" rx="8" fill="#0f172a" />
      <path
        d="M40 30 Q60 22 80 30 Q92 48 92 70 Q92 92 80 110 Q60 118 40 110 Q28 92 28 70 Q28 48 40 30 Z"
        fill="#111827"
        stroke="#ef4444"
        strokeWidth="3"
      />
      <path
        d="M46 38 Q60 32 74 38 Q83 50 83 70 Q83 90 74 102 Q60 108 46 102 Q37 90 37 70 Q37 50 46 38 Z"
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="1"
        opacity="0.6"
      />
      <rect x="52" y="52" width="16" height="36" fill="none" stroke="#e2e8f0" strokeWidth="1.4" opacity="0.8" />
      <rect x="44" y="60" width="8" height="20" fill="none" stroke="#e2e8f0" strokeWidth="1" opacity="0.6" />
      <rect x="68" y="60" width="8" height="20" fill="none" stroke="#e2e8f0" strokeWidth="1" opacity="0.6" />
      <line x1="60" y1="70" x2="60" y2="56" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="70" x2="70" y2="78" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="24" cy="70" r="3" fill="#ef4444" />
    </svg>
  );
}

const WINE_PALETTE: Record<RarityTier, { glass: string; label: string; accent: string }> = {
  basic: { glass: '#166534', label: '#f5f5f4', accent: '#a3a3a3' },
  fine: { glass: '#3f6212', label: '#fef9c3', accent: '#a16207' },
  rare: { glass: '#7f1d1d', label: '#fee2e2', accent: '#b91c1c' },
  exquisite: { glass: '#450a0a', label: '#fef3c7', accent: '#b45309' },
  legendary: { glass: '#1e1b4b', label: '#f5f3ff', accent: '#c4b5fd' },
  mythic: { glass: '#0c0a1a', label: '#fbcfe8', accent: '#e879f9' },
};

export function WineArt({ tier }: { tier: RarityTier }) {
  const p = WINE_PALETTE[tier] ?? WINE_PALETTE.basic;
  const fancy = tier === 'exquisite' || tier === 'legendary' || tier === 'mythic';
  return (
    <svg viewBox="0 0 120 140" width="100%" height="100%">
      <ellipse cx="60" cy="130" rx="26" ry="5" fill="rgba(15,23,42,0.12)" />
      <rect x="54" y="10" width="12" height="22" rx="2" fill={p.glass} />
      <path d="M50 30 L70 30 L76 58 L76 122 Q76 128 70 128 L50 128 Q44 128 44 122 L44 58 Z" fill={p.glass} stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" />
      <rect x="46" y="66" width="28" height="38" rx="2" fill={p.label} stroke={p.accent} strokeWidth="1.4" />
      <line x1="50" y1="76" x2="70" y2="76" stroke={p.accent} strokeWidth="1" />
      <line x1="50" y1="94" x2="70" y2="94" stroke={p.accent} strokeWidth="1" />
      {fancy && <circle cx="60" cy="85" r="6" fill="none" stroke={p.accent} strokeWidth="1.2" />}
      {tier === 'mythic' && (
        <>
          <circle cx="60" cy="85" r="3" fill={p.accent} />
          <path d="M40 58 L80 58" stroke={p.accent} strokeWidth="1" opacity="0.6" />
        </>
      )}
      {(tier === 'legendary' || tier === 'mythic') && <rect x="48" y="56" width="24" height="6" rx="2" fill={p.accent} opacity="0.85" />}
    </svg>
  );
}

interface ArtworkSpec {
  bg: [string, string];
  render: () => ReactElement;
}

const ARTWORK_SPECS: Record<ArtworkKey, ArtworkSpec> = {
  street: {
    bg: ['#fde68a', '#f97316'],
    render: () => (
      <>
        <circle cx="45" cy="50" r="14" fill="rgba(255,255,255,0.3)" />
        <path d="M18 90 L45 62 L62 80 L78 55 L100 90 Z" fill="rgba(15,23,42,0.3)" />
      </>
    ),
  },
  watercolor: {
    bg: ['#a7f3d0', '#0ea5e9'],
    render: () => (
      <>
        <circle cx="40" cy="45" r="18" fill="rgba(255,255,255,0.25)" />
        <circle cx="75" cy="70" r="14" fill="rgba(255,255,255,0.2)" />
        <path d="M14 95 Q60 70 106 95" stroke="rgba(255,255,255,0.4)" strokeWidth="4" fill="none" />
      </>
    ),
  },
  engraving: {
    bg: ['#e2e8f0', '#64748b'],
    render: () => (
      <>
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={18} y1={20 + i * 10} x2={102} y2={20 + i * 10} stroke="#1e293b" strokeWidth="0.6" opacity="0.5" />
        ))}
        <circle cx="60" cy="60" r="24" fill="none" stroke="#1e293b" strokeWidth="1.5" />
      </>
    ),
  },
  sculpture: {
    bg: ['#fbcfe8', '#d946ef'],
    render: () => (
      <>
        <ellipse cx="60" cy="95" rx="26" ry="8" fill="rgba(15,23,42,0.25)" />
        <path d="M46 95 L46 55 Q46 35 60 35 Q74 35 74 55 L74 95 Z" fill="rgba(255,255,255,0.55)" />
      </>
    ),
  },
  pearlearring: {
    bg: ['#0c4a6e', '#075985'],
    render: () => (
      <>
        <path d="M60 30 Q40 40 42 70 Q44 95 60 100 Q76 95 78 70 Q80 40 60 30 Z" fill="#1e3a5f" />
        <path d="M50 32 Q60 20 78 40 Q86 55 80 65 L60 40 Z" fill="#eab308" opacity="0.9" />
        <circle cx="72" cy="72" r="5" fill="#f8fafc" opacity="0.9" />
      </>
    ),
  },
  scream: {
    bg: ['#f97316', '#7c2d12'],
    render: () => (
      <>
        <path d="M10 100 Q40 60 60 100 Q80 60 110 100" stroke="#fde68a" strokeWidth="5" fill="none" opacity="0.7" />
        <ellipse cx="60" cy="72" rx="16" ry="22" fill="#e2e8f0" />
        <circle cx="53" cy="68" r="4" fill="#1e293b" />
        <circle cx="67" cy="68" r="4" fill="#1e293b" />
        <ellipse cx="60" cy="84" rx="7" ry="9" fill="#1e293b" />
      </>
    ),
  },
  starrynight: {
    bg: ['#1e3a8a', '#0f172a'],
    render: () => (
      <>
        <circle cx="80" cy="30" r="12" fill="#fde68a" opacity="0.9" />
        {[[20, 25], [45, 18], [95, 55], [30, 60]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#fef9c3" opacity="0.9" />
        ))}
        <path d="M10 105 Q30 60 20 30" stroke="#166534" strokeWidth="6" fill="none" />
        <path d="M0 108 Q60 85 120 108" fill="#1e293b" />
      </>
    ),
  },
  lasmeninas: {
    bg: ['#78350f', '#1c1917'],
    render: () => (
      <>
        <rect x="24" y="30" width="20" height="60" fill="rgba(255,255,255,0.15)" />
        <circle cx="34" cy="45" r="8" fill="rgba(255,255,255,0.35)" />
        <rect x="60" y="40" width="16" height="50" fill="rgba(255,255,255,0.1)" />
        <circle cx="68" cy="52" r="7" fill="rgba(255,255,255,0.3)" />
      </>
    ),
  },
  guernica: {
    bg: ['#e5e7eb', '#374151'],
    render: () => (
      <>
        <path d="M20 90 L40 60 L55 90 Z" fill="#111827" />
        <path d="M65 90 L85 55 L100 90 Z" fill="#4b5563" />
        <circle cx="60" cy="35" r="8" fill="#f3f4f6" />
      </>
    ),
  },
  creationofadam: {
    bg: ['#fde68a', '#b45309'],
    render: () => (
      <>
        <path d="M20 60 Q45 55 60 62" stroke="#78350f" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M100 55 Q78 50 65 60" stroke="#f5deb3" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="61" cy="61" r="2.4" fill="#1e293b" />
      </>
    ),
  },
  monalisa: {
    bg: ['#78350f', '#451a03'],
    render: () => (
      <>
        <path d="M60 25 Q40 30 40 55 Q40 85 60 95 Q80 85 80 55 Q80 30 60 25 Z" fill="#d6b88a" />
        <path d="M40 40 Q38 60 44 78 M80 40 Q82 60 76 78" stroke="#2e1a05" strokeWidth="6" fill="none" opacity="0.85" />
        <path d="M50 68 Q60 74 70 68" stroke="#5c3a21" strokeWidth="2" fill="none" />
      </>
    ),
  },
};

export function ArtworkArt({ artKey }: { artKey: ArtworkKey }) {
  const spec = ARTWORK_SPECS[artKey] ?? ARTWORK_SPECS.street;
  const gradId = `art-${artKey}`;
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={spec.bg[0]} />
          <stop offset="100%" stopColor={spec.bg[1]} />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="104" height="104" rx="4" fill="#292524" />
      <rect x="10" y="10" width="100" height="100" rx="3" fill="#78716c" />
      <rect x="16" y="16" width="88" height="88" fill={`url(#${gradId})`} />
      <g>{spec.render()}</g>
    </svg>
  );
}
