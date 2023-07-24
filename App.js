import React from "react";
import { ScrollView } from "react-native";
import Constants from "expo-constants";
import Main from "./src/components/Main.jsx";
import Welcome from "./src/components/Welcome.jsx";
import LoginG from "./src/components/LogInG.jsx";
import FirstForm from "./src/components/form/firstForm.jsx";
import SecondForm from "./src/components/form/secondForm.jsx";
import ThirdForm from "./src/components/form/thirdForm.jsx";
import GridComponent from "./src/components/form/gridComponent.jsx";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMkHmAijQ6yBmvSgrjmrkUFM_GQr6CJO4",
  authDomain: "fitplan-503ef.firebaseapp.com",
  projectId: "fitplan-503ef",
  storageBucket: "fitplan-503ef.appspot.com",
  messagingSenderId: "407184834576",
  appId: "1:407184834576:web:55e389c205ee0e24d44a95",
  measurementId: "G-8GWQVMGWQ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function App() {
  return (
    <ScrollView style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
      <Main />
      <Welcome />
      <LoginG />
      <FirstForm />
      <SecondForm />
      <ThirdForm />
      <GridComponent />
    </ScrollView>
  );
}
