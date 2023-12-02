import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { auth, database } from "../../utils/firebase";
import { ref, set, push } from "firebase/database";
import { Ionicons } from "@expo/vector-icons";

const FirstForm = ({ navigation, onEnviar }) => {
  const [genero, setGenero] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [unidadPeso, setUnidadPeso] = useState("Kg");
  const [unidadAltura, setUnidadAltura] = useState("Cm");

  const handleNext = () => {
    onEnviar({
      genero: genero,
      edad: edad,
      peso: peso,
      altura: altura,
      unidadPeso: unidadPeso,
      unidadAltura: unidadAltura,
    });
    console.log(genero, edad, peso, altura, unidadPeso, unidadAltura);
    navigation.navigate("SecondForm");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecciona tu género:</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          onPress={() => setGenero("Masculino")}
          style={[
            styles.genderOption,
            genero === "Masculino" && styles.genderOptionSelected,
          ]}
        >
          <Text
            style={[
              styles.genderText,
              genero === "Masculino" && styles.genderTextSelected,
            ]}
          >
            Masculino
            <Ionicons
              name="man"
              size={24}
              color="black"
              style={[
                styles.genderText,
                genero === "Masculino" && styles.genderTextSelected,
              ]}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGenero("Femenino")}
          style={[
            styles.genderOption,
            genero === "Femenino" && styles.genderOptionSelected,
          ]}
        >
          <Text
            style={[
              styles.genderText,
              genero === "Femenino" && styles.genderTextSelected,
            ]}
          >
            Femenino
            <Ionicons
              name="woman"
              size={24}
              color="black"
              style={[
                styles.genderText,
                genero === "Femenino" && styles.genderTextSelected,
              ]}
            />
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
            onPress={() => setUnidadPeso("Kg")}
            style={[
              styles.weightUnitOption,
              unidadPeso === "Kg" && styles.weightUnitSelected,
            ]}
          >
            <Text
              style={[
                styles.weightUnitText,
                unidadPeso === "Kg" && styles.unitSelectedText,
              ]}
            >
              Kg
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUnidadPeso("Lb")}
            style={[
              styles.weightUnitOption,
              unidadPeso === "Lb" && styles.weightUnitSelected,
            ]}
          >
            <Text
              style={[
                styles.weightUnitText,
                unidadPeso === "Lb" && styles.unitSelectedText,
              ]}
            >
              Lb
            </Text>
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
            onPress={() => setUnidadAltura("Cm")}
            style={[
              styles.heightUnitOption,
              unidadAltura === "Cm" && styles.heightUnitSelected,
            ]}
          >
            <Text
              style={[
                styles.heightUnitText,
                unidadAltura === "Cm" && styles.unitSelectedText,
              ]}
            >
              Cm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUnidadAltura("Ft")}
            style={[
              styles.heightUnitOption,
              unidadAltura === "Ft" && styles.heightUnitSelected,
            ]}
          >
            <Text
              style={[
                styles.heightUnitText,
                unidadAltura === "Ft" && styles.unitSelectedText,
              ]}
            >
              Ft
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleNext()}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get("window");
const itemWidth = width - 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e2f3f5",
    justifyContent: "center",
  },
  label: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genderOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#000",
  },
  genderOptionSelected: {
    backgroundColor: "#2e5bff",
    borderColor: "#000",
  },
  genderText: {
    fontSize: 16,
  },
  genderTextSelected: {
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1.2,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  weightUnitContainer: {
    flexDirection: "row",
    width: itemWidth / 3.5,
  },
  weightUnitOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  weightUnitSelected: {
    backgroundColor: "#2e5bff",
    borderColor: "#000",
    color: "#fff",
  },
  weightUnitText: {
    fontSize: 16,
  },

  heightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  heightInput: {
    flex: 1,
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  heightUnitContainer: {
    flexDirection: "row",
    width: itemWidth / 3.5,
  },
  heightUnitOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  heightUnitSelected: {
    backgroundColor: "#2e5bff",
    borderColor: "#000",
  },
  heightUnitText: {
    fontSize: 16,
  },
  unitSelectedText: {
    color: "#fff",
  },
  weightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  weightInput: {
    flex: 1,
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#2e5bff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FirstForm;
