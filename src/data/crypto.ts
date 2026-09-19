import type { CryptoAsset } from '../types';

export const INITIAL_CRYPTO: CryptoAsset[] = [
  { id: 'btc', ticker: 'BTC', name: 'Bitcoin', price: 62000, change: 0, amount: 0, volatility: 0.045 },
  { id: 'eth', ticker: 'ETH', name: 'Ethereum', price: 2600, change: 0, amount: 0, volatility: 0.055 },
  { id: 'bnb', ticker: 'BNB', name: 'BNB', price: 580, change: 0, amount: 0, volatility: 0.05 },
  { id: 'sol', ticker: 'SOL', name: 'Solana', price: 145, change: 0, amount: 0, volatility: 0.08 },
  { id: 'xrp', ticker: 'XRP', name: 'XRP', price: 0.55, change: 0, amount: 0, volatility: 0.07 },
  { id: 'ada', ticker: 'ADA', name: 'Cardano', price: 0.35, change: 0, amount: 0, volatility: 0.075 },
  { id: 'doge', ticker: 'DOGE', name: 'Dogecoin', price: 0.12, change: 0, amount: 0, volatility: 0.12 },
];
