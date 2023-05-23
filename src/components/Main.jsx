import React from 'react';
import {Text, View, StyleSheet, Image, TouchableWithoutFeedback, Alert} from 'react-native';

const Main = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FitPlan</Text>
      <Text style={styles.subtitle}>¡Tu entrenador personal!</Text>
      <TouchableWithoutFeedback onPress={Alert.alert("xd")}>
        <Image
          source={require('../../assets/favicon.png')}
          style={{width: 100, height: 100}}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf59c',
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
    fontWeight: 'semibold',
    color: '#000',
  },
});
export default Main;