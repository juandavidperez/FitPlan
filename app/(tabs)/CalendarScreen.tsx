// app/(tabs)/CalendarC.tsx
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { Calendar, LocaleConfig, DateData } from "react-native-calendars";
import moment from "moment";
import { auth } from "../../config/firebaseConfig";
import { child, getDatabase, ref, get } from "firebase/database";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { ThemeContext } from "../../components/ThemeContext";

LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ],
  monthNamesShort: ["Ene.", "Feb.", "Mar.", "Abr.", "May.", "Jun.", "Jul.", "Ago.", "Sep.", "Oct.", "Nov.", "Dic."],
  dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
  today: "Hoy",
};
LocaleConfig.defaultLocale = "es";

const { width } = Dimensions.get("window");

interface UserData {
  username?: string;
  edad?: string;
  altura?: string;
  unidadAltura?: string;
  peso?: string;
  unidadPeso?: string;
}

interface Props {
  navigation: any;
}

const images: Record<string, any> = {
  fitplan: require("../../assets/images/fitplan.png"),
};

const CalendarC: React.FC<Props> = ({ navigation }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(moment().format("YYYY-MM-DD"));

  const { selected, themes } = useContext(ThemeContext);
  const { backgroundColor, textColor, highlightColor } = themes[selected];

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const key = user.email!.split("@")[0].replaceAll(".", "_");
      try {
        const db = getDatabase();
        const snap = await get(ref(db, `usuarios/${key}`));
        if (snap.exists()) {
          const data = snap.val() as Record<string, UserData>;
          const firstKey = Object.keys(data)[0];
          setUserData(data[firstKey]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  const streakDays = 1;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.calendarContainer, { backgroundColor: highlightColor }]}>
        <Calendar
          current={selectedDate}
          onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
          style={styles.monthCalendar}
          theme={{
            backgroundColor: highlightColor,
            calendarBackground: highlightColor,
            selectedDayBackgroundColor: "#fff",
            selectedDayTextColor: highlightColor,
            textMonthFontSize: 25,
            textMonthFontWeight: "bold",
            monthTextColor: "#fff",
            textDayHeaderFontSize: 15,
            dayTextColor: "#fff",
            textDisabledColor: "rgba(255,255,255,0.7)",
            arrowColor: "#fff",
          }}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "#fff" },
          }}
        />
      </View>

      <View style={styles.streakContainer}>
        <View style={styles.streakHeader}>
          <Text style={[styles.streakTitle, { color: textColor }]}>Racha actual</Text>
          <View style={styles.streakValue}>
            <Text style={[styles.streakNumber, { color: textColor }]}>{streakDays}</Text>
            <FontAwesome5 name="fire" size={50} color="orange" />
          </View>
        </View>

        <View style={styles.weekRow}>
          {["Lun","Mar","Mie","Jue","Vie","Sab","Dom"].map((d) => (
            <Text key={d} style={{ color: textColor }}>{d}</Text>
          ))}
        </View>
        <View style={styles.weekRow}>
          {["Lun","Mar","Mie","Jue","Vie","Sab","Dom"].map((d, i) => (
            <Feather
              key={d}
              name={i === 4 ? "check-circle" : "circle"}
              size={24}
              color={textColor}
            />
          ))}
        </View>

        <Image source={images.fitplan} style={styles.image} />
      </View>
    </View>
  );
};

type Style = {
  container: ViewStyle;
  calendarContainer: ViewStyle;
  monthCalendar: ViewStyle;
  streakContainer: ViewStyle;
  streakHeader: ViewStyle;
  streakTitle: TextStyle;
  streakValue: ViewStyle;
  streakNumber: TextStyle;
  weekRow: ViewStyle;
  image: ImageStyle;
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: "center",
  },
  calendarContainer: {
    width: "100%",
    height: "60%",
    elevation: 7,
    alignItems: "center",
    paddingTop: 40,
  },
  monthCalendar: {
    width: width - 40,
    height: "80%",
  },
  streakContainer: {
    marginTop: 30,
    height: "40%",
    width: width - 50,
    alignItems: "center",
  },
  streakHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  streakTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  streakValue: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakNumber: {
    fontSize: 45,
    marginRight: 8,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});

export default CalendarC;
