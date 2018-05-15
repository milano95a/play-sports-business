import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import firebase from 'firebase';
import StadiumDetail from './StadiumDetail';

class StadiumList extends Component {
  constructor() {
    super();
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }
  state = { stadiums: [] };

  componentWillMount() {
    firebase.database().ref('/stadiums/').on('value', (snapshot) => {
      snapshot.forEach((s2) => {
        this.setState({ stadiums: [...this.state.stadiums, s2.val()] });
        // console.log(this.state.stadiums);
      });
    }, (e) => {
      console.log(e);
    });
  }

  renderAlbums() {
    // this.state.stadiums.map((stadium) => console.log(stadium));

    return (
      this.state.stadiums
        .map((stadium) => <StadiumDetail key={stadium.stadiumKey} stadium={stadium} />)
    );
  }

  render() {
    // this.renderAlbums();

    return (
      <ScrollView>
        {this.renderAlbums()}
      </ScrollView>
    );
  }
}

export default StadiumList;
