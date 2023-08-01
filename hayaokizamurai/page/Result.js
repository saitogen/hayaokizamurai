import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { timeDataAtom } from './Recoil/TimeDataAtom';

const Result = () => {
  const timeData = useRecoilValue(timeDataAtom);

  if (!timeData || timeData.length === 0) {
    return <View />;
  }

  const resultText = `端末を振るまでの時間: ${timeData[0]}秒`;

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>結果一覧：</Text>
      <Text style={styles.Text}>{resultText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    fontSize:40,
    position:"absolute",
    top:250,
  },
  Text:{
    fontSize:40,
  }
});

export default Result;









// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { useRecoilValue } from 'recoil'; // RecoilからuseRecoilValueをインポート
// import { timeDataAtom } from './Recoil/TimeDataAtom'; // TimeDataAtomをインポート

// const Result = () => {
//   const timeData = useRecoilValue(timeDataAtom); // RecoilのuseRecoilValueフックを使って時間データを取得

//   if (!timeData || timeData.length === 0) {
//     return <View />;
//   }

//   const resultText = timeData.map((result, index) => (
//     <Text key={index}>{`端末を振るまでの時間${index + 1}: ${result}秒`}</Text>
//   ));

//   return (
//     <View style={styles.container}>
//       <Text>結果一覧：</Text>
//       {resultText}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
// });

// export default Result;
