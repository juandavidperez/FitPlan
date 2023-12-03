import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../utils/firebase.js";

const AuthService = {
  signUp: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      // Manejar errores aquí
    }
  },

  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      // Manejar errores aquí
    }
  },

  signOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      // Manejar errores aquí
    }
  },

  // Otros métodos relacionados con la autenticación si es necesario
};

export default AuthService;
