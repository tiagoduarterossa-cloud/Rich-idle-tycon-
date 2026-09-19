import type { Vehicle, Collectible } from '../types';
import type { CarVariant, BoatVariant, PlaneVariant } from '../components/vehicleArt';
import type { CoinTier, WatchStyle, RarityTier, ArtworkKey } from '../components/collectibleArt';
import type { ResidenceVariant } from '../components/residenceArt';
import { wikimediaImage } from '../utils/wikimedia';

interface VehicleDef {
  id: string;
  name: string;
  category: 'carro' | 'aviao' | 'iate';
  variant: CarVariant | BoatVariant | PlaneVariant;
  price: number;
  image?: string;
}

const CAR_DEFS: VehicleDef[] = [
  { id: 'car-fiat500', name: 'Fiat 500', category: 'carro', variant: 'compact', price: 6000, image: wikimediaImage('Fiat 500.jpg') },
  { id: 'car-corolla', name: 'Toyota Corolla', category: 'carro', variant: 'sedan', price: 24000, image: wikimediaImage('2010 Toyota Corolla.jpg') },
  { id: 'car-x5', name: 'BMW X5', category: 'carro', variant: 'suv', price: 68000, image: wikimediaImage('2024 BMW X5.jpg') },
  { id: 'car-911', name: 'Porsche 911', category: 'carro', variant: 'sports', price: 180000, image: wikimediaImage('Porsche 911 GT1.jpg') },
  { id: 'car-488', name: 'Ferrari 488', category: 'carro', variant: 'super', price: 650000, image: wikimediaImage('Ferrari 488 GTB.jpg') },
  { id: 'car-huracan', name: 'Lamborghini Huracán', category: 'carro', variant: 'super', price: 900000, image: wikimediaImage('Lamborghini Huracan Performante.jpg') },
  { id: 'car-chiron', name: 'Bugatti Chiron', category: 'carro', variant: 'hyper', price: 3200000, image: wikimediaImage('Bugatti Chiron.jpg') },
  { id: 'car-jesko', name: 'Koenigsegg Jesko', category: 'carro', variant: 'hyper', price: 4800000, image: wikimediaImage('Koenigsegg Jesko 8.jpg') },
  { id: 'car-boattail', name: 'Rolls-Royce Boat Tail', category: 'carro', variant: 'concept', price: 28000000, image: wikimediaImage('Rolls-Royce Boat Tail front.jpg') },
  { id: 'car-nevera', name: 'Rimac Nevera', category: 'carro', variant: 'alien', price: 45000000, image: wikimediaImage('Rimac Nevera.jpg') },
];

const BOAT_DEFS: VehicleDef[] = [
  { id: 'boat-kayak', name: 'Caiaque', category: 'iate', variant: 'kayak', price: 600, image: wikimediaImage('Sea Kayak.JPG') },
  { id: 'boat-motor', name: 'Barco a Motor', category: 'iate', variant: 'motorboat', price: 18000, image: wikimediaImage('Motor yacht in Poros.JPG') },
  { id: 'boat-lancha', name: 'Lancha de Luxo', category: 'iate', variant: 'speedboat', price: 95000, image: wikimediaImage('Luxury yacht Senses 2.JPG') },
  { id: 'boat-ladym', name: 'Iate "Lady M"', category: 'iate', variant: 'yacht', price: 420000, image: wikimediaImage('Lady M yacht.jpg') },
  { id: 'boat-azzam', name: 'Superiate "Azzam"', category: 'iate', variant: 'superyacht', price: 85000000, image: wikimediaImage('AzzamCadiz.jpg') },
  { id: 'boat-eclipse', name: 'Megaiate "Eclipse"', category: 'iate', variant: 'megayacht', price: 650000000, image: wikimediaImage('Eclipse Yacht.jpg') },
];

