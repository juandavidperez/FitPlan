# FitPlan ⚡

Tu entrenador personal en el bolsillo. FitPlan genera rutinas de ejercicio personalizadas según tu experiencia, objetivo y días disponibles, y las sincroniza en tiempo real con Firebase.

<p align="center">
  <img src="https://github.com/juandavidperez/FitPlan/assets/28809204/1f5d1224-03d0-47df-ba2a-b71053d06de0" width="200" height="400" />
  <img src="https://github.com/juandavidperez/FitPlan/assets/28809204/09cad7c9-b506-4cc4-bb27-a9ae178cbd07" width="200" height="400" />
  <img src="https://github.com/juandavidperez/FitPlan/assets/28809204/f42306dc-55ec-4316-81cf-bcf79786d92b" width="200" height="400" />
</p>

## Funcionalidades

- **Rutinas personalizadas** — se generan según tu meta (déficit calórico, hipertrofia, definición o fuerza), nivel de experiencia y días de entrenamiento seleccionados
- **Calendario de entrenamiento** — visualiza tus días activos y tu racha semanal
- **Perfil con estadísticas** — gráfico radar con edad, altura y peso
- **Edición de perfil** — actualiza tus datos en cualquier momento
- **Temas de apariencia** — modo claro y oscuro
- **Autenticación** — registro e inicio de sesión con email/contraseña vía Firebase Auth

## Stack tecnológico

| Tecnología | Versión |
|---|---|
| Expo SDK | 52 |
| React Native | 0.76 |
| React | 18.3 |
| Firebase (Auth + Realtime DB) | 11 |
| React Navigation | 7 |

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- [Expo Go](https://expo.dev/go) en tu dispositivo móvil, o un emulador Android/iOS

## Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/juandavidperez/FitPlan.git
cd FitPlan

# 2. Instala las dependencias
npm install

# 3. Crea el archivo de configuración de Firebase
# Crea src/utils/firebase.js con el siguiente contenido:
```

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  databaseURL: "TU_DATABASE_URL",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
```

```bash
# 4. Inicia la app
npx expo start
```

Escanea el QR con Expo Go o presiona `a` para Android / `i` para iOS.

## Estructura del proyecto

```
src/
├── components/
│   ├── navigation/     # Bottom tab navigator
│   ├── RadarChart.js   # Gráfico de estadísticas
│   └── ThemeContext.js # Proveedor de temas
├── screens/
│   ├── auth/           # Login y registro
│   ├── form/           # Onboarding (3 pasos)
│   ├── Home.jsx        # Rutina del día
│   ├── Calendar.jsx    # Calendario y racha
│   ├── Profile.jsx     # Perfil y estadísticas
│   ├── EditProfile.jsx
│   ├── Account.jsx
│   └── Config.jsx      # Apariencia y ajustes
└── services/
    └── AuthService.js  # Wrapper de Firebase Auth
```

## Contribuciones

Los PRs son bienvenidos. Para cambios grandes, abre primero un issue para discutir la propuesta.
