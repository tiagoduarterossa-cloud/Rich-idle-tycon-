import type { Vehicle, Collectible } from '../types';

export const INITIAL_VEHICLES: Vehicle[] = [
  { id: 'car1', name: 'Hatch Usado', category: 'carro', price: 6000, owned: false },
  { id: 'car2', name: 'Sedan Executivo', category: 'carro', price: 45000, owned: false },
  { id: 'car3', name: 'Desportivo Italiano', category: 'carro', price: 320000, owned: false },
  { id: 'car4', name: 'Hipercarro Edição Limitada', category: 'carro', price: 2800000, owned: false },
  { id: 'jet1', name: 'Jato Privado Leve', category: 'aviao', price: 8500000, owned: false },
  { id: 'jet2', name: 'Jato Executivo Longo Alcance', category: 'aviao', price: 45000000, owned: false },
  { id: 'yacht1', name: 'Iate de 20 Metros', category: 'iate', price: 6000000, owned: false },
  { id: 'yacht2', name: 'Superiate de 60 Metros', category: 'iate', price: 120000000, owned: false },
];

export const INITIAL_COLLECTIBLES: Collectible[] = [
  { id: 'coin1', name: 'Moedas Raras', icon: '🪙', price: 15000, owned: false },
  { id: 'art1', name: 'Arte Contemporânea', icon: '🎨', price: 250000, owned: false },
  { id: 'watch1', name: 'Relógios de Luxo', icon: '⌚', price: 80000, owned: false },
  { id: 'wine1', name: 'Cave de Vinhos', icon: '🍷', price: 45000, owned: false },
];

export const RESIDENCE_TIERS = [
  { level: 1, name: 'Apartamento', value: 250000 },
  { level: 5, name: 'Casa de Subúrbio', value: 1200000 },
  { level: 8, name: 'Villa de Luxo', value: 6500000 },
  { level: 11, name: 'Mansão', value: 28000000 },
  { level: 14, name: 'Palácio Privado', value: 195700000 },
];
