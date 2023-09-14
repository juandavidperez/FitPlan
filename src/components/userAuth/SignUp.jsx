import React, { useState } from "react";
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ navigation, onEnviar }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const windowHeight = Dimensions.get("window").height;
  const auth = getAuth();
  const handleSignUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      onEnviar({
        username: username,
        email: email,
      });
      console.log(username, email);
      navigation.navigate("FirstForm");
    } catch (error) {
      Alert.alert("Error ❌", "Ha ocurrido un error al registrarte");
      console.log(error);
    }
  };

  return (
    <View style={[styles.container, { height: windowHeight }]}>
      <View style={styles.div}>
        <Text style={styles.title}>Welcome to Our App!</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/google.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            name="person"
            size={20}
            color="#000"
            style={{ marginRight: 10, marginTop: 5 }}
          />
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            name="mail"
            size={20}
            color="#000"
            style={{ marginRight: 10, marginTop: 5 }}
          />
          <TextInput
            placeholder="Email"
            pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"}
            style={styles.input}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed"
            size={20}
            color="#000"
            style={{ marginRight: 10, marginTop: 5 }}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (
              username.length > 0 &&
              email.length > 0 &&
              password.length > 0
            ) {
              handleSignUp(email, password);
            } else {
              Alert.alert("Error ❌", "Porfavor rellena todos los campos");
            }
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          Already have an account?
          <Text
            style={{ color: "#000", fontWeight: "bold" }}
            onPress={() => navigation.navigate("LoginG")}
          >
            {" "}
            Log In
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(78, 150, 209, 0.8)",
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
});

export default SignUp;
