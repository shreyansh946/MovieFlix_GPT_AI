// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "netflixgpt-5bb0d.firebaseapp.com",
  projectId: "netflixgpt-5bb0d",
  storageBucket: "netflixgpt-5bb0d.appspot.com",
  messagingSenderId: "981482187787",
  appId: "1:981482187787:web:8fa14f58187e34588bab0e",
  measurementId: "G-Y9WGL12WBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth();