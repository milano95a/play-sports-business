import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, style }) => (
  <TouchableOpacity onPress={onPress} style={{ ...styles.buttonStyle, ...style }}>
    <Text style={styles.textStyle}>
      {children}
    </Text>
  </TouchableOpacity>
);

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#007aff',
    // borderWidth: 2,
    // borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
};

export { Button };
