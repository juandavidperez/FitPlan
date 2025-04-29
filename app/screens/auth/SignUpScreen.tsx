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
import AuthService from "../../services/AuthService";
import { ThemeContext } from "../../../components/ThemeContext";
import { useRouter } from "expo-router";
import { database } from "../../../config/firebaseConfig";
import { ref, set } from "firebase/database";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

const SignUpScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { selected, themes } = useContext(ThemeContext);
  const { secondaryBackgroundColor } = themes[selected];

  const windowHeight = Dimensions.get("window").height;
  const router = useRouter();

  const removeEmailDomain = (email: string) => {
    return email.substring(0, email.indexOf('@'));
  }

  const handleSignUp = async (email: string, password: string) => {
    if (!email || !password || !username) {
      console.log("Rellena los campos");
      Alert.alert("Error ❌", "Por favor rellena todos los campos");
      return;
    }
    if (!emailRegex.test(email)) {
      console.log("Ingresa un correo válido");
      Alert.alert(
        "Error ❌",
        "Por favor ingresa un correo electrónico válido (ejemplo: usuario@gmail.com o usuario@inemjose.edu.co)"
      );
      return;
    }
    if (!passwordRegex.test(password)) {
      console.log("La contraseña no es válida");
      Alert.alert(
        "Error ❌",
        "La contraseña debe tener al menos 6 caracteres, incluyendo una letra, un número y un caracter especial."
      );
      return;
    }

    console.log("Creando cuenta...");

    try {
      const user = await AuthService.signUp(email, password);
      if (user) {
        const db = database;
        const userRef = ref(db, "usuarios/" + removeEmailDomain(email));
        await set(userRef, {
          username: username,
          email: email,
        });

        Alert.alert("Éxito ✅", "Cuenta creada con éxito.");
        router.push("/screens/form/FirstForm");
      }
    } catch (error) {
      Alert.alert("Error ❌", "No se pudo crear la cuenta. Inténtalo nuevamente.");
    }
  };

  const images = {
    google: require("../../../assets/images/google.png"),
  };

  return (
    <View
      style={[
        styles.container,
        { height: windowHeight, backgroundColor: secondaryBackgroundColor },
      ]}
    >
      <View style={styles.div}>
        <Text style={styles.title}>Welcome to Our App!</Text>
        <View style={styles.imageContainer}>
          <Image source={images.google} style={styles.image} />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={20} color="#000" style={styles.icon} />
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={setUsername}
            value={username}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={20} color="#000" style={styles.icon} />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={20} color="#000" style={styles.icon} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleSignUp(email, password)}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          Already have an account?
          <Text
            style={styles.linkText}
            onPress={() => router.push("/screens/auth/LoginScreen")}
          >
            {" "}Log In
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
    color: "#000",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
    color: "#000",
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
  icon: {
    marginRight: 10,
    marginTop: 5,
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
  linkText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
