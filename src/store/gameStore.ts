import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameStateData, Screen } from '../types';
import {
  createInitialBusinesses,
  BUSINESS_CATALOG,
  STARTING_BUSINESS_SLOTS,
  STARTING_MARKET_SHARE,
  MARKET_SHARE_UPGRADE_BOOST,
  nextSlotCost,
  creationCost,
} from '../data/businesses';
import { INITIAL_STOCKS } from '../data/stocks';
import { INITIAL_REAL_ESTATE } from '../data/realEstate';
import { INITIAL_CRYPTO } from '../data/crypto';
import { INITIAL_VEHICLES, INITIAL_COLLECTIBLES, RESIDENCE_TIERS } from '../data/items';
import { LIFE_EVENTS, pickRandomEvent } from '../data/events';
import { HOBBIES } from '../data/hobbies';
import { SHORT_TERM_JOBS } from '../data/jobs';
import { netWorth, totalHourlyIncome, ADULT_AGE } from '../utils/netWorth';
import { getYearlyObjectives, isObjectiveBlocking } from '../data/objectives';

const clamp = (v: number, min = 0, max = 100) => Math.max(min, Math.min(max, v));

function freshState(generation: number, legacyBonus: number): GameStateData {
  return {
    name: 'Alex Rossa',
    age: 0,
    alive: true,
    yearsPlayed: 0,
    generation,

    health: 100,
    happiness: 80,
    smarts: 20,
    reputation: 10,
    married: false,
    spouseName: null,
    children: 0,
    education: 'nenhuma',

    cash: legacyBonus,
    taxOwed: 0,
    taxSuspended: false,

    businesses: createInitialBusinesses(),
    businessSlots: STARTING_BUSINESS_SLOTS,
    stocks: INITIAL_STOCKS.map((s) => ({ ...s })),
    realEstate: INITIAL_REAL_ESTATE.map((r) => ({ ...r })),
    crypto: INITIAL_CRYPTO.map((c) => ({ ...c })),
    vehicles: INITIAL_VEHICLES.map((v) => ({ ...v })),
    collectibles: INITIAL_COLLECTIBLES.map((c) => ({ ...c })),
    residenceLevel: -1,

    actionsThisYear: { hobby: false, job: false, business: false, invest: false },
    jobsWorkedThisYear: [],

    activeEventId: null,
    eventQueue: [],
    eventLog: [],
    lastResult: null,
    seenOnceEvents: [],
    screen: 'escola',
    showDeathScreen: false,
  };
}

interface GameActions {
  workJob: (jobId: string) => { net: number; gross: number; factor: number } | null;
  practiceHobby: (hobbyId: string) => void;
  setScreen: (s: Screen) => void;
  setName: (name: string) => void;

  createBusiness: (templateId: string) => void;
  upgradeBusiness: (id: string) => void;
  buyBusinessSlot: () => void;

  buyStock: (id: string, qty: number) => void;
  sellStock: (id: string, qty: number) => void;

  buyRealEstate: (id: string) => void;
  sellRealEstate: (id: string) => void;

  buyCrypto: (id: string, amount: number) => void;
  sellCrypto: (id: string, amount: number) => void;

  buyVehicle: (id: string) => void;
  buyCollectible: (id: string) => void;
  moveResidence: (tierIndex: number) => void;

  payAllTaxes: () => void;
  mergeCompanies: () => void;

  advanceYear: () => void;
  resolveEventChoice: (choiceId: string) => void;
  dismissResult: () => void;

  startNewLife: () => void;
}

export type GameStore = GameStateData & GameActions;

const STOCK_ANNUAL_DRIFT = 0.08;
const CRYPTO_ANNUAL_DRIFT = 0.02;

function driftMarkets(state: GameStateData): Pick<GameStateData, 'stocks' | 'crypto'> {
  // Cada "Avançar Ano" representa um ano de mercado: as ações têm uma
  // tendência de subida de longo prazo (como o mercado real, em média),
  // a cripto é muito mais errática e não tem tendência garantida.
  const stocks = state.stocks.map((s) => {
    const noise = (Math.random() * 2 - 1) * s.volatility * 6;
    const change = Math.max(-0.6, Math.min(1.2, STOCK_ANNUAL_DRIFT + noise));
    const price = Math.max(0.5, s.price * (1 + change));
    return { ...s, price: Number(price.toFixed(2)), change: change * 100 };
  });
  const crypto = state.crypto.map((c) => {
    const noise = (Math.random() * 2 - 1) * c.volatility * 8;
    const change = Math.max(-0.75, Math.min(2.5, CRYPTO_ANNUAL_DRIFT + noise));
    const price = Math.max(0.01, c.price * (1 + change));
    return { ...c, price: Number(price.toFixed(2)), change: change * 100 };
  });
  return { stocks, crypto };
}

