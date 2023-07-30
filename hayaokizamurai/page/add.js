// AddScreen.js
import { useState } from "react";
import React from "react";
import Nav from "./nav";
import { View, Text, StyleSheet, Image,ImageBackground } from "react-native";
import Time from "./time";

const AddScreen = ({ navigation }) => {
  const [timeContents,setTimeContents]=useState(false);
  const [timeData,setTimeData]=useState([]);
  const handleTimeButtonPress = () => {
    setTimeContents(true);
  };
  const handleTimeChange = (newTimes) => {
    setTimeData(newTimes); // 新しい時間データをセット
    setTimeContents(false); // タイムピッカーを非表示にする
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/ceiling.png")}
        style={styles.ceiling}
      >
        <View style={styles.header}>
          {/* <View style={styles.rectangle}>
            <Text style={styles.headerText}>時間設定</Text>
          </View> */}
        </View>
        {/* <TouchableOpacity onPress={handleTimeButtonPress}>
          <Text style={styles.conText}>起きる時間を決めろ！！</Text>
        </TouchableOpacity> */}
        {/* {timeContents &&(  */}
        <View style={styles.timeDesign}>
        <Time
          btnData={timeContents}
          setBtnData={setTimeContents}
          timeData={timeData} // 時間データを渡す
          onTimeChange={handleTimeChange} // コールバック関数を渡す
        />
        <Time
            btnData={timeContents}
            setBtnData={setTimeContents}
            timeData={timeData}
            onTimeChange={handleTimeChange}
        />

        </View>
        <Image
              style={styles.samurai}
              source={require("../assets/samurai_02.png")}
        />
        {/* )} */}
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
    width: "100%",
    height: 100,
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
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  conText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    position: "absolute",
    top: 300, // ヘッダーの下に配置
    alignSelf: "center", // 水平方向に中央に配置
  },
  timeContainer: {
    flex: 1, // 画面全体を占める
    position:"absolute",
    top: 300,
    left:170,
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end", // 画面下に配置
  },
  backgroundImage: {
    width: "100%",
    height: 240,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // モーダルの幅を画面の幅と同じに
    height: "100%", // モーダルの高さを画面の高さと同じに
    backgroundColor: "rgba(255, 255, 255, 0.8)", // 背景色を設定して透明度を下げる
  },
  closeButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
  },
  timeDesign:{
    fontSize:20,
    marginTop:40,
  },
  samurai:{
    width:250,
    height:250,
    position:"absolute",
    top:200,
    left:70,
    resizeMode: "contain",

  }
});

export default AddScreen;
