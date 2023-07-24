import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Picker, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SecondForm = () => {
  const [meta, setMeta] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [dificultad, setDificultad] = useState('');
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);

  const handleInfoIconPress = () => {
    console.log('Icono de información presionado');
  };

  const handleDiaCheckboxPress = (dia) => {
    if (diasSeleccionados.includes(dia)) {
      setDiasSeleccionados(diasSeleccionados.filter((selectedDia) => selectedDia !== dia));
    } else {
      setDiasSeleccionados([...diasSeleccionados, dia]);
    }
  };

  const handlePrevious = () => {
    console.log('Botón Anterior presionado');
  };

  const handleNext = () => {
    console.log('Datos guardados:', meta, experiencia, dificultad, diasSeleccionados);
  };

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Metas:</Text>
        <View style={styles.inputContainer}>
          <Picker
            style={styles.picker}
            selectedValue={meta}
            onValueChange={(itemValue) => setMeta(itemValue)}
          >
            <Picker.Item label="Hipertrofia" value="hipertrofia" />
            <Picker.Item label="Definición" value="definicion" />
            <Picker.Item label="Fuerza" value="fuerza" />
            <Picker.Item label="Déficit Calórico" value="deficit_calorico" />
            <Picker.Item label="Recomposición Corporal" value="recomposicion_corporal" />
          </Picker>
          <TouchableOpacity onPress={handleInfoIconPress}>
            <Ionicons name="information-circle-outline" size={24} color="#2e5bff"/>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Experiencia:</Text>
        <Picker
          style={styles.picker}
          selectedValue={experiencia}
          onValueChange={(itemValue) => setExperiencia(itemValue)}
        >
          <Picker.Item label="Principiante" value="principiante" />
          <Picker.Item label="Intermedio" value="intermedio" />
          <Picker.Item label="Avanzado" value="avanzado" />
        </Picker>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Dificultades:</Text>
        <Picker
          style={styles.picker}
          selectedValue={dificultad}
          onValueChange={(itemValue) => setDificultad(itemValue)}
        >
          <Picker.Item label="Cardiacas" value="cardiacas" />
          <Picker.Item label="Falta de extremidades" value="falta_extremidades" />
          {/* Agrega más opciones de dificultades aquí */}
        </Picker>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Días:</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, diasSeleccionados.includes('D') && styles.checkboxSelected]}
            onPress={() => handleDiaCheckboxPress('D')}
          >
            <Text style={styles.checkboxText}>D</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkbox, diasSeleccionados.includes('L') && styles.checkboxSelected]}
            onPress={() => handleDiaCheckboxPress('L')}
          >
            <Text style={styles.checkboxText}>L</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkbox, diasSeleccionados.includes('Ma') && styles.checkboxSelected]}
            onPress={() => handleDiaCheckboxPress('Ma')}
          >
            <Text style={styles.checkboxText}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkbox, diasSeleccionados.includes('Mi') && styles.checkboxSelected]}
            onPress={() => handleDiaCheckboxPress('Mi')}
          >
            <Text style={styles.checkboxText}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkbox, diasSeleccionados.includes('J') && styles.checkboxSelected]}
            onPress={() => handleDiaCheckboxPress('J')}
          >
            <Text style={styles.checkboxText}>J</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkbox, diasSeleccionados.includes('V') && styles.checkboxSelected]}
            onPress={() => handleDiaCheckboxPress('V')}
          >
            <Text style={styles.checkboxText}>V</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkbox, diasSeleccionados.includes('S') && styles.checkboxSelected]}
            onPress={() => handleDiaCheckboxPress('S')}
          >
            <Text style={styles.checkboxText}>S</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePrevious}>
          <Text style={styles.buttonText}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
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
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    borderRadius: 10,
  },
  picker: {
    flex: 1,
    height: 40,
    borderRadius: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  checkbox: {
    width: itemWidth / 4.5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: '#2e5bff',
    borderColor: '#2e5bff',
  },
  checkboxText: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#2e5bff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '45%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SecondForm;
