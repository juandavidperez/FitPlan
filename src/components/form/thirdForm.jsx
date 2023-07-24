import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const ThirdForm = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Implementos disponibles</Text>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldText}>Máquinas</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldText}>Objetos</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldText}>Otros</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.finalizarButton}>
        <Text style={styles.finalizarButtonText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = width - 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2e5bff',
    borderRadius: 10,
    marginBottom: 20,
  },
  fieldText: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#2e5bff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  finalizarButton: {
    alignSelf: 'center',
    backgroundColor: '#2e5bff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  finalizarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ThirdForm;
