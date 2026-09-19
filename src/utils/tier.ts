export interface TierBadge {
  grade: string;
  label: string;
  color: string;
}

const TIERS: TierBadge[] = [
  { grade: 'D', label: 'Comum', color: '#94a3b8' },
  { grade: 'C', label: 'Padrão', color: '#22c55e' },
  { grade: 'B', label: 'Avançado', color: '#3b82f6' },
  { grade: 'A', label: 'Raro', color: '#a855f7' },
  { grade: 'S', label: 'Premium', color: '#f59e0b' },
  { grade: 'S+', label: 'Exclusivo', color: '#ef4444' },
];

export function tierForRank(rank: number, total: number): TierBadge {
  const pct = total <= 1 ? 1 : rank / (total - 1);
  const idx = Math.min(TIERS.length - 1, Math.floor(pct * TIERS.length));
  return TIERS[idx];
}
