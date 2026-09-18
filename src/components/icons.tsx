interface IconProps {
  active?: boolean;
}

const stroke = (active?: boolean) => (active ? '#2563eb' : '#94a3b8');

export function InvestIcon({ active }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stroke(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 17 9 11 13 15 21 6" />
      <polyline points="14 6 21 6 21 13" />
    </svg>
  );
}

export function ActivityIcon({ active }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stroke(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="9" width="6" height="12" />
      <rect x="14" y="4" width="6" height="17" />
    </svg>
  );
}

export function EarnIcon({ active }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stroke(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.5a2.5 2.5 0 0 1 2.5-1h.3a2 2 0 1 1 0 4h-.6a2 2 0 1 0 0 4h.3a2.5 2.5 0 0 0 2.5-1" />
    </svg>
  );
}

export function ItemsIcon({ active }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stroke(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}

export function ProfileIcon({ active }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stroke(active)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.6-4 5-6 8-6s6.4 2 8 6" />
    </svg>
  );
}

export function HeartPulseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 8.6c0-3-2.4-5.3-5.3-5.3-1.7 0-3.2.8-4.2 2.1-1-1.3-2.5-2.1-4.2-2.1C4.2 3.3 1.8 5.7 1.8 8.6c0 4.7 4.9 8.5 9.5 12.4.3.3.8.3 1.1 0 4.6-3.9 9.5-7.7 9.5-12.4Z" />
      <path d="M3 12h3l2-4 3 8 2-5 1.5 2H21" />
    </svg>
  );
}

export function SmileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

export function BrainIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5h.5" />
      <path d="M15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5h-.5" />
      <path d="M9 3v18M15 3v18" />
    </svg>
  );
}

export function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#2563eb" stroke="#2563eb" strokeWidth="1" strokeLinejoin="round">
      <polygon points="12 2 15 9 22 9.5 16.5 14.5 18.5 22 12 17.8 5.5 22 7.5 14.5 2 9.5 9 9" />
    </svg>
  );
}
