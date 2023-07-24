import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const FirstForm = () => {
  const [genero, setGenero] = useState('');
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  const handleNext = () => {
    console.log('Datos guardados:', genero, edad, peso, altura);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecciona tu género:</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          onPress={() => setGenero('M')}
          style={[styles.genderOption, genero === 'M' && styles.genderOptionSelected]}
        >
          <Text style={[styles.genderText, genero === 'M' && styles.genderTextSelected]}>Masculino</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGenero('F')}
          style={[styles.genderOption, genero === 'F' && styles.genderOptionSelected]}
        >
          <Text style={[styles.genderText, genero === 'F' && styles.genderTextSelected]}>Femenino</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Ingresa tu edad:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => setEdad(text)}
        value={edad}
      />

      <Text style={styles.label}>Ingresa tu peso:</Text>
      <View style={styles.weightContainer}>
        <TextInput
          style={styles.weightInput}
          keyboardType="numeric"
          onChangeText={(text) => setPeso(text)}
          value={peso}
        />
        <View style={styles.weightUnitContainer}>
          <TouchableOpacity style={styles.weightUnitOption} onPress={() => console.log('Kg seleccionado')}>
            <Text style={styles.weightUnitText}>Kg</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.weightUnitOption} onPress={() => console.log('Lb seleccionado')}>
            <Text style={styles.weightUnitText}>Lb</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.label}>Ingresa tu altura:</Text>
      <View style={styles.heightContainer}>
        <TextInput
          style={styles.heightInput}
          keyboardType="numeric"
          onChangeText={(text) => setAltura(text)}
          value={altura}
        />
        <View style={styles.heightUnitContainer}>
          <TouchableOpacity style={styles.heightUnitOption} onPress={() => console.log('Cm seleccionado')}>
            <Text style={styles.heightUnitText}>Cm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.heightUnitOption} onPress={() => console.log('Ft seleccionado')}>
            <Text style={styles.heightUnitText}>Ft</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Siguiente</Text>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genderOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  genderOptionSelected: {
    backgroundColor: '#2e5bff',
    borderColor: '#2e5bff',
  },
  genderText: {
    fontSize: 16,
  },
  genderTextSelected: {
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  weightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  weightInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  weightUnitContainer: {
    flexDirection: 'row',
  },
  weightUnitOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  weightUnitText: {
    fontSize: 16,
  },
  heightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  heightInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  heightUnitContainer: {
    flexDirection: 'row',
  },
  heightUnitOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  heightUnitText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2e5bff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FirstForm;
