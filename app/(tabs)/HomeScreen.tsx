// app/(tabs)/Home.tsx
import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../../config/firebaseConfig";
import { child, getDatabase, ref, get, set } from "firebase/database";
import { ThemeContext } from "../../components/ThemeContext";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

// --- Tipos ---
interface Ejercicio {
  nombre: string;
  repeticion: number | null;
  duracion: number;
  set: number;
  equipo: keyof typeof equipamento;
  musculos: string[];
  objetivo: number[];
  lesion: string[];
}

export interface UserData {
  // Datos de perfil
  username: string;
  email: string;
  genero: "masculino" | "femenino" | string;
  edad: number;
  altura: number;
  unidadAltura: "Cm" | "M" | string;
  peso: number;
  unidadPeso: "Kg" | "Lb" | string;
  selectedSet: string;

  // Configuración de la rutina
  experiencia: "ninguna" | "principiante" | "intermedio" | "avanzado";
  meta: "deficit_calorico" | "hipertrofia" | "definicion" | "fuerza";
  lesion: string;
  diasSeleccionados: ("D" | "L" | "Ma" | "Mi" | "J" | "V" | "S")[];
}

const equipamento = {
    null: require("../../assets/images/corriendo.png"),
    banda: require("../../assets/images/saltar-la-cuerda.png"),
    mancuernas: require("../../assets/images/dumbell.png"),
    barra: require("../../assets/images/levantamiento-de-pesas.png"),
    maquina: require("../../assets/images/gimnasia.png"),
};

// --- Constantes y helpers sin cambio, sólo añadir tipos de entrada/salida ---
const fecha = new Date();
const hoy = fecha.getDate();
const mesActual = fecha.getMonth() + 1;
const diaActual = fecha.getDay();

function getMonthName(month: number): string { 
    switch (month) {
        case 1:
          return "Ene";
        case 2:
          return "Feb";
        case 3:
          return "Mar";
        case 4:
          return "Abr";
        case 5:
          return "May";
        case 6:
          return "Jun";
        case 7:
          return "Jul";
        case 8:
          return "Ago";
        case 9:
          return "Sep";
        case 10:
          return "Oct";
        case 11:
          return "Nov";
        case 12:
          return "Dic";
        default:
          return "Mes";
    }
}
const getDayName = (day: number): string => { 
    switch (day) {
        case 0:
          return "Domingo";
        case 1:
          return "Lunes";
        case 2:
          return "Martes";
        case 3:
          return "Miercoles";
        case 4:
          return "Jueves";
        case 5:
          return "Viernes";
        case 6:
          return "Sabado";
        default:
          return "Dia";
    }
};
const getMeta = (meta: UserData["meta"]): number => { 
    switch (meta) {
        case "deficit_calorico":
          return 1;
        case "hipertrofia":
          return 2;
        case "definicion":
          return 3;
        case "fuerza":
          return 4;
        default:
          return 1;
    }
};
const getExperiencia = (exp: UserData["experiencia"]): string => { 
    switch (exp) {
        case "ninguna":
          return "experiencia 1";
        case "principiante":
          return "experiencia 1";
        case "intermedio":
          return "experiencia 2";
        case "avanzado":
          return "experiencia 3";
        default:
          return "experiencia 1";
    }
};
const firstLetterToUpperCase = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1);
  
  const generarRutina = (
    ejerciciosInput: Ejercicio[] | Record<string, Ejercicio[]>,
    meta: number,
    usuario: UserData
  ): Ejercicio[][] | null => {
    // Soportamos dos formatos: un array plano, o un objeto indexado por "experiencia"
    let ejercicios: Ejercicio[];
    if (Array.isArray(ejerciciosInput)) {
      ejercicios = ejerciciosInput;
    } else {
      const key = getExperiencia(usuario.experiencia) as keyof typeof ejerciciosInput;
      ejercicios = ejerciciosInput[key] ?? [];
    }
  
    if (ejercicios.length === 0) {
      console.warn("No hay ejercicios válidos para la experiencia/meta dada.");
      return null;
    }
  
    // 1) Filtrar por meta
    const ejerciciosMeta = ejercicios.filter((e) => e.objetivo.includes(meta));
  
    // 2) Excluir según lesión
    const ejerciciosMetaSinDificultad = ejerciciosMeta.filter(
      (e) => !e.lesion.includes(usuario.lesion)
    );
  
    if (ejerciciosMetaSinDificultad.length === 0) {
      console.warn("Tras filtrar por lesión no quedan ejercicios.");
      return null;
    }
  
    // 3) Grupos musculares
    const gruposMusculares = new Set<string>();
    ejerciciosMetaSinDificultad.forEach((e) =>
      e.musculos.forEach((m) => gruposMusculares.add(m))
    );
    const gruposArray = Array.from(gruposMusculares);
  
    // 4) Parámetros de reparto
    const dias = usuario.diasSeleccionados.length;
    const totalEj = ejerciciosMetaSinDificultad.length;
    const ejerciciosPorDia = Math.ceil(totalEj / dias);
  
    // 5) Map para repartir por grupo
    const porGrupo: Record<string, Ejercicio[]> = {};
    gruposArray.forEach((g) => {
      porGrupo[g] = [];
    });
    ejerciciosMetaSinDificultad.forEach((e) => {
      e.musculos.forEach((m) => {
        porGrupo[m].push(e);
      });
    });
  
    // 6) Construir rutina
    const rutina: Ejercicio[][] = [];
    for (let diaIdx = 0; diaIdx < dias; diaIdx++) {
      const dia: Ejercicio[] = [];
      for (let j = 0; j < ejerciciosPorDia; j++) {
        // Elegimos grupo cíclicamente
        const grupo =
          gruposArray[(diaIdx * ejerciciosPorDia + j) % gruposArray.length];
        const lista = porGrupo[grupo];
        if (lista.length > 0) {
          // Sacamos uno aleatorio de ese grupo
          const idx = Math.floor(Math.random() * lista.length);
          dia.push(lista.splice(idx, 1)[0]);
        } else {
          // Si se agotó, elegimos aleatorio global
          const globalIdx = Math.floor(
            Math.random() * ejerciciosMetaSinDificultad.length
          );
          dia.push(ejerciciosMetaSinDificultad.splice(globalIdx, 1)[0]);
        }
      }
      rutina.push(dia);
    }
  
    return rutina;
};
  

