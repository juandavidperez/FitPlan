import React, { useState, useContext } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../../components/ThemeContext";
import { useRouter } from "expo-router";
import AuthService from "../../services/AuthService";

// Expresiones regulares para validación (puedes editarlas si ya las tienes en otro lado)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { selected, themes } = useContext(ThemeContext);
  const { secondaryBackgroundColor, titleColor } = themes[selected];

  const windowHeight = Dimensions.get("window").height;
  const router = useRouter();

  const handleLogin = async () => {
    console.log("BotonPresionado")
    try {
      if (email.trim() === "" || password.trim() === "") {
        console.log("Rellena los campos");
        Alert.alert("Error ❌", "Por favor rellena todos los campos");
        return;
      }

      if (!emailRegex.test(email)) {
        console.log("Ingresa un correo válido");
        Alert.alert(
          "Error ❌",
          "Por favor ingresa un correo electrónico válido (ejemplo: usuario@gmail.com)"
        );
        return;
      }

      if (!passwordRegex.test(password)) {
        console.log("La contraseña no es válida");
        Alert.alert(
          "Error ❌",
          "La contraseña debe contener al menos 6 caracteres, incluyendo al menos una letra, un caracter especial y un número."
        );
        return;
      }

      console.log("Iniciando sesión...");

      const user = await AuthService.login(email, password);
       if (user) {
        console.log("Inicio de sesión exitoso");
        //router.replace("/screens/BottomTab");
      }
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.message);
      Alert.alert(
        "Error ❌",
        "Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        { height: windowHeight, backgroundColor: secondaryBackgroundColor },
      ]}
    >
      <View style={styles.div}>
        <Text style={[styles.title, { color: titleColor }]}>
          Welcome to Our App!
        </Text>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/google.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={20} color="#000" style={styles.icon} />
          <TextInput
            placeholder="Email or Username"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed"
            size={20}
            color="#000"
            style={styles.icon}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={styles.input}
            onChangeText={setPassword}
            value={password}
          />
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#000"
            style={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={[styles.text, { color: titleColor }]}>
          Don't have an account?
          <Text
            style={styles.linkText}
            onPress={() => router.push("/screens/auth/SignUpScreen")}
          >
            {" "}Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  inputContainer: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  div: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  icon: {
    marginRight: 10,
    marginTop: 5,
  },
  linkText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default LoginScreen;