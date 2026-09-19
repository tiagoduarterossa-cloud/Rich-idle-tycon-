import type { Vehicle, Collectible } from '../types';
import type { CarVariant, BoatVariant, PlaneVariant } from '../components/vehicleArt';
import type { CoinTier, WatchStyle, RarityTier, ArtworkKey } from '../components/collectibleArt';
import type { ResidenceVariant } from '../components/residenceArt';

interface VehicleDef {
  id: string;
  name: string;
  category: 'carro' | 'aviao' | 'iate';
  variant: CarVariant | BoatVariant | PlaneVariant;
  price: number;
}

const CAR_DEFS: VehicleDef[] = [
  { id: 'car-fiatt', name: 'Fiatt 500', category: 'carro', variant: 'compact', price: 6000 },
  { id: 'car-vw', name: 'Volksvagen Up!', category: 'carro', variant: 'compact', price: 9500 },
  { id: 'car-toyoya', name: 'Toyoya Corolla', category: 'carro', variant: 'sedan', price: 24000 },
  { id: 'car-hondah', name: 'Hondah Civic', category: 'carro', variant: 'sedan', price: 30000 },
  { id: 'car-bmv', name: 'BMV X5', category: 'carro', variant: 'suv', price: 68000 },
  { id: 'car-rangue', name: 'Rangue Rover Sport', category: 'carro', variant: 'suv', price: 95000 },
  { id: 'car-porshe', name: 'Porshe 911', category: 'carro', variant: 'sports', price: 180000 },
  { id: 'car-audii', name: 'Audii R8', category: 'carro', variant: 'sports', price: 220000 },
  { id: 'car-lambo', name: 'Lamborghinni Huracán', category: 'carro', variant: 'super', price: 650000 },
  { id: 'car-ferarri', name: 'Ferarri 488', category: 'carro', variant: 'super', price: 720000 },
  { id: 'car-bugati', name: 'Bugati Chiron', category: 'carro', variant: 'hyper', price: 3200000 },
  { id: 'car-koenigsegg', name: 'Koenigsegg Jasko', category: 'carro', variant: 'hyper', price: 4800000 },
  { id: 'car-rimacc', name: 'Rimacc Nevera Protótipo', category: 'carro', variant: 'concept', price: 40000000 },
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

interface CoinDef {
  id: string;
  name: string;
  tier: CoinTier;
  price: number;
}

const COIN_DEFS: CoinDef[] = [
  { id: 'coin-copper-1', name: 'Moeda de Cobre Comum', tier: 'copper', price: 10 },
  { id: 'coin-copper-2', name: 'Dracma Grega Antiga', tier: 'copper', price: 180 },
  { id: 'coin-silver-1', name: 'Denário Romano de Prata', tier: 'silver', price: 650 },
  { id: 'coin-silver-2', name: 'Táler de Prata Antigo', tier: 'silver', price: 2200 },
  { id: 'coin-gold-1', name: 'Florim de Ouro Florentino', tier: 'gold', price: 4200 },
  { id: 'coin-gold-2', name: 'Soberano Britânico de Ouro', tier: 'gold', price: 12000 },
  { id: 'coin-platinum-1', name: 'Krugerrande Sul-Africano', tier: 'platinum', price: 28000 },
  { id: 'coin-diamond-1', name: 'Dólar de Prata "Flowing Hair" (1794)', tier: 'diamond', price: 2000000 },
  { id: 'coin-diamond-2', name: 'Dobrão Brasher (1787)', tier: 'diamond', price: 9500000 },
  { id: 'coin-mythic-1', name: 'Águia Dupla de 1933', tier: 'mythic', price: 19000000 },
];

interface WatchDef {
  id: string;
  name: string;
  style: WatchStyle;
  price: number;
}

const WATCH_DEFS: WatchDef[] = [
  { id: 'watch-kasio', name: 'Kasio G-Shockk', style: 'digital', price: 80 },
  { id: 'watch-swach', name: 'Swach Original', style: 'digital', price: 150 },
  { id: 'watch-seika', name: 'Seika 5 Sports', style: 'diver', price: 250 },
  { id: 'watch-citizan', name: 'Citizan Eco-Drive', style: 'diver', price: 450 },
  { id: 'watch-tisot', name: 'Tisot PRX', style: 'chrono', price: 900 },
  { id: 'watch-tagheuar', name: 'Tag Heuar Carrera', style: 'chrono', price: 4500 },
  { id: 'watch-omeqa', name: 'Omeqa Speedmaster', style: 'chrono', price: 9000 },
  { id: 'watch-kartier', name: 'Kartier Tank', style: 'tank', price: 22000 },
  { id: 'watch-rolex', name: 'Rolêx Submariner', style: 'classic', price: 38000 },
  { id: 'watch-patek', name: 'Patek Filipe Nautilus', style: 'skeleton', price: 180000 },
  { id: 'watch-ap', name: 'Audemars Piguot Royal Oak', style: 'skeleton', price: 220000 },
  { id: 'watch-rm11', name: 'Richard Millio RM 11', style: 'tonneau', price: 1200000 },
  { id: 'watch-rm-unique', name: 'Richard Millio Tourbillon Único', style: 'tonneau', price: 28000000 },
];

interface WineDef {
  id: string;
  name: string;
  tier: RarityTier;
  price: number;
}

const WINE_DEFS: WineDef[] = [
  { id: 'wine-tinto-mesa', name: 'Vinho Tinto de Mesa', tier: 'basic', price: 8 },
  { id: 'wine-casa', name: 'Vinho da Casa Reserva', tier: 'basic', price: 25 },
  { id: 'wine-rioja', name: 'Riocha Reserva', tier: 'fine', price: 60 },
  { id: 'wine-chianti', name: 'Kianti Clássico', tier: 'fine', price: 90 },
  { id: 'wine-bordeaux', name: 'Bordeaux Supérieur Privado', tier: 'rare', price: 350 },
  { id: 'wine-barolo', name: 'Barolô do Piemonte', tier: 'rare', price: 600 },
  { id: 'wine-sassicaia', name: 'Sassicaya Toscana', tier: 'exquisite', price: 2800 },
  { id: 'wine-domperignon', name: 'Dom Perignan Vintage', tier: 'exquisite', price: 6500 },
  { id: 'wine-margaux', name: 'Château Margôt Grand Cru', tier: 'legendary', price: 85000 },
  { id: 'wine-lafite', name: 'Château Lafitt Rothschild 1945', tier: 'legendary', price: 320000 },
  { id: 'wine-romaneeconti', name: 'Domaine Romané-Konti Grand Cru', tier: 'mythic', price: 2500000 },
  { id: 'wine-screamingeagle', name: 'Screaming Ealge Cabernet Único', tier: 'mythic', price: 8000000 },
];

interface ArtDef {
  id: string;
  name: string;
  artKey: ArtworkKey;
  price: number;
}

const ART_DEFS: ArtDef[] = [
  { id: 'art-street', name: 'Pintura de Artista de Rua', artKey: 'street', price: 150 },
  { id: 'art-watercolor', name: 'Aguarela de Feira de Artesanato', artKey: 'watercolor', price: 400 },
  { id: 'art-engraving', name: 'Gravura Numerada de Galeria', artKey: 'engraving', price: 3000 },
  { id: 'art-sculpture', name: 'Escultura de Artista Emergente', artKey: 'sculpture', price: 15000 },
  { id: 'art-pearlearring', name: 'A Rapariga com Brinco de Pérola', artKey: 'pearlearring', price: 650000 },
  { id: 'art-scream', name: 'O Grito', artKey: 'scream', price: 1200000 },
  { id: 'art-starrynight', name: 'A Noite Estrelada', artKey: 'starrynight', price: 45000000 },
  { id: 'art-lasmeninas', name: 'As Meninas', artKey: 'lasmeninas', price: 60000000 },
  { id: 'art-guernica', name: 'Guernica', artKey: 'guernica', price: 200000000 },
  { id: 'art-creationofadam', name: 'A Criação de Adão', artKey: 'creationofadam', price: 150000000 },
  { id: 'art-monalisa', name: 'Mona Lisa', artKey: 'monalisa', price: 900000000 },
];

export const INITIAL_COLLECTIBLES: Collectible[] = [
  ...COIN_DEFS.map((c) => ({ id: c.id, name: c.name, category: 'moedas' as const, tier: c.tier, price: c.price, owned: false })),
  ...WATCH_DEFS.map((w) => ({ id: w.id, name: w.name, category: 'relogios' as const, tier: w.style, price: w.price, owned: false })),
  ...WINE_DEFS.map((w) => ({ id: w.id, name: w.name, category: 'vinhos' as const, tier: w.tier, price: w.price, owned: false })),
  ...ART_DEFS.map((a) => ({ id: a.id, name: a.name, category: 'arte' as const, tier: a.artKey, price: a.price, owned: false })),
];

export interface ResidenceTier {
  name: string;
  price: number;
  variant: ResidenceVariant;
}

export const RESIDENCE_TIERS: ResidenceTier[] = [
  { name: 'Quarto Alugado', price: 2500, variant: 'studio' },
  { name: 'Apartamento Estúdio', price: 9000, variant: 'studio' },
  { name: 'Apartamento T1', price: 32000, variant: 'apartment' },
  { name: 'Apartamento T3 com Varanda', price: 95000, variant: 'apartment' },
  { name: 'Moradia Geminada', price: 280000, variant: 'house' },
  { name: 'Moradia Isolada com Jardim', price: 750000, variant: 'house' },
  { name: 'Villa com Piscina', price: 2600000, variant: 'villa' },
  { name: 'Mansão de Luxo', price: 28000000, variant: 'mansion' },
  { name: 'Palácio Privado', price: 250000000, variant: 'palace' },
  { name: 'Resort Pessoal numa Ilha Privada', price: 2200000000, variant: 'island' },
];
