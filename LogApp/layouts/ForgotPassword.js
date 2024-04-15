import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity, TextInput, Image } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen'; // Importing Header component from NewAppScreen in react-native
import { useNavigation } from '@react-navigation/native';

import * as React from 'react';
import {useState} from 'react';


export default function ForgotPassword() {
  const onPress = useNavigation();
  const handlePhoneOTP = () => {
    onPress.navigate('changePassword');
  };
  const handleOTP = () => {
    onPress.navigate('OTPPhone')
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image6}
        source={require('../assets/images/phone-protect.png')}
      />
      <Text style={{fontSize:30,fontWeight:'bold'}}>OTP Verification</Text>
      <Text style={styles.OTP0}>We will send you an one time password on this mobile number.</Text>
      <Text style={styles.Num1}>Enter your mobile phone number here.</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.countryCode}>+84-</Text>
        <TextInput
          style={styles.input}
          placeholder="1234567890"
          keyboardType="numeric"
          maxLength={10}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleOTP}>
        <Text style={{fontWeight:'bold',color:'white'}}>Get OTP</Text>
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
    Num1:{
      textAlign:'center',
      color:'#696969',
      marginTop: 25,
      fontSize: 14
    },
    inputContainer: {
      flexDirection: 'row',
      height: 50,
      alignItems:'center',
      backgroundColor: '#E3DEDE',
      paddingHorizontal: 70,
      borderRadius: 10,
      marginHorizontal: 60,
      marginTop: 10,
    },
    countryCode: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000000',
      textAlign:'center',
      paddingRight: 5
    },
    input: {
      flex: 1,
      height: 40,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000000',
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
    }
  });
  
