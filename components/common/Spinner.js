// import
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

// make
const Spinner = ({ size }) => (
  <View style={styles.viewStyle}>
    <ActivityIndicator size={size || 'large'} />
  </View>
);

const styles = {
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
// export
export { Spinner };
