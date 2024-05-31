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

const MoistureChart = () => {
  const [moistureData, setMoistureData] = useState(null);
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
    const moisture = await fetchData(
      "http://10.229.71.101:3000/moisture/current-month"
    );
    const formattedMoistureData = moisture.map((item) => ({
      day: item.day,
      moisture: item.average_moisture,
    }));
    setMoistureData(formattedMoistureData);
  };

  const fetchDataForCurrentYear = async () => {
    const moisture = await fetchData(
      "http://10.229.71.101:3000/moisture/current-year"
    );
    const formattedMoistureData = moisture.map((item) => ({
      day: item.month,
      moisture: item.average_moisture,
    }));
    setMoistureData(formattedMoistureData);
  };
  const fetchDataForCurrentDay = async () => {
    const moisture = await fetchData(
      "http://10.229.71.101:3000/moisture/current-day"
    );
    const formattedMoistureData = moisture.map((item) => ({
      day: item.time ? "" : item.time,
      moisture: item.moisture,
    }));
    setMoistureData(formattedMoistureData);
  };
  useEffect(() => {
    fetchDataForCurrentMonth();
    fetchDataForCurrentYear();
    fetchDataForCurrentDay();
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
              colors={["#00c6ff", "#0072ff"]}
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
              colors={["#00c6ff", "#0072ff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Load Data for Current Year</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={fetchDataForCurrentDay}
          >
            <LinearGradient
              colors={["#00c6ff", "#0072ff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Load Data for Current Day</Text>
            </LinearGradient>
          </TouchableOpacity>
          {moistureData && (
            <LineChart
              data={{
                labels: moistureData.map((item) => item.day),
                datasets: [
                  {
                    data: moistureData.map((item) => item.moisture),
                    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                    strokeWidth: 2,
                  },
                ],
              }}
              width={400}
              height={200}
              yAxisSuffix="%"
              chartConfig={{
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#0000ff",
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

export default MoistureChart;

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
