import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity, TextInput, Image } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen'; // Importing Header component from NewAppScreen in react-native
import { useNavigation } from '@react-navigation/native';

import * as React from 'react';
import {useState} from 'react';


export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const onPress = useNavigation();
  const handleForgotPassword = () => {
    onPress.navigate('ForgotPassword');
  };
  const handleGoogleSig = () => {
    onPress.navigate('GoogleSig');
  };
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const handleSignIn = () => {
    if (phoneNumber === '') {
      setPhoneError(true);
    } else {
      // Handle sign in
    }
  };


  return (
    <View style={styles.container}>
      <Image
          style={styles.image0}
          source={require('../assets/images/field.png')}
        />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          keyboardType="phone-pad"
          maxLength={11}
          onChangeText={text => {
            setPhoneNumber(text);
            if (text !== '') {
              setPhoneError(false);
            }
          }}
        />
        {phoneError && <Text style={{color: 'red'}}>Vui lòng nhập số điện thoại</Text>}
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
      <TouchableOpacity 
      style={styles.forgotPassword} 
      onPress={handleForgotPassword}>
        <Text style={{fontWeight:'bold',color:'red'}}>Forgot Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={{fontWeight:'bold',color:'white'}}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.newline}>
        <View style={styles.line} />
        <Text style={styles.text}>ANOTHER WAY</Text>
        <View style={styles.line} />
      </View>
      <TouchableOpacity style={styles.button1} onPress={handleGoogleSig}>
        <Image
          style={styles.image1}
          source={require('../assets/images/google.png')}
        />

        <Text style={styles.text1}>Sign In with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={handleForgotPassword} >
          <Image
            style={styles.image2}
            source={require('../assets/images/password.png')}
          />
          <Text style={styles.text2}>Sign In with Phone OTP</Text>
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
    paddingBottom: 30
  },
  image0: {
    width: 150,
    height: 150,
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
    marginTop: 7
  },
  newline: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#C0C0C0',
    marginHorizontal: 10
  },
  text: {
    fontSize: 12,
    color: '#C0C0C0'
  },
  button1: {
    width: '90%',
    marginTop: 20,
    marginHorizontal: 20,
    height: 55,
    backgroundColor: '#E3DEDE',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 13
  },
  image1: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  text1: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginLeft: -30
  },
  button2: {
    width: '90%',
    marginTop: 10,
    marginHorizontal: 20,
    height: 55,
    backgroundColor: '#E3DEDE',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 13
  },
  image2: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  text2: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginLeft: -30
  },
  DontHaveAccount: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
