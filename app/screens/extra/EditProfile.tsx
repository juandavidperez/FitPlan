import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../../../config/firebaseConfig";
import { getDatabase, ref, get, update } from "firebase/database";
import { ThemeContext } from "../../../components/ThemeContext";

type Props = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

interface UserData {
  username: string;
  email: string;
  edad: number;
  altura: number;
  unidadAltura: "Cm" | "M" | string;
  peso: number;
  unidadPeso: "Kg" | "Lb" | string;
  genero: string;
  diasSeleccionados: string[];
  experiencia: string;
  meta: string;
}


const EditProfile: React.FC<Props> = ({ navigation }) => {
  const [key, setKey] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [username, setUsername] = useState<string>("");
  const [edad, setEdad] = useState<string>("");
  const [peso, setPeso] = useState<string>("");
  const [unidadPeso, setUnidadPeso] = useState<"Kg" | "Lb">("Kg");
  const [altura, setAltura] = useState<string>("");
  const [unidadAltura, setUnidadAltura] = useState<"Cm" | "Ft">("Cm");
  const [genero, setGenero] = useState<string>("");

  const { selected, themes } = useContext(ThemeContext);
  const {
    backgroundColor,
    secondaryBackgroundColor,
    titleColor,
    textColor,
    highlightColor,
  } = themes[selected];

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const name = user.email?.split("@")[0].replace(".", "_");
        const db = getDatabase();
        const userRef = ref(db, `usuarios/${name}`);

        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserData(data);
            console.log("User data:", data.dificultad);
          } else {
            console.log("No data available");
          }
        } catch (error) {
          console.error("Firebase error:", error);
        }
      }
    };

    fetchData();
  }, []);

  const toggleWeightUnit = () => {
    setUnidadPeso(unidadPeso === "Kg" ? "Lb" : "Kg");
  };

  const toggleHeightUnit = () => {
    setUnidadAltura(unidadAltura === "Cm" ? "Ft" : "Cm");
  };

  const handleSubmmit = () => {
    if (!userData) return;

    const user = auth.currentUser;
    if (!user) return;

    const name = user.email?.split("@")[0].replace(".", "_");
    const db = getDatabase();
    const userRef = ref(db, `usuarios/${name}/${key}`);

    const isSafeToUpdate =
      typeof username === "string" &&
      typeof edad === "string" &&
      typeof peso === "string" &&
      typeof altura === "string" &&
      typeof genero === "string";

    if (!isSafeToUpdate) {
      console.error("Los datos contienen funciones o valores no válidos.");
      return;
    }

    const updates: UserData = {
      username: username || userData.username,
      email: userData.email,
      edad: Number(edad) || userData.edad,
      unidadAltura: unidadAltura || userData.unidadAltura,
      unidadPeso: unidadPeso || userData.unidadPeso,
      peso: Number(peso) || userData.peso,
      altura: Number(altura) || userData.altura,
      genero: genero || userData.genero,
      diasSeleccionados: userData.diasSeleccionados,
      experiencia: userData.experiencia,
      meta: userData.meta,
    };

    console.log("Actualizando información del usuario:", updates);

    update(userRef, updates)
      .then(() => {
        console.log("Información actualizada correctamente");
        router.back();
      })
      .catch((error) => {
        console.error("Error al actualizar información:", error);
      });
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.topBar, { backgroundColor: highlightColor }]}>
        <Text style={{ fontSize: 27, color: "#fff", marginTop: 25 }}>
          Editar información
        </Text>
      </View>
      <ScrollView
        style={[styles.userInfo, { backgroundColor: secondaryBackgroundColor }]}
      >
        <View style={styles.userData}>
          <Text style={styles.label}>Nombre de usuario</Text>
          <TextInput
            style={styles.userInput}
            placeholder={userData?.username || "Cargando..."}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.userData}>
          <Text style={styles.label}>Edad</Text>
          <TextInput
            style={styles.userInput}
            placeholder={userData?.edad.toString() || "Cargando..."}
            onChangeText={setEdad}
          />
        </View>
        <View style={styles.userData}>
          <Text style={styles.label}>Peso ({unidadPeso})</Text>
          <TextInput
            style={styles.userInput}
            placeholder={userData?.peso.toString() || "Cargando..."}
            onChangeText={setPeso}
          />
          <TouchableOpacity onPress={toggleWeightUnit}>
            <Text style={[styles.toggleText, { color: highlightColor }]}>
              Cambiar Unidad ({unidadPeso === "Kg" ? "Lb" : "Kg"})
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userData}>
          <Text style={styles.label}>Altura ({unidadAltura})</Text>
          <TextInput
            style={styles.userInput}
            placeholder={userData?.altura.toString() || "Cargando..."}
            onChangeText={setAltura}
          />
          <TouchableOpacity onPress={toggleHeightUnit}>
            <Text style={[styles.toggleText, { color: highlightColor }]}>
              Cambiar Unidad ({unidadAltura === "Cm" ? "Ft" : "Cm"})
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userData}>
          <Text style={styles.label}>Género</Text>
          <TextInput
            style={styles.userInput}
            placeholder={userData?.genero || "Cargando..."}
            onChangeText={setGenero}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            style={[styles.boton, { backgroundColor: highlightColor }]}
            onPress={handleSubmmit}
          >
            <View style={styles.botonContent}>
              <MaterialCommunityIcons name="account-edit" size={30} color="#fff" />
              <Text style={styles.botonText}>Editar información</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  topBar: {
    width: "100%",
    height: 90,
    elevation: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    width: "90%",
    maxHeight: "70%",
    marginTop: 20,
    borderRadius: 20,
  },
  boton: {
    width: "50%",
    height: 60,
    justifyContent: "center",
    borderRadius: 20,
  },
  botonContent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
  },
  botonText: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#fff",
  },
  userData: {
    width: "90%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  userInput: {
    width: "95%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginLeft: "10%",
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfile;
