import type { Business, BusinessTemplate } from '../types';

export const BANK_TEMPLATE: BusinessTemplate = {
  id: 'banco-central',
  name: 'O Meu Banco',
  type: 'Banco',
  icon: '🏦',
  baseCost: 1000,
  baseIncome: 8,
  maxLevel: 40,
};

export const BUSINESS_CATALOG: BusinessTemplate[] = [
  { id: 'cafe', name: 'Café', type: 'Restauração', icon: '☕', baseCost: 800, baseIncome: 15, maxLevel: 30 },
  { id: 'construtora', name: 'Construtora', type: 'Construção', icon: '🏗️', baseCost: 12000, baseIncome: 280, maxLevel: 40 },
  { id: 'aviacao', name: 'Companhia Aérea', type: 'Companhias aéreas', icon: '✈️', baseCost: 60000, baseIncome: 1400, maxLevel: 40 },
  { id: 'tech', name: 'Startup Tecnológica', type: 'Tecnologia', icon: '💻', baseCost: 25000, baseIncome: 620, maxLevel: 40 },
  { id: 'moda', name: 'Marca de Moda', type: 'Retalho', icon: '👗', baseCost: 3000, baseIncome: 70, maxLevel: 30 },
  { id: 'energia', name: 'Empresa de Energia', type: 'Energia', icon: '⚡', baseCost: 90000, baseIncome: 2100, maxLevel: 40 },
  { id: 'media', name: 'Grupo de Media', type: 'Media', icon: '📺', baseCost: 40000, baseIncome: 950, maxLevel: 35 },
  { id: 'farmaceutica', name: 'Farmacêutica', type: 'Farmacêutica', icon: '💊', baseCost: 150000, baseIncome: 3600, maxLevel: 40 },
  { id: 'seguradora', name: 'Seguradora', type: 'Seguros', icon: '🛡️', baseCost: 70000, baseIncome: 1650, maxLevel: 40 },
  { id: 'mineradora', name: 'Mineradora', type: 'Mineração', icon: '⛏️', baseCost: 200000, baseIncome: 4800, maxLevel: 40 },
  { id: 'transportes', name: 'Empresa de Logística', type: 'Logística', icon: '🚚', baseCost: 18000, baseIncome: 420, maxLevel: 35 },
];

export const STARTING_BUSINESS_SLOTS = 2;
export const SLOT_BASE_COST = 1500;
export const SLOT_GROWTH = 1.9;
export const CREATE_SAME_TYPE_GROWTH = 1.35;

export const STARTING_MARKET_SHARE = 55;
export const MARKET_SHARE_UPGRADE_BOOST = 10;
export const OPERATING_COST_RATE = 0.3;

export function nextSlotCost(currentSlots: number): number {
  return Math.round(SLOT_BASE_COST * Math.pow(SLOT_GROWTH, currentSlots - STARTING_BUSINESS_SLOTS));
}

export function creationCost(template: BusinessTemplate, existingCount: number): number {
  return Math.round(template.baseCost * Math.pow(CREATE_SAME_TYPE_GROWTH, existingCount));
}

export function createInitialBusinesses(): Business[] {
  return [
    {
      id: 'banco-central',
      templateId: BANK_TEMPLATE.id,
      name: BANK_TEMPLATE.name,
      type: BANK_TEMPLATE.type,
      icon: BANK_TEMPLATE.icon,
      baseCost: BANK_TEMPLATE.baseCost,
      baseIncome: BANK_TEMPLATE.baseIncome,
      level: 1,
      maxLevel: BANK_TEMPLATE.maxLevel,
      owned: true,
      suspended: false,
      isBank: true,
      marketShare: 100,
    },
  ];
}
