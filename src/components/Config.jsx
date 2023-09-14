import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome5,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

const Config = () => {
  return (
    <View>
      <View style={styles.topBar}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Configuración
        </Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput placeholder="Buscar" style={styles.search} />
        <TouchableOpacity style={{ position: "absolute", right: 30, top: 24 }}>
          <Feather name="search" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.configContainer}>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            height: 60,
            marginVertical: 10,
            justifyContent: "space-between",
            borderColor: "gray",
            borderBottomWidth: 2,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5 name="user-alt" size={24} color="black" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#000",
                marginLeft: 5,
              }}
            >
              Cuenta
            </Text>
          </View>
          <TouchableOpacity>
            <FontAwesome5 name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            height: 60,
            marginVertical: 10,
            justifyContent: "space-between",
            borderColor: "gray",
            borderBottomWidth: 2,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="color-palette" size={24} color="black" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#000",
                marginLeft: 5,
              }}
            >
              Apariencia
            </Text>
          </View>
          <TouchableOpacity>
            <FontAwesome5 name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            height: 60,
            marginVertical: 10,
            justifyContent: "space-between",
            borderColor: "gray",
            borderBottomWidth: 2,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="support-agent" size={25} color="black" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#000",
                marginLeft: 5,
              }}
            >
              Ayuda y soporte
            </Text>
          </View>
          <TouchableOpacity>
            <FontAwesome5 name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            height: 60,
            marginVertical: 10,
            justifyContent: "space-between",
            borderColor: "gray",
            borderBottomWidth: 2,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Feather name="help-circle" size={25} color="black" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#000",
                marginLeft: 5,
              }}
            >
              Acerca de{" "}
            </Text>
          </View>
          <TouchableOpacity>
            <FontAwesome5 name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    height: 100,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00d1ff",
    marginBottom: 15,
  },
  searchBar: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 20,
    elevation: 5,
    fontSize: 18,
  },
  configContainer: {
    width: "100%",
    height: "100%",
    paddingTop: 20,
    alignItems: "center",
  },
});

export default Config;
