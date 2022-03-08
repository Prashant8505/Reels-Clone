// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyACn16IAsmLLlrr-6eBMBJmTynINC2a3lA",
    authDomain: "reels-65787.firebaseapp.com",
    projectId: "reels-65787",
    storageBucket: "reels-65787.appspot.com",
    messagingSenderId: "140097477588",
    appId: "1:140097477588:web:a6c15b86b1e83927a8d441",
    measurementId: "G-RS58M88S51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth()
const storage = getStorage()
const db = getFirestore()

export { auth, storage, db }
export default app;