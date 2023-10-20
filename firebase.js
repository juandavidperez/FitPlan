// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "ApiKey",
  authDomain: "fitplan-503ef.firebaseapp.com",
  databaseURL: "https://fitplan-503ef-default-rtdb.firebaseio.com",
  projectId: "fitplan-503ef",
  storageBucket: "fitplan-503ef.appspot.com",
  messagingSenderId: "407184834576",
  appId: "appId",
  measurementId: "G-8GWQVMGWQ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const auth = getAuth(app);
export { app, database };
