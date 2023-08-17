import React from "react";
import FirstScreen from "./src/components/FirstScreen.jsx";
import Welcome from "./src/components/Welcome.jsx";
import LoginG from "./src/components/userAuth/LogInG.jsx";
import SignUp from "./src/components/userAuth/SignUp.jsx";
import FirstForm from "./src/components/form/firstForm.jsx";
import SecondForm from "./src/components/form/secondForm.jsx";
import ThirdForm from "./src/components/form/thirdForm.jsx";
import Home from "./src/components/Home.jsx";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen">
        <Stack.Screen name="Main" component={FirstScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="LoginG" component={LoginG} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="FirstForm" component={FirstForm} />
        <Stack.Screen name="SecondForm" component={SecondForm} />
        <Stack.Screen name="ThirdForm" component={ThirdForm} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
