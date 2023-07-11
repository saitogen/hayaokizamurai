import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {
  const [count, setCount] = useState(0); //カウント保存用
  useEffect(() => {
    (async () => {
      const count = await AsyncStorage.getItem("count"); // 保存されたcountを取得する処理
      setCount(Number(count || 0) + 1); // Numberに変換してインクリメントする
    })();
  }, []);

  useEffect(() => {
    if (count) {
      AsyncStorage.setItem("count", String(count)); // 文字列型に変換して保存する
    }
  }, [count]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ImageBackground
        source={require("../assets/ceiling.png")}
        style={styles.container}
      ></ImageBackground>
      <Text>HOME {`${count}`}</Text>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "black",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.25,
          shadowRadius: 5,
          elevation: 3,
          backgroundColor: "#D9D9D9",
          borderRadius: 5,
          height: 35,
          width: 105,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => navigation.navigate("Second")}
      >
        <Text style={{ marginHorizontal: 20, color: "black" }}>終了</Text>
      </TouchableOpacity>
      <ImageBackground
        source={require("../assets/wallpaper.png")}
        style={styles.backgroundImage}
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 792,
    height: 135,
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "repeat",
  },
  backgroundImage: {
    width: 792,
    height: 170,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "repeat",
  },
});

export default HomeScreen;
