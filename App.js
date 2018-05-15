import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import firebase from 'firebase';
import { Header, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import MainTabNavigator from './navigation/MainTabNavigator';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    loggedin: null,
    headerText: 'Authentication'
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyALa7aNfd_M_hpTdu3EaFYsdI3lkJv-OwY',
      authDomain: 'auth-dcd1e.firebaseapp.com',
      databaseURL: 'https://auth-dcd1e.firebaseio.com',
      projectId: 'auth-dcd1e',
      storageBucket: 'auth-dcd1e.appspot.com',
      messagingSenderId: '650984909341'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedin: true });
      } else {
        this.setState({ loggedin: false });
      }
    });
  }

  renderContent() {
      if (this.state.loggedin) {
          if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
              <AppLoading
                startAsync={() => {}}
                // onError={this._handleLoadingError}
                onFinish={this.handleFinishLoading}
              />
            );
          } else {
            return (
              <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
                <MainTabNavigator />
              </View>
            );
          }
      } else if (this.state.loggedin === false) {
        return (
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
            <Header>{this.state.headerText}</Header>
            <LoginForm />
          </View>
        );
      }

      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
          {/* <Header>{this.state.headerText}</Header> */}
          <Spinner style={{ flex: 1 }} />
        </View>
      );
  }

  render() {
    return this.renderContent();
  }

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 0,
    backgroundColor: '#076BD8'
  },
});
