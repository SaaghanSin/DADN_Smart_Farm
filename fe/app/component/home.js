import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";

export default function Homepage({ setContent }) {
  const [temperatureData, setTemperatureData] = useState(0.0);
  const [lightData, setLightData] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/latest-temperature"
      );
      setTemperatureData(response.data.temperature);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          padding: 20,
          margin: 10,
          width: "80%",
          borderRadius: 10,
        }}
        onPress={() => setContent("watering")}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Ionicons name="water-outline" size={30} color="#fff" />
          <Text style={{ color: "#fff" }}>Pump: Off</Text>
          <Text style={{ color: "#fff" }}>Automatic</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "yellow",
          padding: 20,
          margin: 10,
          width: "80%",
          borderRadius: 10,
        }}
        onPress={() => setContent("light")}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Entypo name="light-up" size={30} color="#000" />
          <Text style={{ color: "#000" }}>Light: On</Text>
          <Text style={{ color: "#000" }}>Manual</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          padding: 20,
          margin: 10,
          width: "80%",
          borderRadius: 10,
        }}
        onPress={() => setContent("temperature")}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <MaterialCommunityIcons name="thermometer" size={30} color="#fff" />
          <Text style={{ color: "#fff" }}>{temperatureData}°C: Good</Text>
          <Text style={{ color: "#fff" }}>Monitoring</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "grey",
          padding: 20,
          margin: 10,
          width: "80%",
          borderRadius: 10,
        }}
        onPress={() => setContent("task")}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <FontAwesome name="calendar" size={30} color="#fff" />
          <Text style={{ color: "#fff" }}>Reminder</Text>
          <Text style={{ color: "#fff" }}>2 tasks</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
