// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "moviesandtvshows-76ff1.firebaseapp.com",
  projectId: "moviesandtvshows-76ff1",
  storageBucket: "moviesandtvshows-76ff1.appspot.com",
  messagingSenderId: "586889504761",
  appId: "1:586889504761:web:dce7827bc8e9eb6463ff28",
});
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
