import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

type IconName = 'home' | 'person' | 'settings' | 'home-outline' | 'person-outline' | 'settings-outline';

export default function TabsLayout() {
  // Soporte para tema claro/oscuro
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? '#4dabf7' : '#3498db',
        tabBarInactiveTintColor: isDark ? '#94a3b8' : '#95a5a6',
        tabBarStyle: {
          backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
          borderTopColor: isDark ? '#2d2d2d' : '#e5e5e5',
          height: 60,
          paddingBottom: 5,
        },
        headerStyle: {
          backgroundColor: isDark ? '#1e1e1e' : '#3498db',
        },
        headerTintColor: isDark ? '#ffffff' : '#ffffff',
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'home' : 'home-outline' as IconName} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'person' : 'person-outline' as IconName} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? 'settings' : 'settings-outline' as IconName} 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}