const PLANE_DEFS: VehicleDef[] = [
  { id: 'plane-cessna172', name: 'Cessna 172', category: 'aviao', variant: 'touring', price: 220000, image: wikimediaImage('Cessna 172 - 2.jpg') },
  { id: 'plane-r44', name: 'Robinson R44', category: 'aviao', variant: 'helicopter', price: 1800000, image: wikimediaImage('Robinson R44 Raven II Bakoma.JPG') },
  { id: 'plane-citation', name: 'Cessna Citation Jet', category: 'aviao', variant: 'lightjet', price: 9000000, image: wikimediaImage('Cessna Citation Jet.jpg') },
  { id: 'plane-g650', name: 'Gulfstream G650', category: 'aviao', variant: 'longrange', price: 48000000, image: wikimediaImage('Gulfstream G650.JPG') },
  { id: 'plane-concorde', name: 'Concorde', category: 'aviao', variant: 'supersonic', price: 500000000, image: wikimediaImage('British Concorde.jpg') },
  { id: 'plane-iss', name: 'Estação Espacial Internacional', category: 'aviao', variant: 'spacestation', price: 500000000000, image: wikimediaImage('International Space Station.jpg') },
];

export const INITIAL_VEHICLES: Vehicle[] = [...CAR_DEFS, ...BOAT_DEFS, ...PLANE_DEFS].map((v) => ({
  id: v.id,
  name: v.name,
  category: v.category,
  variant: v.variant,
  price: v.price,
  owned: false,
  image: v.image,
}));

interface CoinDef {
  id: string;
  name: string;
  tier: CoinTier;
  price: number;
  image?: string;
}

const COIN_DEFS: CoinDef[] = [
  { id: 'coin-copper-1', name: 'Moeda de Cobre Comum', tier: 'copper', price: 10 },
  { id: 'coin-copper-2', name: 'Dracma Grega Antiga', tier: 'copper', price: 180, image: wikimediaImage('A collection of Ancient Greek silver coins.jpg') },
  { id: 'coin-silver-1', name: 'Denário Romano de Prata', tier: 'silver', price: 650, image: wikimediaImage('Roman - Coin with Denarius with Roma - Walters 59763.jpg') },
  { id: 'coin-silver-2', name: 'Táler de Prata Antigo', tier: 'silver', price: 2200 },
  { id: 'coin-gold-1', name: 'Florim de Ouro Florentino', tier: 'gold', price: 4200 },
  { id: 'coin-gold-2', name: 'Soberano Britânico de Ouro', tier: 'gold', price: 12000, image: wikimediaImage('English Sovereign 1887.jpg') },
  { id: 'coin-platinum-1', name: 'Krugerrand Sul-Africano', tier: 'platinum', price: 28000, image: wikimediaImage('Gold aureus coins.jpg') },
  { id: 'coin-diamond-1', name: 'Dólar de Prata "Flowing Hair" (1794)', tier: 'diamond', price: 2000000 },
  { id: 'coin-diamond-2', name: 'Dobrão Brasher (1787)', tier: 'diamond', price: 9500000 },
  { id: 'coin-mythic-1', name: 'Águia Dupla de 1933', tier: 'mythic', price: 19000000, image: wikimediaImage('1933 double eagle.JPG') },
];

interface WatchDef {
  id: string;
  name: string;
  style: WatchStyle;
  price: number;
  image?: string;
}

const WATCH_DEFS: WatchDef[] = [
  { id: 'watch-casio', name: 'Casio G-Shock', style: 'digital', price: 80, image: wikimediaImage('Casio G-Shock DW-5600E wristwatch.jpg') },
  { id: 'watch-seiko', name: 'Seiko 5', style: 'diver', price: 250, image: wikimediaImage('Blue Seiko 5 Watch.jpg') },
  { id: 'watch-citizen', name: 'Citizen Eco-Drive', style: 'diver', price: 450, image: wikimediaImage("Citizen Diver's 200m Eco Drive - Diving watch.jpg") },
  { id: 'watch-tissot', name: 'Tissot', style: 'chrono', price: 900, image: wikimediaImage('Tissotwatchtouch.jpg') },
  { id: 'watch-tagheuer', name: 'Tag Heuer Carrera', style: 'chrono', price: 4500, image: wikimediaImage('TAG Heuer Carrera blue.jpg') },
  { id: 'watch-omega', name: 'Omega Speedmaster', style: 'chrono', price: 9000, image: wikimediaImage('Omega speedmaster.jpg') },
  { id: 'watch-cartier', name: 'Cartier Tank', style: 'tank', price: 22000, image: wikimediaImage('Cartier Tank.jpg') },
  { id: 'watch-rolex', name: 'Rolex Submariner', style: 'classic', price: 38000, image: wikimediaImage('Rolex-Submariner.jpg') },
  { id: 'watch-patek', name: 'Patek Philippe Nautilus', style: 'skeleton', price: 180000, image: wikimediaImage('Patek-Philippe-Nautilus-5711.jpg') },
  { id: 'watch-rm11', name: 'Richard Mille RM 11', style: 'tonneau', price: 1200000 },
];

