// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDf68IH2lDSZ1xxtNz9TeBgqOTpDfoDljc",
  authDomain: "fusion-f1995.firebaseapp.com",
  projectId: "fusion-f1995",
  storageBucket: "fusion-f1995.appspot.com",
  messagingSenderId: "1088628847732",
  appId: "1:1088628847732:web:abcdef1234567890" // Replace with actual value if available
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
