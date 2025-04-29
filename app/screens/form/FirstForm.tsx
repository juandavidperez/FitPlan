import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFormStore } from "@/store/formStore";
import { FormDataStep1 } from "@/types/navigation";

const FirstForm: React.FC = () => {
  const router = useRouter();
  const setStep1Data = useFormStore((state) => state.setStep1Data);

  const [genero, setGenero] = useState<string>("masculino");
  const [edad, setEdad] = useState<string>("");
  const [peso, setPeso] = useState<string>("");
  const [altura, setAltura] = useState<string>("");
  const [unidadPeso, setUnidadPeso] = useState<"Kg" | "Lb">("Kg");
  const [unidadAltura, setUnidadAltura] = useState<"Cm" | "Ft">("Cm");

  const handleNext = () => {
    const dataStep1: FormDataStep1 = {
      genero,
      edad,
      peso,
      altura,
      unidadPeso,
      unidadAltura,
    };
    setStep1Data(dataStep1);

    router.push("/screens/form/SecondForm");

  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecciona tu género:</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          onPress={() => setGenero("masculino")}
          style={[
            styles.genderOption,
            genero === "masculino" && styles.genderOptionSelected,
          ]}
        >
          <Text
            style={[
              styles.genderText,
              genero === "masculino" && styles.genderTextSelected,
            ]}
          >
            Masculino{" "}
            <Ionicons
              name="man"
              size={24}
              color={genero === "masculino" ? "#fff" : "#000"}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGenero("femenino")}
          style={[
            styles.genderOption,
            genero === "femenino" && styles.genderOptionSelected,
          ]}
        >
          <Text
            style={[
              styles.genderText,
              genero === "femenino" && styles.genderTextSelected,
            ]}
          >
            Femenino{" "}
            <Ionicons
              name="woman"
              size={24}
              color={genero === "femenino" ? "#fff" : "#000"}
            />
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Ingresa tu edad:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setEdad}
        value={edad}
      />

      <Text style={styles.label}>Ingresa tu peso:</Text>
      <View style={styles.weightContainer}>
        <TextInput
          style={styles.weightInput}
          keyboardType="numeric"
          onChangeText={setPeso}
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
          onChangeText={setAltura}
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

      <TouchableOpacity style={styles.button} onPress={handleNext}>
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
    marginHorizontal: 5,
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
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  weightUnitSelected: {
    backgroundColor: "#2e5bff",
    borderColor: "#000",
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
    marginHorizontal: 5,
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