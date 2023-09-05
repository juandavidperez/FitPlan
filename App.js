import React from "react";
import FirstScreen from "./src/components/FirstScreen.jsx";
import LoginG from "./src/components/userAuth/LogInG.jsx";
import SignUp from "./src/components/userAuth/SignUp.jsx";
import FirstForm from "./src/components/form/firstForm.jsx";
import SecondForm from "./src/components/form/secondForm.jsx";
import ThirdForm from "./src/components/form/thirdForm.jsx";
import BottomTab from "./src/components/navigation/BottomTab.js";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer style={{ width: 180 }}>
      <Stack.Navigator
        initialRouteName="BottomTab"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={FirstScreen} />
        <Stack.Screen name="LoginG" component={LoginG} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="FirstForm" component={FirstForm} />
        <Stack.Screen name="SecondForm" component={SecondForm} />
        <Stack.Screen name="ThirdForm" component={ThirdForm} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
