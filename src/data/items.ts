import type { Vehicle, Collectible } from '../types';
import type { CarVariant, BoatVariant, PlaneVariant } from '../components/vehicleArt';
import type { CoinTier, WatchTier, ArtTier } from '../components/collectibleArt';

interface VehicleDef {
  id: string;
  name: string;
  category: 'carro' | 'aviao' | 'iate';
  variant: CarVariant | BoatVariant | PlaneVariant;
  price: number;
}

const CAR_DEFS: VehicleDef[] = [
  { id: 'car-compact', name: 'City Car em Segunda Mão', category: 'carro', variant: 'compact', price: 8000 },
  { id: 'car-sedan', name: 'Sedan Familiar', category: 'carro', variant: 'sedan', price: 28000 },
  { id: 'car-suv', name: 'SUV Premium', category: 'carro', variant: 'suv', price: 65000 },
  { id: 'car-sports', name: 'Desportivo Alemão', category: 'carro', variant: 'sports', price: 180000 },
  { id: 'car-super', name: 'Superdesportivo Italiano', category: 'carro', variant: 'super', price: 650000 },
  { id: 'car-hyper', name: 'Hipercarro Edição Limitada', category: 'carro', variant: 'hyper', price: 3200000 },
  { id: 'car-concept', name: 'Concept Car Movido a Energia Limpa', category: 'carro', variant: 'concept', price: 40000000 },
  { id: 'car-alien', name: 'Veículo Alienígena Recuperado (Área 51)', category: 'carro', variant: 'alien', price: 2500000000 },
];

const BOAT_DEFS: VehicleDef[] = [
  { id: 'boat-kayak', name: 'Caiaque de Madeira', category: 'iate', variant: 'kayak', price: 600 },
  { id: 'boat-motor', name: 'Barco a Motor Pequeno', category: 'iate', variant: 'motorboat', price: 18000 },
  { id: 'boat-speed', name: 'Lancha Desportiva', category: 'iate', variant: 'speedboat', price: 95000 },
  { id: 'boat-sail', name: 'Veleiro de Luxo', category: 'iate', variant: 'sailboat', price: 420000 },
  { id: 'boat-yacht', name: 'Iate de 20 Metros', category: 'iate', variant: 'yacht', price: 4500000 },
  { id: 'boat-superyacht', name: 'Superiate de 55 Metros', category: 'iate', variant: 'superyacht', price: 85000000 },
  { id: 'boat-megayacht', name: 'Megaiate com Piscina e Heliporto', category: 'iate', variant: 'megayacht', price: 650000000 },
  { id: 'boat-floatingcity', name: 'Cidade Flutuante Autónoma', category: 'iate', variant: 'floatingcity', price: 40000000000 },
];

const PLANE_DEFS: VehicleDef[] = [
  { id: 'plane-ultralight', name: 'Ultraleve Desportivo', category: 'aviao', variant: 'ultralight', price: 35000 },
  { id: 'plane-touring', name: 'Avião de Turismo', category: 'aviao', variant: 'touring', price: 220000 },
  { id: 'plane-helicopter', name: 'Helicóptero Executivo', category: 'aviao', variant: 'helicopter', price: 1800000 },
  { id: 'plane-lightjet', name: 'Jato Leve Privado', category: 'aviao', variant: 'lightjet', price: 9000000 },
  { id: 'plane-longrange', name: 'Jato Executivo Longo Alcance', category: 'aviao', variant: 'longrange', price: 48000000 },
  { id: 'plane-airliner', name: 'Airbus Privado Convertido', category: 'aviao', variant: 'airliner', price: 280000000 },
  { id: 'plane-supersonic', name: 'Jato Supersónico Privado', category: 'aviao', variant: 'supersonic', price: 3500000000 },
  { id: 'plane-spacestation', name: 'Estação Espacial Orbital Privada', category: 'aviao', variant: 'spacestation', price: 500000000000 },
];

export const INITIAL_VEHICLES: Vehicle[] = [...CAR_DEFS, ...BOAT_DEFS, ...PLANE_DEFS].map((v) => ({
  id: v.id,
  name: v.name,
  category: v.category,
  variant: v.variant,
  price: v.price,
  owned: false,
}));

