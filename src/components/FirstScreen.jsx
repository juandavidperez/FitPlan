import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Main = ({ navigation }) => {
  const windowHeight = Dimensions.get("window").height;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        FitPlan
        <Ionicons name="flash" size={24} color="#FFD300" />
      </Text>
      <Text style={styles.subtitle}>¡Tu entrenador personal!</Text>
      <TouchableOpacity onPress={() => navigation.navigate("LoginG")}>
        <Image
          source={require("../../assets/fitplan.png")}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00d1ff",
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
  },
  title: {
    fontSize: 30,
    color: "#000",
  },
  subtitle: {
    fontSize: 21,
    color: "#000",
  },
  image: {
    width: 130,
    height: 130,
  },
});

export default Main;
