import { useGameStore } from '../store/gameStore';
import { LIFE_EVENTS } from '../data/events';

export function EventModal() {
  const activeEventId = useGameStore((s) => s.activeEventId);
  const age = useGameStore((s) => s.age);
  const resolveEventChoice = useGameStore((s) => s.resolveEventChoice);
  const state = useGameStore((s) => s);

  if (!activeEventId) return null;

  const event = LIFE_EVENTS.find((e) => e.id === activeEventId);
  if (!event) return null;

  const text = event.text(state);

  return (
    <div className="event-overlay">
      <div className="event-card">
        <div className="event-icon">{event.icon}</div>
        <div className="event-age">Idade {age}</div>
        <h2 className="event-title">{event.title}</h2>
        <p className="event-text">{text}</p>
        <div className="event-choices">
          {event.choices.map((choice) => (
            <button key={choice.id} className="event-choice-btn" onClick={() => resolveEventChoice(choice.id)}>
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
