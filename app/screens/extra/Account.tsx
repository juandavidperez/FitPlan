import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { auth } from "../../../config/firebaseConfig";
import { child, getDatabase, ref, get, remove } from "firebase/database";
import { AntDesign } from "@expo/vector-icons";
import { ThemeContext } from "../../../components/ThemeContext";

type RootStackParamList = {
  Account: undefined;
  LoginG: undefined;
};

type AccountScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Account">;
  route: RouteProp<RootStackParamList, "Account">;
};

type UserData = {
  username: string;
  email: string;
};

const Account: React.FC<AccountScreenProps> = ({ navigation }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [name, setName] = useState<string>("");
  const user = auth.currentUser;
  const dbRef = ref(getDatabase());

  const { selected, handleContextChange, themes } = useContext(ThemeContext);
  const { backgroundColor, titleColor, textColor, highlightColor } =
    themes[selected];

  useEffect(() => {
    if (user !== null) {
      const username = user.email?.split("@")[0].replace(".", "_") ?? "";
      setName(username);
    }
  }, [user]);

  useEffect(() => {
    if (!name) return;

    get(child(dbRef, "usuarios/" + name + "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
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
  }, [name]);

  const logOut = async () => {
    try {
      await auth.signOut();
      navigation.navigate("LoginG");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccount = () => {
    if (!dbRef || !name) return console.log("No existe el usuario");

    remove(child(dbRef, "usuarios/" + name + "/"))
      .then(() => {
        console.log("Remove succeeded.");
        auth.currentUser
          ?.delete()
          .then(() => {
            console.log("User deleted");
            navigation.navigate("LoginG");
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
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.topBar, { backgroundColor: highlightColor }]}>
        <Text style={[styles.title, { color: textColor }]}>Cuenta</Text>
      </View>

      <View style={styles.accountInfo}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 15,
            marginLeft: 15,
            color: textColor,
          }}
        >
          Información de Cuenta
        </Text>

        <View style={[styles.stat, { backgroundColor }]}>
          <Text style={{ color: textColor }}>Nombre de usuario:</Text>
          <Text style={{ color: textColor }}>
            {userData ? userData.username : "Cargando..."}
          </Text>
        </View>

        <View style={[styles.stat, { backgroundColor }]}>
          <Text style={{ color: textColor }}>Email:</Text>
          <Text style={{ color: textColor }}>
            {userData ? userData.email : "Cargando..."}
          </Text>
        </View>
      </View>

      <View style={styles.accountManagement}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 15,
            marginLeft: 15,
            color: textColor,
          }}
        >
          Gestión de Cuenta
        </Text>

        <TouchableOpacity style={styles.stat} onPress={logOut}>
          <Text style={{ color: textColor }}>
            Cerrar Sesión <AntDesign name="logout" size={24} color={textColor} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.stat} onPress={deleteAccount}>
          <Text style={{ color: "red", fontWeight: "bold" }}>
            Eliminar Cuenta <AntDesign name="delete" size={24} color={textColor} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    width: "100%",
    height: 100,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  accountManagement: {
    width: "100%",
    height: "100%",
    paddingTop: 20,
  },
});

export default Account;
