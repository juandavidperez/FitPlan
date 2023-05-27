import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const Welcome = () => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={[styles.container, { height: windowHeight }]}>
      <Text style={styles.title}>BIENVENIDO</Text>
      <View style={styles.row}>
        <Image style={styles.image} source={require('../../assets/penguin.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Texto a la derecha</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Texto a la izquierda</Text>
        </View>
        <Image style={styles.image} source={require('../../assets/penguin.png')} />
      </View>
      <View style={styles.row}>
        <Image style={styles.image} source={require('../../assets/penguin.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Texto a la derecha</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Texto a la izquierda</Text>
        </View>
        <Image style={styles.image} source={require('../../assets/penguin.png')} />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Botón</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9affdd',
    padding: 20,
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
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 100,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
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
  },
});

export default Welcome;
