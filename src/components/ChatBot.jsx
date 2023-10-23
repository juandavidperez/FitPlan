import React, { useContext, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "./ThemeContext";

const ChatBot = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const { selected, handleContextChange, themes } = useContext(ThemeContext);
  const { backgroundColor, titleColor, textColor, highlightColor } =
    themes[selected];

  const appendMessage = (sender, message) => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: sender, message: message },
    ]);
  };

  const fetchAssistantReply = async (userMessage) => {
    // Coloca tu API Key en lugar de 'API KEY'
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                'Toma el rol de un coach personal de fitness. Tu nombre es "Hercules", responderás preguntas sobre diferentes rutinas de entrenamiento, ejercicios para partes del cuerpo, formas de alimentación y recomendaciones de nutrición. Las rutinas deben seguir la siguiente estrucutura: 3 ejercicios por musculo que se solicite entrenar, especifica sets, repeticiones y recomendaciones, si el usuario especifica no tener equipamento de gimnasio, utiliza ejercicios que no requieran equipamento (en mayor medida) y puedan ser hechos en casa. Sé amable y motivador frente al usuario que vaya a hacer uso',
            },
            { role: "user", content: userMessage },
          ],
        }),
      });

      const data = await response.json();
      if (response.ok) {
        return data.choices[0].message.content;
      } else {
        throw new Error(`Error from OpenAI API: ${data.error.message}`);
      }
    } catch (error) {
      console.error("Error fetching assistant reply:", error);
    }
  };

  const handleSend = () => {
    const userMessage = userInput;
    if (userMessage.trim() !== "") {
      appendMessage("You", userMessage);
      setUserInput("");

      fetchAssistantReply(userMessage)
        .then((assistantReply) => appendMessage("Hercules", assistantReply))
        .catch((error) =>
          console.error("Error fetching assistant reply:", error)
        );
    }
  };

  useEffect(() => {
    // Mensaje de bienvenida al cargar el componente
    appendMessage(
      "Hercules",
      "¡Bienvenido! Soy Hercules. ¿En qué te puedo ayudar hoy? 😊"
    );
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={[styles.topBar, { backgroundColor: highlightColor }]}>
        <Text style={{ fontSize: 25, color: textColor, marginTop: 15 }}>
          {" "}
          Hercules Assistant
        </Text>
      </View>
      <ScrollView style={{ width: "100%", height: "50%" }}>
        <View style={[styles.userDesc, { backgroundColor: backgroundColor }]}>
          <View style={[styles.chatbox, { backgroundColor: highlightColor }]}>
            {chatMessages.length > 0 && (
              <Text
                style={{
                  fontSize: 15,
                  color: textColor,
                  marginTop: 15,
                  marginLeft: 15,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  {chatMessages[0].sender}:{" "}
                </Text>
                {chatMessages[0].message}
              </Text>
            )}
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={[
                styles.inputContainer,
                { backgroundColor: highlightColor },
              ]}
            >
              <TextInput
                placeholder="Escribe tu mensaje..."
                placeholderTextColor={titleColor}
                multiline
                numberOfLines={4}
                style={[styles.input, { color: textColor }]}
                value={userInput}
                onChangeText={setUserInput}
              />
            </View>
            <TouchableOpacity
              style={[styles.btnSend, { backgroundColor: highlightColor }]}
              onPress={handleSend}
            >
              <Ionicons name="send" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    width: "100%",
    height: 80,
    backgroundColor: "#00d1ff",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },
  userDesc: {
    width: "100%",
    height: 700,
    alignItems: "center",
  },
  inputContainer: {
    width: "70%",
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingHorizontal: 20,
  },
  chatbox: {
    width: "90%",
    height: "70%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
    flexDirection: "row",
    borderColor: "#000",
  },
  btnSend: {
    width: 70,
    height: 50,
    backgroundColor: "#00d1ff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginTop: 20,
  },
});

export default ChatBot;
