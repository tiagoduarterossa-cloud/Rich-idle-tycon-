import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { formatMoney } from '../utils/format';
import { HOBBIES } from '../data/hobbies';
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

  const availableHobbies = HOBBIES.filter((h) => state.age >= h.minAge && (h.maxAge === undefined || state.age <= h.maxAge));
  const availableJobs = SHORT_TERM_JOBS.filter((j) => state.age >= j.minAge)
    .slice()
    .reverse();

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
              <span className="activity-name">{h.name}</span>
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
          const done = state.jobsWorkedThisYear.includes(j.id);
          return (
            <button
              key={j.id}
              className="activity-card activity-card--job"
              disabled={done}
              onClick={() => {
                workJob(j.id);
                flash(`+${formatMoney(j.pay, true)}`);
              }}
            >
              <span className="activity-icon">{j.icon}</span>
              <span className="activity-name">{j.name}</span>
              <span className="activity-effect activity-effect--pay">
                {done ? 'Feito este ano' : `+${formatMoney(j.pay, true)}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
