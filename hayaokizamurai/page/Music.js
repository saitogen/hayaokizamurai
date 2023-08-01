
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Audio } from 'expo-av';
import samuraiSound from '../assets/bgm/samurai.mp3';
import Shake from './Shake';
import { useRecoilState } from 'recoil'; // useRecoilState をインポート
import { isMusicPlayingState } from './Recoil/MusicState'; // Recoilの状態をインポート

export default function Music() {
  const [soundObject, setSoundObject] = React.useState(null);
  const [isPlaying, setIsPlaying] = useRecoilState(isMusicPlayingState); // Recoilの状態を使用

  const playSound = async () => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync(samuraiSound);
      await sound.playAsync();
      setSoundObject(sound);
      setIsPlaying(true); // 音楽再生中の状態を更新
    } catch (error) {
      console.error('音声の再生中にエラーが発生しました:', error);
    }
  };


  React.useEffect(() => {
    if (isPlaying) {
      playSound();
    }
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      {/* <Button title="再生" onPress={playSound} /> */}
      <Shake
        soundObject={soundObject}
        setIsPlaying={setIsPlaying}
        setSoundObject={setSoundObject} // Pass setSoundObject as a prop to Shake
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});














// import React from 'react';
// import { StyleSheet, View, Button } from 'react-native';
// import { Audio } from 'expo-av';
// import samuraiSound from '../assets/bgm/samurai.mp3';
// import Shake from './Shake';
// import { useRecoilState } from 'recoil'; // useRecoilState をインポート
// import { isMusicPlayingState } from './Recoil/MusicState'; // Recoilの状態をインポート

// export default function Music() {
//   const [soundObject, setSoundObject] = React.useState(null);
//   const [isPlaying, setIsPlaying] = useRecoilState(isMusicPlayingState); // Recoilの状態を使用

//   const playSound = async () => {
//     try {
//       const sound = new Audio.Sound();
//       await sound.loadAsync(samuraiSound);
//       await sound.playAsync();
//       setSoundObject(sound);
//       setIsPlaying(true); // 音楽再生中の状態を更新
//     } catch (error) {
//       console.error('音声の再生中にエラーが発生しました:', error);
//     }
//   };


//   React.useEffect(() => {
//     if (isPlaying) {
//       playSound();
//     }
//   }, [isPlaying]);

//   return (
//     <View style={styles.container}>
//       <Button title="再生" onPress={playSound} />
//       <Shake
//         soundObject={soundObject}
//         setIsPlaying={setIsPlaying}
//         setSoundObject={setSoundObject} // Pass setSoundObject as a prop to Shake
//       />
//     </View>
//   );
// }



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


















// import React from 'react';
// import { StyleSheet, View, Button } from 'react-native';
// import { Audio } from 'expo-av';
// import samuraiSound from '../assets/bgm/samurai.mp3';
// import Shake from './Shake';


//   export default function Music({ isPlaying }) {
//     const [soundObject, setSoundObject] = React.useState(null);
//     const accelerometerSubscription = React.useRef(null); // Store the accelerometer subscription in a ref
  
//     const playSound = async () => {
//       try {
//         const sound = new Audio.Sound();
//         await sound.loadAsync(samuraiSound);
//         await sound.playAsync();
//         setSoundObject(sound);
//       } catch (error) {
//         console.error('音声の再生中にエラーが発生しました:', error);
//       }
//     };
  
//     const stopSoundOnShake = async () => {
//       try {
//         if (soundObject) {
//           await soundObject.stopAsync();
//           await soundObject.unloadAsync();
//           setSoundObject(null); // Reset soundObject to null after unloading the sound
//         }
//       } catch (error) {
//         console.error('音声の停止中にエラーが発生しました:', error);
//       }
//     };
  
//     React.useEffect(() => {
//       if (isPlaying) {
//         playSound();
//       }
//     }, [isPlaying]);
  
//     return (
//       <View style={styles.container}>
//         <Button title="再生" onPress={playSound} />
//         <Shake stopSoundOnShake={stopSoundOnShake} />
//       </View>
//     );
//   }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });







//   // const stopSoundOnShake = async () => {
//   //   try {
//   //     if (soundObject) {
//   //       await soundObject.stopAsync();
//   //       await soundObject.unloadAsync();
//   //     }
//   //   } catch (error) {
//   //     console.error('音声の停止中にエラーが発生しました:', error);
//   //   }
//   // };


//   React.useEffect(() => {
//     if (isPlaying) {
//       playSound();
//     } 
//   }, [isPlaying]);

//   return (
//     <View style={styles.container}>
//       <Button title="再生" onPress={playSound} />
//       {/* <Button title="停止" onPress={stopSoundOnShake} /> */}
//       {/* <Shake stopSoundOnShake={stopSoundOnShake} /> */}
      
//       {/* <Shake onShake={stopSoundOnShake} /> stopSoundOnShake関数をonShakeとしてShakeコンポーネントに渡す */}
//     </View>
//   );
// }












// import React from 'react';
// import { StyleSheet, View, Button } from 'react-native';
// import { Audio } from 'expo-av';
// import samuraiSound from '../assets/bgm/samurai.mp3'; // 音声ファイルをインポート
// import Shake from './Shake'; // Shakeコンポーネントをインポート



// export default function Music({ isPlaying }) {
//   const [soundObject, setSoundObject] = React.useState(null);

//   const playSound = async () => {
//     try {
//       const sound = new Audio.Sound();
//       await sound.loadAsync(samuraiSound);
//       await sound.playAsync();
//       setSoundObject(sound);
//     } catch (error) {
//       console.error('音声の再生中にエラーが発生しました:', error);
//     }
//   };


//   const stopSoundOnShake = async () => {
//     try {
//       if (soundObject) {
//         await soundObject.stopAsync();
//         await soundObject.unloadAsync();
//       }
//     } catch (error) {
//       console.error('音声の停止中にエラーが発生しました:', error);
//     }
//   };


//   React.useEffect(() => {
//     return () => {
//       stopSoundOnShake();
//     };
//   }, []);

//   React.useEffect(() => {
//     if (isPlaying) {
//       playSound();
//     } else {
//       stopSoundOnShake();
//     }
//   }, [isPlaying]);




//   return (
//     <View style={styles.container}>
//       <Button title="ボタン" onPress={playSound} />
//       <Button title="ストップ" onPress={stopSoundOnShake} />
//       {/* <Shake onShake={stopSoundOnShake} /> */}
//        {/* Shakeコンポーネントにコールバック関数を渡す */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });




