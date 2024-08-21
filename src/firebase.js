// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE,
    authDomain: "mopinjam-2aa4b.firebaseapp.com",
    projectId: "mopinjam-2aa4b",
    storageBucket: "mopinjam-2aa4b.appspot.com",
    messagingSenderId: "201549422692",
    appId: "1:201549422692:web:7ea2929a37094daf4fff71",
    measurementId: "G-HB392SSZXV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage }