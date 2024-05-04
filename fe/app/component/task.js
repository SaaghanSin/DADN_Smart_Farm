import React, { useState, useEffect } from "react";
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
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Task = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState("Water the plants");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(
        data.map((task) => ({
          ...task,
          reminder_time: task.reminder_time.slice(0, 8),
        }))
      );
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const saveTask = async () => {
    try {
      const formattedTime = `${time
        .getHours()
        .toString()
        .padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}:00`;

      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reminder_description: description.trim(),
          reminder_time: formattedTime,
          task_name: taskName.trim(),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save task");
      }

      fetchTasks();
      setTaskName("");
      setTime(new Date());
      setModalVisible(false);
      setErrorMessage("");
    } catch (error) {
      console.error("Error saving task:", error);
      setErrorMessage("An error occurred while saving the task.");
    }
  };

  const toggleTask = async (id, index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].on_off = !updatedTasks[index].on_off;
    try {
      console.log(updatedTasks);
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTasks[index]),
      });
      if (!response.ok) {
        throw new Error("Failed to update task status");
      }
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleConfirmTime = (selectedTime) => {
    setTime(selectedTime);
    setDatePickerVisibility(false);
  };

  const deleteTask = async (taskId, index) => {
    try {
      const response = await fetch(`http://localhost:3000/task_del/${taskId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete task");
      }
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1); // Remove the deleted task from the tasks list
      setTasks(updatedTasks);
      Alert.alert("Success", data.message);
    } catch (error) {
      console.error("Error deleting task:", error);
      Alert.alert("Error", error.message);
    }
  };
  const confirmDeleteTask = (taskId, index) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteTask(taskId, index),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tasks</Text>

      <ScrollView style={styles.taskList}>
        {tasks.map((task, index) => (
          <View key={task.reminder_id} style={styles.taskItem}>
            <Text style={styles.taskItemText}>{task.task_name}</Text>
            <Text style={styles.taskItemText}>{task.reminder_description}</Text>
            <Text style={styles.taskItemText}>{task.reminder_time}</Text>
            <Switch
              value={task.on_off}
              onValueChange={() => toggleTask(task.reminder_id, index)}
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => confirmDeleteTask(task.reminder_id, index)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
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
};

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
    flex: 1,
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

export default Task;
