import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "../components/ThemeContext";

const firstLetterToUpperCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Excercise = ({ route }) => {
  const { themes, selected } = useContext(ThemeContext);
  const { highlightColor, titleColor, backgroundColor, textColor } =
    themes[selected];
  const { ejercicio } = route.params;
  return (
    <ScrollView style={[styles.container, { backgroundColor: highlightColor }]}>
      <View style={[styles.header, { backgroundColor: backgroundColor }]}>
        <Text style={[styles.title, { color: textColor }]}>
          {firstLetterToUpperCase(ejercicio.nombre)}
          <Ionicons name="flash" size={24} color="#FFD300" />
        </Text>
        <View style={styles.gifContainer}>
          {ejercicio.gif ? (
            <Image
              style={styles.gif}
              source={{
                uri: `${ejercicio.gif}`,
              }}
            />
          ) : (
            <Text style={styles.errorText}>Imagen no disponible</Text>
          )}
        </View>
        {ejercicio.nota && (
          <Text style={[styles.note, { color: titleColor }]}>
            {ejercicio.nota}
          </Text>
        )}
      </View>
      <View style={styles.details}>
        <View
          style={[styles.largeContainer, { backgroundColor: backgroundColor }]}
        >
          <Text style={[styles.subtitle, { color: textColor }]}>
            <Text> </Text>
            <MaterialCommunityIcons
              name="arm-flex"
              size={24}
              color={textColor}
            />
            Músculos trabajados:{" "}
            {ejercicio.musculos.map((musculo, index) => (
              <Text key={index}>
                {index > 0 ? ", " : ""}
                {musculo}
              </Text>
            ))}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={[
              styles.smallContainer,
              { backgroundColor: backgroundColor },
            ]}
          >
            <Text style={[styles.subtitle, { color: textColor }]}>
              Sets: {ejercicio.set}
            </Text>
          </View>
          <View
            style={[
              styles.smallContainer,
              { backgroundColor: backgroundColor },
            ]}
          >
            <Text style={[styles.subtitle, { color: textColor }]}>
              {ejercicio.repeticion === null
                ? `Duración: ${ejercicio.duracion} seg`
                : `Repeticiones: ${ejercicio.repeticion}`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
  },
  note: {
    fontSize: 16,
    marginTop: 10,
  },
  details: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  gifContainer: {
    alignItems: "center",
  },
  gif: {
    width: 300,
    height: 300,
    marginVertical: 20,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  largeContainer: {
    height: 100,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  smallContainer: {
    height: 50,
    width: "45%",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default Excercise;
