import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { getAuth } from 'firebase/auth';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenido a Fitplan</Text>
      <Text style={styles.subheader}>Tu compañero en el camino hacia una vida más saludable</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Ejercicios')}
        >
          <Text style={styles.buttonText}>Ver Ejercicios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Rutinas')}
        >
          <Text style={styles.buttonText}>Ver Rutinas</Text>
        </TouchableOpacity>
      </View>
      <Text>aadasd</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;