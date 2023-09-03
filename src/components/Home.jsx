import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";

const fecha = new Date();
const hoy = fecha.getDate();
const mesActual = fecha.getMonth() + 1; 
function getMonthName(month) {
  switch (month) {
    case 1:
      return 'Ene';
    case 2:
      return 'Feb';
    case 3:
      return 'Mar';
    case 4:
      return 'Abr';
    case 5:
      return 'May';
    case 6:
      return 'Jun';
    case 7:
      return 'Jul';
    case 8:
      return 'Ago';
    case 9:
      return 'Sep';
    case 10:
      return 'Oct';
    case 11:
      return 'Nov';
    case 12:
      return 'Dic';
    default:
      return 'Mes';
  }
}
const windowHeight = Dimensions.get('window').height;
const Home = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.date}>{hoy} / {getMonthName(mesActual)}</Text>
      </View>
      <View style={styles.rutine}>
        <View style={styles.excersice}></View>
        <View style={styles.excersice}></View>
        <View style={styles.excersice}></View>
        <View style={styles.excersice}></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  banner: {
    width: '90%',
    height: 200,
    borderRadius: 30,
    marginHorizontal: '5%',
    marginTop: '12%',
    backgroundColor: '#00d1ff',
    elevation: 7,
    justifyContent: 'flex-start',
    borderColor: '#fff',
    borderWidth: 2,
  },
  date: {
    fontSize: 30,
    color: '#fff',
    marginHorizontal: '5%',
    marginTop: '5%',
    flexDirection: 'row',
  },
  today: {
    fontSize: 30,
    color: '#fff',
    alignSelf: 'flex-end',
    marginHorizontal: '5%',
  },
  rutine: {
    width: '100%',
    height: windowHeight / 1.2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: '12%',
    backgroundColor: '#00d1ff',
    alignItems: 'center',
    elevation: 7,
  }, 
  excersice: {
    width: '90%',
    height: (windowHeight / 5.5),
    marginTop: 15,
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 5,
    borderColor: '#00d1ff',
    borderWidth: 2,
  }
});

export default Home;