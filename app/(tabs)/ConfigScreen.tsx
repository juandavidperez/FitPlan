import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import {
  FontAwesome5,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemeContext } from "../../components/ThemeContext";
import { useRouter } from "expo-router";

type RootStackParamList = {
  Account: undefined;
  Apariencia: undefined;
  Help: undefined;
  About: undefined;
};

type ConfigProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Config: React.FC<ConfigProps> = ({ navigation }) => {
  const { selected, themes } = useContext(ThemeContext);
  const { backgroundColor, textColor, highlightColor } = themes[selected];
  const router = useRouter();

  return (
    <View style={[ styles.container , { backgroundColor } ]}>
      {/* Top Bar */}
      <View style={[styles.topBar, { backgroundColor: highlightColor }]}>
        <Text style={[styles.topTitle, { color: textColor }]}>
          Configuración
        </Text>
      </View>

      <View style={styles.screen}>
        {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <Feather
          name="search"
          size={20}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Buscar"
          placeholderTextColor="gray"
          style={[styles.search, { color: textColor }]}
        />
      </View>

      {/* Config Items */}
      <View style={styles.configContainer}>
        <ConfigItem
          icon={<FontAwesome5 name="user-alt" size={20} color={textColor} />}
          label="Cuenta"
          onPress={() => router.push("/extra/Account")}
          textColor={textColor}
        />
        <ConfigItem
          icon={
            <Ionicons name="color-palette" size={22} color={textColor} />
          }
          label="Apariencia"
          onPress={() => router.push("/extra/Apariencia")} 
          textColor={textColor}
        />
        <ConfigItem
          icon={
            <MaterialIcons
              name="support-agent"
              size={22}
              color={textColor}
            />
          }
          label="Ayuda y soporte"
          onPress={() => router.push("/extra/Help")}
          textColor={textColor}
        />
        <ConfigItem
          icon={<Feather name="help-circle" size={22} color={textColor} />}
          label="Acerca de"
          onPress={() => router.push("/extra/About")}
          textColor={textColor}
        />
      </View>
      </View>
      
    </View>
  );
};

type ConfigItemProps = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  textColor: string;
};

const ConfigItem: React.FC<ConfigItemProps> = ({
  icon,
  label,
  onPress,
  textColor,
}) => (
  <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.itemLeft}>
      {icon}
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </View>
    <FontAwesome5 name="chevron-right" size={20} color={textColor} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,

  screen: {
    paddingHorizontal: 20,
  } as ViewStyle,

  topBar: {
    paddingTop: 50,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  } as ViewStyle,

  topTitle: {
    fontSize: 22,
    fontWeight: "bold",
  } as TextStyle,

  searchWrapper: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  } as ViewStyle,

  search: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingLeft: 45,
    paddingRight: 20,
    elevation: 2,
    fontSize: 16,
  } as TextStyle,

  searchIcon: {
    position: "absolute",
    left: 15,
    zIndex: 1,
    top: 18,
  } as TextStyle,

  configContainer: {
    flex: 1,
    gap: 12,
  } as ViewStyle,

  item: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#dfdfdf",
    borderRadius: 10,
    elevation: 1,
  } as ViewStyle,

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,

  label: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 15,
  } as TextStyle,
});

export default Config;
