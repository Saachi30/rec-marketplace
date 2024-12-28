// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC55ZeV-CC1zyF35JFkcd45tn_2dg2xbgk",
  authDomain: "login-auth-e4d1d.firebaseapp.com",
  projectId: "login-auth-e4d1d",
  storageBucket: "login-auth-e4d1d.firebasestorage.app",
  messagingSenderId: "326415019858",
  appId: "1:326415019858:web:e18b5e0f06853fb5b6148b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


export const auth=getAuth();

export const db = getFirestore(app);
export default app;