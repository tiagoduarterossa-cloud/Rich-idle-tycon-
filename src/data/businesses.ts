import type { Business } from '../types';

export const BUSINESS_TEMPLATES: Omit<Business, 'level' | 'owned' | 'suspended'>[] = [
  { id: 'banco', name: 'Rosserini', type: 'Banco', icon: '🏦', baseCost: 5000, baseIncome: 120, maxLevel: 40 },
  { id: 'cafe', name: 'Café Lisboa', type: 'Restauração', icon: '☕', baseCost: 800, baseIncome: 15, maxLevel: 30 },
  { id: 'construtora', name: 'Rossa Construções', type: 'Construção', icon: '🏗️', baseCost: 12000, baseIncome: 280, maxLevel: 40 },
  { id: 'aviacao', name: 'Rossa', type: 'Companhias aéreas', icon: '✈️', baseCost: 60000, baseIncome: 1400, maxLevel: 40 },
  { id: 'tech', name: 'NovaTech', type: 'Tecnologia', icon: '💻', baseCost: 25000, baseIncome: 620, maxLevel: 40 },
  { id: 'moda', name: 'Rossa Moda', type: 'Retalho', icon: '👗', baseCost: 3000, baseIncome: 70, maxLevel: 30 },
  { id: 'energia', name: 'Lux Energia', type: 'Energia', icon: '⚡', baseCost: 90000, baseIncome: 2100, maxLevel: 40 },
  { id: 'media', name: 'Rossa Media', type: 'Media', icon: '📺', baseCost: 40000, baseIncome: 950, maxLevel: 35 },
  { id: 'farmaceutica', name: 'BioRossa', type: 'Farmacêutica', icon: '💊', baseCost: 150000, baseIncome: 3600, maxLevel: 40 },
  { id: 'seguradora', name: 'Rossa Seguros', type: 'Seguros', icon: '🛡️', baseCost: 70000, baseIncome: 1650, maxLevel: 40 },
  { id: 'mineradora', name: 'Rossa Minas', type: 'Mineração', icon: '⛏️', baseCost: 200000, baseIncome: 4800, maxLevel: 40 },
  { id: 'transportes', name: 'Rossa Logística', type: 'Logística', icon: '🚚', baseCost: 18000, baseIncome: 420, maxLevel: 35 },
];

export function createInitialBusinesses(): Business[] {
  return BUSINESS_TEMPLATES.map((b) => ({
    ...b,
    level: 0,
    owned: false,
    suspended: false,
  }));
}
