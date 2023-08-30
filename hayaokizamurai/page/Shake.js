import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { useRecoilValue } from 'recoil';
import { selectedTimeState } from '../page/Recoil/selectedTimeState';
import { useNavigation } from '@react-navigation/native'; 
import { timeDataAtom } from './Recoil/TimeDataAtom'; 
import { useRecoilState } from 'recoil';



const Shake = ({ soundObject, setIsPlaying, setSoundObject }) => {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);
  const selectedTimeStrings = useRecoilValue(selectedTimeState);
  const navigation = useNavigation();
  const [timeData, setTimeData] = useRecoilState(timeDataAtom); 

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    const distance = Math.sqrt(x * x + y * y + z * z);
    if (distance > 8) {
      console.log('すごい！ちゃんとできてるよ！この調子で頑張れ！！１');
      stopSoundOnShake();
      measurement(new Date()); // `selectedTimeStrings`を渡す
     
      navigation.navigate('Result');
    }
  }, [x, y, z]);


   const stopSoundOnShake = async () => {
    try {
      if (soundObject) {
        await soundObject.stopAsync();
        await soundObject.unloadAsync();
        setSoundObject(null);
        setIsPlaying(false); // 音楽再生中の状態を更新
      }
    } catch (error) {
      console.error('音声の停止中にエラーが発生しました:', error);
    }
  };

  const measurement = (time) => {
    // selectedTimeStringと同様に、端末を振った時刻を取得してswungTimeStringを作成する
    const currentSwungTime = new Date(); // 現在の時刻を取得
    const swungHour = currentSwungTime.getHours().toString().padStart(2, '0');
    const swungMinute = currentSwungTime.getMinutes().toString().padStart(2, '0');
    const swungSecond = currentSwungTime.getSeconds().toString().padStart(2, '0');
    const milliseconds = currentSwungTime.getMilliseconds(); // ミリ秒単位で取得
    const timeInSeconds = parseInt(swungSecond) + milliseconds / 1000; // 秒単位に変換してから小数点第4位まで表示
    const timeFormatted = timeInSeconds.toFixed(4); // 小数点第4位まで表示
    const swungTimeString = `${swungHour}:${swungMinute}:${timeFormatted}`;
  
    // selectedTimeStringの時間をDateオブジェクトに変換
    const selectedTime = new Date(`1970-01-01T${selectedTimeStrings}`);
  
    // swungTimeStringの時間をDateオブジェクトに変換
    const swungTime = new Date(`1970-01-01T${swungTimeString}`);
  
    // 端末を振るまでの時間を計算
    const timeDifferenceMs = swungTime - selectedTime;
  
    // 時間の差をミリ秒から秒に変換
    const timeDifferenceSeconds = timeDifferenceMs / 1000;
  
    // 少数第2位まで表示
    const swungTimeFormatted = swungTime.getTime() + timeDifferenceMs;
    const timeDifferenceFormatted = timeDifferenceSeconds.toFixed(2);

    setTimeData((prevTimeData) => [...prevTimeData, timeDifferenceFormatted]);
    
    // Do something with the swungTimeString here
    console.log('設定時間:', selectedTimeStrings);
    console.log('振った時間:', swungTimeFormatted);
  
 
  };
  


  return (
    <View style={styles.container}>
      <Text style={styles.text}>抜刀</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000000',
  },
  text: {
    textAlign: 'center',
    color: '#e6b422',
    fontSize:35,
    fontWeight:'bold',
    // fontFamily:'serif',
  },
});

export default Shake;