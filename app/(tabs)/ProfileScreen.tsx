// app/(tabs)/Profile.tsx
import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../../config/firebaseConfig";
import { child, getDatabase, ref, get } from "firebase/database";
import RadarChart from "../components/RadarChart";
import { ThemeContext } from "../../components/ThemeContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

type RootStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  // añade aquí cualquier otra ruta y sus params
};

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

interface UserData {
  username: string;
  email: string;
  edad: number;
  altura: number;
  unidadAltura: "Cm" | "M" | string;
  peso: number;
  unidadPeso: "Kg" | "Lb" | string;
  genero: string;
  // si usas más campos, añádelos aquí...
}

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { selected, themes } = useContext(ThemeContext);
  const { backgroundColor, titleColor, textColor, highlightColor } =
    themes[selected];

    useFocusEffect(
      
      React.useCallback(() => {
        setIsLoaded(false)
      }, [])
    );

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return;
      if(isLoaded) return; // Evita múltiples llamadas
      const key = user.email!.split("@")[0].replaceAll(".", "_");
      try {
        const db = getDatabase();
        const snap = await get(ref(db, `usuarios/${key}`));
        if (snap.exists()) {
          const raw = snap.val() as any;
          // parseamos strings a números
          const data: UserData = {
            username: raw.username,
            email: raw.email,
            edad: Number(raw.edad),
            altura: raw.altura,
            unidadAltura: raw.unidadAltura,
            peso: raw.peso,
            unidadPeso: raw.unidadPeso,
            genero: raw.genero,
          };
          setUserData(data);
          setIsLoaded(true);

          console.log("User data fetched:", data);
        } else {
          console.warn("No data available for user", key);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }

    };
    fetchUser();
  }, [isLoaded]);

  // inicial para el avatar
  const inicial =
    userData?.username?.[0]?.toLowerCase() ?? "c";

  if (!userData) {
    return (
      <View
        style={[styles.loadingContainer, { backgroundColor }]}
      >
        <ActivityIndicator size="large" color={highlightColor} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Top bar */}
      <View style={[styles.topBar, { backgroundColor: highlightColor }]}>
        <Text style={[styles.topTitle, { color: textColor }]}>
          Perfil
        </Text>
      </View>

      {/* Avatar y nombre */}
      <View style={styles.userDesc}>
        <MaterialCommunityIcons
          name={`alpha-${inicial}-circle` as any}
          size={95}
          color={textColor}
        />
        <Text style={[styles.username, { color: textColor }]}>
          {userData.username}
        </Text>
      </View>

      {/* Datos personales y gráfico */}
      <View style={[styles.userStats, { backgroundColor: highlightColor }]}>
        <View style={styles.statsHeader}>
          <Text style={[styles.statsTitle, { color: textColor }]}>
            Datos personales
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/extra/EditProfile")}
          >
            <MaterialCommunityIcons
              name="account-edit"
              size={30}
              color={textColor}
            />
          </TouchableOpacity>
        </View>

        {/* Fila 1: Edad / Altura */}
        <View style={styles.row}>
          <View style={[styles.stat, { backgroundColor }]}>
            <Text style={[styles.statLabel, { color: textColor }]}>
              Edad
            </Text>
            <Text style={[styles.statValue, { color: textColor }]}>
              {userData.edad} años
            </Text>
          </View>
          <View style={[styles.stat, { backgroundColor }]}>
            <Text style={[styles.statLabel, { color: textColor }]}>
              Altura
            </Text>
            <Text style={[styles.statValue, { color: textColor }]}>
              {userData.altura} {userData.unidadAltura}
            </Text>
          </View>
        </View>
        {/* Fila 2: Peso / Género */}
        <View style={styles.row}>
          <View style={[styles.stat, { backgroundColor }]}>
            <Text style={[styles.statLabel, { color: textColor }]}>
              Peso
            </Text>
            <Text style={[styles.statValue, { color: textColor }]}>
              {userData.peso} {userData.unidadPeso}
            </Text>
          </View>
          <View style={[styles.stat, { backgroundColor }]}>
            <Text style={[styles.statLabel, { color: textColor }]}>
              Género
            </Text>
            <Text style={[styles.statValue, { color: textColor }]}>
              {userData.genero}
            </Text>
          </View>
        </View>

        {/* Gráfico radar */}
        <View style={[styles.graphic, { borderColor: highlightColor }]}>
          <Text style={styles.statsTitle}>Estadísticas</Text>
          <RadarChart />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  topBar: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },
  topTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  userDesc: {
    width: "100%",
    height: "28%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  username: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
  },
  userStats: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    elevation: 5,
  },
  statsHeader: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  stat: {
    width: 150,
    height: 60,
    borderRadius: 15,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 15,
    fontWeight: "bold",
  },
  statValue: {
    fontSize: 15,
    marginTop: 5,
  },
  graphic: {
    width: "90%",
    height: 240,
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
});

export default ProfileScreen;