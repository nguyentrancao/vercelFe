// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use



const firebaseConfig = {
  apiKey: "AIzaSyA219_-Ck66WiA4QDRgxNGyb0fJkZF6YMM",
  authDomain: "duantn-auth.firebaseapp.com",
  projectId: "duantn-auth",
  storageBucket: "duantn-auth.appspot.com",
  messagingSenderId: "353768701733",
  appId: "1:353768701733:web:b5210cc547be307f5664cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
