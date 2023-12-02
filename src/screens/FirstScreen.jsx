import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../components/ThemeContext";

const Main = ({ navigation }) => {
  const { themes, selected } = useContext(ThemeContext);
  const { highlightColor, titleColor } = themes[selected];

  const windowHeight = Dimensions.get("window").height;
  return (
    <View style={[styles.container, { backgroundColor: highlightColor }]}>
      <Text style={[styles.title, { color: titleColor }]}>
        FitPlan
        <Ionicons name="flash" size={24} color="#FFD300" />
      </Text>
      <Text style={[styles.subtitle, { color: titleColor }]}>
        ¡Tu entrenador personal!
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("LoginG")}>
        <Image
          source={require("../../assets/images/fitplan.png")}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
  },
  subtitle: {
    fontSize: 21,
  },
  image: {
    width: 130,
    height: 130,
  },
});

export default Main;
