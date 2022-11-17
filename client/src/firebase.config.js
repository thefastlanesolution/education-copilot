import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAankfVzy5A5_djJCkgVd5TqCL2wPwkt-Y',
  authDomain: 'copilot-v2.firebaseapp.com',
  projectId: 'copilot-v2',
  storageBucket: 'copilot-v2.appspot.com',
  messagingSenderId: '699895185682',
  appId: '1:699895185682:web:8c812d6582266095e933cb',
  measurementId: 'G-1SFKT29DLQ',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
