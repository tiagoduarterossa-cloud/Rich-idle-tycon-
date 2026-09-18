import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { formatMoney } from '../utils/format';

export function GanhosScreen() {
  const cash = useGameStore((s) => s.cash);
  const clickPower = useGameStore((s) => s.clickPower);
  const click = useGameStore((s) => s.click);
  const upgradeClickPower = useGameStore((s) => s.upgradeClickPower);
  const [pulses, setPulses] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    click();
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setPulses((p) => [...p, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setPulses((p) => p.filter((pulse) => pulse.id !== id)), 700);
  };

  const upgradeCost = Math.round(clickPower * 180);

  return (
    <div className="screen ganhos-screen">
      <div className="wallet-card">
        <div className="wallet-top">
          <span>**** 7439</span>
          <span>05/26</span>
        </div>
        <div className="wallet-label">Saldo:</div>
        <div className="wallet-balance">{formatMoney(cash, true)}</div>
      </div>

      <div className="per-click-chip">
        {formatMoney(clickPower, true)} <span>por clique</span>
      </div>

      <div className="click-area" onClick={handleClick}>
        {pulses.map((p) => (
          <span key={p.id} className="click-pulse" style={{ left: p.x, top: p.y }}>
            +{formatMoney(clickPower, true)}
          </span>
        ))}
        <div className="click-hand">👆</div>
        <div className="click-hint">Clique nesta área para ganhar dinheiro</div>
      </div>

      <button className="primary-btn upgrade-click-btn" onClick={upgradeClickPower} disabled={cash < upgradeCost}>
        Melhorar clique · {formatMoney(upgradeCost)}
      </button>
    </div>
  );
}
