import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {auth, database} from '../../../firebase'
import {ref, set, push } from 'firebase/database'
import { Ionicons } from '@expo/vector-icons';

const FirstForm = ({navigation}) => {
  const [genero, setGenero] = useState('');
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [unidadPeso, setUnidadPeso] = useState('Kg');
  const [unidadAltura, setUnidadAltura] = useState('Cm');

  const handleNext = () => {
    const user = auth.currentUser;
    if(user){
      const userRef = ref(database, `usuarios/${user.name}`); // Referencia al nodo "usuarios"
      const newUserRef = push(userRef);
      // Genera un nuevo id para el usuario
      set(newUserRef, {
        genero: genero,
        edad: parseInt(edad),
        peso: [parseInt(peso), unidadPeso],
        altura: [parseFloat(altura), unidadAltura],
      });
  
      console.log('Datos guardados:', genero, edad, peso, altura);
  
      //Reiniciar los estados para borrar los campos del formulario después de subir los datos
      setGenero('');
      setEdad('');
      setPeso('');
      setAltura('');
    }else{
      console.log('No hay usuario logueado');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecciona tu género:</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          onPress={() => setGenero('M')}
          style={[styles.genderOption, genero === 'M' && styles.genderOptionSelected]}
        >
          <Text style={[styles.genderText, genero === 'M' && styles.genderTextSelected]}>Masculino
            <Ionicons name="man" size={24} color="black" style={[styles.genderText, genero === 'M' && styles.genderTextSelected]}/>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGenero('F')}
          style={[styles.genderOption, genero === 'F' && styles.genderOptionSelected]}
        >
          <Text style={[styles.genderText, genero === 'F' && styles.genderTextSelected]}>Femenino
            <Ionicons name="woman" size={24} color="black" style={[styles.genderText, genero === 'F' && styles.genderTextSelected]}/>
          </Text>
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
          <TouchableOpacity
            onPress={() => setUnidadPeso('Kg')}
            style={[styles.weightUnitOption, unidadPeso === 'Kg' && styles.weightUnitSelected]}
          >
            <Text style={styles.weightUnitText}>Kg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUnidadPeso('Lb')}
            style={[styles.weightUnitOption, unidadPeso === 'Lb' && styles.weightUnitSelected]}
          >
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
          <TouchableOpacity
            onPress={() => setUnidadAltura('Cm')}
            style={[styles.heightUnitOption, unidadAltura === 'Cm' && styles.heightUnitSelected]}
          >
            <Text style={styles.heightUnitText}>Cm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUnidadAltura('Ft')}
            style={[styles.heightUnitOption, unidadAltura === 'Ft' && styles.heightUnitSelected]}
          >
            <Text style={styles.heightUnitText}>Ft</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {
        handleNext();
        navigation.navigate('SecondForm');
      }}>
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
    backgroundColor: '#f0f0f0',
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
  weightUnitContainer: {
    flexDirection: 'row',
    width: itemWidth / 3.5,
  },
  weightUnitOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  weightUnitSelected: {
    backgroundColor: '#2e5bff',
    borderColor: '#2e5bff',
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
    width: itemWidth / 3.5,
  },
  heightUnitOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  heightUnitSelected: {
    backgroundColor: '#2e5bff',
    borderColor: '#2e5bff',
  },
  heightUnitText: {
    fontSize: 16,
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
