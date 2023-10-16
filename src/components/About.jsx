import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const About = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Acerca de Nosotros</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.text}>
          Bienvenidos a nuestra aplicación de ejercicio, donde nuestro
          compromiso es ayudarte a alcanzar tus metas de salud y bienestar.
        </Text>
        <Text style={styles.listItem}>
          - En FitPlan, nos enorgullece ofrecer una amplia variedad de rutinas
          de entrenamiento, diseñadas para adaptarse a tu nivel de condición
          física y objetivos.
        </Text>
        <Text style={styles.listItem}>
          - Nuestro equipo de expertos en fitness está dedicado a proporcionarte
          la mejor guía y apoyo en tu viaje hacia un estilo de vida activo y
          saludable.
        </Text>
        <Text style={[styles.text, { marginTop: 15 }]}>
          En FitPlan, creemos que la salud es riqueza, y estamos comprometidos a
          brindarte las herramientas necesarias para mantener un cuerpo fuerte y
          una mente sana.
        </Text>
        <Text style={styles.listItem}>
          - Además de nuestras rutinas de entrenamiento, encontrarás consejos de
          nutrición, seguimiento de progreso y una comunidad activa de
          entusiastas del fitness.
        </Text>
        <Text style={styles.listItem}>
          - Tu bienestar es nuestra prioridad, y estamos emocionados de ser
          parte de tu viaje hacia una vida más activa y saludable. Gracias por
          confiar en nosotros para ayudarte a alcanzar tus objetivos de
          ejercicio. ¡Juntos, lograremos grandes cosas!
        </Text>
      </ScrollView>
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
    fontSize: 15,
    marginBottom: 15,
    textAlign: "justify",
  },
  listItem: {
    marginLeft: 20,
    marginBottom: 5,
  },
  slogan: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default About;
