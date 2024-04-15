import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity, TextInput, Image } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen'; // Importing Header component from NewAppScreen in react-native
import { useNavigation } from '@react-navigation/native';

import * as React from 'react';
import {useState,useRef} from 'react';


export default function OTPPhone() {
  const onPress = ()=>
  console.log('Button Pressed')
  const inputs = useRef([]);

  const focusNextInput = (index) => {
    if (inputs.current[index + 1]) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image6}
        source={require('../assets/images/padlock.png')}
      />
      <Text style={{fontSize:30,fontWeight:'bold'}}>Verify OTP</Text>
      <Text style={styles.OTP0}>Enter the OTP code.</Text>
      <View style={styles.container0}>
      {[...Array(6)].map((_, index) => (
        <TextInput
          key={index}
          ref={(input) => inputs.current.push(input)}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => {
            if (text.length === 1) {
              focusNextInput(index);
            }
          }}
        />
      ))}
    </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={{fontWeight:'bold',color:'white'}}> Verify OTP</Text>
      </TouchableOpacity>
      <View style={styles.DontHaveAccount}>
        <Text>Don't have account yet?</Text>
        <TouchableOpacity>
          <Text style={{fontWeight:'bold',color:'red'}}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 20
    },
    image6: {
      width: 150,
      height: 150,
      marginRight: 10,
      marginBottom:20
    },
    OTP0:{
      textAlign:'center',
      color:'#696969',
      fontSize: 14,
      marginTop:8
    },
    button: {
      width: '80%',
      alignItems: 'center',
      backgroundColor: '#5DB075',
      padding: 16,
      borderRadius: 13,
      marginTop: 20
    },
    DontHaveAccount: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center'
    },
    container0: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    input: {
      width: 40,
      height: 45,
      marginHorizontal: 5,
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      borderWidth: 1,
    },
  });
  
