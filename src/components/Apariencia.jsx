import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;

const App = () => {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Apariencia</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => setSelected(0)}
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
          onPress={() => setSelected(1)}
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
          onPress={() => setSelected(2)}
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
          onPress={() => setSelected(3)}
          style={[
            styles.cuadro,
            styles.temaEnergia,
            selected === 3 && styles.selectedCuadro,
          ]}
        >
          <Text style={[styles.bottomText, styles.temaEnergiaText]}>
            Tema energia
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
    backgroundColor: "#00d1ff",
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
  temaEnergia: {
    backgroundColor: "#FF6347",
  },
  temaEnergiaText: {
    color: "#FFFFFF",
  },
});

export default App;
