import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import {Ionicons} from '@expo/vector-icons'

const Welcome = ({navigation}) => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={[styles.container, { height: windowHeight }]}>
      <Text style={styles.title}>BIENVENIDO A FITPLAN</Text>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Mejora tu salud y bienestar</Text>
        </View>
        <Ionicons name="fitness" size={50} color="#900603" style={styles.icon}/>
      </View>
      <View style={styles.row}>
        <Ionicons name="barbell" size={50} color="#858585" style={styles.icon}/>
        <View style={styles.textContainer}>
          <Text style={styles.textLeft}>Descubre nuevos ejercicios</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Encuentra rutinas efectivas</Text>
        </View>
        <Ionicons name="timer" size={50} color="#ebecf0" style={styles.icon}/>
      </View>
      <View style={styles.row}>
      <Ionicons name="stats-chart" size={50} color="#03ac13" style={styles.icon}/>
        <View style={styles.textContainer}>
          <Text style={styles.textLeft}>Sigue tu progreso personal</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginG')}>
        <Text style={styles.buttonText}>Explorar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F7E79',
    padding: 20,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: '#FFF',
  },
  textLeft: {
    fontSize: 18,
    color: '#FFF',
    
  },
  button: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 17,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Welcome;
