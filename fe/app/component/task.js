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
} from "react-native";
import Slider from "@react-native-community/slider";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Button as ElementsButton } from "react-native-elements";

export default function Task() {
  const LightControl = ({ label }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isAutomatic, setIsAutomatic] = useState(true);
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
      <Text style={{ fontSize: 24 }}>Light</Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginVertical: 5,
        }}
      >
        <Text style={{ marginRight: 15 }}>
          {isAutomatic ? "Manual" : "Automatic"}
        </Text>
        <Switch
          onValueChange={() => setIsAutomatic(!isAutomatic)}
          value={isAutomatic}
          style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
        />
      </View>

      <LightControl label="Main light" />
      <LightControl label="Extra light 1" />
      <LightControl label="Extra light 2" />

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
        <Text style={{ marginLeft: 5 }}>Add task</Text>
      </View>
    </View>
  );
}
