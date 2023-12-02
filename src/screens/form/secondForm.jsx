import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { auth, database } from "../../utils/firebase";
import { ref, set, push } from "firebase/database";

const SecondForm = ({ navigation, onEnviar }) => {
  const [meta, setMeta] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [lesion, setLesion] = useState("");
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleDiaCheckboxPress = (dia) => {
    if (diasSeleccionados.includes(dia)) {
      setDiasSeleccionados(
        diasSeleccionados.filter((selectedDia) => selectedDia !== dia)
      );
    } else {
      setDiasSeleccionados([...diasSeleccionados, dia]);
    }
    const selectedDaysCount = diasSeleccionados.length;
    setIsButtonDisabled(selectedDaysCount < 2 || selectedDaysCount > 4);
  };

  const handleNext = () => {
    onEnviar({
      meta: meta,
      experiencia: experiencia,
      lesion: lesion,
      diasSeleccionados: diasSeleccionados,
    });
    console.log(meta, experiencia, lesion, diasSeleccionados);
    navigation.navigate("ThirdForm");
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
            <Picker.Item label="Ninguna" value="ninguna" />
            <Picker.Item label="Hipertrofia" value="hipertrofia" />
            <Picker.Item label="Definición" value="definicion" />
            <Picker.Item label="Fuerza" value="fuerza" />
            <Picker.Item label="Déficit Calórico" value="deficit_calorico" />
            <Picker.Item
              label="Recomposición Corporal"
              value="recomposicion_corporal"
            />
          </Picker>
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Experiencia:</Text>
        <View style={styles.inputContainer}>
          <Picker
            style={styles.picker}
            selectedValue={experiencia}
            onValueChange={(itemValue) => setExperiencia(itemValue)}
          >
            <Picker.Item label="Ninguna" value="..." />
            <Picker.Item label="Principiante" value="principiante" />
            <Picker.Item label="Intermedio" value="intermedio" />
            <Picker.Item label="Avanzado" value="avanzado" />
          </Picker>
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Lesiones:</Text>
        <View style={styles.inputContainer}>
          <Picker
            style={styles.picker}
            selectedValue={lesion}
            onValueChange={(itemValue) => setLesion(itemValue)}
          >
            <Picker.Item label="Ninguna" value="ninguna" />
            <Picker.Item label="Rodillas" value="rodillas" />
            <Picker.Item label="Hombros" value="hombros" />
            <Picker.Item label="Espalda" value="espalda" />
          </Picker>
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Días:</Text>
        <Text style={{ marginBottom: 10, fontSize: 10 }}>
          Selecciona entre 3 y 5 días
        </Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              diasSeleccionados.includes("D") && styles.checkboxSelected,
            ]}
            onPress={() => handleDiaCheckboxPress("D")}
          >
            <Text
              style={[
                styles.checkboxText,
                diasSeleccionados.includes("D") && styles.checkboxTextSelected,
              ]}
            >
              D
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.checkbox,
              diasSeleccionados.includes("L") && styles.checkboxSelected,
            ]}
            onPress={() => handleDiaCheckboxPress("L")}
          >
            <Text
              style={[
                styles.checkboxText,
                diasSeleccionados.includes("L") && styles.checkboxTextSelected,
              ]}
            >
              L
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.checkbox,
              diasSeleccionados.includes("Ma") && styles.checkboxSelected,
            ]}
            onPress={() => handleDiaCheckboxPress("Ma")}
          >
            <Text
              style={[
                styles.checkboxText,
                diasSeleccionados.includes("Ma") && styles.checkboxTextSelected,
              ]}
            >
              M
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.checkbox,
              diasSeleccionados.includes("Mi") && styles.checkboxSelected,
            ]}
            onPress={() => handleDiaCheckboxPress("Mi")}
          >
            <Text
              style={[
                styles.checkboxText,
                diasSeleccionados.includes("Mi") && styles.checkboxTextSelected,
              ]}
            >
              M
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.checkbox,
              diasSeleccionados.includes("J") && styles.checkboxSelected,
            ]}
            onPress={() => handleDiaCheckboxPress("J")}
          >
            <Text
              style={[
                styles.checkboxText,
                diasSeleccionados.includes("J") && styles.checkboxTextSelected,
              ]}
            >
              J
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.checkbox,
              diasSeleccionados.includes("V") && styles.checkboxSelected,
            ]}
            onPress={() => handleDiaCheckboxPress("V")}
          >
            <Text
              style={[
                styles.checkboxText,
                diasSeleccionados.includes("V") && styles.checkboxTextSelected,
              ]}
            >
              V
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.checkbox,
              diasSeleccionados.includes("S") && styles.checkboxSelected,
            ]}
            onPress={() => handleDiaCheckboxPress("S")}
          >
            <Text
              style={[
                styles.checkboxText,
                diasSeleccionados.includes("S") && styles.checkboxTextSelected,
              ]}
            >
              S
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FirstForm")}
        >
          <Text style={styles.buttonText}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
          onPress={() => handleNext()}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");
const itemWidth = width - 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#e2f3f5",
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    borderRadius: 10,
  },
  picker: {
    flex: 1,
    height: 40,
    borderRadius: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  checkbox: {
    width: itemWidth / 4.5,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: "#2e5bff",
    borderColor: "#2e5bff",
  },
  checkboxText: {
    fontSize: 16,
    textAlign: "center",
  },
  checkboxTextSelected: {
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#2e5bff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "45%",
    marginHorizontal: 5,
  },
  buttonDisabled: {
    backgroundColor: "#b3b3b3", // Cambia el color de fondo cuando el botón está deshabilitado
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextDisabled: {
    color: "#666666", // Cambia el color del texto cuando el botón está deshabilitado
  },
});

export default SecondForm;
