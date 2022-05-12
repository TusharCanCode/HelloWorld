import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "hello-world-18be8.firebaseapp.com",
  projectId: "hello-world-18be8",
  storageBucket: "hello-world-18be8.appspot.com",
  messagingSenderId: "534585868196",
  appId: "1:534585868196:web:0af465ba122c3b63764b31",
  measurementId: "G-BTFHZ1B458"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);