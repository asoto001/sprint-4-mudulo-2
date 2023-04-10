import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDqazObaZ8lv_eZw9dmbk-iLttPLs8bTLo",
  authDomain: "sprint-1f888.firebaseapp.com",
  projectId: "sprint-1f888",
  storageBucket: "sprint-1f888.appspot.com",
  messagingSenderId: "727886156237",
  appId: "1:727886156237:web:55ac7d6d1f793e845bb484"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const dataBase = getFirestore(app)