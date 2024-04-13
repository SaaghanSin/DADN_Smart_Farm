import React, { useState, useEffect } from "react";
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
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Button as ElementsButton } from "react-native-elements";

export default function Light() {
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [lights, setLights] = useState([]);

  const fetchLights = async () => {
    try {
      const response = await fetch(`http://localhost:3000/light/user1`);
      const data = await response.json();
      setLights(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLights();
  }, []);

  const addLight = async () => {
    try {
      // find max device_id, device_id is in the format of L1, L2, L3, ...
      const maxDeviceId = lights.reduce((acc, light) => {
        const deviceId = parseInt(light.device_id.slice(1));
        return deviceId > acc ? deviceId : acc;
      }, 0);
      const newDeviceId = `L${maxDeviceId + 1}`;
      const response = await fetch(`http://localhost:3000/light/user1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device_id: newDeviceId,
          device_type: "light",
          device_location: "BK",
        }),
      });
      if (response.status === 200) {
        setLights([...lights, { device_id: newDeviceId }]);
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const removeLight = async (deviceId) => {
    if (deviceId === "L1") {
      alert("Cannot delete the first light device");
      return;
    } else {
      try {
        const response = await fetch(`http://localhost:3000/light/${deviceId}`, {
          method: "DELETE",
        });
        if (response.status === 200) {
          setLights(lights.filter((light) => light.device_id !== deviceId));
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const LightControl = ({ label, deviceId }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isLightOn, setIsLightOn] = useState(false);

    return (
      <View style={{ marginVertical: 10 }}>
        <Text>{label}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Switch
            value={isLightOn}
            onValueChange={(value) => setIsLightOn(value)}
          />
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
                    onPress={() => removeLight(deviceId)}
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

      {lights.map((light) => (
        <LightControl key={light.device_id} label={`Light ${light.device_id}`} deviceId={light.device_id}  />
      ))}

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <ElementsButton
          icon={<AntDesign name="plus" size={15} color="black" />}
          title=""
          onPress={addLight} // Add this
          buttonStyle={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "black",
          }}
          titleStyle={{ color: "black" }}
        />
        <Text style={{ marginLeft: 5 }}>Add device</Text>
      </View>
    </View>
  );
}
