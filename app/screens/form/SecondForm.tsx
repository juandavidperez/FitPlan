import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useFormStore } from "@/store/formStore";
import { FormDataStep2 } from "@/types/navigation";

const SecondForm: React.FC = () => {
  const router = useRouter();
  const setStep2Data = useFormStore((state) => state.setStep2Data);

  const [meta, setMeta] = useState<string>("ninguna");
  const [experiencia, setExperiencia] = useState<string>("ninguna");
  const [lesion, setLesion] = useState<string>("ninguna");
  const [diasSeleccionados, setDiasSeleccionados] = useState<string[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const handleDiaCheckboxPress = (dia: string) => {
    const updatedDias = diasSeleccionados.includes(dia)
      ? diasSeleccionados.filter((selectedDia) => selectedDia !== dia)
      : [...diasSeleccionados, dia];

    setDiasSeleccionados(updatedDias);

    const count = updatedDias.length;
    setIsButtonDisabled(count < 3 || count > 5);
  };

  const handleNext = () => {
    const dataStep2: FormDataStep2 = {
      meta,
      experiencia,
      lesion,
      diasSeleccionados,
    };
    setStep2Data(dataStep2);
    router.push("/screens/form/ThirdForm");
  };

  return (
    <View style={styles.container}>
      {/* METAS */}
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

      {/* EXPERIENCIA */}
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

      {/* LESIONES */}
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

      {/* DÍAS */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Días:</Text>
        <Text style={{ marginBottom: 10, fontSize: 10 }}>
          Selecciona entre 3 y 5 días
        </Text>
        <View style={styles.checkboxContainer}>
          {["D", "L", "Ma", "Mi", "J", "V", "S"].map((dia) => (
            <TouchableOpacity
              key={dia}
              style={[
                styles.checkbox,
                diasSeleccionados.includes(dia) && styles.checkboxSelected,
              ]}
              onPress={() => handleDiaCheckboxPress(dia)}
            >
              <Text
                style={[
                  styles.checkboxText,
                  diasSeleccionados.includes(dia) && styles.checkboxTextSelected,
                ]}
              >
                {dia}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* BOTONES */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
          onPress={handleNext}
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
    borderRadius: 10,
  },
  picker: {
    flex: 1,
    height: 40,
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
    backgroundColor: "#b3b3b3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SecondForm;