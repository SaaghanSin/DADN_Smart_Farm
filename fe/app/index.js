import { useState } from "react";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import Feather from "react-native-vector-icons/Feather";

import Light from "./component/light";
import Settings from "./component/setting";
import Noti from "./component/notification";
import Homepage from "./component/home";
import Chart from "./component/chart";
import Temperature from "./component/temperature";
import Task from "./component/task";
import Watering from "./component/watering.js";
const Home = () => {
  const router = useRouter();

  const [content, setContent] = useState("home");
  const renderContent = () => {
    switch (content) {
      case "watering":
        return <Watering/>;
      case "light":
        return <Light />;
      case "chart":
        return <Chart />;
      case "setting":
        return <Settings />;
      case "notification":
        return <Noti />;
      case "temperature":
        return <Temperature />;
      case "task":
        return <Task />;
      default:
        return <Homepage setContent={setContent} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFC" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FAFAFC" },
          headerShadowVisible: true,
          headerTitle: "",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 125,
              }}
            >
              <TouchableOpacity onPress={() => setContent("default")}>
                <Feather name="home" size={30} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setContent("chart")}>
                <Feather name="bar-chart" size={30} color="#000" />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 125,
              }}
            >
              <TouchableOpacity onPress={() => setContent("notification")}>
                <Feather name="bell" size={30} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setContent("setting")}>
                <Feather name="settings" size={30} color="#000" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      {renderContent()}
    </SafeAreaView>
  );
};

export default Home;
