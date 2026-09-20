import { create } from 'zustand';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from '../firebase';

interface AccountUser {
  uid: string;
  email: string;
}

interface AccountState {
  user: AccountUser | null;
  authLoading: boolean;
  authError: string | null;
  signUp: (email: string, password: string) => Promise<boolean>;
  logIn: (email: string, password: string) => Promise<boolean>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  clearError: () => void;
}

function mapAuthError(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Já existe uma conta com este email.';
    case 'auth/invalid-email':
      return 'Email inválido.';
    case 'auth/weak-password':
      return 'A password precisa de pelo menos 6 caracteres.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email ou password incorretos.';
    case 'auth/too-many-requests':
      return 'Demasiadas tentativas. Tenta mais tarde.';
    case 'auth/network-request-failed':
      return 'Sem ligação à internet.';
    default:
      return 'Ocorreu um erro. Tenta novamente.';
  }
}

export const useAccountStore = create<AccountState>()((set) => {
  onAuthStateChanged(auth, (firebaseUser: User | null) => {
    set({
      user: firebaseUser ? { uid: firebaseUser.uid, email: firebaseUser.email ?? '' } : null,
      authLoading: false,
    });
  });

  return {
    user: null,
    authLoading: true,
    authError: null,

    signUp: async (email, password) => {
      set({ authError: null });
      try {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
        return true;
      } catch (e) {
        set({ authError: mapAuthError((e as { code?: string }).code ?? '') });
        return false;
      }
    },

    logIn: async (email, password) => {
      set({ authError: null });
      try {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        return true;
      } catch (e) {
        set({ authError: mapAuthError((e as { code?: string }).code ?? '') });
        return false;
      }
    },

    logOut: async () => {
      await signOut(auth);
    },

    resetPassword: async (email) => {
      set({ authError: null });
      try {
        await sendPasswordResetEmail(auth, email.trim());
        return true;
      } catch (e) {
        set({ authError: mapAuthError((e as { code?: string }).code ?? '') });
        return false;
      }
    },

    clearError: () => set({ authError: null }),
  };
});
