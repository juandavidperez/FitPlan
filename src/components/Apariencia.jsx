import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

const Apariencia = () => {
  const [modoOscuro, setModoOscuro] = useState(false);

  const cambiarModoApariencia = () => {
    setModoOscuro(!modoOscuro);
  };

  return (
    <View
      style={
        modoOscuro ? styles.containerModoOscuro : styles.containerModoClaro
      }
    >
      <Text style={modoOscuro ? styles.textModoOscuro : styles.textModoClaro}>
        Modo de Apariencia
      </Text>
      <Switch
        value={modoOscuro}
        onValueChange={cambiarModoApariencia}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={modoOscuro ? "#f5dd4b" : "#f4f3f4"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerModoClaro: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerModoOscuro: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  textModoClaro: {
    fontSize: 24,
    color: "#000",
  },
  textModoOscuro: {
    fontSize: 24,
    color: "#fff",
  },
});

export default Apariencia;
