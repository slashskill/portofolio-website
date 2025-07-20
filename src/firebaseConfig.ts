import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBsPDhFqSndYWxYv-fKZsK3HzC1knkf_i8",
  authDomain: "homepage-64274.firebaseapp.com",
  projectId: "homepage-64274",
  storageBucket: "homepage-64274.firebasestorage.app",
  messagingSenderId: "646770283178",
  appId: "1:646770283178:web:8416fc035aae04cb01f6d3",
  measurementId: "G-B019M4D0Y8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
