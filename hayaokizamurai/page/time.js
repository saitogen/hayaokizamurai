import React, { useState, useRef, useEffect } from 'react';
import { View, Button, Alert, Text, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Music from './Music'; // Correctly import the Music component
import { useNavigation } from '@react-navigation/native'; // useNavigationをインポート
import { useRecoilState } from 'recoil'; // useRecoilState をインポート
import { isMusicPlayingState } from './Recoil/MusicState'; // Recoilの状態をインポート
import { selectedTimeState } from '../page/Recoil/selectedTimeState';



const Time = (props) => {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const selectedTimeIndexRef = useRef(null);
  const [edit,setEdit]=useState(true);
  const showTimePicker=()=>{
    setEdit(true);
  };

    const [isPlaying, setIsPlaying] = useRecoilState(isMusicPlayingState);
    const [selectedTime, setSelectedTime] = useRecoilState(selectedTimeState); // Use Recoil state for selectedTime
    
    const musicSourceUri = '../assets/bgm/samurai.mp3';
    const navigation = useNavigation(); // useNavigationフックを使用してnavigationオブジェクトを取得する
    const [isTransitioned, setIsTransitioned] = useState(false); // 画面遷移と音楽再生が行われたかを管理するステート変数




  // TimePickerを非表示
  const hideTimePicker = () => {
    setEdit(false);
  };




// 時刻が選択されたときの処理
const handleConfirm = (time) => {
  const selectedHour = time.getHours().toString().padStart(2, '0');
  const selectedMinute = time.getMinutes().toString().padStart(2, '0');
  const selectedTimeString = `${selectedHour}:${selectedMinute}`;
  // const selectedSecond = '00';
  // const selectedTimeString = `${selectedHour}:${selectedMinute}:${selectedSecond}`;

  setSelectedTime(selectedTimeString); // ここで1回だけ実行すれば良い

  if (selectedTimeIndexRef.current !== null) {
    const newTimes = [...selectedTimes];
    newTimes[selectedTimeIndexRef.current] = selectedTimeString;
    setSelectedTimes(newTimes);
    selectedTimeIndexRef.current = null;
    Alert.alert('時間が変更されました', selectedTimeString);
    console.log('時間が変更されました', selectedTimeString);
  } else {
    setSelectedTimes(prevTimes => [...prevTimes, selectedTimeString]); // 新しい配列を作成してセットする
      Alert.alert('時間が設定されました', selectedTimeString);
      console.log('時間が設定されました', selectedTimeString);
      props.onTimeChange([...selectedTimes, selectedTimeString]); // 親コンポーネントに新しい時間データを渡す
      console.log(selectedTimes);
  }
  hideTimePicker();
};


// const handleConfirm = (time) => {

//   else {
//     setSelectedTimes([...selectedTimes, selectedTimeString]);
//     Alert.alert('時間が設定されました', selectedTimeString);
//     console.log('時間が設定されました', selectedTimeString);
//   }

// };




 // 時間データの削除
 const handleDeleteTime = (index) => {
  setSelectedTimes((prevTimes) => {
    const newTimes = [...prevTimes];
    newTimes.splice(index, 1);
    return newTimes; // 新しい配列を返す
    
  });
  props.setBtnData(false);
  console.log(selectedTimes);
};

// 時間データの変更
const handleEditTime = (index) => {
  selectedTimeIndexRef.current = index;
  showTimePicker();
};





useEffect(() => {
  let interval;

  const checkAlarm = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours().toString().padStart(2, '0');
    const currentMinute = currentTime.getMinutes().toString().padStart(2, '0');
    const currentTimeString = `${currentHour}:${currentMinute}`;

    if (selectedTimes.includes(currentTimeString) && !isTransitioned) {
      setIsTransitioned(true);
      navigation.navigate('Shake');
      setIsPlaying(true);
    }
  };

  // 次の0秒になるまでの待ち時間を計算
  const currentTime = new Date();
  const secondsUntilNextMinute = 60 - currentTime.getSeconds();
  const millisecondsUntilNextMinute = secondsUntilNextMinute * 1000;

  // 次の0秒にアラームをチェックするように設定
  interval = setTimeout(() => {
    checkAlarm();
    // 1分ごとにアラームをチェックするように設定
    interval = setInterval(checkAlarm, 60000);
  }, millisecondsUntilNextMinute);

  return () => {
    clearTimeout(interval);
  };
}, [selectedTimes, setIsPlaying, isTransitioned]);




// useEffect(() => {
//   const interval = setInterval(() => {
//     const currentTime = new Date();
//     const currentHour = currentTime.getHours().toString().padStart(2, '0');
//     const currentMinute = currentTime.getMinutes().toString().padStart(2, '0');
//     const currentSecond = currentTime.getSeconds().toString().padStart(2, '0');
//     const currentTimeString = `${currentHour}:${currentMinute}:${currentSecond}`;

//     if (selectedTimes.includes(currentTimeString)) {
//       Alert.alert('アラーム', '時間になりました');
//       console.log('時間になりました');

//       // 画面遷移のコードを追加
//       navigation.navigate('Shake');

//       // Play the music when the alarm time is reached
//       setIsPlaying(true);

//       // handleDeleteTime(); // 不要なのでコメントアウト
//     }
//   }, 1000);

//   return () => {
//     clearInterval(interval);
//   };
// }, [selectedTimes, setIsPlaying]); // setIsPlaying を useEffect の依存リストに追加












return (
  <View>
    <DateTimePickerModal
      isVisible={edit}
      mode="time"
      onConfirm={handleConfirm}
      onCancel={hideTimePicker}
    />
    {selectedTimes.length > 0 && (
      <View>
        {selectedTimes.map((time, index) => (
          <View style={styles.timeContainer} key={index}>
            <Text style={styles.timeText}>{time}</Text>
            <View style={styles.buttonContainer}>
              <Button title="変更" onPress={() => handleEditTime(index)} />
              <Button title="削除" onPress={() => handleDeleteTime(index)} />
            </View>
          </View>
        ))}
      </View>
    )}
    <Music
      sourceUri={musicSourceUri}
      isPlaying={isPlaying} // ここでisPlayingを渡す
      setIsPlaying={setIsPlaying}
    />
  </View>
);
};


