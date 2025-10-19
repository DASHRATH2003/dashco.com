import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA9RCpZAjKNs8BwzO-184ts6SUAvf_2__A",
  authDomain: "myportfolio-15a57.firebaseapp.com",
  projectId: "myportfolio-15a57",
  storageBucket: "myportfolio-15a57.appspot.com", // ✅ Corrected here
  messagingSenderId: "827812785607",
  appId: "1:827812785607:web:8828c204fe85a6e0aa7de2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { app };