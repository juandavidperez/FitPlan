import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { ThemeContext } from "./ThemeContext";

const fecha = new Date();
const hoy = fecha.getDate();
const diaActual = fecha.getDay();
const getDayName = (day) => {
  switch (day) {
    case 0:
      return "Dom";
    case 1:
      return "Lun";
    case 2:
      return "Mar";
    case 3:
      return "Mier";
    case 4:
      return "Jue";
    case 5:
      return "Vie";
    case 6:
      return "Sab";
    default:
      return "Dia";
  }
};
LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene.",
    "Feb.",
    "Mar.",
    "Abr.",
    "May.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dic.",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
  today: "Hoy'hoy",
};
LocaleConfig.defaultLocale = "es";

const width = Dimensions.get("window").width;
const CalendarC = ({ navigation }) => {
  const { selected, handleContextChange, themes } = useContext(ThemeContext);
  const { backgroundColor, titleColor, textColor, highlightColor } =
    themes[selected];
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View
        style={[styles.calendarContainer, { backgroundColor: highlightColor }]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            alignItems: "center",
            marginTop: 50,
          }}
        ></View>
        <Calendar
          current={selectedDate}
          style={styles.monthCalendar}
          theme={{
            backgroundColor: highlightColor,
            calendarBackground: highlightColor,
            selectedDayTextColor: highlightColor,
            textMonthFontSize: 25,
            textMonthFontWeight: "bold",
            monthTextColor: "white",
            textMonthFontFamily: "monospace",
            textDayHeaderFontSize: 15,
            textDayHeaderFontFamily: "monospace",
            dayTextColor: "white",
            textDayFontFamily: "monospace",
            textDayFontWeight: "500",
            textDisabledColor: "rgba(255, 255, 255, 0.7)",
            arrowColor: "white",
          }}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "white" },
          }}
        />
      </View>
      <View style={styles.streakContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              color: textColor,
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 20,
              marginRight: 10,
            }}
          >
            Racha actual
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 45, marginTop: 6, color: textColor }}>
              2
            </Text>
            <FontAwesome5
              name="fire"
              size={50}
              color="orange"
              style={{ marginHorizontal: 10, marginTop: 10 }}
            />
          </View>
        </View>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text style={{ color: textColor }}>Lun</Text>
            <Text style={{ color: textColor }}>Mar</Text>
            <Text style={{ color: textColor }}>Mier</Text>
            <Text style={{ color: textColor }}>Jue</Text>
            <Text style={{ color: textColor }}>Vie</Text>
            <Text style={{ color: textColor }}>Sab</Text>
            <Text style={{ color: textColor }}>Dom</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Feather name="circle" size={24} color={textColor} />
            <Feather name="check-circle" size={24} color={textColor} />
            <Feather name="circle" size={24} color={textColor} />
            <Feather name="check-circle" size={24} color={textColor} />
            <Feather name="circle" size={24} color={textColor} />
            <Feather name="circle" size={24} color={textColor} />
            <Feather name="circle" size={24} color={textColor} />
          </View>
        </View>
        <Image
          source={require("../../assets/fitplan.png")}
          style={{
            width: 100,
            height: 100,
            alignSelf: "center",
            marginTop: 20,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  calendarContainer: {
    width: "100%",
    height: "60%",
    elevation: 7,
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "#fff",
  },
  calendarOptionSelected: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  monthCalendar: {
    width: width - 40,
    height: "80%",
    fontSize: 20,
  },
  streakContainer: {
    marginTop: 30,
    height: "40%",
    width: width - 50,
  },
});

export default CalendarC;