const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  timeText: {
    flex: 1,
    fontSize:40,
    fontWeight:"bold",
    position:'absolute',
    zIndex:4,
    top:100,
    left:150,
  },
  buttonContainer: {
    flexDirection: 'row',
    position:'absolute',
    zIndex:4,
    top:110,
    left:260,
  },
});
export default Time;















// import React, { useState, useRef, useEffect } from 'react';
// import { View, Button, Alert, Text, StyleSheet } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Music from './Music'; // Correctly import the Music component
// import { useNavigation } from '@react-navigation/native'; // useNavigationをインポート
// import { useRecoilState } from 'recoil'; // useRecoilState をインポート
// import { isMusicPlayingState } from './Recoil/MusicState'; // Recoilの状態をインポート
// import { selectedTimeState } from '../page/Recoil/selectedTimeState';


// const Time = (props) => {
//   const {
//     btnData,
//     setBtnData,
//     timeData,
//     onTimeChange,
//   } = props;

//   const [selectedTimes, setSelectedTimes] = useState([]);
//   const selectedTimeIndexRef = useRef(null);
//   const [edit, setEdit] = useState(true);
//   const [isPlaying, setIsPlaying] = useRecoilState(isMusicPlayingState);
//   const [selectedTime, setSelectedTime] = useRecoilState(selectedTimeState);

//   const musicSourceUri = '../assets/bgm/samurai.mp3';
//   const navigation = useNavigation(); // useNavigationフックを使用してnavigationオブジェクトを取得する



//   const showTimePicker=()=>{
//     setEdit(true);
//   };
//   // useEffect(()=>{
//   //   setEdit(props.timeContents);
//   // },[])

//   // TimePickerを非表示
//   const hideTimePicker = () => {
//     setEdit(false);
//   };
// // 時刻が選択されたときの処理
// const handleConfirm = (time) => {
//    const selectedHour = time.getHours().toString().padStart(2, '0');
//   const selectedMinute = time.getMinutes().toString().padStart(2, '0');
//   // const selectedSecond = '00';
//   const selectedTimeString = `${selectedHour}:${selectedMinute}`;

