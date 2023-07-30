import React, { useState } from "react";
import Nav from "./nav";
import { View, Text, StyleSheet, Image, ImageBackground, Button } from "react-native";
import NameChangeModal from "./NameChangeModal";

const SamuraiScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("ユーザー");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleNameChange = (newName) => {
    if (newName) {
      setUserName(newName);
    }
    setIsModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/ceiling.png")}
        style={styles.ceiling}
      >
        {/* White transparent rectangle with text */}
        <View style={styles.header}>
          <View style={styles.rectangle}>
            <Text style={styles.headerText}>さむらい</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.centerContainer}>
        <Image
          style={styles.userIcon}
          source={require("../assets/profile.png")}
        />
        <Text style={styles.userName}>{userName}</Text>
        <Button 
        title="名前を変更" 
        onPress={() => setIsModalVisible(true)}
        style={styles.smallButton}
        />
        <NameChangeModal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          onNameChange={handleNameChange}
        />
      </View>

      <View style={styles.side}>
        <Text style={styles.title}>過去3日の履歴</Text>
        <View style={styles.texts}>
          <Text style={styles.textItem}>2023/06/04</Text>
          <Text style={styles.textItem}>2023/06/02</Text>
          <Text style={styles.textItem}>2023/06/01</Text>
        </View>
      </View>
      <ImageBackground
        source={require("../assets/wallpaper.png")}
        style={styles.backgroundImage}
      >
        {/* Your content for the wallpaper */}
      </ImageBackground>
      <Nav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  ceiling: {
    width: "100%",
    height: 135,
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "repeat",
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rectangle: {
    width: 210,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // White transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  centerContainer: { 
    justifyContent: "center",
    alignItems: "center",
  },
  userIcon: {
    width: 110,
    height: 110,
  },
  userName: {
    fontSize: 30,
    color: "#000",
    marginTop: 10,
  },
  side: {
    flex: 0.8,
    alignItems: "flex-start", // Align items to the left
    justifyContent: "flex-start", // Justify content to the left
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
  },
  texts: {
    marginTop: 10,
  },
  textItem: {
    fontSize: 16,
    color: "#000",
  },
  backgroundImage: {
    width: "100%",
    height: "auto",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "repeat",
  },
});

export default SamuraiScreen;
