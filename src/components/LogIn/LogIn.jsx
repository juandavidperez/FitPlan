import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const LoginForm = () => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={[styles.wrapper, { height: windowHeight }]}>
      <Text style={styles.title}>Login Form</Text>
      <View style={styles.form}>
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#999999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            required
          />
        </View>
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999999"
            secureTextEntry
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            required
          />
        </View>
        <View style={styles.content}>
          <TouchableOpacity style={styles.passLink}>
            <Text style={styles.passLinkText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submitC}>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupLink}>
          <Text style={styles.signupText}>Not a member? </Text>
          <TouchableOpacity>
            <Text style={styles.signupLinkText}>Signup now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 35,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 100,
    color: '#bbb',
    userSelect: 'none',
    borderRadius: 15,
    backgroundColor: '#4158d0',
  },
  form: {
    padding: 10,
  },
  field: {
    height: 50,
    width: '100%',
    marginTop: 20,
    position: 'relative',
  },
  input: {
    height: '100%',
    width: '100%',
    fontSize: 17,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 25,
  },
  label: {
    position: 'absolute',
    top: '50%',
    left: 20,
    color: '#999999',
    fontWeight: '400',
    fontSize: 17,
    pointerEvents: 'none',
  },
  content: {
    display: 'flex',
    width: '100%',
    height: 50,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  passLink: {
    color: '#626262',
  },
  passLinkText: {
    color: '#14158d',
  },
  submitC: {
    display: 'flex',
    width: '100%',
    height: 50,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  submitButton: {
    fontSize: 16,
    borderRadius: 25,
    paddingLeft: 0,
    marginTop: 20,
    height: 40,
    width: '75%',
    alignItems: 'center',
    backgroundColor: '#4158d0',
  },
  submitButtonText: {
    fontSize: 17,
  },
  signupLink: {
    color: '#626262',
    marginTop: 20,
    textAlign: 'center',
  },
  signupText: {
    color: '#626262',
  },
  signupLinkText: {
    color: '#14158d',
    textDecorationLine: 'none',
  },
});

export default LoginForm;
