import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { formatMoney } from '../utils/format';
import { RESIDENCE_TIERS } from '../data/items';
import { residenceValue } from '../utils/netWorth';

type Category = 'carro' | 'aviao' | 'iate';

const CATEGORY_META: Record<Category, { label: string; icon: string }> = {
  carro: { label: 'Garagem', icon: '🚗' },
  aviao: { label: 'Hangar', icon: '✈️' },
  iate: { label: 'Porto', icon: '🛥️' },
};

export function ArtigosScreen() {
  const [category, setCategory] = useState<Category>('carro');
  const state = useGameStore((s) => s);
  const buyVehicle = useGameStore((s) => s.buyVehicle);
  const buyCollectible = useGameStore((s) => s.buyCollectible);
  const upgradeResidence = useGameStore((s) => s.upgradeResidence);

  const nextTier = RESIDENCE_TIERS.find((t) => t.level > state.residenceLevel);
  const upgradeCost = Math.round(50000 * Math.pow(1.8, state.residenceLevel));

  const vehiclesInCategory = state.vehicles.filter((v) => v.category === category);
  const ownedInCategory = vehiclesInCategory.filter((v) => v.owned).length;

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Artigos</h1>
      </div>

      <div className="category-tabs">
        {(Object.keys(CATEGORY_META) as Category[]).map((cat) => {
          const meta = CATEGORY_META[cat];
          const items = state.vehicles.filter((v) => v.category === cat);
          const owned = items.filter((v) => v.owned).length;
          return (
            <button key={cat} className={cat === category ? 'category-tab category-tab--active' : 'category-tab'} onClick={() => setCategory(cat)}>
              <div className="category-tab-icon">{meta.icon}</div>
              <div className="category-tab-label">{meta.label}</div>
              <div className="category-tab-count">{owned}/{items.length}</div>
            </button>
          );
        })}
      </div>

      <div className="section-title-row">
        <h2>{CATEGORY_META[category].label}</h2>
        <span className="counter">{ownedInCategory}/{vehiclesInCategory.length}</span>
      </div>

      <div className="business-list">
        {vehiclesInCategory.map((v) => (
          <div key={v.id} className="business-card">
            <div className="business-icon">{CATEGORY_META[v.category].icon}</div>
            <div className="business-info">
              <div className="business-name">{v.name}</div>
              <div className="business-type">{formatMoney(v.price)}</div>
            </div>
            <div className="business-actions">
              {v.owned ? (
                <span className="owned-tag">Adquirido</span>
              ) : (
                <button className="buy-btn" onClick={() => buyVehicle(v.id)} disabled={state.cash < v.price}>
                  Comprar
                </button>
              )}
            </div>
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

      <div className="collectible-grid">
        {state.collectibles.map((c) => (
          <div key={c.id} className="collectible-card">
            <div className="collectible-icon">{c.icon}</div>
            <div className="collectible-name">{c.name}</div>
            <div className="collectible-price">{formatMoney(c.price)}</div>
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
