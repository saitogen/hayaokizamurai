import React from 'react';
import { View, Text, StyleSheet, Button, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { timeDataAtom } from './Recoil/TimeDataAtom';


const Result = () => {
  const navigation = useNavigation();
  const timeData = useRecoilValue(timeDataAtom);

  if (!timeData || timeData.length === 0) {
    return <View />;
  }

  const resultText = `${timeData[0]}秒`;
  
  const handleExitButtonPress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
       <ImageBackground
        source={require("../assets/ceiling.png")}
        style={styles.ImageBackground1}
      ></ImageBackground>
      <Text style={styles.h_Text}>お見事です！</Text>
      <Text style={styles.Text1}>あなたの時間は、</Text>
      <Text style={styles.Text2}>{resultText}です。</Text>
      <View style={styles.btn_img}>
        <Image
          style={styles.broken_tree}
          source={require("../assets/broken_tree.png")}
        />
      </View>
      <View style={styles.btn_container}>
        <Button style={styles.btn} title='終了' onPress={handleExitButtonPress} />
      </View>
      <View>
        <Image
          source={require("../assets/wallpaper.png")}
          style={styles.backgroundImage}
        ></Image>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  ImageBackground1: {
    width: '100%',
    height:100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "repeat",
  },
  h_Text:{
    fontSize:35,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:130,
    paddingHorizontal: 50,
  },
  Text1:{
    fontSize:20,
    textAlign:'center',
    marginTop:30,
  },
  Text2:{
    fontSize:20,
    textAlign:'center',
  },
  btn_img:{
    marginLeft:'auto',
    marginRight:'auto',
    height:200,
  },
  btn_container:{
    width:100,
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:0,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.3,
    backgroundColor:'#BFC5CA',
  },
  backgroundImage: {
    width: '100%',
    marginTop:45,
    // height:"auto",
    // flex: 2,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "repeat",
  },
});

export default Result;

