import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { formatMoney } from '../utils/format';
import { RESIDENCE_TIERS } from '../data/items';
import { residenceValue } from '../utils/netWorth';
import { CarArt, BoatArt, PlaneArt, type CarVariant, type BoatVariant, type PlaneVariant } from '../components/vehicleArt';
import { CoinArt, WatchArt, ArtworkArt, type CoinTier, type WatchTier, type ArtTier } from '../components/collectibleArt';
import type { CollectibleCategory } from '../types';

type VehicleCategory = 'carro' | 'aviao' | 'iate';

const VEHICLE_CATEGORY_META: Record<VehicleCategory, { label: string; icon: string }> = {
  carro: { label: 'Garagem', icon: '🚗' },
  aviao: { label: 'Hangar', icon: '✈️' },
  iate: { label: 'Porto', icon: '🛥️' },
};

function VehicleArt({ category, variant }: { category: VehicleCategory; variant: string }) {
  if (category === 'carro') return <CarArt variant={variant as CarVariant} />;
  if (category === 'aviao') return <PlaneArt variant={variant as PlaneVariant} />;
  return <BoatArt variant={variant as BoatVariant} />;
}

const COLLECTIBLE_CATEGORY_META: Record<CollectibleCategory, { label: string; icon: string }> = {
  moedas: { label: 'Moedas', icon: '🪙' },
  relogios: { label: 'Relógios', icon: '⌚' },
  arte: { label: 'Arte', icon: '🎨' },
};

function CollectibleArt({ category, tier }: { category: CollectibleCategory; tier: string }) {
  if (category === 'moedas') return <CoinArt tier={tier as CoinTier} />;
  if (category === 'relogios') return <WatchArt tier={tier as WatchTier} />;
  return <ArtworkArt tier={tier as ArtTier} />;
}

export function ArtigosScreen() {
  const [vehicleCategory, setVehicleCategory] = useState<VehicleCategory>('carro');
  const [collectibleCategory, setCollectibleCategory] = useState<CollectibleCategory>('moedas');
  const state = useGameStore((s) => s);
  const buyVehicle = useGameStore((s) => s.buyVehicle);
  const buyCollectible = useGameStore((s) => s.buyCollectible);
  const upgradeResidence = useGameStore((s) => s.upgradeResidence);

  const nextTier = RESIDENCE_TIERS.find((t) => t.level > state.residenceLevel);
  const upgradeCost = Math.round(50000 * Math.pow(1.8, state.residenceLevel));

  const vehiclesInCategory = state.vehicles.filter((v) => v.category === vehicleCategory);
  const ownedInCategory = vehiclesInCategory.filter((v) => v.owned).length;

  const collectiblesInCategory = state.collectibles.filter((c) => c.category === collectibleCategory);
  const ownedCollectiblesInCategory = collectiblesInCategory.filter((c) => c.owned).length;

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Artigos</h1>
      </div>

      <div className="category-tabs">
        {(Object.keys(VEHICLE_CATEGORY_META) as VehicleCategory[]).map((cat) => {
          const meta = VEHICLE_CATEGORY_META[cat];
          const items = state.vehicles.filter((v) => v.category === cat);
          const owned = items.filter((v) => v.owned).length;
          return (
            <button
              key={cat}
              className={cat === vehicleCategory ? 'category-tab category-tab--active' : 'category-tab'}
              onClick={() => setVehicleCategory(cat)}
            >
              <div className="category-tab-icon">{meta.icon}</div>
              <div className="category-tab-label">{meta.label}</div>
              <div className="category-tab-count">{owned}/{items.length}</div>
            </button>
          );
        })}
      </div>

      <div className="section-title-row">
        <h2>{VEHICLE_CATEGORY_META[vehicleCategory].label}</h2>
        <span className="counter">{ownedInCategory}/{vehiclesInCategory.length}</span>
      </div>

      <div className="item-grid">
        {vehiclesInCategory.map((v) => (
          <div key={v.id} className="item-card">
            <div className="item-art">
              <VehicleArt category={v.category} variant={v.variant} />
            </div>
            <div className="item-name">{v.name}</div>
            <div className="item-price">{formatMoney(v.price)}</div>
            {v.owned ? (
              <span className="owned-tag">Adquirido</span>
            ) : (
              <button className="buy-btn" onClick={() => buyVehicle(v.id)} disabled={state.cash < v.price}>
                Comprar
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="residence-card">
        <div className="residence-image">🏛️</div>
        <div className="residence-info">
          <div className="residence-title">Residência</div>
          <div className="residence-value">{formatMoney(residenceValue(state))}</div>
          <div className="residence-level">Nível {state.residenceLevel}</div>
          {nextTier ? (
            <button className="residence-upgrade-btn" onClick={upgradeResidence} disabled={state.cash < upgradeCost}>
              Melhorar · {formatMoney(upgradeCost)}
            </button>
          ) : (
            <div className="residence-max">Nível máximo atingido</div>
          )}
        </div>
      </div>

      <div className="section-title-row">
        <h2>Coleções</h2>
      </div>

      <div className="category-tabs">
        {(Object.keys(COLLECTIBLE_CATEGORY_META) as CollectibleCategory[]).map((cat) => {
          const meta = COLLECTIBLE_CATEGORY_META[cat];
          const items = state.collectibles.filter((c) => c.category === cat);
          const owned = items.filter((c) => c.owned).length;
          return (
            <button
              key={cat}
              className={cat === collectibleCategory ? 'category-tab category-tab--active' : 'category-tab'}
              onClick={() => setCollectibleCategory(cat)}
            >
              <div className="category-tab-icon">{meta.icon}</div>
              <div className="category-tab-label">{meta.label}</div>
              <div className="category-tab-count">{owned}/{items.length}</div>
            </button>
          );
        })}
      </div>

      <div className="section-title-row">
        <h2>{COLLECTIBLE_CATEGORY_META[collectibleCategory].label}</h2>
        <span className="counter">{ownedCollectiblesInCategory}/{collectiblesInCategory.length}</span>
      </div>

      <div className="item-grid">
        {collectiblesInCategory.map((c) => (
          <div key={c.id} className="item-card">
            <div className="item-art item-art--round">
              <CollectibleArt category={c.category} tier={c.tier} />
            </div>
            <div className="item-name">{c.name}</div>
            <div className="item-price">{formatMoney(c.price)}</div>
            {c.owned ? (
              <span className="owned-tag">Adquirido</span>
            ) : (
              <button className="buy-btn" onClick={() => buyCollectible(c.id)} disabled={state.cash < c.price}>
                Comprar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
