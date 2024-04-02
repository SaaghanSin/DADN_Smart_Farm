import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function Noti() {
    const notifications = [
        { id: 1, message: 'Light has just turned on!', time: '8m ago' },
        { id: 2, message: 'Water pump stopped!', time: '18m ago' },
        { id: 3, message: 'Water pump activated!', time: '20m ago' },
        { id: 4, message: 'Fan has just turn off!', time: '37m ago' },
        { id: 5, message: 'Fan has just turn off!', time: '37m ago' },
        { id: 6, message: 'Fan has just turn off!', time: '37m ago' },
        { id: 7, message: 'Fan has just turn off!', time: '37m ago' },
        // Add more notifications here...
    ];

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Today</Text>
            <ScrollView style={{ flex: 1, width: '100%' }}>
                {notifications.map((notification) => (
                    <TouchableOpacity key={notification.id} style={{ padding: 20, margin: 10, width: '80%', borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name="bell" size={30} color="#000" />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>Notice</Text>
                            <Text>{notification.message}</Text>
                            <Text>{notification.time}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};
