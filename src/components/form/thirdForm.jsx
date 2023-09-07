import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, database} from '../../../firebase'
import {ref, set, push } from 'firebase/database'

const ThirdForm = ({navigation}) => {
  const [selectedSet, setSelectedSet] = useState(null);

  const handleForm = () => {
    const user = auth.currentUser;
    if(user){
      const userRef = ref(database, `usuarios/${user.name}`); // Referencia al nodo "usuarios"
      const newUserRef = push(userRef); // Genera un nuevo id para el usuario
      set(newUserRef, {
        selectedSet: selectedSet,
      });
      console.log('Datos guardados:', selectedSet);
      setSelectedSet(null);
    }else{
      console.log('No hay usuario logueado');
    }
  }

  const sets = [
    {
      id: 'basico',
      title: 'Básico',
      description: 'Un set con implementos básicos para entrenar.',
    },
    {
      id: 'casa',
      title: 'En casa',
      description: 'Un set con implementos para entrenar en casa, incluyendo pesas y barras.',
    },
    {
      id: 'gimnasio',
      title: 'Gimnasio',
      description: 'Un set completo de implementos para entrenar en un gimnasio.',
    },
  ];

  const handleSetSelect = (setId) => {
    setSelectedSet(setId);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Implementos disponibles</Text>

      {sets.map((set) => (
        <View key={set.id} style={styles.fieldContainer}>
          <Text style={styles.fieldText}>{set.title}</Text>
          <TouchableOpacity
            style={[styles.button, selectedSet === set.id && styles.selectedButton]}
            onPress={() => handleSetSelect(set.id)}
          >
            <Ionicons name="chevron-down" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ))}

      {selectedSet && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{sets.find((set) => set.id === selectedSet).description}</Text>
        </View>
      )}

      <TouchableOpacity style={[styles.finalizarButton, !selectedSet && styles.disabledButton]} disabled={!selectedSet} onPress={() => {
        handleForm();
        navigation.navigate('BottomTab');
      }}>
        <Text style={styles.finalizarButtonText}>Finalizar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = width - 40;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Cambio aquí para permitir que el ScrollView crezca
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 10,
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2e5bff',
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 15, // Agrego un espaciado horizontal para mantener el mismo ancho en todos los tamaños de pantalla
  },
  fieldText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2e5bff',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
    marginRight: -16, // Agrego un margen negativo para compensar el padding horizontal del contenedor
  },
  selectedButton: {
    backgroundColor: '#ffcc00',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#2e5bff',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  finalizarButton: {
    alignSelf: 'center',
    backgroundColor: '#2e5bff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  finalizarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ThirdForm;
