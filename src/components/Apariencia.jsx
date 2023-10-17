import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ThemeContext } from "./ThemeContext";

const windowWidth = Dimensions.get("window").width;

const Apariencia = () => {
  const { selected, handleContextChange, themes } = useContext(ThemeContext);
  const { backgroundColor, titleColor, textColor, highlightColor } =
    themes[selected];
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={[styles.topBar, { backgroundColor: highlightColor }]}>
        <Text style={[styles.title, { color: titleColor }]}>Apariencia</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => {
            handleContextChange(0);
          }}
          style={[
            styles.cuadro,
            styles.modoClaro,
            selected === 0 && styles.selectedCuadro,
          ]}
        >
          <Text style={[styles.bottomText, styles.modoClaroText]}>
            Modo claro
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleContextChange(1)}
          style={[
            styles.cuadro,
            styles.modoOscuro,
            selected === 1 && styles.selectedCuadro,
          ]}
        >
          <Text style={[styles.bottomText, styles.modoOscuroText]}>
            Modo oscuro
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleContextChange(2)}
          style={[
            styles.cuadro,
            styles.temaNoche,
            selected === 2 && styles.selectedCuadro,
          ]}
        >
          <Text style={[styles.bottomText, styles.temaNocheText]}>
            Tema noche
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleContextChange(3)}
          style={[
            styles.cuadro,
            styles.temaFuego,
            selected === 3 && styles.selectedCuadro,
          ]}
        >
          <Text style={[styles.bottomText, styles.temaFuegoText]}>
            Tema fuego
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  topBar: {
    width: "100%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 30,
  },
  cuadro: {
    width: windowWidth / 2.5,
    height: windowWidth / 2.5,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  selectedCuadro: {
    borderColor: "#00d1ff",
    borderWidth: 3,
  },
  bottomText: {
    fontSize: 20,
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    fontWeight: "bold",
  },
  modoClaro: {
    backgroundColor: "#f5f5f5",
  },
  modoClaroText: {
    color: "#000",
  },
  modoOscuro: {
    backgroundColor: "#363636",
  },
  modoOscuroText: {
    color: "#fff",
  },
  temaNoche: {
    backgroundColor: "#252850",
  },
  temaNocheText: {
    color: "#FF5F6B",
  },
  temaFuego: {
    backgroundColor: "#FF6347",
  },
  temaFuegoText: {
    color: "#FFFFFF",
  },
});

export default Apariencia;
