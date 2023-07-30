import React, { useState, useRef, useEffect } from 'react';
import { View, Button, Alert, Text, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Time = (props) => {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const selectedTimeIndexRef = useRef(null);
  const [edit,setEdit]=useState(true);
  const showTimePicker=()=>{
    setEdit(true);
  };
  // useEffect(()=>{
  //   setEdit(props.timeContents);
  // },[])

  // TimePickerを非表示
  const hideTimePicker = () => {
    setEdit(false);
  };
// 時刻が選択されたときの処理
const handleConfirm = (time) => {
  const selectedHour = time.getHours().toString().padStart(2, '0');
  const selectedMinute = time.getMinutes().toString().padStart(2, '0');
  const selectedTimeString = `${selectedHour}:${selectedMinute}`;

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
  const interval = setInterval(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours().toString().padStart(2, '0');
    const currentMinute = currentTime.getMinutes().toString().padStart(2, '0');
    const currentSecond = currentTime.getSeconds().toString().padStart(2, '0');
    const currentTimeString = `${currentHour}:${currentMinute}:${currentSecond}`;
    if (selectedTimes.includes(currentTimeString)) {
      // アラートを表示
      Alert.alert('アラーム', '時間になりました');
      console.log('時間になりました');
    }
  }, 1000);

  return () => {
    clearInterval(interval);
  };
}, [selectedTimes]);



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
    fontSize:50,
    position:'absolute',
    zIndex:4,
    top:90,
    left:130,
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