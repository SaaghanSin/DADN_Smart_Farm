import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Switch,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import Slider from "@react-native-community/slider";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Button as ElementsButton } from "react-native-elements";
import axios from "axios";

export default function Temperature() {
  const [baseLimit, setBaseLimit] = useState(15.0);
  const [upperLimit, setUpperLimit] = useState(15.0);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempBaseLimit, setTempBaseLimit] = useState("");
  const [tempUpperLimit, setTempUpperLimit] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchLimits();
  }, []);

  const fetchLimits = async () => {
    try {
      const [baseLimitResponse, upperLimitResponse] = await Promise.all([
        axios.get("http://10.0.179.89:3000/base-limit"),
        axios.get("http://10.0.179.89:3000/upper-limit"),
      ]);

      const { base_limit } = baseLimitResponse.data;
      const { upper_limit } = upperLimitResponse.data;

      setBaseLimit(base_limit);
      setUpperLimit(upper_limit);
    } catch (error) {
      console.error("Error fetching limits:", error);
    }
  };

  const TemperatureControl = ({ label, value, onChange }) => {
    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>{label}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Slider
            style={{ flex: 1, marginHorizontal: 10 }}
            value={parseFloat(value.toFixed(1))}
            onValueChange={onChange}
            minimumValue={15}
            maximumValue={40}
            step={0.1}
          />
          <Text>{value.toFixed(1)}</Text>
        </View>
      </View>
    );
  };

  const saveLimits = async () => {
    if (baseLimit < upperLimit) {
      if (
        baseLimit >= 15 &&
        baseLimit <= 40 &&
        upperLimit >= 15 &&
        upperLimit <= 40
      ) {
        try {
          await axios.put("http://10.0.179.89:3000/put-upper-limit", {
            upperLimit,
          });

          await axios.put("http://10.0.179.89:3000/put-base-limit", {
            baseLimit,
          });

          console.log("Limits updated successfully");
          setModalVisible(false);
        } catch (error) {
          console.error("Error updating limits:", error);
        }
      } else {
        setErrorMessage("Values must be between 15 and 40");
      }
    } else {
      setErrorMessage("Base Limit must be less than Upper Limit");
    }
  };

  const openFormModal = () => {
    setTempBaseLimit(baseLimit.toString());
    setTempUpperLimit(upperLimit.toString());
    setErrorMessage("");
    setModalVisible(true);
  };

  const saveFormLimits = async () => {
    const tempBase = parseFloat(tempBaseLimit);
    const tempUpper = parseFloat(tempUpperLimit);
    if (tempBase < tempUpper) {
      if (
        tempBase >= 15 &&
        tempBase <= 40 &&
        tempUpper >= 15 &&
        tempUpper <= 40
      ) {
        try {
          await axios.put("http://10.0.179.89:3000/put-upper-limit", {
            tempUpper,
          });

          await axios.put("http://10.0.179.89:3000/put-base-limit", {
            tempBase,
          });

          console.log("Limits updated successfully");
          setModalVisible(false);
        } catch (error) {
          console.error("Error updating limits:", error);
          setErrorMessage("An error occurred while updating limits");
          console.log(typeof tempBase);
          console.log(typeof tempUpper);
        }
      } else {
        setErrorMessage("Values must be between 15 and 40");
      }
    } else {
      setErrorMessage("Base Limit must be less than Upper Limit");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Temperature</Text>

      <TemperatureControl
        label="Base Limit"
        value={baseLimit}
        onChange={(value) => setBaseLimit(value)}
      />
      <TemperatureControl
        label="Upper Limit"
        value={upperLimit}
        onChange={(value) => setUpperLimit(value)}
      />

      <ElementsButton
        title="Save"
        onPress={saveLimits}
        buttonStyle={{
          backgroundColor: "black",
          marginTop: 20,
          marginBottom: 10,
          width: "100%",
        }}
        titleStyle={{ color: "white" }}
      />
      {errorMessage ? (
        <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
      ) : null}

      <ElementsButton
        title="Set Limits"
        onPress={openFormModal}
        buttonStyle={{
          backgroundColor: "black",
          marginTop: 20,
          marginBottom: 10,
          width: "100%",
        }}
        titleStyle={{ color: "white" }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                width: "80%",
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                Enter Limits
              </Text>
              {errorMessage ? (
                <Text style={{ color: "red", marginBottom: 10 }}>
                  {errorMessage}
                </Text>
              ) : null}
              <TextInput
                style={{
                  marginBottom: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 5,
                }}
                placeholder="Base Limit"
                keyboardType="numeric"
                value={tempBaseLimit}
                onChangeText={(text) => setTempBaseLimit(text)}
              />
              <TextInput
                style={{
                  marginBottom: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 5,
                }}
                placeholder="Upper Limit"
                keyboardType="numeric"
                value={tempUpperLimit}
                onChangeText={(text) => setTempUpperLimit(text)}
              />
              <ElementsButton
                title="Save"
                onPress={saveFormLimits}
                buttonStyle={{ backgroundColor: "black", width: "100%" }}
                titleStyle={{ color: "white" }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

import Slider from "@react-native-community/slider";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Button as ElementsButton } from "react-native-elements";

export default function Temperature() {
  const TemperatureControl = ({ label }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
      <View style={{ marginVertical: 10 }}>
        <Text>{label}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Slider style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <AntDesign name="bars" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TouchableWithoutFeedback>
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderTopWidth: 3,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderTopColor: "#000",
                    borderRadius: 10,
                    width: "100%",
                    height: Dimensions.get("window").height / 1.5,
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      backgroundColor: "black",
                      height: 3,
                      width: 50,
                    }}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      marginBottom: 10,
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    Settings
                  </Text>
                  <ElementsButton
                    icon={<FontAwesome name="pencil" size={15} color="black" />}
                    title="Change device's name"
                    onPress={() => {
                      /* handle press */
                    }}
                    buttonStyle={{ backgroundColor: "white" }}
                    titleStyle={{ color: "black" }}
                  />
                  <ElementsButton
                    icon={
                      <FontAwesome name="trash-o" size={15} color="black" />
                    }
                    title="Remove device"
                    onPress={() => {
                      /* handle press */
                    }}
                    buttonStyle={{ backgroundColor: "white" }}
                    titleStyle={{ color: "black", alignSelf: "flex-start" }}
                  />
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "black",
                      marginVertical: 10,
                    }}
                  />
                  <ElementsButton
                    icon={<Feather name="info" size={15} color="black" />}
                    title="Device info"
                    onPress={() => {
                      /* handle press */
                    }}
                    buttonStyle={{ backgroundColor: "white" }}
                    titleStyle={{ color: "black", alignSelf: "flex-start" }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Temperature</Text>

      <TemperatureControl label="Base Limit" />
      <TemperatureControl label="Upper limit" />

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <ElementsButton
          icon={<AntDesign name="plus" size={15} color="black" />}
          title=""
          buttonStyle={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "black",
          }}
          titleStyle={{ color: "black" }}
        />
      </View>
    </View>
  );
}
