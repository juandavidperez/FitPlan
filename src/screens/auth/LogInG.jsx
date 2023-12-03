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
import { ThemeContext } from "../../components/ThemeContext";

const LoginG = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { selected, handleContextChange, themes } = useContext(ThemeContext);
  const { secondaryBackgroundColor, titleColor, textColor, highlightColor } =
    themes[selected];

  const windowHeight = Dimensions.get("window").height;
  const auth = getAuth();

  const handleLogin = async (email, password) => {
    try {
      if (email.length === 0 || password.length === 0) {
        console.log("hay campos vacios");
        Alert.alert("Error ❌", "Por favor rellena todos los campos");
        return;
      }
      if (!emailRegex.test(email)) {
        console.log("el correo no es valido");
        Alert.alert(
          "Error ❌",
          "Por favor ingresa un correo electrónico válido (ejemplo: usuario@gmail.com)"
        );
        return;
      }
      if (!passwordRegex.test(password)) {
        console.log("la contraseña no es valida");
        Alert.alert(
          "Error ❌",
          "La contraseña debe contener al menos 6 caracteres, incluyendo al menos una letra, un caracter especial y un número."
        );
        return;
      }

      const user = await AuthService.signIn(email, password);

      if (user) {
        console.log("inicio de sesion exitoso");
        navigation.navigate("BottomTab");
      }
    } catch (error) {
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
        <Text style={styles.title}>Welcome to Our App!</Text>
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
            onChangeText={(text) => setEmail(text)}
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
            onChangeText={(text) => setPassword(text)}
          />
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#000"
            style={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (email.length > 0 && password.length > 0) {
              handleLogin(email, password);
            } else {
              Alert.alert("Error ❌", "Porfavor rellena todos los campos");
            }
          }}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          Don't have an account?
          <Text
            style={styles.linkText}
            onPress={() => navigation.navigate("SignUp")}
          >
            {" "}
            Sign Up
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

export default LoginG;
