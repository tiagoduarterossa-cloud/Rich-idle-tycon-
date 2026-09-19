import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { formatMoney } from '../utils/format';
import { totalHourlyIncome } from '../utils/netWorth';
import { BUSINESS_CATALOG, nextSlotCost, creationCost } from '../data/businesses';
import { ADULT_AGE } from '../utils/netWorth';

export function AtividadeScreen() {
  const [showCatalog, setShowCatalog] = useState(false);
  const state = useGameStore((s) => s);
  const createBusiness = useGameStore((s) => s.createBusiness);
  const upgradeBusiness = useGameStore((s) => s.upgradeBusiness);
  const mergeCompanies = useGameStore((s) => s.mergeCompanies);
  const buyBusinessSlot = useGameStore((s) => s.buyBusinessSlot);

  const hourly = totalHourlyIncome(state);
  const createdCount = state.businesses.filter((b) => !b.isBank).length;
  const slotsFull = createdCount >= state.businessSlots;
  const slotCost = nextSlotCost(state.businessSlots);

  if (state.age < ADULT_AGE) {
    return (
      <div className="screen">
        <div className="screen-header">
          <h1>Atividade</h1>
        </div>
        <div className="too-young-card">
          <div className="too-young-icon">🔒</div>
          <div className="too-young-text">
            Gerir negócios é coisa de adultos. Volta quando fizeres 18 anos — até lá, ganha dinheiro na Escola com
            trabalhos e hobbies, ou investe em ações.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Atividade</h1>
        <button className="slots-chip" onClick={buyBusinessSlot} disabled={state.cash < slotCost}>
          🧩 Slots {createdCount}/{state.businessSlots} · +{formatMoney(slotCost)}
        </button>
      </div>

      <div className="activity-summary">
        <div className="activity-value">{formatMoney(hourly, true)}</div>
        <div className="activity-label">Rendimento total por hora</div>
        {state.taxSuspended && <div className="portfolio-suspended">🔒 Suspenso (impostos)</div>}
      </div>

      <div className="activity-actions">
        <button className="primary-btn" onClick={() => setShowCatalog((v) => !v)}>
          {showCatalog ? 'Fechar catálogo' : 'Criar um negócio'}
        </button>
        <button className="secondary-btn" onClick={mergeCompanies} disabled={state.businesses.length < 2}>
          Fusões de empresas
        </button>
      </div>

      {showCatalog && (
        <div className="catalog-panel">
          <div className="catalog-title">
            {slotsFull ? 'Sem slots livres — compra mais slots para criar mais negócios' : 'Escolhe o tipo de negócio a fundar'}
          </div>
          <div className="business-list">
            {BUSINESS_CATALOG.map((tpl) => {
              const existingOfType = state.businesses.filter((b) => b.templateId === tpl.id).length;
              const cost = creationCost(tpl, existingOfType);
              return (
                <div key={tpl.id} className="business-card">
                  <div className="business-icon">{tpl.icon}</div>
                  <div className="business-info">
                    <div className="business-name">{tpl.name}</div>
                    <div className="business-type">
                      {tpl.type}
                      {existingOfType > 0 ? ` · já tens ${existingOfType}` : ''}
                    </div>
                  </div>
                  <div className="business-actions">
                    <button
                      className="buy-btn"
                      onClick={() => createBusiness(tpl.id)}
                      disabled={slotsFull || state.cash < cost}
                    >
                      {formatMoney(cost)}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="section-title-row">
        <h2>As minhas empresas</h2>
        <span className="counter">{state.businesses.length}</span>
      </div>

      <div className="business-list">
        {state.businesses.map((b) => {
          const upgradeCost = Math.round(b.baseCost * 0.4 * (b.level + 1));
          return (
            <div key={b.id} className="business-card">
              <div className="business-icon">{b.icon}</div>
              <div className="business-info">
                <div className="business-name">
                  {b.name} {b.isBank && <span className="fixed-tag">Fixo</span>}
                </div>
                <div className="business-type">{b.type}</div>
                <div className="business-level">
                  📶 {b.level} de {b.maxLevel}
                </div>
                {b.suspended && <div className="business-suspended">🔒 Suspenso</div>}
              </div>
              <div className="business-actions">
                <button
                  className="buy-btn"
                  onClick={() => upgradeBusiness(b.id)}
                  disabled={b.level >= b.maxLevel || state.cash < upgradeCost}
                >
                  {b.level >= b.maxLevel ? 'Máximo' : `+1 · ${formatMoney(upgradeCost)}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
