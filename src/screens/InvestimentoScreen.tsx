import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { formatMoney, formatPercent } from '../utils/format';
import { stocksValue, realEstateValue, cryptoValue, ADULT_AGE } from '../utils/netWorth';

type Tab = 'acoes' | 'imobiliario' | 'cripto';

export function InvestimentoScreen() {
  const [tab, setTab] = useState<Tab>('acoes');
  const state = useGameStore((s) => s);
  const buyStock = useGameStore((s) => s.buyStock);
  const sellStock = useGameStore((s) => s.sellStock);
  const buyRealEstate = useGameStore((s) => s.buyRealEstate);
  const sellRealEstate = useGameStore((s) => s.sellRealEstate);
  const buyCrypto = useGameStore((s) => s.buyCrypto);
  const sellCrypto = useGameStore((s) => s.sellCrypto);

  const isAdult = state.age >= ADULT_AGE;

  const portfolioValue =
    tab === 'acoes' ? stocksValue(state) : tab === 'imobiliario' ? realEstateValue(state) : cryptoValue(state);

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Investimento</h1>
      </div>

      <div className="tab-row">
        <button className={tab === 'acoes' ? 'tab tab--active' : 'tab'} onClick={() => setTab('acoes')}>
          Ações
        </button>
        <button className={tab === 'imobiliario' ? 'tab tab--active' : 'tab'} onClick={() => setTab('imobiliario')}>
          Imobiliário {!isAdult && '🔒'}
        </button>
        <button className={tab === 'cripto' ? 'tab tab--active' : 'tab'} onClick={() => setTab('cripto')}>
          Criptomoeda {!isAdult && '🔒'}
        </button>
      </div>

      <div className="portfolio-card">
        <div className="portfolio-header">
          <span>💼 A minha carteira</span>
        </div>
        <div className="portfolio-label">Valor da carteira</div>
        <div className="portfolio-value">{formatMoney(portfolioValue, true)}</div>
        {state.taxSuspended && <div className="portfolio-suspended">🔒 Rendimento suspenso (impostos)</div>}
      </div>

      {tab === 'acoes' && (
        <div className="asset-list">
          {state.stocks.map((st) => (
            <div key={st.id} className="asset-row">
              <div className="asset-info">
                <div className="asset-name">{st.ticker}</div>
                <div className="asset-sub">{st.name}</div>
              </div>
              <div className="asset-mid">
                <div className="asset-price">{formatMoney(st.price, true)}</div>
                <div className={st.change >= 0 ? 'asset-change up' : 'asset-change down'}>{formatPercent(st.change)}</div>
              </div>
              <div className="asset-actions">
                {st.shares > 0 && <div className="asset-owned">{st.shares.toFixed(2)} un.</div>}
                <button className="buy-btn" onClick={() => buyStock(st.id, Math.max(1, Math.floor((state.cash * 0.25) / st.price)))} disabled={state.cash < st.price}>
                  Comprar
                </button>
                {st.shares > 0 && (
                  <button className="sell-btn" onClick={() => sellStock(st.id, st.shares)}>
                    Vender
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'imobiliario' && !isAdult && (
        <div className="too-young-card">
          <div className="too-young-icon">🔒</div>
          <div className="too-young-text">Comprar imóveis é coisa de adultos. Disponível a partir dos 18 anos.</div>
        </div>
      )}

      {tab === 'imobiliario' && isAdult && (
        <div className="asset-list">
          {state.realEstate.map((re) => (
            <div key={re.id} className="asset-row">
              <div className="asset-info">
                <div className="asset-name">{re.name}</div>
                <div className="asset-sub">{re.location}</div>
              </div>
              <div className="asset-mid">
                <div className="asset-price">{formatMoney(re.value)}</div>
                <div className="asset-change up">+{formatMoney(re.income)}/h</div>
              </div>
              <div className="asset-actions">
                {!re.owned ? (
                  <button className="buy-btn" onClick={() => buyRealEstate(re.id)} disabled={state.cash < re.value}>
                    Comprar
                  </button>
                ) : (
                  <button className="sell-btn" onClick={() => sellRealEstate(re.id)}>
                    Vender
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'cripto' && !isAdult && (
        <div className="too-young-card">
          <div className="too-young-icon">🔒</div>
          <div className="too-young-text">Negociar criptomoedas é coisa de adultos. Disponível a partir dos 18 anos.</div>
        </div>
      )}

      {tab === 'cripto' && isAdult && (
        <div className="asset-list">
          {state.crypto.map((c) => (
            <div key={c.id} className="asset-row">
              <div className="asset-info">
                <div className="asset-name">{c.ticker}</div>
                <div className="asset-sub">{c.name}</div>
              </div>
              <div className="asset-mid">
                <div className="asset-price">{formatMoney(c.price, true)}</div>
                <div className={c.change >= 0 ? 'asset-change up' : 'asset-change down'}>{formatPercent(c.change)}</div>
              </div>
              <div className="asset-actions">
                {c.amount > 0 && <div className="asset-owned">{c.amount.toFixed(3)} un.</div>}
                <button
                  className="buy-btn"
                  onClick={() => buyCrypto(c.id, Math.max(0.01, (state.cash * 0.25) / c.price))}
                  disabled={state.cash < c.price * 0.01}
                >
                  Comprar
                </button>
                {c.amount > 0 && (
                  <button className="sell-btn" onClick={() => sellCrypto(c.id, c.amount)}>
                    Vender
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
