import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Svg, Circle, Line, Polygon, Text } from "react-native-svg";

const personData = [20, 180, 70]; // Ajusta estos valores según tus datos
function normalize(value, min, max, newMin, newMax) {
  return ((value - min) / (max - min)) * (newMax - newMin) + newMin;
}

const ageMin = 1;
const ageMax = 70;
const heightMin = 1;
const heightMax = 250;
const weightMin = 1;
const weightMax = 150;

const normalizedAge = normalize(personData[0], ageMin, ageMax, 1, 5);
const normalizedHeight = normalize(personData[1], heightMin, heightMax, 1, 5);
const normalizedWeight = normalize(personData[2], weightMin, weightMax, 1, 5);

const categories = ["Edad", "Altura", "Peso"];
const data = [normalizedAge, normalizedHeight, normalizedWeight]; // Ajusta estos valores según tus datos

const center = 120; // Centro del gráfico
const radius = 80; // Radio del gráfico
const levels = 5; // Número de niveles en el gráfico
const angleSlice = (2 * Math.PI) / categories.length; // Ángulo entre categorías

const styles = StyleSheet.create({});

const RadarChart = () => {
  useEffect(() => {
    // Limpia el componente si es necesario
    return () => {
      // Limpia el componente si es necesario
    };
  }, []);

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
