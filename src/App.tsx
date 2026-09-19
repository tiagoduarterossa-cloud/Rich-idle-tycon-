import { useGameStore } from './store/gameStore';
import { BottomNav } from './components/BottomNav';
import { EventModal } from './components/EventModal';
import { ResultToast } from './components/ResultToast';
import { DeathScreen } from './components/DeathScreen';
import { PerfilScreen } from './screens/PerfilScreen';
import { InvestimentoScreen } from './screens/InvestimentoScreen';
import { AtividadeScreen } from './screens/AtividadeScreen';
import { EscolaScreen } from './screens/EscolaScreen';
import { ArtigosScreen } from './screens/ArtigosScreen';
import './App.css';

function CurrentScreen() {
  const screen = useGameStore((s) => s.screen);
  switch (screen) {
    case 'investimento':
      return <InvestimentoScreen />;
    case 'atividade':
      return <AtividadeScreen />;
    case 'escola':
      return <EscolaScreen />;
    case 'artigos':
      return <ArtigosScreen />;
    case 'perfil':
      return <PerfilScreen />;
    default:
      return null;
  }
}

function App() {
  return (
    <div className="app-shell">
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-content">
          <CurrentScreen />
        </div>
        <BottomNav />
        <ResultToast />
        <EventModal />
        <DeathScreen />
      </div>
    </div>
  );
}

export default App;
