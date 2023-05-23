import React from "react";
import { ScrollView } from "react-native";
import Constants from "expo-constants";
import Main from "./src/components/Main.jsx";
import Welcome from "./src/components/Welcome.jsx";
import PreLogin from "./src/components/LogIn/PreLogIn.jsx";
import LoginForm from "./src/components/LogIn/LogIn.jsx";
import SignUp from "./src/components/LogIn/SignUp.jsx";

export default function App() {
  return (
    <ScrollView style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
      <Main />
      <Welcome />
      <PreLogin />
      <LoginForm />
      <SignUp />
    </ScrollView>
  );
}
