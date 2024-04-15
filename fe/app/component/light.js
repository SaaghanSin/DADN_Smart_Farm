import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Button as ElementsButton } from "react-native-elements";
import { ActivityIndicator } from "react-native";

export default function Light() {
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [lights, setLights] = useState([]);

  const fetchLights = async () => {
    try {
      // replace the localhost with your IP address
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
      // replace the localhost with your IP address
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
        // replace the localhost with your IP address
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

  const CustomSwitch = ({ deviceId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isOn, setIsOn] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    
    const fetchLightStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/activity/${deviceId}`);
        const data = await response.json();
        setIsOn(data.acttivity_description === "ON");
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchLightStatus();
      const intervalId = setInterval(fetchLightStatus, 1000); //fetch light status every seconds
      // clean up function
      return () => clearInterval(intervalId);
    }, []);
  
    if (isLoading) {
      return <ActivityIndicator />;
    }

    const handleSwitch = async () => {
      if (isUpdating) {
        return;
      }
      setIsUpdating(true);
      try {
        const response = await fetch(`http://localhost:3000/activity`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            acttivity_description: isOn ? "OFF" : "ON",
            device_id: deviceId,
          }),
        });
        if (response.status === 200) {
          setIsOn(!isOn);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsUpdating(false);
      }
    }
    return (
      <TouchableOpacity 
        style={{ 
          width: 50, 
          height: 30,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={handleSwitch}
      >
        <Switch 
          value={isOn}
          onValueChange={handleSwitch}
        />
      </TouchableOpacity>
    );
  };
  
  const LightControl = ({ label, deviceId }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isLightOn, setIsLightOn] = useState(false);
  
    return (
      <TouchableOpacity 
        style={{ 
          marginVertical: 10,
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 10,
          padding: 10,
          backgroundColor: 'white',
          width: Dimensions.get('window').width * 0.45,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text>{label}</Text>
        <CustomSwitch deviceId={deviceId} />
  
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
      </TouchableOpacity>
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

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ width: Dimensions.get('window').width * 0.5 }}>
          {lights.sort((a, b) => a.device_id.localeCompare(b.device_id)).map((light) => (
            <LightControl key={light.device_id} label={`Light ${light.device_id}`} deviceId={light.device_id}  />
          ))}
        </View>

        <View 
          style={{ 
            width: Dimensions.get('window').width * 0.4, // adjust this as needed
            height: 200,
            marginVertical: 10,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            padding: 15,
            backgroundColor: 'white',
          }}
        >
          <Text style={{ fontSize: 30 }}>1425</Text> 
          <Text style={{ fontSize: 15 }}>LUX</Text> 
          <Entypo 
            name="light-up"
            size={50} 
            color="black"
            style={{ 
              position: 'absolute', 
              bottom: 15, 
              right: 15 
            }}
          />
        </View>
      </View>

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
