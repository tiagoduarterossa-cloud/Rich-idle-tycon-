export type CarVariant = 'compact' | 'sedan' | 'suv' | 'sports' | 'super' | 'hyper' | 'concept' | 'alien';
export type BoatVariant =
  | 'kayak'
  | 'motorboat'
  | 'speedboat'
  | 'sailboat'
  | 'yacht'
  | 'superyacht'
  | 'megayacht'
  | 'floatingcity';
export type PlaneVariant =
  | 'ultralight'
  | 'touring'
  | 'helicopter'
  | 'lightjet'
  | 'longrange'
  | 'airliner'
  | 'supersonic'
  | 'spacestation';

function toPath(points: number[][]): string {
  return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ') + ' Z';
}

interface CarShape {
  body: number[][];
  window: number[][];
  wheels: [number, number];
  colors: [string, string];
  spoiler?: boolean;
}

const CAR_SHAPES: Record<Exclude<CarVariant, 'alien'>, CarShape> = {
  compact: {
    body: [
      [22, 100], [24, 74], [46, 54], [72, 45], [120, 43], [150, 45], [170, 57], [198, 63], [212, 73], [214, 100],
    ],
    window: [[58, 52], [78, 47], [122, 46], [148, 52], [146, 62], [60, 62]],
    wheels: [64, 186],
    colors: ['#38bdf8', '#0369a1'],
  },
  sedan: {
    body: [
      [18, 100], [20, 80], [40, 62], [64, 52], [96, 48], [120, 48], [128, 52], [150, 52], [178, 60], [206, 72], [216, 82], [218, 100],
    ],
    window: [[48, 54], [70, 50], [118, 49], [140, 53], [160, 60], [60, 66]],
    wheels: [58, 196],
    colors: ['#94a3b8', '#334155'],
  },
  suv: {
    body: [
      [18, 100], [18, 62], [36, 50], [60, 44], [150, 44], [180, 50], [206, 60], [214, 68], [220, 100],
    ],
    window: [[46, 50], [66, 46], [150, 46], [182, 52], [198, 60], [46, 60]],
    wheels: [56, 198],
    colors: ['#475569', '#1e293b'],
  },
  sports: {
    body: [
      [14, 100], [16, 88], [40, 72], [64, 58], [96, 52], [130, 52], [158, 58], [190, 68], [214, 80], [222, 92], [224, 100],
    ],
    window: [[54, 58], [80, 52], [126, 52], [156, 60], [176, 70], [70, 70]],
    wheels: [56, 200],
    colors: ['#ef4444', '#7f1d1d'],
  },
  super: {
    body: [
      [10, 100], [14, 92], [34, 80], [56, 66], [84, 56], [120, 54], [150, 56], [178, 64], [206, 76], [224, 88], [228, 100],
    ],
    window: [[58, 60], [86, 56], [140, 56], [170, 64], [188, 74], [76, 74]],
    wheels: [52, 204],
    colors: ['#facc15', '#92400e'],
    spoiler: true,
  },
  hyper: {
    body: [
      [8, 100], [12, 94], [30, 84], [50, 72], [76, 60], [110, 54], [140, 54], [166, 60], [192, 70], [214, 82], [230, 94], [232, 100],
    ],
    window: [[60, 62], [90, 56], [140, 56], [172, 64], [196, 76], [84, 76]],
    wheels: [48, 208],
    colors: ['#a855f7', '#4c1d95'],
    spoiler: true,
  },
  concept: {
    body: [
      [20, 100], [22, 80], [30, 64], [46, 54], [66, 47], [90, 44], [130, 44], [160, 47], [184, 54], [202, 64], [212, 80], [216, 100],
    ],
    window: [[54, 52], [80, 46], [140, 46], [170, 52], [190, 64], [66, 64]],
    wheels: [60, 190],
    colors: ['#22d3ee', '#0e7490'],
  },
};

function Wheel({ cx }: { cx: number }) {
  return (
    <g>
      <circle cx={cx} cy="100" r="16" fill="#0f172a" />
      <circle cx={cx} cy="100" r="7" fill="#94a3b8" />
    </g>
  );
}

