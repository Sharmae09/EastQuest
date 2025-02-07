import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyApo8t8YZKR1GQ6imKc5qkRQqoSei59wSg",
    authDomain: "eastquest-906a3.firebaseapp.com",
    projectId: "eastquest-906a3",
    storageBucket: "eastquest-906a3.firebasestorage.app",
    messagingSenderId: "792971827480",
    appId: "1:792971827480:web:1f2d199d8c2cd79f17e66d",
    measurementId: "G-G1EYP9SMDK",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth,
      firebaseDb: db,
    },
  };
});
