import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const Welcome = () => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={[styles.container, { height: windowHeight }]}>
      <Text style={styles.title}>BIENVENIDO</Text>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Mejora tu salud y bienestar</Text>
        </View>
        <Image style={styles.image} source={require('../../assets/penguin.png')} />
      </View>
      <View style={styles.row}>
        <Image style={styles.image} source={require('../../assets/penguin.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Descubre nuevos ejercicios</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Encuentra rutinas efectivas</Text>
        </View>
        <Image style={styles.image} source={require('../../assets/penguin.png')} />
      </View>
      <View style={styles.row}>
        <Image style={styles.image} source={require('../../assets/penguin.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Sigue tu progreso personal</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
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
  image: {
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
  button: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 5,
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
