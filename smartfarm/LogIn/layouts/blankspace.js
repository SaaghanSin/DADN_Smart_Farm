import { StyleSheet, Text, View,TouchableOpacity, TextInput, Image } from 'react-native';

import * as React from 'react';
export default function BlankSpace(){

    return (
        <View style={{height: 100}}>
            <Image
                source={require('../assets/images/onepiece.jpeg')}
            />
        </View>
    );
}
