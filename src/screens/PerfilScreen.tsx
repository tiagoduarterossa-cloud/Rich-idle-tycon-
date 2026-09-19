import { useGameStore } from '../store/gameStore';
import { useAccountStore } from '../store/accountStore';
import {
  businessValue,
  stocksValue,
  realEstateValue,
  cryptoValue,
  vehiclesValue,
  collectiblesValue,
  residenceValue,
  netWorth,
} from '../utils/netWorth';
import { formatMoney } from '../utils/format';
import { HeartPulseIcon, SmileIcon, BrainIcon, StarIcon } from '../components/icons';

export function PerfilScreen() {
  const state = useGameStore((s) => s);
  const payAllTaxes = useGameStore((s) => s.payAllTaxes);
  const advanceYear = useGameStore((s) => s.advanceYear);
  const username = useAccountStore((s) => s.username);
  const logout = useAccountStore((s) => s.logout);

  const categories = [
    { key: 'saldo', label: 'Saldo', value: Math.max(0, state.cash), color: '#1f7fb0' },
    { key: 'empresas', label: 'Empresas', value: businessValue(state), color: '#f16a6a' },
    { key: 'acoes', label: 'Ações', value: stocksValue(state), color: '#f6b84c' },
    { key: 'imobiliario', label: 'Imobiliário', value: realEstateValue(state), color: '#b48ccf' },
    { key: 'transporte', label: 'Transporte', value: vehiclesValue(state), color: '#4caf7d' },
    { key: 'colecoes', label: 'Coleções', value: collectiblesValue(state), color: '#8b7cf6' },
    { key: 'cripto', label: 'Criptoativos', value: cryptoValue(state), color: '#52d6b3' },
    { key: 'residencia', label: 'Residência', value: residenceValue(state), color: '#1e4a8c' },
  ];

  const total = netWorth(state);
  const taxDue = state.taxOwed;

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Perfil</h1>
        <div className="avatar-chip">👤 ▾</div>
      </div>

      <div className="fortune-block">
        <div className="fortune-value">{formatMoney(total)}</div>
        <div className="fortune-label">Fortuna</div>
      </div>

      <div className="segmented-bar">
        {categories.map((c) => (
          <div
            key={c.key}
            className="segmented-bar-piece"
            style={{ background: c.color, flexGrow: Math.max(c.value, total * 0.01) }}
          />
        ))}
      </div>

      <div className="category-grid">
        {categories.map((c) => (
          <div key={c.key} className="category-card" style={{ borderLeftColor: c.color }}>
            <div className="category-label">{c.label}</div>
            <div className="category-value">{formatMoney(c.value)}</div>
          </div>
        ))}
      </div>

      <div className="life-panel">
        <div className="life-header">
          <div className="life-name">{state.name}</div>
          <div className="life-age">Idade {state.age}</div>
        </div>
        <div className="life-stats-row">
          <div className="life-stat">
            <HeartPulseIcon />
            <div className="life-stat-bar">
              <div className="life-stat-fill" style={{ width: `${state.health}%`, background: '#ef4444' }} />
            </div>
          </div>
          <div className="life-stat">
            <SmileIcon />
            <div className="life-stat-bar">
              <div className="life-stat-fill" style={{ width: `${state.happiness}%`, background: '#f59e0b' }} />
            </div>
          </div>
          <div className="life-stat">
            <BrainIcon />
            <div className="life-stat-bar">
              <div className="life-stat-fill" style={{ width: `${state.smarts}%`, background: '#8b5cf6' }} />
            </div>
          </div>
          <div className="life-stat">
            <StarIcon />
            <div className="life-stat-bar">
              <div className="life-stat-fill" style={{ width: `${state.reputation}%`, background: '#2563eb' }} />
            </div>
          </div>
        </div>
        <div className="life-meta">
          {state.married ? `Casado(a) com ${state.spouseName}` : 'Solteiro(a)'}
          {state.children > 0 ? ` · ${state.children} filho(s)` : ''}
          {' · '}Geração {state.generation}
        </div>
        <button className="advance-year-btn" onClick={advanceYear} disabled={!!state.activeEventId}>
          Avançar Ano ⟶
        </button>
      </div>

      <div className="taxes-card">
        <div className="taxes-icon">🏛️</div>
        <div className="taxes-info">
          <div className="taxes-title">
            Impostos {taxDue > 0 ? <span className="taxes-badge">{formatMoney(taxDue)}</span> : null}
          </div>
          {state.taxSuspended && <div className="taxes-warning">Rendimentos suspensos até regularizares!</div>}
          <button className="pay-taxes-btn" onClick={payAllTaxes} disabled={taxDue <= 0 || state.cash < taxDue}>
            Pagar todos os impostos
          </button>
        </div>
      </div>

      <div className="account-card">
        <div className="account-info">
          <div className="account-icon">👤</div>
          <div>
            <div className="account-username">{username}</div>
            <div className="account-hint">Sessão iniciada neste dispositivo</div>
          </div>
        </div>
        <button className="logout-btn" onClick={logout}>
          Terminar sessão
        </button>
      </div>
    </div>
  );
}
