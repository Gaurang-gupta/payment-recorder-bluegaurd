// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbq_5-kit0X7pk9sQ6LOWH2tMZ1BskQ28",
  authDomain: "payment-recorder.firebaseapp.com",
  projectId: "payment-recorder",
  storageBucket: "payment-recorder.appspot.com",
  messagingSenderId: "400550075963",
  appId: "1:400550075963:web:b67164bc439e64f97a061e",
  measurementId: "G-KPR18C06E6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }
export default getAuth