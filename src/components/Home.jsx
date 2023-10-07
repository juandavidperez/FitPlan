import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../firebase";
import { child, getDatabase, ref, get, set } from "firebase/database";

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
const equipamento = {
  null: require("../../assets/corriendo.png"),
  "": require("../../assets/corriendo.png"),
  banda: require("../../assets/saltar-la-cuerda.png"),
  mancuernas: require("../../assets/dumbell.png"),
  barra: require("../../assets/levantamiento-de-pesas.png"),
  maquina: require("../../assets/gimnasia.png"),
};

const windowHeight = Dimensions.get("window").height;
const Home = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fitplan-routine.vercel.app/data/ejercicios.json"
        );
        if (!response.ok) throw Error(response.statusText);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

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
  }, []);

  useEffect(() => {
    if (userData !== null) {
      setData(data[getExperiencia(userData.experiencia)]);
      setIsLoaded(true);
    }
  }, [userData]);
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.date}>
          {hoy} / {getMonthName(mesActual)}
        </Text>
        <Text style={styles.date}>Descanso</Text>
      </View>
      <View style={styles.rutine}>
        <View style={styles.excersices}>
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
              color="black"
              style={{ marginLeft: 15 }}
            />
            <Text style={{ color: "black", fontWeight: "bold" }}>
              Ejercicios diarios{" "}
            </Text>
            <Text style={{ color: "black", fontWeight: "bold" }}>
              {getDayName(diaActual)} {hoy}
            </Text>
            <TouchableOpacity onPress={() => console.log(data[0].nombre)}>
              <Ionicons
                name="md-chevron-forward-circle"
                size={30}
                color="black"
                style={{ marginHorizontal: 10 }}
              />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ width: "100%", margin: 13 }}>
            <View style={styles.excersice}>
              <Text style={{ fontSize: 17, fontWeight: "bold", margin: 15 }}>
                {isLoaded === false ? "Cargando..." : data[0].nombre}
              </Text>
              <Text
                style={{ fontSize: 15, marginHorizontal: 10, marginBottom: 5 }}
              >
                {isLoaded === false
                  ? "Cargando..."
                  : data[0].repeticion === null
                  ? `Duracion: ${data[0].duracion}`
                  : `Reps: ${data[0].repeticion}`}
              </Text>
              <Text
                style={{ fontSize: 15, marginHorizontal: 10, marginBottom: 5 }}
              >
                Series: {isLoaded === false ? "Cargando..." : data[0].set}
              </Text>
              {isLoaded === false ? (
                <Image
                  source={require("../../assets/corriendo.png")}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={equipamento[data[0].equipo]}
                  style={styles.image}
                />
              )}
            </View>
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
    fontSize: 23,
    color: "#fff",
    marginHorizontal: "7%",
    marginTop: "5%",
    flexDirection: "row",
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
    borderColor: "#00d1ff",
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
  image: {
    width: windowHeight / 12,
    height: windowHeight / 12,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 20,
    right: "35%",
  },
});

export default Home;
