import React, {useState} from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const LoginG = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const windowHeight = Dimensions.get('window').height;
  const auth = getAuth();
  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };
    

  return (
    <View style={[styles.container, { height: windowHeight }]}>
      <View style={styles.div}>
        <Text style={styles.title}>Welcome to Our App!</Text>
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/google.png')} style={styles.image} />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={20} color="#000" style={{ marginRight: 10, marginTop: 5 }} />
          <TextInput placeholder="Email or Username" style={styles.input} onChangeText={(text)=>setEmail(text)}/>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={20} color="#000" style={{ marginRight: 10, marginTop:5 }} />
          <TextInput placeholder="Password" style={styles.input} onChangeText={(text)=>setPassword(text)}/>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin(email, password)}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Don't have an account? 
          <Text style={{ color: '#000', fontWeight: 'bold' }} onPress={()=>navigation.navigate('SignUp')}> Sign Up</Text>
        </Text>
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
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  input:{
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
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});

export default LoginG;