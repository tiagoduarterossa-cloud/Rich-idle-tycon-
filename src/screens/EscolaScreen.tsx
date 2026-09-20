import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { formatMoney } from '../utils/format';
import { HOBBIES, CAREER_THRESHOLD } from '../data/hobbies';
import { SHORT_TERM_JOBS } from '../data/jobs';

function educationStage(age: number, education: string): string {
  if (age < 5) return 'Pré-escola';
  if (age < 10) return 'Escola Primária';
  if (age < 15) return 'Ciclo Preparatório';
  if (age < 18) return 'Ensino Secundário';
  if (education === 'universidade' || education === 'pos-graduacao') return 'Universidade';
  return 'Vida Ativa';
}

function effectsText(effects: Record<string, number | undefined>): string {
  const labels: Record<string, string> = { health: 'Saúde', happiness: 'Felicidade', smarts: 'Inteligência', reputation: 'Reputação' };
  return Object.entries(effects)
    .filter(([, v]) => v)
    .map(([k, v]) => `+${v} ${labels[k]}`)
    .join(' · ');
}

export function EscolaScreen() {
  const state = useGameStore((s) => s);
  const workJob = useGameStore((s) => s.workJob);
  const practiceHobby = useGameStore((s) => s.practiceHobby);
  const chooseMainHobby = useGameStore((s) => s.chooseMainHobby);
  const study = useGameStore((s) => s.study);
  const [feedback, setFeedback] = useState<{ text: string } | null>(null);

  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 1000);
    return () => clearTimeout(timer);
  }, [feedback]);

  const flash = (text: string) => setFeedback({ text });

  if (state.age < 5) {
    return (
      <div className="screen">
        <div className="screen-header">
          <h1>Escola</h1>
        </div>
        <div className="wallet-card">
          <div className="wallet-top">
            <span>**** 7439</span>
            <span>05/26</span>
          </div>
          <div className="wallet-label">Saldo:</div>
          <div className="wallet-balance">{formatMoney(state.cash, true)}</div>
        </div>
        <div className="too-young-card">
          <div className="too-young-icon">👶</div>
          <div className="too-young-text">
            Ainda és muito novo para hobbies ou trabalhos. Avança alguns anos na aba Perfil — a escola começa aos 5 anos.
          </div>
        </div>
      </div>
    );
  }

  const availableHobbies = HOBBIES.filter(
    (h) => state.age >= h.minAge && (h.maxAge === undefined || state.age <= h.maxAge || h.id === state.mainHobby)
  );
  const availableJobs = SHORT_TERM_JOBS.filter((j) => state.age >= j.minAge)
    .slice()
    .reverse();

  const mainHobbyDef = state.mainHobby ? HOBBIES.find((h) => h.id === state.mainHobby) : null;
  const careerUnlocked = state.mainHobbyProgress >= CAREER_THRESHOLD;
  const careerEligibleAvailable = availableHobbies.filter((h) => h.careerId);

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Escola</h1>
      </div>

      <div className="wallet-card">
        <div className="wallet-top">
          <span>**** 7439</span>
          <span>05/26</span>
        </div>
        <div className="wallet-label">Saldo:</div>
        <div className="wallet-balance">{formatMoney(state.cash, true)}</div>
        {feedback && <div className="wallet-feedback">{feedback.text}</div>}
      </div>

      <div className="education-card">
        <div className="education-icon">🎓</div>
        <div>
          <div className="education-stage">{educationStage(state.age, state.education)}</div>
          <div className="education-age">Idade {state.age}</div>
        </div>
      </div>

      <div className="section-title-row">
        <h2>Estudar</h2>
      </div>

      <button
        className="study-card"
        onClick={() => {
          study();
          flash('+3 Inteligência');
        }}
      >
        <div className="study-card-icon">📚</div>
        <div className="study-card-info">
          <div className="study-card-title">Estudar</div>
          <div className="study-card-bar">
            <div className="study-card-fill" style={{ width: `${state.smarts}%` }} />
          </div>
          <div className="study-card-label">Inteligência: {Math.round(state.smarts)}/100</div>
        </div>
      </button>

      {!state.mainHobby && careerEligibleAvailable.length > 0 && (
        <div className="main-hobby-picker">
          <div className="main-hobby-picker-title">
            🌟 Escolhe um hobby principal (fixo) — se te dedicares o suficiente, pode virar a tua carreira em adulto.
          </div>
          <div className="main-hobby-picker-options">
            {careerEligibleAvailable.map((h) => (
              <button key={h.id} className="main-hobby-chip" onClick={() => chooseMainHobby(h.id)}>
                {h.icon} {h.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {mainHobbyDef && (
        <div className="main-hobby-status">
          <span className="main-hobby-status-icon">{mainHobbyDef.icon}</span>
          <div className="main-hobby-status-info">
            <div className="main-hobby-status-title">⭐ Hobby principal: {mainHobbyDef.name}</div>
            <div className="main-hobby-progress-bar">
              <div
                className="main-hobby-progress-fill"
                style={{ width: `${Math.min(100, (state.mainHobbyProgress / CAREER_THRESHOLD) * 100)}%` }}
              />
            </div>
            <div className="main-hobby-status-progress">
              {careerUnlocked
                ? 'Carreira desbloqueada! Vai à Atividade a partir dos 18 anos.'
                : `${state.mainHobbyProgress}/${CAREER_THRESHOLD} anos de dedicação`}
            </div>
          </div>
        </div>
      )}

      <div className="section-title-row">
        <h2>Hobbies</h2>
        <span className="counter">{availableHobbies.length}</span>
      </div>

      <div className="activity-grid">
        {availableHobbies.map((h) => {
          const disabled = !!h.cost && state.cash < h.cost;
          return (
            <button
              key={h.id}
              className="activity-card"
              disabled={disabled}
              onClick={() => {
                practiceHobby(h.id);
                flash(effectsText(h.effects));
              }}
            >
              <span className="activity-icon">{h.icon}</span>
              <span className="activity-name">
                {h.name} {h.id === state.mainHobby && '⭐'}
              </span>
              <span className="activity-effect">{effectsText(h.effects)}</span>
              {!!h.cost && <span className="activity-cost">{formatMoney(h.cost)}</span>}
            </button>
          );
        })}
      </div>

      <div className="section-title-row">
        <h2>Trabalhos de Curto Prazo</h2>
        <span className="counter">{availableJobs.length}</span>
      </div>

      <div className="activity-grid">
        {availableJobs.map((j) => {
          const timesSold = state.jobsWorkedThisYear[j.id] ?? 0;
          const disabled = state.cash < j.cost;
          return (
            <button
              key={j.id}
              className="activity-card activity-card--job"
              disabled={disabled}
              onClick={() => {
                const result = workJob(j.id);
                if (!result) return;
                const sign = result.net >= 0 ? '+' : '';
                const mood = result.factor >= 1.15 ? ' 🔥' : result.factor <= 0.3 ? ' 📉' : '';
                flash(`${sign}${formatMoney(result.net, true)}${mood}`);
              }}
            >
              <span className="activity-icon">{j.icon}</span>
              <span className="activity-name">{j.name}</span>
              <span className="activity-effect activity-effect--pay">
                {timesSold >= 3
                  ? 'Mercado saturado'
                  : `até +${formatMoney(Math.round(j.pay * 1.5), true)}`}
              </span>
              {j.cost > 0 && <span className="activity-cost">Custo {formatMoney(j.cost)}</span>}
              {timesSold > 0 && <span className="activity-cost">Vendido {timesSold}x este ano</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
