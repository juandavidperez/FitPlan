import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext } from "./ThemeContext";

const Help = () => {
  const { selected, handleContextChange, themes } = useContext(ThemeContext);
  const { backgroundColor, titleColor, textColor, highlightColor } =
    themes[selected];
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={[styles.topBar, { backgroundColor: highlightColor }]}>
        <Text style={[styles.title, { color: textColor }]}>
          Ayuda y Soporte
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.text, { color: textColor }]}>
          ¿Necesitas ayuda o soporte? Estamos aquí para ayudarte en todo
          momento.
        </Text>
        <Text style={[styles.text, { color: textColor }]}>
          Puedes contactarnos a través de los siguientes medios:
        </Text>
        <Text style={[styles.contactInfo, { color: textColor }]}>
          Correo Electrónico: soporte@FitPlan.com
        </Text>
        <Text style={[styles.contactInfo, { color: textColor }]}>
          Teléfono de Soporte: +123-456-7890
        </Text>
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
    height: 100,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00d1ff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    width: "80%",
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  contactInfo: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Help;
