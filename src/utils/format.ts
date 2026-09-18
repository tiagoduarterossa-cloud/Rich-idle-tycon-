export function formatMoney(value: number, precise = false): string {
  const sign = value < 0 ? '-' : '';
  const abs = Math.abs(value);

  if (precise || abs < 1000) {
    return `${sign}$ ${formatFull(abs)}`;
  }

  const units: [number, string][] = [
    [1e12, 'T'],
    [1e9, 'B'],
    [1e6, 'M'],
    [1e3, 'k'],
  ];

  for (const [threshold, suffix] of units) {
    if (abs >= threshold) {
      const num = abs / threshold;
      return `${sign}$ ${formatDecimal(num)} ${suffix}`;
    }
  }
  return `${sign}$ ${formatFull(abs)}`;
}

export function formatFull(value: number): string {
  const parts = value.toFixed(2).split('.');
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${intPart},${parts[1]}`;
}

export function formatDecimal(value: number): string {
  return value.toFixed(1).replace('.', ',');
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)} %`;
}

export function formatCompact(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  const units: [number, string][] = [
    [1e12, 'T'],
    [1e9, 'B'],
    [1e6, 'M'],
    [1e3, 'k'],
  ];
  for (const [threshold, suffix] of units) {
    if (abs >= threshold) {
      return `${sign}${formatDecimal(abs / threshold)}${suffix}`;
    }
  }
  return `${sign}${Math.round(abs)}`;
}
