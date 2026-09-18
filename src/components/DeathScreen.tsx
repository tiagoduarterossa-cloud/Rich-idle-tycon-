import { useGameStore } from '../store/gameStore';
import { netWorth } from '../utils/netWorth';
import { formatMoney } from '../utils/format';

export function DeathScreen() {
  const showDeathScreen = useGameStore((s) => s.showDeathScreen);
  const state = useGameStore((s) => s);
  const startNewLife = useGameStore((s) => s.startNewLife);

  if (!showDeathScreen) return null;

  const finalNetWorth = netWorth(state);
  const legacy = Math.round(finalNetWorth * 0.02);

  return (
    <div className="event-overlay death-overlay">
      <div className="event-card death-card">
        <div className="event-icon">🕊️</div>
        <h2 className="event-title">Fim de Vida</h2>
        <p className="event-text">
          {state.name} viveu {state.age} anos e construiu uma fortuna de {formatMoney(finalNetWorth)}.
        </p>
        <div className="death-stats">
          <div>
            <span>Geração</span>
            <strong>{state.generation}</strong>
          </div>
          <div>
            <span>Anos vividos</span>
            <strong>{state.age}</strong>
          </div>
          <div>
            <span>Filhos</span>
            <strong>{state.children}</strong>
          </div>
          <div>
            <span>Reputação</span>
            <strong>{Math.round(state.reputation)}</strong>
          </div>
        </div>
        <p className="death-legacy">A tua herança passa {formatMoney(legacy)} para a próxima geração.</p>
        <div className="event-choices">
          <button className="event-choice-btn event-choice-btn--primary" onClick={startNewLife}>
            Começar Nova Vida
          </button>
        </div>
      </div>
    </div>
  );
}
