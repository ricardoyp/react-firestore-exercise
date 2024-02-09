import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";

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
const db = getFirestore(app);

// Create a reference to the songs collection
const songsRef = collection(db, "songs-react-firebase");

export const getSongs = async () => {
    const querySnapshot = await getDocs(songsRef);

    return querySnapshot.docs.map((doc) => doc.data());
}

export const setSong = async (data) => {
    console.log(data);
    await setDoc(doc (songsRef), data); 
}