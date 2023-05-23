import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignUp = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.form}>
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#999999"
            autoCapitalize="words"
            autoCompleteType="name"
            autoCorrect={false}
            required
          />
        </View>
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
        <View style={styles.submitC}>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginLink}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.loginLinkText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 380,
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
    color: '#fff',
    userSelect: 'none',
    borderRadius: 15,
    backgroundColor: '#c850c0',
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
  submitC: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    borderRadius: 25,
    width: '70%',
    height: 40,
    paddingLeft: 0,
    marginTop: 20,
    fontWeight: '',
    backgroundColor: "#c850c0",
  },
  submitButtonText: {
    fontSize: 17,
    textAlign: 'center',
  },
  loginLink: {
    color: '#626262',
    marginTop: 20,
    textAlign: 'center',
  },
  loginText: {
    color: '#626262',
  },
  loginLinkText: {
    color: '#14158d',
    textDecorationLine: 'none',
  },
});

export default SignUp;