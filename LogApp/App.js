import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import SignIn from './layouts/SignIn';
import ForgotPassword from './layouts/ForgotPassword';
import OTPPhone from './layouts/OTPPhone';
import GoogleSig from './layouts/GoogleSig';
import ChangePassword from './layouts/changePassword';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= 'SignIn' 
        component={SignIn} 
        options ={{headerTitleAlign: 'center',headerTitleStyle: { fontSize: 24 },headerTitle:'Welcome !!!'}}/>
        <Stack.Screen name= 'ForgotPassword' 
        component={ForgotPassword}
        options={{headerTitleStyle:{fontSize:24}, headerTitle:'Sign In'}}/>
        <Stack.Screen name= 'OTPPhone' component={OTPPhone}
        options={{headerTitle:'OTP Verification'}}/>
        <Stack.Screen name= 'changePassword' component={ChangePassword}
        options={{headerTitle:'OTP Verification'}}/>
        <Stack.Screen name='GoogleSig' component={GoogleSig}
        options={{headerTitle:'Sign In'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
