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
import { auth } from "../utils/firebase";
import { child, getDatabase, ref, get, set } from "firebase/database";
import { ThemeContext } from "../components/ThemeContext";

const fecha = new Date();
const hoy = fecha.getDate();
const mesActual = fecha.getMonth() + 1;
const diaActual = fecha.getDay();
function getMonthName(month) {
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
const getDayName = (day) => {
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
const getMeta = (meta) => {
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
const getExperiencia = (experiencia) => {
  switch (experiencia) {
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

const firstLetterToUpperCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const equipamento = {
  null: require("../../assets/images/corriendo.png"),
  banda: require("../../assets/images/saltar-la-cuerda.png"),
  mancuernas: require("../../assets/images/dumbell.png"),
  barra: require("../../assets/images/levantamiento-de-pesas.png"),
  maquina: require("../../assets/images/gimnasia.png"),
};

const generarRutina = (ejercicios, meta, usuario) => {
  if (!ejercicios || !usuario || ejercicios.length === 0) {
    console.log("No hay ejercicios o usuario", ejercicios, usuario);
    return null;
  }
  ejercicios.length === undefined
    ? (ejercicios = ejercicios[getExperiencia(usuario.experiencia)])
    : null;
  console.log(ejercicios);
  // Filtrar ejercicios según la meta seleccionada
  const ejerciciosMeta = ejercicios.filter((ejercicio) => {
    return ejercicio.objetivo.includes(meta);
  });

  // Filtrar ejercicios que no tienen dificultades coincidentes con las del usuario
  const ejerciciosMetaSinDificultad = ejerciciosMeta.filter((ejercicio) => {
    return !ejercicio.lesion.includes(usuario.lesion);
  });
  // Encontrar todos los grupos musculares disponibles
  const gruposMusculares = new Set();
  ejerciciosMetaSinDificultad.forEach((ejercicio) => {
    ejercicio.musculos.forEach((musculo) => {
      gruposMusculares.add(musculo);
    });
  });

  // Calcular la cantidad de ejercicios por día y por grupo muscular
  const rutina = [];
  const ejerciciosMetaSinDificultadArray = Array.from(
    ejerciciosMetaSinDificultad
  );
  const diasEntrenamiento = usuario.diasSeleccionados;
  const gruposMuscularesArray = Array.from(gruposMusculares);
  const gruposMuscularesPorDia =
    gruposMuscularesArray.length / diasEntrenamiento.length;
  const ejerciciosPorDia = Math.ceil(
    ejerciciosMetaSinDificultadArray.length / diasEntrenamiento.length
  );
  const ejerciciosPorGrupo = {};

  // Inicializar el objeto ejerciciosPorGrupo
  gruposMuscularesArray.forEach((grupo) => {
    ejerciciosPorGrupo[grupo] = [];
  });

  // Asignar ejercicios a grupos musculares
  ejerciciosMetaSinDificultad.forEach((ejercicio) => {
    ejercicio.musculos.forEach((musculo) => {
      ejerciciosPorGrupo[musculo].push(ejercicio);
    });
  });

  // Generar la rutina
  for (let i = 0; i < diasEntrenamiento.length; i++) {
    const dia = [];
    for (let j = 0; j < ejerciciosPorDia; j++) {
      const grupoMuscular =
        gruposMuscularesArray[i * gruposMuscularesPorDia + j];
      const ejerciciosGrupo = ejerciciosPorGrupo[grupoMuscular];
      if (
        typeof ejerciciosGrupo === "undefined" ||
        ejerciciosGrupo.length === 0
      ) {
        // Si no hay ejercicios disponibles en este grupo, elige uno aleatorio de todos los ejercicios
        const ejercicioIndex = Math.floor(
          Math.random() * ejerciciosMetaSinDificultadArray.length
        );
        const ejercicio = ejerciciosMetaSinDificultadArray.splice(
          ejercicioIndex,
          1
        )[0];
        dia.push(ejercicio);
      } else {
        const ejercicioIndex = Math.floor(
          Math.random() * ejerciciosGrupo.length
        );
        const ejercicio = ejerciciosGrupo.splice(ejercicioIndex, 1)[0];
        dia.push(ejercicio);
      }
    }
    rutina.push(dia);
  }
  console.log(gruposMuscularesArray, ejerciciosPorGrupo);
  return rutina;
};

const windowHeight = Dimensions.get("window").height;
const Home = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rutine, setRutine] = useState(null);
  const [diasSeleccionadosCortos, setDiasSeleccionadosCortos] = useState([]);
  const [indiceDia, setIndiceDia] = useState(0);
  const { selected, handleContextChange, themes } = useContext(ThemeContext);
  const { backgroundColor, titleColor, textColor, highlightColor } =
    themes[selected];

  useEffect(() => {
    // Este efecto se ejecuta cuando cambias a cualquier otra pantalla
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      // Antes de quitar la pantalla actual
      setIsLoaded(false); // Restablece isLoaded a false
    });

    return unsubscribe; // Limpia el efecto cuando la pantalla se desmonta
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fitplan-routine.vercel.app/data/ejercicios.json"
        );
        if (!response.ok) throw Error(response.statusText);
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    console.log("CALLING FETCH DATA");
    fetchData();
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    const name = user.email.split("@")[0].replace(".", "_");
    const dbRef = ref(getDatabase());
    get(child(dbRef, "usuarios/" + name + "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data1 = snapshot.val();
          for (const key in data1) {
            if (Object.hasOwnProperty.call(data1, key)) {
              const element = data1[key];
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
  }, [auth.currentUser]);

  useEffect(() => {
    if (userData && userData !== null) {
      if (data && data[getExperiencia(userData.experiencia)]) {
        setData(data[getExperiencia(userData.experiencia)]);
      }
      const dias = userData.diasSeleccionados.map((dia) => {
        switch (dia) {
          case "D":
            return "Domingo";
          case "L":
            return "Lunes";
          case "Ma":
            return "Martes";
          case "Mi":
            return "Miercoles";
          case "J":
            return "Jueves";
          case "V":
            return "Viernes";
          case "S":
            return "Sabado";
          default:
            return "Dia";
        }
      });
      setDiasSeleccionadosCortos(dias);
      setIsLoaded(true);
    }
  }, [userData]);

  useEffect(() => {
    if (isLoaded && data) {
      console.log(data, typeof data);
      setRutine(generarRutina(data, getMeta(userData.meta), userData));
      if (diasSeleccionadosCortos.includes(getDayName(diaActual))) {
        setIndiceDia(diasSeleccionadosCortos.indexOf(getDayName(diaActual)));
      }
    }
  }, [isLoaded, data]);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={[styles.banner, { backgroundColor: highlightColor }]}>
        <Text style={[styles.date, { color: textColor }]}>
          {hoy} / {getMonthName(mesActual)}
        </Text>
        {isLoaded && rutine !== null ? (
          diasSeleccionadosCortos.includes(getDayName(diaActual)) ? (
            <Text style={[styles.date, { color: textColor }]}>
              {firstLetterToUpperCase(rutine[indiceDia][0].musculos[0])}
            </Text>
          ) : (
            <View
              style={{
                width: "50%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  {
                    fontSize: 20,
                    color: textColor,
                    position: "absolute",
                    top: 15,
                    right: "25%",
                  },
                ]}
              >
                Descanso
              </Text>
              <Image
                source={require("../../assets/images/ramadan.png")}
                style={styles.icon}
              />
            </View>
          )
        ) : (
          <Text style={styles.date}>Cargando...</Text>
        )}
      </View>
      <View style={[styles.rutine, { backgroundColor: highlightColor }]}>
        <View
          style={[
            styles.excersices,
            { backgroundColor: backgroundColor, borderColor: highlightColor },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              height: 35,
              alignItems: "center",
              marginTop: 15,
              elevation: 10,
              marginBottom: 3,
            }}
          >
            <Ionicons
              name="barbell"
              size={30}
              color={textColor}
              style={{ marginLeft: 15 }}
            />
            <Text style={{ color: textColor, fontWeight: "bold" }}>
              Ejercicios diarios{" "}
            </Text>
            <Text style={{ color: textColor, fontWeight: "bold" }}>
              {getDayName(diaActual)} {hoy}
            </Text>
            <Ionicons
              name="md-chevron-forward-circle"
              size={30}
              color={backgroundColor}
              style={{ marginHorizontal: 10 }}
            />
          </View>
          <ScrollView style={{ width: "100%", margin: 13 }}>
            {isLoaded && rutine !== null ? (
              diasSeleccionadosCortos.includes(getDayName(diaActual)) ? (
                rutine[indiceDia].map((ejercicio, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        console.log(ejercicio);
                        navigation.navigate("Excercise", {
                          ejercicio: ejercicio,
                        });
                      }}
                    >
                      <View
                        key={index}
                        style={[
                          styles.excersice,
                          { backgroundColor: highlightColor },
                        ]}
                      >
                        <Text
                          style={{
                            color: textColor,
                            fontSize: 17,
                            fontWeight: "bold",
                            margin: 15,
                          }}
                        >
                          {firstLetterToUpperCase(ejercicio.nombre)}
                        </Text>
                        <Text
                          style={{
                            color: textColor,
                            fontSize: 15,
                            marginHorizontal: 15,
                            marginBottom: 5,
                          }}
                        >
                          {ejercicio.repeticion === null
                            ? `Duracion: ${ejercicio.duracion} seg`
                            : `Repeticiones: ${ejercicio.repeticion}`}
                        </Text>
                        <Text
                          style={{
                            color: textColor,
                            fontSize: 15,
                            marginHorizontal: 15,
                            marginBottom: 5,
                          }}
                        >
                          Series: {ejercicio.set}
                        </Text>
                        <Image
                          source={equipamento[ejercicio.equipo]}
                          style={styles.image}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View>
                  <View
                    style={[
                      styles.excersice2,
                      { backgroundColor: highlightColor },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        margin: 15,
                        color: textColor,
                      }}
                    >
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
                      }}
                    >
                      Recuerda dormir tus{" "}
                      <Text style={styles.negrita}>8 horas</Text> para estar al
                      100% mañana
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.excersice2,
                      { backgroundColor: highlightColor },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        margin: 15,
                        color: textColor,
                      }}
                    >
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
                      }}
                    >
                      Comer bien es fundamental para tu salud
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        marginHorizontal: 15,
                        marginBottom: 5,
                        color: textColor,
                      }}
                    >
                      Alimentate con{" "}
                      <Text style={styles.negrita}>comida saludable</Text> y en
                      las cantidades adecuadas
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.excersice2,
                      { backgroundColor: highlightColor },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        margin: 15,
                        color: textColor,
                      }}
                    >
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
                      }}
                    >
                      Recuerda tomar{" "}
                      <Text style={styles.negrita}>2 litros</Text> de agua al
                      dia
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        marginHorizontal: 15,
                        marginBottom: 5,
                        color: textColor,
                      }}
                    >
                      Asi mantendras tu cuerpo hidratado y funcionando
                      correctamente
                    </Text>
                  </View>
                </View>
              )
            ) : (
              <View style={styles.excersice}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    margin: 15,
                  }}
                >
                  Cargando...
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  banner: {
    flexDirection: "row",
    width: "80%",
    height: windowHeight / 5,
    borderRadius: 30,
    marginHorizontal: "10%",
    marginTop: "10%",
    marginBottom: "5%",
    backgroundColor: "#00d1ff",
    elevation: 7,
    justifyContent: "space-between",
    borderColor: "#fff",
    borderWidth: 2,
  },
  date: {
    fontSize: 20,
    color: "#fff",
    alignSelf: "flex-start",
    marginHorizontal: "5%",
    marginTop: "5%",
  },
  today: {
    fontSize: 30,
    color: "#fff",
    alignSelf: "flex-end",
    marginHorizontal: "5%",
  },
  rutine: {
    width: "100%",
    height: "72%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: "3%",
    backgroundColor: "#00d1ff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
  },
  excersices: {
    width: "90%",
    height: "85%",
    marginTop: 15,
    borderRadius: 30,
    backgroundColor: "#fff",
    elevation: 5,
    borderWidth: 2,
    marginBottom: 25,
  },
  week: {
    width: "90%",
    height: windowHeight / 3.8,
    marginTop: 15,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  excersice: {
    width: "88%",
    height: windowHeight / 6,
    borderRadius: 30,
    backgroundColor: "#00d1ff",
    elevation: 5,
    borderColor: "#fff",
    borderWidth: 2,
    marginLeft: 7,
    marginBottom: 15,
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
  image: {
    width: windowHeight / 12,
    height: windowHeight / 12,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 20,
    right: "30%",
  },
  icon: {
    width: windowHeight / 10,
    height: windowHeight / 10,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 20,
    right: "30%",
  },
  negrita: {
    fontWeight: "bold",
  },
});

export default Home;
