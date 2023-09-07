import React, {useState} from "react";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {auth} from '../../firebase'
import { RadarChart } from "react-native-charts-wrapper";

/*const user = auth.currentUser;
const name = user.name == undefined || null ? 'User' : user.name;
console.log(name);
const initial = name.charAt(0);
const ini = initial.toLowerCase();*/

const Profile = ({ navigation }) => {
  const [username, setUsername] = useState('JohnDoe');
  const [age, setAge] = useState('30');
  const [height, setHeight] = useState('175 cm');
  const [weight, setWeight] = useState('70 kg');
  const [gender, setGender] = useState('Masculino');
  const [goal, setGoal] = useState('Perder peso');
  const [experience, setExperience] = useState('Intermedio');
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={{ fontSize: 27, color: '#fff', marginTop: 15 }}> My Profile</Text>
      </View>
      <View style={styles.userDesc}>
        <MaterialCommunityIcons name={'alpha-'+'j'+'-circle'} size={80} color="#000" style={{marginTop: 15}}/>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 23, textAlign: 'center'}}>User</Text>
      </View>
      <View style={styles.userStats}>
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20}}>Datos personales</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10}}>
          <View style={styles.stat}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>Edad</Text>
            <Text style={{fontSize: 18, marginBottom: 10, textAlign: 'center'}}>17</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <MaterialCommunityIcons name={'pencil'} size={20} color="#000" style={{position: 'absolute', right: 15, bottom: 50}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <MaterialCommunityIcons name={'trash-can'} size={20} color="#000" style={{position:   'absolute', right: 15, bottom: 0}}/>
            </TouchableOpacity>
          </View>
          <View style={styles.stat}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>Altura</Text>
            <Text style={{fontSize: 18, marginBottom: 10, textAlign: 'center'}}>165 Cm</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <MaterialCommunityIcons name={'pencil'} size={20} color="#000" style={{position: 'absolute', right: 15, bottom: 50}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <MaterialCommunityIcons name={'trash-can'} size={20} color="#000" style={{position:   'absolute', right: 15, bottom: 0}}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10}}>
          <View style={styles.stat}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}>Peso</Text>
            <Text style={{fontSize: 18, marginBottom: 10, textAlign: 'center'}}>48 Kg</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <MaterialCommunityIcons name={'pencil'} size={20} color="#000" style={{position: 'absolute', right: 15, bottom: 50}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <MaterialCommunityIcons name={'trash-can'} size={20} color="#000" style={{position:   'absolute', right: 15, bottom: 0}}/>
            </TouchableOpacity>
          </View>
          <View style={styles.stat}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}   >Genero</Text>
            <Text style={{fontSize: 18, marginBottom: 10, textAlign: 'center'}}>Masculino</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <MaterialCommunityIcons name={'pencil'} size={20} color="#000" style={{position: 'absolute', right: 15, bottom: 50}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <MaterialCommunityIcons name={'trash-can'} size={20} color="#000" style={{position:   'absolute', right: 15, bottom: 0}}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.graphic, {flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15}] }>
          <View style={{width: '50%', height: '100%', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 10,}}>Meta</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    height: '13%',
    backgroundColor: '#00d1ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDesc: {
    width: '100%',
    height: '25%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userStats: {
    width: '100%',
    height: '62%',
    backgroundColor: '#00d1ff',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20, 
    elevation: 5, 
  },
  stat: {
    width: '40%',
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 30,
    marginBottom: 20,
    marginHorizontal: 10,
    elevation: 5,
    justifyContent: 'center',
  },
  graphic: {
    width: '90%',
    height: 170,
    backgroundColor: '#fff',
    borderRadius: 30,
    marginBottom: 20,
    marginHorizontal: 10, 
    elevation: 5,
    justifyContent: 'center',
    borderColor: '#00d1ff',
    borderWidth: 2,
  }
});

export default Profile;