// app/(tabs)/_layout.tsx
import React, { useContext } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../components/ThemeContext";

// Sacamos el tipo de nombres válidos desde el glyphMap de Ionicons
type IoniconNames = keyof typeof Ionicons["glyphMap"];

const tabName = (name: string) => { return name.replace("Screen", "").toLowerCase();}

export default function TabsLayout() {
  const { selected, themes } = useContext(ThemeContext);
  const { navBarColor, focusedColor, titleColor } = themes[selected];

  // Mapeo ruta -> nombre de ícono
  const icons: Record<string, IoniconNames> = {
    home: "home",
    profile: "person",
    calendar: "calendar",
    config: "settings",
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: navBarColor },
        tabBarActiveTintColor: focusedColor,
        tabBarInactiveTintColor: titleColor,
        tabBarIcon: ({ color, size }) => {
          // TS sabe que icons[route.name] es un IoniconNames
          const name = icons[tabName(route.name)] as IoniconNames;
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="HomeScreen" options={{ title: "Home" }} />
      <Tabs.Screen name="ProfileScreen" options={{ title: "Perfil" }} />
      <Tabs.Screen name="CalendarScreen" options={{ title: "Calendario" }} />
      <Tabs.Screen name="ConfigScreen" options={{ title: "Configuración" }} />
    </Tabs>
  );
}
