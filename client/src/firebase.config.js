import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAankfVzy5A5_djJCkgVd5TqCL2wPwkt-Y',
  authDomain: 'copilot-v2.firebaseapp.com',
  projectId: 'copilot-v2',
  storageBucket: 'gs://copilot-v2.appspot.com',
  messagingSenderId: '699895185682',
  appId: '1:699895185682:web:8c812d6582266095e933cb',
  measurementId: 'G-1SFKT29DLQ',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export const db = getFirestore();

export const unitsCollection = collection(db, 'units');
export const unitDoc = doc(db, 'units', 'VFrRmfZwzLVh6F91Xln1');
export const functions = getFunctions(app, 'us-central1');