interface CollectibleDef {
  id: string;
  name: string;
  category: 'moedas' | 'relogios' | 'arte';
  tier: CoinTier | WatchTier | ArtTier;
  price: number;
}

const COIN_DEFS: CollectibleDef[] = [
  { id: 'coin-copper-1', name: 'Moeda de Cobre Comum', category: 'moedas', tier: 'copper', price: 50 },
  { id: 'coin-copper-2', name: 'Moeda Romana Desgastada', category: 'moedas', tier: 'copper', price: 220 },
  { id: 'coin-silver-1', name: 'Moeda de Prata Colonial', category: 'moedas', tier: 'silver', price: 1200 },
  { id: 'coin-silver-2', name: 'Táler de Prata Antigo', category: 'moedas', tier: 'silver', price: 3500 },
  { id: 'coin-gold-1', name: 'Soberano de Ouro', category: 'moedas', tier: 'gold', price: 18000 },
  { id: 'coin-gold-2', name: 'Moeda de Ouro do Século XVII', category: 'moedas', tier: 'gold', price: 42000 },
  { id: 'coin-platinum-1', name: 'Moeda de Platina Rara', category: 'moedas', tier: 'platinum', price: 180000 },
  { id: 'coin-diamond-1', name: 'Moeda Cravejada de Diamantes', category: 'moedas', tier: 'diamond', price: 2400000 },
  { id: 'coin-mythic-1', name: 'Moeda Lendária Perdida de Atlântida', category: 'moedas', tier: 'mythic', price: 95000000 },
];

const WATCH_DEFS: CollectibleDef[] = [
  { id: 'watch-basic-1', name: 'Relógio de Pulso Simples', category: 'relogios', tier: 'basic', price: 300 },
  { id: 'watch-basic-2', name: 'Relógio Vintage de Corda', category: 'relogios', tier: 'basic', price: 900 },
  { id: 'watch-steel-1', name: 'Cronógrafo em Aço Inoxidável', category: 'relogios', tier: 'steel', price: 6500 },
  { id: 'watch-gold-1', name: 'Relógio de Ouro Maciço', category: 'relogios', tier: 'gold', price: 48000 },
  { id: 'watch-diamond-1', name: 'Relógio Cravejado de Diamantes', category: 'relogios', tier: 'diamond', price: 650000 },
  { id: 'watch-mythic-1', name: 'Peça Única Feita por Encomenda Real', category: 'relogios', tier: 'mythic', price: 18000000 },
];

const ART_DEFS: CollectibleDef[] = [
  { id: 'art-basic-1', name: 'Pintura de Artista de Rua', category: 'arte', tier: 'basic', price: 400 },
  { id: 'art-fine-1', name: 'Gravura Assinada', category: 'arte', tier: 'fine', price: 5000 },
  { id: 'art-rare-1', name: 'Escultura Contemporânea', category: 'arte', tier: 'rare', price: 85000 },
  { id: 'art-exquisite-1', name: 'Tela de Mestre Contemporâneo', category: 'arte', tier: 'exquisite', price: 2200000 },
  { id: 'art-legendary-1', name: 'Obra-Prima do Renascimento', category: 'arte', tier: 'legendary', price: 120000000 },
  { id: 'art-mythic-1', name: 'Artefacto Artístico de Origem Desconhecida', category: 'arte', tier: 'mythic', price: 8000000000 },
];

export const INITIAL_COLLECTIBLES: Collectible[] = [...COIN_DEFS, ...WATCH_DEFS, ...ART_DEFS].map((c) => ({
  id: c.id,
  name: c.name,
  category: c.category,
  tier: c.tier,
  price: c.price,
  owned: false,
}));

export const RESIDENCE_TIERS = [
  { level: 1, name: 'Apartamento', value: 250000 },
  { level: 5, name: 'Casa de Subúrbio', value: 1200000 },
  { level: 8, name: 'Villa de Luxo', value: 6500000 },
  { level: 11, name: 'Mansão', value: 28000000 },
  { level: 14, name: 'Palácio Privado', value: 195700000 },
];
