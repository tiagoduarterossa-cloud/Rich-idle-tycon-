import type { Business, GameStateData } from '../types';
import { RESIDENCE_TIERS } from '../data/items';
import { OPERATING_COST_RATE } from '../data/businesses';

export function businessValue(state: GameStateData): number {
  return state.businesses
    .filter((b) => b.owned)
    .reduce((sum, b) => sum + b.baseCost * (1 + b.level * 0.6), 0);
}

// Rendimento líquido de um negócio: o banco não compete com ninguém (é a
// poupança do jogador), mas os restantes negócios disputam quota de mercado
// com a concorrência e têm custos operacionais que comem parte da receita.
export function businessNetIncome(b: Business): number {
  const gross = b.baseIncome * (1 + b.level * 0.5);
  if (b.isBank) return gross;
  const marketFactor = b.marketShare / 100;
  return gross * marketFactor * (1 - OPERATING_COST_RATE);
}

export function hourlyBusinessIncome(state: GameStateData): number {
  return state.businesses.filter((b) => b.owned && !b.suspended).reduce((sum, b) => sum + businessNetIncome(b), 0);
}

export function stocksValue(state: GameStateData): number {
  return state.stocks.reduce((sum, s) => sum + s.price * s.shares, 0);
}

export function realEstateValue(state: GameStateData): number {
  return state.realEstate.filter((r) => r.owned).reduce((sum, r) => sum + r.value, 0);
}

export function hourlyRealEstateIncome(state: GameStateData): number {
  return state.realEstate.filter((r) => r.owned).reduce((sum, r) => sum + r.income, 0);
}

export function cryptoValue(state: GameStateData): number {
  return state.crypto.reduce((sum, c) => sum + c.price * c.amount, 0);
}

export function vehiclesValue(state: GameStateData): number {
  return state.vehicles.filter((v) => v.owned).reduce((sum, v) => sum + v.price, 0);
}

export function collectiblesValue(state: GameStateData): number {
  return state.collectibles.filter((c) => c.owned).reduce((sum, c) => sum + c.price, 0);
}

export function residenceValue(state: GameStateData): number {
  if (state.residenceLevel < 0) return 0;
  return RESIDENCE_TIERS[state.residenceLevel]?.price ?? 0;
}

export function netWorth(state: GameStateData): number {
  return (
    Math.max(0, state.cash) +
    businessValue(state) +
    stocksValue(state) +
    realEstateValue(state) +
    cryptoValue(state) +
    vehiclesValue(state) +
    collectiblesValue(state) +
    residenceValue(state)
  );
}

export const ADULT_AGE = 18;

export function totalHourlyIncome(state: GameStateData): number {
  if (state.taxSuspended) return 0;
  if (state.age < ADULT_AGE) return 0;
  return hourlyBusinessIncome(state) + hourlyRealEstateIncome(state);
}
