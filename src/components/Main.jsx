import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import {Ionicons} from '@expo/vector-icons'

const Main = () => {
  const windowHeight = Dimensions.get('window').height;
  return (
    <View style={[styles.container, { height: windowHeight }]}>
      <Text style={styles.title}>FitPlan
        <Ionicons name="flash" size={24} color="#FFD300" />
      </Text>
      <Text style={styles.subtitle}>¡Tu entrenador personal!</Text>
      <Image
          source={require('../../assets/favicon.png')}
          style={styles.image}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1EB1CF',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 21,
    fontWeight: '600',
    color: '#000',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Main;
