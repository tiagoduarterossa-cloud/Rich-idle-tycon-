import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AccountState {
  username: string | null;
  password: string | null;
  loggedIn: boolean;
  createAccount: (username: string, password: string) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      username: null,
      password: null,
      loggedIn: false,

      createAccount: (username, password) => {
        set({ username: username.trim(), password, loggedIn: true });
      },

      login: (username, password) => {
        const s = get();
        if (s.username === username.trim() && s.password === password) {
          set({ loggedIn: true });
          return true;
        }
        return false;
      },

      logout: () => set({ loggedIn: false }),
    }),
    { name: 'rich-idle-tycoon-account' }
  )
);