export function CarArt({ variant }: { variant: CarVariant }) {
  const gradId = `car-${variant}`;

  if (variant === 'alien') {
    return (
      <svg viewBox="0 0 240 130" width="100%" height="100%">
        <defs>
          <radialGradient id="alien-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>
        </defs>
        <ellipse cx="120" cy="104" rx="90" ry="16" fill="url(#alien-glow)" />
        <ellipse cx="120" cy="84" rx="95" ry="16" fill={`url(#${gradId})`} stroke="#2e1065" strokeWidth="1.5" />
        <ellipse cx="120" cy="66" rx="42" ry="22" fill="#a7f3d0" opacity="0.7" />
        <ellipse cx="120" cy="66" rx="42" ry="22" fill="none" stroke="#2e1065" strokeWidth="1.5" />
        {[-70, -35, 0, 35, 70].map((dx) => (
          <circle key={dx} cx={120 + dx} cy="90" r="3.5" fill="#5eead4" />
        ))}
      </svg>
    );
  }

  const cfg = CAR_SHAPES[variant as Exclude<CarVariant, 'alien'>];
  return (
    <svg viewBox="0 0 240 130" width="100%" height="100%">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cfg.colors[0]} />
          <stop offset="100%" stopColor={cfg.colors[1]} />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="110" rx="98" ry="7" fill="rgba(15,23,42,0.15)" />
      {cfg.spoiler && (
        <>
          <rect x={cfg.wheels[1] - 6} y="40" width="34" height="7" rx="2" fill="#1f2937" />
          <rect x={cfg.wheels[1] - 4} y="47" width="4" height="14" fill="#1f2937" />
          <rect x={cfg.wheels[1] + 18} y="47" width="4" height="14" fill="#1f2937" />
        </>
      )}
      <path d={toPath(cfg.body)} fill={`url(#${gradId})`} stroke="rgba(15,23,42,0.3)" strokeWidth="1.5" />
      <path d={toPath(cfg.window)} fill="#cfe8ff" opacity="0.88" />
      <Wheel cx={cfg.wheels[0]} />
      <Wheel cx={cfg.wheels[1]} />
    </svg>
  );
}

