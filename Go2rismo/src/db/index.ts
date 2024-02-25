import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-XMsxE9ULqN-K-tKSEidlUj6LiOUFNmk",
  authDomain: "go2rismo-d2809.firebaseapp.com",
  projectId: "go2rismo-d2809",
  storageBucket: "go2rismo-d2809.appspot.com",
  messagingSenderId: "380792666083",
  appId: "1:380792666083:web:7bf86518730976f23c92d6",
  measurementId: "G-ZT3T8YY0CS"
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