//   setSelectedTime(selectedTimeString); // ここで1回だけ実行すれば良い

//   if (selectedTimeIndexRef.current !== null) {
//     const newTimes = [...selectedTimes];
//     newTimes[selectedTimeIndexRef.current] = selectedTimeString;
//     setSelectedTimes(newTimes);
//     selectedTimeIndexRef.current = null;
//     Alert.alert('時間が変更されました', selectedTimeString);
//     console.log('時間が変更されました', selectedTimeString);
//   } else {
//     setSelectedTimes([...selectedTimes, selectedTimeString]);
//     Alert.alert('時間が設定されました', selectedTimeString);
//     console.log('時間が設定されました', selectedTimeString);
//   }

//   hideTimePicker();
// };



//  // 時間データの削除
//  const handleDeleteTime = (index) => {
//   const newTimes = [...timeData];
//   newTimes.splice(index, 1);
//   onTimeChange(newTimes); // 更新された時間データを親コンポーネントに送信
// };

// // 時間データの変更
// const handleEditTime = (index) => {
//   console.log('押し倒した')
// };



// useEffect(() => {
//   let interval;

//   const checkAlarm = () => {
//     const currentTime = new Date();
//     const currentHour = currentTime.getHours().toString().padStart(2, '0');
//     const currentMinute = currentTime.getMinutes().toString().padStart(2, '0');
//     const currentTimeString = `${currentHour}:${currentMinute}`;

//     if (selectedTimes.includes(currentTimeString) && !isTransitioned) {
//       setIsTransitioned(true);
//       navigation.navigate('Shake');
//       setIsPlaying(true);
//     }
//   };

//   // 次の0秒になるまでの待ち時間を計算
//   const currentTime = new Date();
//   const secondsUntilNextMinute = 60 - currentTime.getSeconds();
//   const millisecondsUntilNextMinute = secondsUntilNextMinute * 1000;

//   // 次の0秒にアラームをチェックするように設定
//   interval = setTimeout(() => {
//     checkAlarm();
//     // 1分ごとにアラームをチェックするように設定
//     interval = setInterval(checkAlarm, 60000);
//   }, millisecondsUntilNextMinute);

//   return () => {
//     clearTimeout(interval);
//   };
// }, [selectedTimes, setIsPlaying, isTransitioned]);



// return (
//   <View>
//     <DateTimePickerModal
//       isVisible={edit}
//       mode="time"
//       onConfirm={handleConfirm}
//       onCancel={hideTimePicker}
//     />
//     {selectedTimes.length > 0 && (
//       <View>
//         {selectedTimes.map((time, index) => (
//           <View style={styles.timeContainer} key={index}>
//             <Text style={styles.timeText}>{time}</Text>
//             <View style={styles.buttonContainer}>
//               <Button title="変更" onPress={() => handleEditTime(index)} />
//               <Button title="削除" onPress={() => handleDeleteTime(index)} />
//             </View>
//           </View>
//         ))}
//       </View>
//     )}
//     <Music
//       sourceUri={musicSourceUri}
//       isPlaying={isPlaying} // ここでisPlayingを渡す
//       setIsPlaying={setIsPlaying}
//     />
//   </View>
// );
// };


// const styles = StyleSheet.create({
//   buttonContainer: {
//     // flexDirection: 'row',
//     position:'absolute',
//     zIndex:999,
//     // top:110,
//     // left:260,
//   },
// });
// export default Time;





//   return (
//     <View>
//       <Button title="日付を選択" onPress={showTimePicker} />
//       <DateTimePickerModal
//         isVisible={isTimePickerVisible}
//         mode="time"
//         onConfirm={handleConfirm}
//         onCancel={hideTimePicker}
//       />
//         <View>
//             <Music sourceUri={musicSourceUri} />
//         </View>
//     </View>
    
//   );
// };





// const styles = StyleSheet.create({
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   timeText: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//   },
// });

// export default MyTimePicker;




