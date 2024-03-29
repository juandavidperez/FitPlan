import React, { useState } from "react";
import { auth, database } from "./src/utils/firebase.js";
import { ref, set, push } from "firebase/database";
import FirstScreen from "./src/screens/FirstScreen.jsx";
import LoginG from "./src/screens/auth/LogInG.jsx";
import SignUp from "./src/screens/auth/SignUp.jsx";
import FirstForm from "./src/screens/form/firstForm.jsx";
import SecondForm from "./src/screens/form/secondForm.jsx";
import ThirdForm from "./src/screens/form/thirdForm.jsx";
import BottomTab from "./src/components/navigation/BottomTab.js";
import EditProfile from "./src/screens/EditProfile.jsx";
import Account from "./src/screens/Account.jsx";
import About from "./src/screens/About.jsx";
import Apariencia from "./src/screens/Apariencia.jsx";
import Help from "./src/screens/Help.jsx";
import Excercise from "./src/screens/Excercise.jsx";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "./src/components/ThemeContext.js";

const Stack = createStackNavigator();

export default function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [genero, setGenero] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [unidadPeso, setUnidadPeso] = useState("Kg");
  const [unidadAltura, setUnidadAltura] = useState("Cm");
  const [meta, setMeta] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [lesion, setLesion] = useState("");
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const user = auth.currentUser;
  const enviarDatos = () => {
    const name = user.email.split("@")[0].replace(".", "_");
    if (user) {
      const userRef = ref(database, `usuarios/${name}`); // Referencia al nodo "usuarios"
      const newUserRef = push(userRef);
      // Genera un nuevo id para el usuario
      set(newUserRef, {
        // Guarda los datos del usuario en el nodo correspondiente
        username: username,
        email: email,
        genero: genero,
        edad: edad,
        peso: [peso, unidadPeso],
        altura: [altura, unidadAltura],
        meta: meta,
        experiencia: experiencia,
        lesion: lesion,
        diasSeleccionados: diasSeleccionados,
        selectedSet: selectedSet,
      });
    } else {
      console.log("No hay usuario logueado");
    }
  };

  return (
    <ThemeProvider>
      <NavigationContainer style={{ width: 180 }}>
        <Stack.Navigator
          initialRouteName="FirstScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Main" component={FirstScreen} />
          <Stack.Screen name="LoginG" component={LoginG} />
          <Stack.Screen name="SignUp">
            {(props) => (
              <SignUp
                onEnviar={(data) => {
                  setUsername(data.username);
                  setEmail(data.email);
                }}
                {...props}
              ></SignUp>
            )}
          </Stack.Screen>
          <Stack.Screen name="FirstForm">
            {(props) => (
              <FirstForm
                onEnviar={(data) => {
                  setGenero(data.genero);
                  setEdad(data.edad);
                  setPeso(data.peso);
                  setAltura(data.altura);
                  setUnidadPeso(data.unidadPeso);
                  setUnidadAltura(data.unidadAltura);
                }}
                {...props}
              ></FirstForm>
            )}
          </Stack.Screen>
          <Stack.Screen name="SecondForm">
            {(props) => (
              <SecondForm
                onEnviar={(data) => {
                  setMeta(data.meta);
                  setExperiencia(data.experiencia);
                  setLesion(data.lesion);
                  setDiasSeleccionados(data.diasSeleccionados);
                }}
                {...props}
              ></SecondForm>
            )}
          </Stack.Screen>
          <Stack.Screen name="ThirdForm" enviarDatos={enviarDatos}>
            {(props) => (
              <ThirdForm
                onEnviar={(data) => {
                  setSelectedSet(data.selectedSet);
                }}
                enviarDatos={enviarDatos}
                {...props}
              ></ThirdForm>
            )}
          </Stack.Screen>
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Apariencia" component={Apariencia} />
          <Stack.Screen name="Help" component={Help} />
          <Stack.Screen name="Excercise" component={Excercise} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
