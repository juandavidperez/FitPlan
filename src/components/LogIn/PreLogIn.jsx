import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert } from "react-native";

const PreLogin = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to your app!</Text>
      <Text style={styles.text}>Aca va algo pero no se que</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Or</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9affdd",
    padding: 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 100,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PreLogin;