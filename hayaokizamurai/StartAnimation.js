import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

const StartAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.Image
        source={require('./assets/css.png')}
        style={{
          opacity: fadeAnim,
          width: 200,
          height: 200,
        }}
      />
    </View>
  );
};

export default StartAnimation;