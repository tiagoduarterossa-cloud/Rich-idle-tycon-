import type { CryptoAsset } from '../types';

export const INITIAL_CRYPTO: CryptoAsset[] = [
  { id: 'btc', ticker: 'BTC', name: 'BitRossa', price: 58000, change: 0, amount: 0, volatility: 0.06 },
  { id: 'eth', ticker: 'ETH', name: 'EtherRossa', price: 3200, change: 0, amount: 0, volatility: 0.07 },
  { id: 'lnx', ticker: 'LNX', name: 'LuxCoin', price: 4.8, change: 0, amount: 0, volatility: 0.1 },
  { id: 'rzc', ticker: 'RZC', name: 'RossaCoin', price: 0.42, change: 0, amount: 0, volatility: 0.15 },
];
