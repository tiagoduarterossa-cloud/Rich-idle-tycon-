import { useState } from 'react';
import { useAccountStore } from '../store/accountStore';
import { useGameStore } from '../store/gameStore';

function nameFromEmail(email: string): string {
  const local = email.split('@')[0] ?? '';
  const words = local
    .replace(/[._-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  return words.length > 0 ? words.join(' ') : 'Alex Rossa';
}

export function AuthScreen() {
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  return mode === 'signup' ? (
    <CreateAccountForm onSwitch={() => setMode('login')} />
  ) : (
    <LoginForm onSwitch={() => setMode('signup')} />
  );
}

function CreateAccountForm({ onSwitch }: { onSwitch: () => void }) {
  const signUp = useAccountStore((s) => s.signUp);
  const authError = useAccountStore((s) => s.authError);
  const clearError = useAccountStore((s) => s.clearError);
  const setName = useGameStore((s) => s.setName);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [localError, setLocalError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();
    if (!email.includes('@')) {
      setLocalError('Introduz um email válido.');
      return;
    }
    if (password.length < 6) {
      setLocalError('A password precisa de pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      setLocalError('As passwords não coincidem.');
      return;
    }
    setLoading(true);
    const ok = await signUp(email, password);
    setLoading(false);
    if (ok) setName(nameFromEmail(email));
  };

  const error = localError || authError;

  return (
    <div className="screen auth-screen">
      <div className="auth-logo">💰</div>
      <h1 className="auth-title">Rich Idle Tycoon</h1>
      <p className="auth-subtitle">Cria a tua conta para começares a construir a tua fortuna.</p>

      <form className="auth-form" onSubmit={submit}>
        <label className="auth-label">
          Email
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@exemplo.com"
            autoComplete="email"
          />
        </label>
        <label className="auth-label">
          Password
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </label>
        <label className="auth-label">
          Confirmar password
          <input
            className="auth-input"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </label>

        {error && <div className="auth-error">{error}</div>}

        <button className="primary-btn auth-submit-btn" type="submit" disabled={loading}>
          {loading ? 'A criar conta...' : 'Criar conta e começar a jogar'}
        </button>
      </form>

      <button className="auth-switch-btn" onClick={onSwitch}>
        Já tens conta? Iniciar sessão
      </button>

      <p className="auth-hint">O teu progresso fica guardado na tua conta e acompanha-te em qualquer dispositivo.</p>
    </div>
  );
}

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const logIn = useAccountStore((s) => s.logIn);
  const resetPassword = useAccountStore((s) => s.resetPassword);
  const authError = useAccountStore((s) => s.authError);
  const clearError = useAccountStore((s) => s.clearError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setResetSent(false);
    setLoading(true);
    await logIn(email, password);
    setLoading(false);
  };

  const handleReset = async () => {
    if (!email.includes('@')) {
      clearError();
      return;
    }
    const ok = await resetPassword(email);
    setResetSent(ok);
  };

  return (
    <div className="screen auth-screen">
      <div className="auth-logo">💰</div>
      <h1 className="auth-title">Bem-vindo de volta</h1>
      <p className="auth-subtitle">Inicia sessão para continuares a tua vida.</p>

      <form className="auth-form" onSubmit={submit}>
        <label className="auth-label">
          Email
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@exemplo.com"
            autoComplete="email"
          />
        </label>
        <label className="auth-label">
          Password
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </label>

        {authError && <div className="auth-error">{authError}</div>}
        {resetSent && <div className="auth-success">Email de recuperação enviado, verifica a tua caixa de entrada.</div>}

        <button className="primary-btn auth-submit-btn" type="submit" disabled={loading}>
          {loading ? 'A entrar...' : 'Iniciar sessão'}
        </button>
      </form>

      <button className="auth-link-btn" onClick={handleReset}>
        Esqueci-me da password
      </button>
      <button className="auth-switch-btn" onClick={onSwitch}>
        Ainda não tens conta? Criar conta
      </button>
    </div>
  );
}
