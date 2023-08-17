// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMkHmAijQ6yBmvSgrjmrkUFM_GQr6CJO4",
  authDomain: "fitplan-503ef.firebaseapp.com",
  databaseURL: "https://fitplan-503ef-default-rtdb.firebaseio.com",
  projectId: "fitplan-503ef",
  storageBucket: "fitplan-503ef.appspot.com",
  messagingSenderId: "407184834576",
  appId: "1:407184834576:web:55e389c205ee0e24d44a95",
  measurementId: "G-8GWQVMGWQ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const auth = getAuth(app);
export { app, database };
