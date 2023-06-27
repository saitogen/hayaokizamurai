import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingAnimation from './LoadingAnimation';

const App = () => {
  return (
    <View style={styles.container}>
      <LoadingAnimation />
      {/* コメント！ */}
      {/* テストします　 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;