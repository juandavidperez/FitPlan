import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../../firebase";
import { child, getDatabase, ref, get } from "firebase/database";

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
        <Text style={{ fontSize: 27, color: "#fff", marginTop: 15 }}>
          {" "}
          My Profile
        </Text>
      </View>
      <View style={styles.userDesc}>
        <MaterialCommunityIcons
          name={"alpha-" + inicial + "-circle"}
          size={80}
          color="#000"
          style={{ marginTop: 15 }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 23,
            textAlign: "center",
          }}
        >
          {userData === null ? "Cargando..." : userData.username}
        </Text>
      </View>
      <View style={styles.userStats}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Datos personales
        </Text>
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
            <TouchableOpacity onPress={() => console.log(userData, inicial)}>
              <MaterialCommunityIcons
                name={"pencil"}
                size={20}
                color="#000"
                style={{ position: "absolute", right: 15, bottom: 50 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <MaterialCommunityIcons
                name={"trash-can"}
                size={20}
                color="#000"
                style={{ position: "absolute", right: 15, bottom: 0 }}
              />
            </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <MaterialCommunityIcons
                name={"pencil"}
                size={20}
                color="#000"
                style={{ position: "absolute", right: 15, bottom: 50 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <MaterialCommunityIcons
                name={"trash-can"}
                size={20}
                color="#000"
                style={{ position: "absolute", right: 15, bottom: 0 }}
              />
            </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <MaterialCommunityIcons
                name={"pencil"}
                size={20}
                color="#000"
                style={{ position: "absolute", right: 15, bottom: 50 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <MaterialCommunityIcons
                name={"trash-can"}
                size={20}
                color="#000"
                style={{ position: "absolute", right: 15, bottom: 0 }}
              />
            </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <MaterialCommunityIcons
                name={"pencil"}
                size={20}
                color="#000"
                style={{ position: "absolute", right: 15, bottom: 50 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
            >
              <MaterialCommunityIcons
                name={"trash-can"}
                size={20}
                color="#000"
                style={{ position: "absolute", right: 15, bottom: 0 }}
              />
            </TouchableOpacity>
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
    height: "13%",
    backgroundColor: "#00d1ff",
    justifyContent: "center",
    alignItems: "center",
  },
  userDesc: {
    width: "100%",
    height: "25%",
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
    borderRadius: 30,
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
