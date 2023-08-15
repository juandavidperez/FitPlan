import React from "react";
import { ScrollView } from "react-native";
import Constants from "expo-constants";
import FirstScreen from "./src/components/FirstScreen.jsx";
import Welcome from "./src/components/Welcome.jsx";
import LoginG from "./src/components/userAuth/LogInG.jsx";
import SignUp from "./src/components/userAuth/SignUp.jsx";
import FirstForm from "./src/components/form/firstForm.jsx";
import SecondForm from "./src/components/form/secondForm.jsx";
import ThirdForm from "./src/components/form/thirdForm.jsx";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import firebase from "firebase/app";
import "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const analytics = getAnalytics(app);
const database = getDatabase(app);
export const auth = getAuth(app);
export { app, database };

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen">
        <Stack.Screen name="Main" component={FirstScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="LoginG" component={LoginG} />
        <Stack.Screen name="FirstForm" component={FirstForm} />
        <Stack.Screen name="SecondForm" component={SecondForm} />
        <Stack.Screen name="ThirdForm" component={ThirdForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
