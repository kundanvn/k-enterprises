import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVazRLY0LH37iF6iKyLczcw0sw5GGwf0U",
  authDomain: "k-enterprises-6c1b6.firebaseapp.com",
  projectId: "k-enterprises-6c1b6",
  storageBucket: "k-enterprises-6c1b6.appspot.com",
  messagingSenderId: "1050550014668",
  appId: "1:1050550014668:web:bac165e132c499c38b6869",
};

const app = initializeApp(firebaseConfig);
export const fireDb = getFirestore(app);