function driftBusinessCompetition(state: GameStateData): GameStateData['businesses'] {
  // a concorrência aperta com o tempo: sem investir (upgrade), a quota de
  // mercado tende lentamente a perder-se para os rivais
  return state.businesses.map((b) => {
    if (b.isBank || !b.owned) return b;
    const noise = (Math.random() * 2 - 1) * 9;
    const drift = -1.5 + noise;
    return { ...b, marketShare: clamp(b.marketShare + drift, 5, 100) };
  });
}

function queueYearEvents(state: GameStateData): string[] {
  const nw = netWorth(state);
  const count = 1 + (Math.random() < 0.4 ? 1 : 0);
  const queue: string[] = [];
  const usedIds = new Set<string>();
  let workingState = state;
  for (let i = 0; i < count; i++) {
    const event = pickRandomEvent({ ...workingState, seenOnceEvents: [...workingState.seenOnceEvents, ...queue] }, nw);
    if (!event || usedIds.has(event.id)) continue;
    usedIds.add(event.id);
    queue.push(event.id);
  }
  return queue;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...freshState(1, 0),

      workJob: (jobId) => {
        const s = get();
        if (!s.alive) return null;
        const job = SHORT_TERM_JOBS.find((j) => j.id === jobId);
        if (!job || s.age < job.minAge) return null;
        if (s.jobsWorkedThisYear.includes(jobId)) return null;
        if (s.cash < job.cost) return null;
        // a concorrência varia: dias fracos rendem menos, dias bons rendem mais
        const factor = Number((0.6 + Math.random() * 0.9).toFixed(2));
        const gross = Math.round(job.pay * factor);
        const net = gross - job.cost;
        set({
          cash: s.cash + net,
          actionsThisYear: { ...s.actionsThisYear, job: true },
          jobsWorkedThisYear: [...s.jobsWorkedThisYear, jobId],
        });
        return { net, gross, factor };
      },

      practiceHobby: (hobbyId) => {
        const s = get();
        if (!s.alive) return;
        const hobby = HOBBIES.find((h) => h.id === hobbyId);
        if (!hobby || s.age < hobby.minAge || (hobby.maxAge !== undefined && s.age > hobby.maxAge)) return;
        const cost = hobby.cost ?? 0;
        if (s.cash < cost) return;
        set({
          cash: s.cash - cost,
          health: clamp(s.health + (hobby.effects.health ?? 0)),
          happiness: clamp(s.happiness + (hobby.effects.happiness ?? 0)),
          smarts: clamp(s.smarts + (hobby.effects.smarts ?? 0)),
          reputation: clamp(s.reputation + (hobby.effects.reputation ?? 0)),
          actionsThisYear: { ...s.actionsThisYear, hobby: true },
        });
      },

      setScreen: (screen) => set({ screen }),

      setName: (name) => set({ name: name.trim() || 'Alex Rossa' }),

      createBusiness: (templateId) => {
        const s = get();
        if (s.age < ADULT_AGE) return;
        const template = BUSINESS_CATALOG.find((t) => t.id === templateId);
        if (!template) return;
        const createdCount = s.businesses.filter((b) => !b.isBank).length;
        if (createdCount >= s.businessSlots) return;
        const existingOfType = s.businesses.filter((b) => b.templateId === templateId).length;
        const cost = creationCost(template, existingOfType);
        if (s.cash < cost) return;
        const newBusiness = {
          id: `${templateId}-${Date.now()}-${Math.round(Math.random() * 9999)}`,
          templateId: template.id,
          name: template.name,
          type: template.type,
          icon: template.icon,
          baseCost: cost,
          baseIncome: template.baseIncome,
          level: 1,
          maxLevel: template.maxLevel,
          owned: true,
          suspended: false,
          isBank: false,
          marketShare: clamp(STARTING_MARKET_SHARE + (Math.random() * 20 - 10), 20, 80),
        };
        set({
          cash: s.cash - cost,
          businesses: [...s.businesses, newBusiness],
          actionsThisYear: { ...s.actionsThisYear, business: true },
        });
      },

      buyBusinessSlot: () => {
        const s = get();
        if (s.age < ADULT_AGE) return;
        const cost = nextSlotCost(s.businessSlots);
        if (s.cash < cost) return;
        set({
          cash: s.cash - cost,
          businessSlots: s.businessSlots + 1,
          actionsThisYear: { ...s.actionsThisYear, business: true },
        });
      },

      upgradeBusiness: (id) => {
        const s = get();
        if (s.age < ADULT_AGE) return;
        const biz = s.businesses.find((b) => b.id === id);
        if (!biz || !biz.owned || biz.level >= biz.maxLevel) return;
        const cost = Math.round(biz.baseCost * 0.4 * (biz.level + 1));
        if (s.cash < cost) return;
        set({
          cash: s.cash - cost,
          businesses: s.businesses.map((b) =>
            b.id === id
              ? { ...b, level: b.level + 1, marketShare: clamp(b.marketShare + MARKET_SHARE_UPGRADE_BOOST, 0, 100) }
              : b
          ),
          actionsThisYear: { ...s.actionsThisYear, business: true },
        });
      },

      buyStock: (id, qty) => {
        const s = get();
        const stock = s.stocks.find((st) => st.id === id);
        if (!stock || qty <= 0) return;
        const cost = stock.price * qty;
        if (s.cash < cost) return;
        set({
          cash: s.cash - cost,
          stocks: s.stocks.map((st) => (st.id === id ? { ...st, shares: st.shares + qty } : st)),
          actionsThisYear: { ...s.actionsThisYear, invest: true },
        });
      },

      sellStock: (id, qty) => {
        const s = get();
        const stock = s.stocks.find((st) => st.id === id);
        if (!stock || qty <= 0 || stock.shares < qty) return;
        set({
          cash: s.cash + stock.price * qty,
          stocks: s.stocks.map((st) => (st.id === id ? { ...st, shares: st.shares - qty } : st)),
        });
      },

      buyRealEstate: (id) => {
        const s = get();
        if (s.age < ADULT_AGE) return;
        const re = s.realEstate.find((r) => r.id === id);
        if (!re || re.owned || s.cash < re.value) return;
        set({
          cash: s.cash - re.value,
          realEstate: s.realEstate.map((r) => (r.id === id ? { ...r, owned: true } : r)),
          actionsThisYear: { ...s.actionsThisYear, invest: true },
        });
      },

      sellRealEstate: (id) => {
        const s = get();
        const re = s.realEstate.find((r) => r.id === id);
        if (!re || !re.owned) return;
        set({
          cash: s.cash + re.value * 0.85,
          realEstate: s.realEstate.map((r) => (r.id === id ? { ...r, owned: false } : r)),
        });
      },

      buyCrypto: (id, amount) => {
        const s = get();
        if (s.age < ADULT_AGE) return;
        const c = s.crypto.find((cr) => cr.id === id);
        if (!c || amount <= 0) return;
        const cost = c.price * amount;
        if (s.cash < cost) return;
        set({
          cash: s.cash - cost,
          crypto: s.crypto.map((cr) => (cr.id === id ? { ...cr, amount: cr.amount + amount } : cr)),
          actionsThisYear: { ...s.actionsThisYear, invest: true },
        });
      },

      sellCrypto: (id, amount) => {
        const s = get();
        const c = s.crypto.find((cr) => cr.id === id);
        if (!c || amount <= 0 || c.amount < amount) return;
        set({
          cash: s.cash + c.price * amount,
          crypto: s.crypto.map((cr) => (cr.id === id ? { ...cr, amount: cr.amount - amount } : cr)),
        });
      },

      buyVehicle: (id) => {
        const s = get();
        const v = s.vehicles.find((veh) => veh.id === id);
        if (!v || v.owned || s.cash < v.price) return;
        set({
          cash: s.cash - v.price,
          vehicles: s.vehicles.map((veh) => (veh.id === id ? { ...veh, owned: true } : veh)),
        });
      },

      buyCollectible: (id) => {
        const s = get();
        const c = s.collectibles.find((col) => col.id === id);
        if (!c || c.owned || s.cash < c.price) return;
        set({
          cash: s.cash - c.price,
          collectibles: s.collectibles.map((col) => (col.id === id ? { ...col, owned: true } : col)),
        });
      },

      moveResidence: (tierIndex) => {
        const s = get();
        if (s.age < 18) return;
        const tier = RESIDENCE_TIERS[tierIndex];
        if (!tier) return;
        const currentPrice = s.residenceLevel >= 0 ? RESIDENCE_TIERS[s.residenceLevel].price : 0;
        if (tier.price <= currentPrice) return;
        if (s.cash < tier.price) return;
        set({ cash: s.cash - tier.price, residenceLevel: tierIndex });
      },

      payAllTaxes: () => {
        const s = get();
        if (!s.taxSuspended && s.taxOwed <= 0) return;
        if (s.cash < s.taxOwed) return;
        set({ cash: s.cash - s.taxOwed, taxOwed: 0, taxSuspended: false });
      },

      mergeCompanies: () => {
        const s = get();
        if (s.age < ADULT_AGE) return;
        const owned = s.businesses.filter((b) => b.owned);
        if (owned.length < 2) return;
        const cost = Math.round(owned.reduce((sum, b) => sum + b.baseCost * 0.5, 0));
        if (s.cash < cost) return;
        set({
          cash: s.cash - cost,
          businesses: s.businesses.map((b) =>
            b.owned && b.level < b.maxLevel
              ? { ...b, level: b.level + 1, marketShare: clamp(b.marketShare + MARKET_SHARE_UPGRADE_BOOST, 0, 100) }
              : b
          ),
          actionsThisYear: { ...s.actionsThisYear, business: true },
        });
      },

      advanceYear: () => {
        const s = get();
        if (!s.alive || s.activeEventId) return;
        const objectives = getYearlyObjectives(s);
        if (objectives.some((o) => isObjectiveBlocking(o, s))) return;

        const income = totalHourlyIncome(s);
        const yearlyEarnings = income * 600;
        const { stocks, crypto } = driftMarkets(s);
        const businesses = driftBusinessCompetition(s);

        const ageNext = s.age + 1;
        let health = s.health;
        if (ageNext > 45) health = clamp(health - (ageNext > 65 ? 2.5 : 1));
        if (ageNext <= 18) health = clamp(health + 1);
        let happiness = clamp(s.happiness - 1 + (s.married ? 1 : 0));

        const newTaxOwed = s.taxOwed + Math.round(yearlyEarnings * 0.12);
        const taxSuspended = s.taxSuspended || (yearlyEarnings > 0 && newTaxOwed > yearlyEarnings * 2.5);

        const queue = queueYearEvents({ ...s, age: ageNext, health, happiness });

        set({
          age: ageNext,
          yearsPlayed: s.yearsPlayed + 1,
          cash: s.cash + yearlyEarnings,
          stocks,
          crypto,
          businesses,
          health,
          happiness,
          taxOwed: newTaxOwed,
          taxSuspended,
          eventQueue: queue,
          activeEventId: queue[0] ?? null,
          actionsThisYear: { hobby: false, job: false, business: false, invest: false },
          jobsWorkedThisYear: [],
        });

        if (queue.length === 0) {
          get().dismissResult();
          checkDeath();
        }

        function checkDeath() {
          const st = get();
          const deathChanceFromAge = st.age > 75 ? (st.age - 75) * 0.02 : 0;
          const deathChanceFromHealth = st.health <= 0 ? 1 : st.health < 15 ? 0.25 : 0;
          const chance = Math.min(0.95, deathChanceFromAge + deathChanceFromHealth);
          if (Math.random() < chance) {
            set({ alive: false, showDeathScreen: true });
          }
        }
      },

      resolveEventChoice: (choiceId) => {
        const s = get();
        if (!s.activeEventId) return;
        const event = LIFE_EVENTS.find((e) => e.id === s.activeEventId);
        if (!event) return;
        const choice = event.choices.find((c) => c.id === choiceId);
        if (!choice) return;

        const { state: partial, resultText } = choice.apply(s);
        const merged: GameStateData = { ...s, ...partial };

        const nextQueue = s.eventQueue.slice(1);
        const seenOnce = event.once ? [...s.seenOnceEvents, event.id] : s.seenOnceEvents;

        set({
          ...partial,
          seenOnceEvents: seenOnce,
          eventQueue: nextQueue,
          activeEventId: nextQueue[0] ?? null,
          lastResult: { title: event.title, text: resultText, icon: event.icon },
          eventLog: [
            { year: merged.yearsPlayed, age: merged.age, icon: event.icon, title: event.title, resultText },
            ...s.eventLog,
          ].slice(0, 40),
        });

        if (nextQueue.length === 0) {
          const finalState = get();
          const deathChanceFromAge = finalState.age > 75 ? (finalState.age - 75) * 0.02 : 0;
          const deathChanceFromHealth = finalState.health <= 0 ? 1 : finalState.health < 15 ? 0.25 : 0;
          const chance = Math.min(0.95, deathChanceFromAge + deathChanceFromHealth);
          if (Math.random() < chance) {
            set({ alive: false, showDeathScreen: true });
          }
        }
      },

      dismissResult: () => set({ lastResult: null }),

      startNewLife: () => {
        const s = get();
        const legacyBonus = Math.round(netWorth(s) * 0.02);
        set({ ...freshState(s.generation + 1, legacyBonus), showDeathScreen: false });
      },
    }),
    {
      name: 'rich-idle-tycoon-save',
      version: 6,
      migrate: (persistedState, persistedVersion) => {
        if (persistedVersion < 6) {
          return freshState(1, 0);
        }
        return persistedState as GameStateData;
      },
    }
  )
);
