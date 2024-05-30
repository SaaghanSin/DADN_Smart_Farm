import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Chart = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => navigation.navigate("TemperatureChart")}
      >
        <LinearGradient
          colors={["#ff7e5f", "#feb47b"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <Icon
              name="thermometer"
              size={20}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Temperature Chart</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => navigation.navigate("MoistureChart")}
      >
        <LinearGradient
          colors={["#00c6ff", "#0072ff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <Icon name="water" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Moisture Chart</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => navigation.navigate("LightChart")}
      >
        <LinearGradient
          colors={["#f7971e", "#ffd200"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <Icon
              name="weather-sunny"
              size={20}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Light Chart</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    width: "80%",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default Chart;