export function BoatArt({ variant }: { variant: BoatVariant }) {
  const grad = `boat-${variant}`;

  switch (variant) {
    case 'kayak':
      return (
        <svg viewBox="0 0 240 130" width="100%" height="100%">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
          </defs>
          <ellipse cx="120" cy="104" rx="90" ry="6" fill="rgba(15,23,42,0.1)" />
          <path d={toPath([[20, 98], [60, 90], [180, 90], [220, 98], [180, 104], [60, 104]])} fill={`url(#${grad})`} stroke="#78350f" strokeWidth="1.5" />
          <line x1="70" y1="70" x2="170" y2="86" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'motorboat':
      return (
        <svg viewBox="0 0 240 130" width="100%" height="100%">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>
          </defs>
          <ellipse cx="120" cy="106" rx="95" ry="6" fill="rgba(15,23,42,0.12)" />
          <path d={toPath([[16, 100], [30, 88], [190, 88], [216, 98], [216, 104], [16, 104]])} fill={`url(#${grad})`} stroke="#0c4a6e" strokeWidth="1.5" />
          <path d={toPath([[140, 70], [168, 70], [172, 88], [136, 88]])} fill="#e0f2fe" stroke="#0c4a6e" strokeWidth="1.2" />
        </svg>
      );
    case 'speedboat':
      return (
        <svg viewBox="0 0 240 130" width="100%" height="100%">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>
          </defs>
          <ellipse cx="120" cy="106" rx="98" ry="6" fill="rgba(15,23,42,0.12)" />
          <path d={toPath([[12, 100], [26, 84], [70, 78], [190, 80], [220, 94], [220, 102], [12, 104]])} fill={`url(#${grad})`} stroke="#450a0a" strokeWidth="1.5" />
          <path d={toPath([[92, 58], [128, 58], [132, 80], [88, 80]])} fill="#fee2e2" opacity="0.9" />
          <line x1="16" y1="102" x2="4" y2="96" stroke="#fca5a5" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </svg>
      );
    case 'sailboat':
      return (
        <svg viewBox="0 0 240 130" width="100%" height="100%">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <ellipse cx="120" cy="106" rx="90" ry="6" fill="rgba(15,23,42,0.12)" />
          <path d={toPath([[30, 100], [50, 92], [190, 92], [210, 100], [210, 104], [30, 104]])} fill={`url(#${grad})`} stroke="#1e293b" strokeWidth="1.5" />
          <line x1="120" y1="92" x2="120" y2="22" stroke="#78350f" strokeWidth="3" />
          <path d={toPath([[121, 26], [121, 90], [184, 90]])} fill="#fefce8" stroke="#78350f" strokeWidth="1" />
          <path d={toPath([[118, 40], [118, 90], [78, 88]])} fill="#fff7ed" stroke="#78350f" strokeWidth="1" />
        </svg>
      );
    case 'yacht':
      return (
        <svg viewBox="0 0 240 130" width="100%" height="100%">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>
          <ellipse cx="120" cy="108" rx="100" ry="7" fill="rgba(15,23,42,0.14)" />
          <path d={toPath([[14, 100], [24, 86], [216, 86], [224, 98], [224, 104], [14, 104]])} fill={`url(#${grad})`} stroke="#0f172a" strokeWidth="1.5" />
          <rect x="60" y="58" width="130" height="28" rx="4" fill="#dbeafe" stroke="#1e3a8a" strokeWidth="1.2" />
          <rect x="100" y="40" width="60" height="18" rx="3" fill="#eff6ff" stroke="#1e3a8a" strokeWidth="1.2" />
          <line x1="130" y1="40" x2="130" y2="24" stroke="#1e3a8a" strokeWidth="2" />
          {[80, 105, 130, 155, 175].map((x) => (
            <circle key={x} cx={x} cy="72" r="3" fill="#1e3a8a" />
          ))}
        </svg>
      );
    case 'superyacht':
      return (
        <svg viewBox="0 0 240 130" width="100%" height="100%">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <ellipse cx="120" cy="108" rx="106" ry="7" fill="rgba(15,23,42,0.16)" />
          <path d={toPath([[10, 100], [20, 84], [230, 84], [238, 96], [238, 104], [10, 104]])} fill={`url(#${grad})`} stroke="#0f172a" strokeWidth="1.5" />
          <rect x="40" y="60" width="170" height="24" rx="4" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.2" />
          <rect x="70" y="42" width="110" height="18" rx="3" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.2" />
          <rect x="100" y="28" width="50" height="14" rx="3" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.2" />
          <circle cx="125" cy="24" r="9" fill="none" stroke="#0f172a" strokeWidth="1.5" />
          <line x1="125" y1="24" x2="125" y2="17" stroke="#0f172a" strokeWidth="1.5" />
          <line x1="118" y1="18" x2="132" y2="18" stroke="#0f172a" strokeWidth="1.5" />
        </svg>
      );
    case 'megayacht':
      return (
        <svg viewBox="0 0 240 130" width="100%" height="100%">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fefce8" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <ellipse cx="120" cy="110" rx="112" ry="8" fill="rgba(15,23,42,0.18)" />
          <path d={toPath([[6, 100], [16, 80], [234, 80], [244, 94], [244, 104], [6, 104]])} fill={`url(#${grad})`} stroke="#78350f" strokeWidth="1.5" />
          <rect x="30" y="58" width="185" height="22" rx="4" fill="#fef3c7" stroke="#78350f" strokeWidth="1.2" />
          <rect x="55" y="40" width="120" height="18" rx="3" fill="#fffbeb" stroke="#78350f" strokeWidth="1.2" />
          <rect x="150" y="44" width="26" height="12" rx="2" fill="#60a5fa" opacity="0.8" />
          <rect x="85" y="26" width="60" height="14" rx="3" fill="#fffbeb" stroke="#78350f" strokeWidth="1.2" />
          <circle cx="110" cy="22" r="8" fill="none" stroke="#78350f" strokeWidth="1.5" />
        </svg>
      );
    case 'floatingcity':
      return (
        <svg viewBox="0 0 240 130" width="100%" height="100%">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <ellipse cx="120" cy="112" rx="118" ry="8" fill="rgba(15,23,42,0.2)" />
          <path d={toPath([[4, 100], [20, 88], [220, 88], [236, 100], [236, 106], [4, 106]])} fill={`url(#${grad})`} stroke="#312e81" strokeWidth="1.5" />
          {[
            [30, 88, 18, 26],
            [58, 88, 22, 40],
            [90, 88, 20, 50],
            [122, 88, 26, 60],
            [158, 88, 20, 44],
            [188, 88, 18, 30],
          ].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y - h} width={w} height={h} rx="2" fill="#e0e7ff" opacity={0.9 - i * 0.05} />
          ))}
          <circle cx="120" cy="30" r="10" fill="#f0abfc" opacity="0.8" />
        </svg>
      );
  }
}

