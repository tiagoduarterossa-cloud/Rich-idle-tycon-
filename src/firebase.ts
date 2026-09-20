import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAzwEWJKwnKI0X9_lhNvXD1DG7U44EPwGE',
  authDomain: 'rich-idle-tycoon.firebaseapp.com',
  projectId: 'rich-idle-tycoon',
  storageBucket: 'rich-idle-tycoon.firebasestorage.app',
  messagingSenderId: '516673468543',
  appId: '1:516673468543:web:849264591011e7bf9fe74a',
  measurementId: 'G-PVMWGWT184',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
