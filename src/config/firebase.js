// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAYCYCd9bl37YM_fESi-ms4i_DZ_a-nJFs",
    authDomain: "react-556f9.firebaseapp.com",
    projectId: "react-556f9",
    storageBucket: "react-556f9.appspot.com",
    messagingSenderId: "171673452385",
    appId: "1:171673452385:web:aac3066c3e02f88f0a8f20",
    measurementId: "G-200E7D0WEM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app)
export const db = getFirestore(app)