interface WineDef {
  id: string;
  name: string;
  tier: RarityTier;
  price: number;
  image?: string;
}

const WINE_DEFS: WineDef[] = [
  { id: 'wine-tinto-mesa', name: 'Vinho Tinto de Mesa', tier: 'basic', price: 8, image: wikimediaImage('Red wine.jpg') },
  { id: 'wine-aleatico', name: 'Vinho Aleático', tier: 'basic', price: 25, image: wikimediaImage('Aleatico red wine bottle.jpg') },
  { id: 'wine-bordeaux', name: 'Bordeaux Supérieur', tier: 'fine', price: 350, image: wikimediaImage('Château Recougne Bordeaux Supérieur red wine.jpg') },
  { id: 'wine-lagrange', name: 'Château Lagrange 1990', tier: 'rare', price: 85000, image: wikimediaImage('Château Lagrange 1990 J2.jpg') },
  { id: 'wine-domperignon', name: 'Dom Pérignon Vintage', tier: 'exquisite', price: 6500, image: wikimediaImage('DomPerignonChampagne.jpg') },
  { id: 'wine-margaux', name: 'Château Margaux 1994', tier: 'legendary', price: 320000, image: wikimediaImage('Margaux94_1.jpg') },
];

interface ArtDef {
  id: string;
  name: string;
  artKey: ArtworkKey;
  price: number;
  image?: string;
}

const ART_DEFS: ArtDef[] = [
  { id: 'art-street', name: 'Pintura de Artista de Rua', artKey: 'street', price: 150, image: wikimediaImage('Street Art.jpg') },
  { id: 'art-pearlearring', name: 'A Rapariga com Brinco de Pérola', artKey: 'pearlearring', price: 650000, image: wikimediaImage('Girl with a Pearl Earring.jpg') },
  { id: 'art-scream', name: 'O Grito', artKey: 'scream', price: 1200000, image: wikimediaImage('Edvard-Munch-The-Scream.jpg') },
  { id: 'art-starrynight', name: 'A Noite Estrelada', artKey: 'starrynight', price: 45000000, image: wikimediaImage('VanGogh-starry night.jpg') },
  { id: 'art-lasmeninas', name: 'As Meninas', artKey: 'lasmeninas', price: 60000000, image: wikimediaImage('Velazquez-Meninas.jpg') },
  { id: 'art-creationofadam', name: 'A Criação de Adão', artKey: 'creationofadam', price: 150000000, image: wikimediaImage('Creation of Adam Michelangelo.jpg') },
  { id: 'art-guernica', name: 'Guernica', artKey: 'guernica', price: 200000000, image: wikimediaImage("Pablo Picasso's Guernica.jpg") },
  { id: 'art-monalisa', name: 'Mona Lisa', artKey: 'monalisa', price: 900000000, image: wikimediaImage('Mona Lisa.jpg') },
];

export const INITIAL_COLLECTIBLES: Collectible[] = [
  ...COIN_DEFS.map((c) => ({ id: c.id, name: c.name, category: 'moedas' as const, tier: c.tier, price: c.price, owned: false, image: c.image })),
  ...WATCH_DEFS.map((w) => ({ id: w.id, name: w.name, category: 'relogios' as const, tier: w.style, price: w.price, owned: false, image: w.image })),
  ...WINE_DEFS.map((w) => ({ id: w.id, name: w.name, category: 'vinhos' as const, tier: w.tier, price: w.price, owned: false, image: w.image })),
  ...ART_DEFS.map((a) => ({ id: a.id, name: a.name, category: 'arte' as const, tier: a.artKey, price: a.price, owned: false, image: a.image })),
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
