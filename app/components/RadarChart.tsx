// components/RadarChart.tsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Svg, Circle, Line, Polygon, Text as SvgText } from "react-native-svg";
import { auth } from "../../config/firebaseConfig";
import { child, getDatabase, ref, get } from "firebase/database";

interface UserData {
  edad: number;
  altura: number;
  peso: number;
  unidadAltura: string;
  unidadPeso: string;
}

// Normaliza valor numérico AL RADIO (0–radius)
const normalizeToRadius = (
  value: number,
  min: number,
  max: number,
  radius: number
): number => {
  const clamped = Math.max(min, Math.min(value, max));
  return ((clamped - min) / (max - min)) * radius;
};

// Límites de cada métrica
const ageMin = 1,
  ageMax = 70;
const heightMin = 1,
  heightMax = 250;
const weightMin = 1,
  weightMax = 150;

// Configuración del radar
const categories = ["Edad", "Altura", "Peso"] as const;
const center = 100;
const radius = 70;
const levels = 5;
const angleSlice = (2 * Math.PI) / categories.length;

const styles = StyleSheet.create<{ container: ViewStyle }>({
  container: { alignItems: "center", justifyContent: "center" },
});

const RadarChart: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  // datos en pixeles [pxAge, pxHeight, pxWeight]
  const [pointsData, setPointsData] = useState<number[]>([0, 0, 0]);

  // Fetch user
  useEffect(() => {
    (async () => {
      const user = auth.currentUser; if (!user) return;
      const key = user.email!.split("@")[0].replaceAll(".", "_");
      const db = getDatabase();
      const snap = await get(ref(db, `usuarios/${key}`));
      if (snap.exists()) {
        const raw = snap.val() as any;
        setUserData({
          edad: Number(raw.edad),
          altura: Number(raw.altura),
          peso: Number(raw.peso),
          unidadAltura: raw.unidadAltura,
          unidadPeso: raw.unidadPeso,
        });
      }
    })();
  }, []);

  // Normaliza al cambiar userData
  useEffect(() => {
    if (!userData) return;
    const pxAge = normalizeToRadius(userData.edad, ageMin, ageMax, radius);
    const pxHeight = normalizeToRadius(
      userData.altura,
      heightMin,
      heightMax,
      radius
    );
    const pxWeight = normalizeToRadius(
      userData.peso,
      weightMin,
      weightMax,
      radius
    );
    setPointsData([pxAge, pxHeight, pxWeight]);
  }, [userData]);

  return (
    <View style={styles.container}>
      <Svg width={center * 2} height={center * 2}>
        {/* Niveles concéntricos con etiqueta de valor */}
        {Array.from({ length: levels }).map((_, i) => {
          const r = ((i + 1) / levels) * radius;
          // Etiqueta numérica midpoint
          const valueLabel = (
            (i + 1) *
            ((ageMax - ageMin) / levels) +
            ageMin
          ).toFixed(0);
          return (
            <React.Fragment key={i}>
              <Circle
                cx={center}
                cy={center}
                r={r}
                stroke="#ccc"
                strokeDasharray="5,5"
                fill="none"
              />
              {/* mostramos la referencia de edad sólo a la izquierda */}
            </React.Fragment>
          );
        })}

        {/* Líneas radiales y etiquetas de categorías */}
        {categories.map((cat, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          const x2 = center + radius * Math.cos(angle);
          const y2 = center + radius * Math.sin(angle);
          const xl = center + (radius + 15) * Math.cos(angle);
          const yl = center + (radius + 15) * Math.sin(angle);
          return (
            <React.Fragment key={i}>
              <Line
                x1={center}
                y1={center}
                x2={x2}
                y2={y2}
                stroke="#ccc"
              />
              <SvgText
                x={xl}
                y={yl}
                fontSize="12"
                fill="#333"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {cat}
              </SvgText>
            </React.Fragment>
          );
        })}

        {/* Polígono de datos con borde */}
        {userData && (
          <Polygon
            points={pointsData
              .map((r, i) => {
                const angle = i * angleSlice - Math.PI / 2;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                return `${x},${y}`;
              })
              .join(" ")
            }
            fill="rgba(255,99,71,0.4)"
            stroke="tomato"
            strokeWidth={2}
          />
        )}

        {/* Punto central */}
        <Circle cx={center} cy={center} r={4} fill="#66B3BA" />
      </Svg>
    </View>
  );
};

export default RadarChart;