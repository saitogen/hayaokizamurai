import React, { useState } from "react";
import { View, TextInput, Button, Modal, StyleSheet } from "react-native";

const NameChangeModal = ({ visible, onRequestClose, onNameChange }) => {
  const [newName, setNewName] = useState("");

  const handleNameChange = () => {
    onNameChange(newName);
    setNewName("");
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      transparent
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="新しい名前を入力"
            onChangeText={setNewName}
            value={newName}
          />
          <Button title="名前を変更" onPress={handleNameChange} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default NameChangeModal;
