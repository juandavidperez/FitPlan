import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../../firebase";
import { child, getDatabase, ref, get, remove } from "firebase/database";
import { AntDesign } from "@expo/vector-icons";

const Account = ({ navigation }) => {
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

  const logOut = () => {
    auth.signOut();
    navigation.navigate("Login");
  };

  const deleteAccount = () => {
    remove(ref(dbRef, "usuarios/" + name + "/"))
      .then(() => {
        console.log("Remove succeeded.");
        auth.currentUser
          .delete()
          .then(() => {
            console.log("User deleted");
            navigation.navigate("Login");
          })
          .catch((error) => {
            console.log("Error deleting user", error);
          });
      })
      .catch((error) => {
        console.log("Remove failed: " + error.message);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Cuenta</Text>
      </View>
      <View style={styles.accountInfo}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 15,
            marginLeft: 15,
          }}
        >
          Informacion de Cuenta
        </Text>
        <View style={styles.stat}>
          <Text>Nombre de usuario:</Text>
          <Text>{userData === null ? "Cargando..." : userData.username}</Text>
        </View>
        <View style={styles.stat}>
          <Text>Email:</Text>
          <Text>{userData === null ? "Cargando ..." : userData.email}</Text>
        </View>
      </View>
      <View style={styles.accountManagement}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 15,
            marginLeft: 15,
          }}
        >
          Gestion de Cuenta
        </Text>
        <TouchableOpacity
          style={styles.stat}
          onPress={() => {
            logOut();
          }}
        >
          <Text>
            Cerrar Sesion <AntDesign name="logout" size={24} color="black" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.stat}
          onPress={() => {
            deleteAccount();
          }}
        >
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Eliminar Cuenta <AntDesign name="delete" size={24} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    width: "100%",
    height: 100,
    backgroundColor: "#00d1ff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
  },
  accountInfo: {
    width: "100%",
    paddingTop: 20,
  },
  stat: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 5,
    borderBottomWidth: 1,
  },
  accountManagement: {
    width: "100%",
    height: "100%",
    paddingTop: 20,
  },
});

export default Account;
