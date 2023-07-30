
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyB2t6Ukt4LsMKAjsLG_wzB-UVzIC1VlFrU",
  authDomain: "aeteria-87dbb.firebaseapp.com",
  projectId: "aeteria-87dbb",
  storageBucket: "aeteria-87dbb.appspot.com",
  messagingSenderId: "746102176486",
  appId: "1:746102176486:web:8c4951791132c5cf681927"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore( FirebaseApp );