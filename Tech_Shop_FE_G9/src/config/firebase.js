// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9dMtOeV1nP2ClUiKbLSvO5dI-k0hJNcw",
  authDomain: "tech-shop-f5a1c.firebaseapp.com",
  projectId: "tech-shop-f5a1c",
  storageBucket: "tech-shop-f5a1c.appspot.com",
  messagingSenderId: "924683606207",
  appId: "1:924683606207:web:aa791ec4cb5a27aa3e8e0a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;