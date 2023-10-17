import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../Home.jsx";
import Profile from "../Profile.jsx";
import CalendarC from "../Calendar.jsx";
import Config from "../Config.jsx";
import { ThemeContext } from "../ThemeContext.js";

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  const { selected, themes, handleContextChange } = useContext(ThemeContext);

  const selectedTheme = themes[selected];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: selectedTheme.highlightColor,
        },
        tabBarActiveTintColor: selectedTheme.titleColor,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="ios-home"
              color={
                focused
                  ? selectedTheme.titleColor
                  : selectedTheme.backgroundColor
              }
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="ios-person"
              color={
                focused
                  ? selectedTheme.titleColor
                  : selectedTheme.backgroundColor
              }
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarC}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="ios-calendar"
              color={
                focused
                  ? selectedTheme.titleColor
                  : selectedTheme.backgroundColor
              }
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Config"
        component={Config}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="ios-settings-sharp"
              color={
                focused
                  ? selectedTheme.titleColor
                  : selectedTheme.backgroundColor
              }
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default BottomTab;
