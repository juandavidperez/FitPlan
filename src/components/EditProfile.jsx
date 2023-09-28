import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../../firebase";
import { getDatabase, ref, get, update, set } from "firebase/database";

const EditProfile = ({ navigation }) => {
  const [key, setKey] = useState(""); // [1]
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [unidadPeso, setUnidadPeso] = useState("Kg");
  const [altura, setAltura] = useState("");
  const [unidadAltura, setUnidadAltura] = useState("Cm");
  const [genero, setGenero] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const name = user.email.split("@")[0].replace(".", "_");
        const db = getDatabase();
        const userRef = ref(db, `usuarios/${name}`);
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            for (const key in data) {
              if (Object.hasOwnProperty.call(data, key)) {
                const element = data[key];
                setKey(key);
                setUserData(element);
              }
            }
          } else {
            console.log("No data available");
          }
        } catch (error) {
          console.error(error);
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
    if (userData) {
      const user = auth.currentUser;
      if (user) {
        const name = user.email.split("@")[0].replace(".", "_");
        const db = getDatabase();
        const userRef = ref(db, `usuarios/${name}/${key}`);

        const isSafeToUpdate =
          typeof username === "string" &&
          typeof edad === "string" &&
          typeof peso === "string" &&
          typeof altura === "string" &&
          typeof genero === "string";

        if (isSafeToUpdate) {
          const updates = {
            username: username || userData.username,
            edad: edad || userData.edad,
            peso: [peso, unidadPeso] || [userData.peso[0], userData.peso[1]],
            altura: [altura, unidadAltura] || [
              userData.altura[0],
              userData.altura[1],
            ],
            genero: genero || userData.genero,
            diasSeleccionados: userData.diasSeleccionados,
            email: userData.email,
            dificultad: userData.dificultad,
            experiencia: userData.experiencia,
            meta: userData.meta,
          };

          update(userRef, updates)
            .then(() => {
              console.log("Información actualizada correctamente");
              navigation.navigate("BottomTab");
            })
            .catch((error) => {
              console.error("Error al actualizar información:", error);
            });
        } else {
          console.error("Los datos contienen funciones o valores no válidos.");
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={{ fontSize: 27, color: "#fff", marginTop: 25 }}>
          Editar información
        </Text>
      </View>
      <ScrollView style={styles.userInfo}>
        <View style={styles.userData}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Nombre de usuario
          </Text>
          <TextInput
            style={styles.userInput}
            placeholder={userData.username || "Cargando..."}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.userData}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Edad
          </Text>
          <TextInput
            style={styles.userInput}
            placeholder={userData.edad || "Cargando..."}
            onChangeText={(text) => setEdad(text)}
          />
        </View>
        <View style={styles.userData}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Peso ({unidadPeso})
          </Text>
          <TextInput
            style={styles.userInput}
            placeholder={userData.peso ? userData.peso[0] : "Cargando..."}
            onChangeText={(text) => setPeso(text)}
          />
          <TouchableOpacity onPress={toggleWeightUnit}>
            <Text style={{ fontSize: 16, color: "#00d1ff" }}>
              Cambiar Unidad ({unidadPeso === "Kg" ? "Lb" : "Kg"})
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userData}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Altura ({unidadAltura})
          </Text>
          <TextInput
            style={styles.userInput}
            placeholder={userData.altura ? userData.altura[0] : "Cargando..."}
            onChangeText={(text) => setAltura(text)}
          />
          <TouchableOpacity onPress={toggleHeightUnit}>
            <Text style={{ fontSize: 16, color: "#00d1ff" }}>
              Cambiar Unidad ({unidadAltura === "Cm" ? "Ft" : "Cm"})
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userData}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Género
          </Text>
          <TextInput
            style={styles.userInput}
            placeholder={userData.genero || "Cargando..."}
            onChangeText={(text) => setGenero(text)}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => {
              handleSubmmit();
            }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginBottom: 10,
                marginTop: 10,
              }}
            >
              <MaterialCommunityIcons
                name="account-edit"
                size={30}
                color="#fff"
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginLeft: 10,
                  color: "#fff",
                }}
              >
                Editar información
              </Text>
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
    backgroundColor: "#00d1ff",
    elevation: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    backgroundColor: "#fff",
    width: "90%",
    maxHeight: "70%",
    marginTop: 20,
    borderRadius: 20,
  },
  boton: {
    width: "50%",
    height: 60,
    backgroundColor: "#00d1ff",
    justifyContent: "center",
    borderRadius: 20,
  },
  userData: {
    width: "90%",
    height: 100,
    backgroundColor: "#fff",
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
  },
});

export default EditProfile;
