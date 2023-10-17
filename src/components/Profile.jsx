import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../../firebase";
import { child, getDatabase, ref, get } from "firebase/database";
import RadarChart from "./RadarChart";
import { ThemeContext } from "./ThemeContext";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const { selected, handleContextChange, themes } = useContext(ThemeContext);
  const { backgroundColor, titleColor, textColor, highlightColor } =
    themes[selected];

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
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={[styles.topBar, { backgroundColor: highlightColor }]}>
        <Text style={{ fontSize: 25, color: textColor, marginTop: 15 }}>
          {" "}
          Perfil
        </Text>
      </View>
      <View style={[styles.userDesc, { backgroundColor: backgroundColor }]}>
        <MaterialCommunityIcons
          name={"alpha-" + inicial + "-circle"}
          size={95}
          color={textColor}
          style={{ marginTop: 15 }}
        />
        <Text
          style={{
            color: textColor,
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 23,
            textAlign: "center",
          }}
        >
          {userData === null ? "Cargando..." : userData.username}
        </Text>
      </View>
      <View style={[styles.userStats, { backgroundColor: highlightColor }]}>
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
              color: textColor,
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
              color={textColor}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 5,
          }}
        >
          <View style={[styles.stat, { backgroundColor: backgroundColor }]}>
            <Text
              style={{
                color: textColor,
                fontSize: 15,
                fontWeight: "bold",
                marginBottom: 5,
                textAlign: "center",
              }}
            >
              Edad
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginBottom: 5,
                textAlign: "center",
                color: textColor,
              }}
            >
              {userData == null ? "Cargando..." : `${userData.edad} años`}
            </Text>
          </View>
          <View style={[styles.stat, { backgroundColor: backgroundColor }]}>
            <Text
              style={{
                color: textColor,
                fontSize: 15,
                fontWeight: "bold",
                marginBottom: 5,
                textAlign: "center",
              }}
            >
              Altura
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginBottom: 15,
                textAlign: "center",
                color: textColor,
              }}
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
            marginBottom: 5,
          }}
        >
          <View style={[styles.stat, { backgroundColor: backgroundColor }]}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginBottom: 5,
                textAlign: "center",
                color: textColor,
              }}
            >
              Peso
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginBottom: 5,
                textAlign: "center",
                color: textColor,
              }}
            >
              {userData == null
                ? "Cargando..."
                : userData.peso[0] + " " + userData.peso[1]}
            </Text>
          </View>
          <View style={[styles.stat, { backgroundColor: backgroundColor }]}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginBottom: 5,
                textAlign: "center",
                color: textColor,
              }}
            >
              Genero
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginBottom: 5,
                textAlign: "center",
                color: textColor,
              }}
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
              borderColor: highlightColor,
            },
          ]}
        >
          <View style={{ width: "50%", height: "100%", alignItems: "center" }}>
            <Text
              style={{ fontSize: 15, fontWeight: "bold", marginVertical: 10 }}
            >
              Estadisticas
            </Text>
            <View
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RadarChart />
            </View>
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
    width: 150,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    marginHorizontal: 10,
    elevation: 5,
    justifyContent: "center",
  },
  graphic: {
    width: "90%",
    height: 230,
    backgroundColor: "#fff",
    borderRadius: 30,
    marginBottom: 20,
    marginHorizontal: 10,
    elevation: 5,
    justifyContent: "center",
    borderWidth: 2,
  },
});

export default Profile;
