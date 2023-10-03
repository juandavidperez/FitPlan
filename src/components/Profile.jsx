import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../../firebase";
import { child, getDatabase, ref, get } from "firebase/database";

const data = {
  dataSets: [
    {
      values: [5, 4, 3, 2, 1], // Valores para cada categoría
      label: "Dataset 1", // Etiqueta del conjunto de datos
      config: {
        color: "blue", // Color del gráfico
        drawFilled: true, // Rellenar el área bajo el gráfico
        fillColor: "blue", // Color del relleno
        fillAlpha: 60, // Opacidad del relleno
        lineWidth: 2, // Grosor de la línea
      },
    },
  ],
  labels: [
    "Categoría 1",
    "Categoría 2",
    "Categoría 3",
    "Categoría 4",
    "Categoría 5",
  ], // Etiquetas para las categorías
};

const Profile = ({ navigation }) => {
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
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={{ fontSize: 25, color: "#fff", marginTop: 15 }}>
          {" "}
          My Profile
        </Text>
      </View>
      <View style={styles.userDesc}>
        <MaterialCommunityIcons
          name={"alpha-" + inicial + "-circle"}
          size={95}
          color="#000"
          style={{ marginTop: 15 }}
        />
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 23,
            textAlign: "center",
          }}
        >
          {userData === null ? "Cargando..." : userData.username}
        </Text>
      </View>
      <View style={styles.userStats}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
              textAlign: "center",
              marginLeft: 10,
            }}
          >
            Datos personales
          </Text>
          <TouchableOpacity
            style={{ position: "absolute", right: 10 }}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <MaterialCommunityIcons
              name="account-edit"
              size={30}
              color="#000"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 10,
          }}
        >
          <View style={styles.stat}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Edad
            </Text>
            <Text
              style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}
            >
              {userData == null ? "Cargando..." : userData.edad}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Altura
            </Text>
            <Text
              style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}
            >
              {userData == null
                ? "Cargando..."
                : userData.altura[0] + " " + userData.altura[1]}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 10,
          }}
        >
          <View style={styles.stat}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Peso
            </Text>
            <Text
              style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}
            >
              {userData == null
                ? "Cargando..."
                : userData.peso[0] + " " + userData.peso[1]}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Genero
            </Text>
            <Text
              style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}
            >
              {userData == null ? "Cargando..." : userData.genero}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.graphic,
            {
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 15,
            },
          ]}
        >
          <View style={{ width: "50%", height: "100%", alignItems: "center" }}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}
            >
              Meta
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  topBar: {
    width: "100%",
    height: "10%",
    backgroundColor: "#00d1ff",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },
  userDesc: {
    width: "100%",
    height: "28%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  userStats: {
    width: "100%",
    height: "62%",
    backgroundColor: "#00d1ff",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    elevation: 5,
  },
  stat: {
    width: "40%",
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    marginHorizontal: 10,
    elevation: 5,
    justifyContent: "center",
  },
  graphic: {
    width: "90%",
    height: 170,
    backgroundColor: "#fff",
    borderRadius: 30,
    marginBottom: 20,
    marginHorizontal: 10,
    elevation: 5,
    justifyContent: "center",
    borderColor: "#00d1ff",
    borderWidth: 2,
  },
});

export default Profile;
