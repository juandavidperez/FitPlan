import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Svg, Circle, Line, Polygon, Text } from "react-native-svg";
import { auth } from "../utils/firebase";
import { child, getDatabase, ref, get } from "firebase/database";

function normalize(value, min, max, newMin, newMax) {
  return ((value - min) / (max - min)) * (newMax - newMin) + newMin;
}

const ageMin = 1;
const ageMax = 70;
const heightMin = 1;
const heightMax = 250;
const weightMin = 1;
const weightMax = 150;

const categories = ["Edad", "Altura", "Peso"]; // Categorías del gráfico

const center = 120; // Centro del gráfico
const radius = 80; // Radio del gráfico
const levels = 5; // Número de niveles en el gráfico
const angleSlice = (2 * Math.PI) / categories.length; // Ángulo entre categorías

const styles = StyleSheet.create({});

const RadarChart = () => {
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState([0, 0, 0]);
  let normalizedAge, normalizedHeight, normalizedWeight;
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const name = user.email.split("@")[0].replace(".", "_");
      const dbRef = ref(getDatabase());
      get(child(dbRef, "usuarios/" + name + "/"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            for (const key in data) {
              if (Object.hasOwnProperty.call(data, key)) {
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
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      normalizedAge = normalize(userData.edad, ageMin, ageMax, 1, levels);
      normalizedHeight = normalize(
        userData.altura[0],
        heightMin,
        heightMax,
        1,
        levels
      );
      normalizedWeight = normalize(
        userData.peso[0],
        weightMin,
        weightMax,
        1,
        levels
      );
      setData([normalizedAge, normalizedHeight, normalizedWeight]);
    }
  }, [userData]);

  return (
    <View style={styles.container}>
      <Svg height="280" width="250" style={styles.svg}>
        {/* Dibuja los niveles del radar */}
        {Array.from({ length: levels }).map((_, index) => {
          const levelRadius = (radius / levels) * (index + 1);
          return (
            <Circle
              key={`level-${index}`}
              cx={center}
              cy={center}
              r={levelRadius}
              fill="none"
              stroke="#ccc"
              strokeDasharray="5,5"
            />
          );
        })}

        {/* Dibuja las líneas radiales */}
        {categories.map((_, index) => {
          const angle = index * angleSlice - Math.PI / 2;
          return (
            <Line
              key={`line-${index}`}
              x1={center}
              y1={center}
              x2={center + radius * Math.cos(angle)}
              y2={center + radius * Math.sin(angle)}
              stroke="#ccc"
            />
          );
        })}

        {/* Dibuja el área del radar */}
        <Polygon
          points={categories
            .map((_, i) => {
              const angle = i * angleSlice - Math.PI / 2;
              const x = center + radius * data[i] * Math.cos(angle);
              const y = center + radius * data[i] * Math.sin(angle);
              return `${x},${y}`;
            })
            .join(" ")}
          fill="none"
        />

        {/* Dibuja etiquetas de las categorías */}
        {categories.map((_, index) => {
          const angle = index * angleSlice - Math.PI / 2;
          const x = center + (radius + 10) * Math.cos(angle);
          const y = center + (radius + 10) * Math.sin(angle);
          return (
            <Text
              key={`label-${index}`}
              x={x}
              y={y}
              dy="0.35em"
              fontSize="14"
              textAnchor="middle"
            >
              {categories[index]}
            </Text>
          );
        })}

        {/* Dibuja el punto central */}
        <Circle cx={center} cy={center} r={5} fill="#66B3BA" />

        {/* Crea un pentágono relleno de color rojo pastel */}
        <Polygon
          points={categories
            .map((_, i) => {
              const angle = i * angleSlice - Math.PI / 2;
              const value = data[i];
              const x = center + ((radius * value) / 5) * Math.cos(angle);
              const y = center + ((radius * value) / 5) * Math.sin(angle);
              return `${x},${y}`;
            })
            .join(" ")}
          fill="rgba(255, 99, 71, 0.5)" // Mantiene el color rojo pastel con transparencia
        />
      </Svg>
    </View>
  );
};

export default RadarChart;
