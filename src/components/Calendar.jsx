import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { Calendar, Agenda } from 'react-native-calendars';
import moment from 'moment';
import {MaterialCommunityIcons} from '@expo/vector-icons'

const width = Dimensions.get('window').width;
const CalendarC = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [calendar, setCalendar] = useState('M');
  const [contenedorSize, setContenedorSize] = useState(500);


  return (
    <View style={styles.container}>
      <View style={[styles.calendarContainer, {height: contenedorSize}]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', alignItems: 'center', marginTop: 50, marginBottom: 20}}>
          <Text style={styles.title}>Calendario</Text>
          <TouchableOpacity
            onPress={() => {
              setContenedorSize(500);
              setCalendar('M');
            }}
            style={calendar === 'M' && styles.calendarOptionSelected}>
            <MaterialCommunityIcons name="calendar-month" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              setContenedorSize(213);
              setCalendar('W');
            }}
            style={calendar === 'W' && styles.calendarOptionSelected}>
            <MaterialCommunityIcons name="calendar-week" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {calendar === 'M' ? (
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
        ) : (
          <Agenda
            selected={selectedDate}
            style={styles.weekCalendar}
            theme={{
              backgroundColor: '#00d1ff',
              calendarBackground: '#00d1ff',
              selectedDayTextColor: '#00d1ff',
              dayTextColor: 'white',
              textDisabledColor: 'rgba(255, 255, 255, 0.7)',
              textDayFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontSize: 15,
              monthTextColor: 'white',
            }}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: 'white' },
            }}
          />
        )}
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
  weekCalendar: {
    width: width - 40,
  },
});

export default CalendarC;