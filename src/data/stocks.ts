import type { Stock } from '../types';

export const INITIAL_STOCKS: Stock[] = [
  { id: 'rsrn', ticker: 'RSRN', name: 'Rosserini Bank', sector: 'Financeiro', price: 142.5, change: 0, shares: 0, volatility: 0.02 },
  { id: 'ntc', ticker: 'NTC', name: 'NovaTech', sector: 'Tecnologia', price: 88.2, change: 0, shares: 0, volatility: 0.05 },
  { id: 'lux', ticker: 'LUX', name: 'Lux Energia', sector: 'Energia', price: 205.9, change: 0, shares: 0, volatility: 0.03 },
  { id: 'brs', ticker: 'BRS', name: 'BioRossa', sector: 'Saúde', price: 310.4, change: 0, shares: 0, volatility: 0.04 },
  { id: 'rmd', ticker: 'RMD', name: 'Rossa Media', sector: 'Media', price: 54.7, change: 0, shares: 0, volatility: 0.035 },
  { id: 'rmn', ticker: 'RMN', name: 'Rossa Minas', sector: 'Mineração', price: 176.3, change: 0, shares: 0, volatility: 0.045 },
];
