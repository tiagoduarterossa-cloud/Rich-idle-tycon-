export type ResidenceVariant = 'parents' | 'studio' | 'apartment' | 'house' | 'villa' | 'mansion' | 'palace' | 'island';

function Ground() {
  return <ellipse cx="110" cy="122" rx="95" ry="8" fill="rgba(15,23,42,0.12)" />;
}

function WindowGrid({ x, y, cols, rows, w = 10, h = 10, gap = 6 }: { x: number; y: number; cols: number; rows: number; w?: number; h?: number; gap?: number }) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push(<rect key={`${r}-${c}`} x={x + c * (w + gap)} y={y + r * (h + gap)} width={w} height={h} rx="1.5" fill="#bae6fd" opacity="0.9" />);
    }
  }
  return <>{cells}</>;
}

export function ResidenceArt({ variant }: { variant: ResidenceVariant }) {
  switch (variant) {
    case 'parents':
      return (
        <svg viewBox="0 0 220 140" width="100%" height="100%">
          <Ground />
          <rect x="60" y="60" width="90" height="60" fill="#fca5a5" />
          <path d="M52 62 L105 24 L158 62 Z" fill="#7f1d1d" />
          <rect x="95" y="88" width="20" height="32" fill="#78350f" />
          <rect x="72" y="76" width="16" height="16" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5" />
          <rect x="122" y="76" width="16" height="16" fill="#fef3c7" stroke="#78350f" strokeWidth="1.5" />
          <rect x="140" y="34" width="8" height="18" fill="#78350f" />
          <path d="M40 118 Q60 105 80 118" stroke="#4d7c0f" strokeWidth="6" fill="none" />
        </svg>
      );
    case 'studio':
      return (
        <svg viewBox="0 0 220 140" width="100%" height="100%">
          <Ground />
          <rect x="70" y="40" width="70" height="80" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
          <rect x="98" y="96" width="18" height="24" fill="#334155" />
          <rect x="78" y="54" width="18" height="18" fill="#bae6fd" stroke="#475569" strokeWidth="1.2" />
          <rect x="118" y="54" width="18" height="18" fill="#bae6fd" stroke="#475569" strokeWidth="1.2" />
          <rect x="66" y="36" width="78" height="6" fill="#475569" />
        </svg>
      );
    case 'apartment':
      return (
        <svg viewBox="0 0 220 140" width="100%" height="100%">
          <Ground />
          <rect x="55" y="20" width="70" height="102" fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
          <rect x="135" y="40" width="50" height="82" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
          <WindowGrid x={64} y={30} cols={3} rows={5} w={12} h={10} gap={4} />
          <WindowGrid x={144} y={50} cols={2} rows={4} w={12} h={9} gap={4} />
          <rect x="80" y="104" width="16" height="18" fill="#1e293b" />
        </svg>
      );
    case 'house':
      return (
        <svg viewBox="0 0 220 140" width="100%" height="100%">
          <Ground />
          <rect x="55" y="62" width="90" height="58" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
          <path d="M46 64 L100 28 L154 64 Z" fill="#78350f" />
          <rect x="90" y="90" width="20" height="30" fill="#1e293b" />
          <rect x="66" y="76" width="16" height="16" fill="#bae6fd" stroke="#475569" strokeWidth="1.2" />
          <rect x="118" y="76" width="16" height="16" fill="#bae6fd" stroke="#475569" strokeWidth="1.2" />
          <path d="M155 122 Q170 100 165 122" fill="#4d7c0f" />
          <path d="M35 122 Q50 95 45 122" fill="#4d7c0f" />
        </svg>
      );
    case 'villa':
      return (
        <svg viewBox="0 0 220 140" width="100%" height="100%">
          <Ground />
          <rect x="40" y="56" width="140" height="44" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
          <rect x="40" y="48" width="140" height="10" fill="#0f766e" />
          <WindowGrid x={50} y={66} cols={5} rows={1} w={14} h={20} gap={6} />
          <ellipse cx="110" cy="118" rx="55" ry="10" fill="#38bdf8" opacity="0.85" />
          <ellipse cx="110" cy="118" rx="55" ry="10" fill="none" stroke="#0369a1" strokeWidth="1.2" />
          <rect x="20" y="40" width="10" height="60" fill="#4d7c0f" opacity="0.85" />
        </svg>
      );
    case 'mansion':
      return (
        <svg viewBox="0 0 220 140" width="100%" height="100%">
          <Ground />
          <rect x="35" y="66" width="150" height="52" fill="#fef9c3" stroke="#92400e" strokeWidth="1.5" />
          <path d="M25 68 L110 26 L195 68 Z" fill="#92400e" />
          <rect x="98" y="90" width="24" height="28" fill="#78350f" />
          {[52, 148].map((x) => (
            <g key={x}>
              <rect x={x - 5} y="72" width="10" height="46" fill="#f8fafc" stroke="#a16207" strokeWidth="1" />
            </g>
          ))}
          <WindowGrid x={68} y={78} cols={2} rows={2} w={12} h={12} gap={6} />
          <WindowGrid x={128} y={78} cols={2} rows={2} w={12} h={12} gap={6} />
          <ellipse cx="110" cy="126" rx="70" ry="6" fill="none" stroke="#a16207" strokeWidth="1.4" strokeDasharray="3 3" />
        </svg>
      );
    case 'palace':
      return (
        <svg viewBox="0 0 220 140" width="100%" height="100%">
          <Ground />
          <rect x="20" y="76" width="52" height="42" fill="#fde9c8" stroke="#92400e" strokeWidth="1.2" />
          <rect x="148" y="76" width="52" height="42" fill="#fde9c8" stroke="#92400e" strokeWidth="1.2" />
          <path d="M14 78 L46 58 L78 78 Z" fill="#92400e" />
          <path d="M142 78 L174 58 L206 78 Z" fill="#92400e" />
          <rect x="70" y="54" width="80" height="64" fill="#fff7ed" stroke="#92400e" strokeWidth="1.5" />
          <path d="M62 56 L110 18 L158 56 Z" fill="#b45309" />
          <circle cx="110" cy="30" r="7" fill="#fde68a" />
          {[84, 100, 116, 132].map((x) => (
            <rect key={x} x={x} y="72" width="6" height="34" fill="#fde9c8" stroke="#a16207" strokeWidth="0.8" />
          ))}
          <rect x="102" y="96" width="16" height="22" fill="#78350f" />
          <ellipse cx="110" cy="128" rx="90" ry="7" fill="none" stroke="#a16207" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="110" cy="122" r="5" fill="#38bdf8" opacity="0.8" />
        </svg>
      );
    case 'island':
      return (
        <svg viewBox="0 0 220 140" width="100%" height="100%">
          <defs>
            <linearGradient id="island-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <ellipse cx="110" cy="110" rx="105" ry="26" fill="url(#island-water)" />
          <ellipse cx="110" cy="100" rx="70" ry="20" fill="#fde68a" />
          <rect x="80" y="66" width="60" height="30" fill="#f8fafc" stroke="#0891b2" strokeWidth="1.4" />
          <path d="M74 68 L110 44 L146 68 Z" fill="#0e7490" />
          <rect x="102" y="82" width="14" height="14" fill="#0891b2" />
          {[[40, 92], [180, 96]].map(([x, y], i) => (
            <g key={i}>
              <line x1={x} y1={y} x2={x + (i === 0 ? -6 : 6)} y2={y - 34} stroke="#78350f" strokeWidth="3.5" />
              <path d={`M${x + (i === 0 ? -6 : 6)} ${y - 34} q -14 -6 -20 4 M${x + (i === 0 ? -6 : 6)} ${y - 34} q 14 -6 20 4 M${x + (i === 0 ? -6 : 6)} ${y - 34} q -2 -14 8 -18`} stroke="#15803d" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
          ))}
        </svg>
      );
  }
}
