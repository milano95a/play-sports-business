  import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import StadiumForm from './../components/StadiumForm';
import { Header } from './../components/common';

// import { ExpoConfigView } from '@expo/samples';
// import { Constants, Components } from 'expo';

export default class AddScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit Stadium',
  };

  render() {
    return (
        <ScrollView style={styles.container}>
          <View style={styles.formContainer}>
            <StadiumForm navigation={this.props.navigation} />
          </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    marginBottom: 15,
    flex: 1,
    backgroundColor: '#fff',
  }
});
