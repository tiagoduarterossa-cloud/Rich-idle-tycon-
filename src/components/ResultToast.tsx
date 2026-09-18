import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export function ResultToast() {
  const lastResult = useGameStore((s) => s.lastResult);
  const dismissResult = useGameStore((s) => s.dismissResult);

  useEffect(() => {
    if (!lastResult) return;
    const timer = setTimeout(() => dismissResult(), 4200);
    return () => clearTimeout(timer);
  }, [lastResult, dismissResult]);

  if (!lastResult) return null;

  return (
    <div className="result-toast" onClick={dismissResult}>
      <span className="result-toast-icon">{lastResult.icon}</span>
      <div>
        <strong>{lastResult.title}</strong>
        <p>{lastResult.text}</p>
      </div>
    </div>
  );
}
