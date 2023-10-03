import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, database } from "../../../firebase";
import { ref, set, push } from "firebase/database";

const ThirdForm = ({ navigation, onEnviar, enviarDatos }) => {
  const [selectedSet, setSelectedSet] = useState(null);

  const handleForm = () => {
    //onEnviar({ selectedSet: selectedSet });
    console.log(enviarDatos);
    if (enviarDatos) {
      enviarDatos();
    } else {
      console.log("No hay datos para enviar en el thirdform");
    }
    navigation.navigate("BottomTab");
  };

  const sets = [
    {
      id: "casa",
      title: "En casa",
      description: "No tienes implementos pero quieres entrenar en casa.",
      image: require("../../../assets/saltar-la-cuerda.png"),
    },
    {
      id: "basico",
      title: "Básico",
      description: "Un set con implementos básicos para entrenar.",
      image: require("../../../assets/rutina-de-ejercicio.png"),
    },
    {
      id: "gimnasio",
      title: "Gimnasio",
      description:
        "Tienes posibilidad de entrenar con los implementos de un gimnasio.",
      image: require("../../../assets/levantamiento-de-pesas.png"),
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
            style={[
              styles.button,
              selectedSet === set.id && styles.selectedButton,
            ]}
            onPress={() => handleSetSelect(set.id)}
          >
            <Ionicons name="chevron-down" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ))}

      {selectedSet && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {sets.find((set) => set.id === selectedSet).description}
          </Text>
          <Image
            source={sets.find((set) => set.id === selectedSet).image}
            style={styles.image}
          />
        </View>
      )}

      <TouchableOpacity
        style={[styles.finalizarButton, !selectedSet && styles.disabledButton]}
        disabled={!selectedSet}
        onPress={() => handleForm()}
      >
        <Text style={styles.finalizarButtonText}>Finalizar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const { width } = Dimensions.get("window");
const itemWidth = width - 40;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Cambio aquí para permitir que el ScrollView crezca
    padding: 20,
    backgroundColor: "#e2f3f5",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    paddingBottom: 10,
  },
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2e5bff",
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 15, // Agrego un espaciado horizontal para mantener el mismo ancho en todos los tamaños de pantalla
  },
  fieldText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2e5bff",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
    marginRight: -16, // Agrego un margen negativo para compensar el padding horizontal del contenedor
  },
  selectedButton: {
    backgroundColor: "#ffcc00",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#2e5bff",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  descriptionText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  finalizarButton: {
    alignSelf: "center",
    backgroundColor: "#2e5bff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  finalizarButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 10,
  },
});

export default ThirdForm;
