import { useGameStore } from '../store/gameStore';
import type { Screen } from '../types';
import { InvestIcon, ActivityIcon, EarnIcon, ItemsIcon, ProfileIcon } from './icons';

const TABS: { id: Screen; label: string; Icon: typeof InvestIcon }[] = [
  { id: 'investimento', label: 'Investimento', Icon: InvestIcon },
  { id: 'atividade', label: 'Atividade', Icon: ActivityIcon },
  { id: 'ganhos', label: 'Ganhos', Icon: EarnIcon },
  { id: 'artigos', label: 'Artigos', Icon: ItemsIcon },
  { id: 'perfil', label: 'Perfil', Icon: ProfileIcon },
];

export function BottomNav() {
  const screen = useGameStore((s) => s.screen);
  const setScreen = useGameStore((s) => s.setScreen);

  return (
    <nav className="bottom-nav">
      {TABS.map(({ id, label, Icon }) => {
        const active = screen === id;
        return (
          <button key={id} className={`nav-tab ${active ? 'nav-tab--active' : ''}`} onClick={() => setScreen(id)}>
            <Icon active={active} />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
