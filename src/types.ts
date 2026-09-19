export type Screen = 'investimento' | 'atividade' | 'escola' | 'artigos' | 'perfil';

export interface BusinessTemplate {
  id: string;
  name: string;
  type: string;
  icon: string;
  baseCost: number;
  baseIncome: number;
  maxLevel: number;
}

export interface Business {
  id: string;
  templateId: string;
  name: string;
  type: string;
  icon: string;
  baseCost: number;
  baseIncome: number;
  level: number;
  maxLevel: number;
  owned: boolean;
  suspended: boolean;
  isBank: boolean;
}

export interface Stock {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  shares: number;
  volatility: number;
}

export interface RealEstateAsset {
  id: string;
  name: string;
  location: string;
  value: number;
  income: number;
  owned: boolean;
}

export interface CryptoAsset {
  id: string;
  ticker: string;
  name: string;
  price: number;
  change: number;
  amount: number;
  volatility: number;
}

export interface Vehicle {
  id: string;
  name: string;
  category: 'carro' | 'aviao' | 'iate';
  variant: string;
  price: number;
  owned: boolean;
  image?: string;
}

export type CollectibleCategory = 'moedas' | 'relogios' | 'vinhos' | 'arte';

export interface Collectible {
  id: string;
  name: string;
  category: CollectibleCategory;
  tier: string;
  price: number;
  owned: boolean;
  image?: string;
}

export interface EventLogEntry {
  year: number;
  age: number;
  icon: string;
  title: string;
  resultText: string;
}

export interface GameStateData {
  // identidade
  name: string;
  age: number;
  alive: boolean;
  yearsPlayed: number;
  generation: number;

  // estatísticas de vida
  health: number;
  happiness: number;
  smarts: number;
  reputation: number;
  married: boolean;
  spouseName: string | null;
  children: number;
  education: 'nenhuma' | 'secundario' | 'universidade' | 'pos-graduacao';

  // economia
  cash: number;
  taxOwed: number;
  taxSuspended: boolean;

  // ativos
  businesses: Business[];
  businessSlots: number;
  stocks: Stock[];
  realEstate: RealEstateAsset[];
  crypto: CryptoAsset[];
  vehicles: Vehicle[];
  collectibles: Collectible[];
  residenceLevel: number;

  // objetivos do ano corrente
  actionsThisYear: { hobby: boolean; job: boolean; business: boolean; invest: boolean };
  jobsWorkedThisYear: string[];

  // ui / eventos
  activeEventId: string | null;
  eventQueue: string[];
  eventLog: EventLogEntry[];
  lastResult: { title: string; text: string; icon: string } | null;
  seenOnceEvents: string[];
  screen: Screen;
  showDeathScreen: boolean;
}

export interface EventChoiceResult {
  state: Partial<GameStateData>;
  resultText: string;
}

export interface EventChoice {
  id: string;
  label: string;
  hint?: string;
  apply: (state: GameStateData) => EventChoiceResult;
}

export interface GameEvent {
  id: string;
  icon: string;
  title: string;
  text: (state: GameStateData) => string;
  minAge?: number;
  maxAge?: number;
  minNetWorth?: number;
  maxNetWorth?: number;
  weight: number;
  once?: boolean;
  condition?: (state: GameStateData) => boolean;
  choices: EventChoice[];
}
