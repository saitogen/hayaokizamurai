import React from "react";
import Nav from "./nav";
import { View, Text, StyleSheet, TouchableOpacity, Modal, ImageBackground } from "react-native";

const RankScreen = ({navigation}) => {

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/ceiling.png")}
        style={styles.ceiling}
      >
      <View style={styles.header}>
        <View style={styles.rectangle}>
            <Text style={styles.headerText}>世界順位</Text>
        </View>
      </View>
      </ImageBackground>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/wallpaper.png")}
          style={styles.backgroundImage}
        >
          <Nav navigation={navigation} />
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ceiling: {
    width: '100%',
    height: 100,
    resizeMode: "repeat",
  },
  header:{
    position:"absolute",
    top:0,
    width:"100%",
    height:100,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
  },
  rectangle:{
    width:210,
    height:50,
    backgroundColor:"rgba(255, 255, 255, 0.5)",
    justifyContent:"center",
    alignItems:"center",
  },
  headerText:{
    // fontFamily:"Tamanegi.ttf",
    fontSize:24,
    fontWeight:"bold",
    color:"#000",
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end", // 画面下に配置
  },
  backgroundImage: {
    width: '100%',
    height: 240,
  },
});

export default RankScreen;
