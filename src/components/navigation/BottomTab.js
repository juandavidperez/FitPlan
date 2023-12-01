import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../Home.jsx";
import Profile from "../Profile.jsx";
import CalendarC from "../Calendar.jsx";
import Config from "../Config.jsx";
import { ThemeContext } from "../ThemeContext.js";

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  const { selected, handleContextChange, themes } = useContext(ThemeContext);
  const { navBarColor, focusedColor, titleColor } = themes[selected];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: navBarColor,
        },
        tabBarActiveTintColor: focusedColor,
        tabBarInactiveTintColor: titleColor,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-person" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarC}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Config"
        component={Config}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-settings-sharp" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
