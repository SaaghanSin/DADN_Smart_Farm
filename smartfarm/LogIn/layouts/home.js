import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function Homepage({ setContent }) {
  const onPress = useNavigation();
  const [temperatureData, setTemperatureData] = useState(0.0);
  const [lightData, setLightData] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const handleWater = () => {
    onPress.navigate("Watering");
  };
  const handleLight = () => {
    onPress.navigate("Light");
  };
  const handleTemp = () => {
    onPress.navigate("Tempera");
  };
  const handleTask = () => {
    onPress.navigate("Task");
  };
  useEffect(() => {
    fetchData();
    fetchTaskCount();
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

  const fetchTaskCount = async () => {
    try {
      const response = await axios.get("http://localhost:3000/task-count");
      setTaskCount(response.data.total_reminders);
    } catch (error) {
      console.error("Error fetching task count:", error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleWater}>
        <LinearGradient
          colors={["#00c6fb", "#005bea"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.buttonContent}>
            <Ionicons name="water-outline" size={30} color="#fff" />
            <Text style={styles.buttonText}>Pump: Off</Text>
            <Text style={styles.buttonText}>Automatic</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLight}>
        <LinearGradient
          colors={["#ffc837", "#ff8008"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.buttonContent}>
            <Entypo name="light-up" size={30} color="#000" />
            <Text style={[styles.buttonText, { color: "#000" }]}>
              Light: On
            </Text>
            <Text style={[styles.buttonText, { color: "#000" }]}>Manual</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleTemp}>
        <LinearGradient
          colors={["#ff512f", "#dd2476"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons name="thermometer" size={30} color="#fff" />
            <Text style={styles.buttonText}>{temperatureData}°C: Good</Text>
            <Text style={styles.buttonText}>Monitoring</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleTask}>
        <LinearGradient
          colors={["#1d976c", "#93f9b9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.buttonContent}>
            <FontAwesome name="calendar" size={30} color="#fff" />
            <Text style={styles.buttonText}>Reminder</Text>
            <Text style={styles.buttonText}>{taskCount} tasks</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: 10,
    width: "80%",
    borderRadius: 6,
    overflow: "hidden",
  },
  gradient: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
  },
});
