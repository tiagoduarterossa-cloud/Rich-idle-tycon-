import type { GameStateData } from '../types';
import { ADULT_AGE } from '../utils/netWorth';
import { BUSINESS_CATALOG } from './businesses';
import { INITIAL_STOCKS } from './stocks';
import { INITIAL_CRYPTO } from './crypto';

export type ObjectiveKind = 'hobbyOrJob' | 'business' | 'invest';

export interface Objective {
  id: string;
  text: string;
  hint: string;
  kind: ObjectiveKind;
}

const SCHOOL_START_AGE = 5;

const CHEAPEST_BUSINESS_COST = Math.min(...BUSINESS_CATALOG.map((t) => t.baseCost));
const CHEAPEST_INVEST_COST = Math.min(
  Math.min(...INITIAL_STOCKS.map((s) => s.price)),
  Math.min(...INITIAL_CRYPTO.map((c) => c.price)) * 0.01
);

export function getYearlyObjectives(state: GameStateData): Objective[] {
  if (state.age < SCHOOL_START_AGE) return [];

  if (state.age < ADULT_AGE) {
    return [
      {
        id: 'crianca-hobby-job',
        text: 'Pratica um hobby ou faz um trabalho de curto prazo',
        hint: 'Vai à Escola',
        kind: 'hobbyOrJob',
      },
    ];
  }

  const ownedBusinesses = state.businesses.filter((b) => !b.isBank && b.owned).length;
  const businessObjective: Objective =
    ownedBusinesses === 0
      ? { id: 'adulto-fundar', text: 'Funda o teu primeiro negócio', hint: 'Vai à Atividade', kind: 'business' }
      : {
          id: 'adulto-crescer-negocio',
          text: 'Cria, melhora ou expande um negócio',
          hint: 'Vai à Atividade',
          kind: 'business',
        };

  return [
    businessObjective,
    {
      id: 'adulto-investir',
      text: 'Investe em ações, imobiliário ou criptomoedas',
      hint: 'Vai a Investimento',
      kind: 'invest',
    },
  ];
}

export function isObjectiveDone(kind: ObjectiveKind, actions: GameStateData['actionsThisYear']): boolean {
  switch (kind) {
    case 'hobbyOrJob':
      return actions.hobby || actions.job;
    case 'business':
      return actions.business;
    case 'invest':
      return actions.invest;
    default:
      return false;
  }
}

// Um objetivo só pode bloquear o avanço de ano se for realmente possível cumpri-lo
// com o dinheiro que a personagem tem agora — caso contrário a personagem ficava
// presa para sempre sem conseguir gerar mais rendimento.
export function canAffordObjective(kind: ObjectiveKind, state: GameStateData): boolean {
  switch (kind) {
    case 'hobbyOrJob':
      return true;
    case 'business':
      return state.cash >= CHEAPEST_BUSINESS_COST;
    case 'invest':
      return state.cash >= CHEAPEST_INVEST_COST;
    default:
      return true;
  }
}

export function isObjectiveBlocking(objective: Objective, state: GameStateData): boolean {
  return !isObjectiveDone(objective.kind, state.actionsThisYear) && canAffordObjective(objective.kind, state);
}
