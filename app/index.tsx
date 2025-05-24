import React, { useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../components/ThemeContext";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig"; // Asegúrate de que esté bien importado

const Index = () => {
  const { themes, selected } = useContext(ThemeContext);
  const { highlightColor, titleColor } = themes[selected];
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si está autenticado, redirige a la pantalla de Home
        router.push("/(tabs)/HomeScreen");
      } else {
        // Si no está autenticado, redirige a la pantalla de Login
        router.push("/screens/auth/LoginScreen");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: highlightColor }]}>
      <Text style={[styles.title, { color: titleColor }]}>
        FitPlan <Ionicons name="flash" size={24} color="#FFD300" />
      </Text>
      <Text style={[styles.subtitle, { color: titleColor }]}>
        ¡Tu entrenador personal!
      </Text>
        <Image
          source={require("../assets/images/fitplan.png")}
          style={styles.image}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
  },
  subtitle: {
    fontSize: 21,
  },
  image: {
    width: 130,
    height: 130,
  },
});

export default Index;