const windowHeight = Dimensions.get("window").height;

export default function HomeScreen() {
  const router = useRouter();

  const [data, setData] = useState<Ejercicio[] | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rutine, setRutine] = useState<Ejercicio[][] | null>(null);
  const [diasSeleccionadosCortos, setDiasSeleccionadosCortos] = useState<
    string[]
  >([]);
  const [indiceDia, setIndiceDia] = useState(0);
  const user = auth.currentUser;

  const { selected, handleContextChange, themes } =
    useContext(ThemeContext);
  const { backgroundColor, textColor, highlightColor } =
    themes[selected];

  useFocusEffect(
    
    React.useCallback(() => {
      setIsLoaded(!!rutine);
    }, [])
  );

  // Fetch ejercicios JSON
  useEffect(() => {
    fetch("https://fitplan-routine.vercel.app/data/ejercicios.json")
      .then((r) => r.json())
      .then((json: unknown) => {
        // si tu JSON es un objeto indexado por experiencia,
        // luego lo reasignas en el siguiente efecto
        setData(json as Ejercicio[]);

        console.log("Ejercicios cargados");
      })
      .catch(console.error);
  }, []);

  // Fetch datos de usuario desde Firebase
  useEffect(() => { 
    if(userData) return;

    console.log("Usuario actual:", user);
    if (!user) return;
    const fetchUserData = async () => {
  
      // Construimos la clave tal como la tienes en RTDB
      const key = user.email!
        .split("@")[0]
        .replaceAll(".", "_");
      console.log("RTDB key:", key);
  
      try {
        const db = getDatabase();
        const snap = await get(ref(db, `usuarios/${key}`));
  
        if (snap.exists()) {
          // Aquí snap.val() ya es directamente tu objeto UserData
          const data = snap.val() as UserData;
          console.log("Datos de usuario cargados:", data);
          setUserData(data);
        } else {
          console.warn("No existe el nodo usuarios/" + key);
        }
      } catch (error) {
        console.error("Error al leer RTDB:", error);
      }
    };
  
    fetchUserData();
  }, [userData]);  

  // Cuando llega userData, preparo días y marco cargado
  useEffect(() => {
    if (!userData) return;
    const dias = userData.diasSeleccionados.map((d) =>
      ({
        D: "Domingo",
        L: "Lunes",
        Ma: "Martes",
        Mi: "Miercoles",
        J: "Jueves",
        V: "Viernes",
        S: "Sabado",
      }[d]!)
    );
    setDiasSeleccionadosCortos(dias);
    setIsLoaded(true);
  }, [userData]);

  // Cuando tengo data y userData, genero rutina
  useEffect(() => {
    if (!rutine && isLoaded && data && userData) {
      const experienciaKey = getExperiencia(userData.experiencia) as
        | "experiencia 1"
        | "experiencia 2"
        | "experiencia 3";
      // si tu JSON original tenía varias experiencias acopladas
      const ejerciciosPorExp = (data as any)[experienciaKey] as Ejercicio[];
      const base = Array.isArray(ejerciciosPorExp)
        ? ejerciciosPorExp
        : data;
      const nuevaRutina = generarRutina(
        base,
        getMeta(userData.meta),
        userData
      );
      setRutine(nuevaRutina);
    }
  }, [isLoaded, data, userData, rutine]);

  console.log(isLoaded)

  useEffect(() => {
    if (!rutine) return;
  
    const nombreHoy = getDayName(diaActual);
    const idx = diasSeleccionadosCortos.indexOf(nombreHoy);
  
    if (idx >= 0 && idx < rutine.length) {
      setIndiceDia(idx);
    } else {
      // Por si acaso no coincide, siempre ponemos 0
      setIndiceDia(0);
    }
  }, [rutine, diasSeleccionadosCortos]);  

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Banner superior */}
      <View style={[styles.banner, { backgroundColor: highlightColor }]}>
        <Text style={[styles.date, { color: textColor }]}>
          {hoy} / {getMonthName(mesActual)}
        </Text>
        {isLoaded && rutine ? (
          diasSeleccionadosCortos.includes(getDayName(diaActual)) ? (
            <Text style={[styles.date, { color: textColor }]}>
              {firstLetterToUpperCase(
                rutine[indiceDia][0].musculos[0]
              )}
            </Text>
          ) : (
            <View style={styles.descansoContainer}>
              <Text style={[styles.date, { color: textColor }]}>
                Descanso
              </Text>
              <Image
                source={require("../../assets/images/ramadan.png")}
                style={styles.icon}
              />
            </View>
          )
        ) : (
          <Text style={[styles.date, { color: textColor }]}>
            Cargando...
          </Text>
        )}
      </View>

      {/* Contenedor de ejercicios */}
      <View style={[styles.rutine, { backgroundColor: highlightColor }]}>
        <View
          style={[
            styles.excersices,
            { backgroundColor, borderColor: highlightColor },
          ]}
        >
          {/* Header dentro del card */}
          <View style={styles.headerCard}>
            <Ionicons
              name="barbell"
              size={30}
              color={textColor}
              style={{ marginLeft: 15 }}
            />
            <Text style={[styles.headerText, { color: textColor }]}>
              Ejercicios diarios
            </Text>
            <Text style={[styles.headerText, { color: textColor }]}>
              {getDayName(diaActual)} {hoy}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={30}
              color={backgroundColor}
              style={{ marginHorizontal: 10 }}
            />
          </View>

          <ScrollView style={{ width: "100%", margin: 13 }}>
            {isLoaded && rutine && rutine[indiceDia]?.length ? (
              diasSeleccionadosCortos.includes(getDayName(diaActual)) ? (
                rutine[indiceDia].map((ej, i) => (
                  <TouchableOpacity
                    key={i}
                     onPress={() =>
                      router.push({
                        pathname: "/extra/Exercise",
                        params: { ejercicio: JSON.stringify(ej) },
                      })
                    } 
                    
                  >
                    <View
                      style={[
                        styles.excersice,
                        { backgroundColor: highlightColor },
                      ]}
                    >
                      <Text
                        style={[
                          styles.ejTitle,
                          { color: textColor },
                        ]}
                      >
                        {firstLetterToUpperCase(ej.nombre)}
                      </Text>
                      <Text style={[styles.ejText, { color: textColor }]}>
                        {ej.repeticion === null
                          ? `Duracion: ${ej.duracion} seg`
                          : `Repeticiones: ${ej.repeticion}`}
                      </Text>
                      <Text style={[styles.ejText, { color: textColor }]}>
                        Series: {ej.set}
                      </Text>
                      <Image
                        source={equipamento[ej.equipo]}
                        style={styles.image}
                      />
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                
                <View>
                  <View style={[ styles.excersice2, { backgroundColor: highlightColor },]} >
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        margin: 15,
                        color: textColor,
                      }}>
                      Descansa{" "}
                      <MaterialCommunityIcons
                        name="sleep"
                        size={24}
                        color="yellow"
                      />
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        marginHorizontal: 15,
                        marginBottom: 5,
                        color: textColor,
                      }}
                      >
                        Hoy es tu dia de descanso, disfruta!
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        marginHorizontal: 15,
                        marginBottom: 5,
                        color: textColor,
                      }}>
                      Recuerda dormir tus{" "}
                      <Text style={styles.negrita}>8 horas</Text> para estar al 100% mañana
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.excersice2,
                      { backgroundColor: highlightColor },
                    ]}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        margin: 15,
                        color: textColor,
                      }}>
                      Come bien{" "}
                      <MaterialCommunityIcons
                        name="food-apple"
                        size={24}
                        color="red"
                      />
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        marginHorizontal: 15,
                        marginBottom: 5,
                        color: textColor,
                      }}>
                      Comer bien es fundamental para tu salud
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        marginHorizontal: 15,
                        marginBottom: 5,
                        color: textColor,
                      }}>
                      Alimentate con{" "}
                      <Text style={styles.negrita}>
                        comida saludable
                      </Text> 
                      y en las cantidades adecuadas
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.excersice2,
                      { backgroundColor: highlightColor },
                    ]}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        margin: 15,
                        color: textColor,
                      }}>
                      Hidratate{" "}
                      <MaterialCommunityIcons
                        name="water"
                        size={24}
                        color="blue"
                        />
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        marginHorizontal: 15,
                        marginBottom: 5,
                        color: textColor,
                        }}>
                        Recuerda tomar{" "}
                          <Text style={styles.negrita}>
                            2 litros
                          </Text> 
                        de agua al dia
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          marginHorizontal: 15,
                          marginBottom: 5,
                          color: textColor,
                        }}>
                        Asi mantendras tu cuerpo hidratado y funcionando correctamente
                    </Text>
                  </View>
                </View>

              )
            ) : (
              <View style={styles.excersice}>
                <Text style={styles.ejTitle}>Cargando...</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  banner: {
    flexDirection: "row",
    width: "80%",
    height: windowHeight / 5,
    borderRadius: 30,
    marginHorizontal: "10%",
    marginTop: "10%",
    marginBottom: "5%",
    elevation: 7,
    justifyContent: "space-between",
    borderColor: "#fff",
    borderWidth: 2,
  },
  date: { fontSize: 20, alignSelf: "flex-start", margin: 16 },
  descansoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rutine: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: "3%",
    alignItems: "center",
    elevation: 7,
  },
  excersices: {
    width: "90%",
    flex: 1,
    marginTop: 15,
    borderRadius: 30,
    elevation: 5,
    borderWidth: 2,
    marginBottom: 25,
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 35,
    elevation: 10,
    marginTop: 15,
    marginBottom: 3,
  },
  headerText: { fontWeight: "bold" },
  excersice: {
    width: "88%",
    height: windowHeight / 6,
    borderRadius: 30,
    elevation: 5,
    borderColor: "#fff",
    borderWidth: 2,
    marginLeft: 7,
    marginBottom: 15,
    padding: 15,
  },
  excersice2: {
    width: "88%",
    height: windowHeight / 5,
    borderRadius: 30,
    backgroundColor: "#00d1ff",
    elevation: 5,
    borderColor: "#fff",
    borderWidth: 2,
    marginLeft: 7,
    marginBottom: 15,
  },
  ejTitle: { fontSize: 17, fontWeight: "bold", marginBottom: 5 },
  ejText: { fontSize: 15, marginBottom: 5 },
  image: {
    width: windowHeight / 12,
    height: windowHeight / 12,
    position: "absolute",
    bottom: 20,
    right: "30%",
  },
  icon: {
    width: windowHeight / 10,
    height: windowHeight / 10,
  },
  negrita: { fontWeight: "bold"},
});
