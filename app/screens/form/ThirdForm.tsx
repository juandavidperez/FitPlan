import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFormStore } from "@/store/formStore";
import { database } from "../../../config/firebaseConfig";
import { ref, update } from "firebase/database";
import { auth } from "../../../config/firebaseConfig";
import { FormDataStep3 } from "@/types/navigation";

type SetOption = {
  id: string;
  title: string;
  description: string;
  image: any;
};

const sets: SetOption[] = [
  {
    id: "casa",
    title: "En casa",
    description: "No tienes implementos pero quieres entrenar en casa.",
    image: require("../../../assets/images/saltar-la-cuerda.png"),
  },
  {
    id: "basico",
    title: "Básico",
    description: "Un set con implementos básicos para entrenar.",
    image: require("../../../assets/images/rutina-de-ejercicio.png"),
  },
  {
    id: "gimnasio",
    title: "Gimnasio",
    description:
      "Tienes posibilidad de entrenar con los implementos de un gimnasio.",
    image: require("../../../assets/images/levantamiento-de-pesas.png"),
  },
];

const ThirdForm: React.FC = () => {
  const router = useRouter();
  const setStep3Data = useFormStore((state) => state.setStep3Data);
  const resetForm = useFormStore((state) => state.resetForm);

  const [selectedSet, setSelectedSet] = useState<string>("");

  const removeEmailDomain = (email: string) => {
    return email.substring(0, email.indexOf('@'));
  }

  const handleForm =  async () => {
    const dataStep3: FormDataStep3 = { selectedSet };
    setStep3Data(dataStep3);
    const allData = useFormStore.getState().getAllData();

    console.log("Datos del formulario:", allData);

    const email = auth.currentUser?.email;

    try {
      const db = database;
      const userRef = ref(db, "usuarios/" + removeEmailDomain(email!));
      await update(userRef, {
        ...allData
      });
         
      console.log("Datos enviados con éxito (simulado)");
      resetForm();
      router.push("/(tabs)/HomeScreen");
    } catch (error) {
         console.error("Error al enviar datos:", error);
    }
};

  const handleSetSelect = (setId: string) => {
    if (selectedSet === setId) {
      setSelectedSet("");
    }   else {
      setSelectedSet(setId);
    }
  };


  const selected = sets.find((set) => set.id === selectedSet);

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

      {selected && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{selected.description}</Text>
          <Image source={selected.image} style={styles.image} />
        </View>
      )}

      <TouchableOpacity
        style={[styles.finalizarButton, !selectedSet && styles.disabledButton]}
        disabled={!selectedSet}
        onPress={handleForm}
      >
        <Text style={styles.finalizarButtonText}>Finalizar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    paddingHorizontal: 15,
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
    marginRight: -16,
  },
  selectedButton: {
    backgroundColor: "#ffcc00",
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