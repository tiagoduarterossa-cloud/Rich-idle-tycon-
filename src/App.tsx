import { useGameStore } from './store/gameStore';
import { useAccountStore } from './store/accountStore';
import { BottomNav } from './components/BottomNav';
import { EventModal } from './components/EventModal';
import { ResultToast } from './components/ResultToast';
import { DeathScreen } from './components/DeathScreen';
import { PerfilScreen } from './screens/PerfilScreen';
import { InvestimentoScreen } from './screens/InvestimentoScreen';
import { AtividadeScreen } from './screens/AtividadeScreen';
import { EscolaScreen } from './screens/EscolaScreen';
import { ArtigosScreen } from './screens/ArtigosScreen';
import { AuthScreen } from './screens/AuthScreen';
import { CloudSync } from './components/CloudSync';
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
  const user = useAccountStore((s) => s.user);
  const authLoading = useAccountStore((s) => s.authLoading);
  const loggedIn = !!user;

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-content">
          {authLoading ? null : loggedIn ? <CurrentScreen /> : <AuthScreen />}
        </div>
        {loggedIn && (
          <>
            <BottomNav />
            <ResultToast />
            <EventModal />
            <DeathScreen />
            <CloudSync />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
