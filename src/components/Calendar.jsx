import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Calendar, Agenda } from 'react-native-calendars';
import moment from 'moment';
import {FontAwesome5, Feather} from '@expo/vector-icons'

const width = Dimensions.get('window').width;
const CalendarC = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', alignItems: 'center', marginTop: 50, marginBottom: 20}}>
          <Text style={styles.title}>Calendario</Text>
        </View>
          <Calendar
          current={selectedDate}
          style={styles.monthCalendar}
          theme={{
            backgroundColor: '#00d1ff',
            calendarBackground: '#00d1ff',
            selectedDayTextColor: '#00d1ff',
            textMonthFontSize: 25,
            textMonthFontWeight: 'bold',
            monthTextColor: 'white',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontSize: 15,
            textDayHeaderFontFamily: 'monospace',
            dayHeaderTextColor: 'white',
            dayTextColor: 'white',
            textDayFontFamily: 'monospace',
            textDayFontWeight: '500',
            textDisabledColor: 'rgba(255, 255, 255, 0.7)',
            arrowColor: 'white',
          }}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'white' },
          }}
        />
      </View>
      <View style={styles.streakContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15}}>
          <Text style={{fontSize: 22, fontWeight: 'bold', marginTop: 20, marginRight: 10}}>Racha actual</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize:45, marginTop: 6}}>1</Text>
            <FontAwesome5 name="fire" size={50} color="orange" style={{marginHorizontal: 10, marginTop: 10}}/>
          </View>
        </View>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text>Lun</Text>
            <Text>Mar</Text>
            <Text>Mier</Text>
            <Text>Jue</Text>
            <Text>Vie</Text>
            <Text>Sab</Text>
            <Text>Dom</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Feather name="check-circle" size={24} color="black" />
            <Feather name="check-circle" size={24} color="black" />
            <Feather name="check-circle" size={24} color="black" />
            <Feather name="check-circle" size={24} color="black" />
            <Feather name="circle" size={24} color="black" />
            <Feather name="circle" size={24} color="black" />
            <Feather name="circle" size={24} color="black" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  calendarContainer: {
    width: width,
    height: 490,
    backgroundColor: '#00d1ff',
    elevation: 7,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: '#fff',
  },
  calendarOptionSelected: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  monthCalendar: {
    width: width - 40,
    height: 350,
    fontSize: 20,
  },
  streakContainer: {
    marginTop: 30,
    height: 225,
    width: width - 50,
  }
});

export default CalendarC;