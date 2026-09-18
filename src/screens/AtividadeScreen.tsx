import { useGameStore } from '../store/gameStore';
import { formatMoney } from '../utils/format';
import { totalHourlyIncome } from '../utils/netWorth';

export function AtividadeScreen() {
  const state = useGameStore((s) => s);
  const buyBusiness = useGameStore((s) => s.buyBusiness);
  const upgradeBusiness = useGameStore((s) => s.upgradeBusiness);
  const mergeCompanies = useGameStore((s) => s.mergeCompanies);

  const hourly = totalHourlyIncome(state);
  const ownedCount = state.businesses.filter((b) => b.owned).length;

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Atividade</h1>
      </div>

      <div className="activity-summary">
        <div className="activity-value">{formatMoney(hourly, true)}</div>
        <div className="activity-label">Rendimento total por hora</div>
        {state.taxSuspended && <div className="portfolio-suspended">🔒 Suspenso (impostos)</div>}
      </div>

      <div className="activity-actions">
        <button className="primary-btn" onClick={() => document.getElementById('business-list')?.scrollIntoView({ behavior: 'smooth' })}>
          Criar um negócio
        </button>
        <button className="secondary-btn" onClick={mergeCompanies} disabled={ownedCount < 2}>
          Fusões de empresas
        </button>
      </div>

      <div className="section-title-row">
        <h2>As minhas empresas</h2>
        <span className="counter">{ownedCount}/{state.businesses.length}</span>
      </div>

      <div className="business-list" id="business-list">
        {state.businesses.map((b) => {
          const upgradeCost = Math.round(b.baseCost * 0.4 * (b.level + 1));
          return (
            <div key={b.id} className="business-card">
              <div className="business-icon">{b.icon}</div>
              <div className="business-info">
                <div className="business-name">{b.name}</div>
                <div className="business-type">{b.type}</div>
                {b.owned && (
                  <div className="business-level">
                    📶 {b.level} de {b.maxLevel}
                  </div>
                )}
                {b.suspended && <div className="business-suspended">🔒 Suspenso</div>}
              </div>
              <div className="business-actions">
                {!b.owned ? (
                  <button className="buy-btn" onClick={() => buyBusiness(b.id)} disabled={state.cash < b.baseCost}>
                    {formatMoney(b.baseCost)}
                  </button>
                ) : (
                  <button
                    className="buy-btn"
                    onClick={() => upgradeBusiness(b.id)}
                    disabled={b.level >= b.maxLevel || state.cash < upgradeCost}
                  >
                    {b.level >= b.maxLevel ? 'Máximo' : `+1 · ${formatMoney(upgradeCost)}`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
