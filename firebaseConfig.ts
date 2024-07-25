import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDrhH91yf8A78hHWoDQzpriPw-VMKjLknk",
    authDomain: "sharelink-eea18.firebaseapp.com",
    projectId: "sharelink-eea18",
    storageBucket: "sharelink-eea18.appspot.com",
    messagingSenderId: "479998935963",
    appId: "1:479998935963:web:eb1ac5edec90ea9fad573e"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };