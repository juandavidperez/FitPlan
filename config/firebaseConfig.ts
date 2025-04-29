// src/config/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set}  from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDMkHmAijQ6yBmvSgrjmrkUFM_GQr6CJO4",
    authDomain: "fitplan-503ef.firebaseapp.com",
    databaseURL: "https://fitplan-503ef-default-rtdb.firebaseio.com",
    projectId: "fitplan-503ef",
    storageBucket: "fitplan-503ef.firebasestorage.app",
    messagingSenderId: "407184834576",
    appId: "1:407184834576:web:55e389c205ee0e24d44a95",
    measurementId: "G-8GWQVMGWQ4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); 

export { auth, database };
