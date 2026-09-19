export type CoinTier = 'copper' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'mythic';
export type WatchTier = 'basic' | 'steel' | 'gold' | 'diamond' | 'mythic';
export type ArtTier = 'basic' | 'fine' | 'rare' | 'exquisite' | 'legendary' | 'mythic';

const COIN_COLORS: Record<CoinTier, [string, string]> = {
  copper: ['#f0a875', '#92400e'],
  silver: ['#e2e8f0', '#64748b'],
  gold: ['#fde68a', '#b45309'],
  platinum: ['#f1f5f9', '#475569'],
  diamond: ['#bae6fd', '#0369a1'],
  mythic: ['#f0abfc', '#7e22ce'],
};

export function CoinArt({ tier }: { tier: CoinTier }) {
  const [from, to] = COIN_COLORS[tier];
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
          <path
            key={i}
            d={`M${x} ${y - 5} L${x + 2} ${y} L${x} ${y + 5} L${x - 2} ${y} Z`}
            fill="white"
            opacity="0.9"
          />
        ))}
    </svg>
  );
}

const WATCH_COLORS: Record<WatchTier, [string, string]> = {
  basic: ['#cbd5e1', '#475569'],
  steel: ['#e2e8f0', '#334155'],
  gold: ['#fde68a', '#92400e'],
  diamond: ['#e0f2fe', '#0369a1'],
  mythic: ['#f5d0fe', '#6b21a8'],
};

export function WatchArt({ tier }: { tier: WatchTier }) {
  const [from, to] = WATCH_COLORS[tier];
  const gradId = `watch-${tier}`;
  const gems = tier === 'diamond' || tier === 'mythic';
  return (
    <svg viewBox="0 0 120 140" width="100%" height="100%">
      <defs>
        <radialGradient id={gradId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </radialGradient>
      </defs>
      <rect x="48" y="6" width="24" height="26" rx="6" fill="#1e293b" />
      <rect x="48" y="108" width="24" height="26" rx="6" fill="#1e293b" />
      <circle cx="60" cy="70" r="42" fill={`url(#${gradId})`} stroke="rgba(0,0,0,0.3)" strokeWidth="3" />
      <circle cx="60" cy="70" r="30" fill="#fdfdfd" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x1 = 60 + Math.sin(angle) * 26;
        const y1 = 70 - Math.cos(angle) * 26;
        const x2 = 60 + Math.sin(angle) * 21;
        const y2 = 70 - Math.cos(angle) * 21;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth="1.6" />;
      })}
      <line x1="60" y1="70" x2="60" y2="50" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="60" y1="70" x2="76" y2="76" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="60" cy="70" r="3" fill="#0f172a" />
      {gems &&
        [0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = 60 + Math.sin(rad) * 40;
          const y = 70 - Math.cos(rad) * 40;
          return <circle key={deg} cx={x} cy={y} r="2.4" fill="#e0f2fe" stroke="#0369a1" strokeWidth="0.5" />;
        })}
    </svg>
  );
}

const ART_COLORS: Record<ArtTier, [string, string, string]> = {
  basic: ['#fde68a', '#f97316', '#7c2d12'],
  fine: ['#a7f3d0', '#0ea5e9', '#0c4a6e'],
  rare: ['#fbcfe8', '#d946ef', '#701a75'],
  exquisite: ['#fef08a', '#f59e0b', '#78350f'],
  legendary: ['#c4b5fd', '#7c3aed', '#4c1d95'],
  mythic: ['#67e8f9', '#a855f7', '#312e81'],
};

export function ArtworkArt({ tier }: { tier: ArtTier }) {
  const [a, b, c] = ART_COLORS[tier];
  const gradId = `art-${tier}`;
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="50%" stopColor={b} />
          <stop offset="100%" stopColor={c} />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="100" height="100" rx="4" fill="#1e1b4b" />
      <rect x="18" y="18" width="84" height="84" fill={`url(#${gradId})`} />
      <circle cx="45" cy="50" r="16" fill="rgba(255,255,255,0.25)" />
      <path d="M18 90 L45 60 L65 78 L80 55 L102 90 Z" fill="rgba(15,23,42,0.35)" />
    </svg>
  );
}
