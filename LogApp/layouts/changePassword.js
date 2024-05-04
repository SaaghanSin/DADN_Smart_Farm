import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity, TextInput, Image } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen'; // Importing Header component from NewAppScreen in react-native
import { useNavigation } from '@react-navigation/native';

import * as React from 'react';
import {useState} from 'react';

export default function ChangePassword() {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    const [showPassword1, setShowPassword1] = useState(false);
    const togglePasswordVisibility1 = () => {
      setShowPassword1(!showPassword1);
    };
    return (
        <View style={styles.container}>
          <Image
              style={styles.image0}
              source={require('../assets/images/login.png')}
            />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="numeric"
              maxLength={6}
            />
          </View>
          <View style={styles.passwordContainer}>
          <TextInput
            style={styles.password}
            placeholder="Enter password"
            keyboardType="default"
            maxLength={300}
            secureTextEntry={!showPassword}
          />
        <TouchableOpacity
        style={styles.showPasswordButton}
        onPress={togglePasswordVisibility}>
        <Image
            source={
            showPassword
                ? require('../assets/images/hide_pass.png')
                : require('../assets/images/show_pass.png')
            }
            style={styles.showPasswordIcon}
            resizeMode="contain"
        />
        </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.password}
            placeholder="Re-enter password"
            keyboardType="default"
            maxLength={300}
            secureTextEntry={!showPassword1}
          />
        <TouchableOpacity
        style={styles.showPasswordButton}
        onPress={togglePasswordVisibility1}>
        <Image
            source={
            showPassword1
                ? require('../assets/images/hide_pass.png')
                : require('../assets/images/show_pass.png')
            }
            style={styles.showPasswordIcon}
            resizeMode="contain"
        />
        </TouchableOpacity>
        </View>
          <TouchableOpacity style={styles.button} >
            <Text style={{fontWeight:'bold',color:'white'}}>Sign In with Google</Text>
          </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 50
    },
    image0: {
      width: 170,
      height: 170,
      marginRight: 10,
      marginBottom:20
    },
    inputContainer: {
      flexDirection: 'row',
      marginHorizontal: 20,
    },
    input: {
      flex: 1,
      height: 55,
      backgroundColor: '#E3DEDE', 
      fontSize: 16,
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 20,
      borderRadius: 13
    },
    passwordContainer: {
      flexDirection: 'row',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 15,
      alignItems: 'center',
      backgroundColor: '#E3DEDE',
      borderRadius: 13
      
    },
    password: {
      flex: 1,
      height: 55,
      fontSize: 16,
      paddingLeft: 20,
      paddingRight: 20,
    },
    showPasswordButton: {
      padding: 10,
    },
    showPasswordIcon: {
      width: 24,
      height: 24,
    },
    forgotPassword:{
      alignSelf:'flex-end',
      marginRight: 24,
      marginTop: 7
    },
    button: {
      width: '90%',
      alignItems: 'center',
      backgroundColor: '#5DB075',
      padding: 16,
      borderRadius: 13,
      marginTop: 25
    },
});