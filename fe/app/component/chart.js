import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Chart() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Chart Page</Text>
            <Button
                title="Go to Home"
            />
          
        </View>
    );
};
