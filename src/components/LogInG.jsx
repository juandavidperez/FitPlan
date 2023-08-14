import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Ionicons } from '@expo/vector-icons'

const provider = new GoogleAuthProvider();

const LoginG = () => {
  const windowHeight = Dimensions.get('window').height;
  const auth = getAuth();

  const signInWithGooglePopup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <View style={[styles.container, { height: windowHeight }]}>
      <View style={styles.div}>
      <Text style={styles.title}>Login to our app!</Text>
        <Ionicons name="person" size={50} color="black" style={styles.icon}/>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/google.png')} style={styles.image} />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => signInWithGooglePopup()}>
          <Text style={styles.buttonText}>Log In with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#095A56",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFF",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
    color: "#FFF",
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginBottom: 20,
    borderRadius: 25,
    alignSelf: 'center',
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
    backgroundColor: "#456789",
    padding: 20,
    borderRadius: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default LoginG;
