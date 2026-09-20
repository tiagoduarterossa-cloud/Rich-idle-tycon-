import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { formatMoney } from '../utils/format';
import { RESIDENCE_TIERS } from '../data/items';
import { residenceValue } from '../utils/netWorth';
import { CarArt, BoatArt, PlaneArt, type CarVariant, type BoatVariant, type PlaneVariant } from '../components/vehicleArt';
import { CoinArt, WatchArt, WineArt, ArtworkArt, type CoinTier, type WatchStyle, type RarityTier, type ArtworkKey } from '../components/collectibleArt';
import { ResidenceArt } from '../components/residenceArt';
import { SmartImage } from '../components/SmartImage';
import { tierForRank } from '../utils/tier';
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
  vinhos: { label: 'Vinhos', icon: '🍷' },
  arte: { label: 'Arte', icon: '🎨' },
};

function CollectibleArt({ category, tier }: { category: CollectibleCategory; tier: string }) {
  if (category === 'moedas') return <CoinArt tier={tier as CoinTier} />;
  if (category === 'relogios') return <WatchArt style={tier as WatchStyle} />;
  if (category === 'vinhos') return <WineArt tier={tier as RarityTier} />;
  return <ArtworkArt artKey={tier as ArtworkKey} />;
}

export function ArtigosScreen() {
  const [vehicleCategory, setVehicleCategory] = useState<VehicleCategory>('carro');
  const [vehicleSort, setVehicleSort] = useState<'asc' | 'desc'>('asc');
  const [collectibleCategory, setCollectibleCategory] = useState<CollectibleCategory>('moedas');
  const [showResidencePicker, setShowResidencePicker] = useState(false);
  const state = useGameStore((s) => s);
  const buyVehicle = useGameStore((s) => s.buyVehicle);
  const buyCollectible = useGameStore((s) => s.buyCollectible);
  const moveResidence = useGameStore((s) => s.moveResidence);

  const vehiclesInCategoryByPrice = state.vehicles
    .filter((v) => v.category === vehicleCategory)
    .slice()
    .sort((a, b) => a.price - b.price);
  const rankById = new Map(vehiclesInCategoryByPrice.map((v, i) => [v.id, i]));
  const vehiclesInCategory =
    vehicleSort === 'asc' ? vehiclesInCategoryByPrice : vehiclesInCategoryByPrice.slice().reverse();
  const ownedInCategory = vehiclesInCategory.filter((v) => v.owned).length;

  const collectiblesInCategory = state.collectibles.filter((c) => c.category === collectibleCategory);
  const ownedCollectiblesInCategory = collectiblesInCategory.filter((c) => c.owned).length;

  const isMinor = state.age < 18;
  const currentTier = state.residenceLevel >= 0 ? RESIDENCE_TIERS[state.residenceLevel] : null;
  const currentPrice = currentTier?.price ?? 0;

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

      <div className="sort-pills">
        <button className={vehicleSort === 'desc' ? 'sort-pill sort-pill--active' : 'sort-pill'} onClick={() => setVehicleSort('desc')}>
          Caro primeiro
        </button>
        <button className={vehicleSort === 'asc' ? 'sort-pill sort-pill--active' : 'sort-pill'} onClick={() => setVehicleSort('asc')}>
          Barato primeiro
        </button>
      </div>

      <div className="vehicle-stack">
        {vehiclesInCategory.map((v) => {
          const badge = tierForRank(rankById.get(v.id) ?? 0, vehiclesInCategoryByPrice.length);
          return (
            <div key={v.id} className="vehicle-card">
              <div className="vehicle-card-art">
                <SmartImage src={v.image} alt={v.name} fallback={<VehicleArt category={v.category} variant={v.variant} />} />
              </div>
              <div className="vehicle-card-name">{v.name}</div>
              <div className="vehicle-card-badge" style={{ color: badge.color, borderColor: badge.color }}>
                {badge.grade} <span>|</span> {badge.label}
              </div>
              <div className="vehicle-card-footer">
                <div className="vehicle-card-price">{formatMoney(v.price)}</div>
                {v.owned ? (
                  <span className="owned-tag">Adquirido</span>
                ) : (
                  <button className="buy-btn" onClick={() => buyVehicle(v.id)} disabled={state.cash < v.price}>
                    Comprar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="residence-card">
        <div className="residence-image">
          <ResidenceArt variant={isMinor || !currentTier ? 'parents' : currentTier.variant} />
        </div>
        <div className="residence-info">
          <div className="residence-title">{isMinor || !currentTier ? 'Casa dos Pais' : currentTier.name}</div>
          <div className="residence-value">{isMinor ? '—' : formatMoney(residenceValue(state))}</div>
          {isMinor ? (
            <div className="residence-level">Vives com os teus pais até aos 18 anos</div>
          ) : (
            <button className="residence-upgrade-btn" onClick={() => setShowResidencePicker((v) => !v)}>
              {showResidencePicker ? 'Fechar' : currentTier ? 'Mudar de casa' : 'Escolher a minha primeira casa'}
            </button>
          )}
        </div>
      </div>

      {!isMinor && showResidencePicker && (
        <div className="catalog-panel">
          <div className="catalog-title">Só podes mudar para uma casa mais cara do que a atual</div>
          <div className="business-list">
            {RESIDENCE_TIERS.map((tier, index) => {
              const affordable = state.cash >= tier.price;
              const isCurrent = state.residenceLevel === index;
              const isCheaperOrSame = tier.price <= currentPrice;
              return (
                <div key={tier.name} className="business-card">
                  <div className="residence-picker-art">
                    <ResidenceArt variant={tier.variant} />
                  </div>
                  <div className="business-info">
                    <div className="business-name">{tier.name}</div>
                    <div className="business-type">{formatMoney(tier.price)}</div>
                  </div>
                  <div className="business-actions">
                    {isCurrent ? (
                      <span className="owned-tag">Atual</span>
                    ) : (
                      <button
                        className="buy-btn"
                        onClick={() => moveResidence(index)}
                        disabled={isCheaperOrSame || !affordable}
                      >
                        Mudar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
            <div className={c.category === 'moedas' ? 'item-art item-art--round' : 'item-art'}>
              <SmartImage src={c.image} alt={c.name} fallback={<CollectibleArt category={c.category} tier={c.tier} />} />
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
