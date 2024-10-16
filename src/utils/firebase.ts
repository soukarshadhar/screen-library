// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "screen-library.firebaseapp.com",
  projectId: "screen-library",
  storageBucket: "screen-library.appspot.com",
  messagingSenderId: "831956568212",
  appId: "1:831956568212:web:319f8017c6eba65a840c81",
});
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
