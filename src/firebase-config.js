// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuj0GslwJISbDj1q-DEUPPCtrR7EnFM2A",
    authDomain: "friendl-6a111.firebaseapp.com",
    projectId: "friendl-6a111",
    storageBucket: "friendl-6a111.firebasestorage.app",
    messagingSenderId: "587898760499",
    appId: "1:587898760499:web:90257cee255d4f36dd6246",
    measurementId: "G-KMDG496BZC"
  };


// Initialize Firebase and export services
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);