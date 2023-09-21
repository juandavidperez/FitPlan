import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../../firebase";
import { child, getDatabase, ref, get } from "firebase/database";

const EditProfile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

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
  const inicial = userData === null ? "c" : userData.username[0].toLowerCase();

  const handleSubmmit = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={{ fontSize: 27, color: "#fff", marginTop: 25 }}>
          {" "}
          Editar informacion
        </Text>
      </View>
      <View style={styles.userInfo}>
        <View style={styles.userData}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Nombre de usuario
          </Text>
          <TextInput
            style={styles.userInput}
            value={userData === null ? "Cargando..." : userData.username}
          />
        </View>
        <View style={styles.userData}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Edad
          </Text>
          <TextInput
            style={styles.userInput}
            value={userData === null ? "Cargando..." : userData.edad}
          />
        </View>
        <View style={styles.userData}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Peso
          </Text>
          <TextInput
            style={styles.userInput}
            value={userData === null ? "Cargando..." : userData.peso[0]}
          />
        </View>
        <View style={styles.userData}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Altura
          </Text>
          <TextInput
            style={styles.userInput}
            value={userData === null ? "Cargando..." : userData.altura[0]}
          />
        </View>
        <View style={styles.userData}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Genero
          </Text>
          <TextInput
            style={styles.userInput}
            value={userData === null ? "Cargando..." : userData.genero}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.boton}>
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
    justifyContent: "center",
    alignItems: "center",
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
