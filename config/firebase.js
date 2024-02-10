import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBUrVKousDRsAghtjYdP7TmHAX5cjH-18U",
    authDomain: "songs-firebase-react.firebaseapp.com",
    projectId: "songs-firebase-react",
    storageBucket: "songs-firebase-react.appspot.com",
    messagingSenderId: "256802341027",
    appId: "1:256802341027:web:82b7642bef463b7ae9ff16",
    measurementId: "G-M9410D5H9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Create a reference to the songs collection
export const songsRef = collection(db, "songs-react-firebase") ;
export const storage = getStorage(app)

