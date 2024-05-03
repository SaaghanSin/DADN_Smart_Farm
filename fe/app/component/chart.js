import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";

const Chart = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [temperatureLabels, setTemperatureLabels] = useState([]);
  const [lightData, setLightData] = useState([]);
  const [lightLabels, setLightLabels] = useState([]);
  const [moistureData, setMoistureData] = useState([]);
  const [moistureLabels, setMoistureLabels] = useState([]);
  const [selectedOption, setSelectedOption] = useState("month");
  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    fetchTemperatureData(selectedOption);
    fetchLightData(selectedOption);
    fetchMoistureData(selectedOption);
  }, [selectedOption]);

  const fetchTemperatureData = async (type) => {
    try {
      let url = "http://localhost:3000/temperature";
      if (type === "month") {
        url += "/current-month";
      } else if (type === "year") {
        url += "/current-year";
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch temperature data");
      }
      const data = await response.json();
      const temperatures = data.map((record) =>
        type === "month" ? record.temperature : record.average_temperature
      );
      const labels = data.map((record) =>
        type === "month" ? record.day : record.month
      );
      setTemperatureData(temperatures);
      setTemperatureLabels(labels);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLightData = async (type) => {
    try {
      let url = "http://localhost:3000/lights";
      if (type === "month") {
        url += "/current-month";
      } else if (type === "year") {
        url += "/current-year";
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch light data");
      }
      const data = await response.json();
      const lightData = data.map((record) => record.lux);
      const labels = data.map((record) => record.day);
      setLightData(lightData);
      setLightLabels(labels);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMoistureData = async (type) => {
    try {
      let url = "http://localhost:3000/moisture";
      if (type === "month") {
        url += "/current-month";
      } else if (type === "year") {
        url += "/current-year";
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch moisture data");
      }
      const data = await response.json();
      const moistures = data.map((record) =>
        type === "month" ? record.moisture : record.average_moisture
      );
      const labels = data.map((record) =>
        type === "month" ? record.day : record.month
      );
      setMoistureData(moistures);
      setMoistureLabels(labels);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Picker
          selectedValue={selectedOption}
          style={{
            height: 50,
            width: 150,
            marginTop: 20,
            backgroundColor: "#fafafa",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            paddingHorizontal: 10,
          }}
          itemStyle={{ backgroundColor: "white", padding: 10, borderRadius: 8 }}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
        >
          <Picker.Item label="This Month" value="month" />
          <Picker.Item label="This Year" value="year" />
        </Picker>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Temperature Chart
        </Text>
        <LineChart
          data={{
            labels: temperatureLabels,
            datasets: [
              {
                data: temperatureData,
              },
            ],
          }}
          width={windowWidth - 40}
          height={220}
          yAxisLabel="°C "
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Light Chart
        </Text>
        <LineChart
          data={{
            labels: lightLabels,
            datasets: [
              {
                data: lightData,
              },
            ],
          }}
          width={windowWidth - 40}
          height={220}
          yAxisLabel="Lux "
          chartConfig={{
            backgroundColor: "#4caf50",
            backgroundGradientFrom: "#e6ee9c",
            backgroundGradientTo: "#c6ff00",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#81c784",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />

        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Moisture Chart
        </Text>
        <LineChart
          data={{
            labels: moistureLabels,
            datasets: [
              {
                data: moistureData,
              },
            ],
          }}
          width={windowWidth - 40}
          height={220}
          yAxisLabel="% "
          chartConfig={{
            backgroundColor: "#2196f3",
            backgroundGradientFrom: "#81d4fa",
            backgroundGradientTo: "#03a9f4",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#64b5f6",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Chart;
