import { useState } from 'react';
import { useAccountStore } from '../store/accountStore';
import { useGameStore } from '../store/gameStore';

export function AuthScreen() {
  const hasAccount = useAccountStore((s) => s.username !== null);
  return hasAccount ? <LoginForm /> : <CreateAccountForm />;
}

function CreateAccountForm() {
  const createAccount = useAccountStore((s) => s.createAccount);
  const setName = useGameStore((s) => s.setName);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length < 3) {
      setError('O nome de utilizador precisa de pelo menos 3 caracteres.');
      return;
    }
    if (password.length < 4) {
      setError('A password precisa de pelo menos 4 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('As passwords não coincidem.');
      return;
    }
    setName(username);
    createAccount(username, password);
  };

  return (
    <div className="screen auth-screen">
      <div className="auth-logo">💰</div>
      <h1 className="auth-title">Rich Idle Tycoon</h1>
      <p className="auth-subtitle">Cria a tua conta para começares a construir a tua fortuna.</p>

      <form className="auth-form" onSubmit={submit}>
        <label className="auth-label">
          Nome de utilizador
          <input
            className="auth-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ex: alex.rossa"
            autoComplete="username"
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

        <button className="primary-btn auth-submit-btn" type="submit">
          Criar conta e começar a jogar
        </button>
      </form>

      <p className="auth-hint">
        Nota: a conta fica guardada apenas neste dispositivo/browser, não existe servidor por trás.
      </p>
    </div>
  );
}

function LoginForm() {
  const username = useAccountStore((s) => s.username);
  const login = useAccountStore((s) => s.login);
  const [inputUser, setInputUser] = useState(username ?? '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(inputUser, password);
    if (!ok) {
      setError('Nome de utilizador ou password incorretos.');
    }
  };

  return (
    <div className="screen auth-screen">
      <div className="auth-logo">💰</div>
      <h1 className="auth-title">Bem-vindo de volta</h1>
      <p className="auth-subtitle">Inicia sessão para continuares a tua vida.</p>

      <form className="auth-form" onSubmit={submit}>
        <label className="auth-label">
          Nome de utilizador
          <input
            className="auth-input"
            type="text"
            value={inputUser}
            onChange={(e) => setInputUser(e.target.value)}
            autoComplete="username"
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

        {error && <div className="auth-error">{error}</div>}

        <button className="primary-btn auth-submit-btn" type="submit">
          Iniciar sessão
        </button>
      </form>
    </div>
  );
}