export function PlaneArt({ variant }: { variant: PlaneVariant }) {
  const grad = `plane-${variant}`;

  switch (variant) {
    case 'ultralight':
      return (
        <svg viewBox="0 0 240 130" width="100%" height="100%">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>
          <path d={toPath([[30, 70], [200, 66], [220, 68], [200, 72], [30, 74]])} fill={`url(#${grad})`} stroke="#451a03" strokeWidth="1.2" />
          <rect x="70" y="50" width="100" height="8" rx="2" fill="#fde68a" stroke="#451a03" strokeWidth="1" />
          <line x1="90" y1="58" x2="80" y2="72" stroke="#451a03" strokeWidth="1.5" />
          <line x1="150" y1="58" x2="160" y2="72" stroke="#451a03" strokeWidth="1.5" />
          <path d={toPath([[196, 60], [214, 66], [196, 72]])} fill="#fde68a" stroke="#451a03" strokeWidth="1" />
          <circle cx="26" cy="71" r="7" fill="#451a03" opacity="0.8" />
        </svg>
      );
    case 'touring':
      return (
        <svg viewBox="0 0 240 130" width="100%" height="100%">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
          <path d={toPath([[20, 68], [60, 60], [190, 60], [215, 66], [215, 72], [60, 76], [20, 72]])} fill={`url(#${grad})`} stroke="#1e3a8a" strokeWidth="1.2" />
          <rect x="90" y="42" width="80" height="9" rx="2" fill="#dbeafe" stroke="#1e3a8a" strokeWidth="1" />
          <path d={toPath([[198, 60], [214, 50], [214, 66]])} fill="#dbeafe" stroke="#1e3a8a" strokeWidth="1" />
          <circle cx="30" cy="70" r="6" fill="#1e3a8a" opacity="0.8" />
        </svg>
      );
    case 'helicopter':
      return (
        <svg viewBox="0 0 240 130" width="100%" height="100%">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <path d={toPath([[40, 70], [70, 58], [140, 56], [170, 64], [170, 78], [120, 84], [60, 82]])} fill={`url(#${grad})`} stroke="#020617" strokeWidth="1.2" />
          <rect x="140" y="68" width="80" height="7" rx="3" fill="#334155" stroke="#020617" strokeWidth="1" />
          <circle cx="216" cy="71" r="5" fill="#1e293b" stroke="#020617" strokeWidth="1" />
          <line x1="50" y1="40" x2="190" y2="40" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          <circle cx="120" cy="40" r="4" fill="#1e293b" />
          <ellipse cx="95" cy="66" rx="22" ry="14" fill="#bae6fd" opacity="0.8" />
        </svg>
      );
    case 'lightjet':
      return (
        <svg viewBox="0 0 240 130" width="100%" height="100%">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <path d={toPath([[20, 72], [50, 62], [190, 62], [220, 70], [220, 76], [50, 78]])} fill={`url(#${grad})`} stroke="#0f172a" strokeWidth="1.2" />
          <path d={toPath([[100, 76], [150, 76], [180, 98], [130, 98]])} fill="#cbd5e1" stroke="#0f172a" strokeWidth="1" />
          <path d={toPath([[196, 62], [214, 42], [214, 62]])} fill="#cbd5e1" stroke="#0f172a" strokeWidth="1" />
          {[70, 90, 110, 130, 150, 170].map((x) => (
            <circle key={x} cx={x} cy="68" r="1.6" fill="#334155" />
          ))}
        </svg>
      );
    case 'longrange':
      return (
        <svg viewBox="0 0 240 130" width="100%" height="100%">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>
          <path d={toPath([[14, 72], [50, 58], [200, 58], [228, 68], [228, 78], [50, 82]])} fill={`url(#${grad})`} stroke="#1e293b" strokeWidth="1.2" />
          <path d={toPath([[90, 78], [160, 78], [196, 102], [128, 102]])} fill="#dbeafe" stroke="#1e293b" strokeWidth="1" />
          <ellipse cx="130" cy="94" rx="10" ry="5" fill="#334155" />
          <ellipse cx="165" cy="98" rx="9" ry="4.5" fill="#334155" />
          <path d={toPath([[204, 58], [222, 36], [222, 58]])} fill="#dbeafe" stroke="#1e293b" strokeWidth="1" />
        </svg>
      );
    case 'airliner':
      return (
        <svg viewBox="0 0 240 130" width="100%" height="100%">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>
          <path d={toPath([[10, 74], [50, 56], [210, 56], [234, 66], [234, 80], [50, 86]])} fill={`url(#${grad})`} stroke="#1e3a8a" strokeWidth="1.2" />
          <path d={toPath([[70, 82], [160, 82], [200, 108], [120, 108]])} fill="#bfdbfe" stroke="#1e3a8a" strokeWidth="1" />
          <line x1="20" y1="70" x2="226" y2="70" stroke="#1e40af" strokeWidth="2.5" opacity="0.5" />
          {[40, 60, 80, 100, 120, 140, 160, 180, 200].map((x) => (
            <circle key={x} cx={x} cy="65" r="1.8" fill="#1e3a8a" />
          ))}
          <path d={toPath([[214, 56], [232, 32], [232, 56]])} fill="#bfdbfe" stroke="#1e3a8a" strokeWidth="1" />
        </svg>
      );
    case 'supersonic':
      return (
        <svg viewBox="0 0 240 130" width="100%" height="100%">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <path d={toPath([[6, 72], [40, 68], [210, 68], [232, 72], [210, 76], [40, 76]])} fill={`url(#${grad})`} stroke="#1e293b" strokeWidth="1.2" />
          <path d={toPath([[90, 76], [190, 76], [150, 104]])} fill="#94a3b8" stroke="#1e293b" strokeWidth="1" />
          <path d={toPath([[10, 70], [40, 69], [40, 75], [10, 74]])} fill="#334155" />
        </svg>
      );
    case 'spacestation':
      return (
        <svg viewBox="0 0 240 130" width="100%" height="100%">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <linearGradient id="solar-panel" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>
          </defs>
          {[[30, 30], [190, 90], [60, 100], [170, 20], [110, 15]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.4" fill="#e2e8f0" opacity="0.8" />
          ))}
          <rect x="18" y="52" width="42" height="32" fill="url(#solar-panel)" stroke="#c7d2fe" strokeWidth="1" />
          <line x1="18" y1="60" x2="60" y2="60" stroke="#c7d2fe" strokeWidth="0.6" />
          <line x1="18" y1="68" x2="60" y2="68" stroke="#c7d2fe" strokeWidth="0.6" />
          <line x1="18" y1="76" x2="60" y2="76" stroke="#c7d2fe" strokeWidth="0.6" />
          <rect x="180" y="52" width="42" height="32" fill="url(#solar-panel)" stroke="#c7d2fe" strokeWidth="1" />
          <line x1="180" y1="60" x2="222" y2="60" stroke="#c7d2fe" strokeWidth="0.6" />
          <line x1="180" y1="68" x2="222" y2="68" stroke="#c7d2fe" strokeWidth="0.6" />
          <line x1="180" y1="76" x2="222" y2="76" stroke="#c7d2fe" strokeWidth="0.6" />
          <line x1="60" y1="68" x2="90" y2="68" stroke="#cbd5e1" strokeWidth="3" />
          <line x1="150" y1="68" x2="180" y2="68" stroke="#cbd5e1" strokeWidth="3" />
          <rect x="90" y="58" width="24" height="20" rx="4" fill={`url(#${grad})`} stroke="#334155" strokeWidth="1" />
          <circle cx="120" cy="68" r="20" fill={`url(#${grad})`} stroke="#334155" strokeWidth="1.2" />
          <rect x="126" y="58" width="24" height="20" rx="4" fill={`url(#${grad})`} stroke="#334155" strokeWidth="1" />
          <circle cx="120" cy="68" r="6" fill="#0f172a" opacity="0.5" />
        </svg>
      );
  }
}
