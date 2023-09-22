import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../../firebase";
import { child, getDatabase, ref, get, update } from "firebase/database";

const EditProfile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState(
    userData === null ? "" : userData.username
  );
  const [edad, setEdad] = useState(userData === null ? "" : userData.edad);
  const [peso, setPeso] = useState(userData === null ? "" : userData.peso[0]);
  const [altura, setAltura] = useState(
    userData === null ? "" : userData.altura[0]
  );
  const [genero, setGenero] = useState(
    userData === null ? "" : userData.genero
  );
  const [unidadPeso, setUnidadPeso] = useState("Kg");
  const [unidadAltura, setUnidadAltura] = useState("Cm");
  // Function to toggle weight units
  const toggleWeightUnit = () => {
    setUnidadPeso(unidadPeso === "Kg" ? "Lb" : "Kg");
  };

  // Function to toggle height units
  const toggleHeightUnit = () => {
    setUnidadAltura(unidadAltura === "Cm" ? "Ft" : "Cm");
  };

  const user = auth.currentUser;
  const name = user.email.split("@")[0].replace(".", "_");
  const dbRef = ref(getDatabase());
  get(child(dbRef, "usuarios/" + name + "/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            setUserData(element);
          }
        }
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const handleSubmmit = () => {
    if (userData) {
      const dbRef = ref(getDatabase());
      const name = user.email.split("@")[0].replace(".", "_");
      const updates = {};
      updates["/usuarios/" + name + "/"] = {
        username: username,
        edad: edad,
        peso: [peso, unidadPeso],
        altura: [altura, unidadAltura],
        genero: genero,
        diasSeleccionados: userData.diasSeleccionados,
        email: userData.email,
        dificultad: userData.dificultad,
        experiencia: userData.experiencia,
        meta: userData.meta,
      };
      update(ref(getDatabase()), updates);
      console.log("Informacion actualizada");
      navigation.navigate("BottomTab");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={{ fontSize: 27, color: "#fff", marginTop: 25 }}>
          {" "}
          Editar informacion
        </Text>
      </View>
      <ScrollView style={styles.userInfo}>
        <View style={styles.userData}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Nombre de usuario
          </Text>
          <TextInput
            style={styles.userInput}
            placeholder={userData === null ? "Cargando..." : userData.username}
            onChange={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.userData}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Edad
          </Text>
          <TextInput
            style={styles.userInput}
            placeholder={userData === null ? "Cargando..." : userData.edad}
            onChange={(text) => setEdad(text)}
          />
        </View>
        <View style={styles.userData}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Peso ({unidadPeso})
          </Text>
          <TextInput
            style={styles.userInput}
            placeholder={userData === null ? "Cargando..." : userData.peso[0]}
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
            placeholder={userData === null ? "Cargando..." : userData.altura[0]}
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
            Genero
          </Text>
          <TextInput
            style={styles.userInput}
            placeholder={userData === null ? "Cargando..." : userData.genero}
            onChangeText={(text) => setGenero(text)}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.boton}
        onPress={() => {
          //handleSubmmit();
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
          <MaterialCommunityIcons name="account-edit" size={30} color="#fff" />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginLeft: 10,
              color: "#fff",
            }}
          >
            Editar informacion
          </Text>
        </View>
      </TouchableOpacity>
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
    marginVertical: 30,
    width: "90%",
    height: 550,
    backgroundColor: "#fff",
    elevation: 7,
    borderRadius: 20,
  },
  boton: {
    width: "45%",
    height: 60,
    backgroundColor: "#00d1ff",
    elevation: 7,
    justifyContent: "center",
    alignItems: "center",
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
  },
});

export default EditProfile;
