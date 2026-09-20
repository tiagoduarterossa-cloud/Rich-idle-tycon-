import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { formatMoney } from '../utils/format';
import { totalHourlyIncome, businessNetIncome, ADULT_AGE } from '../utils/netWorth';
import { BUSINESS_CATALOG, nextSlotCost, creationCost } from '../data/businesses';
import { HOBBIES, CAREER_THRESHOLD } from '../data/hobbies';

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
  const minCatalogAge = Math.min(...BUSINESS_CATALOG.map((t) => t.minAge ?? ADULT_AGE));
  const careerUnlocked = state.mainHobbyProgress >= CAREER_THRESHOLD;
  const availableTemplates = BUSINESS_CATALOG.filter((t) => {
    if (state.age < (t.minAge ?? ADULT_AGE)) return false;
    if (t.requiresCareer && !(state.mainHobby === t.requiresCareer && careerUnlocked)) return false;
    return true;
  });
  const isAdult = state.age >= ADULT_AGE;
  const mainHobbyInfo = state.mainHobby ? HOBBIES.find((h) => h.id === state.mainHobby) : null;

  if (state.age < minCatalogAge) {
    return (
      <div className="screen">
        <div className="screen-header">
          <h1>Atividade</h1>
        </div>
        <div className="too-young-card">
          <div className="too-young-icon">🔒</div>
          <div className="too-young-text">
            Gerir negócios é coisa de gente crescida. Volta quando fizeres {minCatalogAge} anos — até lá, ganha
            dinheiro na Escola com trabalhos e hobbies, ou investe em ações.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Atividade</h1>
        <button className="slots-chip" onClick={buyBusinessSlot} disabled={state.cash < slotCost || !isAdult}>
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
        <button className="secondary-btn" onClick={mergeCompanies} disabled={state.businesses.length < 2 || !isAdult}>
          Fusões de empresas
        </button>
      </div>

      {showCatalog && (
        <div className="catalog-panel">
          <div className="catalog-title">
            {slotsFull ? 'Sem slots livres — compra mais slots para criar mais negócios' : 'Escolhe o tipo de negócio a fundar'}
          </div>
          {!isAdult && (
            <div className="catalog-hint">Negócios maiores (cafés, startups, companhias aéreas...) só a partir dos 18 anos.</div>
          )}
          {mainHobbyInfo && !careerUnlocked && (
            <div className="catalog-hint">
              🎯 Carreira de {mainHobbyInfo.name} desbloqueia aos {state.mainHobbyProgress}/{CAREER_THRESHOLD} anos de
              dedicação (pratica {mainHobbyInfo.name} na Escola).
            </div>
          )}
          <div className="business-list">
            {availableTemplates.map((tpl) => {
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
          const tpl = BUSINESS_CATALOG.find((t) => t.id === b.templateId);
          const bizMinAge = tpl?.minAge ?? ADULT_AGE;
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
                {!b.isBank && (
                  <div className="business-market">
                    <div className="business-market-bar">
                      <div
                        className="business-market-fill"
                        style={{
                          width: `${b.marketShare}%`,
                          background: b.marketShare < 30 ? '#ef4444' : b.marketShare < 60 ? '#f59e0b' : '#22c55e',
                        }}
                      />
                    </div>
                    <span className="business-market-label">{Math.round(b.marketShare)}% quota de mercado</span>
                  </div>
                )}
                <div className="business-net-income">{formatMoney(businessNetIncome(b), true)}/h líquido</div>
                {b.suspended && <div className="business-suspended">🔒 Suspenso</div>}
              </div>
              <div className="business-actions">
                <button
                  className="buy-btn"
                  onClick={() => upgradeBusiness(b.id)}
                  disabled={b.level >= b.maxLevel || state.cash < upgradeCost || state.age < bizMinAge}
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
