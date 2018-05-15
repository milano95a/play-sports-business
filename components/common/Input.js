import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
  <View style={containerStyle}>
    <Text style={labelStyle}>{label}</Text>
    <TextInput
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      style={inputStyle}
      value={value}
      onChangeText={onChangeText}
      underlineColorAndroid={'transparent'}
      autoCorrect={false}
    />
  </View>
  );
};
const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 3
  },
  labelStyle: {
    paddingLeft: 20,
    fontSize: 20,
    flex: 2
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
