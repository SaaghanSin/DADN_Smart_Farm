import { useState } from "react";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import Feather from 'react-native-vector-icons/Feather';

import Watering from './watering.js'
import Light from "./light";
import Settings from "./setting";
import Noti from "./notification";
import Homepage from "./home";
import Chart from "./chart";

const Home = () => {
    const router = useRouter();

    const [content, setContent] = useState('home');
    const renderContent = () => {
        switch(content) {
            case 'light':
                return <Light />;
            case 'chart':
                return <Chart />;
            case 'setting':
                return <Settings />;
            case 'notification':
                return <Noti />;
            case 'watering':
                return <Watering/>;
            default:
                return <Homepage setContent={setContent} />;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFC" }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: "#FAFAFC" },
                    headerShadowVisible: true,
                    headerTitle: "",
                    headerLeft: () => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 125 }}>
                            <TouchableOpacity onPress={() => setContent('default')}>
                                <Feather name="home" size={30} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setContent('chart')}>
                                <Feather name="bar-chart" size={30} color="#000" />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 125 }}>
                            <TouchableOpacity onPress={() => setContent('notification')}>
                                <Feather name="bell" size={30} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setContent('setting')}>
                                <Feather name="settings" size={30} color="#000" />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            {renderContent()}
        </SafeAreaView>
    );
}

export default Home;
