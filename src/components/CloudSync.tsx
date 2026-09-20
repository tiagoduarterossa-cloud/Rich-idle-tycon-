import { useEffect, useRef } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAccountStore } from '../store/accountStore';
import { useGameStore } from '../store/gameStore';
import type { GameStateData } from '../types';

// Guarda o save na Firestore, associado à conta — assim o progresso
// acompanha o jogador em qualquer dispositivo, não fica preso ao browser.
export function CloudSync() {
  const user = useAccountStore((s) => s.user);
  const authLoading = useAccountStore((s) => s.authLoading);
  const loadState = useGameStore((s) => s.loadState);
  const loadedForUid = useRef<string | null>(null);

  useEffect(() => {
    if (authLoading || !user) return;
    if (loadedForUid.current === user.uid) return;
    loadedForUid.current = user.uid;

    (async () => {
      const ref = doc(db, 'saves', user.uid);
      try {
        const snap = await getDoc(ref);
        if (snap.exists()) {
          loadState(snap.data() as Partial<GameStateData>);
        } else {
          const snapshot = JSON.parse(JSON.stringify(useGameStore.getState())) as GameStateData;
          await setDoc(ref, snapshot);
        }
      } catch (err) {
        console.error('Falha ao carregar o save da cloud', err);
      }
    })();
  }, [user, authLoading, loadState]);

  useEffect(() => {
    if (!user) return;
    const uid = user.uid;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const unsub = useGameStore.subscribe(() => {
      if (loadedForUid.current !== uid) return;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        const snapshot = JSON.parse(JSON.stringify(useGameStore.getState())) as GameStateData;
        setDoc(doc(db, 'saves', uid), snapshot).catch((err) => console.error('Falha ao guardar na cloud', err));
      }, 2000);
    });

    return () => {
      unsub();
      if (timer) clearTimeout(timer);
    };
  }, [user]);

  return null;
}
