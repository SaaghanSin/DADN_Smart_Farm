import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";

const LightChart = () => {
  const [lightData, setLightData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataForCurrentMonth = async () => {
    const light = await fetchData(
      "http://10.0.118.54:3000/lights/current-month"
    );
    const formattedLightData = light.map((item) => ({
      day: item.day,
      lux: item.average_light,
    }));
    setLightData(formattedLightData);
  };

  const fetchDataForCurrentYear = async () => {
    const light = await fetchData(
      "http://10.0.118.54:3000/lights/current-year"
    );
    const formattedLightData = light.map((item) => ({
      month: item.month,
      lux: item.average_light,
    }));
    setLightData(formattedLightData);
  };

  useEffect(() => {
    fetchDataForCurrentMonth();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={fetchDataForCurrentMonth}
          >
            <LinearGradient
              colors={["#f7971e", "#ffd200"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Load Data for Current Month</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={fetchDataForCurrentYear}
          >
            <LinearGradient
              colors={["#f7971e", "#ffd200"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Load Data for Current Year</Text>
            </LinearGradient>
          </TouchableOpacity>
          {lightData && (
            <LineChart
              data={{
                labels: lightData.map((item) => item.day || item.month),
                datasets: [
                  {
                    data: lightData.map((item) => item.lux),
                    color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
                    strokeWidth: 2,
                  },
                ],
              }}
              width={400}
              height={200}
              yAxisSuffix="lux"
              chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffff00",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          )}
        </>
      )}
    </ScrollView>
  );
};

export default LightChart;

const styles = StyleSheet.create({
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
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
