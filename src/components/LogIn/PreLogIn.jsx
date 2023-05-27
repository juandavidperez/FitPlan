import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const PreLogin = () => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={[styles.container, { height: windowHeight }]}>
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
    backgroundColor: "#cf89ad",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
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
