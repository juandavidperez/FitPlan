import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../Home.jsx";
import Profile from "../Profile.jsx";
import Calendar from "../Calendar.jsx";
import Config from "../Config.jsx";

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
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
        component={Calendar}
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
            <Ionicons name="ios-cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
