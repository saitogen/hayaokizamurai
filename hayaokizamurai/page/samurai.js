import React from "react";
import Nav from "./nav";
import { View, Text, StyleSheet ,ImageBackground} from "react-native";

const SamuraiScreen = () => {
  return (
    <View style={{ flex: 1, 
      alignItems: "center", 
      justifyContent: "center", 
      }}>
        <ImageBackground
          source={require("../assets/ceiling.png")}
          style={styles.container}
        ></ImageBackground>
      <View style={styles.container}>
        <Text style={styles.heading}>プロフィール</Text>
        <View style={styles.profile}>
        <Text style={styles.label}>名前:</Text>
        <Text style={styles.value}>山田太郎</Text>
      </View>
      <View style={styles.profile}>
        <Text style={styles.label}>年齢:</Text>
        <Text style={styles.value}>30歳</Text>
      </View>
      <View style={styles.profile}>
        <Text style={styles.label}>職業:</Text>
        <Text style={styles.value}>侍</Text>
      </View>
      <ImageBackground
        source={require("../assets/wallpaper.png")}
        style={styles.backgroundImage}
      ></ImageBackground>
      <Nav navigation={navigation} />
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "repeat",
  },
  centerContainer:{
    flex:5,
    alignItems:"center",
    justifyContent:"center",
  },
  backgroundImage: {
    width: '100%',
    height:"auto",
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "repeat",
  },
  samurai:{
    width:250,
    height:250,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
  },
  currentTimeText:{
    fontSize:40,
    fontWeight:"bold",
  },

});

export default SamuraiScreen;
