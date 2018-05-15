import React from 'react';
import firebase from 'firebase';

import MainTabNavigator from './navigation/MainTabNavigator';

export default class App extends React.Component {
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
        console.log(this.state.loggedin);
      } else {
        this.setState({ loggedin: false });
        console.log(this.state.loggedin);
      }
    });
  }

  render() {
    return (
      <MainTabNavigator />
    );
  }
}
