import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Task() {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const saveTask = () => {
    if (!taskName.trim()) {
      setErrorMessage("Task name is required.");
      return;
    }

    const newTask = {
      taskName: taskName.trim(),
      description: description.trim() || "None",
      time: time.toLocaleTimeString(),
      isOn: false, // New property to track task status
    };
    setTasks([...tasks, newTask]);
    setTaskName("");
    setDescription("");
    setTime(new Date());
    setModalVisible(false);
    setErrorMessage("");
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isOn = !updatedTasks[index].isOn;
    setTasks(updatedTasks);
  };

  const handleConfirmTime = (selectedTime) => {
    setTime(selectedTime);
    setDatePickerVisibility(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tasks</Text>

      <ScrollView style={styles.taskList}>
        {tasks.map((task, index) => (
          <View key={index} style={styles.taskItem}>
            <Text style={styles.taskItemText}>{task.taskName}</Text>
            <Text style={styles.taskItemText}>{task.description}</Text>
            <Text style={styles.taskItemText}>{task.time}</Text>
            <Switch value={task.isOn} onValueChange={() => toggleTask(index)} />
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Make Task</Text>
              <TextInput
                style={styles.input}
                placeholder="Task Name"
                value={taskName}
                onChangeText={setTaskName}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />
              <TouchableOpacity
                style={styles.input}
                onPress={() => setDatePickerVisibility(true)}
              >
                <Text>{time.toLocaleTimeString()}</Text>
              </TouchableOpacity>
              {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              ) : null}
              <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
                <Text style={styles.saveButtonText}>Save Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={styles.addButton}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Make Task</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  taskList: {
    maxHeight: 200,
    marginBottom: 20,
  },
  taskItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    flexDirection: "row", // To align the switch horizontally
    justifyContent: "space-between", // To push the switch to the end
  },
  taskItemText: {
    fontSize: 16,
    flex: 1, // Allow text to take up space, adjusting to switch
  },
  addButton: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  saveButton: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#4CAF50",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});
