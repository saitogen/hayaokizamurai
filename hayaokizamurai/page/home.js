import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";
import Nav from "./nav";



function HomeScreen({navigation}) {
  const[currentTime,setCurrentTime]=useState("");

    useEffect(()=>{
      const timerId=setInterval(()=>{
      const now =new Date();
      const options={
        hour:"2-digit",
        minute:"2-digit",
        hour12:false,
      };
      const timeString=now.toLocaleTimeString(undefined,options);
    setCurrentTime(timeString);
    },1000);
    return()=>clearInterval(timerId);
  },[]);
  
  return (
    <View style={{ flex: 1, 
                  alignItems: "center", 
                  justifyContent: "center", 
                  }}>
      <ImageBackground
        source={require("../assets/ceiling.png")}
        style={styles.container}
      ></ImageBackground>
      <View style={styles.centerContainer}>
        <Text style={styles.currentTimeText}>{currentTime}</Text>
        <Image
              style={styles.samurai}
              source={require("../assets/samurai_01.png")}
        />
      </View>
      
      <ImageBackground
        source={require("../assets/wallpaper.png")}
        style={styles.backgroundImage}
      ></ImageBackground>
      <Nav navigation={navigation} />
    </View>
  );
}

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

export default HomeScreen;