import type { Stock } from '../types';

export const INITIAL_STOCKS: Stock[] = [
  { id: 'aapl', ticker: 'AAPL', name: 'Apple Inc.', sector: 'Tecnologia', price: 228.5, change: 0, shares: 0, volatility: 0.028 },
  { id: 'msft', ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'Tecnologia', price: 415.2, change: 0, shares: 0, volatility: 0.025 },
  { id: 'nvda', ticker: 'NVDA', name: 'Nvidia Corp.', sector: 'Tecnologia', price: 135.8, change: 0, shares: 0, volatility: 0.05 },
  { id: 'googl', ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'Tecnologia', price: 172.4, change: 0, shares: 0, volatility: 0.03 },
  { id: 'amzn', ticker: 'AMZN', name: 'Amazon.com Inc.', sector: 'Retalho Online', price: 186.3, change: 0, shares: 0, volatility: 0.032 },
  { id: 'meta', ticker: 'META', name: 'Meta Platforms', sector: 'Tecnologia', price: 565.1, change: 0, shares: 0, volatility: 0.035 },
  { id: 'tsla', ticker: 'TSLA', name: 'Tesla Inc.', sector: 'Automóvel', price: 248.9, change: 0, shares: 0, volatility: 0.055 },
  { id: 'jpm', ticker: 'JPM', name: 'JPMorgan Chase', sector: 'Financeiro', price: 215.6, change: 0, shares: 0, volatility: 0.018 },
  { id: 'v', ticker: 'V', name: 'Visa Inc.', sector: 'Financeiro', price: 275.3, change: 0, shares: 0, volatility: 0.016 },
  { id: 'wmt', ticker: 'WMT', name: 'Walmart Inc.', sector: 'Retalho', price: 84.7, change: 0, shares: 0, volatility: 0.014 },
  { id: 'xom', ticker: 'XOM', name: 'ExxonMobil', sector: 'Energia', price: 118.2, change: 0, shares: 0, volatility: 0.024 },
  { id: 'jnj', ticker: 'JNJ', name: 'Johnson & Johnson', sector: 'Saúde', price: 152.4, change: 0, shares: 0, volatility: 0.013 },
  { id: 'dis', ticker: 'DIS', name: 'Walt Disney Co.', sector: 'Media', price: 97.8, change: 0, shares: 0, volatility: 0.03 },
  { id: 'nflx', ticker: 'NFLX', name: 'Netflix Inc.', sector: 'Media', price: 690.5, change: 0, shares: 0, volatility: 0.036 },
];
